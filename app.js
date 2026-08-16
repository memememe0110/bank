const screens=[...document.querySelectorAll(".screen")];
const nav=[...document.querySelectorAll(".nav-item")];
function show(name){
  screens.forEach(s=>s.classList.toggle("active",s.id===name));
  nav.forEach(b=>b.classList.toggle("active",b.dataset.screen===name));
  window.scrollTo(0,0);
}
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


/* v23: Record預金額はBankingの合計に同期 */
(function(){
  const checking = 0;
  const saving = 24000;
  const total = checking + saving;
  const amount = document.querySelector("#record .record-card-amount");
  if (amount) amount.textContent = "¥" + total.toLocaleString("ja-JP");
})();


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


  render();
  updateSavingBalanceDisplays();
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




/* v58: single transition controller (no competing handlers) */
(function () {
  const MAIN = ["wallet", "banking", "record", "links", "circle"];
  const NAV_MS = 140;
  const PUSH_MS = 260;
  let locked = false;

  const byId = id => document.getElementById(id);

  function resetStyles() {
    document.querySelectorAll(".screen").forEach(s => {
      s.classList.remove(
        "v58-fade-out", "v58-fade-in",
        "v58-detail-overlay", "v58-detail-ready", "v58-detail-leave",
        "v56-account-underlay", "v56-returning", "v56-no-transition",
        "v56-account-detail", "v56-leave-right",
        "saving-underlay", "saving-leave-right",
        "account-underlay", "account-leave-right",
        "v57-nav-out", "v57-nav-in", "v57-detail", "v57-preopen", "v57-leave-right"
      );
      s.style.transform = "";
      s.style.opacity = "";
      s.style.transition = "";
    });
  }

  function setNav(name) {
    document.querySelectorAll(".bottom-nav .nav-item").forEach(item => {
      item.classList.toggle("active", item.dataset.screen === name);
    });
  }

  function currentMain() {
    return MAIN.map(byId).find(el => el?.classList.contains("active"));
  }

  function showMain(name) {
    if (locked || !MAIN.includes(name)) return;
    const target = byId(name);
    if (!target) return;

    // Close detail overlays immediately before changing main tabs.
    ["saving-detail", "account-detail"].forEach(id => {
      const d = byId(id);
      if (d) d.classList.remove("active", "v58-detail-overlay", "v58-detail-ready", "v58-detail-leave");
    });

    const current = currentMain();
    setNav(name);

    if (!current || current === target) {
      MAIN.map(byId).forEach(el => el?.classList.remove("active"));
      target.classList.add("active");
      window.scrollTo(0, 0);
      return;
    }

    locked = true;
    current.classList.add("v58-fade-out");

    setTimeout(() => {
      current.classList.remove("active", "v58-fade-out");
      target.classList.add("active", "v58-fade-in");
      window.scrollTo(0, 0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => target.classList.remove("v58-fade-in"));
      });

      setTimeout(() => { locked = false; }, NAV_MS);
    }, NAV_MS);
  }

  function openDetail(id) {
    if (locked) return;
    const banking = byId("banking");
    const detail = byId(id);
    if (!banking || !detail) return;

    locked = true;

    // Banking stays fully in place behind the detail page.
    banking.classList.add("active");

    detail.classList.remove("v58-detail-leave");
    detail.classList.add("active", "v58-detail-overlay");
    detail.style.transform = "translateX(100%)";

    // Force the starting frame, then slide to zero.
    void detail.offsetWidth;
    requestAnimationFrame(() => {
      detail.classList.add("v58-detail-ready");
      detail.style.transform = "";
    });

    setTimeout(() => { locked = false; }, PUSH_MS);
  }

  function closeDetail(id) {
    if (locked) return;
    const banking = byId("banking");
    const detail = byId(id);
    if (!banking || !detail) return;

    locked = true;
    banking.classList.add("active");
    setNav("banking");

    detail.classList.add("v58-detail-leave");
    detail.classList.remove("v58-detail-ready");

    setTimeout(() => {
      detail.classList.remove("active", "v58-detail-overlay", "v58-detail-leave");
      detail.style.transform = "";
      window.scrollTo(0, 0);
      locked = false;
    }, PUSH_MS);
  }

  // Replace nav items with clones to remove every older direct click handler.
  document.querySelectorAll(".bottom-nav .nav-item").forEach(oldItem => {
    const item = oldItem.cloneNode(true);
    oldItem.replaceWith(item);
    item.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      showMain(item.dataset.screen);
    });
  });

  // Clone clickable detail controls too, removing legacy direct listeners.
  const savingOld = document.querySelector(".saving-card");
  if (savingOld) {
    const saving = savingOld.cloneNode(true);
    savingOld.replaceWith(saving);
    saving.addEventListener("click", e => {
      e.preventDefault();
      openDetail("saving-detail");
    });
  }

  const accountOld = document.querySelector(".account-card");
  if (accountOld) {
    const account = accountOld.cloneNode(true);
    accountOld.replaceWith(account);
    account.addEventListener("click", e => {
      e.preventDefault();
      openDetail("account-detail");
    });
  }

  const savingBackOld = document.getElementById("savingDetailBack");
  if (savingBackOld) {
    const back = savingBackOld.cloneNode(true);
    savingBackOld.replaceWith(back);
    back.addEventListener("click", e => {
      e.preventDefault();
      closeDetail("saving-detail");
    });
  }

  const accountBackOld = document.getElementById("accountDetailBack");
  if (accountBackOld) {
    const back = accountBackOld.cloneNode(true);
    accountBackOld.replaceWith(back);
    back.addEventListener("click", e => {
      e.preventDefault();
      closeDetail("account-detail");
    });
  }

  resetStyles();

  // Restore a valid initial/main state.
  if (!currentMain()) byId("wallet")?.classList.add("active");
  const active = currentMain()?.id || "wallet";
  setNav(active);

  window.addEventListener("pageshow", () => {
    resetStyles();
    if (!currentMain()) byId("wallet")?.classList.add("active");
    setNav(currentMain()?.id || "wallet");
  });
})();
