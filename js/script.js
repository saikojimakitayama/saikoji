// お問い合わせフォームは Googleフォームを枠(iframe)の中に読み込んでいます。
// 送信すると枠の中だけが「回答を記録しました」という短い画面に変わりますが、
// 枠の高さは決め打ちのままなので、下に大きな空白が残ってしまいます。
// 枠の中身は別サイト(Google)のため高さを読み取れませんが、
// 「枠の中でページが切り替わった＝2回目の読み込みが起きた」ことは分かります。
// それを合図に枠ごと隠して、こちらで用意したお礼の文に差し替えています。
//
// 読み込みの回数は、HTML側の <iframe> に直接書いた onload で数えています。
// このファイルで監視を始めると、1回目の読み込みに間に合わないことがあり、
// 2回目を1回目と数えてしまって永久に切り替わらないためです。
window.saikojiShowFormDone = function () {
  if ((window.saikojiFormLoads || 0) < 2) return; // 1回目は最初の表示なので何もしない
  const formArea = document.getElementById("formArea");
  const formDone = document.getElementById("formDone");
  if (!formArea || !formDone || formArea.hidden) return;
  formArea.hidden = true;
  formDone.hidden = false;
  formDone.scrollIntoView({ block: "center" });
};

// このファイルが実行される前に2回とも読み込みが終わっていた場合にも対応します。
window.saikojiShowFormDone();

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

  // 読み込みが済んでいる場合に備えて、ここでも一度確認します。
  window.saikojiShowFormDone();
});
