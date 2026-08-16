# Wallet Mock v61

- balance-data.js を完全に廃止
- Saving残高は saving-data.js の明細だけから自動計算
  - credit = 加算
  - debit = 減算
- Recordも同じ計算結果を使用
- account-data.js / saving-data.js は更新ZIPに含めていません
