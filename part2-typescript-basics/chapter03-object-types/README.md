# Chapter 3: オブジェクトの型

## 目次
1. [オブジェクト型の定義](#1-オブジェクト型の定義)
2. [インターフェース（interface）](#2-インターフェースinterface)
3. [型エイリアス（type）](#3-型エイリアスtype)
4. [interface と type の使い分け](#4-interface-と-type-の使い分け)
5. [オプショナルプロパティ](#5-オプショナルプロパティ)
6. [readonly プロパティ](#6-readonly-プロパティ)

---

## 1. オブジェクト型の定義

TypeScript では、オブジェクトの形状（プロパティとその型）を定義できます。

### インラインでオブジェクト型を定義

```typescript
// オブジェクト型の定義
let user: { name: string; age: number } = {
  name: '太郎',
  age: 25,
};

console.log(user.name); // '太郎'

// エラー例
// user.email = 'taro@example.com'; // Property 'email' does not exist on type
```

### 関数の引数にオブジェクト型を使う

```typescript
function printUser(user: { name: string; age: number }): void {
  console.log(`名前: ${user.name}, 年齢: ${user.age}`);
}

printUser({ name: '花子', age: 30 }); // OK

// エラー例
// printUser({ name: '次郎' }); // Property 'age' is missing
```

### ネストしたオブジェクト型

```typescript
let product: {
  id: number;
  name: string;
  price: number;
  details: {
    description: string;
    category: string;
  };
} = {
  id: 1,
  name: 'ノートPC',
  price: 80000,
  details: {
    description: '高性能ノートパソコン',
    category: '電子機器',
  },
};
```

---

## 2. インターフェース（interface）

`interface` を使うと、オブジェクトの型に名前を付けて再利用できます。

### 基本的な使い方

```typescript
// インターフェースの定義
interface User {
  id: number;
  name: string;
  email: string;
}

// インターフェースを使った変数定義
const user1: User = {
  id: 1,
  name: '太郎',
  email: 'taro@example.com',
};

const user2: User = {
  id: 2,
  name: '花子',
  email: 'hanako@example.com',
};
```

### インターフェースの拡張

`extends` を使って既存のインターフェースを拡張できます。

```typescript
interface Person {
  name: string;
  age: number;
}

// Person を拡張
interface Student extends Person {
  studentId: string;
  grade: number;
}

const student: Student = {
  name: '太郎',
  age: 20,
  studentId: 'S12345',
  grade: 3,
};
```

### 複数のインターフェースを拡張

```typescript
interface Named {
  name: string;
}

interface Aged {
  age: number;
}

// 複数のインターフェースを拡張
interface Person extends Named, Aged {
  email: string;
}

const person: Person = {
  name: '太郎',
  age: 25,
  email: 'taro@example.com',
};
```

### メソッドを持つインターフェース

```typescript
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calc: Calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
};

console.log(calc.add(5, 3)); // 8
console.log(calc.subtract(10, 4)); // 6
```

---

## 3. 型エイリアス（type）

`type` を使っても、オブジェクトの型に名前を付けられます。

### 基本的な使い方

```typescript
// 型エイリアスの定義
type User = {
  id: number;
  name: string;
  email: string;
};

const user: User = {
  id: 1,
  name: '太郎',
  email: 'taro@example.com',
};
```

### 交差型（Intersection Types）

`&` を使って複数の型を組み合わせられます。

```typescript
type Person = {
  name: string;
  age: number;
};

type Contact = {
  email: string;
  phone: string;
};

// 交差型で組み合わせ
type Employee = Person & Contact & {
  employeeId: string;
};

const employee: Employee = {
  name: '太郎',
  age: 30,
  email: 'taro@example.com',
  phone: '090-1234-5678',
  employeeId: 'E001',
};
```

### ユニオン型（Union Types）

型エイリアスでは、ユニオン型（複数の型のいずれか）も定義できます。

```typescript
type Status = 'pending' | 'approved' | 'rejected';

type Result =
  | { success: true; data: string }
  | { success: false; error: string };

function handleResult(result: Result) {
  if (result.success) {
    console.log('データ:', result.data);
  } else {
    console.log('エラー:', result.error);
  }
}
```

---

## 4. interface と type の使い分け

### interface を使うべき場合

✅ **オブジェクトの形状を定義する場合**
```typescript
interface User {
  id: number;
  name: string;
}
```

✅ **拡張が必要な場合（継承）**
```typescript
interface Animal {
  name: string;
}

interface Dog extends Animal {
  bark(): void;
}
```

✅ **宣言のマージが必要な場合**
```typescript
// 同じ名前のインターフェースは自動的にマージされる
interface Window {
  title: string;
}

interface Window {
  open(): void;
}

// Window は { title: string; open(): void; } となる
```

### type を使うべき場合

✅ **ユニオン型やタプル型を定義する場合**
```typescript
type ID = string | number;
type Point = [number, number];
type Status = 'loading' | 'success' | 'error';
```

✅ **交差型を使う場合**
```typescript
type A = { a: string };
type B = { b: number };
type C = A & B; // { a: string; b: number; }
```

✅ **プリミティブ型にエイリアスをつける場合**
```typescript
type UserID = number;
type Email = string;
```

### 基本的なガイドライン

| 用途 | 推奨 | 理由 |
|------|------|------|
| オブジェクトの形状 | `interface` | 拡張しやすく、エラーメッセージがわかりやすい |
| ユニオン型 | `type` | `interface` では定義できない |
| 関数型 | `type` | より簡潔に書ける |
| タプル型 | `type` | より自然な表記 |
| React Props | `interface` | コンポーネントの拡張がしやすい |

---

## 5. オプショナルプロパティ

プロパティ名の後ろに `?` をつけると、そのプロパティを省略可能にできます。

### 基本的な使い方

```typescript
interface User {
  id: number;
  name: string;
  email?: string; // オプショナル
  phone?: string; // オプショナル
}

// email と phone は省略可能
const user1: User = {
  id: 1,
  name: '太郎',
};

const user2: User = {
  id: 2,
  name: '花子',
  email: 'hanako@example.com',
};
```

### オプショナルプロパティのアクセス

オプショナルプロパティは `undefined` の可能性があるため、アクセス時に注意が必要です。

```typescript
interface Product {
  id: number;
  name: string;
  description?: string;
}

function printProduct(product: Product) {
  console.log(product.name);

  // Optional Chaining を使った安全なアクセス
  console.log(product.description?.toUpperCase());

  // または、デフォルト値を設定
  const desc = product.description ?? '説明なし';
  console.log(desc);
}
```

### 関数の引数でのオプショナルプロパティ

```typescript
interface Config {
  host: string;
  port?: number;
  timeout?: number;
}

function connectToServer(config: Config) {
  const port = config.port ?? 8080;
  const timeout = config.timeout ?? 3000;

  console.log(`接続先: ${config.host}:${port}, タイムアウト: ${timeout}ms`);
}

connectToServer({ host: 'localhost' });
connectToServer({ host: 'example.com', port: 3000, timeout: 5000 });
```

---

## 6. readonly プロパティ

`readonly` をつけたプロパティは、初期化後に変更できなくなります。

### 基本的な使い方

```typescript
interface User {
  readonly id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: '太郎',
  email: 'taro@example.com',
};

// OK: readonly でないプロパティは変更可能
user.name = '太郎2';
user.email = 'taro2@example.com';

// エラー: readonly プロパティは変更不可
// user.id = 2; // Cannot assign to 'id' because it is a read-only property
```

### 配列を readonly にする

```typescript
interface Group {
  readonly members: readonly string[];
}

const group: Group = {
  members: ['太郎', '花子', '次郎'],
};

// エラー: readonly 配列は変更不可
// group.members.push('四郎'); // Property 'push' does not exist on type 'readonly string[]'
// group.members[0] = '太郎2'; // Index signature in type 'readonly string[]' only permits reading
```

### Readonly ユーティリティ型

TypeScript には、すべてのプロパティを `readonly` にする `Readonly<T>` ユーティリティ型があります。

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// すべてのプロパティが readonly になる
const user: Readonly<User> = {
  id: 1,
  name: '太郎',
  email: 'taro@example.com',
};

// エラー: すべて変更不可
// user.name = '花子'; // Cannot assign to 'name' because it is a read-only property
```

### readonly の使いどころ

✅ **定数的なデータ**
```typescript
interface Config {
  readonly apiUrl: string;
  readonly apiKey: string;
}
```

✅ **ID のような不変の値**
```typescript
interface Entity {
  readonly id: number;
  readonly createdAt: Date;
  updatedAt: Date;
}
```

✅ **関数の引数で変更を防ぐ**
```typescript
function processUsers(users: readonly User[]): void {
  // この関数内では users を変更できない
  for (const user of users) {
    console.log(user.name);
  }
}
```

---

## まとめ

### オブジェクトの型定義

- **インラインでの定義**: 単発の使用に便利
- **interface**: オブジェクトの形状を定義し、拡張可能
- **type**: ユニオン型、交差型など柔軟な型定義が可能

### interface と type の使い分け

| 特徴 | interface | type |
|------|-----------|------|
| オブジェクト型の定義 | ✅ | ✅ |
| 拡張（extends） | ✅ | ✅（& で交差型） |
| ユニオン型 | ❌ | ✅ |
| タプル型 | ❌ | ✅ |
| プリミティブ型 | ❌ | ✅ |
| 宣言のマージ | ✅ | ❌ |

### オプショナルとreadonly

- **オプショナル（`?`）**: プロパティを省略可能にする
- **readonly**: プロパティを読み取り専用にする

---

## 練習問題

練習問題は `exercises/` フォルダにあります：

1. `01-object-types.ts` - オブジェクト型の基本定義
2. `02-interface.ts` - interface の使い方
3. `03-type-alias.ts` - type エイリアスの使い方
4. `04-interface-vs-type.ts` - interface と type の使い分け
5. `05-optional-readonly.ts` - オプショナル・readonly プロパティ

解答例は `solutions/` フォルダにあります。

---

## 次のステップ

次は **Chapter 4: 関数の型** で、関数の引数や戻り値の型定義について学びます。
