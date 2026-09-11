
/* v67: Wallet balance uses the Maruzen Junkudo account auto-calculation */
(function () {
  function calcMaruzenBalance() {
    const account = window.MARUZEN_ACCOUNT || {};
    const opening = Number(account.openingBalance || 0);
    const txs = Array.isArray(account.transactions) ? account.transactions : [];

    return txs.reduce((total, tx) => {
      const amount = Number(tx.amount || 0);
      return tx.type === "credit" ? total + amount : total - amount;
    }, opening);
  }

  function formatYen(value) {
    return "¥" + Number(value || 0).toLocaleString("ja-JP");
  }

  function setHidden(hidden) {
    const balance = document.getElementById("walletBalance");
    const text = document.getElementById("balanceToggleText");
    if (!balance || !text) return;

    if (hidden) {
      balance.textContent = "¥ *******";
      balance.classList.add("is-hidden");
      text.textContent = "残高を表示";
    } else {
      balance.textContent = formatYen(calcMaruzenBalance());
      balance.classList.remove("is-hidden");
      text.textContent = "残高を隠す";
    }
  }

  // Default is always hidden.
  setHidden(true);

  const toggle = document.getElementById("balanceToggle");
  if (toggle) {
    // Capture phase blocks the old handler that hard-coded ¥0.
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();

      const balance = document.getElementById("walletBalance");
      const currentlyHidden = !balance || balance.classList.contains("is-hidden");
      setHidden(!currentlyHidden);
    }, true);
  }

  // Keep the displayed value synchronized after returning to the page.
  window.addEventListener("pageshow", function () {
    const balance = document.getElementById("walletBalance");
    if (balance && !balance.classList.contains("is-hidden")) {
      balance.textContent = formatYen(calcMaruzenBalance());
    }
  });
})();
