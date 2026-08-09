# 永代供養墓ページ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 既にある永代供養墓を檀家以外の方に見つけてもらうため、専用ページ `eitaikuyo.html` を新設し、トップページからの導線と公開向けのメタ情報を整備する。

**Architecture:** 既存の静的サイト（ビルド不要の HTML/CSS/Vanilla JS）に2枚目のページを追加する。新ページは既存の `css/style.css` と `js/script.js` を共用し、ページ固有のスタイルは `css/style.css` の末尾に追記する（既存タスクで確立した追記方式）。ヘッダー・ナビ・フッターの構造は `index.html` と揃え、新ページからトップページ内へのリンクは `index.html#xxx` 形式で書く。

**Tech Stack:** HTML5 / CSS3（Google Fontsのみ外部依存） / Vanilla JavaScript

## Global Constraints

- ビルド不要。npm等のパッケージマネージャは使用しない。
- このフォルダはGitリポジトリ（ブランチ運用中）。各タスクの最終ステップで `git commit` する。
- **費用は以下を正確に記載する。**基本料金にはご遺骨1体を含む。
  - 檀家以外の方: 基本料金 15万円 / 1体追加ごとに +3万円
  - 檀家の方: 基本料金 10万円 / 1体追加ごとに +2万円
  - 年間管理費: 檀家・檀家以外ともに なし
  - 体数別の目安: 檀家以外 1体15万円 / 2体18万円 / 3体21万円、檀家 1体10万円 / 2体12万円 / 3体14万円
- **合祀のため、後からご遺骨を取り出せない旨を必ず明記する。**
- **「回向」「追善供養」など、生者が故人へ功徳を振り向ける意味を含む表現を使わない。** 浄土真宗において回向は阿弥陀仏から衆生へ向かうものであり、追善の意味では用いない。
- 教義の説明は最小限にとどめ、実務的な事実（合祀して埋葬する、希望があれば法要を勤める等）を書く。法要に関する記述には住職確認用の日本語コメントを入れる。
- 永代経法要は自動的に勤めるものではなく、**希望されればお勤めする**という書き方にする。
- 永代供養墓は境内墓地に設置されており、**いつでも自由にお参りできる**（時間制限・事前連絡は不要）。
- 未確定情報（電話番号・メールアドレス・写真）にはプレースホルダーと `<!-- ※〜を書き換えてください -->` 形式の日本語コメントを入れる。
- 既存の共通クラス（`.section`, `.section-inner`, `.section-alt`, `.section-title`, `.about-text`, `.about-note`, `.info-list`, `.info-row`, `.contact-list`, `.contact-note`）を再利用し、**再定義しない。**
- レスポンシブ対応必須（スマホ幅で崩れないこと）。
- 配色・フォントは既存サイトに準拠（CSS変数 `--color-indigo` `--color-gold` `--color-vermillion` `--color-bg` `--font-serif` `--header-height` を使う。生の16進数の多用を避ける）。
- お布施の金額は掲載しない（永代供養墓の費用とは性質が異なる）。

---

## Task 1: 永代供養墓ページの前半（骨格・3つの安心・こんな方へ・費用）

**Files:**
- Create: `eitaikuyo.html`
- Modify: `css/style.css`（末尾に追記）

**Interfaces:**
- Produces: `eitaikuyo.html` の骨格。`<main>` の閉じタグ直前が Task 2 の挿入位置になる。ヘッダー/ナビ/フッター/`<script src="js/script.js">` を含む完成した外枠。
- Produces: CSSクラス `.page-head`, `.page-title`, `.page-lead`, `.assurance-list`, `.assurance-item`, `.assurance-head`, `.assurance-body`, `.need-list`, `.need-item`, `.price-table-wrap`, `.price-table`, `.price-note-inline`。Task 2 と Task 3 はこれらを再利用する（特に `.assurance-list` 一式は Task 3 がトップページで再利用する）。
- Consumes: 既存の `.section`, `.section-inner`, `.section-alt`, `.section-title`, `.about-text`, `.about-note` と CSS変数。

- [ ] **Step 1: `eitaikuyo.html` を作成する**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>永代供養墓のご案内｜真宗高田派 西光寺（三重県鈴鹿市）</title>
<meta name="description" content="三重県鈴鹿市の西光寺（真宗高田派）の永代供養墓のご案内。年間管理費なし、檀家にならなくてもお申し込みいただけます。宗派不問。生前申込・墓じまいからの改葬も承ります。基本料金15万円から。">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;600;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<header class="site-header">
  <div class="header-inner">
    <p class="site-title"><a href="index.html">西光寺<span class="site-title-kana">さいこうじ</span></a></p>
    <button class="nav-toggle" id="navToggle" aria-label="メニューを開く" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <nav class="site-nav" id="siteNav">
      <ul>
        <li><a href="index.html#hero" class="nav-link">トップ</a></li>
        <li><a href="index.html#about" class="nav-link">寺の紹介</a></li>
        <li><a href="index.html#priest" class="nav-link">住職紹介</a></li>
        <li><a href="index.html#events" class="nav-link">年間行事</a></li>
        <li><a href="eitaikuyo.html" class="nav-link">永代供養墓</a></li>
        <li><a href="index.html#access" class="nav-link">アクセス</a></li>
        <li><a href="#contact" class="nav-link">お問い合わせ</a></li>
      </ul>
    </nav>
  </div>
</header>

<main>
  <section class="page-head">
    <div class="section-inner">
      <h1 class="page-title">永代供養墓のご案内</h1>
      <p class="page-lead">お墓を継ぐ方がいなくても、ご安心ください。</p>
    </div>
  </section>

  <section class="section">
    <div class="section-inner">
      <ul class="assurance-list">
        <li class="assurance-item">
          <p class="assurance-head">年間管理費<br>なし</p>
          <p class="assurance-body">毎年の費用は一切かかりません。お申込み時のご負担のみです。</p>
        </li>
        <li class="assurance-item">
          <p class="assurance-head">檀家に<br>ならなくてよい</p>
          <p class="assurance-body">檀家になるかどうかは自由です。ならずにお申し込みいただけます。</p>
        </li>
        <li class="assurance-item">
          <p class="assurance-head">宗派を<br>問いません</p>
          <p class="assurance-body">これまでの宗旨・宗派にかかわらずお受けいたします。</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section section-alt">
    <div class="section-inner">
      <h2 class="section-title">こんな方へ</h2>
      <ul class="need-list">
        <li class="need-item">お墓を継ぐ方がいない</li>
        <li class="need-item">墓じまいを考えている</li>
        <li class="need-item">子や孫に負担をかけたくない</li>
        <li class="need-item">元気なうちに決めておきたい</li>
        <li class="need-item">遠方に住んでいて今のお墓を守れない</li>
      </ul>
    </div>
  </section>

  <section id="price" class="section">
    <div class="section-inner">
      <h2 class="section-title">費用</h2>
      <div class="price-table-wrap">
        <table class="price-table">
          <thead>
            <tr><th>&nbsp;</th><th>檀家以外の方</th><th>檀家の方</th></tr>
          </thead>
          <tbody>
            <tr><th>基本料金<span class="price-note-inline">（ご遺骨1体を含む）</span></th><td>15万円</td><td>10万円</td></tr>
            <tr><th>ご遺骨1体追加ごと</th><td>+3万円</td><td>+2万円</td></tr>
            <tr><th>年間管理費</th><td>なし</td><td>なし</td></tr>
          </tbody>
        </table>
      </div>
      <p class="about-text">ご遺骨の数に応じた費用の目安は次のとおりです。</p>
      <div class="price-table-wrap">
        <table class="price-table">
          <thead>
            <tr><th>ご遺骨の数</th><th>檀家以外の方</th><th>檀家の方</th></tr>
          </thead>
          <tbody>
            <tr><th>1体</th><td>15万円</td><td>10万円</td></tr>
            <tr><th>2体</th><td>18万円</td><td>12万円</td></tr>
            <tr><th>3体</th><td>21万円</td><td>14万円</td></tr>
          </tbody>
        </table>
      </div>
      <p class="about-note">※4体以上の場合も同じ計算でお受けいたします。詳しくはお問い合わせください。</p>
    </div>
  </section>
</main>

<footer class="site-footer">
  <p>&copy; 2026 西光寺 All Rights Reserved.</p>
</footer>

<script src="js/script.js"></script>
</body>
</html>
```

- [ ] **Step 2: `css/style.css` の末尾に追記する**

```css
/* --- 永代供養墓ページ --- */
.page-head {
  background-color: var(--color-indigo);
  color: #f7f3ea;
  padding: calc(var(--header-height) + 3rem) 1.5rem 3rem;
  text-align: center;
}
.page-title {
  font-size: clamp(1.8rem, 5vw, 2.6rem);
  letter-spacing: 0.1em;
  margin-bottom: 0.8rem;
}
.page-lead {
  font-size: 1rem;
  opacity: 0.9;
}

.assurance-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}
.assurance-item {
  flex: 1 1 240px;
  max-width: 280px;
  border: 2px solid var(--color-gold);
  padding: 1.5rem 1.2rem;
  text-align: center;
  background-color: #fffdf8;
}
.assurance-head {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-indigo);
  line-height: 1.5;
  margin-bottom: 0.8rem;
}
.assurance-body {
  font-size: 0.9rem;
}

.need-list {
  max-width: 560px;
  margin: 0 auto;
}
.need-item {
  position: relative;
  padding: 0.7rem 0 0.7rem 2rem;
  border-bottom: 1px solid #c9bfa5;
}
.need-item::before {
  content: "✓";
  position: absolute;
  left: 0.3rem;
  color: var(--color-vermillion);
  font-weight: 600;
}

.price-table-wrap {
  overflow-x: auto;
  max-width: 600px;
  margin: 0 auto 1.5rem;
}
.price-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fffdf8;
}
.price-table th,
.price-table td {
  border: 1px solid #c9bfa5;
  padding: 0.8rem 1rem;
  text-align: center;
}
.price-table thead th {
  background-color: var(--color-indigo);
  color: #f7f3ea;
  font-weight: 600;
}
.price-table tbody th {
  background-color: #efe8d8;
  text-align: left;
  font-weight: 600;
  white-space: nowrap;
}
.price-note-inline {
  display: block;
  font-size: 0.75rem;
  font-weight: 400;
}
```

- [ ] **Step 3: 構造を検証する**

Run:
```bash
grep -c 'class="page-head"' eitaikuyo.html
grep -c '15万円' eitaikuyo.html
grep -c '18万円' eitaikuyo.html
grep -c '21万円' eitaikuyo.html
grep -c '12万円' eitaikuyo.html
grep -c '14万円' eitaikuyo.html
grep -c 'assurance-item' css/style.css
```
Expected: `class="page-head"` が1、金額はいずれも1以上、`assurance-item` が css に1以上。

- [ ] **Step 4: 追善表現が混入していないことを確認する**

Run: `grep -c '回向\|追善' eitaikuyo.html`
Expected: `0`（1件でも出たら Global Constraints 違反なので書き換える）

- [ ] **Step 5: ブラウザで表示確認する**

Run: `explorer.exe eitaikuyo.html`
Expected: 藍色のページ見出し「永代供養墓のご案内」、金枠の3つのカード、チェック付きの「こんな方へ」一覧、2つの費用表が表示される。ウィンドウ幅を375pxまで狭めても表が横スクロールで収まり、カードが縦積みになる。

- [ ] **Step 6: コミットする**

```bash
git add eitaikuyo.html css/style.css
git commit -m "feat: add 永代供養墓 page front half (assurances, needs, pricing)"
```

---

## Task 2: 永代供養墓ページの後半（説明・法要・流れ・FAQ・お問い合わせ）

**Files:**
- Modify: `eitaikuyo.html`（`<section id="price">...</section>` の直後、`</main>` の直前に追加）
- Modify: `css/style.css`（末尾に追記）

**Interfaces:**
- Consumes: Task 1 が作った `eitaikuyo.html` の骨格と `.assurance-*` 系クラス、既存の `.section`, `.section-inner`, `.section-alt`, `.section-title`, `.about-text`, `.about-note`, `.info-list`, `.info-row`, `.contact-list`, `.contact-note`。
- Produces: CSSクラス `.grave-photo-placeholder`, `.notice-box`, `.notice-title`, `.flow-list`, `.flow-item`, `.flow-step`, `.flow-head`, `.flow-body`, `.faq-list`, `.faq-item`, `.faq-q`, `.faq-a`。他タスクからの参照なし。
- Produces: `eitaikuyo.html` に `id="contact"` が存在するようになる（Task 1 のナビが既に `href="#contact"` で参照している）。

- [ ] **Step 1: `eitaikuyo.html` の `</main>` 直前に5セクションを追加する**

```html
  <section class="section section-alt">
    <div class="section-inner">
      <h2 class="section-title">永代供養墓について</h2>
      <p class="about-text">
        西光寺の永代供養墓は、他の方のご遺骨とともに合祀（ごうし）する形式です。境内の墓地に設けておりますので、いつでも自由にお参りいただけます。
      </p>
      <p class="about-text">
        合祀のため区画の空き状況に左右されず、お申し出をお断りすることがありません。
      </p>
      <div class="grave-photo-placeholder" aria-hidden="true">
        <p>写真を準備中です</p>
      </div>
      <!-- ※永代供養墓の写真が用意できたら、上の <div class="grave-photo-placeholder"> ごと
           <img src="images/eitaikuyo.jpg" alt="西光寺の永代供養墓"> に置き換えてください -->
      <div class="notice-box">
        <p class="notice-title">お申込み前にご確認ください</p>
        <p>合祀した後は、ご遺骨を取り出すことができません。将来ほかのお墓へ移す可能性がある場合は、お申込み前にご相談ください。</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-inner">
      <h2 class="section-title">法要について</h2>
      <!-- ※法要に関する記述は教義に関わります。住職にご確認のうえ、必要に応じて書き換えてください -->
      <p class="about-text">
        永代供養墓にご納骨された方の法要をご希望の場合は、お勤めいたします。年回法要、春季・秋季の永代経法要など、ご希望をお聞かせください。
      </p>
      <p class="about-text about-note">
        法要は自動的にお勤めするものではありません。ご希望の際はお問い合わせください。
      </p>
    </div>
  </section>

  <section class="section section-alt">
    <div class="section-inner">
      <h2 class="section-title">お申込みの流れ</h2>
      <ol class="flow-list">
        <li class="flow-item">
          <p class="flow-step">STEP 1</p>
          <p class="flow-head">ご相談・お問い合わせ</p>
          <p class="flow-body">お電話またはメールでご連絡ください。ご不明な点だけのご相談でも構いません。</p>
        </li>
        <li class="flow-item">
          <p class="flow-step">STEP 2</p>
          <p class="flow-head">ご見学・ご説明</p>
          <p class="flow-body">実際の永代供養墓をご覧いただき、費用やお手続きについてご説明いたします。</p>
        </li>
        <li class="flow-item">
          <p class="flow-step">STEP 3</p>
          <p class="flow-head">お申込み</p>
          <p class="flow-body">ご納得いただけましたらお申込みいただきます。ご納骨の日時は相談のうえ決めさせていただきます。</p>
        </li>
        <li class="flow-item">
          <p class="flow-step">STEP 4</p>
          <p class="flow-head">ご納骨</p>
          <p class="flow-body">お決めした日にご納骨いたします。</p>
        </li>
      </ol>
      <div class="notice-box">
        <p class="notice-title">墓じまいからの改葬をお考えの方へ</p>
        <p>現在のお墓からご遺骨を移す場合は、そのお墓がある市区町村が発行する「改葬許可証」が必要になります。お手続きについてもご相談に応じますので、お気軽にお問い合わせください。</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-inner">
      <h2 class="section-title">よくあるご質問</h2>
      <dl class="faq-list">
        <div class="faq-item">
          <dt class="faq-q">檀家にならないといけませんか？</dt>
          <dd class="faq-a">いいえ、檀家にならずにお申し込みいただけます。なお、檀家の方は費用が割安になります。</dd>
        </div>
        <div class="faq-item">
          <dt class="faq-q">宗派は問われますか？</dt>
          <dd class="faq-a">問いません。これまでの宗旨・宗派にかかわらずお受けいたします。</dd>
        </div>
        <div class="faq-item">
          <dt class="faq-q">年間管理費はかかりますか？</dt>
          <dd class="faq-a">かかりません。お申込み時の費用のみで、その後のご負担はございません。</dd>
        </div>
        <div class="faq-item">
          <dt class="faq-q">生前に申し込めますか？</dt>
          <dd class="faq-a">お申し込みいただけます。元気なうちに決めておきたいという方も多くいらっしゃいます。</dd>
        </div>
        <div class="faq-item">
          <dt class="faq-q">今あるお墓を墓じまいして移せますか？</dt>
          <dd class="faq-a">お受けいたします。現在のお墓がある市区町村で「改葬許可証」を取得していただく必要がありますので、お手続きについてもご相談ください。</dd>
        </div>
        <div class="faq-item">
          <dt class="faq-q">後からご遺骨を取り出せますか？</dt>
          <dd class="faq-a">合祀のため、取り出すことはできません。将来お墓を移す可能性がある場合は、お申込み前にご相談ください。</dd>
        </div>
        <div class="faq-item">
          <dt class="faq-q">お参りはいつでもできますか？</dt>
          <dd class="faq-a">境内の墓地に設けておりますので、いつでも自由にお参りいただけます。時間の制限や事前のご連絡は必要ありません。</dd>
        </div>
        <div class="faq-item">
          <dt class="faq-q">法要をお願いできますか？</dt>
          <dd class="faq-a">ご希望に応じてお勤めいたします。お問い合わせの際にお申し付けください。</dd>
        </div>
      </dl>
    </div>
  </section>

  <section id="contact" class="section section-alt">
    <div class="section-inner">
      <h2 class="section-title">お問い合わせ</h2>
      <!-- ※電話番号・メールアドレスは実際の連絡先に書き換えてください -->
      <dl class="info-list contact-list">
        <div class="info-row">
          <dt>電話</dt>
          <dd><a href="tel:0000000000">000-0000-0000</a></dd>
        </div>
        <div class="info-row">
          <dt>メール</dt>
          <dd><a href="mailto:info@example.com">info@example.com</a></dd>
        </div>
        <div class="info-row">
          <dt>所在地</dt>
          <dd>〒513-0848<br>三重県鈴鹿市平田本町2丁目7-20</dd>
        </div>
      </dl>
      <p class="about-note contact-note">永代供養墓についてのご相談・ご見学を承っております。お気軽にご連絡ください。</p>
    </div>
  </section>
```

- [ ] **Step 2: `css/style.css` の末尾に追記する**

```css
.grave-photo-placeholder {
  max-width: 560px;
  margin: 2rem auto 0;
  aspect-ratio: 4 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background: repeating-linear-gradient(45deg, #e6dcc4, #e6dcc4 12px, #ded3c8 12px, #ded3c8 24px);
  border: 1px solid #c9bfa5;
  color: #5a5347;
  font-size: 0.9rem;
}

.notice-box {
  max-width: 700px;
  margin: 2rem auto 0;
  border-left: 4px solid var(--color-vermillion);
  background-color: #fffdf8;
  padding: 1.2rem 1.4rem;
}
.notice-title {
  font-weight: 600;
  color: var(--color-vermillion);
  margin-bottom: 0.4rem;
}

.flow-list {
  max-width: 640px;
  margin: 0 auto;
  list-style: none;
}
.flow-item {
  position: relative;
  border-left: 2px solid var(--color-gold);
  padding: 0 0 2rem 1.8rem;
}
.flow-item:last-child {
  border-left-color: transparent;
  padding-bottom: 0;
}
.flow-item::before {
  content: "";
  position: absolute;
  left: -7px;
  top: 0.5rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--color-gold);
}
.flow-step {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--color-vermillion);
}
.flow-head {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-indigo);
  margin-bottom: 0.3rem;
}
.flow-body {
  font-size: 0.95rem;
}

.faq-list {
  max-width: 700px;
  margin: 0 auto;
}
.faq-item {
  border-bottom: 1px solid #c9bfa5;
  padding: 1.2rem 0;
}
.faq-q {
  position: relative;
  padding-left: 1.8rem;
  font-weight: 600;
  color: var(--color-indigo);
  margin-bottom: 0.5rem;
}
.faq-q::before {
  content: "Q";
  position: absolute;
  left: 0;
  color: var(--color-gold);
  font-size: 1.1rem;
}
.faq-a {
  position: relative;
  padding-left: 1.8rem;
  font-size: 0.95rem;
}
.faq-a::before {
  content: "A";
  position: absolute;
  left: 0;
  color: var(--color-vermillion);
  font-size: 1.1rem;
}
```

- [ ] **Step 3: 必須記載と禁止表現を検証する**

Run:
```bash
grep -c '取り出すことができません' eitaikuyo.html
grep -c '改葬許可証' eitaikuyo.html
grep -c 'id="contact"' eitaikuyo.html
grep -c '回向\|追善' eitaikuyo.html
```
Expected: 合祀の取り出し不可が1以上、改葬許可証が1以上、`id="contact"` が1、**回向・追善は0**。

- [ ] **Step 4: ナビのアンカーが解決することを確認する**

Run: `grep -oE 'href="#[a-z]+"' eitaikuyo.html | sort -u`
Expected: `href="#contact"` のみ。これに対応する `id="contact"` が同ファイル内に存在すること（Step 3 で確認済み）。

- [ ] **Step 5: ブラウザで表示確認する**

Run: `explorer.exe eitaikuyo.html`
Expected: 費用表の下に「永代供養墓について」（写真プレースホルダーと朱色の枠線の注意書き付き）、「法要について」、「お申込みの流れ」（金色の線でつながる4ステップ）、「よくあるご質問」（Q/A記号付き8問）、「お問い合わせ」が表示される。スマホ幅でも崩れない。

- [ ] **Step 6: コミットする**

```bash
git add eitaikuyo.html css/style.css
git commit -m "feat: add 永代供養墓 page back half (details, flow, FAQ, contact)"
```

---

## Task 3: トップページの導線整備（ナビ変更・memorialセクション書き換え）

**Files:**
- Modify: `index.html`（ヘッダーのナビ1行、および `<section id="memorial">` の中身）
- Modify: `css/style.css`（末尾に追記）

**Interfaces:**
- Consumes: Task 1 が定義した `.assurance-list`, `.assurance-item`, `.assurance-head`, `.assurance-body`（トップページで再利用する。再定義しない）。既存の `.section`, `.section-inner`, `.section-title`, `.about-text`, `.about-note`。
- Produces: CSSクラス `.cta-wrap`, `.cta-link`, `.memorial-price`, `.memorial-other`。他タスクからの参照なし。

- [ ] **Step 1: `index.html` のナビの「お墓・ご供養」を「永代供養墓」に差し替える**

`index.html` の次の1行を、

```html
        <li><a href="#memorial" class="nav-link">お墓・ご供養</a></li>
```

次の1行に置き換える。

```html
        <li><a href="eitaikuyo.html" class="nav-link">永代供養墓</a></li>
```

`#memorial` セクション自体は残す（ナビからは外れるが、スクロールで到達し、そこから専用ページへ誘導する）。

- [ ] **Step 2: `index.html` の `<section id="memorial">` の中身を書き換える**

現在の次のブロック全体を、

```html
  <section id="memorial" class="section">
    <div class="section-inner">
    <h2 class="section-title">お墓・ご供養のご案内</h2>
    <!-- ※ここに実際のお墓・供養案内の内容を書き換えてください -->
    <p class="about-text">
      西光寺では、境内墓地でのご供養をはじめ、年回法要・月忌参りなど、さまざまな形でのご供養を承っております。お墓の継承や管理についてご不安のある方も、お気軽にご相談ください。
    </p>
    <p class="about-text about-note">詳細につきましては現在準備中です。ご不明な点はお問い合わせよりご連絡ください。</p>
    </div>
  </section>
```

次のブロックに置き換える。

```html
  <section id="memorial" class="section">
    <div class="section-inner">
    <h2 class="section-title">お墓・ご供養のご案内</h2>
    <p class="about-text">
      西光寺では、境内墓地に永代供養墓を設けております。お墓を継ぐ方がいない、墓じまいを考えている、子や孫に負担をかけたくない——そうしたご相談を承っております。
    </p>
    <ul class="assurance-list">
      <li class="assurance-item">
        <p class="assurance-head">年間管理費<br>なし</p>
        <p class="assurance-body">毎年の費用は一切かかりません。</p>
      </li>
      <li class="assurance-item">
        <p class="assurance-head">檀家に<br>ならなくてよい</p>
        <p class="assurance-body">檀家にならずにお申し込みいただけます。</p>
      </li>
      <li class="assurance-item">
        <p class="assurance-head">宗派を<br>問いません</p>
        <p class="assurance-body">これまでの宗旨・宗派は問いません。</p>
      </li>
    </ul>
    <p class="about-text memorial-price">基本料金 15万円（檀家以外の方・ご遺骨1体を含む）から承っております。</p>
    <p class="cta-wrap"><a href="eitaikuyo.html" class="cta-link">永代供養墓の詳しいご案内</a></p>
    <p class="about-text about-note memorial-other">このほか、年回法要・月忌参りなどのご供養も承っております。お気軽にご相談ください。</p>
    </div>
  </section>
```

- [ ] **Step 3: `css/style.css` の末尾に追記する**

```css
.memorial-price {
  margin-top: 2rem;
  font-size: 1.05rem;
}
.cta-wrap {
  text-align: center;
}
.cta-link {
  display: inline-block;
  padding: 0.9rem 2.2rem;
  background-color: var(--color-vermillion);
  color: #fdfaf3;
  font-size: 1rem;
  letter-spacing: 0.05em;
  transition: background-color 0.2s;
}
.cta-link:hover,
.cta-link:focus {
  background-color: #7d251e;
}
.memorial-other {
  margin-top: 2.5rem;
}
```

- [ ] **Step 4: 双方向リンクとアンカー整合を検証する**

Run:
```bash
grep -c 'eitaikuyo.html' index.html
grep -c '準備中です' index.html
grep -oE 'href="#[a-z]+"' index.html | sort -u
grep -oE 'id="[a-z]+"' index.html | sort -u
```
Expected: `eitaikuyo.html` への参照が2以上（ナビ＋CTAボタン）、`準備中です` が0（memorialの仮文言が消えている）、そして残った `href="#..."` すべてに対応する `id="..."` が存在すること。

- [ ] **Step 5: ブラウザで両ページを開き、相互リンクを確認する**

Run: `explorer.exe index.html`
Expected:
- ナビが「トップ／寺の紹介／住職紹介／年間行事／**永代供養墓**／アクセス／お問い合わせ」の7項目になっている
- ナビの「永代供養墓」をクリックすると `eitaikuyo.html` が開く
- 「お墓・ご供養のご案内」セクションに金枠の3カードと朱色のボタンが表示され、ボタンから `eitaikuyo.html` へ飛べる
- `eitaikuyo.html` のナビから「トップ」「寺の紹介」等をクリックすると `index.html` の該当位置へ戻れる

- [ ] **Step 6: コミットする**

```bash
git add index.html css/style.css
git commit -m "feat: link top page to 永代供養墓 page and rewrite memorial section"
```

---

## Task 4: 公開向けメタ情報（OGP・ファビコン）

**Files:**
- Create: `favicon.svg`
- Modify: `index.html`（`<head>` 内）
- Modify: `eitaikuyo.html`（`<head>` 内）

**Interfaces:**
- Consumes: Task 1 が作った `eitaikuyo.html` の `<head>`、既存の `index.html` の `<head>`。
- Produces: なし（最終の実装タスク）。

- [ ] **Step 1: `favicon.svg` を作成する**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#1f3a5f"/>
  <text x="32" y="45" font-size="40" text-anchor="middle" fill="#b8860b" font-family="serif">西</text>
</svg>
```

- [ ] **Step 2: `index.html` の `<head>` に OGP とファビコンを追加する**

`index.html` の次の行の直後に、

```html
<meta name="description" content="三重県鈴鹿市にある真宗高田派の寺院、西光寺（さいこうじ）の公式サイトです。由緒、住職紹介、年間行事、アクセス情報などをご案内しています。">
```

次のブロックを挿入する。

```html
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<!-- ※公開先のURLが決まったら、下の og:url と og:image の
     https://example.com を実際のドメインに書き換えてください -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="真宗高田派 西光寺">
<meta property="og:title" content="西光寺（さいこうじ）｜真宗高田派 三重県鈴鹿市">
<meta property="og:description" content="三重県鈴鹿市にある真宗高田派の寺院、西光寺（さいこうじ）の公式サイトです。由緒、住職紹介、年間行事、アクセス情報などをご案内しています。">
<meta property="og:url" content="https://example.com/">
<meta property="og:image" content="https://example.com/images/shourou-hero.jpg">
<meta name="twitter:card" content="summary_large_image">
```

- [ ] **Step 3: `eitaikuyo.html` の `<head>` に OGP とファビコンを追加する**

`eitaikuyo.html` の次の行の直後に、

```html
<meta name="description" content="三重県鈴鹿市の西光寺（真宗高田派）の永代供養墓のご案内。年間管理費なし、檀家にならなくてもお申し込みいただけます。宗派不問。生前申込・墓じまいからの改葬も承ります。基本料金15万円から。">
```

次のブロックを挿入する。

```html
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<!-- ※公開先のURLが決まったら、下の og:url と og:image の
     https://example.com を実際のドメインに書き換えてください -->
<meta property="og:type" content="article">
<meta property="og:site_name" content="真宗高田派 西光寺">
<meta property="og:title" content="永代供養墓のご案内｜真宗高田派 西光寺（三重県鈴鹿市）">
<meta property="og:description" content="年間管理費なし、檀家にならなくてもお申し込みいただけます。宗派不問。生前申込・墓じまいからの改葬も承ります。基本料金15万円から。">
<meta property="og:url" content="https://example.com/eitaikuyo.html">
<meta property="og:image" content="https://example.com/images/shourou-hero.jpg">
<meta name="twitter:card" content="summary_large_image">
```

- [ ] **Step 4: メタ情報を検証する**

Run:
```bash
grep -c 'og:title' index.html eitaikuyo.html
grep -c 'favicon.svg' index.html eitaikuyo.html
ls -la favicon.svg
```
Expected: 両ファイルとも `og:title` が1、`favicon.svg` の参照が1、`favicon.svg` が存在する。

- [ ] **Step 5: ブラウザでファビコンを確認する**

Run: `explorer.exe index.html`
Expected: ブラウザのタブに、藍色地に金色の「西」の字のアイコンが表示される。ページの見た目は Task 3 完了時と変わらない。

- [ ] **Step 6: コミットする**

```bash
git add favicon.svg index.html eitaikuyo.html
git commit -m "feat: add OGP tags and favicon for public publishing"
```

---

## Task 5: Googleビジネスプロフィール登録手順書

**Files:**
- Create: `docs/google-business-profile-guide.md`

**Interfaces:**
- Consumes: なし（独立したドキュメント）。
- Produces: なし（最終タスク）。

- [ ] **Step 1: `docs/google-business-profile-guide.md` を作成する**

````markdown
# Googleビジネスプロフィール 登録手順

Googleマップやgoogle検索に「西光寺」の情報を表示させるための無料サービスです。**ホームページより先に効果が出ます。**「鈴鹿市 永代供養」などで探している方の目に触れる入口になります。

所要時間は入力作業が20〜30分、そのあとオーナー確認（郵送の場合は1〜2週間）です。

## 事前に用意するもの

- Googleアカウント（Gmailのアドレス）。寺として使うものを1つ決めてください
- 寺の電話番号
- 寺の住所（〒513-0848 三重県鈴鹿市平田本町2丁目7-20）
- 本堂・山門・境内・永代供養墓などの写真（数枚あると効果が上がります）

## 登録の手順

1. [https://business.google.com/](https://business.google.com/) にアクセスし、用意したGoogleアカウントでログインする
2. 「ビジネスプロフィールを管理」から新規作成に進む
3. **ビジネス名**を入力する
   - 「西光寺」または「真宗高田派 西光寺」
   - 実際に使っている名前を入れる。検索対策のために余計な語を付け足さないこと（Googleの規約違反になります）
4. **カテゴリ**を選ぶ
   - メインカテゴリ: 「仏教寺院」
   - あとから追加カテゴリとして「墓地」を足せます
5. **住所**を入力する
   - 〒513-0848 三重県鈴鹿市平田本町2丁目7-20
   - 地図上のピンの位置がずれていたら、正しい位置にドラッグして直す
6. **電話番号**と**ウェブサイト**を入力する
   - ウェブサイトは、ホームページを公開したあとにURLを入れる。まだなら空欄のままで進めて、後から追加できます
7. **オーナー確認**を行う
   - ハガキ（郵送）、電話、メールのいずれかで確認コードが届く
   - ハガキの場合は1〜2週間かかります。届いたコードを入力すると登録完了です

## 登録後にやること（ここが本番です）

登録しただけでは効果が薄いので、次を必ず設定してください。

### 写真を入れる

最重要です。写真がないプロフィールはほとんど見られません。

- 本堂の外観
- 山門・境内の様子
- **永代供養墓**（これが今回いちばん見せたいものです）
- 駐車場

### ビジネス情報の説明文を書く

750文字まで書けます。次のような内容を入れてください。

> 三重県鈴鹿市にある真宗高田派の寺院です。永代供養墓を設けており、檀家にならなくてもお申し込みいただけます。宗派は問いません。年間管理費はかかりません。墓じまいからの改葬、生前のお申し込みも承っております。お気軽にご相談ください。

### 営業時間を設定する

寺務所に人がいる時間帯を入れてください。24時間対応であればその旨を設定します。

### サービスを追加する

「サービス」の欄に次を登録すると、検索に引っかかりやすくなります。

- 永代供養墓
- 墓じまい・改葬のご相談
- 葬儀
- 年回法要

### 口コミへの対応

口コミが付いたら、短くて構わないので必ず返信してください。返信のあるプロフィールはGoogleに評価されやすく、見る人の印象も良くなります。

## 注意点

- **1つの寺につきプロフィールは1つだけ**です。重複して作るとどちらも表示されなくなることがあります
- 既に「西光寺」のプロフィールが自動生成されている可能性があります。その場合は新規作成ではなく、そのプロフィールの**オーナー権限を申請**する形になります。手順3で名前を入れた時点で候補が出てくるので確認してください
- 情報を偽って登録しないこと。アカウント停止の対象になります
````

- [ ] **Step 2: ドキュメントを検証する**

Run:
```bash
ls -la docs/google-business-profile-guide.md
grep -c '永代供養墓' docs/google-business-profile-guide.md
grep -c '513-0848' docs/google-business-profile-guide.md
```
Expected: ファイルが存在し、`永代供養墓` が3以上、住所が1以上含まれる。

- [ ] **Step 3: コミットする**

```bash
git add docs/google-business-profile-guide.md
git commit -m "docs: add Google Business Profile registration guide"
```

---

## 実装後の確認事項（住職・依頼者にお願いすること）

実装完了後、次の情報をいただき次第、該当箇所を差し替える。

1. **電話番号・メールアドレス** — `index.html` と `eitaikuyo.html` の2箇所（現在は `000-0000-0000` / `info@example.com`）
2. **永代供養墓の写真** — `eitaikuyo.html` の `.grave-photo-placeholder` を `<img>` に差し替え
3. **法要に関する記述** — 教義に関わるため住職の確認が必要（`eitaikuyo.html` に編集用コメントあり）
4. **公開先のドメイン** — 決定後、両ページの `og:url` と `og:image` の `https://example.com` を差し替え
