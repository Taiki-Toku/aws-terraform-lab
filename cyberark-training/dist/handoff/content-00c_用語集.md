# 教材パック：用語集

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


<!-- 元ページ：glossary.html -->

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
