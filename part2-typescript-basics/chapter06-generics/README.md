# Chapter 6: ジェネリクス

## 📚 学習内容

このチャプターでは、TypeScript のジェネリクスについて学びます。

### このチャプターで学ぶこと
- ジェネリクスの基本
- ジェネリック関数
- ジェネリッククラス
- ジェネリック制約（extends）
- 複数の型パラメータ
- ユーティリティ型

---

## 1. ジェネリクスとは

ジェネリクスは、型を引数として受け取ることで、汎用的で再利用可能なコンポーネントを作成する機能です。

### なぜジェネリクスが必要か

```typescript
// ❌ 型が失われる（any を使用）
function identityAny(arg: any): any {
  return arg;
}

const result1 = identityAny('hello'); // result1 の型は any

// ✅ ジェネリクスで型を保持
function identity<T>(arg: T): T {
  return arg;
}

const result2 = identity('hello'); // result2 の型は string
const result3 = identity(42);      // result3 の型は number
```

---

## 2. ジェネリック関数

### 基本的なジェネリック関数

```typescript
// T は型パラメータ（Type Parameter）
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const num = firstElement([1, 2, 3]);      // num: number | undefined
const str = firstElement(['a', 'b', 'c']); // str: string | undefined
```

### 複数の引数を持つジェネリック関数

```typescript
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p1 = pair('hello', 42);       // [string, number]
const p2 = pair(true, 'world');     // [boolean, string]
```

### 明示的な型指定

```typescript
// 型推論に任せる
const result1 = identity('hello');

// 明示的に型を指定
const result2 = identity<string>('hello');
const result3 = identity<number>(42);
```

---

## 3. ジェネリック制約（Generic Constraints）

### extends を使った制約

```typescript
// T は length プロパティを持つ型のみ受け付ける
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength('hello');           // OK: string has length
logLength([1, 2, 3]);         // OK: array has length
logLength({ length: 10 });    // OK: object has length
// logLength(42);             // エラー: number に length はない
```

### keyof を使った制約

```typescript
// K は T のキーのいずれか
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = {
  name: 'Alice',
  age: 30
};

const name = getProperty(person, 'name');  // string
const age = getProperty(person, 'age');    // number
// getProperty(person, 'email');           // エラー: 'email' は存在しない
```

### 複数の制約

```typescript
interface Nameable {
  name: string;
}

interface Ageable {
  age: number;
}

// T は Nameable と Ageable の両方を満たす必要がある
function createPerson<T extends Nameable & Ageable>(data: T): T {
  console.log(`${data.name} is ${data.age} years old`);
  return data;
}
```

---

## 4. ジェネリッククラス

### 基本的なジェネリッククラス

```typescript
class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const numberBox = new Box<number>(42);
console.log(numberBox.getValue());  // 42

const stringBox = new Box<string>('hello');
console.log(stringBox.getValue());  // "hello"
```

### ジェネリッククラスのメソッド

```typescript
class Container<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  remove(): T | undefined {
    return this.items.pop();
  }

  getAll(): T[] {
    return [...this.items];
  }
}

const numberContainer = new Container<number>();
numberContainer.add(1);
numberContainer.add(2);
console.log(numberContainer.getAll());  // [1, 2]
```

---

## 5. ジェネリックインターフェース

### 基本的なジェネリックインターフェース

```typescript
interface Pair<T, U> {
  first: T;
  second: U;
}

const p1: Pair<string, number> = {
  first: 'hello',
  second: 42
};

const p2: Pair<boolean, string> = {
  first: true,
  second: 'world'
};
```

### ジェネリック関数型

```typescript
interface Transformer<T, U> {
  (input: T): U;
}

const numberToString: Transformer<number, string> = (n) => {
  return n.toString();
};

const stringToBoolean: Transformer<string, boolean> = (s) => {
  return s.length > 0;
};
```

---

## 6. デフォルト型パラメータ

```typescript
// T のデフォルト型は string
interface Response<T = string> {
  data: T;
  status: number;
}

const response1: Response = {
  data: 'hello',
  status: 200
};

const response2: Response<number> = {
  data: 42,
  status: 200
};
```

---

## 7. 実践的な例

### 配列のラッパー

```typescript
class List<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  filter(predicate: (item: T) => boolean): List<T> {
    const newList = new List<T>();
    this.items.filter(predicate).forEach(item => newList.add(item));
    return newList;
  }

  map<U>(mapper: (item: T) => U): List<U> {
    const newList = new List<U>();
    this.items.map(mapper).forEach(item => newList.add(item));
    return newList;
  }
}
```

### API レスポンスの型

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<ApiResponse<User>> {
  // API呼び出しのシミュレーション
  return {
    data: { id, name: 'Alice', email: 'alice@example.com' },
    status: 200,
    message: 'Success'
  };
}
```

### 辞書型

```typescript
class Dictionary<K extends string | number, V> {
  private items: Record<K, V> = {} as Record<K, V>;

  set(key: K, value: V): void {
    this.items[key] = value;
  }

  get(key: K): V | undefined {
    return this.items[key];
  }

  has(key: K): boolean {
    return key in this.items;
  }

  keys(): K[] {
    return Object.keys(this.items) as K[];
  }

  values(): V[] {
    return Object.values(this.items);
  }
}
```

---

## 8. ユーティリティ型

TypeScript には便利な組み込みジェネリック型があります。

### Partial<T>

全てのプロパティをオプショナルにする

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

// すべてのプロパティがオプショナル
type PartialUser = Partial<User>;

const user: PartialUser = {
  name: 'Alice'
  // age と email は省略可能
};
```

### Required<T>

全てのプロパティを必須にする

```typescript
interface Config {
  host?: string;
  port?: number;
}

type RequiredConfig = Required<Config>;

const config: RequiredConfig = {
  host: 'localhost',
  port: 3000
  // すべて必須
};
```

### Readonly<T>

全てのプロパティを読み取り専用にする

```typescript
interface Point {
  x: number;
  y: number;
}

const point: Readonly<Point> = { x: 10, y: 20 };
// point.x = 30;  // エラー: 読み取り専用
```

### Pick<T, K>

指定したプロパティのみを抽出

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UserPreview = Pick<User, 'id' | 'name'>;

const preview: UserPreview = {
  id: 1,
  name: 'Alice'
  // email と age は含まれない
};
```

### Omit<T, K>

指定したプロパティを除外

```typescript
type UserWithoutEmail = Omit<User, 'email'>;

const user: UserWithoutEmail = {
  id: 1,
  name: 'Alice',
  age: 30
  // email は含まれない
};
```

### Record<K, T>

キーと値の型を指定した辞書型

```typescript
type Role = 'admin' | 'user' | 'guest';
type Permissions = Record<Role, string[]>;

const permissions: Permissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
};
```

---

## 9. 高度なジェネリクスパターン

### 条件型（Conditional Types）

```typescript
// T が配列なら要素の型を、そうでなければ T をそのまま返す
type Unwrap<T> = T extends Array<infer U> ? U : T;

type A = Unwrap<string[]>;  // string
type B = Unwrap<number>;    // number
```

### Mapped Types

```typescript
// すべてのプロパティを nullable にする
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

interface User {
  name: string;
  age: number;
}

type NullableUser = Nullable<User>;
// { name: string | null; age: number | null }
```

---

## 10. ベストプラクティス

### 1. 適切な型パラメータ名を使う

```typescript
// ✅ Good: 意味のある名前
function createPair<TFirst, TSecond>(first: TFirst, second: TSecond) {
  return { first, second };
}

// ⚠️ 一般的な慣習: T, U, V, K（Key）, V（Value）
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}
```

### 2. 過度なジェネリクスを避ける

```typescript
// ❌ Bad: 不必要に複雑
function process<T, U, V, W>(a: T, b: U, c: V, d: W) {
  // ...
}

// ✅ Good: シンプルに
function process(name: string, age: number) {
  // ...
}
```

### 3. 制約を活用する

```typescript
// ✅ Good: 制約で型安全性を向上
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}
```

---

## 11. 練習問題

このディレクトリの `exercises/` フォルダに以下の練習問題があります：

1. **01-basic-generics.ts** - ジェネリクスの基本
2. **02-generic-constraints.ts** - ジェネリック制約
3. **03-generic-classes.ts** - ジェネリッククラス
4. **04-utility-types.ts** - ユーティリティ型の活用
5. **05-advanced-generics.ts** - 高度なジェネリクスパターン

解答例は `solutions/` フォルダにあります。

---

## 12. まとめ

- **ジェネリクス**は型を引数として受け取る機能
- **型パラメータ**（`<T>`）で汎用的なコードを作成
- **ジェネリック制約**（`extends`）で型を制限
- **ジェネリッククラス**でコンテナなどを実装
- **ユーティリティ型**（`Partial`, `Pick`, `Omit` など）で型を変換
- 適切に使うことで、型安全性と再利用性が向上

これで Part 2（TypeScript 基礎編）が完了です！
次は Part 3（TypeScript 実践編）で、クラスの型定義や高度な型操作を学びます。
