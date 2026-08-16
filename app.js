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
  if (article) article.querySelector("span").textContent = v.article;
  if (action) {
    action.querySelector("span").textContent = v.action;
    action.classList.toggle("dark", v.dark);
  }
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
      balance.textContent = "¥ *******";
      balance.classList.add("is-hidden");
      text.textContent = "残高を表示";
    } else {
      balance.textContent = shownValue;
      balance.classList.remove("is-hidden");
      text.textContent = "残高を隠す";
    }
  });
})();




/* v49: Banking savings / loan tabs */
(function () {
  const savingsTab = document.getElementById("bankSavingsTab");
  const loanTab = document.getElementById("bankLoanTab");
  const loanContent = document.getElementById("bankLoanContent");
  const banking = document.getElementById("banking");

  if (!savingsTab || !loanTab || !loanContent || !banking) return;

  // ローン選択時に消すもの
  const savingsCards = banking.querySelector(".card-row");
  const divider = banking.querySelector(".divider");
  const menuList = banking.querySelector(".menu-list");

  function showSavings() {
    savingsTab.classList.add("active");
    loanTab.classList.remove("active");

    if (savingsCards) savingsCards.style.display = "";
    if (divider) divider.style.display = "";
    if (menuList) menuList.style.display = "";

    loanContent.hidden = true;
  }

  function showLoan() {
    savingsTab.classList.remove("active");
    loanTab.classList.add("active");

    // Saving、ボックス作成、下のメニューを全部消す
    if (savingsCards) savingsCards.style.display = "none";
    if (divider) divider.style.display = "none";
    if (menuList) menuList.style.display = "none";

    loanContent.hidden = false;
  }

  savingsTab.addEventListener("click", function (e) {
    e.preventDefault();
    showSavings();
  });

  loanTab.addEventListener("click", function (e) {
    e.preventDefault();
    showLoan();
  });

  showSavings();
})();


/* v42: Saving detail - data is edited only in app.js, never on screen */
(function () {
  const savingButton = document.getElementById("savingCardButton");
  const backButton = document.getElementById("savingDetailBack");
  const historyEl = document.getElementById("savingHistory");
  const screens = [...document.querySelectorAll(".screen")];

  if (!savingButton || !backButton || !historyEl) return;

  // Saving明細は saving-data.js だけ編集すればOK
  const savingTransactions = Array.isArray(window.SAVING_TRANSACTIONS)
    ? window.SAVING_TRANSACTIONS
    : [];

  function calculateSavingBalance() {
    return savingTransactions.reduce((total, tx) => {
      const amount = Number(tx.amount || 0);
      return tx.type === "credit" ? total + amount : total - amount;
    }, 0);
  }

  function updateSavingBalanceDisplays() {
    const balance = calculateSavingBalance();
    const formatted = "¥" + balance.toLocaleString("ja-JP");

    const detailBalance = document.querySelector(".saving-detail-balance");
    if (detailBalance) detailBalance.textContent = formatted;

    const cardAmount = document.querySelector(".saving-card .saving-balance");
    if (cardAmount) cardAmount.textContent = formatted;

    // Record預金もBanking合計としてSaving残高を反映
    const recordDeposit = document.querySelector("#record .record-card-amount");
    if (recordDeposit) recordDeposit.textContent = formatted;
  }


  const money = n => "¥" + Number(n || 0).toLocaleString("ja-JP");

  function render() {
    historyEl.innerHTML = "";
    updateSavingBalanceDisplays();

    savingTransactions.forEach(tx => {
      const row = document.createElement("div");
      row.className = "saving-tx " + tx.type;

      const icon = document.createElement("div");
      icon.className = "saving-tx-icon";
      icon.textContent = tx.type === "credit" ? "↓" : "↑";

      const main = document.createElement("div");
      main.className = "saving-tx-main";

      const desc = document.createElement("div");
      desc.className = "saving-tx-desc";
      desc.textContent = tx.desc;

      const date = document.createElement("div");
      date.className = "saving-tx-date";
      date.textContent = tx.date;

      main.append(desc, date);

      const amount = document.createElement("div");
      amount.className = "saving-tx-amount";
      amount.textContent = (tx.type === "credit" ? "+ " : "") + money(tx.amount);

      row.append(icon, main, amount);
      historyEl.appendChild(row);
    });
  }

  function showSavingDetail() {
    screens.forEach(s => s.classList.remove("active"));
    document.getElementById("saving-detail")?.classList.add("active");
    window.scrollTo(0, 0);
  }

  function showBanking() {
    screens.forEach(s => s.classList.remove("active"));
    document.getElementById("banking")?.classList.add("active");
    window.scrollTo(0, 0);
  }

  savingButton.addEventListener("click", showSavingDetail);
  backButton.addEventListener("click", showBanking);

  render();
  updateSavingBalanceDisplays();
})();


/* v51: smooth screen transitions */
(function () {
  const TRANSITION_MS = 180;

  window.walletMockShowScreenSmooth = function(target) {
    if (!target) return;

    const current = document.querySelector(".screen.active");
    if (!current || current === target) {
      document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
      target.classList.add("active");
      return;
    }

    current.style.opacity = "0";
    current.style.transform = "translateY(6px)";

    setTimeout(() => {
      current.classList.remove("active");
      current.style.opacity = "";
      current.style.transform = "";

      target.classList.add("active");

      requestAnimationFrame(() => {
        target.style.opacity = "0";
        target.style.transform = "translateY(6px)";
        requestAnimationFrame(() => {
          target.style.opacity = "";
          target.style.transform = "";
        });
      });
    }, TRANSITION_MS);
  };
})();

/* v51: Banking tab transition override */
(function () {
  const savingsTab = document.getElementById("bankSavingsTab");
  const loanTab = document.getElementById("bankLoanTab");
  const loanContent = document.getElementById("bankLoanContent");
  const banking = document.getElementById("banking");

  if (!savingsTab || !loanTab || !loanContent || !banking) return;

  const savingsCards = banking.querySelector(".card-row");
  const divider = banking.querySelector(".divider");
  const menuList = banking.querySelector(".menu-list");
  const fadeTargets = [savingsCards, divider, menuList].filter(Boolean);
  const D = 150;

  function fadeOut(elements, done) {
    elements.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(5px)";
    });
    setTimeout(done, D);
  }

  function fadeIn(elements) {
    elements.forEach(el => {
      el.style.display = "";
      el.style.opacity = "0";
      el.style.transform = "translateY(5px)";
    });
    requestAnimationFrame(() => {
      elements.forEach(el => {
        el.style.opacity = "";
        el.style.transform = "";
      });
    });
  }

  function showSavingsSmooth() {
    if (savingsTab.classList.contains("active")) return;

    loanContent.style.opacity = "0";
    loanContent.style.transform = "translateY(5px)";

    setTimeout(() => {
      loanContent.hidden = true;

      loanTab.classList.remove("active");
      savingsTab.classList.add("active");

      fadeIn(fadeTargets);
    }, D);
  }

  function showLoanSmooth() {
    if (loanTab.classList.contains("active")) return;

    fadeOut(fadeTargets, () => {
      fadeTargets.forEach(el => {
        el.style.display = "none";
        el.style.opacity = "";
        el.style.transform = "";
      });

      savingsTab.classList.remove("active");
      loanTab.classList.add("active");

      loanContent.hidden = false;
      loanContent.style.opacity = "0";
      loanContent.style.transform = "translateY(5px)";

      requestAnimationFrame(() => {
        loanContent.style.opacity = "1";
        loanContent.style.transform = "translateY(0)";
      });
    });
  }

  // Capture phase so this smoother handler wins over older instant handlers.
  savingsTab.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    showSavingsSmooth();
  }, true);

  loanTab.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    showLoanSmooth();
  }, true);
})();


/* v52: Saving detail push / pop transition */
(function () {
  const D = 250;

  function getSavingDetail() {
    return document.getElementById("saving-detail");
  }

  function getBanking() {
    return document.getElementById("banking");
  }

  function openSavingDetail() {
    const detail = getSavingDetail();
    const banking = getBanking();
    if (!detail || !banking) return;

    // Keep Banking behind the detail page while it slides in.
    banking.classList.add("saving-underlay");
    detail.classList.remove("saving-leave-right");
    detail.style.display = "";

    // Do not let generic screen fade animate this transition.
    detail.style.opacity = "1";

    requestAnimationFrame(() => {
      detail.classList.add("active");
    });

    setTimeout(() => {
      banking.classList.remove("active");
      banking.classList.remove("saving-underlay");
    }, D);
  }

  function closeSavingDetail() {
    const detail = getSavingDetail();
    const banking = getBanking();
    if (!detail || !banking) return;

    // Put Banking back underneath before sliding detail away.
    banking.classList.add("active", "saving-underlay");
    detail.classList.add("saving-leave-right");

    setTimeout(() => {
      detail.classList.remove("active", "saving-leave-right");
      detail.style.display = "";
      detail.style.opacity = "";
      banking.classList.remove("saving-underlay");
    }, D);
  }

  document.addEventListener("click", function (e) {
    const savingCard = e.target.closest(".saving-card");
    if (savingCard && getBanking()?.classList.contains("active")) {
      e.preventDefault();
      e.stopImmediatePropagation();
      openSavingDetail();
      return;
    }

    const detail = getSavingDetail();
    if (!detail || !detail.classList.contains("active")) return;

    const back = e.target.closest(".back-btn, .back-button, [data-back], [aria-label='戻る']");
    if (back) {
      e.preventDefault();
      e.stopImmediatePropagation();
      closeSavingDetail();
    }
  }, true);

  // Expose for any existing inline back handler if needed.
  window.walletMockCloseSavingDetail = closeSavingDetail;
})();


/* v56: Maruzen account native-style push / pop */
(function () {
  const D = 280;
  const detail = () => document.getElementById("account-detail");
  const banking = () => document.getElementById("banking");

  function openAccountDetail() {
    const d = detail();
    const b = banking();
    if (!d || !b) return;

    d.classList.add("v56-account-detail");
    d.classList.remove("v56-leave-right");
    d.style.display = "block";
    d.style.opacity = "1";

    b.classList.add("v56-account-underlay");

    d.classList.remove("active");
    void d.offsetWidth;
    requestAnimationFrame(() => d.classList.add("active"));

    setTimeout(() => b.classList.remove("active"), D);
  }

  function closeAccountDetail() {
    const d = detail();
    const b = banking();
    if (!d || !b) return;

    b.classList.add("active", "v56-account-underlay", "v56-no-transition");
    b.classList.remove("v56-returning");
    void b.offsetWidth;
    b.classList.remove("v56-no-transition");

    requestAnimationFrame(() => {
      b.classList.add("v56-returning");
      d.classList.add("v56-leave-right");
      d.classList.remove("active");
    });

    setTimeout(() => {
      d.classList.remove("v56-leave-right", "v56-account-detail");
      d.style.display = "";
      d.style.opacity = "";
      b.classList.remove("v56-account-underlay", "v56-returning");
    }, D);
  }

  document.addEventListener("click", function (e) {
    const card = e.target.closest(".account-card");
    if (card && banking()?.classList.contains("active")) {
      e.preventDefault();
      e.stopImmediatePropagation();
      openAccountDetail();
      return;
    }

    if (!detail()?.classList.contains("v56-account-detail")) return;
    const back = e.target.closest("#accountDetailBack, [aria-label='戻る']");
    if (back) {
      e.preventDefault();
      e.stopImmediatePropagation();
      closeAccountDetail();
    }
  }, true);
})();


/* v55: Maruzen account data / automatic balance */
(function () {
  const account = window.MARUZEN_ACCOUNT || { openingBalance: 0, transactions: [] };
  const transactions = Array.isArray(account.transactions) ? account.transactions : [];
  const openingBalance = Number(account.openingBalance || 0);

  function money(n) {
    return "¥" + Number(n || 0).toLocaleString("ja-JP");
  }

  function calculateMaruzenBalance() {
    return transactions.reduce((total, tx) => {
      const amount = Number(tx.amount || 0);
      return tx.type === "credit" ? total + amount : total - amount;
    }, openingBalance);
  }

  function calculateSavingBalanceForRecord() {
    const saving = Array.isArray(window.SAVING_TRANSACTIONS)
      ? window.SAVING_TRANSACTIONS
      : [];

    return saving.reduce((total, tx) => {
      const amount = Number(tx.amount || 0);
      return tx.type === "credit" ? total + amount : total - amount;
    }, 0);
  }

  function renderMaruzenHistory() {
    const history = document.getElementById("accountHistory");
    if (!history) return;

    history.innerHTML = "";

    transactions.forEach(tx => {
      const row = document.createElement("div");
      row.className = "account-tx " + tx.type;

      const icon = document.createElement("div");
      icon.className = "account-tx-icon";
      icon.textContent = tx.type === "credit" ? "↓" : "↑";

      const main = document.createElement("div");
      main.className = "account-tx-main";

      const desc = document.createElement("div");
      desc.className = "account-tx-desc";
      desc.textContent = tx.desc;

      const date = document.createElement("div");
      date.className = "account-tx-date";
      date.textContent = tx.date;

      main.append(desc, date);

      const amount = document.createElement("div");
      amount.className = "account-tx-amount";
      amount.textContent =
        (tx.type === "credit" ? "+ " : "") + money(tx.amount);

      row.append(icon, main, amount);
      history.appendChild(row);
    });
  }

  function updateMaruzenBalances() {
    const maruzenBalance = calculateMaruzenBalance();
    const formatted = money(maruzenBalance);

    // 丸善口座詳細
    const detailBalance = document.querySelector(".account-detail-balance");
    if (detailBalance) detailBalance.textContent = formatted;

    // Bankingの普通預金カード
    const bankingCardBalance = document.querySelector(".account-card .account-balance");
    if (bankingCardBalance) bankingCardBalance.textContent = formatted;

    // Recordの預金 = Saving + 丸善口座
    const recordTotal = calculateSavingBalanceForRecord() + maruzenBalance;
    const recordAmount = document.querySelector("#record .record-card-amount");
    if (recordAmount) {
      recordAmount.textContent = money(recordTotal);
    }
  }

  renderMaruzenHistory();
  updateMaruzenBalances();

  // 他の処理からも必要なら呼べるように
  window.updateMaruzenAccount = function () {
    renderMaruzenHistory();
    updateMaruzenBalances();
  };
})();
