const screens = {
  wallet: document.getElementById('screen-wallet'),
  banking: document.getElementById('screen-banking'),
  record: document.getElementById('screen-record'),
  links: document.getElementById('screen-links'),
  circle: document.getElementById('screen-circle'),
};

const navItems = [...document.querySelectorAll('.nav-item')];
let balanceHidden = false;

function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) => {
    el.classList.toggle('active', key === name);
  });

  navItems.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.screen === name);
  });

  window.scrollTo(0, 0);
}

navItems.forEach((btn) => {
  btn.addEventListener('click', () => showScreen(btn.dataset.screen));
});

const walletBalance = document.getElementById('wallet-balance');
const bankingBalance = document.getElementById('banking-balance');
const savingBalance = document.getElementById('saving-balance');
const miniSavingBalance = document.getElementById('mini-saving-balance');
const toggleBalanceButton = document.getElementById('toggle-balance');
const toggleBalanceLabel = document.getElementById('toggle-balance-label');
const eyeSlashPath = document.getElementById('eye-slash-path');

function syncBalances() {
  walletBalance.textContent = balanceHidden ? '••••••' : '¥0';
  bankingBalance.textContent = balanceHidden ? '••••••' : '¥0';
  savingBalance.textContent = balanceHidden ? '••••••' : '¥24,000';
  miniSavingBalance.textContent = balanceHidden ? '••••••' : '¥24,000';
  toggleBalanceLabel.textContent = balanceHidden ? '残高を表示' : '残高を隠す';
  eyeSlashPath.style.display = balanceHidden ? 'none' : 'block';
}

toggleBalanceButton.addEventListener('click', () => {
  balanceHidden = !balanceHidden;
  syncBalances();
});

const toggleAccountsButton = document.getElementById('toggle-accounts');
const toggleAccountsLabel = document.getElementById('toggle-accounts-label');
const toggleAccountsChevron = document.getElementById('toggle-accounts-chevron');
const extraAccounts = document.getElementById('extra-accounts');
let accountsOpen = false;

toggleAccountsButton.addEventListener('click', () => {
  accountsOpen = !accountsOpen;
  extraAccounts.classList.toggle('hidden', !accountsOpen);
  toggleAccountsLabel.textContent = accountsOpen ? '口座を閉じる' : '口座をすべて表示';
  toggleAccountsChevron.textContent = accountsOpen ? '⌃' : '⌄';
});

const actionSheet = document.getElementById('action-sheet');
const sheetBackdrop = document.getElementById('sheet-backdrop');
const openSheetButton = document.getElementById('open-action-sheet');
const closeSheetButton = document.getElementById('close-sheet');

function setSheetOpen(open) {
  actionSheet.classList.toggle('hidden', !open);
  sheetBackdrop.classList.toggle('hidden', !open);
}

openSheetButton.addEventListener('click', () => setSheetOpen(true));
closeSheetButton.addEventListener('click', () => setSheetOpen(false));
sheetBackdrop.addEventListener('click', () => setSheetOpen(false));

document.addEventListener('gesturestart', (e) => e.preventDefault());
document.addEventListener('dblclick', (e) => e.preventDefault(), { passive: false });

syncBalances();
