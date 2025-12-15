# Chapter 2: 関数

## 学習目標

- 関数宣言と関数式の違いを理解する
- アロー関数を使いこなす
- デフォルト引数と残余引数を活用する
- コールバック関数の概念を理解する
- クロージャの仕組みを理解する

---

## 1. 関数宣言と関数式

### 1.1 関数宣言（Function Declaration）

```javascript
// 関数宣言
function greet(name) {
  return `こんにちは、${name}さん`;
}

console.log(greet('太郎')); // こんにちは、太郎さん
```

**特徴:**
- 巻き上げ（hoisting）が起こる
- 関数定義より前でも呼び出せる

```javascript
// 巻き上げの例
console.log(add(2, 3)); // 5（エラーにならない）

function add(a, b) {
  return a + b;
}
```

### 1.2 関数式（Function Expression）

```javascript
// 関数式
const greet = function (name) {
  return `こんにちは、${name}さん`;
};

console.log(greet('花子')); // こんにちは、花子さん
```

**特徴:**
- 変数に代入される
- 巻き上げが起こらない
- 定義より前では呼び出せない

```javascript
// エラーになる例
// console.log(subtract(5, 3)); // エラー: subtract is not defined

const subtract = function (a, b) {
  return a - b;
};
```

### 1.3 どちらを使うべきか？

```javascript
// ✅ 推奨: 関数式を使う（const で宣言）
const calculateTotal = function (price, tax) {
  return price * (1 + tax);
};

// または後述のアロー関数
const calculateTotal2 = (price, tax) => price * (1 + tax);
```

---

## 2. アロー関数

### 2.1 基本構文

```javascript
// 従来の関数式
const add = function (a, b) {
  return a + b;
};

// アロー関数
const add2 = (a, b) => {
  return a + b;
};

// さらに簡潔に（単一式の場合、return と {} を省略可能）
const add3 = (a, b) => a + b;

console.log(add3(2, 3)); // 5
```

### 2.2 引数が1つの場合

```javascript
// 引数が1つなら () を省略可能
const double = (n) => n * 2;
// または
const double2 = n => n * 2;

console.log(double(5)); // 10
```

### 2.3 引数がない場合

```javascript
// 引数がない場合は () が必要
const greet = () => 'こんにちは';

console.log(greet()); // こんにちは
```

### 2.4 オブジェクトを返す場合

```javascript
// オブジェクトを返す場合は () で囲む
const createUser = (name, age) => ({ name, age });

console.log(createUser('太郎', 25)); // { name: '太郎', age: 25 }

// ❌ これはエラー（ブロックと解釈される）
// const createUser2 = (name, age) => { name, age };
```

### 2.5 複数行の処理

```javascript
const processData = (data) => {
  const filtered = data.filter((item) => item > 0);
  const doubled = filtered.map((item) => item * 2);
  return doubled;
};

console.log(processData([1, -2, 3, -4, 5])); // [2, 6, 10]
```

### 2.6 thisの違い（重要）

```javascript
// 通常の関数: this は呼び出し元によって変わる
const obj1 = {
  name: '太郎',
  greet: function () {
    console.log(`こんにちは、${this.name}です`);
  },
};

obj1.greet(); // こんにちは、太郎です

// アロー関数: this は定義された場所のスコープを引き継ぐ
const obj2 = {
  name: '花子',
  greet: () => {
    console.log(`こんにちは、${this.name}です`);
  },
};

obj2.greet(); // こんにちは、undefinedです（期待と異なる）

// ✅ メソッドとして定義する場合は通常の関数を使う
const obj3 = {
  name: '次郎',
  greet() {
    console.log(`こんにちは、${this.name}です`);
  },
};

obj3.greet(); // こんにちは、次郎です
```

---

## 3. デフォルト引数

```javascript
// デフォルト引数を設定
function greet(name = 'ゲスト') {
  return `こんにちは、${name}さん`;
}

console.log(greet('太郎')); // こんにちは、太郎さん
console.log(greet()); // こんにちは、ゲストさん

// 複数のデフォルト引数
const createUser = (name = '名無し', age = 0, city = '未設定') => {
  return { name, age, city };
};

console.log(createUser('太郎', 25)); // { name: '太郎', age: 25, city: '未設定' }
console.log(createUser()); // { name: '名無し', age: 0, city: '未設定' }
```

---

## 4. スプレッド演算子と残余引数

### 4.1 残余引数（Rest Parameters）

```javascript
// 残余引数: 可変長引数を配列として受け取る
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// 通常の引数と組み合わせ
function introduce(greeting, ...names) {
  return `${greeting}、${names.join('と')}さん`;
}

console.log(introduce('こんにちは', '太郎', '花子', '次郎'));
// こんにちは、太郎と花子と次郎さん
```

### 4.2 スプレッド演算子（関数呼び出し）

```javascript
const numbers = [1, 2, 3, 4, 5];

// 配列を展開して引数として渡す
console.log(Math.max(...numbers)); // 5

// 従来の方法（apply を使う）
console.log(Math.max.apply(null, numbers)); // 5
```

---

## 5. コールバック関数

### 5.1 コールバック関数とは

関数を引数として渡し、別の関数内で実行する仕組み。

```javascript
// シンプルな例
function execute(callback) {
  console.log('処理開始');
  callback();
  console.log('処理終了');
}

execute(() => {
  console.log('コールバック実行');
});

// 出力:
// 処理開始
// コールバック実行
// 処理終了
```

### 5.2 配列メソッドでのコールバック

```javascript
const numbers = [1, 2, 3, 4, 5];

// forEach: 各要素に対して処理を実行
numbers.forEach((num) => {
  console.log(num * 2);
});

// map: 各要素を変換して新しい配列を返す
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter: 条件を満たす要素だけを抽出
const evens = numbers.filter((num) => num % 2 === 0);
console.log(evens); // [2, 4]

// find: 条件を満たす最初の要素を返す
const found = numbers.find((num) => num > 3);
console.log(found); // 4
```

### 5.3 実践的な例

```javascript
// カスタムコールバック関数
function processArray(arr, callback) {
  const result = [];
  for (const item of arr) {
    result.push(callback(item));
  }
  return result;
}

const numbers = [1, 2, 3, 4, 5];

// 2倍にする
const doubled = processArray(numbers, (n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// 文字列に変換
const strings = processArray(numbers, (n) => `数字: ${n}`);
console.log(strings); // ['数字: 1', '数字: 2', ...]
```

---

## 6. クロージャ

### 6.1 クロージャとは

関数が定義されたスコープの変数にアクセスできる仕組み。

```javascript
function createCounter() {
  let count = 0; // 外部からアクセスできないプライベート変数

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// 別のカウンター（独立している）
const counter2 = createCounter();
console.log(counter2()); // 1
```

### 6.2 実践的なクロージャの例

```javascript
// メッセージを保持するクロージャ
function createGreeter(greeting) {
  return function (name) {
    return `${greeting}、${name}さん`;
  };
}

const greetJapanese = createGreeter('こんにちは');
const greetEnglish = createGreeter('Hello');

console.log(greetJapanese('太郎')); // こんにちは、太郎さん
console.log(greetEnglish('Taro')); // Hello、Taroさん
```

### 6.3 プライベート変数の実現

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // プライベート変数

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (balance >= amount) {
        balance -= amount;
        return balance;
      } else {
        return '残高不足';
      }
    },
    getBalance() {
      return balance;
    },
  };
}

const account = createBankAccount(1000);
console.log(account.deposit(500)); // 1500
console.log(account.withdraw(300)); // 1200
console.log(account.getBalance()); // 1200
// console.log(account.balance); // undefined（直接アクセスできない）
```

### 6.4 クロージャの注意点

```javascript
// ❌ よくある間違い
function createFunctions() {
  const functions = [];
  for (var i = 0; i < 3; i++) {
    functions.push(function () {
      console.log(i);
    });
  }
  return functions;
}

const funcs = createFunctions();
funcs[0](); // 3（期待: 0）
funcs[1](); // 3（期待: 1）
funcs[2](); // 3（期待: 2）

// ✅ 正しい方法（let を使う）
function createFunctionsCorrect() {
  const functions = [];
  for (let i = 0; i < 3; i++) {
    functions.push(function () {
      console.log(i);
    });
  }
  return functions;
}

const funcs2 = createFunctionsCorrect();
funcs2[0](); // 0
funcs2[1](); // 1
funcs2[2](); // 2
```

---

## 練習問題

[exercises/](./exercises/) フォルダ内の練習問題に取り組んでください。

1. `01-function-basics.js` - 関数宣言と関数式の練習
2. `02-arrow-functions.js` - アロー関数の練習
3. `03-default-rest-params.js` - デフォルト引数と残余引数の練習
4. `04-callbacks.js` - コールバック関数の練習
5. `05-closures.js` - クロージャの練習

---

## まとめ

✅ **関数式（const）とアロー関数を優先する**
✅ **メソッドとして定義する場合は通常の関数を使う**
✅ **デフォルト引数で関数をより柔軟に**
✅ **残余引数で可変長引数を扱う**
✅ **コールバック関数で柔軟な処理を実現**
✅ **クロージャでプライベート変数を実現**

次の章ではオブジェクトと配列について学習します。
