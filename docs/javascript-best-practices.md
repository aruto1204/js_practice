# 📘 JavaScript ベストプラクティス

## 概要

JavaScript を書く際に守るべきベストプラクティスをまとめています。
より読みやすく、保守しやすく、バグの少ないコードを書くための指針です。

---

## 1. 変数宣言

### ✅ const を優先、必要な場合のみ let を使う

```javascript
// ✅ 良い例
const MAX_SIZE = 100;
const user = { name: '太郎' };
let count = 0;

// ❌ 悪い例
var MAX_SIZE = 100;  // var は使わない
let user = { name: '太郎' };  // 再代入しないなら const
```

### ✅ 変数は使う場所の近くで宣言する

```javascript
// ✅ 良い例
function processUser(userId) {
  const user = getUser(userId);
  const formattedName = formatName(user.name);
  return formattedName;
}

// ❌ 悪い例
function processUser(userId) {
  let formattedName;  // 使う場所から遠い
  const user = getUser(userId);
  // ... 長いコード ...
  formattedName = formatName(user.name);
  return formattedName;
}
```

### ✅ 意味のある変数名をつける

```javascript
// ✅ 良い例
const userAge = 25;
const isLoggedIn = true;
const maxRetryCount = 3;

// ❌ 悪い例
const a = 25;
const flag = true;
const n = 3;
```

---

## 2. 関数

### ✅ 関数は1つのことだけを行う（単一責任の原則）

```javascript
// ✅ 良い例
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sendEmail(email, message) {
  // メール送信ロジック
}

// ❌ 悪い例
function validateAndSendEmail(email, message) {
  // バリデーションとメール送信が混在
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    // メール送信ロジック
  }
}
```

### ✅ 関数の引数は3つ以下に抑える

```javascript
// ✅ 良い例
function createUser({ name, email, age, address }) {
  return { name, email, age, address };
}

createUser({ name: '太郎', email: 'taro@example.com', age: 25, address: '東京' });

// ❌ 悪い例
function createUser(name, email, age, address, phone, company) {
  // 引数が多すぎる
}
```

### ✅ 早期リターンでネストを減らす

```javascript
// ✅ 良い例
function getDiscount(user) {
  if (!user) return 0;
  if (!user.isPremium) return 0;
  if (user.purchaseCount < 10) return 5;
  return 10;
}

// ❌ 悪い例
function getDiscount(user) {
  if (user) {
    if (user.isPremium) {
      if (user.purchaseCount >= 10) {
        return 10;
      } else {
        return 5;
      }
    }
  }
  return 0;
}
```

### ✅ アロー関数を適切に使う

```javascript
// ✅ 良い例：簡潔な処理
const double = (n) => n * 2;
const numbers = [1, 2, 3].map((n) => n * 2);

// ✅ 良い例：複数行の処理
const processData = (data) => {
  const filtered = data.filter((item) => item.active);
  const mapped = filtered.map((item) => item.name);
  return mapped;
};

// メソッドとして定義する場合は通常の関数を使う
const obj = {
  name: '太郎',
  // ✅ this を正しく参照できる
  greet() {
    console.log(`こんにちは、${this.name}です`);
  },
  // ❌ this が期待通りに動作しない
  greetArrow: () => {
    console.log(`こんにちは、${this.name}です`);
  },
};
```

---

## 3. 配列操作

### ✅ 破壊的メソッドを避ける

```javascript
// ✅ 良い例：元の配列を変更しない
const original = [3, 1, 2];
const sorted = [...original].sort((a, b) => a - b);
const reversed = [...original].reverse();

// ❌ 悪い例：元の配列を変更してしまう
const original = [3, 1, 2];
original.sort();  // original が変更される
```

### ✅ 適切な配列メソッドを使う

```javascript
const users = [
  { name: '太郎', age: 25 },
  { name: '花子', age: 30 },
  { name: '次郎', age: 20 },
];

// map: 変換
const names = users.map((user) => user.name);

// filter: 絞り込み
const adults = users.filter((user) => user.age >= 25);

// find: 1件取得
const taro = users.find((user) => user.name === '太郎');

// some: 条件を満たすものがあるか
const hasAdult = users.some((user) => user.age >= 20);

// every: すべてが条件を満たすか
const allAdults = users.every((user) => user.age >= 20);

// reduce: 集計
const totalAge = users.reduce((sum, user) => sum + user.age, 0);
```

### ✅ for...of を使う（インデックスが不要な場合）

```javascript
const items = ['apple', 'banana', 'orange'];

// ✅ 良い例
for (const item of items) {
  console.log(item);
}

// ❌ 悪い例（インデックスを使わないのに for を使う）
for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}
```

---

## 4. オブジェクト

### ✅ 分割代入を活用する

```javascript
// ✅ 良い例
const user = { name: '太郎', age: 25, email: 'taro@example.com' };
const { name, age } = user;

// 関数の引数でも使う
function greet({ name, age }) {
  console.log(`${name}さん（${age}歳）`);
}

// ❌ 悪い例
const name = user.name;
const age = user.age;
```

### ✅ スプレッド演算子でオブジェクトをコピー・マージする

```javascript
// コピー
const original = { a: 1, b: 2 };
const copy = { ...original };

// マージ
const merged = { ...original, c: 3 };

// 部分的な更新
const user = { name: '太郎', age: 25 };
const updatedUser = { ...user, age: 26 };
```

### ✅ Optional Chaining を使う

```javascript
// ✅ 良い例
const city = user?.address?.city;
const result = obj?.method?.();

// ❌ 悪い例
const city = user && user.address && user.address.city;
```

### ✅ Nullish Coalescing を使う

```javascript
// ✅ 良い例：null/undefined の場合のみデフォルト値
const name = user.name ?? 'ゲスト';
const count = data.count ?? 0;

// ❌ 注意：|| は falsy な値すべてでデフォルト値になる
const count = data.count || 10;  // 0 の場合も 10 になってしまう
```

---

## 5. 非同期処理

### ✅ async/await を優先する

```javascript
// ✅ 良い例
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('ユーザー取得エラー:', error);
    throw error;
  }
}

// ❌ 悪い例：Promise チェーンが深くなる
function fetchUser(id) {
  return fetch(`/api/users/${id}`)
    .then((response) => response.json())
    .then((user) => user)
    .catch((error) => {
      console.error('ユーザー取得エラー:', error);
      throw error;
    });
}
```

### ✅ 並列実行できるものは Promise.all を使う

```javascript
// ✅ 良い例：並列実行
async function fetchAllData() {
  const [users, products, orders] = await Promise.all([
    fetchUsers(),
    fetchProducts(),
    fetchOrders(),
  ]);
  return { users, products, orders };
}

// ❌ 悪い例：直列実行（遅い）
async function fetchAllData() {
  const users = await fetchUsers();
  const products = await fetchProducts();
  const orders = await fetchOrders();
  return { users, products, orders };
}
```

### ✅ エラーハンドリングを忘れない

```javascript
// ✅ 良い例
async function processData() {
  try {
    const data = await fetchData();
    return processResult(data);
  } catch (error) {
    // エラーをログに記録
    console.error('データ処理エラー:', error);
    // ユーザーへの通知やフォールバック処理
    return defaultData;
  }
}
```

---

## 6. エラーハンドリング

### ✅ 具体的なエラーメッセージを提供する

```javascript
// ✅ 良い例
function divide(a, b) {
  if (b === 0) {
    throw new Error('0で除算することはできません');
  }
  return a / b;
}

// ❌ 悪い例
function divide(a, b) {
  if (b === 0) {
    throw new Error('エラー');
  }
  return a / b;
}
```

### ✅ カスタムエラークラスを作る

```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function validateUser(user) {
  if (!user.email) {
    throw new ValidationError('メールアドレスは必須です', 'email');
  }
}
```

---

## 7. モジュール

### ✅ 名前付きエクスポートを優先する

```javascript
// ✅ 良い例：名前付きエクスポート
// utils.js
export function formatDate(date) { /* ... */ }
export function formatCurrency(amount) { /* ... */ }

// 使用側
import { formatDate, formatCurrency } from './utils.js';

// ❌ 悪い例：デフォルトエクスポートの乱用
// utils.js
export default {
  formatDate(date) { /* ... */ },
  formatCurrency(amount) { /* ... */ },
};
```

### ✅ 循環参照を避ける

```javascript
// ❌ 悪い例：循環参照
// a.js
import { b } from './b.js';
export const a = 1;

// b.js
import { a } from './a.js';  // 循環参照
export const b = 2;

// ✅ 良い例：共通モジュールを作る
// shared.js
export const a = 1;
export const b = 2;
```

---

## 8. コメント

### ✅ なぜそうするかを書く（何をするかではなく）

```javascript
// ✅ 良い例
// Safari では Date.parse が ISO 形式を正しく解析できないため、
// 手動でパースする必要がある
function parseDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return new Date(year, month - 1, day);
}

// ❌ 悪い例
// 日付をパースする
function parseDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return new Date(year, month - 1, day);
}
```

### ✅ TODO/FIXME コメントを活用する

```javascript
// TODO: パフォーマンス改善が必要
// FIXME: エッジケースで null が返る可能性がある
// NOTE: この関数は非推奨。代わりに newFunction を使うこと
// HACK: ライブラリのバグを回避するための一時的な対処
```

---

## 9. パフォーマンス

### ✅ 不要な計算を避ける

```javascript
// ✅ 良い例：ループの外で計算
const length = items.length;
for (let i = 0; i < length; i++) {
  // ...
}

// ❌ 悪い例：毎回 length を評価
for (let i = 0; i < items.length; i++) {
  // ...
}
```

### ✅ メモ化で重い計算をキャッシュする

```javascript
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalculation = memoize((n) => {
  // 重い計算
  return n * n;
});
```

---

## 10. セキュリティ

### ✅ ユーザー入力を信用しない

```javascript
// ✅ 良い例：サニタイズする
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

const safeHtml = escapeHtml(userInput);

// ❌ 悪い例：XSS 脆弱性
element.innerHTML = userInput;
```

### ✅ eval を使わない

```javascript
// ❌ 悪い例：eval は危険
const result = eval(userInput);

// ✅ 良い例：安全な代替手段を使う
const result = JSON.parse(userInput);
```

---

## チェックリスト

### コードを書くとき
- [ ] const/let を使い、var は使っていない
- [ ] 意味のある変数名・関数名をつけた
- [ ] 関数は1つの責務のみを持っている
- [ ] 早期リターンでネストを減らした
- [ ] 適切な配列メソッドを使っている
- [ ] async/await で非同期処理を書いている
- [ ] エラーハンドリングを実装している
- [ ] 必要なコメントを追加した

### コードレビューのとき
- [ ] 破壊的なメソッドを使っていないか
- [ ] セキュリティ上の問題はないか
- [ ] パフォーマンスの問題はないか
- [ ] テストしやすい設計か

---

## 参考資料

- [MDN JavaScript ガイド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide)
- [JavaScript.info](https://ja.javascript.info/)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
