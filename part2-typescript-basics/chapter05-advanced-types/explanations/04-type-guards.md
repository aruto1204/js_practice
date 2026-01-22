# 型ガード（Type Guards）解説

## 概要

型ガードは、実行時に変数の型を絞り込むための TypeScript の機能です。条件分岐内で型を判定することで、TypeScript コンパイラがより具体的な型として扱えるようになります。

## 基本概念

### 型ガードの種類

1. **typeof 型ガード** - プリミティブ型の判定
2. **instanceof 型ガード** - クラスインスタンスの判定
3. **in 型ガード** - プロパティの存在確認
4. **ユーザー定義型ガード** - カスタム型判定関数

## 各問題の解説

### 問題1: typeof 型ガード

```typescript
function processValue(value: string | number): string | number {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value * 2;
}
```

**ポイント:**
- `typeof` 演算子でプリミティブ型を判定
- `if` ブロック内では TypeScript が型を `string` に絞り込む
- `else` ブロックでは自動的に `number` として扱われる
- JavaScript の標準機能を使用（ランタイムコストなし）

**typeof で判定できる型:**
```typescript
typeof value === 'string'    // string
typeof value === 'number'    // number
typeof value === 'boolean'   // boolean
typeof value === 'symbol'    // symbol
typeof value === 'undefined' // undefined
typeof value === 'object'    // object | null
typeof value === 'function'  // function
```

### 問題2: instanceof 型ガード

```typescript
function getYear(date: Date | string): number {
  if (date instanceof Date) {
    return date.getFullYear();
  }
  return new Date(date).getFullYear();
}
```

**ポイント:**
- `instanceof` 演算子でクラスのインスタンスを判定
- プロトタイプチェーンを確認
- クラスやコンストラクタ関数で作成されたオブジェクトに使用
- `Date`, `Array`, `Error`, カスタムクラスなどに有効

### 問題3: in 型ガード

```typescript
type Dog = {
  bark: () => void;
};

type Cat = {
  meow: () => void;
};

function makeSound(animal: Dog | Cat): void {
  if ('bark' in animal) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

**ポイント:**
- `in` 演算子でプロパティの存在を確認
- プロトタイプチェーン全体を検索
- オブジェクト型の判別に便利
- 判別可能なユニオンが使えない場合の代替手段

### 問題4-5: ユーザー定義型ガード（基本）

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
```

**ポイント:**
- **型述語（Type Predicate）**: `value is string` の形式
- 関数が `true` を返すと、TypeScript は引数を指定された型として扱う
- `unknown` 型から具体的な型への変換に便利
- 再利用可能な型チェック関数

**使用例:**
```typescript
const value: unknown = 'hello';

if (isString(value)) {
  // この中では value は string 型
  console.log(value.toUpperCase());
}
```

### 問題6: オブジェクトの型ガード

```typescript
interface User {
  name: string;
  email: string;
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'email' in obj &&
    typeof (obj as User).name === 'string' &&
    typeof (obj as User).email === 'string'
  );
}
```

**ポイント:**
- 複数の条件を組み合わせて複雑なオブジェクトを検証
- `null` チェックが必要（`typeof null === 'object'`）
- 各プロパティの型も検証
- API レスポンスの検証に便利

**検証の手順:**
1. `typeof obj === 'object'` - オブジェクトであることを確認
2. `obj !== null` - null でないことを確認
3. `'name' in obj` - プロパティの存在を確認
4. `typeof (obj as User).name === 'string'` - プロパティの型を確認

### 問題7: 配列の型ガード

```typescript
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}
```

**ポイント:**
- `Array.isArray()` で配列であることを確認
- `every()` ですべての要素の型を検証
- 実行時コストがかかる（すべての要素をチェック）
- 小さな配列や信頼できないデータに使用

### 問題8: null/undefined チェック

```typescript
function isNotNullish<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
```

**ポイント:**
- **ジェネリクス** を使って任意の型に対応
- `null` と `undefined` を同時にチェック
- **Nullish** = `null` または `undefined`
- 配列の `filter()` と組み合わせて便利

**使用例:**
```typescript
const values: (string | null | undefined)[] = ['a', null, 'b', undefined, 'c'];
const filtered: string[] = values.filter(isNotNullish);
// ['a', 'b', 'c']
```

### 問題9: 判別可能なユニオンの型ガード

```typescript
type Success = {
  success: true;
  data: any;
};

type Failure = {
  success: false;
  error: string;
};

type Result = Success | Failure;

function isSuccess(result: Result): result is Success {
  return result.success === true;
}
```

**ポイント:**
- 判別子プロパティを使った型ガード
- `result.success` で型を判別
- より明示的で再利用可能
- 複雑な条件でも関数として分離できる

### 問題11: クラスインスタンスの型ガード

```typescript
class Rectangle {
  constructor(
    public width: number,
    public height: number
  ) {}

  getArea(): number {
    return this.width * this.height;
  }
}

class Circle {
  constructor(public radius: number) {}

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

type Shape = Rectangle | Circle;

function getArea(shape: Shape): number {
  if (shape instanceof Rectangle) {
    return shape.getArea();
  }
  return shape.getArea();
}
```

**ポイント:**
- `instanceof` でクラスを判別
- クラスのメソッドやプロパティに型安全にアクセス
- オブジェクト指向プログラミングとの相性が良い

### 問題14: switch文による型の絞り込み

```typescript
type Input =
  | { type: 'text'; value: string }
  | { type: 'number'; value: number }
  | { type: 'checkbox'; checked: boolean };

function getValue(input: Input): string | number | boolean {
  switch (input.type) {
    case 'text':
      return input.value;
    case 'number':
      return input.value;
    case 'checkbox':
      return input.checked;
  }
}
```

**ポイント:**
- `switch` 文でも型ガードが機能
- 各 `case` 内で型が自動的に絞り込まれる
- 判別可能なユニオンと相性が良い
- **網羅性チェック** が自動的に行われる

### 問題15: 複雑な型ガードの組み合わせ

```typescript
type APIResponse<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: { code: number; message: string } }
  | { status: 'loading' };

function handleResponse<T>(response: APIResponse<T>): void {
  switch (response.status) {
    case 'success':
      console.log('Data:', response.data);
      break;
    case 'error':
      console.log(`Error ${response.error.code}: ${response.error.message}`);
      break;
    case 'loading':
      console.log('Loading...');
      break;
  }
}
```

**ポイント:**
- ジェネリクスと型ガードの組み合わせ
- APIレスポンスの処理で頻繁に使用されるパターン
- 各状態で異なるプロパティにアクセス
- 型安全に非同期処理の状態を管理

## 型ガードのベストプラクティス

### 1. 適切な型ガードを選択する

```typescript
// プリミティブ型 → typeof
if (typeof value === 'string') { /* ... */ }

// クラスインスタンス → instanceof
if (value instanceof Date) { /* ... */ }

// プロパティの存在 → in
if ('property' in obj) { /* ... */ }

// 判別子プロパティ → 直接比較
if (result.success) { /* ... */ }

// 複雑な条件 → ユーザー定義型ガード
if (isUser(obj)) { /* ... */ }
```

### 2. null チェックを忘れない

```typescript
function processValue(value: unknown): void {
  // ❌ 悪い例
  if (typeof value === 'object' && 'property' in value) {
    // value が null の場合エラー
  }

  // ✅ 良い例
  if (typeof value === 'object' && value !== null && 'property' in value) {
    // 安全
  }
}
```

### 3. ユーザー定義型ガードを再利用する

```typescript
// ユーティリティとして定義
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

// 複数箇所で使用
if (isString(value1)) { /* ... */ }
if (isString(value2)) { /* ... */ }
```

### 4. 型ガードを組み合わせる

```typescript
function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

function isPositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && value > 0;
}
```

## 高度な型ガード

### 1. Assertion Functions（TypeScript 3.7+）

```typescript
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Value is not a string');
  }
}

const value: unknown = 'hello';
assertIsString(value);
// この行以降、value は string 型として扱われる
console.log(value.toUpperCase());
```

### 2. 型ガードと型の絞り込み

```typescript
function processValue(value: string | number | null) {
  if (value === null) {
    return 'null';
  }
  // ここでは value は string | number

  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  // ここでは value は number
  return value * 2;
}
```

### 3. 配列の filter と型ガード

```typescript
const values: (string | number)[] = [1, 'a', 2, 'b'];

// ❌ 型が絞り込まれない
const strings1 = values.filter(v => typeof v === 'string');
// strings1 の型: (string | number)[]

// ✅ 型が絞り込まれる
const strings2 = values.filter((v): v is string => typeof v === 'string');
// strings2 の型: string[]
```

## 実践的なユースケース

### 1. APIレスポンスの検証

```typescript
interface ApiResponse {
  status: number;
  data: unknown;
}

function isValidApiResponse(obj: unknown): obj is ApiResponse {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'status' in obj &&
    'data' in obj &&
    typeof (obj as ApiResponse).status === 'number'
  );
}
```

### 2. イベントハンドラー

```typescript
function handleEvent(event: Event): void {
  if (event instanceof MouseEvent) {
    console.log(`Mouse: ${event.clientX}, ${event.clientY}`);
  } else if (event instanceof KeyboardEvent) {
    console.log(`Key: ${event.key}`);
  }
}
```

### 3. ユニオン型の処理

```typescript
type Pet = Dog | Cat | Bird;

function makeSound(pet: Pet): void {
  if ('bark' in pet) {
    pet.bark();
  } else if ('meow' in pet) {
    pet.meow();
  } else {
    pet.chirp();
  }
}
```

## まとめ

型ガードは TypeScript の核心的な機能で、以下のような利点があります：

- **型安全性**: ランタイムの型チェックとコンパイル時の型推論を結合
- **柔軟性**: 様々な方法で型を絞り込める
- **保守性**: 型情報がコード全体に伝播する
- **エラー防止**: 型エラーをコンパイル時に検出

適切な型ガードを使用することで、より安全で保守しやすいコードを書くことができます。
