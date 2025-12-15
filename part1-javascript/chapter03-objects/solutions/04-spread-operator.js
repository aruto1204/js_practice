// 解答例 4: スプレッド演算子

/*
問題1: 配列のコピー
*/

const original = [1, 2, 3, 4, 5];
const copy = [...original];

copy.push(6);

console.log(original); // [1, 2, 3, 4, 5]
console.log(copy); // [1, 2, 3, 4, 5, 6]



/*
問題2: 配列の結合
*/

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];

console.log(combined); // [1, 2, 3, 4, 5, 6]



/*
問題3: 配列に要素を追加
*/

const numbers = [2, 3, 4];
const extended = [1, ...numbers, 5];

console.log(extended); // [1, 2, 3, 4, 5]



/*
問題4: オブジェクトのコピー
*/

const user = {
  name: '太郎',
  age: 25,
};

const userCopy = { ...user };
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

const extendedProduct = {
  ...product,
  inStock: true,
};

console.log(extendedProduct);



/*
問題6: オブジェクトのプロパティを更新
*/

const settings = {
  theme: 'light',
  fontSize: 14,
  language: 'ja',
};

const updatedSettings = {
  ...settings,
  theme: 'dark',
};

console.log(updatedSettings);



/*
問題7: 複数のオブジェクトをマージ
*/

const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const obj3 = { c: 5, d: 6 };

const merged = { ...obj1, ...obj2, ...obj3 };

console.log(merged); // { a: 1, b: 3, c: 5, d: 6 }



/*
問題8: 関数の引数として展開
*/

const nums = [1, 5, 3, 9, 2, 7];

const max = Math.max(...nums);
console.log(max); // 9

const min = Math.min(...nums);
console.log(min); // 1



/*
問題9: 実践問題 - 配列の複製と変更
*/

const fruits = ['りんご', 'バナナ', 'オレンジ'];
const moreFruits = [...fruits, 'ぶどう'];

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

const updatedUser = {
  ...currentUser,
  age: 25,
  settings: {
    ...currentUser.settings,
    theme: 'dark',
  },
};

console.log(updatedUser);



/*
問題11: 実践問題 - 配列から重複を削除
*/

const duplicates = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const unique = [...new Set(duplicates)];

console.log(unique); // [1, 2, 3, 4, 5]
