# 教材パック：第13章 アプリケーションとシークレット管理

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


<!-- 元ページ：learn/ch13.html -->

CHAPTER 13｜発展

# アプリケーションとシークレット管理

人ではなく「プログラム」が使うパスワードやAPIキー（シークレット）をどう守るか。設定ファイルへのパスワード直書きをなくすための仕組みを学びます。

#### この章の全体像

ハードコードの問題 → 「シークレット・ゼロ」問題 → Credential Provider（CP）と Central Credential Provider（CCP）→ CCPでの取得フロー → Secrets Manager（旧Conjur）→ Secrets Hub → 使い分け

#### この章のゴール

- アプリのパスワード直書きのリスクと、「シークレット・ゼロ」問題を説明できる

- CPとCCPの違い、アプリ認証（Application ID）の仕組みを説明できる

- CP/CCP・Secrets Manager・Secrets Hubを、アプリの種類に応じて使い分けられる

目安 75分  前提：第6〜8章

## 1. ハードコードの問題

開発チームの中村さんのアプリは、設定ファイルに次のように書かれていました（架空の例）。

```
# /opt/hk-sales/config/db.properties
db.url=jdbc:oracle:thin:@hk-db01.hikari.example:1521/SALES
db.user=appuser
db.password=Hikari2019!   ← 平文のまま、7年間変更なし
```

> 【⚠注意】直書き（ハードコード）が危険な理由
>

- サーバに入れた人・ソースコードを見た人なら誰でもパスワードを知ることができる

- Git等のリポジトリやバックアップ、チャットに貼られて拡散する

- 変更するとアプリが止まるため、**何年も変更されない**

- 同じパスワードが複数環境で使い回されがち

### 「シークレット・ゼロ」問題

> 【たとえ話】金庫の鍵を、どこにしまうか
>

「パスワードは金庫（Vault）に入れました。アプリは金庫から取り出します」——では、**アプリが金庫を開けるための鍵**はどこに置くのでしょうか？それを設定ファイルに書いたら元の木阿弥です。この「最初の1つの秘密」をどう扱うかが**シークレット・ゼロ問題**です。CyberArkは、**パスワードの代わりに「アプリ自身の属性」（どのマシンで、どのOSユーザーで、どのプログラムが動いているか、証明書、クラウドやKubernetesが発行するID）**で本人確認することで、この問題を解決します。

## 2. Credential Provider（CP）とCentral Credential Provider（CCP）

| 項目 | CP（Credential Provider） | CCP（Central Credential Provider） |
|---|---|---|
| 形態 | アプリサーバに**エージェントを導入** | **エージェント不要**。中央のWebサービスにREST等で問い合わせ |
| 可用性 | ローカルキャッシュを持ち、Vaultに一時的に接続できなくても取得可能 | CCPサーバの冗長化（複数台＋ロードバランサ）で確保 |
| アプリ認証 | OSユーザー、実行パス、ハッシュ、許可マシン等 | 許可マシン（送信元IP）、クライアント証明書等 |
| 向いている場面 | エージェントを入れられるサーバ、高い可用性が必要 | エージェントを入れられない機器・アプライアンス・外部製品との連携（RPA等） |

アプリケーションサーバのデータソース（接続プール）向けに、アプリのコードを変えずに資格情報を提供する仕組み（ASCP）もあります。

### アプリをVaultに登録する（Application ID）

- PVWAでアプリケーションを登録し、**Application ID**（例：`HK-SalesApp`）を決める

- アプリ認証の条件を設定する（許可マシン `10.30.1.21`、クライアント証明書、OSユーザー等）

- アプリ用Safe（`HK-PRD-APP-ORA-APPUSR`）に、アプリ（Application ID）と、CP/CCPのProviderをメンバーとして追加する（主に**List accounts と Retrieve accounts**。Providerにはさらに View Safe members 等が必要）

- 人のメンバーにはRetrieveを付けない（人は見られない設計にする）

## 3. CCPでのパスワード取得の流れ

#### ステップ式フロー：図13-1：アプリがCCP経由でDBパスワードを取得する（ラジオボタンでSTEPを切り替える）

> 図（部品と矢印。`[s:n]` は強調するSTEP番号）
>  - 部品：販売アプリ ／ hk-app01 10.30.1.21（種別:user） [s:1,5]
>  - 部品：CCP ／ Webサービス hk-ccp01（種別:comp） [s:1,2,3,4,5]
>  - 部品：Vault ／ アプリ用Safe（種別:vault） [s:3,4,6]
>  - 部品：hk-db01 ／ appuser（種別:target） [s:5,6]
>  - 部品：CPM（種別:comp） [s:6]
>  - 矢印：販売アプリ → CCP：①HTTPS要求（証明書） [s:1]
>  - 矢印：CCP → 販売アプリ：⑤PW返却 [s:5]
>  - 矢印：CCP → Vault：③取得 [s:3]
>  - 矢印：Vault → CCP：④ [s:4]
>  - 矢印：販売アプリ → hk-db01：⑤DB接続 [s:5]
>  - 矢印：CPM → hk-db01：⑥定期変更 [s:6]
>  - 矢印：Vault → CPM [s:6]

- STEP 1「取得要求」：アプリは起動時（または接続時）に、CCPへHTTPSで「Application ID＝HK-SalesApp、Safe＝HK-PRD-APP-ORA-APPUSR、対象＝appuser」のパスワードを要求します。クライアント証明書を提示します。
`GET https://ccp.hikari.example/AIMWebService/api/Accounts?AppID=HK-SalesApp&Safe=HK-PRD-APP-ORA-APPUSR&Object=...`
※公式ドキュメント（Credential Providers「Call the Web Service using REST」）で確認済み。AppIDは必須で、ほかに少なくとも1つの条件が必要です。値はレスポンスの `Content` に入ります。**同じエンドポイントをPOSTで呼ぶ方法の方がより安全**とされており（URLに条件が残らない、監査用の理由を渡せる等）、新規実装ではPOSTを検討します。
- STEP 2「アプリ認証」：CCPは、要求元が登録された条件（送信元IPが許可マシンか、証明書が正しいか）を満たすか確認します。**パスワードではなく「アプリの属性」で本人確認**します。
- STEP 3「Vaultから取得」：認証に成功したら、CCPのProviderがVaultのアプリ用Safeから資格情報を取り出します。
- STEP 4「結果を受け取る」：Vaultでも権限（Application IDとProviderのSafe権限）が確認され、資格情報が返されます。すべての取得は監査ログに残ります。
- STEP 5「アプリへ返却・DB接続」：CCPはアプリにパスワードを返し、アプリはそれを使ってDBに接続します。設定ファイルにパスワードは存在しません。
- STEP 6「定期変更」：CPMが定期的にappuserのパスワードを変更します。アプリは次回の取得で新しいパスワードを受け取るため、**アプリを止めずにパスワードを変えられます**（接続プールの再接続タイミング等は設計が必要）。

## 4. Secrets Manager（旧 Conjur）

コンテナ、Kubernetes、CI/CDパイプラインなど、**短時間で大量に生まれては消えるワークロード**向けのシークレット管理です。SaaS版とSelf-Hosted版があります。

- **ポリシー・アズ・コード**：誰（どのワークロード）がどのシークレットを使えるかを、コード（YAML等）で定義・レビューできる

- **プラットフォームのIDで認証**：Kubernetesのサービスアカウント、クラウドのIAMロール、JWTなどを使い、シークレット・ゼロ問題を解消

- **PAMとの同期**：VaultのSafeに入っているアカウントを同期して、CPMによる自動変更の恩恵を受けられる構成がある

## 5. Secrets Hub

> 【たとえ話】本社の金庫と各支店の金庫
>

AWS Secrets ManagerやAzure Key Vaultは「各クラウドに備え付けの金庫（支店の金庫）」です。開発者は使い慣れたその金庫を使いたい。一方セキュリティ部門は、ローテーションや監査を本社（CyberArk）で一元管理したい。Secrets Hubは、**本社金庫の中身を支店金庫に自動で配送・同期する仕組み**です。

- CyberArk（Privilege Cloud／Self-Hosted）で管理・ローテーションしたシークレットを、**AWS Secrets Manager・Azure Key Vault・GCP Secret Manager・HashiCorp Vault**へ同期（公式「Secrets Hub support and scope」2026-10-19確認。鍵・証明書は対象外）

- 各クラウドとの信頼関係は、AWSはIAMロール、AzureはApp Registration（新規はフェデレーションIDのみ）、GCPはサービスアカウント／Workload Identity Federationで構成

- アプリは**クラウドの標準API**のまま使えるため、アプリ改修が少ない

- クラウドのシークレットストアにある既存シークレットを発見・可視化し、CyberArkの管理下へ取り込む機能も拡充されている（2025年のアップデート）

## 6. 使い分け

| アプリの種類 | 第一候補 | 理由 |
|---|---|---|
| オンプレの従来型業務アプリ（エージェント導入可） | CP | ローカルキャッシュで高可用 |
| アプライアンス・パッケージ製品・RPA | CCP | エージェント不要、製品側の連携機能が対応していることが多い |
| Kubernetes・コンテナ・CI/CD | Secrets Manager | ワークロードIDで認証、ポリシー・アズ・コード |
| クラウドネイティブアプリ（AWS/Azure等の標準ストアを利用） | Secrets Hub | アプリ改修を最小にしつつ一元管理 |

## Self-Hosted と Privilege Cloud の違い（この章のポイント）

#### 🏢 Self-Hosted の場合

- CP／CCPは自社のVaultに接続
- Secrets HubはSelf-HostedのPAMをソースとして利用可能

#### ☁ Privilege Cloud の場合

- CP／CCPはPrivilege Cloudでも利用可能（アプリ認証・Safe権限の考え方は同じ）
- Secrets HubはPrivilege Cloudをソースとして利用可能
- パスワード変更をSecrets Rotation Serviceで行う場合、Credential Providerの dual account 管理は未対応（設計時に注意）

出典（2026-10-19確認）：Secrets Hub support and scope、Secrets Rotation limitations

## 振り返り問題（第13章）

**Q1. 「シークレット・ゼロ問題」の説明として正しいものは？**
- A. Vaultにパスワードが1件もない状態
- B. アプリが金庫を開けるための「最初の秘密」をどこに置くかという問題　← 正解
- C. パスワードの長さが0文字になる不具合
- D. CPMが停止している状態
- 解説：CyberArkはパスワードの代わりにアプリの属性やプラットフォームIDで認証して解決します。

**Q2. エージェントを導入できないアプライアンスからパスワードを取得させたい。適切なのは？**
- A. CCP　← 正解
- B. CP
- C. PSM for SSH
- D. EPM
- 解説：CCPはエージェント不要のWebサービス型です。

**Q3. CPの特徴として正しいものは？**
- A. エージェント不要
- B. 人のRDP接続を録画する
- C. クラウドのシークレットストアと同期する
- D. ローカルキャッシュを持ち、Vaultに一時的に接続できなくても取得できる　← 正解
- 解説：CPはエージェント型でローカルキャッシュを持つため可用性が高いのが特徴です。

**Q4. AWS Secrets Managerを使うアプリを改修せずに、ローテーションと監査をCyberArkで一元管理したい。適切なのは？**
- A. PSM
- B. EPM
- C. Secrets Hub　← 正解
- D. PrivateArk Client
- 解説：Secrets HubはCyberArkで管理したシークレットをクラウドのストアへ同期します。
