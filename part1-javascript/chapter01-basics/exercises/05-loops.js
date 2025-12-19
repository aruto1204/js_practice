// 練習問題 5: ループ
// 難易度: ⭐⭐

/*
問題1: for文を使って1から10までの数字を表示してください
*/

// ここにコードを書いてください
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

/*
問題2: 配列をfor文でループしてください
*/

const fruits = ['りんご', 'バナナ', 'オレンジ', 'ぶどう', 'いちご'];

// for文を使ってすべての果物を表示
// ここにコードを書いてください
for (const fruit of fruits) {
  console.log(fruit);
}

/*
問題3: for...of を使って配列をループしてください
*/

const colors = ['赤', '青', '緑', '黄', '紫'];

// for...of を使ってすべての色を表示
// ここにコードを書いてください
for (const color of colors) {
  console.log(color);
}

/*
問題4: for...in を使ってオブジェクトをループしてください
*/

const person = {
  name: '太郎',
  age: 25,
  city: '東京',
  job: 'エンジニア',
};

// for...in を使ってすべてのプロパティと値を表示
// 例: "name: 太郎"
// ここにコードを書いてください

for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}

/*
問題5: while文を使ってください
*/

// 1から5までの数字を while 文で表示
let count = 1;
// ここにコードを書いてください

while (count <= 5) {
  console.log(count);
  count++;
}
/*
問題6: break を使ってループを途中で抜けてください
*/

// 1から10まで数えるが、5で止める
for (let i = 1; i <= 10; i++) {
  // ここにコードを書いてください
  if (i === 5) {
    break;
  }
  console.log(i);
}

/*
問題7: continue を使って特定の値をスキップしてください
*/

// 1から10まで数えるが、3の倍数はスキップ
for (let i = 1; i <= 10; i++) {
  // ここにコードを書いてください
  if (i % 3 === 0) {
    continue;
  }
  console.log(i);
}

/*
問題8: 実践問題 - 配列の合計を計算
*/

const numbers = [10, 20, 30, 40, 50];

let sum = 0;
// for...of を使って合計を計算
// ここにコードを書いてください
for (const num of numbers) {
  sum += num;
}
console.log('合計:', sum); // 150

/*
問題9: 実践問題 - 偶数のみを抽出
*/

const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = [];

// for...of を使って偶数のみを evenNumbers に追加
// ここにコードを書いてください
for (const num of allNumbers) {
  if (num % 2 === 0) {
    evenNumbers.push(num);
  }
}

console.log('偶数:', evenNumbers); // [2, 4, 6, 8, 10]

/*
問題10: 実践問題 - 九九の表を作成
*/

// 1の段から9の段まで表示
// 例: 1 x 1 = 1
//     1 x 2 = 2
//     ...

// ここにコードを書いてください

for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= 9; j++) {
    console.log(`${i} x ${j} = ${i * j}`);
  }
}

/*
問題11: 実践問題 - 配列から特定の要素を探す
*/

const students = ['太郎', '花子', '次郎', '美咲', '健太'];
const targetStudent = '次郎';

// for文を使って targetStudent のインデックスを見つける
// 見つかったら break でループを抜ける

let foundIndex = -1;
// // ここにコードを書いてください

for (let i = 0; i < students.length; i++) {
  if (students[i] === targetStudent) {
    foundIndex = i;
    break;
  }
}

console.log(`${targetStudent}は${foundIndex}番目にいます`);

/*
問題12: ネストしたループ
*/

// 以下のパターンを表示してください
// *
// **
// ***
// ****
// *****

// ここにコードを書いてください
for (let i = 1; i <= 5; i++) {
  let stars = '';
  for (let j = 1; j <= i; j++) {
    stars += '*';
  }
  console.log(stars);
}

const animals = ['pigs', 'goats', 'sheep'];

// 方法1: push()実行後に配列を代入（最もシンプル）
animals.push('cows');
const count2 = animals;
console.log(count2); // ['pigs', 'goats', 'sheep', 'cows']

// 方法2: スプレッド演算子で新しい配列を作成（元の配列を変更せずに新しい配列を作成）
// const count2 = [...animals, 'cows'];
// console.log(count2); // ['pigs', 'goats', 'sheep', 'cows']

// 方法3: concat()メソッドを使う（元の配列を変更せずに新しい配列を作成）
// const count2 = animals.concat('cows');
// console.log(count2); // ['pigs', 'goats', 'sheep', 'cows']

console.log(animals);

animals.push('chickens', 'cats', 'dogs');
console.log(animals);
// 予想される結果: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]
