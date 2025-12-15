// 解答例 2: データ型

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

console.log('value1:', typeof value1); // 'string'
console.log('value2:', typeof value2); // 'number'
console.log('value3:', typeof value3); // 'boolean'
console.log('value4:', typeof value4); // 'object'（JavaScriptのバグ）
console.log('value5:', typeof value5); // 'undefined'
console.log('value6:', typeof value6); // 'object'
console.log('value7:', typeof value7); // 'object'

// 配列の判定は Array.isArray() を使う
console.log('value7 is array:', Array.isArray(value7)); // true



/*
問題2: テンプレートリテラルを使って文字列を作成してください
*/

const userName = '太郎';
const userAge = 25;
const userCity = '東京';

const introduction = `${userName}さんは${userAge}歳で、${userCity}に住んでいます`;

console.log(introduction); // 太郎さんは25歳で、東京に住んでいます



/*
問題3: 配列とオブジェクトを作成してください
*/

// 1. 好きな果物を3つ含む配列 favoriteFruits を作成
const favoriteFruits = ['りんご', 'バナナ', 'いちご'];

// 2. 自分の情報を含むオブジェクト myInfo を作成
const myInfo = {
  name: '太郎',
  age: 25,
  hobby: 'プログラミング',
};

// 3. favoriteFruits の2番目の要素を取得
console.log('2番目の果物:', favoriteFruits[1]); // 'バナナ'

// 4. myInfo の hobby を取得
console.log('趣味:', myInfo.hobby); // 'プログラミング'



/*
問題4: 配列かどうかを判定してください
*/

const data1 = [1, 2, 3];
const data2 = { a: 1, b: 2 };

console.log('data1 is array:', Array.isArray(data1)); // true
console.log('data2 is array:', Array.isArray(data2)); // false

// typeof では配列とオブジェクトを区別できない
console.log('typeof data1:', typeof data1); // 'object'
console.log('typeof data2:', typeof data2); // 'object'



/*
問題5: null と undefined の違いを理解する
*/

let notDefined;
const intentionallyEmpty = null;

console.log('notDefined:', notDefined); // undefined
console.log('intentionallyEmpty:', intentionallyEmpty); // null

/*
解説:
- undefined: 変数が宣言されたが値が代入されていない状態
- null: 意図的に「値が存在しない」ことを示す

使い分け:
- undefined: システムが自動的に設定する
- null: プログラマーが明示的に「空」を示すために使う
*/

// 実例
const user = {
  name: '太郎',
  email: null, // メールアドレスは意図的に空
  // phone プロパティは定義していない
};

console.log(user.email); // null（意図的に空）
console.log(user.phone); // undefined（存在しない）
