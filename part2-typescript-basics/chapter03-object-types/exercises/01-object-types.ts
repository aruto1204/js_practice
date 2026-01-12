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
const book: {
  // ここにプロパティを追加
  title: string;
  author: string;
  year: number;
  pages: number;
} = {
  title: 'TypeScrit入門',
  author: '山田太郎',
  year: 2024,
  pages: 350,
};

console.log(book);
// 問題 2: 関数 printBook を実装してください
// 引数として本のオブジェクトを受け取り、情報を表示します
// 型注釈を忘れずに！

// ここにコードを書いてください
function printBook(book: { title: string; author: string; year: number; pages: number }): void {
  console.log(`書籍名: ${book.title}`);
  console.log(`著者: ${book.author}`);
  console.log(`出版年: ${book.year}年`);
  console.log(`ページ数: ${book.pages}ページ`);
  // 実装
}

printBook(book);
// 問題 3: 商品情報を表すオブジェクトを作成してください
// ネストしたオブジェクトを使用します
// - id: number
// - name: string
// - price: number
// - category: object
//   - id: number
//   - name: string

// ここにコードを書いてください
const product: {
  // ここにプロパティを追加
  id: number;
  name: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
} = {
  id: 1,
  name: 'ノートPC',
  price: 80000,
  category: {
    id: 10,
    name: '電子機器',
  },
};

console.log(product);
// 問題 4: 関数 calculateTotalPrice を実装してください
// 商品の配列を受け取り、合計金額を返します
// 商品のオブジェクト型: { name: string; price: number; quantity: number }

// ここにコードを書いてください
function calculateTotalPrice(items: { name: string; price: number; quantity: number }[]): number {
  // 実装
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
console.log(
  calculateTotalPrice([
    { name: 'ノート', price: 100, quantity: 3 },
    { name: 'ペン', price: 150, quantity: 2 },
    { name: '消しゴム', price: 80, quantity: 1 },
  ])
);

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
