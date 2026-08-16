/*
=========================================================
丸善ジュンク堂支店 明細データ
=========================================================

今後はこのファイルだけ編集すればOKです。

openingBalance:
  この履歴より前からあった残高。
  表示残高は
  openingBalance + 入金(credit) - 出金(debit)
  で自動計算します。

type:
  "credit" = 入金
  "debit"  = 出金

不要な明細は1ブロック丸ごと削除、
追加は同じ形でコピーしてください。
=========================================================
*/

window.MARUZEN_ACCOUNT = {

  openingBalance: 44000,

  transactions: [

    {
      type: "debit",
      date: "2026.8.15",
      amount: 20000,
      desc: "振替出金｜普通預金（ハーバーブリッジ支店）"
    },

    {
      type: "credit",
      date: "2026.8.15",
      amount: 12000,
      desc: "振替入金｜Saving"
    },

    {
      type: "credit",
      date: "2026.8.15",
      amount: 8000,
      desc: "振替入金｜Saving"
    },

    {
      type: "debit",
      date: "2026.8.15",
      amount: 27740,
      desc: "振替出金｜Saving"
    },

    {
      type: "debit",
      date: "2026.8.15",
      amount: 1205,
      desc: "振替出金｜Saving"
    },

    {
      type: "debit",
      date: "2026.8.15",
      amount: 15055,
      desc: "振替出金｜Saving"
    }

  ]
};
