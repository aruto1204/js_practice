// 練習問題 4: スプレッド演算子
// 難易度: ⭐⭐

/*
問題1: 配列のコピー
*/

const original = [1, 2, 3, 4, 5];

// スプレッド演算子を使ってコピー
const copy = /* ここにコードを書く */;

copy.push(6);

console.log(original); // [1, 2, 3, 4, 5]
console.log(copy); // [1, 2, 3, 4, 5, 6]



/*
問題2: 配列の結合
*/

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// スプレッド演算子を使って結合
const combined = /* ここにコードを書く */;

console.log(combined); // [1, 2, 3, 4, 5, 6]



/*
問題3: 配列に要素を追加
*/

const numbers = [2, 3, 4];

// 最初に 1、最後に 5 を追加した新しい配列を作成
const extended = /* ここにコードを書く */;

console.log(extended); // [1, 2, 3, 4, 5]



/*
問題4: オブジェクトのコピー
*/

const user = {
  name: '太郎',
  age: 25,
};

// スプレッド演算子を使ってコピー
const userCopy = /* ここにコードを書く */;

userCopy.age = 26;

console.log(user.age); // 25
console.log(userCopy.age); // 26



/*
問題5: オブジェクトへプロパティを追加
*/

const product = {
  name: 'ノートパソコン',
  price: 100000,
};

// email プロパティを追加した新しいオブジェクトを作成
const extendedProduct = /* ここにコードを書く */;

console.log(extendedProduct);
// { name: 'ノートパソコン', price: 100000, inStock: true }



/*
問題6: オブジェクトのプロパティを更新
*/

const settings = {
  theme: 'light',
  fontSize: 14,
  language: 'ja',
};

// theme を 'dark' に変更した新しいオブジェクトを作成
const updatedSettings = /* ここにコードを書く */;

console.log(updatedSettings);
// { theme: 'dark', fontSize: 14, language: 'ja' }



/*
問題7: 複数のオブジェクトをマージ
*/

const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const obj3 = { c: 5, d: 6 };

// スプレッド演算子を使ってマージ（後のオブジェクトが優先）
const merged = /* ここにコードを書く */;

console.log(merged); // { a: 1, b: 3, c: 5, d: 6 }



/*
問題8: 関数の引数として展開
*/

const nums = [1, 5, 3, 9, 2, 7];

// Math.max にスプレッド演算子を使って配列を渡す
const max = /* ここにコードを書く */;

console.log(max); // 9

// Math.min で最小値を求める
const min = /* ここにコードを書く */;

console.log(min); // 1



/*
問題9: 実践問題 - 配列の複製と変更
*/

const fruits = ['りんご', 'バナナ', 'オレンジ'];

// スプレッド演算子を使ってコピーし、末尾に 'ぶどう' を追加
const moreFruits = /* ここにコードを書く */;

console.log(fruits); // ['りんご', 'バナナ', 'オレンジ']
console.log(moreFruits); // ['りんご', 'バナナ', 'オレンジ', 'ぶどう']



/*
問題10: 実践問題 - ユーザー情報の更新
*/

const currentUser = {
  id: 1,
  name: '太郎',
  email: 'taro@example.com',
  settings: {
    theme: 'light',
    notifications: true,
  },
};

// age: 25 を追加し、settings.theme を 'dark' に変更した新しいオブジェクトを作成
// ヒント: ネストしたオブジェクトも個別にスプレッド

const updatedUser = /* ここにコードを書く */;

console.log(updatedUser);
// {
//   id: 1,
//   name: '太郎',
//   email: 'taro@example.com',
//   age: 25,
//   settings: {
//     theme: 'dark',
//     notifications: true,
//   },
// }



/*
問題11: 実践問題 - 配列から重複を削除
*/

const duplicates = [1, 2, 2, 3, 3, 3, 4, 5, 5];

// Set とスプレッド演算子を使って重複を削除
// ヒント: new Set(array) で重複削除、[...set] で配列に戻す
const unique = /* ここにコードを書く */;

console.log(unique); // [1, 2, 3, 4, 5]
