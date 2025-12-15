/**
 * 解答例 1: オブジェクト型の基本定義
 */

// 問題 1: 本の情報を表すオブジェクトを作成してください
const book: {
  title: string;
  author: string;
  year: number;
  pages: number;
} = {
  title: 'TypeScript入門',
  author: '山田太郎',
  year: 2024,
  pages: 350,
};

// 問題 2: 関数 printBook を実装してください
function printBook(book: { title: string; author: string; year: number; pages: number }): void {
  console.log(`書籍名: ${book.title}`);
  console.log(`著者: ${book.author}`);
  console.log(`出版年: ${book.year}年`);
  console.log(`ページ数: ${book.pages}ページ`);
}

// 問題 3: 商品情報を表すオブジェクトを作成してください
const product: {
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

// 問題 4: 関数 calculateTotalPrice を実装してください
function calculateTotalPrice(
  items: { name: string; price: number; quantity: number }[]
): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

// テスト用のコード
console.log('=== 問題 1 & 2 のテスト ===');
printBook(book);

console.log('\n=== 問題 3 のテスト ===');
console.log('商品情報:', product);
console.log(`カテゴリ: ${product.category.name}`);

console.log('\n=== 問題 4 のテスト ===');
const items = [
  { name: 'ノート', price: 100, quantity: 3 },
  { name: 'ペン', price: 150, quantity: 2 },
  { name: '消しゴム', price: 80, quantity: 1 },
];
console.log(`合計金額: ${calculateTotalPrice(items)}円`);

/**
 * 実行結果:
 *
 * === 問題 1 & 2 のテスト ===
 * 書籍名: TypeScript入門
 * 著者: 山田太郎
 * 出版年: 2024年
 * ページ数: 350ページ
 *
 * === 問題 3 のテスト ===
 * 商品情報: { id: 1, name: 'ノートPC', price: 80000, category: { id: 10, name: '電子機器' } }
 * カテゴリ: 電子機器
 *
 * === 問題 4 のテスト ===
 * 合計金額: 680円
 */
