# Chapter 2: 高度な型操作

TypeScript の高度な型操作技法について学びます。Mapped Types、Conditional Types、Template Literal Types などの強力な型レベルプログラミングを習得します。

## 目次

1. [Mapped Types](#1-mapped-types)
2. [Conditional Types](#2-conditional-types)
3. [Template Literal Types](#3-template-literal-types)
4. [高度なユーティリティ型](#4-高度なユーティリティ型)

---

## 1. Mapped Types

Mapped Types は、既存の型から新しい型を生成する強力な機能です。

### 1.1 基本的な Mapped Types

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};

interface User {
  id: number;
  name: string;
  email: string;
}

type ReadonlyUser = Readonly<User>;
// {
//   readonly id: number;
//   readonly name: string;
//   readonly email: string;
// }

type OptionalUser = Optional<User>;
// {
//   id?: number;
//   name?: string;
//   email?: string;
// }
```

### 1.2 Mapped Types の修飾子

```typescript
// readonly 修飾子の追加
type ReadonlyFields<T> = {
  readonly [P in keyof T]: T[P];
};

// readonly 修飾子の削除
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

// オプショナル修飾子の追加
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// オプショナル修飾子の削除
type Required<T> = {
  [P in keyof T]-?: T[P];
};

interface Config {
  readonly apiUrl: string;
  readonly timeout?: number;
}

type MutableConfig = Mutable<Config>;
// {
//   apiUrl: string;
//   timeout?: number;
// }

type RequiredConfig = Required<Config>;
// {
//   readonly apiUrl: string;
//   readonly timeout: number;
// }
```

### 1.3 型の変換を伴う Mapped Types

```typescript
// すべてのプロパティを string 型に変換
type Stringify<T> = {
  [P in keyof T]: string;
};

// すべてのプロパティを Promise でラップ
type Promisify<T> = {
  [P in keyof T]: Promise<T[P]>;
};

interface Data {
  id: number;
  name: string;
  active: boolean;
}

type StringifiedData = Stringify<Data>;
// {
//   id: string;
//   name: string;
//   active: string;
// }

type AsyncData = Promisify<Data>;
// {
//   id: Promise<number>;
//   name: Promise<string>;
//   active: Promise<boolean>;
// }
```

### 1.4 Key Remapping (as 句)

TypeScript 4.1 以降では、`as` 句を使ってキー名を変更できます。

```typescript
// すべてのキー名を大文字に変換
type Uppercase<T> = {
  [P in keyof T as Uppercase<string & P>]: T[P];
};

// getter メソッドの型を生成
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// {
//   getName: () => string;
//   getAge: () => number;
// }
```

---

## 2. Conditional Types

Conditional Types は、型レベルでの条件分岐を可能にします。

### 2.1 基本的な Conditional Types

```typescript
T extends U ? X : Y

// 例: string 型なら true、そうでなければ false
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// 配列から要素の型を取り出す
type ElementType<T> = T extends (infer E)[] ? E : T;

type C = ElementType<string[]>; // string
type D = ElementType<number>;   // number
```

### 2.2 分配的 Conditional Types

ユニオン型に対して Conditional Types を適用すると、各メンバーに対して分配されます。

```typescript
type ToArray<T> = T extends any ? T[] : never;

type StrOrNumArray = ToArray<string | number>;
// string[] | number[]
// (string | number)[] ではない！

// 分配を防ぐには [] で囲む
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type StrOrNumArray2 = ToArrayNonDist<string | number>;
// (string | number)[]
```

### 2.3 infer キーワード

`infer` を使うと、型の一部を推論して取り出せます。

```typescript
// 関数の戻り値の型を取得
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { id: 1, name: '太郎' };
}

type User = ReturnType<typeof getUser>;
// { id: number; name: string; }

// Promise の中身の型を取得
type Awaited<T> = T extends Promise<infer U> ? U : T;

type AsyncNumber = Awaited<Promise<number>>; // number
type SyncString = Awaited<string>;           // string

// 配列の要素型を取得
type ArrayElement<T> = T extends (infer E)[] ? E : never;

type NumElement = ArrayElement<number[]>; // number
```

### 2.4 再帰的 Conditional Types

TypeScript 4.1 以降では、再帰的な Conditional Types が使えます。

```typescript
// ネストした配列を平坦化
type Flatten<T> = T extends Array<infer U>
  ? U extends Array<any>
    ? Flatten<U>
    : U
  : T;

type Deep = number[][][];
type Flat = Flatten<Deep>; // number

// 深くネストしたオブジェクトをすべて readonly に
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

interface NestedData {
  user: {
    profile: {
      name: string;
      age: number;
    };
  };
}

type ReadonlyNestedData = DeepReadonly<NestedData>;
// {
//   readonly user: {
//     readonly profile: {
//       readonly name: string;
//       readonly age: number;
//     };
//   };
// }
```

---

## 3. Template Literal Types

Template Literal Types を使うと、文字列リテラル型を操作できます（TypeScript 4.1+）。

### 3.1 基本的な Template Literal Types

```typescript
type World = 'world';
type Greeting = `hello ${World}`; // "hello world"

// ユニオン型との組み合わせ
type Color = 'red' | 'blue' | 'green';
type HexColor = `#${Color}`;
// "#red" | "#blue" | "#green"

// 複数のユニオン型の組み合わせ
type VerticalAlignment = 'top' | 'middle' | 'bottom';
type HorizontalAlignment = 'left' | 'center' | 'right';
type Alignment = `${VerticalAlignment}-${HorizontalAlignment}`;
// "top-left" | "top-center" | "top-right" | ...
```

### 3.2 組み込み文字列操作型

```typescript
type Uppercase<S extends string> = intrinsic;
type Lowercase<S extends string> = intrinsic;
type Capitalize<S extends string> = intrinsic;
type Uncapitalize<S extends string> = intrinsic;

type Loud = Uppercase<'hello'>; // "HELLO"
type Quiet = Lowercase<'HELLO'>; // "hello"
type Capital = Capitalize<'hello'>; // "Hello"
type Small = Uncapitalize<'Hello'>; // "hello"
```

### 3.3 実践的な使用例

```typescript
// イベント名の型を生成
type EventName = 'click' | 'focus' | 'blur';
type EventHandler = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus" | "onBlur"

// getter/setter の型を生成
type Getter<T> = `get${Capitalize<T & string>}`;
type Setter<T> = `set${Capitalize<T & string>}`;

type UserFields = 'name' | 'age' | 'email';
type UserGetters = Getter<UserFields>;
// "getName" | "getAge" | "getEmail"
type UserSetters = Setter<UserFields>;
// "setName" | "setAge" | "setEmail"
```

### 3.4 Template Literal Types と infer

```typescript
// イベントハンドラー名からイベント名を抽出
type ExtractEventName<T> = T extends `on${infer E}` ? E : never;

type EventName = ExtractEventName<'onClick'>; // "Click"

// パスから最後のセグメントを取得
type LastSegment<T> = T extends `${infer _}/${infer Rest}`
  ? LastSegment<Rest>
  : T;

type FileName = LastSegment<'path/to/file.txt'>; // "file.txt"
```

---

## 4. 高度なユーティリティ型

### 4.1 組み込みユーティリティ型の復習

```typescript
// Partial<T> - すべてのプロパティをオプショナルに
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Required<T> - すべてのプロパティを必須に
type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Readonly<T> - すべてのプロパティを読み取り専用に
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Pick<T, K> - 特定のプロパティのみ選択
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Omit<T, K> - 特定のプロパティを除外
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// Record<K, T> - キーと値の型を指定したオブジェクト型
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

### 4.2 カスタムユーティリティ型

```typescript
// DeepPartial - ネストしたオブジェクトもすべてオプショナルに
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Nullable - すべてのプロパティに null を許可
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// NonNullableFields - すべてのプロパティから null/undefined を除去
type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

// PickByType - 特定の型のプロパティのみ抽出
type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

interface Mixed {
  id: number;
  name: string;
  age: number;
  active: boolean;
}

type StringFields = PickByType<Mixed, string>;
// { name: string; }

type NumberFields = PickByType<Mixed, number>;
// { id: number; age: number; }
```

### 4.3 関数型のユーティリティ

```typescript
// Parameters<T> - 関数の引数の型をタプルで取得
type Parameters<T extends (...args: any) => any> =
  T extends (...args: infer P) => any ? P : never;

// ReturnType<T> - 関数の戻り値の型を取得
type ReturnType<T extends (...args: any) => any> =
  T extends (...args: any) => infer R ? R : any;

function greet(name: string, age: number) {
  return `Hello, ${name}! You are ${age} years old.`;
}

type GreetParams = Parameters<typeof greet>; // [string, number]
type GreetReturn = ReturnType<typeof greet>; // string

// ConstructorParameters<T> - コンストラクタの引数型
type ConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never;

// InstanceType<T> - コンストラクタのインスタンス型
type InstanceType<T extends new (...args: any) => any> =
  T extends new (...args: any) => infer R ? R : any;

class Person {
  constructor(public name: string, public age: number) {}
}

type PersonParams = ConstructorParameters<typeof Person>; // [string, number]
type PersonInstance = InstanceType<typeof Person>; // Person
```

### 4.4 高度なパターン

```typescript
// ユニオン型から交差型を作る
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

type Union = { a: string } | { b: number };
type Intersection = UnionToIntersection<Union>;
// { a: string } & { b: number }

// オブジェクトのネストしたパスの型
type PathValue<T, P extends string> =
  P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
      ? PathValue<T[K], Rest>
      : never
    : P extends keyof T
      ? T[P]
      : never;

interface User {
  profile: {
    name: string;
    address: {
      city: string;
      zip: string;
    };
  };
}

type City = PathValue<User, 'profile.address.city'>; // string

// Mutable - readonly を削除
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

// Required な値のみ抽出
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

// Optional な値のみ抽出
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

interface Data {
  id: number;
  name: string;
  email?: string;
  phone?: string;
}

type Required = RequiredKeys<Data>; // "id" | "name"
type Optional = OptionalKeys<Data>; // "email" | "phone"
```

---

## まとめ

このチャプターで学んだこと：

1. **Mapped Types**: 既存の型から新しい型を生成、修飾子の操作、キーの変換
2. **Conditional Types**: 型レベルの条件分岐、`infer` による型推論、再帰的な型定義
3. **Template Literal Types**: 文字列リテラル型の操作、組み込み文字列操作型
4. **高度なユーティリティ型**: カスタムユーティリティ型の作成、型レベルプログラミング

次のステップ：
- `exercises/` フォルダの練習問題に取り組む
- 実際のプロジェクトで高度な型操作を活用する
- 次のチャプター（型定義ファイル）に進む
