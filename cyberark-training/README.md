# CyberArk 新人研修サイト

CyberArk製品（PAM Self-Hosted / Privilege Cloud ほか）を、新入社員が業務で使い始められるようにするための静的Webサイト形式の教材です。

## 構成

| パス | 内容 |
|---|---|
| `index.html` | ホーム（研修の全体像とゴール、架空の舞台設定・登場人物・ホスト一覧） |
| `references.html` | 参考出典・公式ナレッジ、記述ごとの検証状況 |
| `glossary.html` | 用語集（検索・分類フィルタ付き） |
| `learn/ch01.html`〜`ch15.html` | 学びフェーズ（全15章、章末振り返り問題は固定順） |
| `cases.html` | ケーススタディ（基本3題・応用3題、部分点・自己採点ルーブリック付き） |
| `quiz.html` | 総まとめ練習問題（出題順・選択肢順とも毎回ランダム、章別正答率） |
| `assets/style.css` | 共通スタイル（ライト/ダーク、PC/スマートフォン対応） |
| `assets/app.js` | 共通UI（ナビ、図の描画、ラジオボタン式ステップフロー、章末問題） |
| `assets/cases.js` | ケーススタディ採点エンジン |
| `assets/quiz-bank.js` | 総まとめ問題バンク |

## 使い方

ビルド不要です。`index.html` をブラウザで開くか、任意の静的Webサーバ（社内Webサーバ、S3静的ホスティング等）に配置してください。外部CDNへの依存はありません。

```sh
# ローカル確認の例
cd cyberark-training && python3 -m http.server 8000
# → http://localhost:8000/
```

## 編集のしかた

- **図**：`<script class="dg" type="application/json">` に部品（nodes）と矢印（edges）をJSONで書くと自動でSVGに描画されます。`"s":[1,2]` を付けると、その部品・矢印はSTEP 1・2で強調されます。
- **ステップ式フロー**：`<figure class="flow">` の中に図と `<ol class="flow-desc"><li data-label="見出し">説明</li>…</ol>` を置くと、ラジオボタンが自動生成されます。
- **章末問題**：`<div class="rq" data-correct="正解の番号(0始まり)">` で記述します（固定順）。
- **総まとめ問題**：`assets/quiz-bank.js` に追加します。選択肢の先頭が正解（表示時にシャッフル）。
- **ケーススタディ**：`data-type` に `single` / `multi` / `order` / `match` / `essay` を指定します。

## 注意

- 登場する企業・人物・ホスト名・IPアドレスはすべて架空です。
- 製品仕様・名称は変わることがあります（2026年2月 Palo Alto Networks による買収完了、2026年5月 Idira ブランド発表）。`references.html` の「要確認」項目は、研修実施前に公式ドキュメントで最終確認してください。
- 進捗・自己ベストは閲覧者のブラウザ（localStorage）にのみ保存されます。
