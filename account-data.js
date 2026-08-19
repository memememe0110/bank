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

  openingBalance: 0,

  transactions: [
    {
      type: "debit",
      date: "2026.8.19",
      amount: 10000,
      desc: "振込出金｜ﾎﾟｹｯﾄｶｰﾄﾞｶﾌﾞｼｷｶﾞｲｼｬ"
    },
    {
      type: "credit",
      date: "2026.8.19",
      amount: 10000,
      desc: "振込入金｜Saving"
    },
    {
      type: "debit",
      date: "2026.8.19",
      amount: 28000,
      desc: "振込出金｜ｶ)ｵﾘｴﾝﾄｺｰﾎﾟﾚｰｼｮﾝ"
    },
    {
      type: "credit",
      date: "2026.8.18",
      amount: 28000,
      desc: "振込入金｜Saving"
    },
    {
      type: "debit",
      date: "2026.8.17",
      amount: 6000,
      desc: "振込出金｜ｶ)ｾﾌﾞﾝCSｶｰﾄﾞｻｰﾋﾞｽ"
    },
    {
      type: "credit",
      date: "2026.8.17",
      amount: 6000,
      desc: "振込入金｜Saving"
    },
  {
    type: "debit",
    date: "2026.8.14",
    amount: 27740,
    desc: "振替出金｜普通預金（丸善ジュンク堂支店）"
  },

  {
    type: "debit",
    date: "2026.8.14",
    amount: 1205,
    desc: "振替出金｜普通預金（丸善ジュンク堂支店）"
  },

  {
    type: "debit",
    date: "2026.8.14",
    amount: 15055,
    desc: "振替出金｜普通預金（丸善ジュンク堂支店）"
  },
    {
      type: "credit",
      date: "2026.8.14",
      amount: 15055,
      desc: "ことら入金｜イイジマ　メイナ"
    },

    {
      type: "credit",
      date: "2026.8.14",
      amount: 50000,
      desc: "ことら入金｜イイジマ　メイナ"
    },

    {
      type: "debit",
      date: "2026.8.14",
      amount: 22260,
      desc: "振込出金｜ｶ)ｾﾌﾞﾝCSｶｰﾄﾞｻｰﾋﾞｽ"
    },

    {
      type: "credit",
      date: "2026.8.13",
      amount: 1205,
      desc: "振込入金｜メルカリ"
    },
  ]
};
