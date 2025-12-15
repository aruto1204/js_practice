# 📘 TypeScript ベストプラクティス

## 概要

TypeScript を書く際に守るべきベストプラクティスをまとめています。
型安全で保守しやすいコードを書くための指針です。

---

## 1. 型定義の基本

### ✅ 明示的な型よりも型推論を活用する

```typescript
// ✅ 良い例：型推論に任せる
const name = '太郎';  // string と推論される
const age = 25;       // number と推論される
const users = ['太郎', '花子'];  // string[] と推論される

// ❌ 悪い例：冗長な型注釈
const name: string = '太郎';
const age: number = 25;
const users: string[] = ['太郎', '花子'];
```

### ✅ ただし、関数の引数と戻り値は明示する

```typescript
// ✅ 良い例：引数と戻り値に型を明示
function greet(name: string): string {
  return `こんにちは、${name}さん`;
}

// 複雑な戻り値も明示
function getUser(id: number): { name: string; age: number } | null {
  // ...
}
```

### ✅ any は避け、unknown を使う

```typescript
// ❌ 悪い例：any は型チェックを無効化
function processData(data: any) {
  return data.value;  // エラーにならないが危険
}

// ✅ 良い例：unknown で型安全に
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: string }).value;
  }
  throw new Error('Invalid data');
}
```

---

## 2. interface と type の使い分け

### ✅ オブジェクトの形状には interface を使う

```typescript
// ✅ 良い例：interface でオブジェクトを定義
interface User {
  id: number;
  name: string;
  email: string;
}

// 拡張が容易
interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
}
```

### ✅ ユニオン型やタプルには type を使う

```typescript
// ✅ 良い例：type でユニオン型を定義
type Status = 'pending' | 'approved' | 'rejected';
type Result = Success | Error;

// タプル
type Coordinate = [number, number];
type RGB = [number, number, number];
```

### ✅ 関数型には type を使う

```typescript
// ✅ 良い例
type EventHandler = (event: Event) => void;
type Callback<T> = (result: T) => void;
type Predicate<T> = (item: T) => boolean;
```

---

## 3. 厳格な設定を使う

### ✅ tsconfig.json で strict モードを有効にする

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### ✅ noUncheckedIndexedAccess でインデックスアクセスを安全に

```typescript
const items = ['a', 'b', 'c'];

// noUncheckedIndexedAccess: true の場合
const first = items[0];  // string | undefined

// ✅ 良い例：undefined チェック
if (first !== undefined) {
  console.log(first.toUpperCase());
}

// または
const first = items[0] ?? 'default';
```

---

## 4. null と undefined の扱い

### ✅ strictNullChecks を有効にする

```typescript
// strictNullChecks: true

function getUser(id: number): User | null {
  // ユーザーが見つからない場合は null を返す
  return null;
}

const user = getUser(1);
// user.name;  // エラー: user は null の可能性がある

// ✅ 良い例：null チェック
if (user !== null) {
  console.log(user.name);
}
```

### ✅ Optional Chaining と Nullish Coalescing を活用

```typescript
interface User {
  name: string;
  address?: {
    city: string;
    zipCode?: string;
  };
}

// ✅ 良い例
const city = user.address?.city;
const zipCode = user.address?.zipCode ?? '未設定';
```

### ✅ 非 null アサーション (!) は慎重に使う

```typescript
// ❌ 悪い例：安易な非 null アサーション
const element = document.getElementById('app')!;

// ✅ 良い例：チェック後に使う
const element = document.getElementById('app');
if (!element) {
  throw new Error('Element not found');
}
// ここでは element は HTMLElement
```

---

## 5. ユニオン型と型ガード

### ✅ Discriminated Union を活用する

```typescript
// ✅ 良い例：識別可能なユニオン型
interface Success {
  type: 'success';
  data: string;
}

interface Error {
  type: 'error';
  message: string;
}

type Result = Success | Error;

function handleResult(result: Result) {
  switch (result.type) {
    case 'success':
      console.log(result.data);  // data にアクセス可能
      break;
    case 'error':
      console.log(result.message);  // message にアクセス可能
      break;
  }
}
```

### ✅ 型ガード関数を作る

```typescript
// ユーザー定義型ガード
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'email' in value
  );
}

// 使用例
function processValue(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());  // string として扱える
  }
}
```

### ✅ in 演算子で型を絞り込む

```typescript
interface Dog {
  bark(): void;
}

interface Cat {
  meow(): void;
}

function makeSound(animal: Dog | Cat) {
  if ('bark' in animal) {
    animal.bark();  // Dog として扱える
  } else {
    animal.meow();  // Cat として扱える
  }
}
```

---

## 6. ジェネリクス

### ✅ 意味のある型パラメータ名を使う

```typescript
// ✅ 良い例：意味のある名前
function map<TInput, TOutput>(
  items: TInput[],
  fn: (item: TInput) => TOutput
): TOutput[] {
  return items.map(fn);
}

// よく使われる慣習
// T - Type（一般的な型）
// K - Key（キー）
// V - Value（値）
// E - Element（要素）
// R - Return（戻り値）
```

### ✅ ジェネリック制約を使う

```typescript
// ✅ 良い例：制約で型を限定
interface HasId {
  id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

// keyof を使った制約
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### ✅ デフォルト型パラメータを活用

```typescript
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message: string;
}

// T を指定しない場合は unknown
const response: ApiResponse = { data: 'test', status: 200, message: 'OK' };

// T を指定する場合
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: '太郎', email: 'taro@example.com' },
  status: 200,
  message: 'OK',
};
```

---

## 7. 関数の型定義

### ✅ オーバーロードは慎重に使う

```typescript
// オーバーロードシグネチャ
function createElement(tag: 'div'): HTMLDivElement;
function createElement(tag: 'span'): HTMLSpanElement;
function createElement(tag: 'a'): HTMLAnchorElement;
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

// 可能であればジェネリクスで代替
function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K
): HTMLElementTagNameMap[K] {
  return document.createElement(tag);
}
```

### ✅ コールバック関数の型を明確に

```typescript
// ✅ 良い例：型エイリアスで可読性向上
type EventHandler<E extends Event> = (event: E) => void;
type AsyncCallback<T> = (error: Error | null, result: T | null) => void;

function addEventListener(handler: EventHandler<MouseEvent>) {
  // ...
}
```

---

## 8. クラスの型定義

### ✅ アクセス修飾子を適切に使う

```typescript
class User {
  // ✅ 良い例：適切なアクセス制御
  public readonly id: number;
  private password: string;
  protected email: string;

  constructor(id: number, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  // コンストラクタのショートハンド
  // constructor(
  //   public readonly id: number,
  //   protected email: string,
  //   private password: string
  // ) {}
}
```

### ✅ interface で契約を定義し、implements で実装

```typescript
interface Repository<T> {
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(item: T): Promise<T>;
  delete(id: number): Promise<void>;
}

class UserRepository implements Repository<User> {
  async findById(id: number): Promise<User | null> {
    // 実装
  }
  
  async findAll(): Promise<User[]> {
    // 実装
  }
  
  async save(user: User): Promise<User> {
    // 実装
  }
  
  async delete(id: number): Promise<void> {
    // 実装
  }
}
```

### ✅ 抽象クラスで共通実装を提供

```typescript
abstract class BaseEntity {
  public readonly id: number;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(id: number) {
    this.id = id;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  abstract validate(): boolean;
}

class User extends BaseEntity {
  constructor(id: number, public name: string) {
    super(id);
  }

  validate(): boolean {
    return this.name.length > 0;
  }
}
```

---

## 9. ユーティリティ型の活用

### ✅ 組み込みユーティリティ型を使う

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial: すべてのプロパティをオプショナルに
type PartialUser = Partial<User>;

// Required: すべてのプロパティを必須に
type RequiredUser = Required<PartialUser>;

// Pick: 特定のプロパティだけを抽出
type UserPublicInfo = Pick<User, 'id' | 'name'>;

// Omit: 特定のプロパティを除外
type UserWithoutPassword = Omit<User, 'password'>;

// Readonly: すべてのプロパティを読み取り専用に
type ReadonlyUser = Readonly<User>;

// Record: キーと値の型を指定したオブジェクト
type UserStatus = Record<number, 'active' | 'inactive'>;
```

### ✅ 条件付き型を理解する

```typescript
// NonNullable: null と undefined を除外
type NonNullableString = NonNullable<string | null | undefined>;  // string

// Extract: 条件を満たす型を抽出
type ExtractedTypes = Extract<'a' | 'b' | 'c', 'a' | 'c'>;  // 'a' | 'c'

// Exclude: 条件を満たす型を除外
type ExcludedTypes = Exclude<'a' | 'b' | 'c', 'a'>;  // 'b' | 'c'

// ReturnType: 関数の戻り値の型を取得
type GetUserReturn = ReturnType<typeof getUser>;

// Parameters: 関数のパラメータの型を取得
type GetUserParams = Parameters<typeof getUser>;
```

---

## 10. 型アサーション

### ✅ as const で リテラル型を保持

```typescript
// ✅ 良い例：as const でリテラル型
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
} as const;
// 型: { readonly apiUrl: "https://api.example.com"; readonly timeout: 5000; }

const colors = ['red', 'green', 'blue'] as const;
// 型: readonly ["red", "green", "blue"]
```

### ✅ 型アサーションより型ガードを優先

```typescript
// ❌ 悪い例：危険な型アサーション
const user = data as User;

// ✅ 良い例：型ガードでチェック
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data
  );
}

if (isUser(data)) {
  console.log(data.name);  // 安全
}
```

---

## 11. モジュールと型のエクスポート

### ✅ 型と値を区別してエクスポート

```typescript
// types.ts
export interface User {
  id: number;
  name: string;
}

export type Status = 'active' | 'inactive';

// 型のみのインポート
import type { User, Status } from './types';

// 値と型を同時にインポート
import { createUser, type User } from './user';
```

### ✅ バレルファイルで整理

```typescript
// models/index.ts
export type { User } from './user';
export type { Product } from './product';
export type { Order } from './order';

// 使用側
import type { User, Product, Order } from './models';
```

---

## 12. よくある間違いと対策

### ❌ Object、{} は使わない

```typescript
// ❌ 悪い例
function processData(data: Object) {}
function processData(data: {}) {}

// ✅ 良い例
function processData(data: Record<string, unknown>) {}
function processData(data: object) {}  // プリミティブ以外
```

### ❌ Function 型は使わない

```typescript
// ❌ 悪い例
function execute(fn: Function) {
  fn();
}

// ✅ 良い例
function execute(fn: () => void) {
  fn();
}

// または
type AnyFunction = (...args: unknown[]) => unknown;
```

### ❌ enum より ユニオン型を使う

```typescript
// ❌ 悪い例：enum
enum Status {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

// ✅ 良い例：ユニオン型
type Status = 'pending' | 'approved' | 'rejected';

// または as const
const STATUS = {
  Pending: 'pending',
  Approved: 'approved',
  Rejected: 'rejected',
} as const;

type Status = typeof STATUS[keyof typeof STATUS];
```

---

## チェックリスト

### 型定義のとき
- [ ] any を使っていない（unknown を使う）
- [ ] 適切に interface と type を使い分けている
- [ ] ジェネリクスに意味のある名前をつけている
- [ ] null/undefined を適切に扱っている
- [ ] 型ガードを使って安全に型を絞り込んでいる

### コードを書くとき
- [ ] strict モードが有効になっている
- [ ] 不要な型アサーションを使っていない
- [ ] ユーティリティ型を活用している
- [ ] アクセス修飾子を適切に使っている
- [ ] 型のエクスポートに type を使っている

---

## 参考資料

- [TypeScript 公式ドキュメント](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Type Challenges](https://github.com/type-challenges/type-challenges)
- [Total TypeScript](https://www.totaltypescript.com/)
