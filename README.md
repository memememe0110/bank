# Wallet Mock v59

残高自動計算を修正。

- Saving:
  `balance-data.js` の開始残高 + saving-data.js の入金 - 出金
- 丸善ジュンク堂支店:
  account-data.js の openingBalance + 入金 - 出金
- Record:
  Saving残高 + 丸善ジュンク堂支店残高

さらに、Bankingの丸善ジュンク堂支店カードが更新されなかった
クラス名の不一致も修正。

## 今後触るファイル
- Saving明細 → `saving-data.js`
- Saving開始残高 → `balance-data.js`
- 丸善ジュンク堂支店明細/開始残高 → `account-data.js`

既存の `saving-data.js` と `account-data.js` はこの更新ZIPには入れていません。
