// 練習問題 3: デフォルト引数と残余引数
// 難易度: ⭐⭐

/*
問題1: デフォルト引数を使った関数を作成してください
*/

// 名前を受け取り、挨拶文を返す関数 greet を作成
// 名前が指定されなかった場合は 'ゲスト' をデフォルト値とする

function greet(/* ここにコードを書く */) {
  return `こんにちは、${name}さん`;
}

console.log(greet('太郎')); // 'こんにちは、太郎さん'
console.log(greet()); // 'こんにちは、ゲストさん'



/*
問題2: 複数のデフォルト引数を使う
*/

// ユーザー情報を作成する関数 createUser を作成
// デフォルト値: name = '名無し', age = 0, city = '未設定'

const createUser = (/* ここにコードを書く */) => {
  return { name, age, city };
};

console.log(createUser('太郎', 25, '東京'));
// { name: '太郎', age: 25, city: '東京' }

console.log(createUser('花子'));
// { name: '花子', age: 0, city: '未設定' }

console.log(createUser());
// { name: '名無し', age: 0, city: '未設定' }



/*
問題3: 残余引数を使って可変長引数を受け取る
*/

// 任意の個数の数値を受け取り、その合計を返す関数 sum を作成

function sum(/* ここにコードを書く */) {
  // ここにコードを書く
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum(10)); // 10



/*
問題4: 通常の引数と残余引数を組み合わせる
*/

// 最初の引数に挨拶を受け取り、残りの引数に名前を受け取る関数 greetAll を作成
// 例: greetAll('こんにちは', '太郎', '花子', '次郎')
//     → 'こんにちは、太郎と花子と次郎さん'

function greetAll(/* ここにコードを書く */) {
  // ここにコードを書く
}

console.log(greetAll('こんにちは', '太郎', '花子', '次郎'));
// 'こんにちは、太郎と花子と次郎さん'



/*
問題5: 配列の最大値を求める
*/

// 任意の個数の数値を受け取り、最大値を返す関数 findMax を作成
// ヒント: Math.max() を使う

function findMax(/* ここにコードを書く */) {
  // ここにコードを書く
}

console.log(findMax(1, 5, 3, 9, 2)); // 9
console.log(findMax(10, 20, 15)); // 20



/*
問題6: スプレッド演算子を使う
*/

const numbers = [3, 7, 2, 9, 1];

// Math.max にスプレッド演算子を使って配列を展開し、最大値を求める
const max = /* ここにコードを書く */;

console.log(max); // 9

// Math.min を使って最小値を求める
const min = /* ここにコードを書く */;

console.log(min); // 1



/*
問題7: 実践問題 - 配列の平均値を計算
*/

// 任意の個数の数値を受け取り、平均値を返す関数 average を作成

function average(/* ここにコードを書く */) {
  // ここにコードを書く
}

console.log(average(10, 20, 30)); // 20
console.log(average(5, 10, 15, 20)); // 12.5



/*
問題8: 実践問題 - 配列を結合する関数
*/

// 複数の配列を受け取り、1つの配列に結合して返す関数 mergeArrays を作成
// ヒント: 残余引数とスプレッド演算子を組み合わせる

function mergeArrays(/* ここにコードを書く */) {
  // ここにコードを書く
}

console.log(mergeArrays([1, 2], [3, 4], [5, 6]));
// [1, 2, 3, 4, 5, 6]
