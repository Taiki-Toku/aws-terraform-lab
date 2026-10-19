# 教材パック：第5章 Self-HostedとPrivilege Cloud

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


<!-- 元ページ：learn/ch05.html -->

CHAPTER 05｜コア構成

# Self-HostedとPrivilege Cloud

同じ「CyberArk PAM」でも、自社で金庫を持つか（Self-Hosted）、金庫を預けるか（Privilege Cloud）で、構成も運用も大きく変わります。

#### この章の全体像

責任分界の違い → Privilege Cloudの構成（ISPSS・コネクタ・Connector Management・Secure Tunnel）→ コネクタ導入の流れ → 比較と選び方

#### この章のゴール

- Self-HostedとPrivilege Cloudの責任分界（誰が何を運用するか）を説明できる

- Privilege Cloudで顧客側に置くもの（コネクタ等）とその役割を説明できる

- 要件に応じてどちらが向いているかを根拠付きで提案できる

目安 60分  前提：第3・4章

## 1. 責任分界：誰が何を運用するか

> 【たとえ話】自宅の金庫 vs 銀行の貸金庫
>

**Self-Hosted**は自宅に金庫を買って置くイメージです。金庫の設置場所・メンテナンス・防犯は全部自分の責任ですが、自由度は最大です。**Privilege Cloud**は銀行の貸金庫です。金庫室の警備・保守は銀行（CyberArk）が行い、自分は「出し入れの手続き」と「鍵を使う人の管理」に集中できます。ただし銀行の営業ルール（サービス仕様）には従う必要があります。

| 項目 | Self-Hosted | Privilege Cloud |
|---|---|---|
| Vaultの構築・堅牢化・パッチ | 顧客 | **CyberArk** |
| Vaultのバックアップ・DR | 顧客 | **CyberArk** |
| Web画面（PVWA相当） | 顧客（IIS上に構築） | **CyberArk**（SaaSの管理画面） |
| CPM・PSM・PSM for SSH | 顧客 | 顧客（**コネクタサーバ**上で稼働） |
| ターゲットとの通信 | 顧客ネットワーク内 | 顧客ネットワーク内（コネクタから） |
| Safe・アカウント・ポリシー設計 | 顧客 | 顧客 |
| 利用者・権限・承認の運用 | 顧客 | 顧客 |
| バージョンアップ | 顧客が計画・実施 | SaaS部分は提供側が更新。コネクタ側は Connector Management に新版が表示されたら管理者が更新を実行 |

> 【★重要】SaaSでも「設計と運用」は顧客の仕事
>

Privilege Cloudにしても、**Safe設計・権限・ポリシー・オンボーディング・承認運用**は顧客側の仕事のままです。第6章以降の内容は、どちらの形態でも必要な知識です。

## 2. Privilege Cloudの構成

Privilege Cloudは、CyberArkのSaaS共通基盤である**Identity Security Platform Shared Services（ISPSS）**上で提供されます。ISPSSは認証（Identity）・管理画面・監査などを複数のSaaS製品で共有する土台です。

> 図「図5-1：Privilege Cloud の構成（概念図・ヒカリ精機の例）」（部品と矢印。`[s:n]` は強調するSTEP番号）
>  - 領域：CyberArk SaaS（ISPSS）
>  - 領域：顧客ネットワーク（hikari.example）
>  - 部品：Identity ／ 認証・MFA・SSO（種別:cloud）
>  - 部品：Privilege Cloud ／ 管理画面・ポータル（種別:cloud）
>  - 部品：Vault（SaaS） ／ CyberArkが運用（種別:vault）
>  - 部品：Connector Management ／ コネクタの導入・監視・更新を管理（種別:cloud）
>  - 部品：利用者 ／ ブラウザ（種別:user）
>  - 部品：コネクタサーバ ／ Connector Mgmt Agent / PSM （＋Secure Tunnel） （hk-conn01, 02）（種別:comp）
>  - 部品：AD ／ hk-ad01（種別:target）
>  - 部品：ターゲット ／ サーバ/DB（種別:target）
>  - 矢印：利用者 → Identity：HTTPS（ログイン）
>  - 矢印：コネクタサーバ → Vault（SaaS）：アウトバウンド TCP 443 / 1858（TLS 1.2以上）
>  - 矢印：コネクタサーバ → Connector Management：管理用
>  - 矢印：コネクタサーバ → ターゲット：変更・中継
>  - 矢印：コネクタサーバ → AD：LDAP等

| 要素 | 場所 | 役割 |
|---|---|---|
| **Identity（ISPSSの認証基盤）** | SaaS | Privilege Cloudへのログイン、MFA、社内IdPとのSAML連携 |
| **Privilege Cloud（Vault・ポータル）** | SaaS | 資格情報の保管、Safe・アカウント・ポリシーの管理、録画の保管・再生 |
| **コネクタサーバ** | 顧客側 | ターゲットに近いネットワークに置くWindowsサーバ。**推奨構成は Connector Management エージェント＋PSM**（パスワード変更はSaaSのSecrets Rotation Serviceがエージェント経由で実行）。CPM＋PSMを載せる従来構成も選択可。複数台で冗長化 |
| **Secrets Rotation Service／Discovery** | SaaS | CPMに代わるSaaSのパスワード変更エンジンと、アカウント発見サービス。CPMと同じプラグインを使い、エージェントを通じてターゲットを操作 |
| **PSM for SSH** | 顧客側（Linux） | SSHセッションの中継・記録（必要な場合） |
| **Connector Management** | SaaS＋顧客側エージェント | SaaS画面からコネクタの導入・状態監視・更新を行う仕組み |
| **Secure Tunnel** | 顧客側 | SaaSとオンプレ間の暗号化トンネル（オンプレADとのLDAP連携等に利用） |
| **Identity Connector** | 顧客側 | オンプレのADとIdentity（SaaS）をつなぐ |

> 【★重点の1行要約】
↗

コネクタは「内側から外へ」話しかける。外（SaaS）から社内へ穴を開ける必要はない。

公式の「Outbound traffic network and port requirements」では、コネクタからSaaSへのアウトバウンド通信として **TCP 443（HTTPS：REST/API・証明書検証等）と TCP 1858（Vaultバックエンド）** が挙げられ、通信はすべて TLS 1.2 以上です。宛先の指定はワイルドカードによる動的設定が推奨され、使えない場合はテナント固有のFQDN／IPを許可します。

## 3. コネクタ導入の流れ

#### ステップ式フロー：図5-2：Connector Managementによるコネクタ導入（ラジオボタンでSTEPを切り替える）

> 図（部品と矢印。`[s:n]` は強調するSTEP番号）
>  - 部品：PAM管理者 ／ 山本さん（種別:user） [s:1,2]
>  - 部品：Connector Management ／ SaaS画面（種別:cloud） [s:1,2,4,5]
>  - 部品：コネクタサーバ ／ hk-conn01 10.10.40.11（種別:comp） [s:2,3,4,5]
>  - 部品：Privilege Cloud ／ Vault（SaaS）（種別:vault） [s:4,5]
>  - 矢印：PAM管理者 → Connector Management：①コネクタ追加 [s:1]
>  - 矢印：Connector Management → コネクタサーバ：②導入スクリプト [s:2]
>  - 矢印：PAM管理者 → コネクタサーバ：③スクリプト実行 [s:3]
>  - 矢印：コネクタサーバ → Connector Management：④登録・接続 [s:4]
>  - 矢印：コネクタサーバ → Privilege Cloud：⑤PSM・変更処理が稼働 [s:5]

- STEP 1「コネクタを追加」：管理者はSaaSの管理画面でConnector Managementを開き、「コネクタを追加」を選びます。導入先のOSや用途を指定します。
- STEP 2「導入スクリプト生成」：画面に導入スクリプトが生成されます。スクリプトには認証用の一時トークンが含まれ、**有効期限が短く設定されています**（期限切れの場合は再生成）。
- STEP 3「サーバで実行」：準備したコネクタサーバ（`hk-conn01`）上で、管理者権限でスクリプトを実行します。Connector Managementのエージェントが導入されます。
- STEP 4「登録・接続」：エージェントがSaaSへアウトバウンド接続して登録されます。以後、画面からCPM・PSM等のコンポーネントの導入や状態確認ができるようになります。
- STEP 5「コンポーネント稼働」：画面からPSM（従来構成ならCPMも）を導入すると、Privilege Cloudと通信を開始します。推奨構成では、パスワード変更はSaaSのSecrets Rotation Serviceがこのエージェント経由で実行し、PSMがセッションを中継します。冗長化のため2台目（`hk-conn02`）も同様に導入します。

> 【⚠注意】「HTTPSだけ開ければよい」は誤り
>

Privilege Cloudのコネクタは 443 に加えて **TCP 1858** の外向き通信が必要です。プロキシ経由でHTTPSだけを許可している環境では、1858 の扱いを事前にネットワーク担当と決めておかないと、コネクタがVaultに接続できません。また、IdiraはSaaS側で**特定IPからのインバウンドのみ許可**するため、コネクタの**送信元となる公開IPアドレスをテクニカルサポートに届け出る**必要があります（送信元IPは常に同じになるよう経路を固定）。IPv4のみ対応です。

> 【出典・検証メモ】確認ポイント
>

導入手順・前提条件（OS、.NET、通信要件、トークン有効期限）は更新が頻繁です。必ず最新の「Connector Management」ドキュメントで確認してから作業してください。

> 【★重要】Privilege Cloudでの接続方式の選び方
>

公式ドキュメントでは、RDP・SSH・データベースへの接続は **SIA（Secure Infrastructure Access）** の利用が推奨されています（軽量なコネクタ、高可用性・負荷分散を内蔵、更新時の停止がほぼない）。Webサイト・クラウドコンソール・ESX/vCenter・ファットクライアントへの接続や高度なカスタマイズが必要な場合は **PSM** を使います。詳しくは第10章・第14章。

## 4. 比較と選び方

| 観点 | Self-Hosted が向くケース | Privilege Cloud が向くケース |
|---|---|---|
| ネットワーク | インターネット接続が許されない閉域環境 | コネクタからの外向き通信（TCP 443・1858）を許可できる |
| 規制・データ所在 | 資格情報を自社管理下に置くことが規程上必須 | SaaSの認証・リージョンが要件を満たす |
| 運用体制 | Vault・DR・バージョンアップを担える体制がある | インフラ運用を減らし、設計・活用に注力したい |
| 拡張性 | 既存の高度なカスタマイズ資産がある | SIA・SCA・Secrets Hub等のSaaS製品と統合したい |
| 機能追加 | 計画的なバージョンアップで取り込む | SaaS部分は継続的に機能追加 |

> 【現場Tips】移行の相談が増えている
>

Self-HostedからPrivilege Cloudへの移行案件は増えています。移行では「Safe・アカウント・プラットフォームの移行」「ユーザー認証の切替（LDAP→Identity/SAML）」「録画データの扱い」「並行稼働期間」が主な論点です（ケーススタディ応用編で扱います）。

## 振り返り問題（第5章）

**Q1. Privilege Cloudで、顧客側が運用するものは？**
- A. Vaultのパッチ適用
- B. VaultのDR
- C. CPM・PSMを載せたコネクタサーバ　← 正解
- D. SaaSの管理画面のサーバ
- 解説：Vaultや管理画面はCyberArkが運用し、顧客はコネクタ（CPM・PSM等）を運用します。

**Q2. コネクタとSaaS間の通信の基本的な考え方は？**
- A. コネクタからSaaSへのアウトバウンド通信　← 正解
- B. SaaSから社内へのインバウンド通信をFWで開放
- C. 専用線が必須
- D. コネクタとSaaSは通信しない
- 解説：コネクタから外向き（アウトバウンド）に接続します。公式要件では TCP 443 と TCP 1858 が必要で、TLS 1.2以上です。宛先FQDN等は公式要件で確認します。

**Q3. Privilege Cloudを採用しても、顧客側に残る仕事は？**
- A. Vaultのハードニング
- B. Vaultのバックアップ
- C. SaaS管理画面のバージョンアップ
- D. Safe設計・権限設計・承認運用　← 正解
- 解説：Safe設計や権限・承認の運用は、提供形態に関係なく顧客の仕事です。

**Q4. 「インターネット接続が一切許可されない閉域網」の要件に向くのは？**
- A. Privilege Cloud
- B. Self-Hosted　← 正解
- C. どちらも利用不可
- D. Secrets Hub
- 解説：SaaSへのアウトバウンド接続ができない場合はSelf-Hostedが候補になります。
