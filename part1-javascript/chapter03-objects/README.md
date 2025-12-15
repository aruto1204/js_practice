# Chapter 3: オブジェクトと配列

## 学習目標

- オブジェクトの作成と操作をマスターする
- 配列メソッド（map, filter, reduce等）を使いこなす
- 分割代入（デストラクチャリング）を理解する
- スプレッド演算子を活用する

---

## 1. オブジェクトの作成と操作

### 1.1 オブジェクトの作成

```javascript
// オブジェクトリテラル
const user = {
  name: '太郎',
  age: 25,
  email: 'taro@example.com',
};

// プロパティへのアクセス
console.log(user.name); // '太郎'
console.log(user['age']); // 25
```

### 1.2 プロパティの追加・更新・削除

```javascript
const user = {
  name: '太郎',
  age: 25,
};

// 追加
user.email = 'taro@example.com';
user['city'] = '東京';

// 更新
user.age = 26;

// 削除
delete user.city;

console.log(user);
// { name: '太郎', age: 26, email: 'taro@example.com' }
```

### 1.3 プロパティの存在確認

```javascript
const user = {
  name: '太郎',
  age: 25,
};

// in 演算子
console.log('name' in user); // true
console.log('email' in user); // false

// hasOwnProperty
console.log(user.hasOwnProperty('name')); // true
console.log(user.hasOwnProperty('email')); // false
```

### 1.4 オブジェクトのキーと値を取得

```javascript
const user = {
  name: '太郎',
  age: 25,
  city: '東京',
};

// キーの配列を取得
const keys = Object.keys(user);
console.log(keys); // ['name', 'age', 'city']

// 値の配列を取得
const values = Object.values(user);
console.log(values); // ['太郎', 25, '東京']

// キーと値のペアを取得
const entries = Object.entries(user);
console.log(entries);
// [['name', '太郎'], ['age', 25], ['city', '東京']]
```

### 1.5 オブジェクトのループ

```javascript
const user = {
  name: '太郎',
  age: 25,
  city: '東京',
};

// for...in
for (const key in user) {
  console.log(`${key}: ${user[key]}`);
}

// Object.entries() と for...of
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}
```

### 1.6 オブジェクトのコピー

```javascript
const original = {
  name: '太郎',
  age: 25,
};

// シャローコピー（浅いコピー）
const copy1 = { ...original };
const copy2 = Object.assign({}, original);

copy1.age = 26;
console.log(original.age); // 25（影響なし）

// ネストしたオブジェクトの場合（注意）
const person = {
  name: '太郎',
  address: {
    city: '東京',
  },
};

const personCopy = { ...person };
personCopy.address.city = '大阪';
console.log(person.address.city); // '大阪'（影響あり！）

// ディープコピー（深いコピー）
const deepCopy = JSON.parse(JSON.stringify(person));
```

### 1.7 オブジェクトのマージ

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

// スプレッド演算子
const merged1 = { ...obj1, ...obj2 };
console.log(merged1); // { a: 1, b: 3, c: 4 }

// Object.assign()
const merged2 = Object.assign({}, obj1, obj2);
console.log(merged2); // { a: 1, b: 3, c: 4 }
```

---

## 2. 配列メソッド

### 2.1 forEach - 各要素に対して処理を実行

```javascript
const fruits = ['りんご', 'バナナ', 'オレンジ'];

fruits.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});
// 0: りんご
// 1: バナナ
// 2: オレンジ
```

### 2.2 map - 各要素を変換して新しい配列を作成

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// オブジェクトの配列
const users = [
  { name: '太郎', age: 25 },
  { name: '花子', age: 30 },
];

const names = users.map((user) => user.name);
console.log(names); // ['太郎', '花子']
```

### 2.3 filter - 条件を満たす要素だけを抽出

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

const greaterThanFive = numbers.filter((n) => n > 5);
console.log(greaterThanFive); // [6, 7, 8, 9, 10]
```

### 2.4 find - 条件を満たす最初の要素を取得

```javascript
const users = [
  { id: 1, name: '太郎' },
  { id: 2, name: '花子' },
  { id: 3, name: '次郎' },
];

const user = users.find((u) => u.id === 2);
console.log(user); // { id: 2, name: '花子' }

const notFound = users.find((u) => u.id === 99);
console.log(notFound); // undefined
```

### 2.5 findIndex - 条件を満たす最初の要素のインデックスを取得

```javascript
const numbers = [10, 20, 30, 40, 50];

const index = numbers.findIndex((n) => n > 25);
console.log(index); // 2
```

### 2.6 some - 1つでも条件を満たす要素があるか

```javascript
const numbers = [1, 2, 3, 4, 5];

const hasEven = numbers.some((n) => n % 2 === 0);
console.log(hasEven); // true

const hasNegative = numbers.some((n) => n < 0);
console.log(hasNegative); // false
```

### 2.7 every - すべての要素が条件を満たすか

```javascript
const numbers = [2, 4, 6, 8, 10];

const allEven = numbers.every((n) => n % 2 === 0);
console.log(allEven); // true

const allPositive = numbers.every((n) => n > 0);
console.log(allPositive); // true
```

### 2.8 reduce - 配列を1つの値に集約

```javascript
const numbers = [1, 2, 3, 4, 5];

// 合計を計算
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15

// 最大値を取得
const max = numbers.reduce((acc, curr) => (curr > acc ? curr : acc));
console.log(max); // 5

// オブジェクトの配列から合計を計算
const products = [
  { name: 'りんご', price: 100 },
  { name: 'バナナ', price: 80 },
  { name: 'オレンジ', price: 120 },
];

const total = products.reduce((sum, product) => sum + product.price, 0);
console.log(total); // 300
```

### 2.9 sort - 配列をソート（破壊的メソッド）

```javascript
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// 昇順
const sorted = [...numbers].sort((a, b) => a - b);
console.log(sorted); // [1, 1, 2, 3, 4, 5, 6, 9]

// 降順
const sortedDesc = [...numbers].sort((a, b) => b - a);
console.log(sortedDesc); // [9, 6, 5, 4, 3, 2, 1, 1]

// オブジェクトの配列をソート
const users = [
  { name: '太郎', age: 25 },
  { name: '花子', age: 30 },
  { name: '次郎', age: 22 },
];

const sortedByAge = [...users].sort((a, b) => a.age - b.age);
console.log(sortedByAge);
// [{ name: '次郎', age: 22 }, { name: '太郎', age: 25 }, { name: '花子', age: 30 }]
```

### 2.10 その他の便利なメソッド

```javascript
const numbers = [1, 2, 3, 4, 5];

// includes - 要素が含まれるか
console.log(numbers.includes(3)); // true

// indexOf - 要素のインデックスを取得
console.log(numbers.indexOf(3)); // 2

// slice - 部分配列を取得（非破壊的）
const sliced = numbers.slice(1, 4);
console.log(sliced); // [2, 3, 4]

// concat - 配列を結合（非破壊的）
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = arr1.concat(arr2);
console.log(combined); // [1, 2, 3, 4]

// join - 配列を文字列に変換
const words = ['Hello', 'World'];
console.log(words.join(' ')); // 'Hello World'
```

---

## 3. 分割代入（デストラクチャリング）

### 3.1 配列の分割代入

```javascript
const colors = ['赤', '青', '緑'];

// 従来の方法
const color1 = colors[0];
const color2 = colors[1];

// 分割代入
const [first, second, third] = colors;
console.log(first); // '赤'
console.log(second); // '青'
console.log(third); // '緑'

// 一部をスキップ
const [, , third2] = colors;
console.log(third2); // '緑'

// デフォルト値
const [a, b, c, d = '黄'] = colors;
console.log(d); // '黄'
```

### 3.2 オブジェクトの分割代入

```javascript
const user = {
  name: '太郎',
  age: 25,
  city: '東京',
};

// 分割代入
const { name, age, city } = user;
console.log(name); // '太郎'
console.log(age); // 25

// 変数名を変更
const { name: userName, age: userAge } = user;
console.log(userName); // '太郎'

// デフォルト値
const { name: n, email = 'なし' } = user;
console.log(email); // 'なし'
```

### 3.3 ネストした分割代入

```javascript
const user = {
  name: '太郎',
  address: {
    city: '東京',
    zipCode: '123-4567',
  },
};

const {
  name,
  address: { city, zipCode },
} = user;

console.log(city); // '東京'
console.log(zipCode); // '123-4567'
```

### 3.4 関数の引数での分割代入

```javascript
// オブジェクトの分割代入
function introduce({ name, age }) {
  console.log(`${name}さん、${age}歳です`);
}

introduce({ name: '太郎', age: 25 });
// 太郎さん、25歳です

// 配列の分割代入
function getCoordinates([x, y]) {
  console.log(`X: ${x}, Y: ${y}`);
}

getCoordinates([10, 20]);
// X: 10, Y: 20
```

---

## 4. スプレッド演算子

### 4.1 配列のスプレッド

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// 配列の結合
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// 配列のコピー
const copy = [...arr1];
copy.push(4);
console.log(arr1); // [1, 2, 3]（変更されない）
console.log(copy); // [1, 2, 3, 4]

// 要素の追加
const withExtra = [0, ...arr1, 4];
console.log(withExtra); // [0, 1, 2, 3, 4]
```

### 4.2 オブジェクトのスプレッド

```javascript
const user = {
  name: '太郎',
  age: 25,
};

// オブジェクトのコピー
const userCopy = { ...user };

// プロパティの追加
const extendedUser = {
  ...user,
  email: 'taro@example.com',
};

// プロパティの更新
const updatedUser = {
  ...user,
  age: 26,
};

console.log(updatedUser);
// { name: '太郎', age: 26 }
```

### 4.3 関数の引数として展開

```javascript
const numbers = [1, 5, 3, 9, 2];

// Math.max に配列を展開して渡す
const max = Math.max(...numbers);
console.log(max); // 9

// 配列をpushで追加
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
console.log(arr1); // [1, 2, 3, 4, 5, 6]
```

---

## 練習問題

[exercises/](./exercises/) フォルダ内の練習問題に取り組んでください。

1. `01-objects.js` - オブジェクトの操作
2. `02-array-methods.js` - 配列メソッドの練習
3. `03-destructuring.js` - 分割代入の練習
4. `04-spread-operator.js` - スプレッド演算子の練習

---

## まとめ

✅ **オブジェクトは { key: value } で作成**
✅ **配列メソッドを使って効率的にデータ処理**
✅ **map, filter, reduce は最も重要**
✅ **分割代入でコードを簡潔に**
✅ **スプレッド演算子で配列・オブジェクトをコピー・結合**

次の章ではクラスとオブジェクト指向について学習します。
