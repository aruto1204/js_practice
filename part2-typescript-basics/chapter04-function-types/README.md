# Chapter 4: 関数の型

## 📚 学習内容

このチャプターでは、TypeScript における関数の型定義について学びます。

### このチャプターで学ぶこと
- 関数の引数と戻り値の型定義
- オプショナル引数とデフォルト引数
- 残余引数（Rest Parameters）の型
- 関数型の定義方法
- 関数オーバーロード

---

## 1. 関数の引数と戻り値の型定義

### 基本的な型定義

```typescript
// 引数と戻り値に型を指定
function add(a: number, b: number): number {
  return a + b;
}

// アロー関数での型定義
const subtract = (a: number, b: number): number => {
  return a - b;
};

// 戻り値がない関数（void）
function log(message: string): void {
  console.log(message);
}
```

### 関数型の定義

関数自体の型を定義する方法はいくつかあります。

```typescript
// 1. 関数型エイリアス
type MathOperation = (a: number, b: number) => number;

const multiply: MathOperation = (a, b) => a * b;

// 2. インターフェース
interface Calculator {
  (a: number, b: number): number;
}

const divide: Calculator = (a, b) => a / b;

// 3. インライン関数型
let modulo: (a: number, b: number) => number;
modulo = (a, b) => a % b;
```

---

## 2. オプショナル引数

引数名の後に `?` をつけると、その引数は省略可能になります。

```typescript
function greet(name: string, greeting?: string): string {
  if (greeting) {
    return `${greeting}, ${name}!`;
  }
  return `Hello, ${name}!`;
}

console.log(greet('Alice'));              // "Hello, Alice!"
console.log(greet('Bob', 'Good morning')); // "Good morning, Bob!"
```

### 注意点

- オプショナル引数は必須引数の後に配置する必要があります
- オプショナル引数の型は自動的に `T | undefined` になります

```typescript
// ❌ エラー：必須引数がオプショナル引数の後にある
function invalid(optional?: string, required: number): void {
  // ...
}

// ✅ 正しい順序
function valid(required: number, optional?: string): void {
  // ...
}
```

---

## 3. デフォルト引数

引数にデフォルト値を設定できます。デフォルト値がある引数は自動的にオプショナルになります。

```typescript
function createUser(name: string, role: string = 'user'): object {
  return { name, role };
}

console.log(createUser('Alice'));          // { name: 'Alice', role: 'user' }
console.log(createUser('Bob', 'admin'));   // { name: 'Bob', role: 'admin' }
```

### 型推論

デフォルト値から型が推論されます。

```typescript
// role の型は自動的に string と推論される
function setPriority(task: string, priority = 1) {
  return { task, priority };
}

// 明示的に型を指定することも可能
function setStatus(item: string, active: boolean = true): object {
  return { item, active };
}
```

---

## 4. 残余引数（Rest Parameters）

残余引数を使うと、可変長の引数を配列として受け取れます。

```typescript
// 数値の合計を計算
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));        // 6
console.log(sum(1, 2, 3, 4, 5));  // 15
```

### 通常の引数と組み合わせる

```typescript
function logWithPrefix(prefix: string, ...messages: string[]): void {
  messages.forEach(msg => console.log(`${prefix}: ${msg}`));
}

logWithPrefix('INFO', 'Server started', 'Port 3000');
// INFO: Server started
// INFO: Port 3000
```

### タプル型の残余引数

```typescript
// 固定長のタプルとして受け取る
function createCoordinate(...args: [number, number]): { x: number; y: number } {
  return { x: args[0], y: args[1] };
}

console.log(createCoordinate(10, 20)); // { x: 10, y: 20 }
```

---

## 5. 関数オーバーロード

同じ関数名で異なる型のシグネチャを定義できます。

### 基本的なオーバーロード

```typescript
// オーバーロードシグネチャ
function format(value: string): string;
function format(value: number): string;
function format(value: boolean): string;

// 実装シグネチャ
function format(value: string | number | boolean): string {
  if (typeof value === 'string') {
    return `String: ${value}`;
  } else if (typeof value === 'number') {
    return `Number: ${value.toFixed(2)}`;
  } else {
    return `Boolean: ${value}`;
  }
}

console.log(format('hello'));  // "String: hello"
console.log(format(42));       // "Number: 42.00"
console.log(format(true));     // "Boolean: true"
```

### より実践的な例

```typescript
// 引数の数で動作が変わる関数
function createElement(tag: string): HTMLElement;
function createElement(tag: string, content: string): HTMLElement;
function createElement(tag: string, attributes: object): HTMLElement;
function createElement(tag: string, content: string, attributes: object): HTMLElement;

function createElement(
  tag: string,
  contentOrAttributes?: string | object,
  attributes?: object
): HTMLElement {
  const element = document.createElement(tag);

  if (typeof contentOrAttributes === 'string') {
    element.textContent = contentOrAttributes;
    if (attributes) {
      Object.assign(element, attributes);
    }
  } else if (contentOrAttributes) {
    Object.assign(element, contentOrAttributes);
  }

  return element;
}
```

### ジェネリクスとオーバーロードの組み合わせ

```typescript
// 配列の場合は配列を返し、単一の値の場合は単一の値を返す
function reverse<T>(items: T[]): T[];
function reverse(str: string): string;

function reverse<T>(value: T[] | string): T[] | string {
  if (typeof value === 'string') {
    return value.split('').reverse().join('');
  }
  return value.slice().reverse();
}

console.log(reverse([1, 2, 3]));     // [3, 2, 1]
console.log(reverse('hello'));        // 'olleh'
```

---

## 6. 関数型の高度な使い方

### コールバック関数の型定義

```typescript
type Callback = (error: Error | null, result?: string) => void;

function fetchData(url: string, callback: Callback): void {
  // 非同期処理のシミュレーション
  setTimeout(() => {
    if (url) {
      callback(null, `Data from ${url}`);
    } else {
      callback(new Error('Invalid URL'));
    }
  }, 1000);
}

fetchData('https://api.example.com', (error, result) => {
  if (error) {
    console.error(error.message);
  } else {
    console.log(result);
  }
});
```

### 高階関数の型定義

```typescript
// 関数を返す関数
type Multiplier = (factor: number) => (value: number) => number;

const createMultiplier: Multiplier = (factor) => {
  return (value) => value * factor;
};

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

### this の型指定

```typescript
interface User {
  name: string;
  greet(this: User, greeting: string): string;
}

const user: User = {
  name: 'Alice',
  greet(this: User, greeting: string): string {
    return `${greeting}, I'm ${this.name}`;
  }
};

console.log(user.greet('Hello')); // "Hello, I'm Alice"

// this のコンテキストを強制
const greetFn = user.greet;
// greetFn('Hi'); // エラー：this が User でない
```

---

## 7. void vs undefined

関数の戻り値として `void` と `undefined` は異なります。

```typescript
// void：戻り値を使用しないことを示す
function logMessage(msg: string): void {
  console.log(msg);
  // return は不要（または return; のみ）
}

// undefined：明示的に undefined を返す
function getUndefined(): undefined {
  return undefined; // 明示的な return が必要
}

// void 型の関数は任意の値を返せる（無視される）
type VoidFunc = () => void;

const fn1: VoidFunc = () => {
  return 123; // OK：戻り値は無視される
};

// undefined 型の関数は undefined のみ
type UndefinedFunc = () => undefined;

const fn2: UndefinedFunc = () => {
  return undefined; // OK
  // return 123; // エラー
};
```

---

## 8. 型安全な関数を書くためのベストプラクティス

### 1. 明示的な型定義

```typescript
// ✅ Good：型が明確
function calculate(a: number, b: number): number {
  return a + b;
}

// ❌ Bad：型推論に頼りすぎ（引数が any になる）
function calculate2(a, b) {
  return a + b;
}
```

### 2. ユニオン型での型ガード

```typescript
function processValue(value: string | number): string {
  // 型ガードで安全に処理
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}
```

### 3. オーバーロードの適切な使用

```typescript
// 引数と戻り値の型の関係が明確
function parse(value: string): object;
function parse(value: string, asArray: true): any[];
function parse(value: string, asArray?: boolean): object | any[] {
  const result = JSON.parse(value);
  if (asArray && Array.isArray(result)) {
    return result;
  }
  return result;
}
```

---

## 9. 練習問題

このディレクトリの `exercises/` フォルダに以下の練習問題があります：

1. **01-basic-functions.ts** - 基本的な関数の型定義
2. **02-optional-default.ts** - オプショナル引数とデフォルト引数
3. **03-rest-parameters.ts** - 残余引数の使い方
4. **04-function-types.ts** - 関数型の定義と高階関数
5. **05-overloads.ts** - 関数オーバーロード

解答例は `solutions/` フォルダにあります。

---

## 10. まとめ

- TypeScript では関数の**引数**と**戻り値**に型を指定できる
- **オプショナル引数**（`?`）と**デフォルト引数**で柔軟な関数を定義
- **残余引数**（`...args`）で可変長引数を扱う
- **関数型**は `type` や `interface` で定義できる
- **関数オーバーロード**で同じ関数名に複数のシグネチャを持たせられる
- `void` は戻り値を使用しない、`undefined` は明示的に undefined を返す

次のチャプターでは、ユニオン型や交差型などの高度な型の使い方を学びます。
