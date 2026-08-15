const screens=[...document.querySelectorAll(".screen")];
const nav=[...document.querySelectorAll(".nav-item")];
function show(name){
  screens.forEach(s=>s.classList.toggle("active",s.id===name));
  nav.forEach(b=>b.classList.toggle("active",b.dataset.screen===name));
  window.scrollTo(0,0);
}
nav.forEach(b=>b.addEventListener("click",()=>show(b.dataset.screen)));
document.addEventListener("gesturestart",e=>e.preventDefault());


/* v13: iOS zoom prevention */
document.addEventListener("gesturestart", function (e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener("gesturechange", function (e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener("gestureend", function (e) {
  e.preventDefault();
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener("touchend", function (e) {
  const now = Date.now();
  if (now - lastTouchEnd <= 350) {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, { passive: false });

document.addEventListener("dblclick", function (e) {
  e.preventDefault();
}, { passive: false });


/* v14: prevent copy/select/context menu */
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener("selectstart", function (e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener("dragstart", function (e) {
  e.preventDefault();
}, { passive: false });


/* v15: トップ画像は起動ごとに2種類から切り替え */
(function () {
  const hero = document.getElementById("walletHero");
  const branch = document.getElementById("walletBranch");
  const article = document.getElementById("walletArticle");
  const action = document.getElementById("walletAction");
  if (!hero) return;

  const variants = [
    {
      image: "assets/wallet-hero-1.jpeg",
      branch: "ハーバーブリッジ支店",
      article: "熊本につなごう Cheer Box/Cheerコード",
      action: "送金・ATM・デビットカード",
      dark: false
    },
    {
      image: "assets/wallet-hero-2.jpeg",
      branch: "丸善ジュンク堂支店",
      article: "Money Talk：ESG投資って？",
      action: "お金のアクションメニュー",
      dark: true
    }
  ];

  const index = Math.floor(Math.random() * variants.length);
  const v = variants[index];

  hero.src = v.image;
  branch.textContent = "丸善ジュンク堂支店";
  article.querySelector("span").textContent = v.article;
  action.querySelector("span").textContent = v.action;
  action.classList.toggle("dark", v.dark);
})();
