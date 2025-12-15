// 解答例 4: コールバック関数

/*
問題1: シンプルなコールバック関数
*/

function execute(callback) {
  console.log('処理開始');
  callback();
  console.log('処理終了');
}

execute(() => {
  console.log('コールバック実行中');
});



/*
問題2: forEachを使う
*/

const fruits = ['りんご', 'バナナ', 'オレンジ'];

fruits.forEach((fruit) => {
  console.log(`好き: ${fruit}`);
});



/*
問題3: mapで配列を変換
*/

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]



/*
問題4: filterでフィルタリング
*/

const ages = [15, 22, 18, 30, 12, 25];
const adults = ages.filter((age) => age >= 20);
console.log(adults); // [22, 30, 25]



/*
問題5: findで要素を検索
*/

const users = [
  { name: '太郎', age: 25 },
  { name: '花子', age: 30 },
  { name: '次郎', age: 22 },
];

const user30 = users.find((user) => user.age === 30);
console.log(user30); // { name: '花子', age: 30 }



/*
問題6: カスタムコールバック関数
*/

function transform(arr, callback) {
  const result = [];
  for (const item of arr) {
    result.push(callback(item));
  }
  return result;
}

const nums = [1, 2, 3, 4, 5];

const squared = transform(nums, (n) => n * n);
console.log(squared); // [1, 4, 9, 16, 25]

const strings = transform(nums, (n) => `数字: ${n}`);
console.log(strings);



/*
問題7: フィルタリング関数
*/

function filterArray(arr, callback) {
  const result = [];
  for (const item of arr) {
    if (callback(item)) {
      result.push(item);
    }
  }
  return result;
}

const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = filterArray(numbers2, (n) => n % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

const greaterThanFive = filterArray(numbers2, (n) => n > 5);
console.log(greaterThanFive); // [6, 7, 8, 9, 10]



/*
問題8: reduceで合計を計算
*/

const prices = [100, 200, 300, 400, 500];
const total = prices.reduce((sum, price) => sum + price, 0);
console.log(total); // 1500



/*
問題9: 配列操作の組み合わせ
*/

const products = [
  { name: 'りんご', price: 100, inStock: true },
  { name: 'バナナ', price: 80, inStock: false },
  { name: 'オレンジ', price: 120, inStock: true },
  { name: 'ぶどう', price: 200, inStock: true },
];

const totalInStock = products
  .filter((product) => product.inStock)
  .reduce((sum, product) => sum + product.price, 0);

console.log(totalInStock); // 420



/*
問題10: ソート
*/

const students = [
  { name: '太郎', score: 85 },
  { name: '花子', score: 92 },
  { name: '次郎', score: 78 },
  { name: '美咲', score: 95 },
];

const sortedStudents = [...students].sort((a, b) => b.score - a.score);

console.log(sortedStudents);
// [{ name: '美咲', score: 95 }, { name: '花子', score: 92 }, ...]
