# Wallet Mock v55

## 丸善ジュンク堂支店の明細
今後は **`account-data.js` だけ**編集すればOKです。

- `type: "credit"` → 入金
- `type: "debit"` → 出金
- `date` → 日付
- `amount` → 金額
- `desc` → 明細名
- `openingBalance` → 表示している履歴より前からあった残高

残高は自動で、

`openingBalance + 入金 - 出金`

として計算します。

自動反映:
- Bankingの丸善ジュンク堂支店カード
- 丸善ジュンク堂支店の詳細画面
- Recordの預金合計（Saving + 丸善ジュンク堂支店）

` saving-data.js ` は変更していません。
