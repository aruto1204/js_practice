// 解答例 5: ループ

/*
問題1: for文を使って1から10までの数字を表示してください
*/

for (let i = 1; i <= 10; i++) {
  console.log(i);
}



/*
問題2: 配列をfor文でループしてください
*/

const fruits = ['りんご', 'バナナ', 'オレンジ', 'ぶどう', 'いちご'];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}



/*
問題3: for...of を使って配列をループしてください
*/

const colors = ['赤', '青', '緑', '黄', '紫'];

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

for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}



/*
問題5: while文を使ってください
*/

let count = 1;
while (count <= 5) {
  console.log(count);
  count++;
}



/*
問題6: break を使ってループを途中で抜けてください
*/

for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    break; // 5で止める
  }
  console.log(i);
}
// 出力: 1, 2, 3, 4



/*
問題7: continue を使って特定の値をスキップしてください
*/

for (let i = 1; i <= 10; i++) {
  if (i % 3 === 0) {
    continue; // 3の倍数はスキップ
  }
  console.log(i);
}
// 出力: 1, 2, 4, 5, 7, 8, 10



/*
問題8: 実践問題 - 配列の合計を計算
*/

const numbers = [10, 20, 30, 40, 50];

let sum = 0;
for (const num of numbers) {
  sum += num;
}

console.log('合計:', sum); // 150



/*
問題9: 実践問題 - 偶数のみを抽出
*/

const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = [];

for (const num of allNumbers) {
  if (num % 2 === 0) {
    evenNumbers.push(num);
  }
}

console.log('偶数:', evenNumbers); // [2, 4, 6, 8, 10]



/*
問題10: 実践問題 - 九九の表を作成
*/

for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= 9; j++) {
    console.log(`${i} x ${j} = ${i * j}`);
  }
}

// または、見やすく表示
console.log('\n九九の表:');
for (let i = 1; i <= 9; i++) {
  let row = '';
  for (let j = 1; j <= 9; j++) {
    row += `${i * j}`.padStart(3, ' ') + ' ';
  }
  console.log(row);
}



/*
問題11: 実践問題 - 配列から特定の要素を探す
*/

const students = ['太郎', '花子', '次郎', '美咲', '健太'];
const targetStudent = '次郎';

let foundIndex = -1;
for (let i = 0; i < students.length; i++) {
  if (students[i] === targetStudent) {
    foundIndex = i;
    break; // 見つかったらループを抜ける
  }
}

console.log(`${targetStudent}は${foundIndex}番目にいます`); // 次郎は2番目にいます

// より良い方法: Array.indexOf() を使う
const index = students.indexOf(targetStudent);
console.log(`indexOf使用: ${index}`); // 2



/*
問題12: ネストしたループ
*/

// 方法1: ネストしたループ
for (let i = 1; i <= 5; i++) {
  let stars = '';
  for (let j = 1; j <= i; j++) {
    stars += '*';
  }
  console.log(stars);
}

console.log('---');

// 方法2: repeat() メソッド使用（より簡潔）
for (let i = 1; i <= 5; i++) {
  console.log('*'.repeat(i));
}

/*
出力:
*
**
***
****
*****
*/



/*
追加例: 様々なパターン
*/

// 逆三角形
console.log('\n逆三角形:');
for (let i = 5; i >= 1; i--) {
  console.log('*'.repeat(i));
}

// ピラミッド
console.log('\nピラミッド:');
for (let i = 1; i <= 5; i++) {
  const spaces = ' '.repeat(5 - i);
  const stars = '*'.repeat(2 * i - 1);
  console.log(spaces + stars);
}

// 数字の三角形
console.log('\n数字の三角形:');
for (let i = 1; i <= 5; i++) {
  let row = '';
  for (let j = 1; j <= i; j++) {
    row += j + ' ';
  }
  console.log(row);
}
