// 解答例 1: 変数宣言

/*
問題1: 以下の変数を適切な宣言方法（const または let）で宣言してください
*/

const myName = '太郎'; // 名前は変わらないので const
let currentAge = 25; // 年齢は変わる可能性があるので let
const birthYear = 1999; // 生年月日は変わらないので const
let counter = 0; // カウンターは増減するので let

console.log('名前:', myName);
console.log('年齢:', currentAge);
console.log('生年:', birthYear);
console.log('カウンター:', counter);



/*
問題2: 以下のコードのエラーを修正してください
*/

// 修正前: const pi = 3.14; pi = 3.14159;
// 修正後: const を let に変更するか、最初から正確な値を代入
const pi = 3.14159; // または let pi = 3.14; pi = 3.14159;
console.log('円周率:', pi);

// 修正前: let message = 'Hello'; const greeting = message; greeting = 'Hi';
// 修正後: greeting を let に変更
let message = 'Hello';
let greeting = message; // const を let に変更
greeting = 'Hi';
console.log('挨拶:', greeting);



/*
問題3: ブロックスコープを理解する
*/

{
  const x = 10;
  let y = 20;
  console.log('ブロック内:', x, y); // 10 20
}

// console.log('ブロック外:', x, y);
// エラー: x と y はブロックスコープなので、ブロック外からアクセスできない



/*
問題4: const で宣言したオブジェクトのプロパティを変更できるか試してください
*/

const person = {
  name: '太郎',
  age: 25,
};

// プロパティの変更は可能
person.name = '花子';
person.age = 30;
console.log('変更後:', person); // { name: '花子', age: 30 }

// person = {}; // エラー: オブジェクト自体の再代入は不可能

/*
解説:
- const は「再代入を禁止」する
- オブジェクトのプロパティの変更は「再代入」ではないので可能
- オブジェクト自体を別のオブジェクトに置き換えるのは「再代入」なので不可能
*/
