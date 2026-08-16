
(function () {
  const D = 260;

  function moneyText(raw) {
    const n = String(raw || "").match(/[\d,]+/);
    return n ? "¥" + n[0] : "¥0";
  }

  function cleanDesc(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function accountNameFromDesc(desc) {
    const m = desc.match(/[（(]([^）)]+)[）)]/);
    if (m) return "普通預金（" + m[1] + "）";

    const parts = desc.split("｜");
    if (parts[1]) return parts[1].trim();
    return "普通預金（丸善ジュンク堂支店）";
  }

  function getContextName(row) {
    if (row.classList.contains("saving-tx")) return "Saving";
    return "普通預金（丸善ジュンク堂支店）";
  }

  function getOtherName(desc, contextName) {
    if (/Saving/.test(desc) && contextName !== "Saving") return "Saving";
    return accountNameFromDesc(desc);
  }

  function makeDetail() {
    let el = document.getElementById("transaction-detail-v64");
    if (el) return el;

    el = document.createElement("section");
    el.id = "transaction-detail-v64";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `
      <div class="tx64-top">
        <button class="tx64-back" type="button" aria-label="戻る">←</button>
        <button class="tx64-star" type="button" aria-label="お気に入り">☆</button>
      </div>

      <div class="tx64-main">
        <div class="tx64-direction-icon">↑</div>

        <h1 class="tx64-title"></h1>
        <div class="tx64-amount"></div>

        <div class="tx64-info">
          <div class="tx64-row">
            <span>振替金額</span>
            <strong class="tx64-transfer-amount"></strong>
          </div>

          <div class="tx64-divider"></div>

          <div class="tx64-label">振替元 / 振替先</div>
          <div class="tx64-route">
            <span class="tx64-route-from"></span>
            <span class="tx64-route-arrow">→</span>
            <span class="tx64-route-to"></span>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(el);

    el.querySelector(".tx64-back").addEventListener("click", function () {
      closeDetail();
    });

    // Visual-only favorite button.
    const star = el.querySelector(".tx64-star");
    star.addEventListener("click", function () {
      star.textContent = star.textContent === "☆" ? "★" : "☆";
    });

    return el;
  }

  function openDetail(row) {
    const el = makeDetail();

    const descEl = row.querySelector(".saving-tx-desc, .account-tx-desc");
    const amountEl = row.querySelector(".saving-tx-amount, .account-tx-amount");
    const desc = cleanDesc(descEl?.textContent);
    const amount = moneyText(amountEl?.textContent);

    const isCredit = row.classList.contains("credit");
    const context = getContextName(row);
    const other = getOtherName(desc, context);

    // 出金なら現在口座 → 相手、入金なら相手 → 現在口座
    const from = isCredit ? other : context;
    const to   = isCredit ? context : other;

    el.querySelector(".tx64-direction-icon").textContent = isCredit ? "↓" : "↑";
    el.querySelector(".tx64-title").textContent = desc || (isCredit ? "振替入金" : "振替出金");
    el.querySelector(".tx64-amount").textContent =
      (isCredit ? "+ " : "- ") + amount;
    el.querySelector(".tx64-transfer-amount").textContent = amount;
    el.querySelector(".tx64-route-from").textContent = from;
    el.querySelector(".tx64-route-to").textContent = to;

    el.classList.remove("closing");
    el.setAttribute("aria-hidden", "false");
    void el.offsetWidth;
    requestAnimationFrame(() => el.classList.add("open"));
  }

  function closeDetail() {
    const el = document.getElementById("transaction-detail-v64");
    if (!el || !el.classList.contains("open")) return;

    el.classList.add("closing");
    el.classList.remove("open");

    setTimeout(() => {
      el.classList.remove("closing");
      el.setAttribute("aria-hidden", "true");
    }, D);
  }

  document.addEventListener("click", function (e) {
    const row = e.target.closest(".saving-tx, .account-tx");
    if (!row) return;

    e.preventDefault();
    e.stopPropagation();
    openDetail(row);
  }, true);

  // If bottom nav is used while transaction detail is open,
  // close it instantly without exposing an intermediate Banking screen.
  document.addEventListener("click", function (e) {
    const nav = e.target.closest(".bottom-nav .nav-item");
    if (!nav) return;

    const el = document.getElementById("transaction-detail-v64");
    if (!el) return;

    el.classList.remove("open", "closing");
    el.setAttribute("aria-hidden", "true");
  }, true);
})();
