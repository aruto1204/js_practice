# 高度なジェネリクスパターン 解説

## 概要

高度なジェネリクスパターンでは、条件型（Conditional Types）、Mapped Types、`infer` キーワード、テンプレートリテラル型などを組み合わせて、複雑な型変換を実現します。これらのパターンを理解することで、TypeScript の型システムを最大限に活用できます。

## 基本概念

### 条件型（Conditional Types）

```typescript
// 条件型の基本構文
type Condition<T> = T extends SomeType ? TrueType : FalseType;
```

### Mapped Types

```typescript
// Mapped Types の基本構文
type Mapped<T> = {
  [K in keyof T]: TransformedType;
};
```

### infer キーワード

```typescript
// infer で型を推論
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

## 各問題の解説

### 問題1: 条件型の基本（Unwrap）

```typescript
type Unwrap<T> = T extends Array<infer U> ? U : T;
```

**ポイント:**
- `T extends Array<infer U>` で T が配列かどうかを判定
- `infer U` で配列の要素型を推論
- 配列なら要素型 `U` を、そうでなければ `T` をそのまま返す

**型の評価:**
```typescript
type A = Unwrap<number[]>;    // number（配列なので要素型を返す）
type B = Unwrap<string>;      // string（配列でないのでそのまま）
type C = Unwrap<Array<boolean>>; // boolean
type D = Unwrap<[1, 2, 3]>;   // 1 | 2 | 3（タプル）
```

**使用例:**
```typescript
// 配列の要素型を取得
function first<T>(arr: T[]): Unwrap<T[]> {
  return arr[0];
}

const nums = [1, 2, 3];
const firstNum = first(nums); // number
```

### 問題2: infer の使用（MyAwaited）

```typescript
type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;
```

**ポイント:**
- **再帰的な条件型**: ネストした Promise も展開
- `Promise<infer U>` で Promise の内部型を推論
- Promise でなくなるまで再帰的に展開

**型の評価:**
```typescript
type A = MyAwaited<Promise<string>>;           // string
type B = MyAwaited<Promise<Promise<number>>>;  // number（再帰で展開）
type C = MyAwaited<Promise<Promise<Promise<boolean>>>>; // boolean
type D = MyAwaited<string>;                    // string（Promise でない）
```

**再帰の流れ:**
```
MyAwaited<Promise<Promise<number>>>
  → T = Promise<Promise<number>>
  → T extends Promise<infer U> ? → Yes, U = Promise<number>
  → MyAwaited<Promise<number>>
  → T = Promise<number>
  → T extends Promise<infer U> ? → Yes, U = number
  → MyAwaited<number>
  → T = number
  → T extends Promise<infer U> ? → No
  → number
```

### 問題3: Mapped Types の基本（ReadonlyAll）

```typescript
type ReadonlyAll<T> = {
  readonly [K in keyof T]: T[K];
};
```

**ポイント:**
- `[K in keyof T]` で T のすべてのキーをイテレート
- `readonly` 修飾子で読み取り専用に
- 組み込みの `Readonly<T>` と同等

**型の評価:**
```typescript
interface User {
  name: string;
  age: number;
}

type ReadonlyUser = ReadonlyAll<User>;
// {
//   readonly name: string;
//   readonly age: number;
// }
```

**使用例:**
```typescript
const user: ReadonlyUser = { name: 'Alice', age: 30 };
user.name = 'Bob'; // エラー: 読み取り専用プロパティに代入できない
```

### 問題4: Mapped Types とユニオン（Nullable）

```typescript
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
```

**ポイント:**
- 各プロパティの型に `| null` を追加
- データベースの nullable カラムを表現するのに便利
- フォームの初期状態などで使用

**型の評価:**
```typescript
interface User {
  name: string;
  age: number;
}

type NullableUser = Nullable<User>;
// {
//   name: string | null;
//   age: number | null;
// }
```

**使用例:**
```typescript
const user: NullableUser = {
  name: 'Alice',
  age: null  // OK: null を許容
};
```

### 問題5: 条件型と Mapped Types の組み合わせ（FunctionProps）

```typescript
type FunctionProps<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer R
    ? () => R
    : T[K];
};
```

**ポイント:**
- 各プロパティが関数かどうかを判定
- 関数なら引数なしの関数に変換、戻り値の型は保持
- 関数でなければそのまま

**型の評価:**
```typescript
interface Original {
  getName: (prefix: string) => string;
  getAge: () => number;
  email: string;
}

type Transformed = FunctionProps<Original>;
// {
//   getName: () => string;    // 引数が削除された
//   getAge: () => number;     // 元から引数なし
//   email: string;            // 関数でないのでそのまま
// }
```

### 問題6: DeepPartial の実装

```typescript
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? T[K] extends Array<infer U>
      ? Array<DeepPartial<U>>
      : DeepPartial<T[K]>
    : T[K];
};
```

**ポイント:**
- **再帰的な Partial**: ネストしたオブジェクトもすべてオプショナルに
- 配列の場合は要素に対して再帰
- プリミティブ型はそのまま

**型の評価:**
```typescript
interface User {
  name: string;
  address: {
    city: string;
    country: string;
  };
}

type DeepPartialUser = DeepPartial<User>;
// {
//   name?: string;
//   address?: {
//     city?: string;
//     country?: string;
//   };
// }
```

**使用例:**
```typescript
const partialUser: DeepPartialUser = {
  address: {
    city: 'Tokyo'
    // country は省略可能
  }
  // name も省略可能
};
```

### 問題7: DeepReadonly の実装

```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? T[K] extends Array<infer U>
      ? ReadonlyArray<DeepReadonly<U>>
      : DeepReadonly<T[K]>
    : T[K];
};
```

**ポイント:**
- **再帰的な Readonly**: ネストしたオブジェクトもすべて読み取り専用に
- 配列は `ReadonlyArray` に変換
- イミュータブルなデータ構造の型定義に使用

**型の評価:**
```typescript
interface User {
  name: string;
  address: {
    city: string;
  };
  tags: string[];
}

type DeepReadonlyUser = DeepReadonly<User>;
// {
//   readonly name: string;
//   readonly address: {
//     readonly city: string;
//   };
//   readonly tags: ReadonlyArray<string>;
// }
```

**使用例:**
```typescript
const user: DeepReadonlyUser = {
  name: 'Alice',
  address: { city: 'Tokyo' },
  tags: ['admin']
};

user.name = 'Bob';           // エラー
user.address.city = 'Osaka'; // エラー
user.tags.push('user');      // エラー
```

### 問題8: Getter/Setter を型変換（Getters）

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
} & {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};
```

**ポイント:**
- **テンプレートリテラル型**: プロパティ名を変換
- `Capitalize<string & K>` で先頭を大文字に
- `as` でキーをリマップ
- 交差型（`&`）で getter と setter を結合

**型の評価:**
```typescript
type UserGetters = Getters<{ name: string; age: number }>;
// {
//   getName: () => string;
//   setName: (value: string) => void;
//   getAge: () => number;
//   setAge: (value: number) => void;
// }
```

**テンプレートリテラル型の詳細:**
```typescript
// Capitalize は組み込みの型
type Cap = Capitalize<'name'>;  // 'Name'

// テンプレートリテラル型
type Getter<K extends string> = `get${Capitalize<K>}`;
type GetName = Getter<'name'>;  // 'getName'
```

### 問題9: フィルタリング型（FilterByType）

```typescript
type FilterByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};
```

**ポイント:**
- `as T[K] extends U ? K : never` でキーをフィルタリング
- `never` に評価されたキーは除外される
- 特定の型のプロパティのみを抽出

**型の評価:**
```typescript
interface User {
  name: string;
  age: number;
  email: string;
  isAdmin: boolean;
}

type StringProps = FilterByType<User, string>;
// { name: string; email: string; }

type NumberProps = FilterByType<User, number>;
// { age: number; }

type BooleanProps = FilterByType<User, boolean>;
// { isAdmin: boolean; }
```

**使用例:**
```typescript
// フォームのテキストフィールドのみを抽出
type TextFields<T> = FilterByType<T, string>;

interface FormData {
  name: string;
  age: number;
  bio: string;
}

type TextFormFields = TextFields<FormData>;
// { name: string; bio: string; }
```

### 問題10: 関数のオーバーロード型

```typescript
interface OverloadedFunction {
  (value: string): string;
  (value: number): number;
  (value: boolean): boolean;
}
```

**ポイント:**
- インターフェースで複数のコールシグネチャを定義
- 引数の型によって戻り値の型が変わる
- 型オーバーロードの表現

**使用例:**
```typescript
const process: OverloadedFunction = ((value: any): any => {
  return value;
}) as OverloadedFunction;

const str = process('hello');  // string
const num = process(42);       // number
const bool = process(true);    // boolean
```

**条件型を使った代替実装:**
```typescript
type OverloadResult<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : never;

function process<T extends string | number | boolean>(value: T): OverloadResult<T> {
  return value as OverloadResult<T>;
}
```

### 問題11: Promisify の実装

```typescript
type Promisify<T> = T extends (callback: (err: any, result: infer R) => void) => void
  ? () => Promise<R>
  : T extends (arg: infer A, callback: (err: any, result: infer R) => void) => void
  ? (arg: A) => Promise<R>
  : T extends (arg1: infer A1, arg2: infer A2, callback: (err: any, result: infer R) => void) => void
  ? (arg1: A1, arg2: A2) => Promise<R>
  : never;
```

**ポイント:**
- Node.js スタイルのコールバック関数を Promise 化
- 引数の数に応じて異なるパターンをマッチ
- `infer` で引数と結果の型を推論

**型の評価:**
```typescript
// コールバック関数の型
type ReadFile = (path: string, callback: (err: Error | null, data: string) => void) => void;

type PromisifiedReadFile = Promisify<ReadFile>;
// (arg: string) => Promise<string>
```

**使用例:**
```typescript
// 元のコールバック関数
function readFileCallback(
  path: string,
  callback: (err: Error | null, data: string) => void
): void {
  // ...
}

// Promise 化された関数の型
type PromisifiedRead = Promisify<typeof readFileCallback>;
// (arg: string) => Promise<string>
```

### 問題12: Tuple to Union

```typescript
type TupleToUnion<T extends readonly any[]> = T[number];
```

**ポイント:**
- `T[number]` でタプルの全要素の型をユニオンとして取得
- インデックスアクセス型の活用
- 非常にシンプルだが強力

**型の評価:**
```typescript
type Colors = TupleToUnion<['red', 'green', 'blue']>;
// 'red' | 'green' | 'blue'

type Mixed = TupleToUnion<[string, number, boolean]>;
// string | number | boolean

type Numbers = TupleToUnion<[1, 2, 3]>;
// 1 | 2 | 3
```

**使用例:**
```typescript
const STATUSES = ['pending', 'active', 'completed'] as const;
type Status = TupleToUnion<typeof STATUSES>;
// 'pending' | 'active' | 'completed'

function setStatus(status: Status): void {
  // ...
}

setStatus('active');  // OK
setStatus('invalid'); // エラー
```

### 問題13: Union to Intersection

```typescript
type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;
```

**ポイント:**
- **分配条件型（Distributive Conditional Types）** を活用
- 関数の引数は反変（contravariant）な位置にある
- 反変位置での推論は交差型になる

**型の評価:**
```typescript
type Intersection = UnionToIntersection<{ a: number } | { b: string }>;
// { a: number } & { b: string }

type Combined = UnionToIntersection<
  | { name: string }
  | { age: number }
  | { email: string }
>;
// { name: string } & { age: number } & { email: string }
```

**動作の仕組み:**
```typescript
// ステップ1: 分配条件型で関数に変換
// U extends any ? (k: U) => void : never
// { a: number } | { b: string } が分配される
// → ((k: { a: number }) => void) | ((k: { b: string }) => void)

// ステップ2: 関数引数から推論
// (k: infer I) => void にマッチさせると
// I は { a: number } と { b: string } の両方を満たす必要がある
// → { a: number } & { b: string }
```

### 問題14: Required Keys の抽出

```typescript
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];
```

**ポイント:**
- `{} extends Pick<T, K>` でプロパティがオプショナルかどうかを判定
- オプショナルなプロパティは `{}` に割り当て可能
- 必須プロパティは `never` に評価されず、キーが残る

**型の評価:**
```typescript
type Keys = RequiredKeys<{ a: number; b?: string; c: boolean }>;
// 'a' | 'c'
```

**動作の仕組み:**
```typescript
// { a: number; b?: string; c: boolean } の場合

// K = 'a' の場合:
// Pick<T, 'a'> = { a: number }
// {} extends { a: number } → false（a が必須だから）
// → 'a'

// K = 'b' の場合:
// Pick<T, 'b'> = { b?: string }
// {} extends { b?: string } → true（b はオプショナルだから）
// → never

// K = 'c' の場合:
// Pick<T, 'c'> = { c: boolean }
// {} extends { c: boolean } → false
// → 'c'

// 結果: 'a' | 'c'
```

### 問題15: 型安全な path 関数

```typescript
type Path<T> = keyof T;

type DeepPath<T> =
  | (keyof T & string)
  | {
      [K in keyof T]: T[K] extends object
        ? K extends string
          ?
            | `${K}.${Extract<keyof T[K], string>}`
            | {
                [K2 in keyof T[K]]: T[K][K2] extends object
                  ? K2 extends string
                    ? `${K}.${K2}.${Extract<keyof T[K][K2], string>}`
                    : never
                  : never;
              }[keyof T[K]]
          : never
        : never;
    }[keyof T];

function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

function getDeep<T, P extends DeepPath<T>>(obj: T, path: P): any {
  const keys = (path as string).split('.');
  let result: any = obj;
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return undefined;
    }
  }
  return result;
}
```

**ポイント:**
- **テンプレートリテラル型** でドット記法のパスを表現
- 再帰的な型定義で深いネストに対応
- 存在しないパスはコンパイルエラーになる

**型の評価:**
```typescript
interface Data {
  user: {
    name: string;
    address: {
      city: string;
    };
  };
  count: number;
}

type DataPaths = DeepPath<Data>;
// 'user' | 'count' | 'user.name' | 'user.address' | 'user.address.city'
```

**使用例:**
```typescript
const data = {
  user: {
    name: 'Alice',
    address: { city: 'Tokyo' }
  },
  count: 42
};

get(data, 'count');                    // 42
getDeep(data, 'user.name');            // 'Alice'
getDeep(data, 'user.address.city');    // 'Tokyo'
// getDeep(data, 'user.invalid');      // エラー: 存在しないパス
```

## 高度なパターンのベストプラクティス

### 1. 型の複雑さを管理する

```typescript
// ❌ 読みにくい
type Complex<T> = T extends object
  ? { [K in keyof T]: T[K] extends object
      ? { readonly [K2 in keyof T[K]]: T[K][K2] }
      : T[K] }
  : T;

// ✅ 中間型を定義
type ReadonlyNested<T> = {
  readonly [K in keyof T]: T[K];
};

type DeepReadonlyObject<T> = {
  [K in keyof T]: T[K] extends object ? ReadonlyNested<T[K]> : T[K];
};
```

### 2. 再帰の深さに注意

```typescript
// TypeScript には型の再帰深度に制限がある
// 非常に深いネストでは制限に達する可能性がある

// 深さを制限した再帰
type DeepPartial<T, Depth extends number = 10> = Depth extends 0
  ? T
  : {
      [K in keyof T]?: T[K] extends object
        ? DeepPartial<T[K], Decrement[Depth]>
        : T[K];
    };

type Decrement = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
```

### 3. 分配条件型を理解する

```typescript
// 分配条件型: ユニオンの各メンバーに対して適用される
type Wrap<T> = T extends any ? { value: T } : never;

type Wrapped = Wrap<string | number>;
// { value: string } | { value: number }

// 分配を防ぐ: タプルで包む
type NoDistribute<T> = [T] extends [any] ? { value: T } : never;

type NotWrapped = NoDistribute<string | number>;
// { value: string | number }
```

### 4. infer の位置を理解する

```typescript
// 共変位置（戻り値）
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// 反変位置（引数）
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// 反変位置での推論は交差型になる
type Intersection<T> = T extends { a: infer U; b: infer U } ? U : never;
type Result = Intersection<{ a: string; b: number }>; // string & number = never
```

## よくある間違いと解決策

### 1. 分配条件型の予期しない動作

```typescript
// ❌ 予期しない分配
type IsArray<T> = T extends any[] ? true : false;
type Result = IsArray<string[] | number>; // true | false（分配される）

// ✅ タプルで分配を防ぐ
type IsArray<T> = [T] extends [any[]] ? true : false;
type Result = IsArray<string[] | number>; // false
```

### 2. never の扱い

```typescript
// never はユニオンから消える
type A = string | never; // string

// never は条件型で特殊な動作
type Check<T> = T extends never ? true : false;
type Result = Check<never>; // never（分配の結果、何も残らない）

// never をチェックする正しい方法
type IsNever<T> = [T] extends [never] ? true : false;
type Result = IsNever<never>; // true
```

### 3. 型パラメータの制約

```typescript
// ❌ 制約なしで string 操作
type GetName<T> = `get${T}`; // エラー

// ✅ string に制約
type GetName<T extends string> = `get${T}`;
type Result = GetName<'user'>; // 'getuser'
```

## 実践的なユースケース

### 1. API レスポンスの型変換

```typescript
type ApiResponse<T> = {
  data: T;
  error: null;
} | {
  data: null;
  error: string;
};

type Unwrap<T> = T extends ApiResponse<infer D> ? D : never;

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  // ...
}
```

### 2. イベントハンドラーの型定義

```typescript
type EventMap = {
  click: { x: number; y: number };
  keypress: { key: string };
  scroll: { scrollTop: number };
};

type Handler<K extends keyof EventMap> = (event: EventMap[K]) => void;

type Handlers = {
  [K in keyof EventMap as `on${Capitalize<K>}`]: Handler<K>;
};
// {
//   onClick: (event: { x: number; y: number }) => void;
//   onKeypress: (event: { key: string }) => void;
//   onScroll: (event: { scrollTop: number }) => void;
// }
```

### 3. フォームの型安全なバリデーション

```typescript
type ValidationRule<T> = {
  validate: (value: T) => boolean;
  message: string;
};

type FormValidation<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

interface LoginForm {
  email: string;
  password: string;
}

const validation: FormValidation<LoginForm> = {
  email: [
    { validate: (v) => v.includes('@'), message: 'Invalid email' }
  ],
  password: [
    { validate: (v) => v.length >= 8, message: 'Too short' }
  ]
};
```

## まとめ

高度なジェネリクスパターンを使うと：

- ✅ 複雑な型変換を宣言的に表現できる
- ✅ 型レベルでのプログラミングが可能になる
- ✅ より厳密な型安全性を実現できる
- ✅ 再利用可能な型ユーティリティを作成できる

**主要な概念:**
- **条件型**: `T extends U ? X : Y`
- **infer**: 型の推論と抽出
- **Mapped Types**: オブジェクト型の変換
- **テンプレートリテラル型**: 文字列型の操作
- **分配条件型**: ユニオン型への適用
- **再帰的型**: ネストした構造の処理

これらのパターンを組み合わせることで、TypeScript の型システムの限界を押し広げ、より表現力豊かで安全なコードを書くことができます。

**注意点:**
- 型の複雑さは保守性に影響する
- 過度に複雑な型は避ける
- 型エラーメッセージが分かりにくくなる場合がある
- 再帰の深さには制限がある

適切なバランスを保ちながら、これらの高度なパターンを活用しましょう。
