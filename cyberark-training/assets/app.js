/* =========================================================
   CyberArk 新人研修サイト 共通スクリプト
   - ヘッダー / サイドバー / ページャーの自動生成
   - テーマ切替（ライト/ダーク）
   - 図（JSON 定義 → SVG）とステップ式フロー（ラジオボタン）
   - 章末振り返り問題（固定順）
   - 章の完了チェック（ブラウザ内保存・失敗しても動作継続）
   ========================================================= */
(function () {
  "use strict";

  // ---------- サイト構成 ----------
  var CHAPTERS = [
    { id: "ch01", t: "特権IDとPAMの基礎", g: "なぜ特権IDを守る必要があるのかを説明できる" },
    { id: "ch02", t: "CyberArk製品群の全体像", g: "製品ポートフォリオと提供形態を地図として描ける" },
    { id: "ch03", t: "PAMのコアアーキテクチャ", g: "Vault・PVWA・CPM・PSMの役割と通信を説明できる" },
    { id: "ch04", t: "Digital Vaultとセキュリティ", g: "Vaultが「金庫」である理由と保護の仕組みを説明できる" },
    { id: "ch05", t: "Self-HostedとPrivilege Cloud", g: "2つの提供形態の違いと選び方を説明できる" },
    { id: "ch06", t: "Safe設計と権限モデル", g: "命名規則と権限を含むSafe設計ができる" },
    { id: "ch07", t: "アカウントとプラットフォーム", g: "アカウント登録とプラットフォーム設定の関係を説明できる" },
    { id: "ch08", t: "CPMとパスワードライフサイクル", g: "変更・検証・調整の流れと失敗時の切り分けができる" },
    { id: "ch09", t: "Master Policyとアクセスワークフロー", g: "二重承認・排他・ワンタイム等を要件に応じて選べる" },
    { id: "ch10", t: "PSMによるセッション管理", g: "セッション分離・録画の流れと運用を説明できる" },
    { id: "ch11", t: "認証・ユーザー管理・ID連携", g: "LDAP/SAML/MFA連携とユーザー設計を説明できる" },
    { id: "ch12", t: "脅威検知・監査・レポート", g: "PTA/監査ログ/SIEM連携の使い分けができる" },
    { id: "ch13", t: "アプリケーションとシークレット管理", g: "CP/CCP/Secrets Manager/Secrets Hubを使い分けられる" },
    { id: "ch14", t: "ZSP/JITとモダンアクセス", g: "SIA・SCA・EPM・Remote Accessの位置づけを説明できる" },
    { id: "ch15", t: "設計思想・導入・運用の実践", g: "段階導入と日常運用・障害対応の勘所を説明できる" },
    { id: "ch16", t: "ハンズオン演習（検証環境）", g: "検証環境で登録・接続・録画確認・障害復旧を一人で実施できる" }
  ];
  var PAGES = [
    { href: "index.html", t: "ホーム" },
    { href: "references.html", t: "出典・公式ナレッジ" },
    { href: "glossary.html", t: "用語集" },
    { href: "cases.html", t: "ケーススタディ" },
    { href: "quiz.html", t: "総まとめ練習問題" },
    { href: "report.html", t: "成績・学習記録" },
    { href: "trainer.html", t: "講師用：採点・集計", side: "講師向け" }
  ];
  window.CA_SITE = { chapters: CHAPTERS, pages: PAGES };

  var root = document.documentElement.getAttribute("data-root") || "";
  var current = document.documentElement.getAttribute("data-page") || "";

  // ---------- 安全なストレージ ----------
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* 保存不可でも継続 */ } }
  };
  window.CA_STORE = store;

  // ---------- テーマ ----------
  var savedTheme = store.get("ca-theme", null);
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
  function toggleTheme() {
    var cur = document.documentElement.getAttribute("data-theme");
    var isDark = cur ? cur === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    var next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    store.set("ca-theme", next);
  }

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // ---------- ヘッダー & サイドバー ----------
  function buildShell() {
    var done = store.get("ca-done", {});
    var header = el("header", { "class": "site-header" });
    header.innerHTML =
      '<button class="icon-btn menu-btn" type="button" aria-label="メニュー" aria-expanded="false">☰</button>' +
      '<a class="brand" href="' + root + 'index.html"><span class="brand-mark">CA</span><span>CyberArk 新人研修</span></a>' +
      '<span class="spacer"></span>' +
      '<nav class="top-links" aria-label="主要ページ">' +
      PAGES.slice(1, 5).map(function (p) { return '<a href="' + root + p.href + '"' + (current === p.href ? ' aria-current="page"' : "") + ">" + p.t + "</a>"; }).join("") +
      "</nav>" +
      '<button class="icon-btn theme-btn" type="button" aria-label="表示テーマ切替" title="ライト／ダーク切替">🌓</button>';
    document.body.insertBefore(header, document.body.firstChild);

    var main = document.querySelector("main");
    var layout = el("div", { "class": "layout" });
    var side = el("nav", { "class": "sidebar", "aria-label": "目次" });
    var h = "<h4>はじめに</h4>";
    PAGES.forEach(function (p, i) {
      if (i === 3) {
        h += "<h4>学びフェーズ（全" + CHAPTERS.length + "章）</h4>";
        CHAPTERS.forEach(function (c, ci) {
          var href = "learn/" + c.id + ".html";
          h += '<a href="' + root + href + '"' + (current === href ? ' aria-current="page"' : "") + '><span class="num">' + String(ci + 1).padStart(2, "0") + "</span><span>" + c.t + "</span>" + (done[c.id] ? '<span class="done-mark" title="完了">✔</span>' : "") + "</a>";
        });
        h += "<h4>実践フェーズ</h4>";
      }
      if (p.side) h += "<h4>" + p.side + "</h4>";
      h += '<a href="' + root + p.href + '"' + (current === p.href ? ' aria-current="page"' : "") + "><span>" + p.t + "</span></a>";
    });
    side.innerHTML = h;
    var backdrop = el("div", { "class": "backdrop" });
    main.parentNode.insertBefore(layout, main);
    layout.appendChild(side);
    layout.appendChild(main);
    document.body.appendChild(backdrop);

    var footer = el("footer", { "class": "site-footer" }, "社内新人研修用教材｜登場する企業・人物・ホスト名・IPアドレスはすべて架空です｜製品仕様は必ず最新の公式ドキュメントで確認してください");
    document.body.appendChild(footer);

    var menuBtn = header.querySelector(".menu-btn");
    menuBtn.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    backdrop.addEventListener("click", function () { document.body.classList.remove("nav-open"); menuBtn.setAttribute("aria-expanded", "false"); });
    header.querySelector(".theme-btn").addEventListener("click", toggleTheme);
    var cur = side.querySelector('[aria-current="page"]');
    if (cur && cur.scrollIntoView) { try { cur.scrollIntoView({ block: "center" }); } catch (e) { /* noop */ } }
  }

  // ---------- 図：JSON → SVG ----------
  var svgNS = "http://www.w3.org/2000/svg";
  function injectMarkers() {
    var s = document.createElementNS(svgNS, "svg");
    s.setAttribute("width", "0"); s.setAttribute("height", "0"); s.setAttribute("aria-hidden", "true");
    s.style.position = "absolute";
    s.innerHTML =
      '<defs>' +
      '<marker id="dg-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--text-sub)"/></marker>' +
      '<marker id="dg-ah-s" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M10,0 L0,5 L10,10 z" style="fill:var(--text-sub)"/></marker>' +
      '<marker id="dg-ah-on" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" style="fill:var(--accent)"/></marker>' +
      '<marker id="dg-ah-on-s" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M10,0 L0,5 L10,10 z" style="fill:var(--accent)"/></marker>' +
      "</defs>";
    document.body.appendChild(s);
  }

  function border(n, tx, ty) {
    var cx = n.x + n.w / 2, cy = n.y + n.h / 2, dx = tx - cx, dy = ty - cy;
    if (dx === 0 && dy === 0) return [cx, cy];
    var t = Math.min((n.w / 2 + 3) / Math.abs(dx || 1e-9), (n.h / 2 + 3) / Math.abs(dy || 1e-9));
    return [cx + dx * t, cy + dy * t];
  }

  function renderDiagram(spec) {
    var W = spec.w || 760, H = spec.h || 320;
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", spec.title || "構成図");
    var out = "";
    (spec.zones || []).forEach(function (z) {
      out += '<rect class="dg-zone" x="' + z.x + '" y="' + z.y + '" width="' + z.w + '" height="' + z.h + '" rx="14"/>' +
        '<text class="dg-zone-label" x="' + (z.x + 12) + '" y="' + (z.y + 20) + '">' + esc(z.label) + "</text>";
    });
    var nodes = {};
    (spec.nodes || []).forEach(function (n) { n.w = n.w || 130; n.h = n.h || 56; nodes[n.id] = n; });
    (spec.edges || []).forEach(function (e) {
      var a = nodes[e.from], b = nodes[e.to];
      if (!a || !b) return;
      var acx = a.x + a.w / 2, acy = a.y + a.h / 2, bcx = b.x + b.w / 2, bcy = b.y + b.h / 2;
      var off = e.off || 0, len = Math.hypot(bcx - acx, bcy - acy) || 1;
      var ox = -(bcy - acy) / len * off, oy = (bcx - acx) / len * off;
      var p1 = border(a, bcx + ox, bcy + oy), p2 = border(b, acx + ox, acy + oy);
      p1[0] += ox; p1[1] += oy; p2[0] += ox; p2[1] += oy;
      var d, mx, my;
      if (e.curve) {
        var qx = (p1[0] + p2[0]) / 2 - (p2[1] - p1[1]) / len * e.curve, qy = (p1[1] + p2[1]) / 2 + (p2[0] - p1[0]) / len * e.curve;
        d = "M" + p1[0].toFixed(1) + "," + p1[1].toFixed(1) + " Q" + qx.toFixed(1) + "," + qy.toFixed(1) + " " + p2[0].toFixed(1) + "," + p2[1].toFixed(1);
        mx = (p1[0] + 2 * qx + p2[0]) / 4; my = (p1[1] + 2 * qy + p2[1]) / 4;
      } else {
        d = "M" + p1[0].toFixed(1) + "," + p1[1].toFixed(1) + " L" + p2[0].toFixed(1) + "," + p2[1].toFixed(1);
        mx = (p1[0] + p2[0]) / 2; my = (p1[1] + p2[1]) / 2;
      }
      var cls = "dg-edge" + (e.dashed ? " dashed" : "") + (e.both ? " both" : "");
      out += '<g class="' + cls + '" data-s="' + (e.s || []).join(" ") + '"><path d="' + d + '"/>';
      if (e.label) {
        var lx = mx + (e.lx || 0), ly = my + (e.ly || -6);
        out += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle">' + esc(e.label) + "</text>";
      }
      if (e.badge) {
        out += '<g class="dg-badge"><circle cx="' + mx.toFixed(1) + '" cy="' + my.toFixed(1) + '" r="10"/><text x="' + mx.toFixed(1) + '" y="' + (my + 4).toFixed(1) + '" text-anchor="middle">' + esc(e.badge) + "</text></g>";
      }
      out += "</g>";
    });
    (spec.nodes || []).forEach(function (n) {
      var lines = String(n.label).split("\n");
      var subs = n.sub ? String(n.sub).split("\n") : [];
      var total = lines.length * 18 + subs.length * 15;
      var y0 = n.y + n.h / 2 - total / 2 + 14;
      out += '<g class="dg-node k-' + (n.kind || "comp") + '" data-s="' + (n.s || []).join(" ") + '"><rect x="' + n.x + '" y="' + n.y + '" width="' + n.w + '" height="' + n.h + '" rx="10"/>';
      lines.forEach(function (l, i) { out += '<text x="' + (n.x + n.w / 2) + '" y="' + (y0 + i * 18) + '" text-anchor="middle">' + esc(l) + "</text>"; });
      subs.forEach(function (l, i) { out += '<text class="sub" x="' + (n.x + n.w / 2) + '" y="' + (y0 + lines.length * 18 + i * 15 - 1) + '" text-anchor="middle">' + esc(l) + "</text>"; });
      out += "</g>";
    });
    svg.innerHTML = out;
    return svg;
  }

  function buildDiagrams() {
    document.querySelectorAll("script.dg").forEach(function (sc) {
      var spec;
      try { spec = JSON.parse(sc.textContent); } catch (e) { console.error("diagram JSON error", e, sc.textContent.slice(0, 80)); return; }
      var wrap = el("div", { "class": "diagram-wrap" });
      var scroll = el("div", { "class": "diagram-scroll" });
      scroll.appendChild(renderDiagram(spec));
      wrap.appendChild(el("div", { "class": "scroll-hint" }, "← 図は横にスクロールできます →"));
      wrap.appendChild(scroll);
      if (spec.caption) wrap.appendChild(el("p", { "class": "diagram-cap" }, esc(spec.caption)));
      sc.parentNode.insertBefore(wrap, sc);
    });
  }

  // スマートフォン等で図が横スクロールになる場合、強調中の部品が見える位置へ寄せる
  function focusDiagram(flow) {
    var sc = flow.querySelector(".diagram-scroll");
    if (!sc || sc.scrollWidth <= sc.clientWidth + 2) return;
    var svg = sc.querySelector("svg"), ons = svg.querySelectorAll(".on");
    if (!ons.length) return;
    var minx = Infinity, maxx = -Infinity;
    ons.forEach(function (g) { try { var b = g.getBBox(); minx = Math.min(minx, b.x); maxx = Math.max(maxx, b.x + b.width); } catch (e) { /* noop */ } });
    if (!isFinite(minx)) return;
    var scale = svg.clientWidth / svg.viewBox.baseVal.width;
    var left = (minx + maxx) / 2 * scale - sc.clientWidth / 2;
    try { sc.scrollTo({ left: Math.max(0, left), behavior: "smooth" }); } catch (e) { sc.scrollLeft = Math.max(0, left); }
  }

  // ---------- ステップ式フロー（ラジオボタン） ----------
  var flowSeq = 0;
  function buildFlows() {
    document.querySelectorAll(".flow").forEach(function (flow) {
      var id = "flow" + (++flowSeq);
      var items = Array.prototype.slice.call(flow.querySelectorAll(".flow-desc > li"));
      if (!items.length) return;
      var fs = el("fieldset", { "class": "flow-steps" });
      fs.appendChild(el("legend", null, "ステップを選択（ラジオボタン）"));
      items.forEach(function (li, i) {
        var label = li.getAttribute("data-label") || ("Step " + (i + 1));
        li.insertAdjacentHTML("afterbegin", '<span class="st">STEP ' + (i + 1) + "／" + items.length + "：" + esc(label) + "</span>");
        var lb = el("label");
        lb.innerHTML = '<input type="radio" name="' + id + '" value="' + (i + 1) + '"' + (i === 0 ? " checked" : "") + "><span>" + (i + 1) + ". " + esc(label) + "</span>";
        fs.appendChild(lb);
      });
      var desc = flow.querySelector(".flow-desc");
      desc.parentNode.insertBefore(fs, desc);
      var nav = el("div", { "class": "flow-nav" },
        '<button type="button" class="btn ghost sm" data-dir="-1">◀ 前へ</button><button type="button" class="btn sm" data-dir="1">次へ ▶</button>');
      desc.parentNode.insertBefore(nav, desc.nextSibling);

      function show(n) {
        items.forEach(function (li, i) { li.classList.toggle("on", i + 1 === n); });
        flow.querySelectorAll("svg [data-s]").forEach(function (g) {
          var steps = (g.getAttribute("data-s") || "").split(" ").filter(Boolean).map(Number);
          var on = steps.indexOf(n) >= 0;
          var seen = !on && steps.some(function (s) { return s < n; });
          g.classList.toggle("on", on);
          g.classList.toggle("seen", seen);
        });
        focusDiagram(flow);
        var r = fs.querySelector('input[value="' + n + '"]');
        if (r) r.checked = true;
        nav.querySelector('[data-dir="-1"]').disabled = n <= 1;
        nav.querySelector('[data-dir="1"]').disabled = n >= items.length;
      }
      fs.addEventListener("change", function (e) { show(Number(e.target.value)); });
      nav.addEventListener("click", function (e) {
        var b = e.target.closest("button"); if (!b) return;
        var cur = Number((fs.querySelector("input:checked") || { value: 1 }).value);
        show(Math.min(items.length, Math.max(1, cur + Number(b.getAttribute("data-dir")))));
      });
      show(1);
    });
  }

  // ---------- 画面キャプチャ差し込み枠 ----------
  // <figure class="shot" data-src="../assets/img/xxx.png" data-title="…" data-how="取得手順">
  // 画像があれば表示し、無ければ「差し込み枠」として取得手順を表示する
  function buildShots() {
    document.querySelectorAll("figure.shot").forEach(function (f) {
      var src = f.getAttribute("data-src"), title = f.getAttribute("data-title") || "画面キャプチャ";
      var how = f.getAttribute("data-how") || "";
      var img = new Image();
      img.alt = title;
      img.onload = function () { f.innerHTML = ""; f.appendChild(img); f.appendChild(el("figcaption", null, esc(title))); f.classList.add("has-img"); };
      img.onerror = function () {
        f.innerHTML = '<div class="shot-ph"><div class="shot-ic">🖼</div><div><strong>画面キャプチャ差し込み枠：' + esc(title) + "</strong>" +
          '<p class="small">取得手順：' + esc(how) + '</p><p class="small muted">保存先：<code>' + esc(src.replace(/^(\.\.\/)+/, "")) + "</code>（実ホスト名・IP・個人名はマスクしてください。<a href=\"" + root + 'assets/img/README.md">差し込みガイド</a>）</p></div></div>';
      };
      img.src = src;
    });
  }

  // ---------- チェックリスト（ハンズオン等・ブラウザ内保存） ----------
  function buildChecklists() {
    var saved = store.get("ca-check", {});
    document.querySelectorAll("ul.checklist[data-key]").forEach(function (ul) {
      var key = ul.getAttribute("data-key");
      ul.querySelectorAll(":scope > li").forEach(function (li, i) {
        var id = key + "-" + i;
        li.innerHTML = '<label><input type="checkbox"' + (saved[id] ? " checked" : "") + "><span>" + li.innerHTML + "</span></label>";
        li.querySelector("input").addEventListener("change", function (e) {
          var cur = store.get("ca-check", {}); cur[id] = e.target.checked; store.set("ca-check", cur);
        });
      });
    });
  }

  // ---------- 章末振り返り問題（固定順） ----------
  function buildReviews() {
    var marks = "ABCDEFG";
    document.querySelectorAll(".rq").forEach(function (rq) {
      var correct = Number(rq.getAttribute("data-correct"));
      var opts = rq.querySelectorAll(".rq-opts > li");
      opts.forEach(function (li, i) {
        var b = el("button", { type: "button" }, '<span class="mk">' + marks[i] + "</span><span>" + li.innerHTML + "</span>");
        li.innerHTML = ""; li.appendChild(b);
        b.addEventListener("click", function () {
          if (rq.classList.contains("answered")) return;
          rq.classList.add("answered");
          opts.forEach(function (o, j) {
            var bb = o.querySelector("button"); bb.disabled = true;
            if (j === correct) bb.classList.add("correct");
          });
          var ok = i === correct;
          if (!ok) b.classList.add("wrong");
          var exp = rq.querySelector(".rq-exp");
          if (exp) exp.insertAdjacentHTML("afterbegin", '<span class="rq-result ' + (ok ? "ok" : "ng") + '">' + (ok ? "正解！" : "不正解… 正解は " + marks[correct]) + "</span>");
        });
      });
    });
    document.querySelectorAll(".rq-reset").forEach(function (btn) {
      btn.addEventListener("click", function () { location.reload(); });
    });
  }

  // ---------- ページャー & 完了チェック ----------
  function buildPager() {
    var m = current.match(/^learn\/(ch\d\d)\.html$/);
    if (!m) return;
    var idx = CHAPTERS.findIndex(function (c) { return c.id === m[1]; });
    var content = document.querySelector(".content");
    var done = store.get("ca-done", {});
    var box = el("div", { "class": "complete-box" });
    function paint() {
      var d = store.get("ca-done", {})[m[1]];
      box.innerHTML = '<p class="small muted">学習が終わったらチェックしましょう（このブラウザにのみ保存されます）</p>' +
        '<button type="button" class="btn' + (d ? " ghost" : "") + '">' + (d ? "✔ 完了済み（クリックで取り消し）" : "この章を完了にする") + "</button>";
    }
    paint();
    box.addEventListener("click", function (e) {
      if (!e.target.closest("button")) return;
      var dd = store.get("ca-done", {}); dd[m[1]] = !dd[m[1]]; store.set("ca-done", dd); paint();
    });
    content.appendChild(box);
    var pager = el("nav", { "class": "pager", "aria-label": "章移動" });
    var h = "";
    if (idx > 0) h += '<a class="prev" href="' + CHAPTERS[idx - 1].id + '.html"><span class="dir">◀ 前の章</span>第' + idx + "章 " + CHAPTERS[idx - 1].t + "</a>";
    else h += '<a class="prev" href="../index.html"><span class="dir">◀ 戻る</span>ホーム</a>';
    if (idx < CHAPTERS.length - 1) h += '<a class="next" href="' + CHAPTERS[idx + 1].id + '.html"><span class="dir">次の章 ▶</span>第' + (idx + 2) + "章 " + CHAPTERS[idx + 1].t + "</a>";
    else h += '<a class="next" href="../cases.html"><span class="dir">次のフェーズ ▶</span>ケーススタディ</a>';
    pager.innerHTML = h;
    content.appendChild(pager);
    void done;
  }

  // ---------- ホームの進捗 ----------
  function buildHomeProgress() {
    var host = document.getElementById("chapter-cards");
    if (!host) return;
    var done = store.get("ca-done", {});
    var n = 0;
    host.innerHTML = CHAPTERS.map(function (c, i) {
      if (done[c.id]) n++;
      return '<a class="card" href="learn/' + c.id + '.html"><div class="eyebrow">CHAPTER ' + String(i + 1).padStart(2, "0") + (done[c.id] ? ' <span class="chip ok">完了</span>' : "") + "</div><h4>" + c.t + '</h4><p class="small muted" style="margin:0">ゴール：' + c.g + "</p></a>";
    }).join("");
    var p = document.getElementById("home-progress");
    if (p) p.innerHTML = '<div class="progress"><span style="width:' + Math.round(n / CHAPTERS.length * 100) + '%"></span></div><p class="small muted">学びフェーズ進捗：' + n + " / " + CHAPTERS.length + " 章完了</p>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildShell();
    injectMarkers();
    buildDiagrams();
    buildFlows();
    buildReviews();
    buildShots();
    buildChecklists();
    buildPager();
    buildHomeProgress();
    document.dispatchEvent(new CustomEvent("ca:ready"));
  });
})();
