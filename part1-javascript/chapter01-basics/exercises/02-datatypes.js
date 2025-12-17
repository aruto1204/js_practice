// 練習問題 2: データ型
// 難易度: ⭐⭐

/*
問題1: 以下の値の型を typeof を使って確認してください
*/

const value1 = 'Hello';
const value2 = 42;
const value3 = true;
const value4 = null;
const value5 = undefined;
const value6 = { name: '太郎' };
const value7 = [1, 2, 3];

// ここにコードを書いてください
// 例: console.log(typeof value1);

console.log('typeof value1:', typeof value1);
console.log('typeof value2:', typeof value2);
console.log('typeof value3:', typeof value3);
console.log('typeof value4:', typeof value4);
console.log('typeof value5:', typeof value5);
console.log('typeof value6:', typeof value6);
console.log('typeof value7:', typeof value7);

/*
問題2: テンプレートリテラルを使って文字列を作成してください
*/

const userName = '太郎';
const userAge = 25;
const userCity = '東京';

// テンプレートリテラルを使って「太郎さんは25歳で、東京に住んでいます」という文字列を作成
const introduction = `${userName}さんは${userAge}歳で、${userCity}に住んでいます`;

console.log(introduction);

/*
問題3: 配列とオブジェクトを作成してください
*/

// 1. 好きな果物を3つ含む配列 favoriteFruits を作成

const favoriteFruits = ['りんご', 'バナナ', 'いちご'];

console.log('favoriteFruits:', favoriteFruits);

// 2. 自分の情報を含むオブジェクト myInfo を作成（name, age, hobby の3つのプロパティ）

const myInfo = {
  name: '太郎',
  age: 25,
  hobby: 'プログラミング',
};

console.log('myInfo:', myInfo);

// 3. favoriteFruits の2番目の要素を取得

console.log('2番目の果物:', favoriteFruits[1]);

// 4. myInfo の hobby を取得

console.log('趣味:', myInfo.hobby);

/*
問題4: 配列かどうかを判定してください
*/

const data1 = [1, 2, 3];
const data2 = { a: 1, b: 2 };

// Array.isArray() を使って判定
console.log('data1 is array:', Array.isArray(data1));
console.log('data2 is array:', Array.isArray(data2));

/*
問題5: null と undefined の違いを理解する
*/

let notDefined;
const intentionallyEmpty = null;

console.log('notDefined:', notDefined);
console.log('intentionallyEmpty:', intentionallyEmpty);

// どちらも「値がない」ことを表すが、使い分けを考えてみてください
// null: 意図的に「空」であることを示す
// undefined: 値が未代入、または存在しない
