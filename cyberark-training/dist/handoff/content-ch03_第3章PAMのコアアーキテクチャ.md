# 教材パック：第3章 PAMのコアアーキテクチャ

CyberArk 新人研修の確定済みの内容です。Claude Code で作成し、公式ドキュメント（docs.cyberark.com）と Palo Alto Networks 公式発表で検証済みです。
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


<!-- 元ページ：learn/ch03.html -->

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
