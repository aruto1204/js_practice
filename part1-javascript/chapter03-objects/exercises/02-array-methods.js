// 練習問題 2: 配列メソッド
// 難易度: ⭐⭐⭐

/*
問題1: map - 各要素を2倍にする
*/

const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((number) => number * 2);

console.log(doubled); // [2, 4, 6, 8, 10]

/*
問題2: filter - 偶数だけを抽出
*/

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = nums.filter((num) => num % 2 === 0);

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
const user30 = users.find((user) => user.age === 30);

console.log(user30); // { id: 2, name: '花子', age: 30 }

/*
問題4: some - 1つでも条件を満たすか
*/

const scores = [65, 72, 88, 54, 91];

// 90点以上のスコアがあるか
const hasHighScore = scores.some((score) => score >= 90);

console.log(hasHighScore); // true

/*
問題5: every - すべてが条件を満たすか
*/

const ages = [20, 25, 30, 35, 40];

// 全員が18歳以上か
const allAdults = ages.every((age) => age >= 18);

console.log(allAdults); // true

/*
問題6: reduce - 合計を計算
*/

const prices = [100, 200, 300, 400, 500];

// 合計金額を計算
const total = prices.reduce((sum, price) => sum + price, 0);

console.log(total); // 1500

/*
問題7: reduce - 最大値を取得
*/

const values = [3, 7, 2, 9, 1, 5];

// 最大値を取得
const max = values.reduce((max, value) => (value > max ? value : max));

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

const fruitTotal = products
  .filter((product) => product.category === '果物')
  .reduce((sum, product) => sum + product.price, 0);

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
const sortedByAge = people.sort((a, b) => a.age - b.age);

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
const revenues = sales.map((sale) => sale.quantity * sale.price);

console.log(revenues); // [500, 240, 480]

// 総売上を計算
const totalRevenue = revenues.reduce((sum, revenue) => sum + revenue, 0);

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
const averages = students.map((student) => {
  const sum = student.scores.reduce((acc, score) => acc + score, 0);
  const average = sum / student.scores.length;
  return {
    name: student.name,
    average: average,
  };
});

console.log(averages);
// [
//   { name: '太郎', average: 85 },
//   { name: '花子', average: 92.33... },
//   { name: '次郎', average: 75 }
// ]
