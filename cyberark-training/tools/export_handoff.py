#!/usr/bin/env python3
"""教材の中身（本文・図・問題・正解・解説・出典）を、claude.ai に渡すための
Markdown「教材パック」に書き出す。

使い方: python3 tools/export_handoff.py  → dist/handoff/content-vol1〜4.md
"""
import glob
import html
import json
import os
import re
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "dist", "handoff", "content-pack.md")
ORDER = ["index", "references", "glossary"] + ["ch%02d" % i for i in range(1, 17)] + ["cases"]
MARK = "ABCDEFG"


def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()


def text(s):
    s = re.sub(r"<br\s*/?>", "\n", s)
    s = re.sub(r"<(code)>(.*?)</\1>", r"`\2`", s, flags=re.S)
    s = re.sub(r"<(strong|b|mark)[^>]*>(.*?)</\1>", r"**\2**", s, flags=re.S)
    s = re.sub(r'<a [^>]*href="(https?://[^"]+)"[^>]*>(.*?)</a>', r"[\2](\1)", s, flags=re.S)
    s = re.sub(r"<[^>]+>", "", s)
    s = html.unescape(s)
    return re.sub(r"[ \t]+", " ", s).strip()


def diagram(js):
    d = json.loads(js)
    names = {n["id"]: n["label"].replace("\n", " ") for n in d.get("nodes", [])}
    out = ["> 図" + ("「%s」" % d["caption"] if d.get("caption") else "") + "（部品と矢印。`[s:n]` は強調するSTEP番号）"]
    for z in d.get("zones", []):
        out.append(">  - 領域：%s" % z["label"])
    for n in d.get("nodes", []):
        sub = (" ／ " + n["sub"].replace("\n", " ")) if n.get("sub") else ""
        st = (" [s:%s]" % ",".join(map(str, n["s"]))) if n.get("s") else ""
        out.append(">  - 部品：%s%s（種別:%s）%s" % (n["label"].replace("\n", " "), sub, n.get("kind", "comp"), st))
    for e in d.get("edges", []):
        st = (" [s:%s]" % ",".join(map(str, e["s"]))) if e.get("s") else ""
        out.append(">  - 矢印：%s → %s%s%s" % (names.get(e["from"], e["from"]), names.get(e["to"], e["to"]),
                                             ("：" + e["label"]) if e.get("label") else "", st))
    return "\n".join(out)


def convert(body):
    """ページ本文の HTML を、構造を保ったまま Markdown に近い形へ変換する。"""
    out = []
    # 図（JSON）
    body = re.sub(r'<script class="dg" type="application/json">(.*?)</script>',
                  lambda m: "\n\n" + diagram(m.group(1)) + "\n\n", body, flags=re.S)
    # ステップ式フロー
    def flow(m):
        title = re.search(r'class="flow-title">(.*?)</span>', m.group(1), re.S)
        steps = re.findall(r'<li data-label="([^"]*)">(.*?)</li>\s*(?=<li data-label|</ol>)', m.group(1), re.S)
        rest = re.sub(r'<ol class="flow-desc">.*?</ol>', "", m.group(1), flags=re.S)
        rest = re.sub(r'<div class="flow-head">.*?</div>', "", rest, flags=re.S)
        lines = ["\n\n#### ステップ式フロー：%s（ラジオボタンでSTEPを切り替える）" % text(title.group(1) if title else "")]
        lines.append(rest)
        for i, (lab, desc) in enumerate(steps, 1):
            lines.append("- STEP %d「%s」：%s" % (i, text(lab), text(desc)))
        return "\n".join(lines) + "\n\n"
    body = re.sub(r'<figure class="flow">(.*?)</figure>', flow, body, flags=re.S)
    # 章末問題（正解付き）
    def rq(m):
        c = int(m.group(1)); inner = m.group(2)
        q = text(re.search(r'<p class="rq-q">(.*?)</p>', inner, re.S).group(1))
        opts = [text(x) for x in re.findall(r"<li>(.*?)</li>", re.search(r'<ul class="rq-opts">(.*?)</ul>', inner, re.S).group(1), re.S)]
        exp = text(re.search(r'<div class="rq-exp">(.*?)</div>', inner, re.S).group(1))
        lines = ["\n**%s**" % q] + ["- %s. %s%s" % (MARK[i], o, "　← 正解" if i == c else "") for i, o in enumerate(opts)]
        lines.append("- 解説：%s\n" % exp)
        return "\n".join(lines)
    body = re.sub(r'<div class="rq" data-correct="(\d+)">(.*?<div class="rq-exp">.*?</div>)</div>', rq, body, flags=re.S)
    # ケーススタディの設問
    def cq(m):
        attrs, inner = m.group(1), m.group(2)
        typ = re.search(r'data-type="(\w+)"', attrs).group(1)
        pts = re.search(r'data-pts="(\d+)"', attrs).group(1)
        head = text(re.search(r'<div class="cq-h">(.*?)</div>', inner, re.S).group(1))
        lines = ["\n**%s**（%s点・形式:%s）" % (head, pts, {"single": "単一選択", "multi": "複数選択・部分点", "order": "並べ替え・部分点", "match": "対応付け・部分点", "essay": "記述・ルーブリック自己採点"}[typ])]
        if typ in ("single", "multi"):
            correct = [int(x) for x in re.search(r'data-correct="([\d,]+)"', attrs).group(1).split(",")]
            opts = [text(x) for x in re.findall(r"<li>(.*?)</li>", re.search(r'<ul class="cq-opts">(.*?)</ul>', inner, re.S).group(1), re.S)]
            lines += ["- %s. %s%s" % (MARK[i], o, "　← 正解" if i in correct else "") for i, o in enumerate(opts)]
        elif typ == "order":
            items = [text(x) for x in re.findall(r"<li>(.*?)</li>", re.search(r'<ol class="cq-order">(.*?)</ol>', inner, re.S).group(1), re.S)]
            lines += ["- 正しい順 %d：%s" % (i + 1, o) for i, o in enumerate(items)]
        elif typ == "match":
            opts = re.search(r'data-options="([^"]*)"', attrs).group(1).split("|")
            for ans, item in re.findall(r'<li data-answer="(\d+)">(.*?)</li>', inner, re.S):
                lines.append("- %s → 正解：%s" % (text(item), opts[int(ans)]))
        elif typ == "essay":
            for p, item in re.findall(r'<li data-pts="(\d+)">(.*?)</li>', inner, re.S):
                lines.append("- 採点観点（%s点）：%s" % (p, text(item)))
        fb = re.search(r'<div class="feedback">(.*?)</div>\s*$', inner, re.S)
        if fb:
            lines.append("- 解説／模範解答：%s" % text(fb.group(1)))
        return "\n".join(lines) + "\n"
    body = re.sub(r'<div class="cq"([^>]*)>(.*?)</div>\s*(?=<div class="cq"|</div>\s*</details>|<script)', cq, body, flags=re.S)
    # 見出し・リスト・表・強調ボックス
    body = re.sub(r"<h1[^>]*>(.*?)</h1>", lambda m: "\n\n# " + text(m.group(1)) + "\n", body, flags=re.S)
    body = re.sub(r"<h2[^>]*>(.*?)</h2>", lambda m: "\n\n## " + text(m.group(1)) + "\n", body, flags=re.S)
    body = re.sub(r"<h3[^>]*>(.*?)</h3>", lambda m: "\n\n### " + text(m.group(1)) + "\n", body, flags=re.S)
    body = re.sub(r"<h4[^>]*>(.*?)</h4>", lambda m: "\n\n#### " + text(m.group(1)) + "\n", body, flags=re.S)
    body = re.sub(r'<summary>(.*?)</summary>', lambda m: "\n\n### " + text(m.group(1)) + "\n", body, flags=re.S)
    labels = {"goal": "ゴール", "analogy": "たとえ話", "key": "★重要", "danger": "⚠注意", "tip": "現場Tips", "verify": "出典・検証メモ"}
    body = re.sub(r'<div class="callout (\w+)"><span class="ttl">(.*?)</span>',
                  lambda m: "\n\n> 【%s】%s\n> " % (labels.get(m.group(1), m.group(1)), text(m.group(2))), body, flags=re.S)
    body = re.sub(r'<div class="point-box">', "\n\n> 【★重点の1行要約】", body)
    def table(m):
        rows = re.findall(r"<tr>(.*?)</tr>", m.group(1), re.S)
        lines = []
        for i, r in enumerate(rows):
            cells = [text(c).replace("\n", " ").replace("|", "／") for c in re.findall(r"<t[hd][^>]*>(.*?)</t[hd]>", r, re.S)]
            lines.append("| " + " | ".join(cells) + " |")
            if i == 0:
                lines.append("|" + "---|" * len(cells))
        return "\n\n" + "\n".join(lines) + "\n\n"
    body = re.sub(r"<table>(.*?)</table>", table, body, flags=re.S)
    body = re.sub(r"<pre><code>(.*?)</code></pre>", lambda m: "\n\n```\n" + html.unescape(re.sub(r"<[^>]+>", "", m.group(1))) + "\n```\n\n", body, flags=re.S)
    body = re.sub(r"<li[^>]*>(.*?)</li>", lambda m: "\n- " + text(m.group(1)), body, flags=re.S)
    body = re.sub(r"<p[^>]*>(.*?)</p>", lambda m: "\n\n" + text(m.group(1)) + "\n", body, flags=re.S)
    # 残りのタグを除去（コードブロックはそのまま）
    parts = re.split(r"(```.*?```)", body, flags=re.S)
    body = "".join(p if p.startswith("```") else re.sub(r"<[^>]+>", " ", p) for p in parts)
    body = html.unescape(body)
    body = re.sub(r"[ \t]+\n", "\n", body)
    body = re.sub(r"\n[ \t]+", "\n", body)
    body = re.sub(r"\n{3,}", "\n\n", body)
    return body.strip()


def glossary_md(src):
    arr = re.search(r"var GLOSSARY = (\[.*?\]);", src, re.S).group(1)
    items = json.loads(arr)
    lines = ["| 分類 | 用語 | 英語表記 | 説明 | 詳しい章 |", "|---|---|---|---|---|"]
    for cat, term, en, desc, ch in items:
        lines.append("| %s | %s | %s | %s | 第%d章 |" % (cat, term, en, desc, int(ch[2:])))
    return "\n".join(lines)


def quiz_md():
    js = read(os.path.join(ROOT, "assets", "quiz-bank.js"))
    data = subprocess.run(["node", "-e", "global.window={};eval(require('fs').readFileSync(process.argv[1],'utf8'));"
                           "process.stdout.write(JSON.stringify(window.QUIZ_BANK))", os.path.join(ROOT, "assets", "quiz-bank.js")],
                          capture_output=True, text=True, check=True).stdout
    bank = json.loads(data)
    lines = ["全%d問。各問の選択肢は先頭が正解（表示時は出題順・選択肢順とも毎回シャッフルする）。d=1 基礎／d=2 応用。\n" % len(bank)]
    for i, q in enumerate(bank, 1):
        lines.append("%d. [第%d章・%s] %s" % (i, q["c"], "応用" if q.get("d") == 2 else "基礎", q["q"]))
        lines.append("   - 正解：%s" % q["a"][0])
        lines.append("   - 誤答：%s" % " ／ ".join(q["a"][1:]))
        lines.append("   - 解説：%s" % q["e"])
    del js
    return "\n".join(lines)


VOLUMES = [
    ("vol1", "第1分冊 はじめに・基礎（ホーム／出典／用語集／第1〜4章）", ["index", "references", "glossary", "ch01", "ch02", "ch03", "ch04"], False),
    ("vol2", "第2分冊 設計・設定（第5〜9章）", ["ch05", "ch06", "ch07", "ch08", "ch09"], False),
    ("vol3", "第3分冊 利用・監視・実践（第10〜16章）", ["ch10", "ch11", "ch12", "ch13", "ch14", "ch15", "ch16"], False),
    ("vol4", "第4分冊 ケーススタディ・総まとめ練習問題", ["cases"], True),
]


def page_md(name):
    path = os.path.join(ROOT, "learn", name + ".html") if name.startswith("ch") else os.path.join(ROOT, name + ".html")
    src = read(path)
    body = re.search(r'<main class="main"><div class="content">(.*)</div></main>', src, re.S).group(1)
    md = "\n\n---\n\n<!-- ページ：%s -->\n\n" % os.path.relpath(path, ROOT) + convert(body)
    if name == "glossary":
        md += "\n\n" + glossary_md(src)
    return md


def main():
    chapters = re.findall(r'\{ id: "(ch\d\d)", t: "([^"]+)", g: "([^"]+)" \}', read(os.path.join(ROOT, "assets", "app.js")))
    toc = ["- 第%d章 %s ― ゴール：%s" % (i + 1, t, g) for i, (cid, t, g) in enumerate(chapters)]
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    for key, title, pages, with_quiz in VOLUMES:
        out = ["# CyberArk 新人研修 教材パック：%s" % title, "",
               "Claude Code で作成し、公式ドキュメント（docs.cyberark.com）と Palo Alto Networks 公式発表で検証済みの内容です。",
               "**事実（数値・日付・製品名・仕様・正解）は変更しないでください。** 表現・レイアウト・見せ方の改善は自由です。",
               "企業（ヒカリ精機株式会社）・人物・ホスト名・IPアドレスはすべて架空です。", "",
               "## 全体の章立て（参考）", ""] + toc
        for name in pages:
            out.append(page_md(name))
        if with_quiz:
            out.append("\n\n---\n\n# 総まとめ練習問題（問題バンク・正解と解説つき）\n")
            out.append(quiz_md())
        path = os.path.join(os.path.dirname(OUT), "content-%s.md" % key)
        with open(path, "w", encoding="utf-8") as f:
            f.write("\n".join(out) + "\n")
        print("wrote", os.path.relpath(path, ROOT), os.path.getsize(path), "bytes")


if __name__ == "__main__":
    main()
