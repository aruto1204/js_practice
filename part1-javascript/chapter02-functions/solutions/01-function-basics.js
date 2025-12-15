// 解答例 1: 関数宣言と関数式

/*
問題1: 関数宣言を使って、2つの数値を受け取り、その和を返す関数 add を作成
*/

function add(a, b) {
  return a + b;
}

console.log(add(5, 3)); // 8



/*
問題2: 関数式を使って、2つの数値を受け取り、その差を返す関数 subtract を作成
*/

const subtract = function (a, b) {
  return a - b;
};

console.log(subtract(10, 4)); // 6



/*
問題3: 関数宣言と関数式の巻き上げの違いを確認
*/

console.log(multiply(2, 3)); // 6（関数宣言は巻き上げが起こる）

function multiply(a, b) {
  return a * b;
}

// console.log(divide(10, 2)); // エラー: divide is not defined

const divide = function (a, b) {
  return a / b;
};

console.log(divide(10, 2)); // 5（定義後なら使える）



/*
問題4: 名前を受け取り、挨拶文を返す関数 greet を作成
*/

const greet = function (name) {
  return `こんにちは、${name}さん`;
};

console.log(greet('太郎')); // こんにちは、太郎さん



/*
問題5: 年齢を受け取り、成人判定を行う関数 checkAge を作成
*/

function checkAge(age) {
  if (age >= 20) {
    return '成人';
  } else {
    return '未成年';
  }
}

// または三項演算子で簡潔に
const checkAge2 = (age) => (age >= 20 ? '成人' : '未成年');

console.log(checkAge(25)); // '成人'
console.log(checkAge(18)); // '未成年'
