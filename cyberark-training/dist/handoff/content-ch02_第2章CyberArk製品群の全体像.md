# 教材パック：第2章 CyberArk製品群の全体像

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


<!-- 元ページ：learn/ch02.html -->

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
