// 練習問題 2: アロー関数
// 難易度: ⭐⭐

/*
問題1: 以下の関数をアロー関数に書き換えてください
*/

// 従来の関数式
const double = function (n) {
  return n * 2;
};

// アロー関数に書き換え
const doubleArrow = (n) => n * 2;

console.log(doubleArrow(5)); // 10

/*
問題2: 引数が1つのアロー関数を作成してください
*/

// 数値を受け取り、その2乗を返すアロー関数 square を作成
// () を省略してください

const square = (n) => n * n;

console.log(square(4)); // 16

/*
問題3: 引数がないアロー関数を作成してください
*/

// 引数なしで 'Hello' を返すアロー関数 sayHello を作成

const sayHello = () => 'Hello';

console.log(sayHello()); // 'Hello'

/*
問題4: オブジェクトを返すアロー関数を作成してください
*/

// 名前と年齢を受け取り、オブジェクト { name, age } を返すアロー関数 createPerson を作成
// ヒント: () で囲む必要があります

const createPerson = (name, age) => ({ name, age });

console.log(createPerson('太郎', 25)); // { name: '太郎', age: 25 }

/*
問題5: 複数行の処理を持つアロー関数を作成してください
*/

// 配列を受け取り、以下の処理を行うアロー関数 processNumbers を作成
// 1. 正の数だけをフィルター
// 2. 2倍にする
// 3. 結果の配列を返す

const processNumbers = (numbers) => {
  const filtered = numbers.filter((n) => n > 0);
  const doubled = filtered.map((n) => n * 2);
  return doubled;
};

console.log(processNumbers([1, -2, 3, -4, 5])); // [2, 6, 10]

/*
問題6: 配列メソッドでアロー関数を使う
*/

const numbers = [1, 2, 3, 4, 5];

// map を使って各要素を3倍にした新しい配列を作成
const tripled = numbers.map((n) => n * 3);

console.log(tripled); // [3, 6, 9, 12, 15]

// filter を使って3より大きい数だけを抽出
const greaterThanThree = numbers.filter((n) => n > 3);

console.log(greaterThanThree); // [4, 5]

/*
問題7: this の違いを理解する
*/

const user = {
  name: '太郎',

  // 通常の関数
  greetNormal: function () {
    console.log(`こんにちは、${this.name}です`);
  },

  // アロー関数
  greetArrow() {
    console.log(`こんにちは、${this.name}です`);
  },

  // メソッド短縮構文
  greetShort() {
    console.log(`こんにちは、${this.name}です`);
  },
};

user.greetNormal(); // 正しく動作する
user.greetArrow(); // undefined になる
user.greetShort(); // 正しく動作する

// オブジェクトのメソッドとして定義する場合、アロー関数は適していない

/*
問題8: 実践問題 - 配列操作
*/

const products = [
  { name: 'りんご', price: 100 },
  { name: 'バナナ', price: 80 },
  { name: 'オレンジ', price: 120 },
];

// map を使って商品名だけの配列を作成
const productNames = products.map((product) => product.name);

console.log(productNames); // ['りんご', 'バナナ', 'オレンジ']

// filter を使って価格が100以上の商品だけを抽出
const expensiveProducts = products.filter((product) => product.price >= 100);

console.log(expensiveProducts);
// [{ name: 'りんご', price: 100 }, { name: 'オレンジ', price: 120 }]
