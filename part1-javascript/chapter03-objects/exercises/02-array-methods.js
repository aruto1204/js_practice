// 練習問題 2: 配列メソッド
// 難易度: ⭐⭐⭐

/*
問題1: map - 各要素を2倍にする
*/

const numbers = [1, 2, 3, 4, 5];

const doubled = /* ここにコードを書く */;

console.log(doubled); // [2, 4, 6, 8, 10]



/*
問題2: filter - 偶数だけを抽出
*/

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = /* ここにコードを書く */;

console.log(evens); // [2, 4, 6, 8, 10]



/*
問題3: find - 条件を満たす最初の要素を取得
*/

const users = [
  { id: 1, name: '太郎', age: 25 },
  { id: 2, name: '花子', age: 30 },
  { id: 3, name: '次郎', age: 22 },
];

// age が 30 のユーザーを見つける
const user30 = /* ここにコードを書く */;

console.log(user30); // { id: 2, name: '花子', age: 30 }



/*
問題4: some - 1つでも条件を満たすか
*/

const scores = [65, 72, 88, 54, 91];

// 90点以上のスコアがあるか
const hasHighScore = /* ここにコードを書く */;

console.log(hasHighScore); // true



/*
問題5: every - すべてが条件を満たすか
*/

const ages = [20, 25, 30, 35, 40];

// 全員が18歳以上か
const allAdults = /* ここにコードを書く */;

console.log(allAdults); // true



/*
問題6: reduce - 合計を計算
*/

const prices = [100, 200, 300, 400, 500];

// 合計金額を計算
const total = /* ここにコードを書く */;

console.log(total); // 1500



/*
問題7: reduce - 最大値を取得
*/

const values = [3, 7, 2, 9, 1, 5];

// 最大値を取得
const max = /* ここにコードを書く */;

console.log(max); // 9



/*
問題8: メソッドチェーン
*/

const products = [
  { name: 'りんご', price: 100, category: '果物' },
  { name: 'バナナ', price: 80, category: '果物' },
  { name: 'にんじん', price: 60, category: '野菜' },
  { name: 'ぶどう', price: 200, category: '果物' },
];

// category が '果物' の商品の価格の合計を計算
// ヒント: filter と reduce を組み合わせる

const fruitTotal = /* ここにコードを書く */;

console.log(fruitTotal); // 380



/*
問題9: sort - 年齢順にソート
*/

const people = [
  { name: '太郎', age: 25 },
  { name: '花子', age: 30 },
  { name: '次郎', age: 22 },
  { name: '美咲', age: 28 },
];

// 年齢の若い順にソート
const sortedByAge = /* ここにコードを書く */;

console.log(sortedByAge);



/*
問題10: 実践問題 - データの集計
*/

const sales = [
  { product: 'りんご', quantity: 5, price: 100 },
  { product: 'バナナ', quantity: 3, price: 80 },
  { product: 'オレンジ', quantity: 4, price: 120 },
];

// 各商品の売上（quantity * price）を計算して配列にする
const revenues = /* ここにコードを書く */;

console.log(revenues); // [500, 240, 480]

// 総売上を計算
const totalRevenue = /* ここにコードを書く */;

console.log(totalRevenue); // 1220



/*
問題11: 実践問題 - データの変換
*/

const students = [
  { name: '太郎', scores: [80, 90, 85] },
  { name: '花子', scores: [90, 95, 92] },
  { name: '次郎', scores: [70, 75, 80] },
];

// 各生徒の平均点を計算して、{ name, average } の形式にする
const averages = /* ここにコードを書く */;

console.log(averages);
// [
//   { name: '太郎', average: 85 },
//   { name: '花子', average: 92.33... },
//   { name: '次郎', average: 75 }
// ]
