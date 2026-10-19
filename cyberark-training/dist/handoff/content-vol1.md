# CyberArk 新人研修 教材パック：第1分冊 はじめに・基礎（ホーム／出典／用語集／第1〜4章）

Claude Code で作成し、公式ドキュメント（docs.cyberark.com）と Palo Alto Networks 公式発表で検証済みの内容です。
**事実（数値・日付・製品名・仕様・正解）は変更しないでください。** 表現・レイアウト・見せ方の改善は自由です。
企業（ヒカリ精機株式会社）・人物・ホスト名・IPアドレスはすべて架空です。

## 全体の章立て（参考）

- 第1章 特権IDとPAMの基礎 ― ゴール：なぜ特権IDを守る必要があるのかを説明できる
- 第2章 CyberArk製品群の全体像 ― ゴール：製品ポートフォリオと提供形態を地図として描ける
- 第3章 PAMのコアアーキテクチャ ― ゴール：Vault・PVWA・CPM・PSMの役割と通信を説明できる
- 第4章 Digital Vaultとセキュリティ ― ゴール：Vaultが「金庫」である理由と保護の仕組みを説明できる
- 第5章 Self-HostedとPrivilege Cloud ― ゴール：2つの提供形態の違いと選び方を説明できる
- 第6章 Safe設計と権限モデル ― ゴール：命名規則と権限を含むSafe設計ができる
- 第7章 アカウントとプラットフォーム ― ゴール：アカウント登録とプラットフォーム設定の関係を説明できる
- 第8章 CPMとパスワードライフサイクル ― ゴール：変更・検証・調整の流れと失敗時の切り分けができる
- 第9章 Master Policyとアクセスワークフロー ― ゴール：二重承認・排他・ワンタイム等を要件に応じて選べる
- 第10章 PSMによるセッション管理 ― ゴール：セッション分離・録画の流れと運用を説明できる
- 第11章 認証・ユーザー管理・ID連携 ― ゴール：LDAP/SAML/MFA連携とユーザー設計を説明できる
- 第12章 脅威検知・監査・レポート ― ゴール：PTA/監査ログ/SIEM連携の使い分けができる
- 第13章 アプリケーションとシークレット管理 ― ゴール：CP/CCP/Secrets Manager/Secrets Hubを使い分けられる
- 第14章 ZSP/JITとモダンアクセス ― ゴール：SIA・SCA・EPM・Remote Accessの位置づけを説明できる
- 第15章 設計思想・導入・運用の実践 ― ゴール：段階導入と日常運用・障害対応の勘所を説明できる
- 第16章 ハンズオン演習（検証環境） ― ゴール：検証環境で登録・接続・録画確認・障害復旧を一人で実施できる


---

<!-- ページ：index.html -->

WELCOME｜はじめに

# CyberArk 新人研修サイト

特権アクセス管理（PAM）の考え方から、CyberArk製品の機能・設計思想・日常運用までを一通り学び、**「先輩の横で実務を始められる」**状態になることを目指します。

> 【★重点の1行要約】
🔑

CyberArkを一言でいうと「会社中の“マスターキー”を、金庫に入れて、使うたびに記録し、使い終わったら鍵を作り替える仕組み」です。

この一文の意味が全部説明できるようになれば、研修は合格です。

## 研修全体像とゴール

研修は次の4フェーズで進めます。各フェーズの冒頭、各章の冒頭にも「全体像とゴール」を掲載しています。

> 図「図：研修の進め方（左から右へ）」（部品と矢印。`[s:n]` は強調するSTEP番号）
>  - 部品：① はじめに ／ 出典・用語集 全体像とゴール（種別:user）
>  - 部品：② 学び ／ 全16章（ハンズオン含む） ＋章末振り返り（種別:comp）
>  - 部品：③ ケーススタディ ／ 基本4題＋応用3題 部分点あり採点（種別:vault）
>  - 部品：④ 総まとめ ／ ランダム出題 苦手分析（種別:target）
>  - 矢印：① はじめに → ② 学び
>  - 矢印：② 学び → ③ ケーススタディ
>  - 矢印：③ ケーススタディ → ④ 総まとめ

| フェーズ | 内容 | ゴール（できるようになること） | 目安時間 |
|---|---|---|---|
| ① はじめに | 出典・公式ナレッジ／用語集／本ページ | 学習の進め方と、困ったときに調べる場所（公式ドキュメント等）がわかる | 30分 |
| ② 学び | 全16章（基礎→製品→設計→運用→ハンズオン） | 各コンポーネントの役割・設計の考え方・運用の勘所を自分の言葉で説明できる | 15〜20時間＋ハンズオン6〜8時間 |
| ③ ケーススタディ | 基本編4題・応用編3題 | 架空企業の要件から、設計判断・トラブル切り分け・インシデント初動を考えられる | 4〜6時間 |
| ④ 総まとめ練習問題 | ランダム出題の問題バンク | 正答率80%以上を安定して取れる（出題順・選択肢順は毎回変わります） | 1〜2時間×数回 |
| ⑤ 記録・提出 | 成績・学習記録／講師用ページ | 学習記録を講師へ提出し、記述問題の講師採点・コメントを受け取る | — |

> 【ゴール】研修修了時の到達目標
>

- 「特権ID」とは何か、なぜ狙われるのか、PAMで何を防ぐのかを非エンジニアにも説明できる。

- CyberArkの主要コンポーネント（Vault / PVWA / CPM / PSM / PSM for SSH / PTA）と、SaaS版（Privilege Cloud）の構成要素を図で描ける。

- Safe・アカウント・プラットフォーム・Master Policyの関係を理解し、要件に合った設定案を作れる。

- パスワード変更失敗、セッション接続失敗などの典型トラブルを、ログと構成から切り分けられる。

- アプリケーションのシークレット管理、ZSP/JIT（ゼロ・スタンディング特権／ジャストインタイム）などモダンな領域の製品の位置づけを説明できる。

## 学びフェーズ：全16章

カードをクリックすると各章へ移動します。章末の「この章を完了にする」を押すと進捗に反映されます。

### 章の構成（ロードマップ）

| ブロック | 章 | このブロックの狙い |
|---|---|---|
| 基礎 | 1〜2章 | なぜPAMが必要か、CyberArkの全体地図 |
| コア構成 | 3〜5章 | PAMの部品と通信、金庫（Vault）の守り方、提供形態の違い |
| 設計・設定 | 6〜9章 | Safe・アカウント・プラットフォーム・パスワード自動管理・アクセス制御ポリシー |
| 利用・監視 | 10〜12章 | セッション管理、認証連携、脅威検知と監査 |
| 発展 | 13〜14章 | アプリのシークレット管理、ZSP/JITとモダンアクセス |
| 実践 | 15〜16章 | 設計思想・段階導入・日常運用・障害対応、検証環境でのハンズオン |

> 【ゴール】2つの提供形態をバランスよく（Self-Hosted 5：Privilege Cloud 5）
>

CyberArk PAMには、自社で構築する **Self-Hosted** と、SaaSの **Privilege Cloud** があります。本教材は両方を同じ比重で扱います。第5章で全体像を比べ、第3〜16章の章末にある「Self-Hosted と Privilege Cloud の違い（この章のポイント）」で、章ごとの差分を確認してください。

## この教材の使い方

#### 📘 マークの意味

身近な例え 難しい概念を日常の例に置き換えます。
必ず覚える 現場で必ず使う重点項目です。
事故につながる やってはいけないこと・誤解しやすい点です。
先輩の知恵 運用現場で役立つ小技です。

#### 🧭 フロー図の見方

処理の流れを説明する箇所では、図の下に**ラジオボタン（STEP 1, 2, 3 …）**があります。STEPを選ぶと、図のその段階の矢印・部品だけが強調され、説明文が切り替わります。「次へ」ボタンでも進められます。

スマートフォンでは図を横にスクロールできます。

#### 🏢 架空の舞台設定

本教材は架空の製造業**「ヒカリ精機株式会社」**（ドメイン `hikari.example`）の情報システム部を舞台にしています。登場人物・ホスト名・IPアドレスはすべて架空です。

### 登場人物（すべて架空）

葵   高橋 葵   新入社員。PAMチーム配属。あなた自身の分身です。
誠   山本 誠   PAMチームの先輩（CyberArk歴8年）。たとえ話が得意。
玲   森 玲奈   情報セキュリティ部 課長。監査・規程の責任者。
翔   中村 翔   業務アプリ開発チーム。DB接続パスワードの扱いに悩み中。
拓   小林 拓也   保守委託先「ネクスト保守サービス（架空）」の担当者。

### ヒカリ精機の主なシステム（架空）

| ホスト名 | IPアドレス | 役割 |
|---|---|---|
| `hk-vault01` | 10.10.10.11 | Digital Vault（本番） |
| `hk-vault-dr01` | 10.20.10.11 | DR Vault（災害対策サイト） |
| `hk-pvwa01 / 02` | 10.10.20.21 / .22 | PVWA（Web画面）、ロードバランサ配下 `pam.hikari.example` |
| `hk-cpm01` | 10.10.20.31 | CPM（パスワード自動管理） |
| `hk-psm01 / 02` | 10.10.20.41 / .42 | PSM（Windows/RDP系セッション管理） |
| `hk-psmp01` | 10.10.20.51 | PSM for SSH（Linux/SSH系セッション管理） |
| `hk-pta01` | 10.10.20.61 | PTA（特権脅威分析） |
| `lab-*`（検証環境） | 10.99.0.0/16 | 第16章ハンズオン用（lab.hikari.example） |
| `hk-ad01` | 10.30.0.10 | Active Directory ドメインコントローラ |
| `hk-web01` | 10.30.1.11 | Linux Webサーバ（root, opsadmin） |
| `hk-web02` | 10.40.1.12 | AWS上のLinux Webサーバ（第14章 SIAの例） |
| `hk-app01` | 10.30.1.21 | 販売アプリサーバ（第13章 CCPの例） |
| `hk-conn01 / 02` | 10.10.40.11 / .12 | Privilege Cloud コネクタ（第5章・ケーススタディの例） |
| `hk-db01` | 10.30.2.21 | Oracle Database（SYSTEM, appuser） |
| `hk-fs01` | 10.30.3.31 | Windows ファイルサーバ（ローカルAdministrator） |

> 【出典・検証メモ】情報の鮮度について
>

本教材は2026年10月時点で確認できた公開情報をもとに作成しています。2026年2月にPalo Alto NetworksによるCyberArkの買収が完了し、2026年5月には新ブランド「Idira」が発表されました。製品名・画面名は今後も変わる可能性があります。手順やバージョン固有の値は、必ず公式ドキュメントの該当バージョンで確認してください。


---

<!-- ページ：references.html -->

はじめに｜参考出典・公式ナレッジ

# 参考出典・公式ナレッジ

困ったときに「どこを見れば正しい答えがあるか」を知っておくことは、製品知識そのものより大切です。

- 公式ドキュメント・公式トレーニング・コミュニティの使い分けがわかる

- 本教材の各記述がどの情報で裏付けられているか（検証状況）を確認できる

> 【たとえ話】情報源は「病院」と同じ
>

公式ドキュメントは**主治医の診断書**、公式ナレッジベース（サポート記事）は**専門医の所見**、コミュニティやブログは**知人の体験談**です。体験談は参考になりますが、最終判断は必ず診断書（公式ドキュメント）で行います。

## 公式情報源

| 情報源 | URL | 使いどころ |
|---|---|---|
| Idira（CyberArk）Docs（公式ドキュメントポータル） | [docs.cyberark.com](https://docs.cyberark.com/) | 製品ごとの設計・インストール・設定・リリースノート。**右上でバージョンを必ず合わせる**（PAM Self-Hosted / Privilege Cloud / Identity Security Platform Shared Services / Secure Infrastructure Access / Endpoint Privilege Manager / Secrets Manager / Secrets Hub など） |
| ISPSS 導入ドキュメント | [ISPSS 導入・外向き通信要件](https://docs.cyberark.com/setup/latest/en/content/ispss-deployment/deployment/deploy-outbound_traffic.htm) | SaaSプラットフォーム（Identity Security Platform Shared Services）の初期構築・コネクタ要件 |
| 製品名の変更（ドキュメント内の告知） | [Secrets Manager, SaaS の改称告知](https://docs.cyberark.com/secrets-manager-saas/latest/en/content/conjurcloud/cl_conjurcloudoverview.htm)ほか各製品の What's new | 旧名⇔新名の対応。旧 cyberark.com の「Product Name Updates」ページは現在 Idira のページへ転送されるため、各製品ドキュメントの告知・リリースノートで確認する |
| Idira 製品サイト（Palo Alto Networks） | [paloaltonetworks.com/idira](https://www.paloaltonetworks.com/idira) | 製品の全体像・最新の製品名。www.cyberark.com は現在このページへ転送される |
| Palo Alto Networks プレスリリース | [paloaltonetworks.com/company/press](https://www.paloaltonetworks.com/company/press/2026) | 買収・新ブランド・新機能などの公式発表 |
| CyberArk University（公式トレーニング） | [training.cyberark.com](https://training.cyberark.com/learn) | 公式eラーニング・認定資格。資格は運用向けの **Defender**（PAM・EPM・IAM〔旧Access〕など）、構築向けの **Sentry**（PAM・Secrets Manager など）、上級の **Guardian** の3段階。サイト上でも「CyberArk is now Idira」と案内されており、試験名は変わることがあるため受験前に最新情報を確認（2026-10-19 リンク確認） |
| CyberArk Community / サポートポータル | [community.cyberark.com](https://community.cyberark.com/s/) | ナレッジ記事（KB）、Q&A、ソフトウェアダウンロード、ケース起票（多くは要ログイン。2026-10-19 リンク確認） |
| CyberArk Marketplace | コミュニティ／サポートポータルから遷移 | プラグイン（CPMプラグイン・PSMコネクタ）や連携モジュール |
| CyberArk GitHub | [github.com/cyberark](https://github.com/cyberark) | 公式のOSS・ツール（例：[CYBRHardeningCheck](https://github.com/cyberark/CYBRHardeningCheck)＝コンポーネント堅牢化チェック） |

> 【★重要】ドキュメントは「製品×バージョン」で引く
>

Self-Hosted（オンプレ）とPrivilege Cloud（SaaS）では、同じ機能名でも画面・手順・制約が異なります。検索で出てきたページの**製品名とバージョン表記**を必ず確認してください。

## 本教材の検証方針と検証状況

本教材では、ハルシネーション（もっともらしい誤情報）を避けるため、主要な記述について次の手順で正誤判定を行いました。

- 公式ドキュメント（docs.cyberark.com）の該当ページを実際に取得し、記載内容と照合

- 公式ドキュメントで扱っていない会社動向等は、公的書類（SEC提出書類）や複数の独立した報道と照合

- 照合の結果、記述が公式と異なっていたものは修正し、表に「記述を修正」と明記

> 【出典・検証メモ】検証の経緯
>

初版作成時（2026-10-18）は作成環境から docs.cyberark.com に接続できず、検索経由の確認にとどまっていました。2026-10-19 にネットワーク許可を追加して公式ドキュメントを直接取得し、全「要確認」項目を照合しました。その結果、**Privilege Cloudコネクタの通信要件（443に加えTCP 1858が必要）**と**Masterユーザーの権限の正確な範囲**を修正し、**PAM Self-Hosted 15.2（LTS）**などの最新情報を追加しました。同日、www.paloaltonetworks.com への接続も許可され、買収・Idiraに関する記述をPalo Alto Networksの公式プレスリリースで確認しました（www.cyberark.com は現在 Idira の製品ページへ転送されます）。

| 主な記述 | 章 | 照合した情報 | 判定 | 最終確認日 |
|---|---|---|---|---|
| Palo Alto NetworksによるCyberArk買収は2025年7月30日に合意、2026年2月11日に完了。CyberArk製品は単独プラットフォームとしても提供継続、既存顧客への影響なし | 2 | [Palo Alto Networks プレスリリース（2026/2/11）](https://www.paloaltonetworks.com/company/press/2026/palo-alto-networks-completes-acquisition-of-cyberark-to-secure-the-ai-era)、SEC 10-Q・8-K | 公式一致 | 2026-10-19 |
| 2026年5月12日にIdira発表（同日一般提供開始）。既存CyberArk顧客はそのまま利用でき、公式ドキュメントも「Idira Docs」表記に移行中 | 2 | [Palo Alto Networks プレスリリース（2026/5/12）](https://www.paloaltonetworks.com/company/press/2026/palo-alto-networks-introduces-idira--the-next-generation-identity-security-platform-built-for-the-ai-enterprise)、PAM SH 15.2 リリースノート | 公式一致 | 2026-10-19 |
| Conjur Cloud → Secrets Manager, SaaS（2025年9月7日改称）／Conjur Enterprise → Secrets Manager, Self-Hosted | 2, 13 | [Idira Docs：改称告知](https://docs.cyberark.com/secrets-manager-saas/latest/en/content/conjurcloud/cl_conjurcloudoverview.htm) | 公式一致 | 2026-10-19 |
| SIAは2024年10月にDynamic Privileged Accessから改称、ZSPに加えVault格納の資格情報にも対応 | 2, 14 | [SIA 概要](https://docs.cyberark.com/ispss-access/latest/en/content/getstarted/acc-intro.htm)／What's new | 公式一致 | 2026-10-19 |
| Remote Accessは2021年にAleroから改称、モバイルアプリはIdira Mobile | 2, 14 | [Vendors: Connect using Remote Access](https://docs.cyberark.com/privilege-cloud-standard/latest/en/content/privilege%20cloud/privcloud-connect-using-alero.htm)／Remote Access What's new | 公式一致 | 2026-10-19 |
| PAM SH 15.2はLTS（2026/7、開発終了・サポート終了2029/7）、15.0はSTS（2025/12、開発終了2026/12、サポート終了2027/12） | 15 | [End of Life Policy：Self-hosted products](https://docs.cyberark.com/end-of-life-policy/latest/en/content/eol-self-hosted-products.htm) | 公式一致 | 2026-10-19 |
| アップグレードはLTS→LTSまたは最新版のみサポート。順序は Vault→PVWA→CPM→他（Primary→DR→コンポーネント） | 15 | [EOL Policy](https://docs.cyberark.com/end-of-life-policy/latest/en/content/eol-self-hosted-products.htm)、[互換性ページ](https://docs.cyberark.com/pam-self-hosted/latest/en/content/pas%20sysreq/compatibility_component_versions.htm) | 公式一致 | 2026-10-19 |
| Vaultへの通信は TCP 1858（既定・変更可） | 3, 4 | [Network ports overview](https://docs.cyberark.com/pam-self-hosted/latest/en/content/pas%20sysreq/network%20ports%20overview.htm) | 公式一致 | 2026-10-19 |
| VaultはWindowsファイアウォールを堅牢化し既定で1858のみ許可。ドメイン非参加・専用サーバ | 4 | [Standard Vault Ports and Protocols](https://docs.cyberark.com/pam-self-hosted/latest/en/content/pas%20sysreq/standard%20ports%20-%20vault.htm)、公式GitHub CYBRHardeningCheck | 公式一致 | 2026-10-19 |
| Masterは承認権限を除く全Safe権限・どのSafeからも削除不可・Master CDでのみログイン。Master以外の組み込みユーザーは初期状態で無効 | 4 | [Predefined users and groups](https://docs.cyberark.com/pam-self-hosted/latest/en/content/pasimp/predefined-users-and-groups.htm) | 公式一致（記述を修正） | 2026-10-19 |
| Privilege Cloudのコネクタは外向き TCP 443 と TCP 1858（TLS 1.2以上）、送信元公開IPの届け出、IPv4のみ | 5 | [Outbound traffic network and port requirements](https://docs.cyberark.com/privilege-cloud-standard/latest/en/content/privilege%20cloud/privcloud-sys-req-networks.htm) | 公式一致（記述を修正） | 2026-10-19 |
| Safe名は最大28文字、使用不可文字あり | 6 | [Add a Safe](https://docs.cyberark.com/pam-self-hosted/latest/en/content/pasimp/safes-add-a-safe.htm)、Privilege Cloud「Create and manage Safes」 | 公式一致 | 2026-10-19 |
| Safe権限 List / Use / Retrieve accounts の意味 | 6 | 大学の公開手順書、連携ベンダー公式ドキュメント、psPAS | 一致 | 2026-10-18 |
| CPMの変更・検証・調整、ログ（pm.log・pm_error.log） | 7, 8 | [CPM logs](https://docs.cyberark.com/pam-self-hosted/latest/en/content/pasimp/cpmlogging.htm)、Ansible公式コレクション | 公式一致 | 2026-10-19 |
| Master Policyの既定値（二重承認・排他・ワンタイム無効、理由入力・記録有効、変更90日・検証7日、監査90日） | 9 | [Understand the master policy framework](https://docs.cyberark.com/pam-self-hosted/latest/en/content/pasimp/the-master-policy.htm)、Privilege Cloud「Master policy rules and settings」 | 公式一致 | 2026-10-19 |
| PSMConnect＝セッション開始、PSMAdminConnect＝ライブ監視・制御。終了・一時停止は既定でPSMLiveSessionTerminators | 10 | [PSMConnect and PSMAdminConnect](https://docs.cyberark.com/pam-self-hosted/latest/en/content/pas%20inst/optional-moving-the-psmconnec-and-psmadminconnect-users-to-your-domain.htm)、[Active session monitoring in PSM](https://docs.cyberark.com/pam-self-hosted/latest/en/content/pasimp/configuring-live-session-monitoring.htm) | 公式一致 | 2026-10-19 |
| PSM for SSHの接続書式 | 10 | [Connect through PSM for SSH](https://docs.cyberark.com/pam-self-hosted/latest/en/content/pasimp/psso-pmsp.htm) | 公式一致 | 2026-10-19 |
| PTAは資格情報窃取の疑い・管理外特権アクセス等を検知し、自動ローテーション・セッション停止が可能 | 12 | CyberArk公式GitHub、SIEM連携ベンダー文書、CyberArk公式ブログ | 一致 | 2026-10-18 |
| CCPの取得URL（/AIMWebService/api/Accounts、AppID必須）とPOSTの推奨 | 13 | [Call the Web Service using REST](https://docs.cyberark.com/credential-providers/latest/en/content/ccp/calling-the-web-service-using-rest.htm) | 公式一致 | 2026-10-19 |
| Secrets Hubの同期先：AWS Secrets Manager・Azure Key Vault・GCP Secret Manager・HashiCorp Vault | 13 | [Secrets Hub support and scope](https://docs.cyberark.com/secrets-hub-privilege-cloud/latest/en/content/secretshubcontent/sh-support.htm) | 公式一致 | 2026-10-19 |
| SIAの一時的な資格情報（Linux：短命SSH証明書、Windows：一時ローカル／ドメインユーザー等） | 14 | [Windows ZSP access](https://docs.cyberark.com/setup/latest/en/content/privileged-access/setup/set-up-windows-zsp-access.htm)ほか SIA 文書 | 公式一致 | 2026-10-19 |
| EPMオンプレ版は2021/1/6に終了告知、2023/12/31でサポート終了 | 14 | [End of Life Policy](https://docs.cyberark.com/end-of-life-policy/latest/en/content/eol-self-hosted-products.htm) | 公式一致 | 2026-10-19 |
| Blueprintの3原則（侵害の防止・横／縦移動の阻止・権限昇格と悪用の制限） | 15 | [CyberArk Blueprint](https://docs.cyberark.com/cyberark-blueprint/latest/en/content/attack-chain.htm)（docs） | 公式一致 | 2026-10-19 |
| REST APIのログオン（/PasswordVault/API/auth/{CyberArk／LDAP}/Logon） | 15, 16 | [Logon（REST）](https://docs.cyberark.com/pam-self-hosted/latest/en/content/sdk/cyberark%20authentication%20-%20logon_v10.htm) | 公式一致 | 2026-10-19 |
| Privilege Cloudの推奨コネクタ構成はConnector Managementエージェント＋PSM。パスワード変更はSaaSのSecrets Rotation Service（CPMと同じプラグイン、エージェント経由で実行） | 3, 5, 8 | [Deploy Privilege Cloud Connector](https://docs.cyberark.com/setup/latest/en/content/ispss-deployment/privilege%20cloud/privcloud-install.htm)、[SRS architecture](https://docs.cyberark.com/privilege-cloud-secrets-rotation/latest/en/content/privilege%20cloud/privcloud-srs-architecture.htm) | 公式一致 | 2026-10-19 |
| Privilege CloudではRDP・SSH・DBはSIAを推奨、Web・クラウドコンソール・ESX/vCenter・ファットクライアントはPSM | 5, 10 | [Set up target access for privileged sessions](https://docs.cyberark.com/manage/latest/en/content/privilege-cloud/privilege%20cloud/privcloud-access-options.htm) | 公式一致 | 2026-10-19 |
| Privilege Cloudの組み込みロール（Administrators／Auditors／Safe Managers）とライセンスの関係 | 4, 6, 11 | [Review ISPSS user roles](https://docs.cyberark.com/identity-administration/latest/en/content/coreservices/getstarted/ispss-user-roles.htm) | 公式一致 | 2026-10-19 |
| Privilege CloudのSIEM連携（Syslog、TLS推奨・UDP非対応・最大5台） | 12 | [Connect to SIEM](https://docs.cyberark.com/privilege-cloud-standard/latest/en/content/privilege%20cloud/privcloud-connect-siem.htm) | 公式一致 | 2026-10-19 |
| Privilege Cloudコネクタの更新は管理者がConnector Managementから実行（数分の停止、GPO堅牢化パッケージを先に更新） | 5, 15 | [Upgrade connector components](https://docs.cyberark.com/setup/latest/en/content/connector-management/cm_upgrade_connector.htm) | 公式一致 | 2026-10-19 |

## 情報の鮮度を保つ運用ルール

CyberArk製品は、ブランド統合（Idira）や製品名変更が続いている時期です。教材の記述が古くならないよう、次のルールで見直します。

| 頻度 | 担当 | 確認すること |
|---|---|---|
| 四半期ごと（1・4・7・10月） | 教材オーナー（PAMチーム） | 公式「Product Name Updates」・各製品のリリースノート（What's New）・サポート期間（EOL）ページを確認し、該当章と用語集・問題バンクを更新。上表の「最終確認日」を更新 |
| Self-Hosted新バージョン公開時 | 教材オーナー | 第3・4・8・10・15章のポート・コンポーネント・アップグレード手順に影響がないか確認 |
| 研修実施前（毎回） | 講師 | 検証表の項目を、自社で使う製品・バージョンの公式ドキュメントで確認。ハンズオン環境（Self-Hosted／Privilege Cloud）のバージョンを確認 |
| 受講者からの指摘時 | 講師 | 指摘内容を公式ドキュメントで確認し、正しければ修正して最終確認日を更新 |

> 【現場Tips】見直しチェックリスト
>

- 製品名・ブランド名の変更がないか（第2章・用語集）

- Self-Hostedの最新バージョンとサポート区分（STS/LTS）に変更がないか（第15章）

- Privilege Cloudのコネクタ要件（OS・通信先）の変更がないか（第5章）

- 新製品・機能（AIエージェントのID保護など）の追加がないか（第2・14章）

- 問題バンク・ケーススタディの正解が最新仕様と矛盾していないか

- 上表の「最終確認日」と次回見直し予定日を更新したか

次回見直し予定：2027年1月

## 参照した主な外部情報（公式以外を含む）

- [Palo Alto Networks Form 10-Q（FY2026）](https://www.sec.gov/Archives/edgar/data/1327567/000132756726000005/panw-20260131.htm)

- [SDxCentral：Palo Alto Networks rebrands CyberArk with Idira](https://www.sdxcentral.com/news/palo-alto-networks-rebrands-cyberark-with-idira-platform-release/) ／ [SiliconANGLE（2026/05/12）](https://siliconangle.com/2026/05/12/idira-launches-palo-alto-networks-extends-cyberark-tech-machine-agentic-identities/)

- [Palo Alto Networks：CyberArk買収合意の発表（2025/7/30）](https://www.paloaltonetworks.com/company/press/2025/palo-alto-networks-announces-agreement-to-acquire-cyberark--the-identity-security-leader) ／ [買収完了の発表（2026/2/11）](https://www.paloaltonetworks.com/company/press/2026/palo-alto-networks-completes-acquisition-of-cyberark-to-secure-the-ai-era) ／ [Idira発表（2026/5/12）](https://www.paloaltonetworks.com/company/press/2026/palo-alto-networks-introduces-idira--the-next-generation-identity-security-platform-built-for-the-ai-enterprise)

- [Idira Docs：Conjur Cloud → Secrets Manager, SaaS 改称告知](https://docs.cyberark.com/secrets-manager-saas/latest/en/content/conjurcloud/cl_conjurcloudoverview.htm)

- [Idira Docs：PAM Self-Hosted What's New（リリースノート）](https://docs.cyberark.com/pam-self-hosted/latest/en/content/release%20notes/rn-whatsnew.htm)

- [Idira Docs：Secrets Hub What's new](https://docs.cyberark.com/secrets-hub-privilege-cloud/latest/en/content/secretshubcontent/whatsnew.htm)

- [Idira Docs：Secure Infrastructure Access 概要](https://docs.cyberark.com/ispss-access/latest/en/content/getstarted/acc-intro.htm) ／ [Blueprint：State of privilege and access hierarchy（ZSPの位置づけ）](https://docs.cyberark.com/cyberark-blueprint/latest/en/content/state-of-privilege-access-hierarchy.htm)

- [GitHub：cyberark/CYBRHardeningCheck](https://github.com/cyberark/CYBRHardeningCheck) ／ [GitHub：cyberark/Forward-AWS-logs-to-PAS](https://github.com/cyberark/Forward-AWS-logs-to-PAS)

- [University of Wisconsin KB：CyberArk](https://kb.wisc.edu/security/page.php?id=110939) ／ [Venafi Docs：CyberArk連携の権限要件](https://docs.venafi.com/Docs/26.1/TopNav/Content/Credentials/t-CyberArk-elevate-permissions.php)

- [UiPath Docs：Credential Store連携（CCP / Secrets Manager）](https://docs.uipath.com/orchestrator/automation-cloud/latest/user-guide/integrating-credential-stores)

- [Ansible Docs：cyberark.pas.cyberark_account](https://docs.ansible.com/ansible/7/collections/cyberark/pas/cyberark_account_module.html)

- [Elastic Docs：CyberArk PTA integration](https://www.elastic.co/docs/reference/integrations/cyberark_pta)

- [NetSec：Understanding CyberArk CPM](https://blog.51sec.org/2023/12/understanding-cyberark-cpm.html) ／ [NetSec：CyberArk Notes（PSM）](https://51sec.org/2020/06/02/cyberark-notes-2)

※二次情報は「公式記載の補強」としてのみ使用しています。


---

<!-- ページ：glossary.html -->

はじめに｜用語集

# 用語集

CyberArkの現場では略語が飛び交います。分からない言葉はここで検索してください。各用語から詳しく学べる章へ移動できます。

- 主要な略語（PVWA・CPM・PSM・PTA・CCPなど）を見て、すぐに役割を言える

| 分類 | 用語 | 英語表記 | 説明 | 詳しい章 |
|---|---|---|---|---|
| 基礎 | 特権ID（特権アカウント） | Privileged Account | システムの設定変更・全データ参照など強い権限を持つアカウント。root、Administrator、ドメイン管理者、DBのSYS/SYSTEM、クラウドのルートユーザー、アプリのサービスアカウントなど。 | 第1章 |
| 基礎 | PAM | Privileged Access Management | 特権アクセス管理。特権IDの保管・利用・監視・パスワード変更を統制する仕組み・製品分野。 | 第1章 |
| 基礎 | 最小権限の原則 | Least Privilege | 業務に必要な最小限の権限だけを、必要な期間だけ与える考え方。 | 第1章 |
| 基礎 | ZSP | Zero Standing Privileges | 常設の特権をゼロにする考え方。必要なときだけ権限を作り、終わったら消す。 | 第14章 |
| 基礎 | JIT | Just-In-Time access | 必要なタイミングで一時的にアクセス権を付与する方式。 | 第14章 |
| 基礎 | ラテラルムーブメント | Lateral Movement | 侵入した攻撃者が、盗んだ資格情報を使って隣のサーバへ次々と移動すること。 | 第1章 |
| 基礎 | Pass-the-Hash | Pass-the-Hash | パスワードのハッシュ値を盗み、平文を知らずに認証する攻撃手法。 | 第12章 |
| 製品 | Identity Security Platform | Identity Security Platform | CyberArkのSaaS製品群の総称的な基盤。共通の管理基盤はISPSS（Identity Security Platform Shared Services）と呼ばれる。 | 第2章 |
| 製品 | Idira | Idira | 2026年5月にPalo Alto Networksが発表した、CyberArk技術を基盤とするアイデンティティセキュリティの新ブランド。 | 第2章 |
| 製品 | PAM Self-Hosted | Privileged Access Manager Self-Hosted | 自社環境に構築するPAM製品（旧称 PAS / Core PAS など）。 | 第5章 |
| 製品 | Privilege Cloud | CyberArk Privilege Cloud | PAMのSaaS版。Vault等をCyberArkが運用し、顧客側にはコネクタを置く。 | 第5章 |
| 製品 | SIA | Secure Infrastructure Access | サーバ・DB・Kubernetes等へのJIT/ZSP型アクセスを提供するSaaS（2024年10月に Dynamic Privileged Access / DPA から改称）。 | 第14章 |
| 製品 | SCA | Secure Cloud Access | AWS/Azure/GCP等クラウド管理コンソールへのJITアクセスを提供するSaaS。 | 第14章 |
| 製品 | EPM | Endpoint Privilege Manager | PC・サーバ上のローカル管理者権限を取り除き、必要なアプリだけ昇格させる製品。 | 第14章 |
| 製品 | Remote Access | CyberArk Remote Access | 外部委託先などがVPNなしで特権アクセスするためのSaaS（2021年に Alero から改称。モバイルアプリはIdira Mobile）。 | 第14章 |
| 製品 | Secrets Manager | CyberArk Secrets Manager | アプリ・DevOps向けシークレット管理（旧 Conjur）。SaaS版とSelf-Hosted版がある。 | 第13章 |
| 製品 | Secrets Hub | CyberArk Secrets Hub | AWS Secrets Manager等クラウドネイティブなシークレットストアとPAMを同期・一元管理するSaaS。 | 第13章 |
| 製品 | Workforce Identity | CyberArk Workforce Identity | SSO・MFA・ライフサイクル管理などの従業員向けID管理（旧 CyberArk Identity）。 | 第11章 |
| 構成要素 | Digital Vault（Vault） | Digital Vault / Enterprise Password Vault | 特権資格情報やポリシー・監査ログを暗号化して保管する中枢サーバ。既定ポートはTCP 1858。 | 第4章 |
| 構成要素 | PVWA | Password Vault Web Access | 利用者・管理者が使うWeb画面（およびREST APIの窓口）。 | 第3章 |
| 構成要素 | CPM | Central Policy Manager | ポリシーに従い、ターゲットのパスワードを自動で変更・検証・調整するコンポーネント。 | 第8章 |
| 構成要素 | PSM | Privileged Session Manager | 特権セッションを中継して分離・録画・監視するコンポーネント（Windowsサーバ上）。 | 第10章 |
| 構成要素 | PSM for SSH（PSMP） | Privileged Session Manager for SSH | SSH接続を中継・記録するLinux上のコンポーネント。 | 第10章 |
| 構成要素 | PTA | Privileged Threat Analytics | 特権アクティビティを分析し、資格情報窃取などの脅威を検知・自動対応するコンポーネント。 | 第12章 |
| 構成要素 | DR Vault | Disaster Recovery Vault | 本番Vaultのデータを複製し、障害時に切り替える待機系Vault。 | 第4章 |
| 構成要素 | PrivateArk Client | PrivateArk Client | Vaultに直接接続する管理用Windowsクライアント（主に高度な管理・緊急時に使用）。 | 第4章 |
| 構成要素 | Connector（コネクタ） | Connector | Privilege Cloud等で顧客ネットワーク側に置くサーバ。CPM・PSM・Secure Tunnel等を載せる。 | 第5章 |
| 構成要素 | Connector Management | Connector Management | SaaS側からコネクタの導入・管理を行う仕組み。オンプレ側にエージェントを導入する。 | 第5章 |
| 構成要素 | Secure Tunnel | Secure Tunnel | Privilege Cloud等とオンプレを結ぶ暗号化トンネル（LDAP連携等に使用）。 | 第5章 |
| 構成要素 | Identity Connector | Identity Connector | オンプレのActive Directory等とSaaS側のID基盤をつなぐコネクタ。 | 第11章 |
| 構成要素 | HTML5 Gateway | PSM HTML5 Gateway | RDPクライアント不要で、ブラウザから直接PSMセッションを開くためのゲートウェイ。 | 第10章 |
| 設定 | Safe | Safe | アカウントをまとめて格納し、アクセス権を付与する単位（＝貸金庫の箱）。 | 第6章 |
| 設定 | Safe Member | Safe Member | Safeに権限を持つユーザー／グループ。権限は細かく選べる。 | 第6章 |
| 設定 | Platform（プラットフォーム） | Platform | ターゲット種別ごとの管理ルールの型（変更間隔・パスワード規則・接続方法など）。 | 第7章 |
| 設定 | Master Policy | Master Policy | 組織全体の基本ルール（変更間隔、二重承認、排他、ワンタイム、記録など）。プラットフォームごとに例外設定が可能。 | 第9章 |
| 設定 | Linked Account（連携アカウント） | Linked Account | ログオン用アカウントや調整用アカウントなど、あるアカウントの管理を助ける別アカウント。 | 第7章 |
| 設定 | Logon Account | Logon Account | 対象アカウントで直接ログインできない場合に、先にログインするためのアカウント（例：rootへの直接SSH禁止時）。 | 第7章 |
| 設定 | Reconcile Account | Reconcile Account | パスワードが不一致になったときに、強制的にリセットするための高権限アカウント。 | 第8章 |
| 設定 | Dependency（依存先） | Usage / Dependency | Windowsサービス・タスク・IIS等、そのパスワードを使っている場所。変更時に併せて更新する。 | 第8章 |
| 設定 | Connection Component | Connection Component | PSMが接続時に起動する接続方式の定義（RDP、SSH、Webアプリ、SQLクライアント等）。 | 第10章 |
| 操作 | Change（変更） | Change | CPMが新しいパスワードを生成し、ターゲットとVaultの両方を更新する操作。 | 第8章 |
| 操作 | Verify（検証） | Verify | Vaultのパスワードでターゲットに実際にログインできるか確認する操作。 | 第8章 |
| 操作 | Reconcile（調整） | Reconcile | 不一致になったパスワードを、調整用アカウントで強制リセットして同期を回復する操作。 | 第8章 |
| 操作 | Show / Copy | Show / Copy | パスワードを画面表示／クリップボードコピーする操作（Retrieve権限が必要）。 | 第6章 |
| 操作 | Connect | Connect | PSM経由でパスワードを見せずにターゲットへ接続する操作（Use権限が必要）。 | 第10章 |
| 操作 | Dual Control（二重承認） | Dual Control | アカウント利用前に承認者の承認を必要とする仕組み。 | 第9章 |
| 操作 | Exclusive（排他） | Exclusive passwords | アカウントを一度に一人だけが使えるようにチェックアウトする仕組み。 | 第9章 |
| 操作 | One-Time Password（ワンタイム） | One-time passwords | 利用後（最低有効期間経過後）に必ずパスワードを変更する仕組み。 | 第9章 |
| 操作 | Check-out / Check-in | Check-out / Check-in | 排他アカウントの貸出し／返却。 | 第9章 |
| 連携 | CP | Credential Provider | アプリケーションサーバに導入し、ローカルキャッシュを持ってパスワードを提供するエージェント型の仕組み。 | 第13章 |
| 連携 | CCP | Central Credential Provider | エージェントを入れずにWebサービス（REST）経由でパスワードを取得する仕組み。 | 第13章 |
| 連携 | Application ID（AppID） | Application ID | アプリをVaultに登録する際の識別子。許可するマシン・OSユーザー・パス・証明書等で認証する。 | 第13章 |
| 連携 | REST API | REST API | PVWA経由で利用できるAPI。アカウント登録・Safe作成等の自動化に使う。 | 第15章 |
| 連携 | SIEM | Security Information and Event Management | ログを集約・相関分析する基盤。Vault/PTAのイベントをSyslogで送る。 | 第12章 |
| 連携 | LDAP連携（Directory Mapping） | LDAP Integration | Active Directory等のユーザー・グループをVaultのユーザーとして利用する設定。 | 第11章 |
| 連携 | SAML | SAML | IdPでの認証結果を使ってPVWA等にシングルサインオンする標準規格。 | 第11章 |
| 連携 | MFA | Multi-Factor Authentication | パスワード＋スマホ承認など複数の要素で本人確認する方式。 | 第11章 |
| 運用 | Master CD / リカバリキー | Master CD / Recovery Key | Masterユーザーでのログインや鍵の復旧に使う秘密鍵。オフラインで厳重保管する。 | 第4章 |
| 運用 | Server Key | Server Key | Vaultが保管データを暗号化する鍵階層の最上位に位置する鍵。 | 第4章 |
| 運用 | Break Glass（緊急アクセス） | Break Glass | 通常経路が使えない緊急時に、統制された手順で特権を使うこと。 | 第15章 |
| 運用 | オンボーディング | Onboarding | 特権アカウントを発見し、CyberArkの管理下（Safe登録・CPM管理）に入れる作業。 | 第15章 |
| 運用 | Accounts Discovery | Accounts Discovery | ネットワーク上の特権アカウントを自動で発見し、登録候補として一覧化する機能。 | 第15章 |
| 運用 | STS / LTS | Standard-Term / Long-Term Support | Self-Hostedのサポート期間区分。LTSは長期サポート版（例：15.2）、LTSと明記されない版はSTS（例：15.0）。 | 第15章 |


---

<!-- ページ：learn/ch01.html -->

CHAPTER 01｜基礎

# 特権IDとPAMの基礎

CyberArkを学ぶ前に、「何を、なぜ守るのか」をはっきりさせます。ここが腹落ちすると、以降の機能がすべて「理由のある仕組み」に見えてきます。

#### この章の全体像

特権IDの定義 → 狙われる理由（攻撃の流れ）→ よくある管理不備 → PAMの4つの柱 → CyberArkの位置づけ

#### この章のゴール

- 特権IDの具体例を5つ以上挙げられる

- 攻撃者が特権IDを狙う理由を「侵入→横展開→目的達成」の流れで説明できる

- PAMの4つの柱（保管・制御・監視・自動化）を説明できる

目安 60分  前提知識：なし

目次
- 特権IDとは
- なぜ狙われるのか
- よくある管理不備
- PAMの4つの柱
- CyberArkの立ち位置
- 振り返り問題

## 1. 特権IDとは

**特権ID（特権アカウント）**とは、システムの設定変更、全データの閲覧・削除、他ユーザーの作成など、**通常ユーザーにはできない強い操作ができるアカウント**のことです。

> 【たとえ話】ビルの「マスターキー」
>

オフィスビルでは、社員は自分のフロアの鍵しか持ちません。しかし管理会社は**全フロア・全部屋を開けられるマスターキー**を持っています。マスターキーが盗まれたら、ビル中のどこにでも入られてしまいます。特権IDはITシステムにおけるマスターキーです。

| 分類 | 具体例 | 使う人／もの |
|---|---|---|
| OSの管理者 | Linuxの `root`、Windowsのローカル `Administrator` | サーバ管理者 |
| ディレクトリ管理者 | Active Directoryの Domain Admins メンバー | AD管理者 |
| データベース管理者 | Oracleの `SYS` / `SYSTEM`、SQL Serverの `sa` | DBA |
| ネットワーク機器 | ルータ・スイッチ・ファイアウォールの管理者（enable等） | ネットワーク担当 |
| クラウド | AWSのルートユーザー、Azureのグローバル管理者、IAMの管理者ロール | クラウド担当 |
| アプリケーション | アプリがDBに接続するためのサービスアカウント、APIキー、SSH鍵 | **人ではなくプログラム** |
| SaaS管理者 | 業務SaaSの管理者アカウント | SaaS管理者 |

> 【★重要】「人」だけでなく「機械」も特権IDを持つ
>

アプリケーションやスクリプト、CI/CDパイプラインが使うパスワード・キー（**シークレット**）も特権IDです。近年は人より機械のIDの方が圧倒的に多いと言われ、CyberArkも第13章で学ぶ「シークレット管理」に力を入れています。

## 2. なぜ特権IDが狙われるのか

多くのサイバー攻撃は「最初に侵入した端末」だけでは目的（情報窃取・ランサムウェア展開）を達成できません。攻撃者は**特権IDを手に入れて権限を広げ**、目的のサーバへ移動します。下の図でSTEPを切り替えて流れを追ってください。

#### ステップ式フロー：図1-1：特権IDを狙った典型的な攻撃の流れ（ラジオボタンでSTEPを切り替える）

> 図（部品と矢印。`[s:n]` は強調するSTEP番号）
>  - 部品：攻撃者（種別:threat） [s:1]
>  - 部品：社員PC ／ フィッシングで感染（種別:user） [s:1,2]
>  - 部品：管理者パスワード ／ メモリ・ファイルから窃取（種別:vault） [s:2,3]
>  - 部品：他のサーバ群 ／ 同じパスワードで侵入（種別:target） [s:3,4]
>  - 部品：ドメイン管理者 ／基幹DB（種別:threat） [s:4,5]
>  - 矢印：攻撃者 → 社員PC：①侵入 [s:1]
>  - 矢印：社員PC → 管理者パスワード：②資格情報の窃取 [s:2]
>  - 矢印：管理者パスワード → 他のサーバ群：③横展開 [s:3]
>  - 矢印：他のサーバ群 → ドメイン管理者 ／基幹DB：④権限昇格 [s:4]
>  - 矢印：ドメイン管理者 ／基幹DB → 攻撃者：⑤情報窃取・暗号化 [s:5]

- STEP 1「侵入」：攻撃者はフィッシングメールなどで、まず**一般社員のPC**に入り込みます。この時点では一般ユーザーの権限しかありません。
- STEP 2「資格情報の窃取」：PC内のメモリ、設定ファイル、スクリプト、ブラウザなどから**管理者のパスワードやハッシュ**を探します。管理者がこのPCに一度でもログインしていたり、スクリプトにパスワードが平文で書かれていたりすると、ここで盗まれます。
- STEP 3「横展開」：盗んだ管理者パスワードが**他のサーバでも同じ**（使い回し・何年も変更なし）なら、次々と別サーバへ移動できます。これを**ラテラルムーブメント（横展開）**と呼びます。
- STEP 4「権限昇格」：移動先でさらに強い特権ID（ドメイン管理者など）を見つけ、最終的に組織全体を支配できる権限を得ます。
- STEP 5「目的達成」：基幹データを盗み出したり、全サーバにランサムウェアを配布したりします。**特権IDさえ守られていれば、②〜④のどこかで攻撃を止められた**可能性が高いのです。

> 【★重点の1行要約】
🎯

PAMの目的は「盗まれにくくする」「盗まれても使えなくする」「使われたらすぐ気づく」の3つ。

CyberArkの機能はすべてこの3つのどれか（または複数）に対応しています。

## 3. よくある特権IDの管理不備

#### 😱 共有と使い回し

「rootのパスワードはみんな知っている」「全サーバのAdministratorが同じ」。誰が使ったか追えず、1台漏れれば全滅します。

#### 📝 Excel・付箋管理

パスワード一覧表がファイルサーバに置かれている。ファイル1つ盗まれるだけで終わりです。

#### ⏳ 何年も変更しない

退職者や委託先が昔のパスワードを知ったままになり、いつでもログインできてしまいます。

#### 👀 操作の記録がない

障害や情報漏えいが起きても「誰が何をしたか」がわからず、原因究明も再発防止もできません。

#### 💻 コードに埋め込み

アプリの設定ファイルやスクリプトにDBパスワードが平文で書かれ、Git等で拡散します。

#### ♾ 常に強い権限

必要なときだけでなく、いつでも特権を持っている状態（常設特権）は、盗まれたときの被害が最大化します。

## 4. PAMの4つの柱

PAM（Privileged Access Management：特権アクセス管理）は、上の不備をまとめて解決する考え方です。本教材では次の4本の柱で整理します。

| 柱 | 何をするか | CyberArkの主な機能（後の章） |
|---|---|---|
| **① 保管（Vault）** | 特権の資格情報を1か所の堅牢な金庫に集め、暗号化して保管する | Digital Vault、Safe（第4・6章） |
| **② 制御（Control）** | 誰が・いつ・どのアカウントを使えるかを権限と承認で制御する | Safe権限、Master Policy、二重承認（第6・9章） |
| **③ 監視（Monitor）** | 使った操作を記録・録画し、危険な振る舞いを検知する | PSM、監査ログ、PTA（第10・12章） |
| **④ 自動化（Rotate）** | パスワードを定期的・利用後に自動で変更し、漏れても使えなくする | CPM（第8章） |

> 【たとえ話】ホテルの客室キー管理
>

ホテルではフロント（**金庫＝保管**）がカードキーを管理し、宿泊者本人だけに（**制御**）、滞在期間だけ有効なキーを渡します。廊下には防犯カメラ（**監視**）があり、チェックアウトするとキーは自動で無効化されて次の客用に作り直されます（**自動化**）。PAMはこれをITの特権IDに対して行います。

## 5. CyberArkの立ち位置

CyberArkはPAM分野を代表するベンダーの1つで、Digital Vaultを中心とした特権アクセス管理製品から出発し、現在は人・機械・AIエージェントのIDを対象とした**アイデンティティセキュリティ**全体へ製品群を広げています。2026年2月にPalo Alto Networksによる買収が完了しており、製品群の全体像は第2章で学びます。

> 【現場Tips】新人が最初に覚える言い回し
>

お客様や他部署に説明するときは「CyberArkは、特権IDのパスワードを**金庫で預かり**、**必要な人だけに使わせ**、**使った操作を録画し**、**パスワードを自動で変える**製品です」と言えばまず伝わります。

## 振り返り問題（第1章）

章末問題は固定順です。選択肢をクリックすると正誤と解説が表示されます。

**Q1. 次のうち「特権ID」に**当てはまらない**ものはどれ？**
- A. Linuxサーバのroot
- B. アプリがDB接続に使うサービスアカウント
- C. 社員が自分のメールを読むためだけの一般ユーザーアカウント　← 正解
- D. AWSのルートユーザー
- 解説：一般ユーザーアカウントは特権IDではありません。アプリのサービスアカウントのように**「人以外」が使うアカウントも特権ID**である点に注意しましょう。

**Q2. 盗んだ管理者パスワードを使って、攻撃者が他のサーバへ次々と移動することを何と呼ぶ？**
- A. フィッシング
- B. ラテラルムーブメント（横展開）　← 正解
- C. DDoS
- D. SQLインジェクション
- 解説：ラテラルムーブメントです。パスワードの使い回しや長期間の未変更があると、横展開が容易になります。

**Q3. 「パスワードを定期的・利用後に自動で変更し、漏れても使えなくする」はPAMの4つの柱のどれ？**
- A. 保管
- B. 制御
- C. 監視
- D. 自動化　← 正解
- 解説：自動化（ローテーション）です。CyberArkでは主にCPMが担当します（第8章）。

**Q4. PAMの目的として本章で挙げた3つに**含まれない**ものは？**
- A. 特権IDの数を増やして作業を分散させる　← 正解
- B. 盗まれにくくする
- C. 盗まれても使えなくする
- D. 使われたらすぐ気づく
- 解説：特権IDをむやみに増やすことは攻撃対象を増やすだけです。PAMは「盗まれにくく・盗まれても使えなく・使われたら気づく」を目指します。


---

<!-- ページ：learn/ch02.html -->

CHAPTER 02｜基礎

# CyberArk製品群の全体像

CyberArkは「PAMの会社」から「アイデンティティセキュリティの会社」へと広がりました。まずは製品の地図を頭に入れ、自分が担当する製品がどこにあるかを把握します。

#### この章の全体像

会社の動向（買収・新ブランド）→ 製品マップ → 提供形態（Self-Hosted / SaaS）→ 製品名の変遷 → 新人が最初に触る範囲

#### この章のゴール

- 主要製品（PAM Self-Hosted、Privilege Cloud、SIA、SCA、EPM、Secrets Manager、Secrets Hub、Workforce Identity）が何を守るかを1行で言える

- 旧製品名と新製品名の対応を知り、古い資料を読んでも混乱しない

- 2026年の会社動向（Palo Alto Networksによる買収、Idiraブランド）を正しく説明できる

目安 45分  前提：第1章

## 1. 2026年の会社動向（最新情報）

| 時期 | 出来事 |
|---|---|
| 2025年7月30日 | Palo Alto NetworksがCyberArkの買収合意を発表 |
| 2026年2月11日 | 買収完了（Palo Alto Networks公式プレスリリース）。CyberArkのアイデンティティセキュリティ製品は**単独のプラットフォームとしても引き続き提供**され、既存顧客に影響はないとされています。テルアビブ証券取引所への重複上場（ティッカー「CYBR」）の意向も発表。 |
| 2026年5月12日 | CyberArkの技術を基盤とする次世代アイデンティティセキュリティ基盤**「Idira」**を発表し、同日に一般提供を開始（Palo Alto Networks公式プレスリリース）。人・機械・AIエージェントのすべてのIDを対象に、常設特権をなくす（ZSP・JIT）「モダンPAM」を掲げています。既存のCyberArk SaaS顧客は契約に応じて新機能を利用できます。 |
| 2026年7月〜 | PAM Self-Hosted 15.2（LTS）のリリースノートでIdiraへの名称変更が始まり、公式ドキュメントサイト（docs.cyberark.com）も「Idira Docs」表記になっています（例：「Idira Endpoint Privilege Manager」）。 |

> 【⚠注意】製品名・画面名は変わり得る
>

ブランド統合期間中は、ドキュメントや管理画面の表記に旧名・新名が混在する可能性があります。お客様への説明や設計書では、**契約上の製品名と公式ドキュメントの最新表記**を確認してから使いましょう。本教材では広く通用している「CyberArk ○○」の表記を用います。

## 2. 製品マップ

CyberArkの製品群は「誰の（どんな）アイデンティティを」「どこで」守るかで整理すると覚えやすくなります。

> 図「図2-1：CyberArk製品マップ（概念図）」（部品と矢印。`[s:n]` は強調するSTEP番号）
>  - 領域：共通基盤：Identity Security Platform Shared Services（ISPSS）＝認証・監査・管理画面などSaaS共通部分
>  - 領域：人（管理者・従業員・委託先）
>  - 領域：機械（アプリ・CI/CD・クラウドワークロード）
>  - 部品：Workforce Identity ／ SSO・MFA・ライフサイクル（種別:user）
>  - 部品：脅威検知・分析 ／ PTA / ITDR 等（種別:threat）
>  - 部品：監査・レポート ／ 共通の監査基盤（種別:comp）
>  - 部品：PAM Self-Hosted ／ 自社構築のPAM（種別:vault）
>  - 部品：Privilege Cloud ／ SaaS版PAM（種別:vault）
>  - 部品：SIA ／ サーバ/DB/K8sへのJIT（種別:cloud）
>  - 部品：SCA ／ クラウド管理画面へのJIT（種別:cloud）
>  - 部品：EPM ／ 端末のローカル管理者権限（種別:target）
>  - 部品：Remote Access ／ 委託先のVPNレス接続（種別:target）
>  - 部品：CP / CCP ／ アプリへの資格情報提供（種別:comp）
>  - 部品：Secrets Manager ／ 旧Conjur／DevOps向け（種別:comp）
>  - 部品：Secrets Hub ／ クラウドのシークレット ストアと同期（種別:cloud）
>  - 部品：証明書・機械ID ／ 証明書ライフサイクル等（種別:comp）
>  - 部品：AIエージェントのID保護 ／ 2025〜2026年に拡充が進む領域（最新の公式情報で確認）（種別:threat）

| 製品 | 一言でいうと | 提供形態 | 詳しく |
|---|---|---|---|
| **PAM Self-Hosted** | 特権IDの金庫・自動変更・セッション録画を**自社環境**に構築 | オンプレ／自社管理のクラウド | 第3〜12章 |
| **Privilege Cloud** | 上記を**SaaS**で利用。Vault等の運用はCyberArk | SaaS＋顧客側コネクタ | 第5章 |
| **Secure Infrastructure Access（SIA）** | サーバ・DB・Kubernetesに、**その場限りの権限**で接続（旧 Dynamic Privileged Access） | SaaS | 第14章 |
| **Secure Cloud Access（SCA）** | AWS/Azure/GCPの管理画面への**期間限定の権限**付与 | SaaS | 第14章 |
| **Endpoint Privilege Manager（EPM）** | PCやサーバの**ローカル管理者権限を取り上げ**、必要なアプリだけ昇格 | SaaS＋エージェント | 第14章 |
| **Remote Access** | 保守委託先が**VPNなし**で安全に特権アクセス | SaaS | 第14章 |
| **Credential Provider（CP）／Central Credential Provider（CCP）** | アプリが**パスワードをコードに書かず**Vaultから取得 | Self-Hosted／Privilege Cloud と組み合わせ | 第13章 |
| **Secrets Manager** | コンテナ・CI/CD等**DevOps向け**のシークレット管理（旧 Conjur） | SaaS／Self-Hosted | 第13章 |
| **Secrets Hub** | AWS Secrets Manager等**クラウド純正の金庫**とPAMを同期 | SaaS | 第13章 |
| **Workforce Identity** | 従業員の**SSO・MFA**（旧 CyberArk Identity） | SaaS | 第11章 |

> 【たとえ話】製品群は「警備会社のサービスメニュー」
>

PAMは**本社金庫室の警備**、EPMは**各社員の机の引き出しの鍵管理**、Remote Accessは**業者の入館受付**、Secrets Managerは**工場の自動ロボットが使う鍵の管理**、Workforce Identityは**社員証ゲート**です。同じ警備会社なので、受付（認証）や監視カメラの記録（監査）は共通の仕組みにまとまっています。これがISPSS（共通基盤）です。

## 3. 提供形態：Self-Hosted と SaaS

#### 🏢 Self-Hosted（自社構築）

- Vault・PVWA・CPM・PSMなどを**自社で構築・運用**
- バージョンアップ・バックアップ・DRも自社の責任
- 閉域網・厳格な規制要件の組織で採用されることが多い

#### ☁ SaaS（Privilege Cloud ほか）

- Vault等の中核をCyberArkが運用
- 顧客側は**コネクタ**（CPM・PSM等）だけを運用
- 機能追加が早く、ISPSS上の他SaaS製品と統合しやすい

詳しい比較と選び方は第5章で扱います。

## 4. 製品名の変遷（古い資料を読むときの辞書）

| 旧称（資料で見かける名前） | 現在の主な呼び方 |
|---|---|
| Enterprise Password Vault（EPV）、Privileged Account Security（PAS）、Core PAS | Privileged Access Manager（PAM）Self-Hosted |
| Conjur Cloud | CyberArk Secrets Manager, SaaS |
| Conjur Enterprise（Conjur Secrets Manager Enterprise） | CyberArk Secrets Manager, Self-Hosted |
| Dynamic Privileged Access（DPA） | Secure Infrastructure Access（SIA）※2024年10月改称 |
| CyberArk Identity（の従業員向け機能） | Workforce Identity |
| Alero（Vendor PAM 等）／Aleroモバイルアプリ | Remote Access（2021年改称）／Idira Mobileアプリ |
| CyberArk（製品・ドキュメント上のブランド） | Idira（2026年から順次。例：Idira Privileged Access Manager、Idira Secrets Hub、Idira Endpoint Privilege Manager。CyberArk表記も併存） |
| Application Access Manager（AAM）、AIM | Credential Providers（CP / CCP） |

> 【出典・検証メモ】確認方法
>

名称変更の一次情報はCyberArk公式の「Product Name Updates」ページです。Conjur→Secrets Managerの改称は同ページで確認済み。その他は複数の公開資料で一致を確認しています（出典ページ）。

## 5. 新人が最初に触る範囲

多くの現場では、まず**PAM（Self-HostedまたはPrivilege Cloud）**の運用から担当します。本教材の第3〜12章はこのPAMを中心に構成されています。SIAやSecrets Managerなどは、PAMの考え方（Safe・ポリシー・監査）を理解してから学ぶと理解が速くなります。

> 【現場Tips】お客様との会話で困らないために
>

お客様が「CyberArk入ってます」と言ったら、まず**「Self-HostedとPrivilege Cloudのどちらですか？バージョンは？」**と確認しましょう。前提がまるで違うためです。

## 振り返り問題（第2章）

**Q1. 保守委託先がVPNを使わずに安全に特権アクセスするための製品は？**
- A. Endpoint Privilege Manager
- B. Secrets Hub
- C. Remote Access　← 正解
- D. Credential Provider
- 解説：Remote Accessです（旧Aleroの系譜）。EPMは端末のローカル管理者権限の制御、Secrets Hubはクラウドのシークレットストア同期、CPはアプリ向けです。

**Q2. 「Conjur Enterprise」の現在の名称は？**
- A. CyberArk Secrets Manager, Self-Hosted　← 正解
- B. CyberArk Secrets Hub
- C. Privilege Cloud
- D. Workforce Identity
- 解説：Conjur EnterpriseはSecrets Manager, Self-Hosted、Conjur CloudはSecrets Manager, SaaSに改称されました。

**Q3. Privilege Cloudの説明として正しいものは？**
- A. Vaultを顧客が自社データセンターで運用する
- B. Vault等の中核をCyberArkが運用し、顧客はコネクタを運用する　← 正解
- C. エンドポイントのローカル管理者権限を管理する製品である
- D. アプリ専用で、人の特権アクセスは扱えない
- 解説：Privilege CloudはPAMのSaaS版で、顧客側にはCPMやPSMを載せたコネクタを置きます。

**Q4. 2026年の会社動向として正しいものは？**
- A. CyberArkがPalo Alto Networksを買収した
- B. CyberArkの全製品が2026年に販売終了した
- C. CyberArkはPAM製品から撤退した
- D. Palo Alto NetworksによるCyberArk買収が2026年2月に完了し、5月にIdiraブランドが発表された　← 正解
- 解説：買い手はPalo Alto Networksです。買収完了は2026年2月11日、Idiraブランドの発表は2026年5月です。


---

<!-- ページ：learn/ch03.html -->

CHAPTER 03｜コア構成

# PAMのコアアーキテクチャ

CyberArk PAMは「金庫（Vault）」を中心に、役割の異なる“係員”たちが周りを囲む構成です。この章で、各部品の役割と通信の向きを押さえます。

#### この章の全体像

全体構成図 → 各コンポーネントの役割 → 通信とポート → 1回の特権利用で部品がどう連携するか（フロー）

#### この章のゴール

- Vault・PVWA・CPM・PSM・PSM for SSH・PTAの役割を1行で説明できる

- 主要な通信の向きとポート（1858、443、3389、22）を説明できる

- 利用者が「Connect」を押してから録画が保存されるまでの流れを図で説明できる

目安 75分  前提：第1・2章

## 1. 全体構成

> 図「図3-1：PAM Self-Hosted の全体構成（ヒカリ精機の例・架空）」（部品と矢印。`[s:n]` は強調するSTEP番号）
>  - 領域：PAMコンポーネント（hikari.example）
>  - 領域：ターゲット
>  - 部品：利用者・管理者 ／ ブラウザ／RDP／SSH（種別:user）
>  - 部品：PVWA ／ hk-pvwa01/02（種別:comp）
>  - 部品：PSM ／ hk-psm01/02（種別:comp）
>  - 部品：PSM for SSH ／ hk-psmp01（種別:comp）
>  - 部品：Digital Vault ／ hk-vault01 TCP 1858（種別:vault）
>  - 部品：CPM ／ hk-cpm01（種別:comp）
>  - 部品：PTA ／ hk-pta01（種別:threat）
>  - 部品：Windows ／ hk-fs01（種別:target）
>  - 部品：Linux ／ hk-web01（種別:target）
>  - 部品：Database ／ hk-db01（種別:target）
>  - 矢印：利用者・管理者 → PVWA：HTTPS 443
>  - 矢印：利用者・管理者 → PSM：RDP 3389
>  - 矢印：利用者・管理者 → PSM for SSH：SSH 22
>  - 矢印：PVWA → Digital Vault：1858
>  - 矢印：PSM → Digital Vault：1858
>  - 矢印：PSM for SSH → Digital Vault：1858
>  - 矢印：CPM → Digital Vault：1858
>  - 矢印：PTA → Digital Vault：1858
>  - 矢印：CPM → Windows

点線はCPMからターゲットへの接続の例です。PSM／PSM for SSHも同様に、セッション中継のためにターゲットへ接続します（図3-2参照）。

> 【★重点の1行要約】
🏦

すべての部品は「Vaultに接続しに行く」。Vaultは真ん中で金庫番をしているだけ。

PVWAもCPMもPSMも、資格情報・設定・ポリシーを毎回Vaultへ取りに行きます。Vaultが止まると、ほぼすべての機能が止まります。

## 2. 各コンポーネントの役割

> 【たとえ話】銀行の貸金庫室
>

**Vault**＝地下の貸金庫室、**PVWA**＝窓口カウンター、**CPM**＝定期的に鍵を作り替える錠前師、**PSM**＝お客様に付き添い、作業を録画する警備員、**PTA**＝防犯カメラ映像を分析して不審者を見つけるAI監視員です。

| コンポーネント | 正式名称 | 役割 | 主な稼働OS |
|---|---|---|---|
| **Vault** | Digital Vault | 資格情報・ポリシー・監査ログ・録画を暗号化して保管。権限チェックの最終判断者 | Windows Server（専用・堅牢化） |
| **PVWA** | Password Vault Web Access | 利用者・管理者向けWeb画面。REST APIの窓口でもある | Windows Server（IIS） |
| **CPM** | Central Policy Manager | ポリシーに従いパスワードを自動で変更・検証・調整 | Windows Server |
| **PSM** | Privileged Session Manager | RDP等のセッションを中継し、分離・録画・監視 | Windows Server（RDS） |
| **PSM for SSH** | Privileged Session Manager for SSH（PSMP） | SSHセッションを中継し、コマンド等を記録 | Linux |
| **PTA** | Privileged Threat Analytics | 特権アクティビティを分析して脅威を検知・自動対応 | Linux（アプライアンス型） |
| PrivateArk Client | PrivateArk Client | Vaultへ直接接続する管理用クライアント（高度な管理・緊急時） | Windows |
| DR Vault | Disaster Recovery Vault | 本番Vaultの複製。障害時に切り替え | Windows Server |

> 【出典・検証メモ】OS・バージョン要件
>

サポートされるOSバージョン、.NET・IISなどの前提ソフトウェアはリリースごとに変わります。構築時は該当バージョンの「System Requirements」を必ず確認してください。

## 3. 通信とポート

| 通信元 → 通信先 | ポート（既定） | 用途 |
|---|---|---|
| PVWA / CPM / PSM / PSM for SSH / PTA → Vault | **TCP 1858** | Vault独自プロトコル（暗号化）での通信 |
| 利用者 → PVWA | TCP 443（HTTPS） | Web画面・REST API |
| 利用者 → PSM | TCP 3389（RDP） | PSM経由のセッション（HTML5 Gateway利用時はHTTPS） |
| 利用者 → PSM for SSH | TCP 22（SSH） | SSHクライアントからの接続 |
| CPM / PSM → ターゲット | ターゲットのプロトコル（例：SSH 22、RDP 3389、Windowsの管理系ポート、DBのリスナーポート等） | パスワード変更・セッション中継 |
| Vault → DR Vault（DRサービス） | TCP 1858 | データ複製 |

> 【★重要】「1858」は絶対に覚える
>

公式の「Network port definitions」でも、CPM・PVWA・PSM・PSM for SSH などからVaultへの通信は **TCP 1858（既定。443などへの変更も可能）** とされています。Vault関連の疎通トラブルの多くはFWでのTCP 1858遮断です。「PVWAでログインできない」「CPMがVaultに繋がらない」ときは、まず`Test-NetConnection 10.10.10.11 -Port 1858`（PowerShell）のように疎通を確認します。

## 4. 1回の特権利用で部品がどう連携するか

新人の高橋さんが、Linuxサーバ `hk-web01` にPSM経由で接続する場面を例に、STEPを追ってみましょう。

#### ステップ式フロー：図3-2：PVWAからPSM経由で接続し、録画が保存されるまで（ラジオボタンでSTEPを切り替える）

> 図（部品と矢印。`[s:n]` は強調するSTEP番号）
>  - 部品：高橋さん ／ ブラウザ（種別:user） [s:1,3,5]
>  - 部品：PVWA（種別:comp） [s:1,2,3]
>  - 部品：Vault ／ 権限・PW・録画（種別:vault） [s:2,4,6,7]
>  - 部品：PSM（種別:comp） [s:3,4,5,6]
>  - 部品：CPM（種別:comp） [s:7]
>  - 部品：hk-web01 ／ 10.30.1.11（種別:target） [s:5,7]
>  - 矢印：高橋さん → PVWA：①ログイン [s:1]
>  - 矢印：PVWA → Vault：②認証・権限確認 [s:2]
>  - 矢印：高橋さん → PSM：③Connect→RDP [s:3]
>  - 矢印：PSM → Vault：④PW取得 [s:4]
>  - 矢印：PSM → hk-web01：⑤代理ログイン [s:5]
>  - 矢印：PSM → Vault：⑥録画保存 [s:6]
>  - 矢印：CPM → hk-web01：⑦PW変更 [s:7]

- STEP 1「PVWAにログイン」：高橋さんはブラウザで `https://pam.hikari.example/PasswordVault` を開き、社内ADのID＋MFAでログインします。
- STEP 2「Vaultで認証・権限確認」：PVWAはVaultへ（1858番ポートで）問い合わせ、高橋さんが**どのSafeのどのアカウントを、どの操作で使えるか**を確認します。権限の最終判断は常にVaultが行います。
- STEP 3「Connectを押す」：高橋さんは `hk-web01` の `root` アカウントを選び「Connect」を押します。PCのRDPクライアント（またはHTML5 Gateway）がPSMサーバへ接続します。**高橋さんはパスワードを一度も見ません。**
- STEP 4「PSMがパスワード取得」：PSMは高橋さんの代わりにVaultから `root` のパスワードを取り出します。
- STEP 5「代理ログインと中継」：PSMがターゲットへログインし、画面を高橋さんへ中継します。操作はすべて録画・記録され、監査担当者はリアルタイムで監視することもできます。
- STEP 6「録画をVaultへ保存」：セッション終了後、録画データと操作ログはVaultへ保存され、PVWAから再生・検索できます。
- STEP 7「CPMがパスワード変更」：ポリシー（例：定期変更、ワンタイム設定）に従い、CPMが `root` のパスワードを自動で新しいものに変更し、Vaultの値も更新します。

> 【現場Tips】トラブル時は「どの矢印が切れたか」で考える
>

上の図の矢印1本1本が、トラブルの切り分けポイントになります。例えば「PVWAにログインはできるがConnectで失敗」なら③〜⑤、「録画が再生できない」なら⑥を疑います。

## Self-Hosted と Privilege Cloud の違い（この章のポイント）

#### 🏢 Self-Hosted の場合

- Vault・PVWA・CPM・PSM・PSM for SSH・PTAをすべて自社で構築・運用する
- 各コンポーネントからVaultへ TCP 1858（既定）で接続
- Web画面（PVWA）はIIS上に自社で構築

#### ☁ Privilege Cloud の場合

- Vaultと管理ポータル（PVWA相当）はSaaSとして提供される
- 顧客側のコネクタは **Connector Managementエージェント＋PSM** が推奨構成。パスワード変更はSaaSの **Secrets Rotation Service** がエージェント経由で実行（CPMをコネクタに置く構成も選択可）
- SSH中継はPSM for SSH（Unixコネクタ）、LDAP・SIEM連携はSecure Tunnel
- コネクタからSaaSへの外向き通信は TCP 443 と 1858
- 脅威検知はSaaSのThreat Detection and Response（ITDR）等で提供

出典（2026-10-19確認）：Privilege Cloud architecture、Deploy Privilege Cloud Connector、Network ports overview

## 振り返り問題（第3章）

**Q1. Vaultの既定の通信ポートは？**
- A. TCP 443
- B. TCP 1858　← 正解
- C. TCP 3389
- D. UDP 514
- 解説：TCP 1858です。PVWA・CPM・PSMなどはこのポートでVaultへ接続します。

**Q2. ポリシーに従ってターゲットのパスワードを自動変更するコンポーネントは？**
- A. PVWA
- B. PSM
- C. CPM　← 正解
- D. PTA
- 解説：CPM（Central Policy Manager）です。

**Q3. PSM経由の接続で、利用者がパスワードを知らなくても接続できる理由は？**
- A. PSMが利用者の代わりにVaultからパスワードを取得し、代理でログインするから　← 正解
- B. ターゲット側でパスワード認証を無効化しているから
- C. PVWAが利用者のPCにパスワードを自動入力するから
- D. CPMが接続のたびにパスワードを空にするから
- 解説：PSMが代理ログインするため、利用者はパスワードを見ません。これにより「パスワードを知っている人」を増やさずに済みます。

**Q4. SSHセッションを中継・記録するLinux上のコンポーネントは？**
- A. PrivateArk Client
- B. CPM
- C. DR Vault
- D. PSM for SSH（PSMP）　← 正解
- 解説：PSM for SSH（PSMP）です。WindowsのPSMとは別のコンポーネントです。


---

<!-- ページ：learn/ch04.html -->

CHAPTER 04｜コア構成

# Digital Vaultとセキュリティ

Vaultは「会社中のマスターキーが入った金庫」です。金庫そのものが破られたら終わりなので、Vaultは他のサーバとはまったく違う考え方で守られます。

#### この章の全体像

Vaultの設計原則（専用・堅牢化・非ドメイン）→ 多層防御と暗号化 → 組み込みユーザーと緊急用Master → 可用性（DR・バックアップ）→ フェイルオーバーの流れ

#### この章のゴール

- Vaultを「ドメインに参加させない」「他のソフトを入れない」理由を説明できる

- Masterユーザー・Administratorユーザー・Auditors等の組み込みユーザー／グループの違いを説明できる

- DR Vaultへの切り替えの流れと、コンポーネント側の動きを説明できる

目安 70分  前提：第3章

## 1. Vaultの設計原則

> 【たとえ話】銀行の地下金庫は「普通の部屋」ではない
>

銀行の金庫室は、窓がなく、入口は1つだけ、壁は分厚く、清掃業者も自由には入れません。Vaultサーバも同じで、**入口（通信ポート）は原則1つ**、**余計なもの（他のソフトウェア・ドメイン参加）は置かない**のが基本です。

| 原則 | 内容 | 理由 |
|---|---|---|
| **専用サーバ** | Vaultサーバには他の役割（ファイルサーバ、監視エージェント等）を同居させない | 他ソフトの脆弱性が攻撃の入口になる（攻撃対象領域の拡大） |
| **ドメイン非参加** | Active Directoryドメインに参加させない（ワークグループ） | ドメインが侵害されても、ドメイン管理者がVaultサーバに入れないようにする |
| **堅牢化（ハードニング）** | インストール時に不要なサービス停止・OS設定の強化が自動で行われる | 攻撃に使える機能を最初から取り除く |
| **専用ファイアウォール** | VaultがWindowsファイアウォールを制御し、既定ではVaultプロトコル（TCP 1858）のみ受け付ける | 入口を1つに絞り、不要な通信を遮断する |
| **物理的・論理的なアクセス制限** | コンソールアクセスできる人を最小限にし、仮想環境ならハイパーバイザ管理者も統制する | OSより下のレイヤ（物理・仮想基盤）からの攻撃を防ぐ |

> 【⚠注意】よくある失敗
>

- 「監視のために」Vaultサーバに汎用の監視エージェントやリモート管理ツールを入れてしまう

- 「管理が楽だから」Vaultをドメインに参加させてしまう

- FWの例外を増やし、RDPを常時開放してしまう

いずれも金庫室に裏口を作る行為です。必要な場合は公式のガイドに沿って、例外を最小限にします。公式GitHubの `CYBRHardeningCheck` のように、堅牢化状態（ドメイン非参加かどうか等）を確認するツールも提供されています。

## 2. 多層防御と暗号化

Vaultは、1つの対策が破られても次の対策で守る**多層防御**の考え方で設計されています。

#### 🔒 通信の暗号化

コンポーネントとVault間の通信は暗号化される。

#### 🧱 ファイアウォール

Vault自身がFWを管理し、許可された通信のみ受け付ける。

#### 🪪 認証

パスワード、LDAP、RADIUS、PKI、SAMLなど多様な認証方式と多要素認証。

#### 🗝 アクセス制御

Safe単位の細かい権限。Vault管理者であっても権限がなければ中身は見えない設計が可能。

#### 📜 監査

すべての操作を改ざん困難な形で記録。

#### 🔐 保存データの暗号化

格納データは階層的な鍵で暗号化して保存。

### 階層的な暗号化（鍵の入れ子）

Vaultに保存されるファイルは、ファイルごとの鍵で暗号化され、その鍵はSafeの鍵で、Safeの鍵はVaultのServer Keyで暗号化されます。

> 図「図4-1：鍵の入れ子構造（概念図）」（部品と矢印。`[s:n]` は強調するSTEP番号）
>  - 部品：Server Key ／ 最上位の鍵 （HSM保管も可）（種別:vault）
>  - 部品：Safe Key ／ Safeごとの鍵（種別:vault）
>  - 部品：File Key ／ ファイルごとの鍵（種別:vault）
>  - 部品：データ ／ パスワード・録画等（種別:target）
>  - 矢印：Server Key → Safe Key：暗号化
>  - 矢印：Safe Key → File Key：暗号化
>  - 矢印：File Key → データ：暗号化

> 【たとえ話】マトリョーシカ型の鍵束
>

書類（データ）は鍵付きの封筒（File Key）に入り、その封筒の鍵はさらに部屋ごとの金庫（Safe Key）に、部屋の金庫の鍵は建物全体の親鍵（Server Key）で守られています。**Vaultのディスクだけを盗まれても、親鍵がなければ中身は読めません。**

Server Keyのほかに**リカバリキー（Recovery Key）**があります。リカバリキーの秘密鍵は一般に「Master CD」と呼ばれる媒体に格納され、**Vaultサーバとは別の場所（オフライン）で厳重に保管**します。Masterユーザーでのログインや緊急時の復旧に使われます。

## 3. 組み込みユーザーとグループ

Vaultはインストール時に、いくつかのユーザーとグループを自動作成します。代表的なものを覚えましょう。

| 名前 | 種類 | 特徴 | 運用上の扱い |
|---|---|---|---|
| **Master** | ユーザー | 「Authorize password requests（承認）」を除くすべてのSafe権限を持ち、どのSafeからも削除できない。System Safeを編集できる唯一のユーザー。ログインはPrivate Recovery Keyを含む**Master CD**でのみ可能 | **緊急時専用（ブレークグラス）**。普段は絶対に使わない |
| **Administrator** | ユーザー | 初期の管理者ユーザー。Masterと違い、新しいSafeへ自動で全権限が付くわけではない | 初期構築後は厳重保管し、日常は個人名の管理者アカウントを使う |
| **Vault Admins** | グループ | Vaultの管理機能（PVWAの管理画面等）を使える管理者グループ | メンバーは最小限に。LDAPグループをマッピングすることが多い |
| **Auditors** | グループ | View audit と View Safe Members 権限を持ち、Safeの内容・操作ログ・オーナー一覧を参照できる（組み込みのAuditorユーザーが所属） | 監査担当・内部監査部門 |
| Backup Users / DR Users / Operators など | グループ・ユーザー | Backup Users・DR UsersはBackup Safe権限（バックアップ・DR複製用）、OperatorsはManage Safe権限（Safeのプロパティ変更等。中身は見えない） | 用途専用。対話ログインには使わない |

> 【★重点の1行要約】
🚨

Masterユーザーは「非常口の鍵」。使ったら必ず事後報告・記録・原因対策。

Masterの利用は、全管理者がロックアウトされた等の非常事態に限ります。利用手順（誰が立ち会い、どこから鍵を出し、どう記録するか）を事前に文書化しておくのが設計者の仕事です。

> 【出典・検証メモ】公式ドキュメントで確認済み（2026-10-19）
>

出典：PAM - Self-Hosted「Predefined users and groups」。なお、**Master以外の組み込みユーザーは作成時点では無効（disabled）**で、使うには有効化が必要です。組み込みユーザー・グループを自動追加されたSafeから外せるかどうかは、DBParm.ini の設定で決まります。

## 4. 可用性：DR・バックアップ・冗長化

Vaultが止まるとPAM全体が止まり、特権作業ができなくなります。そのため可用性設計は必須です。

| 方式 | 概要 | 守れるもの |
|---|---|---|
| **DR Vault** | 別サイトに待機用Vaultを置き、DRサービスがデータを継続的に複製。本番障害時にDR Vaultを起動して切り替える | サイト障害・サーバ障害 |
| **クラスタ構成** | 同一サイト内で2台のVaultを共有ストレージ等で冗長化（Cluster Vault） | サーバ単体の障害（同一サイト内） |
| **バックアップ** | 専用のバックアップユーティリティ（PAReplicate等）でVaultデータを取得し、外部のバックアップ製品で保管 | 論理障害・誤操作・ランサムウェア（世代管理） |
| **コンポーネント冗長化** | PVWA・PSMは複数台＋ロードバランサ、CPMは担当範囲を分けて複数台 | コンポーネント障害・性能 |

> 【★重要】DRとバックアップは別物
>

DRは「最新の状態をすぐに引き継ぐ」仕組みなので、**誤って削除したデータもそのまま複製されます**。過去の状態に戻すにはバックアップが必要です。両方を設計しましょう。

#### ステップ式フロー：図4-2：本番Vault障害時のDR切り替え（フェイルオーバー）（ラジオボタンでSTEPを切り替える）

> 図（部品と矢印。`[s:n]` は強調するSTEP番号）
>  - 領域：本番サイト
>  - 領域：DRサイト
>  - 部品：本番Vault ／ hk-vault01 10.10.10.11（種別:vault） [s:1,2,5]
>  - 部品：PVWA/CPM/PSM ／ 接続先リストに 両Vaultを登録（種別:comp） [s:4,5]
>  - 部品：DR Vault ／ hk-vault-dr01 10.20.10.11（種別:vault） [s:1,2,3,4,5]
>  - 部品：運用担当 ／ 判断・記録・復旧（種別:user） [s:3,5]
>  - 矢印：本番Vault → DR Vault：①データ複製（継続） [s:1]
>  - 矢印：DR Vault → 本番Vault：②死活監視→応答なし [s:2]
>  - 矢印：運用担当 → DR Vault：③DR Vault起動 [s:3]
>  - 矢印：PVWA/CPM/PSM → DR Vault：④接続先を切替 [s:4]
>  - 矢印：運用担当 → 本番Vault：⑤復旧後フェイルバック [s:5]

- STEP 1「平常時の複製」：平常時、DRサービスが本番Vault（`hk-vault01`）のデータとメタデータをDR Vault（`hk-vault-dr01`）へ継続的に複製します。DR Vaultは待機状態です。
- STEP 2「障害検知」：DR側は本番Vaultの死活を監視します。一定回数応答がない場合に障害と判断します（判定条件は設定ファイルで調整）。
- STEP 3「DR Vault起動」：設定により自動、または運用担当の判断による手動でDR Vaultが起動し、本番として動き始めます。**誤検知による「二重稼働」を避けるため、手動判断を挟む運用も多い**です。
- STEP 4「コンポーネント切替」：PVWA・CPM・PSM等は、設定ファイル（Vault接続情報）に複数のVaultアドレスを登録しておくことで、応答のあるVaultへ接続を切り替えます。
- STEP 5「フェイルバック」：本番Vaultの復旧後、DR側の最新データを戻して本番へ切り戻します（フェイルバック）。手順は手作業を含むため、**年1回以上の切替訓練**で手順書を検証しておきます。

> 【現場Tips】DR訓練は「やってみないと分からない」
>

FWでDRサイトへの1858が開いていない、DR側PSMの録画保存先が足りない、手順書が古い…といった問題は、訓練で初めて見つかることがほとんどです。

## Self-Hosted と Privilege Cloud の違い（この章のポイント）

#### 🏢 Self-Hosted の場合

- Vaultの堅牢化・パッチ・鍵（Server Key／Master CD）・DR・バックアップはすべて自社の責任
- 組み込みユーザー（Master・Administrator 等）とグループ（Vault Admins・Auditors 等）を自社で管理

#### ☁ Privilege Cloud の場合

- Vaultの運用・堅牢化・DR・バックアップはサービス提供側の責任範囲
- 顧客が守るのは、管理者の役割（Privilege Cloud Administrators／Auditors／Safe Managers）、認証基盤（Identity）、コネクタサーバの堅牢化（提供されるGPO堅牢化パッケージ）
- 組み込みユーザーは編集・削除できず、アプリ用の組み込みユーザーはライセンスを消費しない
- IdP障害などに備えた緊急時のログイン手順は、SaaSでも顧客側で用意する

出典（2026-10-19確認）：Predefined users and groups、Privilege Cloud built-in users、ISPSS user roles、Upgrade connector components

## 振り返り問題（第4章）

**Q1. VaultサーバをActive Directoryドメインに参加させない主な理由は？**
- A. ライセンスがドメイン参加を禁止しているから
- B. ドメインが侵害されても、ドメイン管理者権限でVaultサーバへ侵入されないようにするため　← 正解
- C. ドメイン参加するとTCP 1858が使えなくなるから
- D. ドメイン参加するとバックアップが取れないから
- 解説：ドメイン侵害がVault侵害に直結しないよう、Vaultは独立させます。

**Q2. Masterユーザーの説明として正しいものは？**
- A. 日常の管理作業で使う標準的な管理者
- B. 監査ログを閲覧するためだけのユーザー
- C. PVWAのREST API専用ユーザー
- D. どのSafeからも削除できず（承認権限を除く）全権限を持ち、Master CDのリカバリキーでのみログインできる緊急用ユーザー　← 正解
- 解説：Masterは緊急時専用です。日常使用は厳禁です。

**Q3. 「誤って削除したアカウント情報を前日の状態に戻したい」場合に必要なのは？**
- A. バックアップ　← 正解
- B. DR Vault
- C. PSMの冗長化
- D. ロードバランサ
- 解説：DRは最新状態を複製するため削除も複製されます。過去の状態への復元にはバックアップが必要です。

**Q4. Vaultの保存データ暗号化の鍵階層で、最上位にあるのは？**
- A. File Key
- B. Safe Key
- C. Server Key　← 正解
- D. 利用者のパスワード
- 解説：Server Key → Safe Key → File Key → データ の順に入れ子で暗号化されます。
