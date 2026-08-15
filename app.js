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

window.WALLET_EXTRA_HERO = 'assets/wallet-hero-alt-3.jpg';


/* v19: bottom-nav active state sync */
(function () {
  const items = [...document.querySelectorAll(".bottom-nav .nav-item")];

  function setActiveNav(target) {
    items.forEach((item) => {
      item.classList.toggle("active", item.dataset.target === target);
    });
  }

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const target = item.dataset.target;
      setActiveNav(target);
    });
  });

  // 初期表示はWallet
  setActiveNav("wallet");
})();


/* v20: bottom nav - exactly one active item */
(function () {
  const items = Array.from(document.querySelectorAll(".bottom-nav .nav-item"));
  const allScreens = Array.from(document.querySelectorAll(".screen"));

  function activate(screenName) {
    items.forEach(item => {
      item.classList.remove("active");
    });
    allScreens.forEach(screen => {
      screen.classList.remove("active");
    });

    const activeItem = items.find(item => item.dataset.screen === screenName);
    const activeScreen = document.getElementById(screenName);

    if (activeItem) activeItem.classList.add("active");
    if (activeScreen) activeScreen.classList.add("active");

    window.scrollTo(0, 0);
  }

  items.forEach(item => {
    item.onclick = function (event) {
      event.preventDefault();
      event.stopPropagation();
      activate(item.dataset.screen);
    };
  });

  // 最初は必ずWallet
  activate("wallet");
})();


/* v23: Record預金額はBankingの合計に同期 */
(function(){
  const checking = 0;
  const saving = 24000;
  const total = checking + saving;
  const amount = document.querySelector("#record .record-card-amount");
  if (amount) amount.textContent = "¥" + total.toLocaleString("ja-JP");
})();


/* v26: always reset page to top when switching bottom tabs */
document.querySelectorAll(".bottom-nav .nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    requestAnimationFrame(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
  });
});


/* v28: Wallet balance hide/show */
(function(){
  const balance = document.getElementById("walletBalance");
  const button = document.getElementById("balanceToggle");
  const text = document.getElementById("balanceToggleText");
  if (!balance || !button || !text) return;

  let hidden = true;
  const shownValue = "¥0";

  button.addEventListener("click", function(){
    hidden = !hidden;
    if (hidden) {
      balance.textContent = "¥ ********";
      balance.classList.add("is-hidden");
      text.textContent = "残高を表示";
    } else {
      balance.textContent = shownValue;
      balance.classList.remove("is-hidden");
      text.textContent = "残高を隠す";
    }
  });
})();
