/**
 * 練習問題 1: オブジェクト型の基本定義
 *
 * このファイルでは、オブジェクト型の基本的な定義方法を練習します。
 */

// 問題 1: 本の情報を表すオブジェクトを作成してください
// - title: string（書籍名）
// - author: string（著者名）
// - year: number（出版年）
// - pages: number（ページ数）

// ここにコードを書いてください
const book = {
  // ここにプロパティを追加
};

// 問題 2: 関数 printBook を実装してください
// 引数として本のオブジェクトを受け取り、情報を表示します
// 型注釈を忘れずに！

// ここにコードを書いてください
function printBook(/* 引数の型を定義 */) {
  // 実装
}

// 問題 3: 商品情報を表すオブジェクトを作成してください
// ネストしたオブジェクトを使用します
// - id: number
// - name: string
// - price: number
// - category: object
//   - id: number
//   - name: string

// ここにコードを書いてください
const product = {
  // ここにプロパティを追加
};

// 問題 4: 関数 calculateTotalPrice を実装してください
// 商品の配列を受け取り、合計金額を返します
// 商品のオブジェクト型: { name: string; price: number; quantity: number }

// ここにコードを書いてください
function calculateTotalPrice(/* 引数の型を定義 */) {
  // 実装
}

// テスト用のコード（実行して確認できます）
// npx ts-node exercises/01-object-types.ts

// 問題 1 のテスト
// printBook(book);

// 問題 4 のテスト
// const items = [
//   { name: 'ノート', price: 100, quantity: 3 },
//   { name: 'ペン', price: 150, quantity: 2 },
//   { name: '消しゴム', price: 80, quantity: 1 },
// ];
// console.log(`合計金額: ${calculateTotalPrice(items)}円`);
