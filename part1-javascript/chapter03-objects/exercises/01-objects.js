// 練習問題 1: オブジェクトの操作
// 難易度: ⭐⭐

/*
問題1: オブジェクトを作成してください
*/

// 以下のプロパティを持つ book オブジェクトを作成
// - title: '吾輩は猫である'
// - author: '夏目漱石'
// - year: 1905

const book = {
  title: '吾輩は猫である',
  author: '夏目漱石',
  year: 1905,
};

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
console.log(user.name);

// ブラケット記法で email を取得
console.log(user['email']);

/*
問題3: プロパティの追加・更新・削除
*/

const product = {
  name: 'ノートパソコン',
  price: 100000,
};

// city プロパティを追加（値: '東京'）
product.city = '東京';

// price を 95000 に更新
product.price = 95000;

// name プロパティを削除
delete product.name;

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
const keys = Object.keys(car);

// すべての値を配列で取得
const values = Object.values(car);

// キーと値のペアを配列で取得
const entries = Object.entries(car);

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
for (const key in scores) {
  console.log(`${key}: ${scores[key]}`);
}

/*
問題6: オブジェクトのコピー
*/

const original = {
  name: '太郎',
  age: 25,
};

// スプレッド演算子を使ってコピー
const copy = { ...original };

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
const settings = { ...defaultSettings, ...userSettings };

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
const names = users.map((user) => user.name);

console.log(names); // ['太郎', '花子', '次郎']
