# Chapter 5: 型の高度な使い方

## 📚 学習内容

このチャプターでは、TypeScript の高度な型機能について学びます。

### このチャプターで学ぶこと
- ユニオン型（Union Types）
- 交差型（Intersection Types）
- リテラル型（Literal Types）
- 型ガード（Type Guards）
- 型アサーション（Type Assertion）

---

## 1. ユニオン型（Union Types）

ユニオン型は、複数の型のうちいずれかの型を持つ値を表現します。`|` で区切って定義します。

### 基本的なユニオン型

```typescript
// string または number
let value: string | number;

value = 'hello';  // OK
value = 42;       // OK
// value = true;  // エラー

// 関数の引数でユニオン型を使用
function printId(id: string | number): void {
  console.log(`ID: ${id}`);
}

printId(101);      // OK
printId('abc123'); // OK
```

### ユニオン型の絞り込み

```typescript
function formatValue(value: string | number): string {
  // typeof を使った型ガード
  if (typeof value === 'string') {
    // この中では value は string 型
    return value.toUpperCase();
  } else {
    // この中では value は number 型
    return value.toFixed(2);
  }
}
```

### 複数の型の配列

```typescript
// number または string の配列
let mixedArray: (number | string)[];
mixedArray = [1, 'two', 3, 'four'];

// 型エイリアスと組み合わせ
type ID = string | number;
let userId: ID = 123;
let productId: ID = 'prod-456';
```

### ユニオン型とオブジェクト

```typescript
type Success = {
  status: 'success';
  data: any;
};

type Error = {
  status: 'error';
  message: string;
};

type Result = Success | Error;

function handleResult(result: Result): void {
  if (result.status === 'success') {
    console.log('Data:', result.data);
  } else {
    console.log('Error:', result.message);
  }
}
```

---

## 2. 交差型（Intersection Types）

交差型は、複数の型を組み合わせて1つの型にします。`&` で定義します。

### 基本的な交差型

```typescript
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: string;
  department: string;
};

// Person と Employee の両方のプロパティを持つ
type Staff = Person & Employee;

const staff: Staff = {
  name: 'Alice',
  age: 30,
  employeeId: 'E001',
  department: 'Engineering'
};
```

### Mixin パターン

```typescript
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type WithId = {
  id: string;
};

type User = {
  name: string;
  email: string;
};

// 複数の型を組み合わせる
type UserRecord = User & WithId & Timestamped;

const user: UserRecord = {
  id: '123',
  name: 'Bob',
  email: 'bob@example.com',
  createdAt: new Date(),
  updatedAt: new Date()
};
```

### ユニオン型と交差型の組み合わせ

```typescript
type Admin = {
  role: 'admin';
  permissions: string[];
};

type RegularUser = {
  role: 'user';
  limitedAccess: boolean;
};

// 管理者または通常ユーザー、両方とも ID を持つ
type AuthenticatedUser = (Admin | RegularUser) & WithId;
```

---

## 3. リテラル型（Literal Types）

リテラル型は、特定の値のみを許可する型です。

### 文字列リテラル型

```typescript
// 'small', 'medium', 'large' のいずれかのみ許可
type Size = 'small' | 'medium' | 'large';

let shirtSize: Size;
shirtSize = 'medium';  // OK
// shirtSize = 'extra-large';  // エラー

function setSize(size: Size): void {
  console.log(`Size set to: ${size}`);
}

setSize('small');  // OK
```

### 数値リテラル型

```typescript
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function rollDice(): DiceRoll {
  return (Math.floor(Math.random() * 6) + 1) as DiceRoll;
}

// 特定の数値のみ許可
type HttpSuccessCode = 200 | 201 | 204;
type HttpErrorCode = 400 | 401 | 403 | 404 | 500;
type HttpCode = HttpSuccessCode | HttpErrorCode;
```

### boolean リテラル型

```typescript
// true のみ許可
type AlwaysTrue = true;

let agreed: AlwaysTrue = true;
// let disagreed: AlwaysTrue = false;  // エラー
```

### オブジェクトとリテラル型

```typescript
type Circle = {
  kind: 'circle';
  radius: number;
};

type Rectangle = {
  kind: 'rectangle';
  width: number;
  height: number;
};

type Shape = Circle | Rectangle;

function getArea(shape: Shape): number {
  // kind プロパティで型を判別
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2;
  } else {
    return shape.width * shape.height;
  }
}
```

---

## 4. 型ガード（Type Guards）

型ガードは、条件分岐の中で型を絞り込む仕組みです。

### typeof による型ガード

```typescript
function padLeft(value: string, padding: string | number): string {
  if (typeof padding === 'number') {
    // padding は number 型
    return ' '.repeat(padding) + value;
  }
  // padding は string 型
  return padding + value;
}
```

### instanceof による型ガード

```typescript
class Dog {
  bark(): void {
    console.log('Woof!');
  }
}

class Cat {
  meow(): void {
    console.log('Meow!');
  }
}

function makeSound(animal: Dog | Cat): void {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

### in による型ガード

```typescript
type Fish = {
  swim: () => void;
};

type Bird = {
  fly: () => void;
};

function move(animal: Fish | Bird): void {
  if ('swim' in animal) {
    animal.swim();
  } else {
    animal.fly();
  }
}
```

### ユーザー定義型ガード

```typescript
// 型述語（type predicate）を使用
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processValue(value: unknown): void {
  if (isString(value)) {
    // value は string 型として扱われる
    console.log(value.toUpperCase());
  }
}

// オブジェクトの型ガード
interface User {
  name: string;
  email: string;
}

function isUser(obj: any): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.name === 'string' &&
    typeof obj.email === 'string'
  );
}
```

### 判別可能なユニオン（Discriminated Unions）

```typescript
type LoadingState = {
  state: 'loading';
};

type SuccessState = {
  state: 'success';
  data: string;
};

type ErrorState = {
  state: 'error';
  error: Error;
};

type State = LoadingState | SuccessState | ErrorState;

function renderState(state: State): string {
  // state プロパティで型を判別
  switch (state.state) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return `Data: ${state.data}`;
    case 'error':
      return `Error: ${state.error.message}`;
  }
}
```

---

## 5. 型アサーション（Type Assertion）

型アサーションは、TypeScript に「この値の型は私が知っている」と伝える方法です。

### as 構文

```typescript
// DOM 要素の型アサーション
const input = document.getElementById('username') as HTMLInputElement;
input.value = 'Alice';

// 型を明示的に指定
let someValue: unknown = 'this is a string';
let strLength: number = (someValue as string).length;
```

### 山括弧構文（JSX では使用不可）

```typescript
let value: unknown = 'hello';
let length: number = (<string>value).length;
```

### const アサーション

```typescript
// 通常のオブジェクト（プロパティは変更可能）
const config1 = {
  host: 'localhost',
  port: 3000
};
// config1.port = 4000;  // OK

// as const でリテラル型として固定
const config2 = {
  host: 'localhost',
  port: 3000
} as const;
// config2.port = 4000;  // エラー：readonly

// 配列を readonly タプルとして扱う
const colors = ['red', 'green', 'blue'] as const;
// colors[0] = 'yellow';  // エラー
// type は readonly ['red', 'green', 'blue']
```

### 非 null アサーション

```typescript
// ! 演算子で null/undefined でないことを保証
function processName(name: string | null): void {
  // name が null でないことを確信している場合
  console.log(name!.toUpperCase());
}

// DOM 要素の場合
const element = document.getElementById('app')!;
element.innerHTML = 'Hello';
```

### ダブルアサーション（推奨されない）

```typescript
// unknown を経由して任意の型に変換（型安全性が失われる）
const value = 'hello' as unknown as number;  // 危険！
```

---

## 6. 高度な型の組み合わせ例

### オプショナルチェーンと型ガード

```typescript
type Address = {
  street: string;
  city: string;
};

type Person = {
  name: string;
  address?: Address;
};

function getCity(person: Person): string {
  // オプショナルチェーンと Nullish Coalescing
  return person.address?.city ?? 'Unknown';
}
```

### 型の絞り込みパターン

```typescript
type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function handleResponse<T>(response: ApiResponse<T>): T | null {
  if (response.success) {
    return response.data;
  } else {
    console.error(response.error);
    return null;
  }
}
```

---

## 7. ベストプラクティス

### 1. ユニオン型 vs any

```typescript
// ❌ Bad：any は型安全性を失う
function process(value: any): void {
  value.toUpperCase();  // 実行時エラーの可能性
}

// ✅ Good：ユニオン型で明示的に
function processValue(value: string | number): void {
  if (typeof value === 'string') {
    value.toUpperCase();  // 型安全
  }
}
```

### 2. 型ガードの活用

```typescript
// ✅ Good：型ガードで安全に処理
function getLength(value: string | any[]): number {
  if (typeof value === 'string') {
    return value.length;
  }
  return value.length;
}
```

### 3. リテラル型で厳密に

```typescript
// ✅ Good：リテラル型で許可する値を制限
type Status = 'pending' | 'approved' | 'rejected';

function updateStatus(status: Status): void {
  // status は3つの値のみ
}
```

---

## 8. 練習問題

このディレクトリの `exercises/` フォルダに以下の練習問題があります：

1. **01-union-types.ts** - ユニオン型の基本と応用
2. **02-intersection-types.ts** - 交差型とMixinパターン
3. **03-literal-types.ts** - リテラル型と判別可能なユニオン
4. **04-type-guards.ts** - 各種型ガードの実装
5. **05-type-assertions.ts** - 型アサーションの適切な使用

解答例は `solutions/` フォルダにあります。

---

## 9. まとめ

- **ユニオン型**（`A | B`）は「AまたはB」を表現
- **交差型**（`A & B`）は「AかつB」を表現
- **リテラル型**は特定の値のみを許可
- **型ガード**で条件分岐内で型を絞り込む
  - `typeof`, `instanceof`, `in`, ユーザー定義型ガード
- **型アサーション**（`as`）で型を明示的に指定
- **判別可能なユニオン**でタグ付き型を実現

次のチャプターでは、ジェネリクスを使った型の抽象化と再利用について学びます。
