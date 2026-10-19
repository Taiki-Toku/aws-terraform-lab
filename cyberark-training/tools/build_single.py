#!/usr/bin/env python3
"""全ページを1つのHTMLファイルにまとめた「1ファイル完結版」を作る。

- 全ページの本文を最初からHTMLに書き込み（<section class="pane">）、表示だけを切り替える。
  JavaScriptが動かない・途中までしか読み込まれない環境でも、先頭のホームは必ず表示される。
- ページ間リンクは "#p-ページ名" に書き換える。JavaScriptが無効でも CSS の :target で
  目的のページが表示される。
- 動的なコード実行（eval / new Function）は使わない。

使い方: python3 tools/build_single.py  → dist/cyberark-training.html
"""
import glob
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "dist", "cyberark-training.html")

# 先に読み込むスクリプト（各ページの <script src> は除去し、ここで1回だけ読み込む）
GLOBAL_JS = ["records.js", "quiz-bank.js", "cases.js", "app.js"]

# 各章で共通に使っているページ内アンカー
LOCAL_ANCHORS = ["review", "dual"]

# ページの表示順（先頭のホームはJavaScriptなしでも表示される）
ORDER = ["index", "references", "glossary"] + ["ch%02d" % i for i in range(1, 17)] + ["cases", "quiz", "report", "trainer"]

PANE_CSS = """
/* 1ファイル版：ページ（.pane）の表示切り替え */
.pane { display: none; }
#p-index { display: block; }
.pane:target { display: block; }
html.js .pane:not(.active) { display: none !important; }
html.js .pane.active { display: block; }
.nojs-nav { margin: 12px 0 0; font-size: 14px; }
html.js .nojs-nav { display: none; }
"""

ROUTER = r"""
(function () {
  "use strict";
  document.documentElement.className += " js";
  var api = null;
  var titles = window.CA_TITLES || {};
  function pathOf(name) { return /^ch\d\d$/.test(name) ? "learn/" + name + ".html" : name + ".html"; }
  // "#p-ch03" "learn/ch03.html" "../cases.html" "ch04.html" などをページ名に正規化する
  function pageOf(href) {
    if (!href) return null;
    var m = href.match(/^#p-([a-z0-9]+)$/);
    if (m) return document.getElementById("p-" + m[1]) ? m[1] : null;
    m = href.replace(/^(\.\.\/)+/, "").replace(/^learn\//, "").match(/^([a-z0-9]+)\.html(#.*)?$/);
    return m && document.getElementById("p-" + m[1]) ? m[1] : null;
  }
  function show(name, keepScroll) {
    if (!document.getElementById("p-" + name)) name = "index";
    var panes = document.querySelectorAll(".pane");
    for (var i = 0; i < panes.length; i++) panes[i].className = panes[i].id === "p-" + name ? "pane active" : "pane";
    api.setCurrent(pathOf(name));
    if (name === "index" && api.home) api.home();
    document.title = titles[name] || "CyberArk 新人研修";
    if (!keepScroll) window.scrollTo(0, 0);
  }
  function fromHash() {
    var m = (location.hash || "").match(/^#p-([a-z0-9]+)$/);
    return m ? m[1] : "index";
  }
  window.CA_BUNDLE = {
    start: function (a) {
      api = a;
      var panes = document.querySelectorAll(".pane[data-path]");
      for (var i = 0; i < panes.length; i++) api.buildPager(panes[i].getAttribute("data-path"), panes[i].querySelector(".content-inner"));
      document.addEventListener("click", function (e) {
        var link = e.target.closest ? e.target.closest("a[href]") : null;
        if (!link || link.target === "_blank") return;
        var href = link.getAttribute("href"), name = pageOf(href);
        if (name) {
          e.preventDefault();
          show(name);
          try { history.replaceState(null, "", "#p-" + name); } catch (err) { /* 履歴を書き換えられない環境ではそのまま */ }
          return;
        }
        if (href.charAt(0) === "#") {
          var el = document.getElementById(href.slice(1));
          if (el) { e.preventDefault(); el.scrollIntoView(); }
        }
      });
      window.addEventListener("hashchange", function () { show(fromHash()); });
      show(fromHash(), true);
    }
  };
})();
"""


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def rewrite_links(html):
    """ページ間リンクを #p-ページ名 に書き換える（外部リンク・ページ内アンカーはそのまま）。"""
    def sub(m):
        href = m.group(1)
        if re.match(r"^(https?:|mailto:|#)", href):
            return m.group(0)
        mm = re.match(r"^(?:\.\./)*(?:learn/)?([a-z0-9]+)\.html(?:#.*)?$", href)
        return 'href="#p-%s"' % mm.group(1) if mm else m.group(0)
    return re.sub(r'href="([^"]*)"', sub, html)


def main():
    css = read(os.path.join(ROOT, "assets", "style.css"))
    paths = {os.path.splitext(os.path.basename(p))[0]: p
             for p in glob.glob(os.path.join(ROOT, "*.html")) + glob.glob(os.path.join(ROOT, "learn", "*.html"))}
    assert set(paths) == set(ORDER), sorted(set(paths) ^ set(ORDER))
    titles, panes = {}, []
    for name in ORDER:
        html = read(paths[name])
        titles[name] = re.search(r"<title>(.*?)</title>", html, re.S).group(1).strip()
        body = re.search(r'<main class="main"><div class="content">(.*)</div></main>', html, re.S).group(1)
        page_js = re.findall(r"<script>(.*?)</script>", html, re.S)
        rel = os.path.relpath(paths[name], ROOT).replace(os.sep, "/")
        body = rewrite_links(body)
        # 章ごとに同じ名前のページ内アンカー（#review など）は、ページ名を付けて区別する
        for anchor in LOCAL_ANCHORS:
            body = body.replace('id="%s"' % anchor, 'id="%s-%s"' % (name, anchor)).replace('href="#%s"' % anchor, 'href="#%s-%s"' % (name, anchor))
        pane = '<section class="pane" id="p-%s" data-path="%s"><div class="content-inner">%s</div>' % (name, rel, body)
        if name == "index":
            pane += ('<p class="nojs-nav">ページ一覧：' + " ／ ".join(
                '<a href="#p-%s">%s</a>' % (n, n) for n in ORDER if n != "index") + "</p>")
        pane += "</section>"
        # ページ固有のスクリプトは、そのページの本文の直後に置く（本文の要素が揃った状態で実行される）
        for code in page_js:
            pane += "\n<script>%s</script>" % code
        panes.append(pane)
    doc_ids = re.findall(r'\sid="([^"]+)"', "\n".join(panes))
    dup = sorted({i for i in doc_ids if doc_ids.count(i) > 1})
    assert not dup, "IDが重複しています: %s" % dup
    head_js = "\n".join("<script>\n%s\n</script>" % read(os.path.join(ROOT, "assets", n)) for n in GLOBAL_JS)
    out = """<!doctype html>
<html lang="ja" data-root="" data-page="index.html">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CyberArk 新人研修</title>
<meta name="description" content="CyberArk（Idira）PAMの基礎から設計・運用まで学ぶ新人研修（全ページ1ファイル版）">
<style>
%s
%s
</style>
<script>window.CA_TITLES = %s;</script>
<script>%s</script>
%s
</head>
<body>
<main class="main"><div class="content">
%s
</div></main>
</body>
</html>
""" % (css, PANE_CSS, json.dumps(titles, ensure_ascii=False), ROUTER, head_js, "\n".join(panes))
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(out)
    print("wrote", os.path.relpath(OUT, ROOT), len(out.encode("utf-8")), "bytes,", len(panes), "pages")


if __name__ == "__main__":
    main()
