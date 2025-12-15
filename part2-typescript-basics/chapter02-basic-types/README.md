# Chapter 2: 基本的な型

## 目次
1. [プリミティブ型](#1-プリミティブ型)
2. [配列型](#2-配列型)
3. [タプル型](#3-タプル型)
4. [any型とunknown型](#4-any型とunknown型)
5. [void型とnever型](#5-void型とnever型)
6. [型推論](#6-型推論)

---

## 1. プリミティブ型

TypeScript には JavaScript と同じプリミティブ型があります。

### string 型

文字列を表す型です。

```typescript
let message: string = 'Hello, TypeScript';
let name: string = "太郎";
let template: string = `My name is ${name}`;

// エラー
// message = 123; // Type 'number' is not assignable to type 'string'
```

### number 型

数値（整数、浮動小数点数）を表す型です。

```typescript
let age: number = 25;
let price: number = 99.99;
let hex: number = 0xff;
let binary: number = 0b1010;
let octal: number = 0o744;

// エラー
// age = '25'; // Type 'string' is not assignable to type 'number'
```

### boolean 型

真偽値を表す型です。

```typescript
let isActive: boolean = true;
let isCompleted: boolean = false;

// エラー
// isActive = 'true'; // Type 'string' is not assignable to type 'boolean'
// isActive = 1; // Type 'number' is not assignable to type 'boolean'
```

### null と undefined

`null` と `undefined` もそれぞれ型として使えます。

```typescript
let n: null = null;
let u: undefined = undefined;

// strictNullChecks が有効な場合
let value: string = 'hello';
// value = null; // エラー: Type 'null' is not assignable to type 'string'

// null を許容する場合
let nullableValue: string | null = 'hello';
nullableValue = null; // OK
```

### symbol 型

一意で不変の値を作成します。

```typescript
let sym1: symbol = Symbol('key');
let sym2: symbol = Symbol('key');

console.log(sym1 === sym2); // false（異なるシンボル）
```

### bigint 型

大きな整数を扱う型です（ES2020+）。

```typescript
let big: bigint = 100n;
let alsoHuge: bigint = BigInt(9007199254740991);

// エラー
// let mixed: number = 1n; // Type 'bigint' is not assignable to type 'number'
```

---

## 2. 配列型

配列の要素の型を指定できます。

### 基本的な配列型

```typescript
// 方法1: type[]
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ['太郎', '花子', '次郎'];

// 方法2: Array<type>
let scores: Array<number> = [80, 90, 75];
let messages: Array<string> = ['hello', 'world'];

// エラー
// numbers.push('text'); // Argument of type 'string' is not assignable to parameter of type 'number'
```

### 多次元配列

```typescript
// 2次元配列
let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// 3次元配列
let cube: number[][][] = [
  [[1, 2], [3, 4]],
  [[5, 6], [7, 8]]
];
```

### 読み取り専用配列

```typescript
let readonlyNumbers: readonly number[] = [1, 2, 3];
// または
let readonlyNames: ReadonlyArray<string> = ['a', 'b', 'c'];

// エラー: 変更できない
// readonlyNumbers.push(4);
// readonlyNumbers[0] = 10;
```

---

## 3. タプル型

固定長で各要素の型が決まっている配列です。

### 基本的なタプル

```typescript
// [string, number] の形式
let person: [string, number] = ['太郎', 25];

console.log(person[0]); // '太郎' (string)
console.log(person[1]); // 25 (number)

// エラー
// person = [25, '太郎']; // 順序が違う
// person = ['太郎']; // 要素が足りない
```

### ラベル付きタプル

```typescript
// 可読性のためにラベルを付けられる（TypeScript 4.0+）
let employee: [name: string, age: number, department: string] = [
  '花子',
  30,
  '営業部'
];
```

### オプショナル要素

```typescript
// ? を使ってオプショナルにできる
let optionalTuple: [string, number?] = ['hello'];
optionalTuple = ['hello', 42]; // OK

console.log(optionalTuple[1]); // undefined または number
```

### 残余要素

```typescript
// 残りの要素を配列として受け取る
let tuple: [string, ...number[]] = ['hello', 1, 2, 3, 4, 5];

console.log(tuple[0]); // 'hello' (string)
console.log(tuple[1]); // 1 (number)
console.log(tuple.slice(1)); // [1, 2, 3, 4, 5]
```

### 読み取り専用タプル

```typescript
let readonlyTuple: readonly [string, number] = ['hello', 42];

// エラー: 変更できない
// readonlyTuple[0] = 'world';
// readonlyTuple.push('extra');
```

---

## 4. any型とunknown型

### any 型

型チェックを無効にします。**できるだけ避けるべき**です。

```typescript
let anything: any = 'hello';
anything = 42; // OK
anything = true; // OK
anything = { name: 'test' }; // OK

// any は何でも許してしまう（危険）
anything.toUpperCase(); // コンパイルエラーにならない
anything.nonExistentMethod(); // コンパイルエラーにならない
```

### unknown 型

型安全な動的型です。`any` より安全です。

```typescript
let something: unknown = 'hello';
something = 42; // OK
something = true; // OK

// unknown は型チェックが必要（安全）
// something.toUpperCase(); // エラー: Object is of type 'unknown'

// 型ガードを使って安全に扱う
if (typeof something === 'string') {
  console.log(something.toUpperCase()); // OK
}

if (typeof something === 'number') {
  console.log(something.toFixed(2)); // OK
}
```

### any vs unknown

```typescript
// any: 型チェックなし（危険）
function processAny(value: any) {
  return value.toUpperCase(); // エラーにならない
}

// unknown: 型チェックあり（安全）
function processUnknown(value: unknown) {
  // return value.toUpperCase(); // エラー

  if (typeof value === 'string') {
    return value.toUpperCase(); // OK
  }
  return '';
}
```

---

## 5. void型とnever型

### void 型

関数が値を返さないことを示します。

```typescript
function logMessage(message: string): void {
  console.log(message);
  // return は省略可能
}

function doNothing(): void {
  return; // OK（return だけ）
  // return undefined; // OK
  // return null; // エラー（strictNullChecks が有効な場合）
}

// void 型の変数（あまり使わない）
let unusable: void = undefined;
```

### never 型

決して値を返さない（到達不可能）ことを示します。

```typescript
// 常に例外を投げる関数
function throwError(message: string): never {
  throw new Error(message);
  // ここには到達しない
}

// 無限ループ
function infiniteLoop(): never {
  while (true) {
    // 処理
  }
  // ここには到達しない
}

// 網羅性チェック
type Shape = 'circle' | 'square';

function getArea(shape: Shape): number {
  switch (shape) {
    case 'circle':
      return Math.PI * 10 * 10;
    case 'square':
      return 10 * 10;
    default:
      const exhaustiveCheck: never = shape;
      throw new Error(`Unhandled shape: ${exhaustiveCheck}`);
  }
}
```

### void vs never

```typescript
// void: 関数は終了するが値を返さない
function voidFunc(): void {
  console.log('実行される');
  // 正常に終了する
}

// never: 関数は決して終了しない
function neverFunc(): never {
  throw new Error('常にエラー');
  // この後のコードは実行されない
}
```

---

## 6. 型推論

TypeScript は明示的な型注釈がなくても、自動的に型を推論します。

### 基本的な型推論

```typescript
// 型注釈なしでも型が推論される
let message = 'Hello'; // string 型
let count = 42; // number 型
let isActive = true; // boolean 型

// message = 123; // エラー: Type 'number' is not assignable to type 'string'
```

### 配列の型推論

```typescript
let numbers = [1, 2, 3]; // number[] 型
let mixed = [1, 'two', true]; // (string | number | boolean)[] 型

numbers.push(4); // OK
// numbers.push('five'); // エラー
```

### 関数の戻り値の型推論

```typescript
// 戻り値の型は自動で number と推論される
function add(a: number, b: number) {
  return a + b;
}

// 明示的に書くこともできる（推奨される場合も）
function subtract(a: number, b: number): number {
  return a - b;
}
```

### オブジェクトの型推論

```typescript
let user = {
  name: '太郎',
  age: 25
};
// { name: string; age: number; } 型と推論される

user.name = '花子'; // OK
// user.name = 123; // エラー
// user.email = 'test@example.com'; // エラー: プロパティが存在しない
```

### const による型推論

```typescript
let mutableString = 'hello'; // string 型
const immutableString = 'hello'; // 'hello' 型（リテラル型）

let mutableNumber = 42; // number 型
const immutableNumber = 42; // 42 型（リテラル型）
```

### 型推論の限界

```typescript
// 空配列は any[] と推論される
let emptyArray = [];
emptyArray.push(1); // OK
emptyArray.push('text'); // OK（型安全でない）

// 型注釈を付けるべき
let typedArray: number[] = [];
typedArray.push(1); // OK
// typedArray.push('text'); // エラー
```

---

## まとめ

| 型 | 説明 | 例 |
|---|------|-----|
| `string` | 文字列 | `'hello'`, `"world"` |
| `number` | 数値 | `42`, `3.14` |
| `boolean` | 真偽値 | `true`, `false` |
| `null` | null 値 | `null` |
| `undefined` | undefined 値 | `undefined` |
| `number[]` | 数値の配列 | `[1, 2, 3]` |
| `[string, number]` | タプル | `['hello', 42]` |
| `any` | 何でも（避けるべき） | - |
| `unknown` | 型安全な動的型 | - |
| `void` | 戻り値なし | 関数の戻り値 |
| `never` | 到達不可能 | 例外を投げる関数 |

### ベストプラクティス

1. **型注釈は明示的に書く**: 特に関数の引数と戻り値
2. **any は避ける**: unknown を使う
3. **型推論を活用する**: 冗長な型注釈は不要
4. **strictNullChecks を有効にする**: null/undefined の扱いを厳密に
5. **readonly を活用する**: 不変性を保証

---

## 練習問題

次のファイルで TypeScript の基本的な型を練習しましょう：

1. `exercises/01-primitive-types.ts` - プリミティブ型の基礎
2. `exercises/02-arrays-tuples.ts` - 配列型とタプル型
3. `exercises/03-any-unknown.ts` - any型とunknown型
4. `exercises/04-void-never.ts` - void型とnever型
5. `exercises/05-type-inference.ts` - 型推論の活用
