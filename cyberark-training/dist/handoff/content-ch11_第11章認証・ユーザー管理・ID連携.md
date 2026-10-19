# 教材パック：第11章 認証・ユーザー管理・ID連携

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


<!-- 元ページ：learn/ch11.html -->

CHAPTER 11｜利用・監視

# 認証・ユーザー管理・ID連携

金庫の鍵をいくら厳重に管理しても、「金庫室に入る人の本人確認」が甘ければ意味がありません。CyberArkへのログインの仕組みと、ユーザー・グループ管理の考え方を学びます。

#### この章の全体像

ユーザーの種類 → 認証方式（Vault認証・LDAP・RADIUS・SAML・MFA）→ LDAP連携（Directory Mapping）→ Privilege Cloudでの認証（Identity）→ SAML認証の流れ → 設計の勘所

#### この章のゴール

- CyberArkで使える主な認証方式と、MFAが必須である理由を説明できる

- ADグループとVault権限をつなぐ「LDAP連携」の仕組みを説明できる

- SAMLによるシングルサインオンの流れを説明できる

目安 60分  前提：第6章

## 1. ユーザーの種類

| 種類 | 概要 | 例 |
|---|---|---|
| Vault（内部）ユーザー | Vault内に直接作成されるユーザー | 組み込みユーザー、緊急用の管理者、コンポーネント用ユーザー |
| LDAPユーザー | Active Directory等のユーザーを連携して利用 | 一般の利用者・管理者（推奨） |
| コンポーネント・アプリ用ユーザー | CPM・PSM・CPなどがVaultへ接続するためのユーザー | 人は使わない。自動で管理される |

> 【★重要】人の利用者は原則「LDAPユーザー＋MFA」
>

Vault内部ユーザーを大量に作ると、入退社・異動のたびに手作業が発生し、消し忘れが起きます。人はADなど既存のID基盤と連携し、Vault内部ユーザーは緊急用などに限定しましょう。

## 2. 認証方式

| 方式 | 概要 | 補足 |
|---|---|---|
| CyberArk（Vault）認証 | Vaultに保存されたパスワードで認証 | 緊急用ユーザー等 |
| LDAP認証 | ADのID・パスワードで認証 | 単独ではMFAにならない |
| RADIUS | RADIUSサーバ経由でワンタイムパスワード等と組み合わせ | MFA製品との連携でよく使われる |
| PKI（証明書） | クライアント証明書・スマートカード | 高セキュリティ環境 |
| **SAML** | IdP（Identity・Entra ID・Okta等）で認証し、その結果でログイン | SSO＋IdP側のMFAを活用できる。現在の主流 |

> 【たとえ話】MFAは「鍵＋顔認証」の二重ロック
>

パスワードだけの認証は「鍵だけの玄関」。鍵（パスワード）が盗まれたら誰でも入れます。MFAは「鍵＋顔認証（スマホ承認・生体認証）」です。金庫室の入口であるCyberArkには、**必ずMFAを掛けます**。

## 3. LDAP連携（Directory Mapping）

LDAP連携では、ADを「ユーザーの名簿」として使います。**Directory Mapping**（ディレクトリマッピング）の設定により、「ADのこのグループに所属する人は、Vaultでこういう権限・属性を持つ」というルールを定義します。

| ADグループ（例） | CyberArkでの扱い |
|---|---|
| `GG_PAM_ADMINS` | Vault Adminsにマッピング（管理機能） |
| `GG_PAM_AUDITORS` | Auditorsにマッピング（監査） |
| `GG_PAM_INF_USERS` など | Safeメンバーとして直接登録（第6章） |

> 【現場Tips】ADグループ運用のコツ
>

CyberArk用のADグループは命名規則（例：`GG_PAM_`で始める）を決め、**グループのメンバー変更も申請・承認制**にします。ADグループを変更できる人は実質的にCyberArkの権限を変更できるため、ADグループの管理権限自体が重要な統制ポイントになります。

## 4. Privilege Cloudでの認証（Identity）

Privilege Cloudでは、ISPSSの認証基盤である**Identity**（CyberArk Identity Security Platformのユーザー管理・認証機能）が入口になります。

- Identityで直接ユーザー管理・MFAを行う方法

- 社内IdP（Entra ID・Okta等）とSAMLで連携し、社内のSSOとMFAを使う方法

- オンプレADのユーザー・グループを、Identity Connector経由で利用する方法

どの方式を選ぶかは、既存のID基盤・MFA製品・社内ポリシーで決まります。

## 5. SAML認証の流れ

#### ステップ式フロー：図11-1：SAMLによるシングルサインオン（概念図）（ラジオボタンでSTEPを切り替える）

> 図（部品と矢印。`[s:n]` は強調するSTEP番号）
>  - 部品：高橋さん ／ ブラウザ（種別:user） [s:1,2,3,4,5]
>  - 部品：CyberArk ／ PVWA／Privilege Cloud （SP：サービス提供側）（種別:comp） [s:1,2,5]
>  - 部品：IdP ／ Identity／Entra ID 等（種別:cloud） [s:2,3,4]
>  - 部品：スマホ ／ MFA承認（種別:user） [s:3]
>  - 矢印：高橋さん → CyberArk：①アクセス [s:1]
>  - 矢印：CyberArk → IdP：②IdPへ転送 [s:2]
>  - 矢印：IdP → スマホ：③ID・PW＋MFA [s:3]
>  - 矢印：IdP → 高橋さん：④署名付き認証結果 [s:4]
>  - 矢印：高橋さん → CyberArk：⑤結果を提示→ログイン [s:5]

- STEP 1「CyberArkにアクセス」：高橋さんがCyberArkのログイン画面にアクセスします。
- STEP 2「IdPへ転送」：CyberArkは自分では認証せず、ブラウザを社内のIdPへ転送します。
- STEP 3「IdPで認証＋MFA」：IdPでID・パスワードを入力し、スマホのMFAで承認します。社内の他システムに既にログイン済みなら、ここは省略されることもあります（SSO）。
- STEP 4「署名付き結果を受け取る」：IdPは「この人は高橋葵さんで、認証済みです」という**電子署名付きの証明（SAMLアサーション）**をブラウザに渡します。
- STEP 5「ログイン完了」：ブラウザがその証明をCyberArkへ提示し、CyberArkは署名を検証してログインを許可します。**CyberArk側は利用者のADパスワードを受け取りません。**

## 6. 設計の勘所

- **MFAは必須**：特にVault管理者・Safe管理者・監査担当など権限の強い人から優先します。

- **IdPが止まったときの手段**：IdP障害でCyberArkに誰も入れないと、障害対応に必要な特権も使えません。**緊急用の認証経路（ブレークグラス）**を設計・文書化しておきます。

- **退職・異動の自動反映**：IdP・ADの無効化でCyberArkも使えなくなることを確認します。

- **人の特権IDとログインIDの分離**：普段のメール用IDとは別に、管理者用ID（例：`adm-a.takahashi`）を使う組織もあります。

## Self-Hosted と Privilege Cloud の違い（この章のポイント）

#### 🏢 Self-Hosted の場合

- PVWAで認証方式（CyberArk・LDAP・RADIUS・SAML 等）を構成
- LDAP連携はDirectory Mappingで定義

#### ☁ Privilege Cloud の場合

- ログインの入口はISPSSの **Identity**（MFA・SSO、社内IdPとのSAML連携）
- LDAP連携は **Directory Map** で定義（よく使う役割の既定マップあり）。LDAPS必須で、LDAPグループに属し有効なユーザーのみ連携される
- Identityのロール（Privilege Cloud Administrators／Auditors／Safe Managers 等）は権限だけでなく**消費するライセンス**も決める

出典（2026-10-19確認）：LDAP integration（Privilege Cloud）、ISPSS user roles、Set up LDAP integration（Self-Hosted）

## 振り返り問題（第11章）

**Q1. SAML認証で、CyberArkがIdPから受け取るものは？**
- A. 利用者のADパスワード
- B. 電子署名付きの認証結果（SAMLアサーション）　← 正解
- C. ターゲットのパスワード
- D. 録画ファイル
- 解説：CyberArkは署名付きの認証結果を検証するだけで、ADパスワードは受け取りません。

**Q2. ADのグループとVaultの権限・属性を結び付ける設定は？**
- A. Master Policy
- B. Connection Component
- C. Reconcile Account
- D. Directory Mapping（LDAP連携）　← 正解
- 解説：Directory Mappingで、ADグループに応じたVault上の扱いを定義します。

**Q3. IdPと連携する際に必ず検討すべきことは？**
- A. IdP障害時でもCyberArkに入れる緊急用の認証経路　← 正解
- B. 録画の解像度
- C. Safe名の長さ
- D. CPMの変更間隔
- 解説：IdPに依存しきると、IdP障害時に特権が一切使えなくなります。

**Q4. 人の利用者アカウントの推奨的な管理方法は？**
- A. Vault内部ユーザーを人数分作る
- B. 全員でAdministratorを共有する
- C. AD等のID基盤と連携し、MFAを掛ける　← 正解
- D. Masterユーザーを配布する
- 解説：既存のID基盤と連携することで入退社・異動が自動で反映され、MFAで本人確認を強化できます。
