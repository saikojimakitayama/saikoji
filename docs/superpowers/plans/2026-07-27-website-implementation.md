# 西光寺ホームページ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 浄土真宗高田派の寺院「西光寺」（三重県鈴鹿市）を紹介する、ビルド不要の単一ページ静的ホームページを作成する。

**Architecture:** `index.html` 1ファイル＋`css/style.css`＋`js/script.js`のみで構成する素の静的サイト。アンカーリンクで1ページ内の各セクション（トップ／寺の紹介／住職紹介／年間行事／お墓・ご供養／アクセス／お問い合わせ）に移動する構成。フレームワーク・ビルドツール・外部JSライブラリは使用しない。

**Tech Stack:** HTML5 / CSS3（Google Fontsのみ外部依存） / Vanilla JavaScript

## Global Constraints

- ビルド不要。npm等のパッケージマネージャは使用しない。
- 対象フォルダはGitリポジトリではないため、`git commit`は行わない（各タスクの最終ステップはファイル保存の確認とする）。
- 由緒・住職プロフィール・行事日程・連絡先の確定していない情報は、仮の文章で作成し、該当箇所に `<!-- ※ここを実際の内容に書き換えてください -->` という日本語コメントを入れる。
- 確定済み情報（宗派: 浄土真宗高田派、住職: 瀬古 和順、所在地: 〒513-0848 三重県鈴鹿市平田本町2丁目7-20）は正確に反映する。
- 提供済みの実写真 `images/shourou-hero.png` をヒーローセクションの背景に使用する。
- レスポンシブ対応必須（スマホ幅で崩れないこと）。
- 配色は深い藍色・墨色ベース＋金・朱の差し色、フォントは明朝体ベース（`docs/superpowers/specs/2026-07-27-website-design.md`のビジュアルデザイン節に準拠）。

---

## Task 1: ベース骨格（ヘッダー／ナビ／ヒーロー／フッター）

**Files:**
- Create: `index.html`
- Create: `css/style.css`
- Create: `js/script.js`

**Interfaces:**
- Produces: HTML内のセクションID規約 `#hero`, `#about`, `#priest`, `#events`, `#memorial`, `#access`, `#contact`（Task2以降がこれらのIDで`<section>`を追加する）。ナビの`<a>`タグは既にこの7つのIDを`href`として参照済み。
- Produces: CSS共通クラス `.section`（横幅制限とpadding）、`.section-alt`（背景色を変えた交互配色）、`.section-title`（見出し共通スタイル）、`.about-text` / `.about-note`（本文段落共通スタイル）、`.info-list` / `.info-row`（ラベル・値の2列レイアウト）。Task2以降はこれらの既存クラスを再利用する。
- Produces: CSS変数 `--color-bg`, `--color-ink`, `--color-indigo`, `--color-indigo-dark`, `--color-gold`, `--color-vermillion`, `--font-serif`, `--header-height`。

- [ ] **Step 1: `index.html` を作成する**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>西光寺（さいこうじ）｜浄土真宗高田派 三重県鈴鹿市</title>
<meta name="description" content="三重県鈴鹿市にある浄土真宗高田派の寺院、西光寺（さいこうじ）の公式サイトです。由緒、住職紹介、年間行事、アクセス情報などをご案内しています。">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;600;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<header class="site-header">
  <div class="header-inner">
    <p class="site-title">西光寺<span class="site-title-kana">さいこうじ</span></p>
    <button class="nav-toggle" id="navToggle" aria-label="メニューを開く" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <nav class="site-nav" id="siteNav">
      <ul>
        <li><a href="#hero" class="nav-link">トップ</a></li>
        <li><a href="#about" class="nav-link">寺の紹介</a></li>
        <li><a href="#priest" class="nav-link">住職紹介</a></li>
        <li><a href="#events" class="nav-link">年間行事</a></li>
        <li><a href="#memorial" class="nav-link">お墓・ご供養</a></li>
        <li><a href="#access" class="nav-link">アクセス</a></li>
        <li><a href="#contact" class="nav-link">お問い合わせ</a></li>
      </ul>
    </nav>
  </div>
</header>

<main>
  <section id="hero" class="hero">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <p class="hero-kana">さいこうじ</p>
      <h1 class="hero-title">西光寺</h1>
      <p class="hero-sub">浄土真宗高田派 ｜ 三重県鈴鹿市</p>
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

- [ ] **Step 2: `css/style.css` を作成する**

```css
:root {
  --color-bg: #f7f3ea;
  --color-ink: #24303d;
  --color-indigo: #1f3a5f;
  --color-indigo-dark: #16283f;
  --color-gold: #b8860b;
  --color-vermillion: #9b2f26;
  --font-serif: "Shippori Mincho", "Hiragino Mincho ProN", "Yu Mincho", serif;
  --header-height: 64px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-serif);
  color: var(--color-ink);
  background-color: var(--color-bg);
  line-height: 1.8;
}

a { color: inherit; text-decoration: none; }
ul { list-style: none; }
img { max-width: 100%; display: block; }

/* Header */
.site-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  background-color: var(--color-indigo);
  color: #f7f3ea;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.5rem;
  height: var(--header-height);
}
.site-title {
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}
.site-title-kana {
  font-size: 0.7rem;
  margin-left: 0.5rem;
  opacity: 0.8;
}
.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 28px; height: 20px;
  background: none; border: none; cursor: pointer;
}
.nav-toggle span {
  display: block;
  height: 2px;
  background-color: #f7f3ea;
}
.site-nav ul {
  display: flex;
  gap: 1.5rem;
}
.nav-link {
  font-size: 0.9rem;
  padding: 0.3rem 0;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;
}
.nav-link:hover, .nav-link:focus {
  border-bottom-color: var(--color-gold);
}

@media (max-width: 768px) {
  .nav-toggle { display: flex; }
  .site-nav {
    position: absolute;
    top: 100%;
    left: 0; right: 0;
    background-color: var(--color-indigo);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }
  .site-nav.is-open { max-height: 500px; }
  .site-nav ul {
    flex-direction: column;
    gap: 0;
    padding: 0.5rem 1.5rem 1rem;
  }
  .site-nav li { border-top: 1px solid rgba(255,255,255,0.15); }
  .nav-link { display: block; padding: 0.8rem 0; }
}

/* Hero */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../images/shourou-hero.png") center center / cover no-repeat;
  text-align: center;
  color: #fdfaf3;
  scroll-margin-top: var(--header-height);
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(22,40,63,0.55), rgba(22,40,63,0.75));
}
.hero-content {
  position: relative;
  z-index: 1;
  padding: 0 1.5rem;
}
.hero-kana {
  letter-spacing: 0.3em;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  opacity: 0.9;
}
.hero-title {
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 800;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}
.hero-sub {
  font-size: 1.1rem;
  letter-spacing: 0.05em;
}

/* Section base (reused by all content sections) */
.section {
  max-width: 900px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  scroll-margin-top: var(--header-height);
}
.section-alt {
  background-color: #efe8d8;
}
.section-title {
  font-size: 1.8rem;
  color: var(--color-indigo);
  text-align: center;
  margin-bottom: 0.5rem;
  letter-spacing: 0.1em;
}
.section-title::after {
  content: "";
  display: block;
  width: 48px;
  height: 3px;
  background-color: var(--color-gold);
  margin: 0.8rem auto 2rem;
}
.about-text {
  max-width: 700px;
  margin: 0 auto 1.2rem;
  text-align: center;
}
.about-note {
  font-size: 0.9rem;
  color: #5a5347;
}
.info-list {
  max-width: 500px;
  margin: 2rem auto 0;
  border-top: 1px solid #c9bfa5;
}
.info-row {
  display: flex;
  gap: 1.5rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid #c9bfa5;
}
.info-row dt {
  flex: 0 0 100px;
  color: var(--color-indigo);
  font-weight: 600;
}

/* Footer */
.site-footer {
  background-color: var(--color-indigo-dark);
  color: #f7f3ea;
  text-align: center;
  padding: 1.5rem;
  font-size: 0.8rem;
}

@media (max-width: 600px) {
  .info-row { flex-direction: column; gap: 0.3rem; }
  .info-row dt { flex: none; }
}
```

- [ ] **Step 3: `js/script.js` を作成する**

```js
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
});
```

- [ ] **Step 4: 構造を検証する**

Run: `grep -c 'id="hero"' index.html && grep -c 'shourou-hero.png' css/style.css && grep -c 'navToggle' js/script.js`
Expected: 3つとも `1` 以上のカウントが返る（各ファイルが期待する要素を含んでいる）。

- [ ] **Step 5: ブラウザで表示確認する**

Run: `explorer.exe index.html`（Windows）でデフォルトブラウザで開く。
Expected: 藍色のヘッダーとナビ、写真を背景にした「西光寺」のヒーローセクション、藍色のフッターが表示される。ウィンドウ幅を768px以下に狭めるとハンバーガーメニューに切り替わり、クリックでナビが開閉する。

- [ ] **Step 6: ファイル保存を確認する（このプロジェクトはGitリポジトリではないためコミットは行わない）**

`index.html` / `css/style.css` / `js/script.js` が保存されていることを確認する。

---

## Task 2: 寺の紹介・由緒／住職紹介セクション

**Files:**
- Modify: `index.html`（`<section id="hero">...</section>` の直後、`</main>` の直前に追加）
- Modify: `css/style.css`（末尾に追加）

**Interfaces:**
- Consumes: Task1の `.section`, `.section-alt`, `.section-title`, `.about-text`, `.about-note`, `.info-list`, `.info-row` クラスとCSS変数。
- Produces: CSSクラス `.priest-card`, `.priest-photo-placeholder`, `.priest-info`, `.priest-name`, `.priest-bio`（Task5のレスポンシブ調整が`.priest-card`を参照する）。

- [ ] **Step 1: `index.html` の `</main>` 直前に2セクションを追加する**

```html
  <section id="about" class="section section-alt">
    <h2 class="section-title">寺の紹介・由緒</h2>
    <p class="about-text">
      西光寺は、三重県鈴鹿市に伽藍を構える浄土真宗高田派の寺院です。地域の皆さまの心のよりどころとして、日々の勤行や年中の法要を通じ、阿弥陀如来のみ教えをお伝えしてまいりました。
    </p>
    <!-- ※ここに実際の由緒・沿革（開山年や歴史的な出来事など）を書き換えてください -->
    <p class="about-text about-note">
      詳しい由緒・沿革につきましては現在準備中です。正式な情報が整い次第、随時こちらのページにて更新してまいります。
    </p>
    <dl class="info-list">
      <div class="info-row">
        <dt>宗派</dt>
        <dd>浄土真宗高田派</dd>
      </div>
      <div class="info-row">
        <dt>所在地</dt>
        <dd>〒513-0848 三重県鈴鹿市平田本町2丁目7-20</dd>
      </div>
    </dl>
  </section>

  <section id="priest" class="section">
    <h2 class="section-title">住職・寺族の紹介</h2>
    <div class="priest-card">
      <div class="priest-photo-placeholder" aria-hidden="true"></div>
      <div class="priest-info">
        <p class="priest-name">住職　瀬古 和順</p>
        <!-- ※ここに実際の住職プロフィール（経歴やメッセージなど）を書き換えてください -->
        <p class="priest-bio">
          日々の法務・法要を務め、地域の皆さまとの触れ合いを大切にしながら、浄土真宗の教えをわかりやすくお伝えできるよう努めております。詳しいプロフィールは準備中です。
        </p>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: `css/style.css` の末尾に追記する**

```css
.priest-card {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}
.priest-photo-placeholder {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #d8cdb0, #b8ab86);
  border: 3px solid var(--color-gold);
  flex-shrink: 0;
}
.priest-info {
  max-width: 480px;
}
.priest-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-indigo);
  margin-bottom: 0.8rem;
}
```

- [ ] **Step 3: 構造を検証する**

Run: `grep -c 'id="about"' index.html && grep -c 'id="priest"' index.html && grep -c '瀬古 和順' index.html && grep -c '浄土真宗高田派' index.html`
Expected: すべて `1` 以上。

- [ ] **Step 4: ブラウザで表示確認する**

Run: `explorer.exe index.html`
Expected: ヒーローの下に「寺の紹介・由緒」（背景色が変わった帯）と「住職・寺族の紹介」（丸いプレースホルダー写真＋プロフィール文）が表示される。ナビの「寺の紹介」「住職紹介」リンクをクリックすると各セクションにスクロールする。

- [ ] **Step 5: ファイル保存を確認する**

`index.html` / `css/style.css` が保存されていることを確認する。

---

## Task 3: 年間行事・法要案内セクション

**Files:**
- Modify: `index.html`（`<section id="priest">...</section>` の直後、`</main>` の直前に追加）
- Modify: `css/style.css`（末尾に追加）

**Interfaces:**
- Consumes: Task1の `.section`, `.section-alt`, `.section-title`, `.about-note` クラス。
- Produces: CSSクラス `.event-list`, `.event-item`, `.event-month`, `.event-name`, `.event-note`（他タスクからの参照なし）。

- [ ] **Step 1: `index.html` に行事セクションを追加する**

```html
  <section id="events" class="section section-alt">
    <h2 class="section-title">年間行事・法要案内</h2>
    <!-- ※日程が確定次第、正式な行事内容・日付に書き換えてください -->
    <ul class="event-list">
      <li class="event-item"><span class="event-month">1月</span><span class="event-name">修正会（しゅしょうえ）</span></li>
      <li class="event-item"><span class="event-month">3月</span><span class="event-name">春季彼岸会（しゅんきひがんえ）</span></li>
      <li class="event-item"><span class="event-month">5月</span><span class="event-name">永代経法要（えいたいきょうほうよう）</span></li>
      <li class="event-item"><span class="event-month">8月</span><span class="event-name">盂蘭盆会（うらぼんえ）</span></li>
      <li class="event-item"><span class="event-month">9月</span><span class="event-name">秋季彼岸会（しゅうきひがんえ）</span></li>
      <li class="event-item"><span class="event-month">11月</span><span class="event-name">報恩講（ほうおんこう）</span></li>
    </ul>
    <p class="about-note event-note">※日程は例年の目安です。詳しい日時は寺院までお問い合わせください。</p>
  </section>
```

- [ ] **Step 2: `css/style.css` の末尾に追記する**

```css
.event-list {
  max-width: 500px;
  margin: 0 auto;
  border-top: 1px solid #c9bfa5;
}
.event-item {
  display: flex;
  gap: 1.5rem;
  padding: 0.9rem 0.5rem;
  border-bottom: 1px solid #c9bfa5;
}
.event-month {
  flex: 0 0 60px;
  color: var(--color-vermillion);
  font-weight: 600;
}
.event-note {
  text-align: center;
  margin-top: 1.5rem;
}
```

- [ ] **Step 3: 構造を検証する**

Run: `grep -c 'id="events"' index.html && grep -c '報恩講' index.html`
Expected: どちらも `1` 以上。

- [ ] **Step 4: ブラウザで表示確認する**

Run: `explorer.exe index.html`
Expected: 「年間行事・法要案内」セクションに6件の行事が月順に一覧表示される。ナビの「年間行事」リンクでスクロールする。

- [ ] **Step 5: ファイル保存を確認する**

`index.html` / `css/style.css` が保存されていることを確認する。

---

## Task 4: お墓・ご供養のご案内／アクセスセクション

**Files:**
- Modify: `index.html`（`<section id="events">...</section>` の直後、`</main>` の直前に追加）
- Modify: `css/style.css`（末尾に追加）

**Interfaces:**
- Consumes: Task1の `.section`, `.section-alt`, `.section-title`, `.about-text`, `.about-note`, `.info-list`, `.info-row` クラス。
- Produces: CSSクラス `.access-content`, `.map-embed`（他タスクからの参照なし）。

- [ ] **Step 1: `index.html` に2セクションを追加する**

```html
  <section id="memorial" class="section">
    <h2 class="section-title">お墓・ご供養のご案内</h2>
    <!-- ※ここに実際のお墓・供養案内の内容を書き換えてください -->
    <p class="about-text">
      西光寺では、境内墓地でのご供養をはじめ、年回法要・月忌参りなど、さまざまな形でのご供養を承っております。お墓の継承や管理についてご不安のある方も、お気軽にご相談ください。
    </p>
    <p class="about-text about-note">詳細につきましては現在準備中です。ご不明な点はお問い合わせよりご連絡ください。</p>
  </section>

  <section id="access" class="section section-alt">
    <h2 class="section-title">アクセス</h2>
    <div class="access-content">
      <dl class="info-list">
        <div class="info-row">
          <dt>住所</dt>
          <dd>〒513-0848<br>三重県鈴鹿市平田本町2丁目7-20</dd>
        </div>
      </dl>
      <div class="map-embed">
        <iframe
          src="https://www.google.com/maps?q=%E4%B8%89%E9%87%8D%E7%9C%8C%E9%88%B4%E9%B9%BF%E5%B8%82%E5%B9%B3%E7%94%B0%E6%9C%AC%E7%94%BA2%E4%B8%81%E7%9B%AE7-20&output=embed"
          width="100%" height="350" style="border:0;" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="西光寺 地図"></iframe>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: `css/style.css` の末尾に追記する**

```css
.access-content {
  max-width: 700px;
  margin: 0 auto;
}
.map-embed {
  margin-top: 2rem;
  border: 3px solid var(--color-indigo);
}
.map-embed iframe {
  display: block;
}
```

- [ ] **Step 3: 構造を検証する**

Run: `grep -c 'id="memorial"' index.html && grep -c 'id="access"' index.html && grep -c 'google.com/maps' index.html`
Expected: すべて `1` 以上。

- [ ] **Step 4: ブラウザで表示確認する**

Run: `explorer.exe index.html`
Expected: 「お墓・ご供養のご案内」の下に「アクセス」セクションが表示され、住所とGoogleマップの埋め込みが表示される（インターネット接続時にマップが描画される）。

- [ ] **Step 5: ファイル保存を確認する**

`index.html` / `css/style.css` が保存されていることを確認する。

---

## Task 5: お問い合わせセクション／レスポンシブ最終調整

**Files:**
- Modify: `index.html`（`<section id="access">...</section>` の直後、`</main>` の直前に追加）
- Modify: `css/style.css`（末尾に追加）

**Interfaces:**
- Consumes: Task1〜4で定義済みの全クラス（`.section`, `.info-list`, `.info-row`, `.priest-card`, `.event-item` 等）。
- Produces: なし（最終タスク）。

- [ ] **Step 1: `index.html` にお問い合わせセクションを追加する**

```html
  <section id="contact" class="section">
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
    </dl>
    <p class="about-note contact-note">お電話・メールでのお問い合わせを承っております。法要のご相談、お墓・ご供養に関するご質問など、お気軽にご連絡ください。</p>
  </section>
```

- [ ] **Step 2: `css/style.css` の末尾に追記する（お問い合わせの微調整＋モバイル最終調整）**

```css
.contact-list {
  margin-bottom: 1.5rem;
}
.contact-note {
  text-align: center;
}

@media (max-width: 600px) {
  .priest-card {
    flex-direction: column;
    text-align: center;
  }
  .event-item {
    padding: 0.9rem 0;
  }
}
```

- [ ] **Step 3: 構造を検証する**

Run: `grep -c 'id="contact"' index.html && grep -oE 'href="#[a-z]+"' index.html | sort -u`
Expected: `id="contact"` が `1` 以上。ナビの`href`一覧が `#hero`, `#about`, `#priest`, `#events`, `#memorial`, `#access`, `#contact` の7件（重複なし）で、すべて `index.html` 内に対応する `id="..."` が存在すること（別途 `grep -oE 'id="[a-z]+"' index.html` で確認）。

- [ ] **Step 4: ブラウザでPC幅・スマホ幅の両方を確認する**

Run: `explorer.exe index.html`
Expected:
- PC幅（1100px以上）: 全7セクションが藍色/金/朱を基調とした和風デザインで表示され、ナビは横並び。
- スマホ幅（375〜600px、ブラウザのデベロッパーツールでエミュレート）: ハンバーガーメニューでナビが開閉し、住職紹介セクションの写真とテキストが縦積みになり、情報一覧（宗派・所在地・電話・メール等）が崩れず読める。
- 全ナビリンクをクリックし、対応するセクションに正しくスクロールすることを確認する。

- [ ] **Step 5: ファイル保存を確認する（このプロジェクトはGitリポジトリではないためコミットは行わない）**

`index.html` / `css/style.css` が保存されていることを確認する。これで西光寺ホームページの実装は完了。
