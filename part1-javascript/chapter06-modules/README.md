# Chapter 6: モジュール

## 目次
1. [モジュールとは](#1-モジュールとは)
2. [import / export](#2-import--export)
3. [デフォルトエクスポート](#3-デフォルトエクスポート)
4. [名前付きエクスポート](#4-名前付きエクスポート)
5. [モジュールのベストプラクティス](#5-モジュールのベストプラクティス)

---

## 1. モジュールとは

モジュールは、コードを再利用可能な単位に分割する仕組みです。

### モジュールの利点

- **コードの整理**: 機能ごとにファイルを分割できる
- **再利用性**: 同じコードを複数の場所で使える
- **スコープの分離**: グローバル変数の汚染を防ぐ
- **依存関係の明確化**: どのモジュールが何を必要としているか明確

### ES Modules (ESM)

現代の JavaScript では ES Modules が標準です。

```javascript
// package.json に "type": "module" を追加するか、
// ファイルの拡張子を .mjs にする必要があります
```

---

## 2. import / export

### 基本的なエクスポート

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export const PI = 3.14159;
```

### 基本的なインポート

```javascript
// main.js
import { add, subtract, PI } from './math.js';

console.log(add(5, 3));        // 8
console.log(subtract(10, 4));  // 6
console.log(PI);               // 3.14159
```

### すべてをインポート

```javascript
// main.js
import * as math from './math.js';

console.log(math.add(5, 3));      // 8
console.log(math.subtract(10, 4)); // 6
console.log(math.PI);              // 3.14159
```

---

## 3. デフォルトエクスポート

1つのモジュールから1つの主要な値をエクスポートする場合に使用します。

### デフォルトエクスポートの定義

```javascript
// calculator.js

// 方法1: 宣言と同時にエクスポート
export default class Calculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }
}

// 方法2: 後からエクスポート
class Calculator {
  // ...
}
export default Calculator;

// 方法3: 無名クラス・関数
export default class {
  // ...
}
```

### デフォルトインポート

```javascript
// main.js
import Calculator from './calculator.js';

const calc = new Calculator();
console.log(calc.add(5, 3)); // 8
```

**注意**: デフォルトインポートでは任意の名前を使用できます。

```javascript
// どれも同じものをインポート
import Calculator from './calculator.js';
import Calc from './calculator.js';
import MyCalc from './calculator.js';
```

---

## 4. 名前付きエクスポート

複数の値をエクスポートする場合に使用します。

### 複数の名前付きエクスポート

```javascript
// utils.js
export function formatDate(date) {
  return date.toLocaleDateString('ja-JP');
}

export function formatCurrency(amount) {
  return `¥${amount.toLocaleString()}`;
}

export const MAX_LENGTH = 100;
export const MIN_LENGTH = 1;
```

### 名前付きインポート

```javascript
// main.js
import { formatDate, formatCurrency, MAX_LENGTH } from './utils.js';

console.log(formatDate(new Date()));
console.log(formatCurrency(1000));
console.log(MAX_LENGTH);
```

### エイリアスを使ったインポート

```javascript
// 名前が長い場合や名前の衝突を避ける場合
import { formatDate as fmtDate, formatCurrency as fmtCurr } from './utils.js';

console.log(fmtDate(new Date()));
console.log(fmtCurr(1000));
```

### エイリアスを使ったエクスポート

```javascript
// utils.js
function formatDateInternal(date) {
  return date.toLocaleDateString('ja-JP');
}

export { formatDateInternal as formatDate };
```

---

## 5. モジュールのベストプラクティス

### デフォルトエクスポートと名前付きエクスポートの使い分け

```javascript
// user.js - デフォルトエクスポート（メインのクラス）
export default class User {
  constructor(name) {
    this.name = name;
  }
}

// 名前付きエクスポート（補助的な関数）
export function validateUser(user) {
  return user.name && user.name.length > 0;
}

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};
```

```javascript
// main.js
import User, { validateUser, USER_ROLES } from './user.js';

const user = new User('太郎');
console.log(validateUser(user)); // true
console.log(USER_ROLES.ADMIN);   // 'admin'
```

### 再エクスポート

複数のモジュールを1つにまとめて公開する場合に便利です。

```javascript
// math/add.js
export function add(a, b) {
  return a + b;
}

// math/subtract.js
export function subtract(a, b) {
  return a - b;
}

// math/multiply.js
export function multiply(a, b) {
  return a * b;
}

// math/index.js - すべてをまとめて再エクスポート
export { add } from './add.js';
export { subtract } from './subtract.js';
export { multiply } from './multiply.js';

// または
export * from './add.js';
export * from './subtract.js';
export * from './multiply.js';
```

```javascript
// main.js - index.js から一度にインポート
import { add, subtract, multiply } from './math/index.js';
// または
import { add, subtract, multiply } from './math'; // Node.js では index.js が省略可能
```

### モジュールの循環参照を避ける

```javascript
// ❌ 悪い例: 循環参照
// a.js
import { b } from './b.js';
export const a = 'A';

// b.js
import { a } from './a.js'; // 循環参照!
export const b = 'B';
```

```javascript
// ✅ 良い例: 共通のモジュールに分離
// constants.js
export const A = 'A';
export const B = 'B';

// a.js
import { A } from './constants.js';
export const a = A;

// b.js
import { B } from './constants.js';
export const b = B;
```

### ファイル構成の例

```
project/
├── src/
│   ├── utils/
│   │   ├── index.js        # 再エクスポート用
│   │   ├── string.js       # 文字列操作
│   │   ├── array.js        # 配列操作
│   │   └── date.js         # 日付操作
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   ├── services/
│   │   ├── api.js
│   │   └── storage.js
│   └── main.js
└── package.json
```

### 動的インポート

実行時に必要なモジュールだけを読み込むことができます。

```javascript
// 静的インポート（ファイル読み込み時に実行）
import { heavyFunction } from './heavy.js';

// 動的インポート（必要な時だけ実行）
async function loadHeavyModule() {
  const module = await import('./heavy.js');
  module.heavyFunction();
}

// 条件付きインポート
if (condition) {
  const { feature } = await import('./feature.js');
  feature();
}
```

### CommonJS との違い

Node.js では従来 CommonJS が使われていました。

```javascript
// CommonJS (古い方式)
// math.js
exports.add = function(a, b) {
  return a + b;
};

module.exports = {
  add: function(a, b) { return a + b; }
};

// main.js
const math = require('./math.js');
console.log(math.add(5, 3));
```

```javascript
// ES Modules (新しい方式)
// math.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add } from './math.js';
console.log(add(5, 3));
```

**package.json での設定**:

```json
{
  "type": "module"  // ES Modules を使用
}
```

---

## まとめ

| 方式 | 用途 | 例 |
|------|------|-----|
| デフォルトエクスポート | 1つの主要な値 | `export default class User {}` |
| 名前付きエクスポート | 複数の値 | `export function add() {}` |
| すべてインポート | モジュール全体 | `import * as math from './math.js'` |
| エイリアス | 名前の変更 | `import { add as plus } from './math.js'` |
| 再エクスポート | モジュールのまとめ | `export * from './utils.js'` |
| 動的インポート | 遅延読み込み | `await import('./module.js')` |

### ベストプラクティス

1. **1ファイル1責任**: 各モジュールは1つの責任を持つ
2. **デフォルトエクスポートは控えめに**: 名前付きエクスポートを優先
3. **index.js で再エクスポート**: ディレクトリ単位でモジュールをまとめる
4. **循環参照を避ける**: 依存関係をシンプルに保つ
5. **明確な命名**: モジュール名と公開する機能を一致させる

---

## 練習問題

次のファイルでモジュールの使い方を練習しましょう：

1. `exercises/01-basic-export/` - 基本的なエクスポート・インポート
2. `exercises/02-default-export/` - デフォルトエクスポート
3. `exercises/03-named-export/` - 名前付きエクスポート
4. `exercises/04-re-export/` - 再エクスポート
5. `exercises/05-practical/` - 実践的なモジュール構成
