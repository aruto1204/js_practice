// 練習問題 1: 変数宣言
// 難易度: ⭐

/*
問題1: 以下の変数を適切な宣言方法（const または let）で宣言してください

1. 自分の名前を格納する変数 myName
2. 現在の年齢を格納する変数 currentAge（後で変更される可能性がある）
3. 生年月日を格納する変数 birthYear（変更されない）
4. カウンター用の変数 counter（0から始まり、増減する）
*/

// ここにコードを書いてください

const myName = '太郎';
let currentAge = 25;
const birthYear = 1999;
let counter = 0;

console.log(myName, currentAge, birthYear, counter);
/*
問題2: 以下のコードのエラーを修正してください
*/

let pi = 3.14;
pi = 3.14159; // このコードを修正
console.log(pi);

let message = 'Hello';
const greeting = message;
greeting != 'Hi'; // このコードを修正

/*
問題3: ブロックスコープを理解する
以下のコードの出力結果を予測してから実行してください
*/

{
  const x = 10;
  let y = 20;
  console.log('ブロック内:', x, y);
}

// console.log('ブロック外:', x, y); // コメントを外すとどうなる？

/*
問題4: const で宣言したオブジェクトのプロパティを変更できるか試してください
*/

const person = {
  name: '太郎',
  age: 25,
};

// person のプロパティを変更してみてください
person.name = '花子';
person.age = 30;
console.log(person);

// person = {}; // これは可能？不可能？
