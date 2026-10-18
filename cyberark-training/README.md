# CyberArk 新人研修サイト

CyberArk製品（PAM Self-Hosted / Privilege Cloud ほか）を、新入社員が業務で使い始められるようにするための静的Webサイト形式の教材です。

## 構成

| パス | 内容 |
|---|---|
| `index.html` | ホーム（研修の全体像とゴール、架空の舞台設定・登場人物・ホスト一覧） |
| `references.html` | 参考出典・公式ナレッジ、記述ごとの検証状況 |
| `glossary.html` | 用語集（検索・分類フィルタ付き） |
| `learn/ch01.html`〜`ch16.html` | 学びフェーズ（全16章。第16章は検証環境でのハンズオン。章末振り返り問題は固定順） |
| `cases.html` | ケーススタディ（基本3題・応用3題、部分点・自己採点ルーブリック付き） |
| `quiz.html` | 総まとめ練習問題（111問、出題順・選択肢順とも毎回ランダム、難易度・範囲指定、章別正答率） |
| `report.html` | 成績・学習記録（受講者が記録を確認し、提出用JSONを作成。講師の採点済みファイルを読み込みコメント表示） |
| `trainer.html` | 講師用：提出ファイルの一括読み込み、一覧・CSV出力、記述問題のルーブリック採点とコメント返却 |
| `assets/style.css` | 共通スタイル（ライト/ダーク、PC/スマートフォン対応） |
| `assets/app.js` | 共通UI（ナビ、図の描画、ラジオボタン式ステップフロー、章末問題） |
| `assets/cases.js` | ケーススタディ採点エンジン |
| `assets/quiz-bank.js` | 総まとめ問題バンク（`d: 1` 基礎／`d: 2` 応用） |
| `assets/records.js` | 学習記録の収集・書き出し・読み込み |
| `assets/img/` | 画面キャプチャ差し込み用フォルダ（ファイル名一覧と取得ルールは `assets/img/README.md`） |

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
- **画面キャプチャ**：`<figure class="shot" data-src="../assets/img/ファイル名.png" data-title="…" data-how="取得手順">` を置くと、画像があれば表示、無ければ差し込み枠を表示します。
- **ハンズオンのチェックリスト**：`<ul class="checklist" data-key="lab1">` で作成します。項目数を変えたら `assets/records.js` の `LABS` も更新してください。

## 提出・採点の流れ（サーバ不要）

1. 受講者：`report.html` で氏名を入力し「提出用ファイルをダウンロード」→ 講師へ提出
2. 講師：`trainer.html` で提出ファイルを複数読み込み → 一覧確認・CSV出力 → 「採点」で記述問題をルーブリック採点・コメント → 「採点済みファイルをダウンロード」して返却
3. 受講者：`report.html` の「ファイルを読み込む」で採点済みファイルを取り込むと、講師コメントが表示される

## 情報の鮮度

`references.html` の「情報の鮮度を保つ運用ルール」に沿って四半期ごとに見直し、検証表の「最終確認日」を更新してください。

## 注意

- 登場する企業・人物・ホスト名・IPアドレスはすべて架空です。
- 製品仕様・名称は変わることがあります（2026年2月 Palo Alto Networks による買収完了、2026年5月 Idira ブランド発表）。`references.html` の「要確認」項目は、研修実施前に公式ドキュメントで最終確認してください。
- 進捗・自己ベストは閲覧者のブラウザ（localStorage）にのみ保存されます。
