#!/usr/bin/env python3
"""全ページを1つのHTMLファイルにまとめた「1ファイル完結版」を作る。

ファイル間リンクを使わず、同梱した各ページをJavaScriptで切り替えて表示するため、
スマートフォンでファイルを1つ開くだけで全ページを行き来できる。

使い方: python3 tools/build_single.py  → dist/cyberark-training.html
"""
import glob
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "dist", "cyberark-training.html")

# グローバルに1回だけ読み込むスクリプト（各ページの <script src> は除去する）
GLOBAL_JS = ["records.js", "quiz-bank.js", "cases.js", "app.js"]

ROUTER = r"""
(function () {
  "use strict";
  var api = null;
  var titles = window.CA_TITLES || {};
  // "learn/ch03.html" "../cases.html#case-B1" "ch04.html" などをページ名に正規化する
  function pageOf(href) {
    if (!href) return null;
    var m = href.replace(/^(\.\.\/)+/, "").replace(/^learn\//, "").match(/^([a-z0-9]+)\.html(#.*)?$/);
    if (!m || !document.getElementById("tpl-" + m[1])) return null;
    return { name: m[1], anchor: m[2] ? m[2].slice(1) : "" };
  }
  function pathOf(name) { return /^ch\d\d$/.test(name) ? "learn/" + name + ".html" : name + ".html"; }
  function show(name, anchor, fromHash) {
    var tpl = document.getElementById("tpl-" + name);
    if (!tpl) { name = "index"; tpl = document.getElementById("tpl-index"); }
    var content = document.querySelector("main .content");
    content.innerHTML = tpl.innerHTML;
    api.setCurrent(pathOf(name));
    document.title = titles[name] || "CyberArk 新人研修";
    var code = document.getElementById("js-" + name);
    api.buildPage();
    if (code) { try { (new Function(code.textContent))(); } catch (e) { if (window.console) console.error(e); } }
    if (!fromHash) { try { history.replaceState(null, "", "#" + name); } catch (e) { /* ファイル表示などで履歴を書き換えられない場合はそのまま */ } }
    var target = anchor && document.getElementById(anchor);
    if (target && target.scrollIntoView) target.scrollIntoView(); else window.scrollTo(0, 0);
  }
  function fromLocation() {
    var h = (location.hash || "").slice(1);
    return document.getElementById("tpl-" + h) ? h : "index";
  }
  window.CA_BUNDLE = {
    start: function (a) {
      api = a;
      document.addEventListener("click", function (e) {
        var link = e.target.closest ? e.target.closest("a[href]") : null;
        if (!link || link.target === "_blank") return;
        var href = link.getAttribute("href");
        if (href.charAt(0) === "#") {
          var el = document.getElementById(href.slice(1));
          if (el) { e.preventDefault(); el.scrollIntoView(); }
          return;
        }
        var p = pageOf(href);
        if (p) { e.preventDefault(); show(p.name, p.anchor); }
      });
      window.addEventListener("hashchange", function () { show(fromLocation(), "", true); });
      show(fromLocation(), "", true);
    }
  };
})();
"""


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def main():
    css = read(os.path.join(ROOT, "assets", "style.css"))
    pages = sorted(glob.glob(os.path.join(ROOT, "*.html"))) + sorted(glob.glob(os.path.join(ROOT, "learn", "*.html")))
    templates, scripts, titles = [], [], {}
    for path in pages:
        name = os.path.splitext(os.path.basename(path))[0]
        html = read(path)
        titles[name] = re.search(r"<title>(.*?)</title>", html, re.S).group(1).strip()
        body = re.search(r'<main class="main"><div class="content">(.*)</div></main>', html, re.S).group(1)
        page_js = [m for m in re.findall(r"<script>(.*?)</script>", html, re.S)]
        assert "</template>" not in body, path
        templates.append('<template id="tpl-%s">%s</template>' % (name, body))
        if page_js:
            code = "\n".join(page_js).replace("</script", "<\\/script")
            scripts.append('<script type="text/plain" id="js-%s">%s</script>' % (name, code))
    globals_js = "\n".join(
        "<script>\n%s\n</script>" % read(os.path.join(ROOT, "assets", n)) for n in GLOBAL_JS
    )
    out = """<!doctype html>
<html lang="ja" data-root="" data-page="index.html">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CyberArk 新人研修</title>
<meta name="description" content="CyberArk（Idira）PAMの基礎から設計・運用まで学ぶ新人研修（全ページ1ファイル版）">
<style>
%s
</style>
</head>
<body>
<main class="main"><div class="content"></div></main>
%s
%s
<script>window.CA_TITLES = %s;</script>
<script>%s</script>
%s
</body>
</html>
""" % (css, "\n".join(templates), "\n".join(scripts), json.dumps(titles, ensure_ascii=False), ROUTER, globals_js)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(out)
    print("wrote", os.path.relpath(OUT, ROOT), len(out.encode("utf-8")), "bytes,", len(templates), "pages")


if __name__ == "__main__":
    main()
