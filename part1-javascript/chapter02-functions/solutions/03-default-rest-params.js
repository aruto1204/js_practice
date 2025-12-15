// 解答例 3: デフォルト引数と残余引数

/*
問題1: デフォルト引数を使った関数
*/

function greet(name = 'ゲスト') {
  return `こんにちは、${name}さん`;
}

console.log(greet('太郎')); // 'こんにちは、太郎さん'
console.log(greet()); // 'こんにちは、ゲストさん'



/*
問題2: 複数のデフォルト引数
*/

const createUser = (name = '名無し', age = 0, city = '未設定') => {
  return { name, age, city };
};

console.log(createUser('太郎', 25, '東京'));
console.log(createUser('花子'));
console.log(createUser());



/*
問題3: 残余引数で合計を計算
*/

function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum(10)); // 10



/*
問題4: 通常の引数と残余引数を組み合わせ
*/

function greetAll(greeting, ...names) {
  return `${greeting}、${names.join('と')}さん`;
}

console.log(greetAll('こんにちは', '太郎', '花子', '次郎'));
// 'こんにちは、太郎と花子と次郎さん'



/*
問題5: 最大値を求める
*/

function findMax(...numbers) {
  return Math.max(...numbers);
}

console.log(findMax(1, 5, 3, 9, 2)); // 9
console.log(findMax(10, 20, 15)); // 20



/*
問題6: スプレッド演算子を使う
*/

const numbers = [3, 7, 2, 9, 1];

const max = Math.max(...numbers);
console.log(max); // 9

const min = Math.min(...numbers);
console.log(min); // 1



/*
問題7: 平均値を計算
*/

function average(...numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((total, num) => total + num, 0);
  return sum / numbers.length;
}

console.log(average(10, 20, 30)); // 20
console.log(average(5, 10, 15, 20)); // 12.5



/*
問題8: 配列を結合
*/

function mergeArrays(...arrays) {
  return arrays.flat();
  // または: return [].concat(...arrays);
}

console.log(mergeArrays([1, 2], [3, 4], [5, 6]));
// [1, 2, 3, 4, 5, 6]
