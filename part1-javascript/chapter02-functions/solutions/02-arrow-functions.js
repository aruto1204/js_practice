// 解答例 2: アロー関数

/*
問題1: 従来の関数をアロー関数に書き換え
*/

const doubleArrow = (n) => n * 2;
console.log(doubleArrow(5)); // 10



/*
問題2: 引数が1つのアロー関数（括弧省略）
*/

const square = n => n * n;
console.log(square(4)); // 16



/*
問題3: 引数がないアロー関数
*/

const sayHello = () => 'Hello';
console.log(sayHello()); // 'Hello'



/*
問題4: オブジェクトを返すアロー関数
*/

const createPerson = (name, age) => ({ name, age });
console.log(createPerson('太郎', 25)); // { name: '太郎', age: 25 }



/*
問題5: 複数行の処理を持つアロー関数
*/

const processNumbers = (arr) => {
  const filtered = arr.filter((n) => n > 0);
  const doubled = filtered.map((n) => n * 2);
  return doubled;
};

console.log(processNumbers([1, -2, 3, -4, 5])); // [2, 6, 10]



/*
問題6: 配列メソッドでアロー関数を使う
*/

const numbers = [1, 2, 3, 4, 5];

const tripled = numbers.map((n) => n * 3);
console.log(tripled); // [3, 6, 9, 12, 15]

const greaterThanThree = numbers.filter((n) => n > 3);
console.log(greaterThanThree); // [4, 5]



/*
問題7: this の違い
*/

const user = {
  name: '太郎',
  greetNormal: function () {
    console.log(`こんにちは、${this.name}です`);
  },
  greetArrow: () => {
    console.log(`こんにちは、${this.name}です`);
  },
  greetShort() {
    console.log(`こんにちは、${this.name}です`);
  },
};

user.greetNormal(); // こんにちは、太郎です
user.greetArrow();  // こんにちは、undefinedです
user.greetShort();  // こんにちは、太郎です



/*
問題8: 実践問題 - 配列操作
*/

const products = [
  { name: 'りんご', price: 100 },
  { name: 'バナナ', price: 80 },
  { name: 'オレンジ', price: 120 },
];

const productNames = products.map((product) => product.name);
console.log(productNames); // ['りんご', 'バナナ', 'オレンジ']

const expensiveProducts = products.filter((product) => product.price >= 100);
console.log(expensiveProducts);
// [{ name: 'りんご', price: 100 }, { name: 'オレンジ', price: 120 }]
