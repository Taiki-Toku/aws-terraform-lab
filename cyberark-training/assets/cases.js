/* =========================================================
   ケーススタディ採点エンジン
   設問タイプ：
     single … 単一選択（data-correct="index"）
     multi  … 複数選択（data-correct="i,j,k"）部分点＝(正選択−誤選択)/正解数
     order  … 並べ替え（li を正しい順で記述。表示時にシャッフル）位置一致ごとに部分点
     match  … 対応付け（li の data-answer と data-options）一致ごとに部分点
     essay  … 記述（採点後に模範解答とルーブリックを表示し、自己採点で加点）
   ========================================================= */
(function () {
  "use strict";
  // app.js より先に読み込まれるため、ストレージは呼び出し時に解決する
  var store = {
    get: function (k, d) { return window.CA_STORE ? window.CA_STORE.get(k, d) : d; },
    set: function (k, v) { if (window.CA_STORE) window.CA_STORE.set(k, v); }
  };
  var MK = "ABCDEFGHIJ";

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  function initQuestion(q) {
    var type = q.getAttribute("data-type");
    var pts = Number(q.getAttribute("data-pts")) || 0;
    var h = q.querySelector(".cq-h");
    if (h && !h.querySelector(".cq-pts")) h.insertAdjacentHTML("beforeend", '<span class="cq-pts">' + pts + "点 <b class=\"got\"></b></span>");

    if (type === "single" || type === "multi") {
      var ul = q.querySelector(".cq-opts");
      var items = Array.prototype.slice.call(ul.children);
      var box = document.createElement("div");
      items.forEach(function (li, i) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "opt-btn"; b.setAttribute("data-i", i);
        b.setAttribute("aria-pressed", "false");
        b.innerHTML = '<span class="mk">' + (type === "multi" ? "☐ " : "") + MK[i] + "</span><span>" + li.innerHTML + "</span>";
        b.addEventListener("click", function () {
          if (q.classList.contains("graded")) return;
          if (type === "single") box.querySelectorAll(".opt-btn").forEach(function (x) { x.classList.remove("sel"); x.setAttribute("aria-pressed", "false"); });
          var on = !b.classList.contains("sel");
          b.classList.toggle("sel", on); b.setAttribute("aria-pressed", on ? "true" : "false");
          if (type === "multi") b.querySelector(".mk").textContent = (on ? "☑ " : "☐ ") + MK[i];
        });
        box.appendChild(b);
      });
      if (type === "multi") q.querySelector(".cq-h").insertAdjacentHTML("afterend", '<p class="small muted" style="margin:0 0 6px">（当てはまるものをすべて選択。部分点あり／誤選択は減点）</p>');
      ul.replaceWith(box);
    } else if (type === "order") {
      var ol = q.querySelector(".cq-order");
      var steps = Array.prototype.slice.call(ol.children).map(function (li, i) { return { text: li.innerHTML, pos: i }; });
      var n = steps.length;
      var wrap = document.createElement("div");
      wrap.innerHTML = '<p class="small muted" style="margin:0 0 6px">（各項目に実施する順番を選択。位置が合っている項目ごとに部分点）</p>';
      shuffle(steps).forEach(function (s) {
        var row = document.createElement("div");
        row.className = "order-row"; row.setAttribute("data-pos", s.pos);
        var sel = '<select aria-label="順番"><option value="">順番</option>';
        for (var k = 1; k <= n; k++) sel += '<option value="' + (k - 1) + '">' + k + "番目</option>";
        row.innerHTML = sel + "</select><span>" + s.text + "</span>";
        wrap.appendChild(row);
      });
      ol.replaceWith(wrap);
    } else if (type === "match") {
      var opts = (q.getAttribute("data-options") || "").split("|");
      var ulm = q.querySelector(".cq-match");
      var wrapm = document.createElement("div");
      wrapm.innerHTML = '<p class="small muted" style="margin:0 0 6px">（各項目に最も適切なものを選択。一致ごとに部分点）</p>';
      Array.prototype.slice.call(ulm.children).forEach(function (li) {
        var row = document.createElement("div");
        row.className = "order-row"; row.setAttribute("data-ans", li.getAttribute("data-answer"));
        var sel = '<select aria-label="選択"><option value="">選択</option>' + opts.map(function (o, i) { return '<option value="' + i + '">' + o + "</option>"; }).join("") + "</select>";
        row.innerHTML = sel + "<span>" + li.innerHTML + "</span>";
        wrapm.appendChild(row);
      });
      ulm.replaceWith(wrapm);
    } else if (type === "essay") {
      var ta = document.createElement("textarea");
      ta.placeholder = "ここに自分の考えを書いてから「採点する」を押してください（書いた内容はこのページを離れると消えます）";
      var prompt = q.querySelector(".cq-prompt");
      (prompt || q.querySelector(".cq-h")).insertAdjacentElement("afterend", ta);
      var rub = q.querySelector(".rubric");
      rub.querySelectorAll("li").forEach(function (li) {
        var p = Number(li.getAttribute("data-pts")) || 0;
        li.innerHTML = '<input type="checkbox" disabled value="' + p + '"><span>' + li.innerHTML + ' <span class="chip">' + p + "点</span></span>";
      });
      var fb = q.querySelector(".feedback");
      fb.insertAdjacentHTML("afterbegin", '<strong>自己採点：</strong>模範解答と比べ、自分の答えに含まれている観点にチェックを入れてください（チェックに応じて点数が加算されます）。');
      fb.appendChild(rub);
      rub.addEventListener("change", function () { q.dispatchEvent(new CustomEvent("cq:rescore", { bubbles: true })); });
    }
  }

  function gradeQuestion(q) {
    var type = q.getAttribute("data-type");
    var pts = Number(q.getAttribute("data-pts")) || 0;
    var got = 0;
    q.classList.add("graded");
    if (type === "single") {
      var c = Number(q.getAttribute("data-correct"));
      q.querySelectorAll(".opt-btn").forEach(function (b) {
        var i = Number(b.getAttribute("data-i")); b.disabled = true;
        if (i === c) b.classList.add("correct");
        else if (b.classList.contains("sel")) b.classList.add("wrong");
        if (i === c && b.classList.contains("sel")) got = pts;
      });
    } else if (type === "multi") {
      var cs = q.getAttribute("data-correct").split(",").map(Number);
      var hit = 0, miss = 0;
      q.querySelectorAll(".opt-btn").forEach(function (b) {
        var i = Number(b.getAttribute("data-i")); b.disabled = true;
        var isC = cs.indexOf(i) >= 0, sel = b.classList.contains("sel");
        if (isC) b.classList.add("correct");
        if (sel && isC) hit++;
        if (sel && !isC) { miss++; b.classList.add("wrong"); }
      });
      got = Math.round(pts * Math.max(0, (hit - miss) / cs.length));
    } else if (type === "order" || type === "match") {
      var rows = q.querySelectorAll(".order-row"), ok = 0;
      rows.forEach(function (r) {
        var sel = r.querySelector("select"); sel.disabled = true;
        var ans = r.getAttribute(type === "order" ? "data-pos" : "data-ans");
        var right = sel.value !== "" && sel.value === ans;
        if (right) ok++;
        r.classList.add(right ? "correct" : "wrong");
        var label = type === "order" ? (Number(ans) + 1) + "番目" : sel.options[Number(ans) + 1].text;
        if (!right) r.insertAdjacentHTML("beforeend", ' <span class="small">（正解：' + label + "）</span>");
      });
      got = Math.round(pts * ok / rows.length);
    } else if (type === "essay") {
      var ta = q.querySelector("textarea"); if (ta) ta.readOnly = true;
      q.querySelectorAll(".rubric input").forEach(function (x) { x.disabled = false; });
      got = essayScore(q);
    }
    q.querySelector(".got").textContent = "→ " + got + "点";
    return got;
  }

  function essayScore(q) {
    var pts = Number(q.getAttribute("data-pts")) || 0, s = 0;
    q.querySelectorAll(".rubric input:checked").forEach(function (x) { s += Number(x.value); });
    return Math.min(pts, s);
  }

  function rank(p) { return p >= 90 ? "S" : p >= 75 ? "A" : p >= 60 ? "B" : "C"; }

  function initCase(c) {
    var id = c.getAttribute("data-case");
    var body = c.querySelector(".case-body");
    var original = body.innerHTML;
    var bar = document.createElement("div");
    bar.className = "case-score";
    c.appendChild(bar);

    function setup() {
      body.innerHTML = original;
      body.querySelectorAll(".cq").forEach(initQuestion);
      var max = 0; body.querySelectorAll(".cq").forEach(function (q) { max += Number(q.getAttribute("data-pts")) || 0; });
      var best = store.get("ca-case-" + id, null);
      bar.innerHTML = '<span class="small">配点 ' + max + "点" + (best !== null ? "｜自己ベスト " + best + "%" : "") + '</span><span><button type="button" class="btn sm" data-act="grade">採点する</button> <button type="button" class="btn ghost sm" data-act="reset">やり直す</button></span>';
      var result = null;
      function total() {
        var sum = 0;
        body.querySelectorAll(".cq").forEach(function (q) {
          var g;
          if (q.getAttribute("data-type") === "essay") { g = essayScore(q); q.querySelector(".got").textContent = "→ " + g + "点"; }
          else g = Number(q.getAttribute("data-got")) || 0;
          sum += g;
        });
        var pct = max ? Math.round(sum / max * 100) : 0;
        result.innerHTML = "<strong>" + sum + " / " + max + " 点（" + pct + "%）ランク " + rank(pct) + "</strong>";
        var b = store.get("ca-case-" + id, 0); if (pct > b) store.set("ca-case-" + id, pct);
        paintSummary();
      }
      bar.onclick = function (e) {
        var b = e.target.closest("button"); if (!b) return;
        if (b.getAttribute("data-act") === "reset") { setup(); return; }
        if (b.getAttribute("data-act") === "grade" && !b.disabled) {
          body.querySelectorAll(".cq").forEach(function (q) { var g = gradeQuestion(q); q.setAttribute("data-got", g); });
          b.disabled = true;
          result = document.createElement("span");
          bar.insertBefore(result, bar.firstChild.nextSibling);
          total();
          body.addEventListener("cq:rescore", total);
          var first = body.querySelector(".cq");
          if (first && first.scrollIntoView) { try { first.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (err) { /* noop */ } }
        }
      };
    }
    setup();
  }

  function paintSummary() {
    var host = document.getElementById("case-summary"); if (!host) return;
    var rows = Array.prototype.slice.call(document.querySelectorAll(".case")).map(function (c) {
      var id = c.getAttribute("data-case"), t = c.querySelector("summary h3").textContent;
      var best = store.get("ca-case-" + id, null);
      return "<tr><td><a href=\"#case-" + id + "\">" + t + "</a></td><td>" + (best === null ? '<span class="muted">未挑戦</span>' : best + "%（" + rank(best) + "）") + "</td></tr>";
    }).join("");
    host.innerHTML = '<div class="table-wrap"><table><thead><tr><th>ケース</th><th>自己ベスト</th></tr></thead><tbody>' + rows + "</tbody></table></div>";
  }

  document.addEventListener("ca:ready", function () {
    document.querySelectorAll(".case").forEach(initCase);
    paintSummary();
  });
})();
