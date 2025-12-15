// 解答例 1: オブジェクトの操作

/*
問題1: オブジェクトを作成
*/

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

console.log(user.name); // '太郎'
console.log(user['email']); // 'taro@example.com'



/*
問題3: プロパティの追加・更新・削除
*/

const product = {
  name: 'ノートパソコン',
  price: 100000,
};

product.city = '東京';
product.price = 95000;
delete product.name;

console.log(product); // { price: 95000, city: '東京' }



/*
問題4: オブジェクトのキーと値を取得
*/

const car = {
  brand: 'Toyota',
  model: 'Prius',
  year: 2023,
};

const keys = Object.keys(car);
const values = Object.values(car);
const entries = Object.entries(car);

console.log(keys); // ['brand', 'model', 'year']
console.log(values); // ['Toyota', 'Prius', 2023]
console.log(entries); // [['brand', 'Toyota'], ['model', 'Prius'], ['year', 2023]]



/*
問題5: オブジェクトのループ
*/

const scores = {
  math: 90,
  english: 85,
  science: 92,
};

for (const key in scores) {
  console.log(`${key}: ${scores[key]}`);
}

// または Object.entries() を使う
for (const [subject, score] of Object.entries(scores)) {
  console.log(`${subject}: ${score}`);
}



/*
問題6: オブジェクトのコピー
*/

const original = {
  name: '太郎',
  age: 25,
};

const copy = { ...original };
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

console.log(Object.keys(users[0])); // ['id', 'name', 'age', 'city']
console.log(Object.values(users[0])); // [1, '太郎', 25, '東京']

const names = users.map((user) => user.name);
console.log(names); // ['太郎', '花子', '次郎']
