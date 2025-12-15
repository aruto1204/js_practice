# Chapter 1: 基本文法の復習

## 学習目標

- var, let, const の違いを理解する
- JavaScriptのデータ型を理解する
- 演算子の使い方をマスターする
- 条件分岐とループを使いこなす

---

## 1. 変数宣言（var, let, const）

### 1.1 const（定数）

再代入できない変数を宣言します。**優先的に使用してください。**

```javascript
const name = '太郎';
const age = 25;

// エラー: 再代入できない
// name = '花子';
```

### 1.2 let（変数）

再代入可能な変数を宣言します。値が変わる場合のみ使用します。

```javascript
let count = 0;
count = 1; // OK

let message = 'こんにちは';
message = 'さようなら'; // OK
```

### 1.3 var（非推奨）

**古い書き方です。使用しないでください。**

```javascript
// ❌ 使わない
var oldStyle = 'これは使わない';
```

### スコープの違い

```javascript
// const と let はブロックスコープ
{
  const x = 10;
  let y = 20;
  console.log(x, y); // 10 20
}
// console.log(x); // エラー: x は未定義

// var は関数スコープ（問題が起きやすい）
{
  var z = 30;
}
console.log(z); // 30（ブロック外でも参照できてしまう）
```

---

## 2. データ型

### 2.1 プリミティブ型（基本型）

#### 文字列（String）

```javascript
const str1 = 'シングルクォート';
const str2 = "ダブルクォート";
const str3 = `テンプレートリテラル: ${str1}`;

console.log(str3); // テンプレートリテラル: シングルクォート
```

#### 数値（Number）

```javascript
const integer = 42;
const float = 3.14;
const negative = -10;

console.log(typeof integer); // 'number'
```

#### 真偽値（Boolean）

```javascript
const isActive = true;
const isComplete = false;

console.log(typeof isActive); // 'boolean'
```

#### null と undefined

```javascript
const empty = null; // 意図的な「空」
let notAssigned; // 値が未代入

console.log(empty); // null
console.log(notAssigned); // undefined
```

### 2.2 参照型

#### オブジェクト（Object）

```javascript
const user = {
  name: '太郎',
  age: 25,
};

console.log(user.name); // '太郎'
```

#### 配列（Array）

```javascript
const fruits = ['りんご', 'バナナ', 'オレンジ'];

console.log(fruits[0]); // 'りんご'
console.log(fruits.length); // 3
```

### 2.3 型の確認

```javascript
console.log(typeof 'hello'); // 'string'
console.log(typeof 123); // 'number'
console.log(typeof true); // 'boolean'
console.log(typeof undefined); // 'undefined'
console.log(typeof null); // 'object'（これはJavaScriptの歴史的なバグ）
console.log(typeof {}); // 'object'
console.log(typeof []); // 'object'
console.log(Array.isArray([])); // true（配列の判定はこちらを使う）
```

---

## 3. 演算子

### 3.1 算術演算子

```javascript
const a = 10;
const b = 3;

console.log(a + b); // 13（加算）
console.log(a - b); // 7（減算）
console.log(a * b); // 30（乗算）
console.log(a / b); // 3.333...（除算）
console.log(a % b); // 1（剰余）
console.log(a ** b); // 1000（べき乗）
```

### 3.2 比較演算子

```javascript
// 等価（==）と厳密等価（===）
console.log(5 == '5'); // true（型変換あり）
console.log(5 === '5'); // false（型変換なし）

// ✅ 常に === を使う
console.log(10 === 10); // true
console.log(10 !== 5); // true

// 大小比較
console.log(10 > 5); // true
console.log(10 >= 10); // true
console.log(5 < 10); // true
console.log(5 <= 5); // true
```

### 3.3 論理演算子

```javascript
const isAdult = true;
const hasLicense = false;

// AND（両方とも true）
console.log(isAdult && hasLicense); // false

// OR（どちらか true）
console.log(isAdult || hasLicense); // true

// NOT（反転）
console.log(!isAdult); // false
```

### 3.4 代入演算子

```javascript
let count = 10;

count += 5; // count = count + 5
console.log(count); // 15

count -= 3; // count = count - 3
console.log(count); // 12

count *= 2; // count = count * 2
console.log(count); // 24

count /= 4; // count = count / 4
console.log(count); // 6
```

---

## 4. 条件分岐

### 4.1 if文

```javascript
const age = 20;

if (age >= 20) {
  console.log('成人です');
} else if (age >= 13) {
  console.log('10代です');
} else {
  console.log('子供です');
}
```

### 4.2 三項演算子

```javascript
const age = 18;
const status = age >= 20 ? '成人' : '未成年';
console.log(status); // '未成年'
```

### 4.3 switch文

```javascript
const fruit = 'りんご';

switch (fruit) {
  case 'りんご':
    console.log('赤い果物');
    break;
  case 'バナナ':
    console.log('黄色い果物');
    break;
  case 'ぶどう':
    console.log('紫の果物');
    break;
  default:
    console.log('その他の果物');
}
```

---

## 5. ループ

### 5.1 for文

```javascript
// 基本的な for ループ
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// 配列の走査
const fruits = ['りんご', 'バナナ', 'オレンジ'];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

### 5.2 while文

```javascript
let count = 0;

while (count < 5) {
  console.log(count);
  count++;
}
// 0, 1, 2, 3, 4
```

### 5.3 do...while文

```javascript
let num = 0;

do {
  console.log(num);
  num++;
} while (num < 3);
// 0, 1, 2
```

### 5.4 for...of（配列のループ）

```javascript
const colors = ['赤', '青', '緑'];

for (const color of colors) {
  console.log(color);
}
// 赤, 青, 緑
```

### 5.5 for...in（オブジェクトのループ）

```javascript
const user = {
  name: '太郎',
  age: 25,
  city: '東京',
};

for (const key in user) {
  console.log(`${key}: ${user[key]}`);
}
// name: 太郎
// age: 25
// city: 東京
```

### 5.6 break と continue

```javascript
// break: ループを抜ける
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i);
}
// 0, 1, 2, 3, 4

// continue: 次の周回へ
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i);
}
// 0, 1, 3, 4
```

---

## 練習問題

[exercises/](./exercises/) フォルダ内の練習問題に取り組んでください。

1. `01-variables.js` - 変数宣言の練習
2. `02-datatypes.js` - データ型の練習
3. `03-operators.js` - 演算子の練習
4. `04-conditions.js` - 条件分岐の練習
5. `05-loops.js` - ループの練習

---

## まとめ

✅ **const を優先、必要に応じて let を使う**
✅ **var は使わない**
✅ **=== を使って厳密な比較を行う**
✅ **for...of で配列をループ、for...in でオブジェクトをループ**

次の章では関数について学習します。
