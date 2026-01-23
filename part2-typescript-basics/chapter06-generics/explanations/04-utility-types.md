# ユーティリティ型の活用 解説

## 概要

ユーティリティ型（Utility Types）は、TypeScript が標準で提供する型変換のためのジェネリック型です。既存の型から新しい型を生成するために使用され、コードの再利用性と型安全性を向上させます。

## 基本概念

### ユーティリティ型の一覧

| ユーティリティ型 | 説明 |
|-----------------|------|
| `Partial<T>` | すべてのプロパティをオプショナルに |
| `Required<T>` | すべてのプロパティを必須に |
| `Readonly<T>` | すべてのプロパティを読み取り専用に |
| `Pick<T, K>` | 指定したプロパティのみを抽出 |
| `Omit<T, K>` | 指定したプロパティを除外 |
| `Record<K, T>` | キーと値の型を指定したオブジェクト型 |
| `Extract<T, U>` | T から U に割り当て可能な型を抽出 |
| `Exclude<T, U>` | T から U に割り当て可能な型を除外 |
| `NonNullable<T>` | null と undefined を除外 |
| `ReturnType<T>` | 関数の戻り値の型を取得 |
| `Parameters<T>` | 関数の引数の型をタプルで取得 |
| `ConstructorParameters<T>` | コンストラクタの引数の型を取得 |

## 各問題の解説

### 問題1: Partial の使用

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}
```

**ポイント:**
- `Partial<T>` はすべてのプロパティを `?`（オプショナル）にする
- 部分的な更新を型安全に行える
- 元の型を変更せずに派生型を作成

**Partial の内部実装:**
```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

**使用例:**
```typescript
const user: User = { id: 1, name: 'Alice', email: 'alice@example.com', age: 30 };

// 一部のプロパティのみ更新
const updated = updateUser(user, { age: 31 });
// { id: 1, name: 'Alice', email: 'alice@example.com', age: 31 }

// 複数のプロパティを更新
const updated2 = updateUser(user, { name: 'Alicia', email: 'alicia@example.com' });
```

### 問題2: Required の使用

```typescript
interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
}

function validateConfig(config: Required<Config>): boolean {
  return (
    typeof config.host === 'string' &&
    typeof config.port === 'number' &&
    typeof config.debug === 'boolean'
  );
}
```

**ポイント:**
- `Required<T>` はすべてのオプショナルプロパティを必須にする
- バリデーション関数で全プロパティの存在を保証
- `Partial` の逆の効果

**Required の内部実装:**
```typescript
type Required<T> = {
  [P in keyof T]-?: T[P];  // -? でオプショナルを除去
};
```

**使用例:**
```typescript
// OK: すべてのプロパティが存在
const fullConfig: Required<Config> = {
  host: 'localhost',
  port: 3000,
  debug: true,
};

// エラー: debug が欠けている
const partialConfig: Required<Config> = {
  host: 'localhost',
  port: 3000,
  // debug が必要
};
```

### 問題3: Readonly の使用

```typescript
interface Point {
  x: number;
  y: number;
}

function freezePoint(point: Point): Readonly<Point> {
  return Object.freeze({ ...point });
}
```

**ポイント:**
- `Readonly<T>` はすべてのプロパティを `readonly` にする
- イミュータブルなオブジェクトを型レベルで保証
- `Object.freeze()` と組み合わせて使用

**Readonly の内部実装:**
```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

**使用例:**
```typescript
const point = { x: 10, y: 20 };
const frozen = freezePoint(point);

console.log(frozen.x); // 10
frozen.x = 30; // エラー: 読み取り専用プロパティに代入できない
```

### 問題4: Pick の使用

```typescript
type UserPreview = Pick<User, 'id' | 'name'>;
// 結果: { id: number; name: string; }
```

**ポイント:**
- `Pick<T, K>` は T から K のプロパティのみを抽出
- APIレスポンスの一部のみを使用する場合に便利
- 型の再利用性を高める

**Pick の内部実装:**
```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

**使用例:**
```typescript
const user: User = { id: 1, name: 'Alice', email: 'alice@example.com', age: 30 };

// UserPreview として使用
const preview: UserPreview = {
  id: user.id,
  name: user.name,
};

// email や age は含まれない
```

### 問題5: Omit の使用

```typescript
interface UserWithPassword extends User {
  password: string;
}

type SafeUser = Omit<UserWithPassword, 'password'>;
// 結果: { id: number; name: string; email: string; age: number; }
```

**ポイント:**
- `Omit<T, K>` は T から K のプロパティを除外
- 機密情報を除いた型を作成する場合に便利
- `Pick` の逆の効果

**Omit の内部実装:**
```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

**使用例:**
```typescript
function sanitizeUser(user: UserWithPassword): SafeUser {
  const { password, ...safeUser } = user;
  return safeUser;
}

const user = { id: 1, name: 'Alice', email: 'alice@example.com', age: 30, password: 'secret' };
const safe = sanitizeUser(user);
// { id: 1, name: 'Alice', email: 'alice@example.com', age: 30 }
// password は含まれない
```

### 問題6: Record の使用

```typescript
type Role = 'admin' | 'user' | 'guest';
type Permissions = string[];

const permissions: Record<Role, Permissions> = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read'],
};
```

**ポイント:**
- `Record<K, T>` はキー K と値 T のオブジェクト型を作成
- すべてのキーが必須になる
- マッピングオブジェクトの型定義に便利

**Record の内部実装:**
```typescript
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

**使用例:**
```typescript
// ステータスコードのマッピング
type StatusCode = 200 | 404 | 500;
type StatusMessage = Record<StatusCode, string>;

const messages: StatusMessage = {
  200: 'OK',
  404: 'Not Found',
  500: 'Internal Server Error',
};

// エラー: すべてのキーが必要
const incomplete: StatusMessage = {
  200: 'OK',
  // 404 と 500 が必要
};
```

### 問題7: Extract の使用

```typescript
type StringOrNumber = Extract<string | number | boolean, string | number>;
// 結果: string | number
```

**ポイント:**
- `Extract<T, U>` は T から U に割り当て可能な型を抽出
- ユニオン型のフィルタリングに使用
- 共通の型を抽出する

**Extract の内部実装:**
```typescript
type Extract<T, U> = T extends U ? T : never;
```

**図解:**
```
T = string | number | boolean
U = string | number

Extract<T, U>:
  string extends (string | number) ? string : never → string
  number extends (string | number) ? number : never → number
  boolean extends (string | number) ? boolean : never → never

結果: string | number
```

### 問題8: Exclude の使用

```typescript
type NonBoolean = Exclude<string | number | boolean, boolean>;
// 結果: string | number
```

**ポイント:**
- `Exclude<T, U>` は T から U に割り当て可能な型を除外
- `Extract` の逆の効果
- 特定の型を除外したユニオン型を作成

**Exclude の内部実装:**
```typescript
type Exclude<T, U> = T extends U ? never : T;
```

**使用例:**
```typescript
// null と undefined を除外
type NonNullableType = Exclude<string | null | undefined, null | undefined>;
// 結果: string

// 特定のリテラル型を除外
type OtherColors = Exclude<'red' | 'green' | 'blue', 'red'>;
// 結果: 'green' | 'blue'
```

### 問題9: NonNullable の使用

```typescript
type NonNullString = NonNullable<string | null | undefined>;
// 結果: string
```

**ポイント:**
- `NonNullable<T>` は `null` と `undefined` を除外
- `Exclude<T, null | undefined>` と等価
- null 安全な型を作成

**NonNullable の内部実装:**
```typescript
type NonNullable<T> = T & {};
// または
type NonNullable<T> = Exclude<T, null | undefined>;
```

**使用例:**
```typescript
function processValue(value: string | null | undefined): NonNullable<typeof value> {
  if (value === null || value === undefined) {
    throw new Error('Value is null or undefined');
  }
  return value; // string
}
```

### 問題10: ReturnType の使用

```typescript
function getUser() {
  return { id: 1, name: 'Alice' };
}

type UserType = ReturnType<typeof getUser>;
// 結果: { id: number; name: string; }
```

**ポイント:**
- `ReturnType<T>` は関数の戻り値の型を取得
- `typeof` と組み合わせて使用
- 関数の実装から型を推論

**ReturnType の内部実装:**
```typescript
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

**使用例:**
```typescript
async function fetchData() {
  return { data: [1, 2, 3], total: 3 };
}

// Promise の中身を取得
type DataType = Awaited<ReturnType<typeof fetchData>>;
// { data: number[]; total: number; }
```

### 問題11: Parameters の使用

```typescript
function createUser(name: string, age: number, email: string) {
  return { name, age, email };
}

type CreateUserParams = Parameters<typeof createUser>;
// 結果: [name: string, age: number, email: string]
```

**ポイント:**
- `Parameters<T>` は関数の引数をタプル型で取得
- 関数のシグネチャから引数の型を抽出
- スプレッド構文と組み合わせて使用可能

**Parameters の内部実装:**
```typescript
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```

**使用例:**
```typescript
// 引数のタプルをスプレッドで展開
const params: CreateUserParams = ['Alice', 30, 'alice@example.com'];
const user = createUser(...params);

// 関数のラッパーを作成
function logAndCall<T extends (...args: any) => any>(
  fn: T,
  ...args: Parameters<T>
): ReturnType<T> {
  console.log('Calling with:', args);
  return fn(...args);
}
```

### 問題12: ConstructorParameters の使用

```typescript
class Person {
  constructor(public name: string, public age: number) {}
}

type PersonParams = ConstructorParameters<typeof Person>;
// 結果: [name: string, age: number]
```

**ポイント:**
- `ConstructorParameters<T>` はコンストラクタの引数をタプル型で取得
- クラスの `typeof` を使用
- ファクトリ関数の実装に便利

**使用例:**
```typescript
// ファクトリ関数
function createInstance<T extends new (...args: any) => any>(
  constructor: T,
  ...args: ConstructorParameters<T>
): InstanceType<T> {
  return new constructor(...args);
}

const person = createInstance(Person, 'Alice', 30);
// person の型: Person
```

### 問題13: Partial と Required の組み合わせ

```typescript
interface FormData {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

type RequiredFields<T, K extends keyof T> = Required<Pick<T, K>> & Partial<Omit<T, K>>;

type LoginForm = RequiredFields<FormData, 'username' | 'password'>;
// 結果: { username: string; password: string; email?: string; confirmPassword?: string; }
```

**ポイント:**
- 複数のユーティリティ型を組み合わせる
- 特定のフィールドのみを必須にする
- フォームバリデーションに便利

**型の解説:**
```typescript
// RequiredFields の分解
// 1. Pick<FormData, 'username' | 'password'>
//    → { username?: string; password?: string; }
// 2. Required<...>
//    → { username: string; password: string; }
// 3. Omit<FormData, 'username' | 'password'>
//    → { email?: string; confirmPassword?: string; }
// 4. Partial<...>（既にオプショナルなので変化なし）
//    → { email?: string; confirmPassword?: string; }
// 5. & で交差
//    → { username: string; password: string; email?: string; confirmPassword?: string; }
```

### 問題14: カスタムユーティリティ型の作成

```typescript
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
```

**ポイント:**
- Mapped Types を使ってカスタムユーティリティ型を作成
- すべてのプロパティに `| null` を追加
- TypeScript の型操作の基本パターン

**使用例:**
```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type NullableUser = Nullable<User>;
// { id: number | null; name: string | null; email: string | null; }

const user: NullableUser = {
  id: 1,
  name: null,  // OK
  email: null, // OK
};
```

**その他のカスタムユーティリティ型:**
```typescript
// すべてのプロパティを Promise にする
type Promisify<T> = {
  [K in keyof T]: Promise<T[K]>;
};

// 関数プロパティのみを抽出
type FunctionProperties<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K];
};

// プロパティ名にプレフィックスを追加
type Prefixed<T, P extends string> = {
  [K in keyof T as `${P}${string & K}`]: T[K];
};
```

### 問題15: 複雑なユーティリティ型の組み合わせ

```typescript
type ProcessedUser = Readonly<Partial<Omit<User, 'email'>>>;
// 結果: {
//   readonly id?: number;
//   readonly name?: string;
//   readonly age?: number;
// }
```

**ポイント:**
- ユーティリティ型を連鎖して使用
- 内側から外側に評価される
- 複雑な型変換を宣言的に表現

**評価の順序:**
```typescript
// 1. Omit<User, 'email'>
//    → { id: number; name: string; age: number; }
// 2. Partial<...>
//    → { id?: number; name?: string; age?: number; }
// 3. Readonly<...>
//    → { readonly id?: number; readonly name?: string; readonly age?: number; }
```

## ユーティリティ型のベストプラクティス

### 1. 適切なユーティリティ型を選択

```typescript
// ❌ 手動で定義
interface PartialUser {
  id?: number;
  name?: string;
  email?: string;
}

// ✅ ユーティリティ型を使用
type PartialUser = Partial<User>;
```

### 2. 組み合わせを活用

```typescript
// APIレスポンスの型定義
type ApiResponse<T> = Readonly<{
  data: T;
  status: number;
  timestamp: string;
}>;

// 更新リクエストの型定義
type UpdateRequest<T> = Partial<Omit<T, 'id' | 'createdAt'>>;
```

### 3. カスタムユーティリティ型の作成

```typescript
// Deep Partial（ネストしたオブジェクトも Partial に）
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Deep Readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
```

### 4. 型の可読性を保つ

```typescript
// ❌ 読みにくい
type X = Readonly<Partial<Omit<Pick<User, 'id' | 'name' | 'email'>, 'email'>>>;

// ✅ 中間型を定義
type UserBasic = Pick<User, 'id' | 'name' | 'email'>;
type UserWithoutEmail = Omit<UserBasic, 'email'>;
type OptionalUser = Partial<UserWithoutEmail>;
type FrozenUser = Readonly<OptionalUser>;
```

## よくある間違いと解決策

### 1. Pick と Omit の混同

```typescript
// ❌ 間違い: id と name を除外したい
type Wrong = Pick<User, 'id' | 'name'>;  // id と name のみ残る

// ✅ 正しい: id と name を除外
type Correct = Omit<User, 'id' | 'name'>; // id と name を除外
```

### 2. Extract と Exclude の混同

```typescript
type T = string | number | boolean;

// Extract: 指定した型を抽出
type Extracted = Extract<T, string | number>; // string | number

// Exclude: 指定した型を除外
type Excluded = Exclude<T, boolean>; // string | number
```

### 3. typeof の忘れ

```typescript
function getUser() { return { id: 1, name: 'Alice' }; }

// ❌ エラー: getUser は関数であり型ではない
type Wrong = ReturnType<getUser>;

// ✅ 正しい: typeof で型を取得
type Correct = ReturnType<typeof getUser>;
```

## 実践的なユースケース

### 1. API クライアント

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// 作成リクエスト（id と日付は自動生成）
type CreateUserRequest = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

// 更新リクエスト（部分更新可能）
type UpdateUserRequest = Partial<Omit<User, 'id' | 'createdAt'>>;

// レスポンス（読み取り専用）
type UserResponse = Readonly<User>;
```

### 2. フォーム管理

```typescript
interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
}

type LoginFormState = FormState<{
  email: string;
  password: string;
}>;
```

### 3. 状態管理

```typescript
interface State {
  user: User | null;
  posts: Post[];
  isLoading: boolean;
}

// Action の型定義
type Action =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'SET_LOADING'; payload: boolean };

// Selector の型定義
type Selector<T> = (state: State) => T;
```

## まとめ

ユーティリティ型を使うと：

- ✅ 既存の型から新しい型を簡潔に作成できる
- ✅ コードの重複を減らせる
- ✅ 型の意図を明確に表現できる
- ✅ 型安全な変換を行える

**よく使うユーティリティ型:**
- `Partial<T>` - 部分的な更新
- `Required<T>` - バリデーション
- `Readonly<T>` - イミュータブル
- `Pick<T, K>` - プロパティの抽出
- `Omit<T, K>` - プロパティの除外
- `Record<K, T>` - マッピング
- `ReturnType<T>` - 戻り値の型取得

ユーティリティ型を適切に活用することで、型定義の保守性と再利用性を大幅に向上させることができます。
