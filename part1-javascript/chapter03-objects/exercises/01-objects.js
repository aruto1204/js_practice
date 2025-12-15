// 練習問題 1: オブジェクトの操作
// 難易度: ⭐⭐

/*
問題1: オブジェクトを作成してください
*/

// 以下のプロパティを持つ book オブジェクトを作成
// - title: '吾輩は猫である'
// - author: '夏目漱石'
// - year: 1905

const book = /* ここにコードを書く */;

console.log(book);



/*
問題2: プロパティへのアクセス
*/

const user = {
  name: '太郎',
  age: 25,
  email: 'taro@example.com',
};

// ドット記法で name を取得


// ブラケット記法で email を取得




/*
問題3: プロパティの追加・更新・削除
*/

const product = {
  name: 'ノートパソコン',
  price: 100000,
};

// city プロパティを追加（値: '東京'）


// price を 95000 に更新


// name プロパティを削除


console.log(product);



/*
問題4: オブジェクトのキーと値を取得
*/

const car = {
  brand: 'Toyota',
  model: 'Prius',
  year: 2023,
};

// すべてのキーを配列で取得
const keys = /* ここにコードを書く */;

// すべての値を配列で取得
const values = /* ここにコードを書く */;

// キーと値のペアを配列で取得
const entries = /* ここにコードを書く */;

console.log(keys);
console.log(values);
console.log(entries);



/*
問題5: オブジェクトのループ
*/

const scores = {
  math: 90,
  english: 85,
  science: 92,
};

// for...in を使って、すべてのキーと値を表示
// 例: "math: 90"

// ここにコードを書いてください




/*
問題6: オブジェクトのコピー
*/

const original = {
  name: '太郎',
  age: 25,
};

// スプレッド演算子を使ってコピー
const copy = /* ここにコードを書く */;

// コピーの age を 26 に変更
copy.age = 26;

console.log('original:', original.age); // 25
console.log('copy:', copy.age); // 26



/*
問題7: オブジェクトのマージ
*/

const defaultSettings = {
  theme: 'light',
  fontSize: 14,
  language: 'ja',
};

const userSettings = {
  fontSize: 16,
  language: 'en',
};

// スプレッド演算子を使ってマージ（userSettings を優先）
const settings = /* ここにコードを書く */;

console.log(settings);
// { theme: 'light', fontSize: 16, language: 'en' }



/*
問題8: 実践問題 - ユーザー情報の管理
*/

const users = [
  { id: 1, name: '太郎', age: 25, city: '東京' },
  { id: 2, name: '花子', age: 30, city: '大阪' },
  { id: 3, name: '次郎', age: 22, city: '東京' },
];

// Object.keys() を使って、最初のユーザーのプロパティ名を取得


// Object.values() を使って、最初のユーザーのすべての値を取得


// すべてのユーザーの名前だけを配列にする（ヒント: map を使う）
const names = /* ここにコードを書く */;

console.log(names); // ['太郎', '花子', '次郎']
