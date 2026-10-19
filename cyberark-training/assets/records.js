/* =========================================================
   学習記録の収集・書き出し・読み込み（受講者／講師ページ共通）
   サーバを使わず、JSONファイルの受け渡しで提出・採点する
   ========================================================= */
(function () {
  "use strict";
  var SCHEMA = "ca-training-report/1";
  // 第16章ハンズオンのチェック項目数（章の構成を変えたら合わせて更新する）
  var LABS = { lab1: 4, lab2: 5, lab3: 6, lab4: 5, lab5: 4, lab6: 4, lab7: 3, lab8: 3, labclean: 4 };
  var LAB_NAMES = { lab1: "演習1 画面ツアー", lab2: "演習2 Safe作成", lab3: "演習3 アカウント登録", lab4: "演習4 PSM接続・録画", lab5: "演習5 二重承認", lab6: "演習6 不一致からの復旧", lab7: "演習7 CPMエラー切り分け", lab8: "演習8 REST API", labclean: "後片付け" };

  function S() { return window.CA_STORE; }

  function labProgress(check) {
    var out = {};
    Object.keys(LABS).forEach(function (k) {
      var n = 0;
      for (var i = 0; i < LABS[k]; i++) if (check[k + "-" + i]) n++;
      out[k] = [n, LABS[k]];
    });
    return out;
  }

  // 全クイズ履歴から章別の累計正答率を出す
  function chapterAccuracy(hist) {
    var acc = {};
    (hist || []).forEach(function (h) {
      Object.keys(h.byCh || {}).forEach(function (c) {
        acc[c] = acc[c] || [0, 0];
        acc[c][0] += h.byCh[c][0]; acc[c][1] += h.byCh[c][1];
      });
    });
    return acc;
  }

  function collect() {
    var st = S();
    return {
      schema: SCHEMA,
      learner: st.get("ca-learner", { name: "", id: "" }),
      exportedAt: new Date().toISOString(),
      chaptersDone: st.get("ca-done", {}),
      quizBest: st.get("ca-quiz-best", null),
      quizHistory: st.get("ca-quiz-history", []),
      caseBest: (function () { var o = {}; ["B1", "B2", "B3", "B4", "A1", "A2", "A3"].forEach(function (k) { var v = st.get("ca-case-" + k, null); if (v !== null) o[k] = v; }); return o; })(),
      caseRecords: st.get("ca-case-records", {}),
      handsOn: labProgress(st.get("ca-check", {})),
      checks: st.get("ca-check", {}),
      trainerReview: st.get("ca-trainer-review", null)
    };
  }

  function download(name, text, type) {
    var blob = new Blob([text], { type: type || "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  function readFiles(files, cb) {
    var out = [], left = files.length;
    if (!left) return cb(out);
    Array.prototype.forEach.call(files, function (f) {
      var r = new FileReader();
      r.onload = function () {
        try { var d = JSON.parse(r.result); if (d.schema === SCHEMA) { d._file = f.name; out.push(d); } else out.push({ _error: f.name + "：形式が違います" }); }
        catch (e) { out.push({ _error: f.name + "：JSONとして読めません" }); }
        if (--left === 0) cb(out);
      };
      r.readAsText(f);
    });
  }

  // 環境によって非ASCIIのファイル名が無視されるため、ファイル名は英数字のみにする（氏名はファイル内に保存）
  function safeName(s) { var v = String(s || "").replace(/[^A-Za-z0-9_-]+/g, ""); return v || "learner"; }

  window.CA_RECORDS = { SCHEMA: SCHEMA, LABS: LABS, LAB_NAMES: LAB_NAMES, collect: collect, download: download, readFiles: readFiles, chapterAccuracy: chapterAccuracy, labProgress: labProgress, safeName: safeName };
})();
