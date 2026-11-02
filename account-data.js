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
      date: "2026.10.31",
      amount: 2000,
      desc: "ATM出金"
    },
  {
    type: "debit",
    date: "2026.10.27",
    amount: 9000,
    desc: "ことら出金｜オガワ　シオリ"
  },
    {
      type: "debit",
      date: "2026.10.27",
      amount: 40000,
      desc: "ことら出金｜イイジマ　カズコ"
    },
  {
    type: "debit",
    date: "2026.10.27",
    amount: 22000,
    desc: "ことら出金｜イイジマ　メイナ"
  },
  {
    type: "debit",
    date: "2026.10.26",
    amount: 10000,
    desc: "ことら出金｜イイジマ　メイナ"
  },
    {
      type: "credit",
      date: "2026.10.24",
      amount: 21970,
      desc: "ことら入金｜ヤマザキ　ヒナ"
    },
    {
      type: "credit",
      date: "2026.10.23",
      amount: 13628,
      desc: "振込入金｜メルカリ"
    },
    {
      type: "credit",
      date: "2026.10.22",
      amount: 10000,
      desc: "ATM入金"
    },
    {
      type: "credit",
      date: "2026.10.20",
      amount: 17800,
      desc: "ことら入金｜イワマ　ミユ"
    },
    {
      type: "debit",
      date: "2026.10.20",
      amount: 10028,
      desc: "振込出金｜ｶ)ｾﾌﾞﾝCSｶｰﾄﾞｻｰﾋﾞｽ"
    },
    {
      type: "debit",
      date: "2026.10.20",
      amount: 24500,
      desc: "振込出金｜ｶ)ｵﾘｴﾝﾄｺｰﾎﾟﾚｰｼｮﾝ"
    },
    {
      type: "credit",
      date: "2026.10.19",
      amount: 16000,
      desc: "ことら入金｜イイジマ　メイナ"
    },
    {
      type: "debit",
      date: "2026.10.19",
      amount: 20000,
      desc: "ATM出金"
    },
    {
      type: "debit",
      date: "2026.10.16",
      amount: 9559,
      desc: "振込出金｜ﾎﾟｹｯﾄｶｰﾄﾞｶﾌﾞｼｷｶﾞｲｼｬ"
    },
    {
      type: "credit",
      date: "2026.10.16",
      amount: 80000,
      desc: "ことら入金｜イイジマ　メイナ"
    },
    {
      type: "debit",
      date: "2026.9.24",
      amount: 25000,
      desc: "ATM出金"
    },
    {
      type: "credit",
      date: "2026.9.24",
      amount: 19000,
      desc: "ことら入金｜イイジマ　メイナ"
    },
    {
      type: "debit",
      date: "2026.9.17",
      amount: 11175,
      desc: "振込出金｜ｶ)ｾﾌﾞﾝCSｶｰﾄﾞｻｰﾋﾞｽ"
    },
    {
      type: "debit",
      date: "2026.9.16",
      amount: 24000,
      desc: "振込出金｜ｶ)ｵﾘｴﾝﾄｺｰﾎﾟﾚｰｼｮﾝ"
    },
    {
      type: "debit",
      date: "2026.9.16",
      amount: 19000,
      desc: "振込出金｜ｶ)ﾒﾙｶﾘ"
    },
    {
      type: "debit",
      date: "2026.9.16",
      amount: 19193,
      desc: "振込出金｜ﾎﾟｹｯﾄｶｰﾄﾞｶﾌﾞｼｷｶﾞｲｼｬ"
    },
    {
      type: "debit",
      date: "2026.9.16",
      amount: 3829,
      desc: "振込出金｜ﾍﾟｲﾍﾟｲｶｰﾄﾞ (ｶ"
    },
    {
      type: "credit",
      date: "2026.9.16",
      amount: 80000,
      desc: "ことら入金｜イイジマ　メイナ"
    },

    {
      type: "debit",
      date: "2026.9.5",
      amount: 4000,
      desc: "ATM出金"
    },
    {
      type: "credit",
      date: "2026.9.5",
      amount: 7540,
      desc: "振込入金｜ｶ)ﾒﾙｶﾘ"
    },
    {
      type: "debit",
      date: "2026.9.2",
      amount: 9594,
      desc: "振込出金｜ﾎﾟｹｯﾄｶｰﾄﾞｶﾌﾞｼｷｶﾞｲｼｬ"
    },
    {
      type: "debit",
      date: "2026.9.3",
      amount: 24585,
      desc: "振込出金｜ｶ)ｵﾘｴﾝﾄｺｰﾎﾟﾚｰｼｮﾝ"
    },
    {
      type: "credit",
      date: "2026.9.3",
      amount: 36000,
      desc: "振替入金｜Saving"
    },
    {
      type: "debit",
      date: "2026.8.31",
      amount: 3000,
      desc: "ATM出金"
    },
    {
      type: "credit",
      date: "2026.8.31",
      amount: 2000,
      desc: "振替入金｜Saving"
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
      desc: "振替入金｜Saving"
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
