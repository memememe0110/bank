# Wallet Mock v48

## Saving残高は明細から自動計算
` saving-data.js ` の明細だけ編集すればOKです。

計算ルール:
- `type: "credit"` → 入金として加算
- `type: "debit"` → 出金として減算

例:
```js
{ type: "credit", amount: 30000, ... } // +30,000
{ type: "debit",  amount: 6000,  ... } // -6,000
```

この場合、Saving残高は **¥24,000** になります。

自動反映先:
- BankingのSavingカード
- Saving詳細画面の残高
- Recordの預金金額
