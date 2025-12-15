// 練習問題 3: 分割代入（デストラクチャリング）
// 難易度: ⭐⭐

/*
問題1: 配列の分割代入
*/

const colors = ['赤', '青', '緑', '黄'];

// 分割代入を使って、最初の3つの色を変数に代入
const [/* ここにコードを書く */] = colors;

console.log(first); // '赤'
console.log(second); // '青'
console.log(third); // '緑'



/*
問題2: 配列の一部をスキップ
*/

const numbers = [1, 2, 3, 4, 5];

// 分割代入を使って、1番目と3番目だけを取得
const [/* ここにコードを書く */] = numbers;

console.log(num1); // 1
console.log(num3); // 3



/*
問題3: オブジェクトの分割代入
*/

const user = {
  name: '太郎',
  age: 25,
  email: 'taro@example.com',
};

// 分割代入を使って name と age を変数に代入
const { /* ここにコードを書く */ } = user;

console.log(name); // '太郎'
console.log(age); // 25



/*
問題4: オブジェクトの分割代入（変数名を変更）
*/

const product = {
  id: 1,
  name: 'ノートパソコン',
  price: 100000,
};

// name を productName、price を productPrice という変数名で取得
const { /* ここにコードを書く */ } = product;

console.log(productName); // 'ノートパソコン'
console.log(productPrice); // 100000



/*
問題5: デフォルト値
*/

const settings = {
  theme: 'dark',
  fontSize: 14,
};

// theme, fontSize, language（デフォルト値: 'ja'）を取得
const { /* ここにコードを書く */ } = settings;

console.log(theme); // 'dark'
console.log(fontSize); // 14
console.log(language); // 'ja'



/*
問題6: ネストしたオブジェクトの分割代入
*/

const person = {
  name: '太郎',
  address: {
    city: '東京',
    zipCode: '123-4567',
  },
};

// name と address.city を取得
const {
  /* ここにコードを書く */
} = person;

console.log(name); // '太郎'
console.log(city); // '東京'



/*
問題7: 関数の引数で分割代入
*/

// オブジェクトを受け取り、nameとageを使って挨拶する関数
function introduce(/* ここにコードを書く */) {
  console.log(`${name}さん、${age}歳です`);
}

introduce({ name: '花子', age: 30 });
// '花子さん、30歳です'



/*
問題8: 配列を返す関数と分割代入
*/

function getCoordinates() {
  return [35.6762, 139.6503]; // 東京の緯度経度
}

// 分割代入で緯度と経度を取得
const [/* ここにコードを書く */] = getCoordinates();

console.log(latitude); // 35.6762
console.log(longitude); // 139.6503



/*
問題9: 実践問題 - ユーザー情報の抽出
*/

const users = [
  { id: 1, name: '太郎', age: 25, email: 'taro@example.com' },
  { id: 2, name: '花子', age: 30, email: 'hanako@example.com' },
  { id: 3, name: '次郎', age: 22, email: 'jiro@example.com' },
];

// forEach と分割代入を使って、各ユーザーの name と email を表示
users.forEach((/* ここにコードを書く */) => {
  console.log(`${name}: ${email}`);
});



/*
問題10: 実践問題 - オブジェクトのプロパティ交換
*/

let a = 1;
let b = 2;

// 分割代入を使って、a と b の値を入れ替える
[/* ここにコードを書く */] = [b, a];

console.log(a); // 2
console.log(b); // 1
