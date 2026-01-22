# 交差型（Intersection Types）解説

## 概要

交差型は、複数の型を組み合わせて新しい型を作成する TypeScript の機能です。`&` 演算子を使って複数の型を「かけ合わせる」ことで、すべての型のプロパティを持つ新しい型を作成できます。

## 基本概念

### 交差型の宣言

```typescript
type PersonWithContact = Person & Contact;
```

この型は、`Person` と `Contact` の**両方**のプロパティを持つオブジェクトを表します。

## ユニオン型との違い

| 特徴 | ユニオン型 (`|`) | 交差型 (`&`) |
|------|----------------|-------------|
| 意味 | いずれか（OR） | すべて（AND） |
| プロパティ | 共通部分のみアクセス可 | すべてのプロパティにアクセス可 |
| 使用例 | `string \| number` | `Person & Contact` |

## 各問題の解説

### 問題1-2: 基本的な交差型

```typescript
type Person = {
  name: string;
  age: number;
};

type Contact = {
  email: string;
  phone: string;
};

type PersonWithContact = Person & Contact;

function displayContact(contact: PersonWithContact): void {
  console.log(`Name: ${contact.name}, Age: ${contact.age}`);
  console.log(`Email: ${contact.email}, Phone: ${contact.phone}`);
}
```

**ポイント:**
- `PersonWithContact` は `Person` と `Contact` の全プロパティを持つ
- オブジェクトは4つのプロパティすべてを持つ必要がある
- 型安全にすべてのプロパティにアクセスできる

### 問題3-4: Mixin パターン

```typescript
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type WithId = {
  id: string;
};

type Product = {
  name: string;
  price: number;
};

// 複数の型を組み合わせる
const product: Product & WithId & Timestamped = {
  id: 'p001',
  name: 'Laptop',
  price: 1200,
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

**ポイント:**
- **Mixin パターン**: 共通の機能を型として定義し、必要に応じて組み合わせる
- `WithId` や `Timestamped` などの汎用的な型を再利用可能
- データベースモデルやAPIレスポンスの型定義に便利
- 複数の `&` を連鎖させることができる

### 問題5: merge 関数（ジェネリクスと交差型）

```typescript
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}
```

**ポイント:**
- ジェネリクスで任意の型を受け入れる
- スプレッド構文（`...`）でオブジェクトをマージ
- 戻り値は両方の型を含む交差型
- TypeScript の型推論により、呼び出し側で型が自動的に推論される

```typescript
const result = merge({ a: 1 }, { b: 2 });
// result の型: { a: number } & { b: number }
// result.a, result.b にアクセス可能
```

### 問題6: 型の拡張（継承的な使用）

```typescript
type BaseUser = {
  id: string;
  name: string;
};

type AdminUser = BaseUser & {
  role: string;
};
```

**ポイント:**
- インターフェースの `extends` に似た使い方
- 既存の型に新しいプロパティを追加
- 型エイリアスでも継承的な関係を表現できる

### 問題7-8: メソッドを持つ交差型

```typescript
type Drawable = {
  draw: () => void;
};

type Movable = {
  move: (x: number, y: number) => void;
};

type GameObject = Drawable & Movable;

const gameObject: GameObject = {
  draw: () => console.log('Drawing...'),
  move: (x, y) => console.log(`Moving to (${x}, ${y})`),
};
```

**ポイント:**
- メソッドを持つ型も交差型で組み合わせられる
- ゲーム開発などで、機能を組み合わせたオブジェクトを作成する際に便利
- **コンポジション（Composition）** のパターン

### 問題9: 複数の型の交差

```typescript
type Config = {
  host: string;
  port: number;
};

type Security = {
  ssl: boolean;
  apiKey: string;
};

type Logger = {
  logLevel: 'info' | 'warn' | 'error';
};

type ServerConfig = Config & Security & Logger;
```

**ポイント:**
- 3つ以上の型を組み合わせることも可能
- 設定オブジェクトを機能ごとに分割して管理
- **責任の分離（Separation of Concerns）** の原則に沿った設計

### 問題10: 交差型とインターフェース

```typescript
interface Animal {
  name: string;
  age: number;
}

interface Pet {
  owner: string;
}

type DomesticAnimal = Animal & Pet;
```

**ポイント:**
- インターフェースと型エイリアスは交差型で組み合わせられる
- インターフェースの `extends` よりも柔軟
- 既存のインターフェースを変更せずに拡張できる

### 問題12: 交差型とジェネリクス

```typescript
type Paginated<T> = {
  items: T[];
  page: number;
  totalPages: number;
};

type User = { name: string; email: string };
const paginatedUsers: Paginated<User> = {
  items: [{ name: 'Alice', email: 'alice@example.com' }],
  page: 1,
  totalPages: 5,
};
```

**ポイント:**
- ジェネリック型を使って再利用可能なパターンを作成
- APIレスポンスのラッパー型として便利
- `Paginated<T>` を様々な型 `T` に適用できる

### 問題13: 交差型の条件分岐

```typescript
type ReadOnly = {
  readonly: true;
};

type Editable = {
  editable: true;
};

type Document = {
  title: string;
  content: string;
};

function processDocument(doc: (Document & ReadOnly) | (Document & Editable)): void {
  if ('readonly' in doc && doc.readonly) {
    console.log(`Read-only document: ${doc.title}`);
  } else if ('editable' in doc && doc.editable) {
    console.log(`Editable document: ${doc.title}`);
  }
}
```

**ポイント:**
- 交差型とユニオン型を組み合わせることができる
- `(A & B) | (A & C)` のような複雑な型も表現可能
- `in` 演算子で型を判別

### 問題14: 複雑な交差型（ジェネリクスとの組み合わせ）

```typescript
type Response<T> = {
  data: T;
  status: number;
};

type WithMetadata = {
  metadata: { timestamp: Date; requestId: string };
};

type ApiResponse<T> = Response<T> & WithMetadata;
```

**ポイント:**
- ジェネリック型と交差型を組み合わせて柔軟な型を作成
- APIレスポンスに共通のメタデータを追加
- 型の再利用性が高い

### 問題15: Mixin 関数

```typescript
function mixin<T, U>(obj1: T, obj2: U): T & U {
  return Object.assign({}, obj1, obj2);
}
```

**ポイント:**
- `Object.assign()` を使ってオブジェクトをマージ
- スプレッド構文（`{ ...obj1, ...obj2 }`）でも同様の結果
- `Object.assign({}, ...)` は新しいオブジェクトを作成（元のオブジェクトを変更しない）

## 実践的なユースケース

### 1. データベースモデルの型定義

```typescript
type BaseModel = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

type User = BaseModel & {
  name: string;
  email: string;
};

type Post = BaseModel & {
  title: string;
  content: string;
  authorId: string;
};
```

### 2. APIレスポンスの型

```typescript
type ApiMetadata = {
  timestamp: Date;
  version: string;
};

type ApiResponse<T> = {
  data: T;
  status: number;
} & ApiMetadata;
```

### 3. React のコンポーネントプロパティ

```typescript
type ButtonProps = {
  label: string;
  onClick: () => void;
};

type StyledProps = {
  className?: string;
  style?: React.CSSProperties;
};

type StyledButton = ButtonProps & StyledProps;
```

## 交差型の落とし穴

### 1. プリミティブ型の交差

```typescript
type Never = string & number; // never 型
```

**説明:**
- `string` と `number` を同時に満たすことはできない
- 結果として `never` 型になる（決して値を持たない型）

### 2. 矛盾するプロパティ

```typescript
type A = { x: string };
type B = { x: number };
type C = A & B; // { x: never }
```

**説明:**
- 同じプロパティ名で異なる型を持つ場合、そのプロパティは `never` 型になる
- 実際には使用できない型になってしまう

## ベストプラクティス

### 1. 意味のある型の組み合わせ

交差型は意味的に組み合わせ可能な型にのみ使用しましょう。

```typescript
// 推奨: 意味のある組み合わせ
type Employee = Person & Contact & Timestamped;

// 非推奨: 意味のない組み合わせ
type Weird = Array<string> & number; // never
```

### 2. Mixin パターンの活用

共通の機能を小さな型として定義し、必要に応じて組み合わせましょう。

```typescript
type Identifiable = { id: string };
type Timestamped = { createdAt: Date; updatedAt: Date };
type SoftDeletable = { deletedAt: Date | null };

type User = Identifiable & Timestamped & SoftDeletable & {
  name: string;
  email: string;
};
```

### 3. 型の命名

交差型には明確な名前を付けましょう。

```typescript
// 推奨
type AdminUser = User & { role: 'admin'; permissions: string[] };

// 非推奨（インラインで使用）
function process(user: User & { role: 'admin' }): void { /* ... */ }
```

## まとめ

交差型は TypeScript の強力な機能で、以下のような利点があります：

- **コード再利用**: 共通の型を定義して再利用できる
- **柔軟性**: 既存の型を変更せずに拡張できる
- **型安全性**: すべてのプロパティに型安全にアクセスできる
- **保守性**: 機能ごとに型を分割して管理できる

Mixin パターンと組み合わせることで、保守性の高いコードベースを構築できます。
