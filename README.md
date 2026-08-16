# Wallet Mock v47

## Saving明細を変更する場所
**`saving-data.js` だけ編集してください。**

各明細はこの4項目です。

- `type`: `"debit"` = 出金 / `"credit"` = 入金
- `date`: 日付
- `amount`: 金額（カンマなしの数字）
- `desc`: 表示する明細名

例:

```js
{
  type: "credit",
  date: "2026.8.16",
  amount: 5000,
  desc: "振替入金｜普通預金（丸善ジュンク堂支店）"
}
```

画面上には編集欄は出ません。
