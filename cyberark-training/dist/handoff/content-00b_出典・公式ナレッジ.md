# 教材パック：出典・公式ナレッジ

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


<!-- 元ページ：references.html -->

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
