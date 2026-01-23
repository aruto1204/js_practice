# ジェネリック制約 解説

## 概要

ジェネリック制約（Generic Constraints）は、`extends` キーワードを使って型パラメータに制限を設ける機能です。これにより、ジェネリック型が持つべき最小限のプロパティやメソッドを保証できます。

## 基本概念

### 制約の構文

```typescript
// T は { length: number } を持つ型に制限される
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

// 使用例
getLength('hello');     // OK: string は length を持つ
getLength([1, 2, 3]);   // OK: 配列は length を持つ
getLength(123);         // エラー: number は length を持たない
```

### 制約の種類

1. **オブジェクト型制約**: `T extends { prop: type }`
2. **インターフェース制約**: `T extends Interface`
3. **ユニオン型制約**: `T extends string | number`
4. **キー制約**: `K extends keyof T`

## 各問題の解説

### 問題1: length プロパティを持つ型の制約

```typescript
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}
```

**ポイント:**
- `{ length: number }` は構造的部分型（Structural Subtype）
- string、配列、独自オブジェクトなど、`length` を持つものすべてに対応
- 型パラメータ `T` の実際の型情報は保持される

**使用例:**
```typescript
getLength('hello');           // 5
getLength([1, 2, 3]);         // 3
getLength({ length: 10 });    // 10

// エラー
getLength(42);                // number は length を持たない
getLength({ size: 5 });       // size はあるが length がない
```

### 問題2: オブジェクトのプロパティ取得（keyof 制約）

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

**ポイント:**
- `keyof T` は T のすべてのキーのユニオン型
- `K extends keyof T` で K を T のキーに制限
- `T[K]` はインデックスアクセス型（対応する値の型）

**型の流れ:**
```typescript
interface User {
  name: string;
  age: number;
}

const user: User = { name: 'Alice', age: 30 };

// keyof User = 'name' | 'age'
getProperty(user, 'name');  // K = 'name', 戻り値: string
getProperty(user, 'age');   // K = 'age', 戻り値: number
getProperty(user, 'email'); // エラー: 'email' は keyof User にない
```

### 問題3: オブジェクトのプロパティ設定

```typescript
function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): T {
  return { ...obj, [key]: value };
}
```

**ポイント:**
- `value: T[K]` でキーに対応する型の値のみ許可
- イミュータブルな更新（元のオブジェクトを変更しない）
- 型安全なプロパティ更新

**使用例:**
```typescript
const user = { name: 'Alice', age: 30 };

setProperty(user, 'age', 31);      // OK
setProperty(user, 'age', 'thirty'); // エラー: string は number に割り当てられない
setProperty(user, 'email', 'a@b.com'); // エラー: 'email' は存在しない
```

### 問題4: 比較可能な型の制約（インターフェース制約）

```typescript
interface Comparable<T> {
  compareTo(other: T): number;
}

function sort<T extends Comparable<T>>(array: T[]): T[] {
  return [...array].sort((a, b) => a.compareTo(b));
}
```

**ポイント:**
- `Comparable<T>` インターフェースを実装した型のみ受け付ける
- `compareTo` メソッドの存在が保証される
- 自己参照型（Self-referential type）: `Comparable<T>` の T は自分自身

**使用例:**
```typescript
class Person implements Comparable<Person> {
  constructor(public age: number) {}

  compareTo(other: Person): number {
    return this.age - other.age;
  }
}

const people = [new Person(30), new Person(20), new Person(25)];
const sorted = sort(people);
// [Person(20), Person(25), Person(30)]
```

### 問題5: 数値または文字列の制約（ユニオン型制約）

```typescript
function add<T extends number | string>(a: T, b: T): T {
  if (typeof a === 'number' && typeof b === 'number') {
    return (a + b) as T;
  }
  return (String(a) + String(b)) as T;
}
```

**ポイント:**
- `T extends number | string` で許容する型を制限
- 型ガードで実行時の型を判定
- `as T` で戻り値の型をアサーション

**注意点:**
この実装では型アサーションが必要です。TypeScript は `+` 演算子の結果が元の型 `T` と同じであることを自動的に推論できません。

**使用例:**
```typescript
add(1, 2);           // 3 (number)
add('hello', 'world'); // 'helloworld' (string)
add(1, 'hello');     // エラー: 両方同じ型である必要がある
add(true, false);    // エラー: boolean は許可されていない
```

### 問題6: 配列要素の制約

```typescript
function flatten<T>(array: T[][]): T[] {
  return array.flat();
}
```

**ポイント:**
- `T[][]` は「T の配列の配列」
- `array.flat()` で1段階フラット化
- 型パラメータ T は内部要素の型

**使用例:**
```typescript
flatten([[1, 2], [3, 4]]);       // [1, 2, 3, 4]
flatten([['a', 'b'], ['c']]);    // ['a', 'b', 'c']
```

### 問題7: コンストラクタの制約

```typescript
function create<T>(constructor: new (...args: any[]) => T, ...args: any[]): T {
  return new constructor(...args);
}
```

**ポイント:**
- `new (...args: any[]) => T` はコンストラクタシグネチャ
- `new` キーワードでインスタンス化可能な型を表す
- ファクトリパターンの実装に使用

**構文の解説:**
```typescript
// コンストラクタ型の構文
type Constructor<T> = new (...args: any[]) => T;

// 等価な書き方
type Constructor<T> = {
  new (...args: any[]): T;
};
```

**使用例:**
```typescript
class Person {
  constructor(public name: string, public age: number) {}
}

const person = create(Person, 'Alice', 30);
// person の型: Person
console.log(person.name); // 'Alice'
```

### 問題8: 複数の制約（交差型）

```typescript
interface Named {
  name: string;
}

interface Aged {
  age: number;
}

function describe<T extends Named & Aged>(obj: T): string {
  return `${obj.name} is ${obj.age} years old`;
}
```

**ポイント:**
- `T extends Named & Aged` で複数のインターフェースを要求
- 交差型（`&`）で複数の制約を組み合わせ
- `obj` は `name` と `age` 両方を持つことが保証される

**使用例:**
```typescript
// OK: 両方のプロパティを持つ
describe({ name: 'Alice', age: 30 });

// OK: 追加のプロパティがあっても良い
describe({ name: 'Bob', age: 25, email: 'bob@example.com' });

// エラー: age がない
describe({ name: 'Charlie' });
```

### 問題9: オブジェクト型の制約

```typescript
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 } as T & U;
}
```

**ポイント:**
- `T extends object` でプリミティブ型を除外
- 2つのオブジェクトをマージして交差型を返す
- スプレッド構文でシャローマージ

**使用例:**
```typescript
const merged = merge({ a: 1 }, { b: 2 });
// merged の型: { a: number } & { b: number }
console.log(merged.a, merged.b); // 1, 2

// エラー: プリミティブ型は不可
merge(123, 456);
merge('hello', 'world');
```

### 問題10: キーの制約（Pick の実装）

```typescript
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}
```

**ポイント:**
- `Pick<T, K>` は T から K のキーのみを持つ型
- キーの配列を受け取り、対応するプロパティのみを抽出
- 型安全なオブジェクトの部分抽出

**使用例:**
```typescript
const user = { id: 1, name: 'Alice', email: 'alice@example.com', age: 30 };

const preview = pick(user, ['id', 'name']);
// preview の型: Pick<User, 'id' | 'name'>
// preview: { id: 1, name: 'Alice' }

pick(user, ['invalid']); // エラー: 'invalid' は keyof User にない
```

### 問題11: 配列の最小値（数値制約）

```typescript
function min<T extends number>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return Math.min(...array) as T;
}
```

**ポイント:**
- `T extends number` で数値型に制限
- 空配列の場合は `undefined` を返す
- リテラル型も受け付ける

**使用例:**
```typescript
min([3, 1, 4, 1, 5]); // 1
min([]);               // undefined

// リテラル型の場合
const nums = [1, 2, 3] as const;
min([...nums]); // T = 1 | 2 | 3
```

### 問題12: メソッドを持つ型の制約

```typescript
function stringify<T extends { toString(): string }>(value: T): string {
  return value.toString();
}
```

**ポイント:**
- メソッドを持つことを制約で指定
- ほとんどの型は `toString()` を持つ
- カスタム `toString()` を実装したオブジェクトも対応

**使用例:**
```typescript
stringify(42);           // '42'
stringify({ toString: () => 'custom' }); // 'custom'
stringify([1, 2, 3]);    // '1,2,3'
```

### 問題13: ジェネリック制約とデフォルト値

```typescript
function getWithDefault<T extends object, K extends string>(
  obj: T,
  key: K,
  defaultValue: K extends keyof T ? T[K] : any
): K extends keyof T ? T[K] : any {
  if (key in obj) {
    return (obj as any)[key];
  }
  return defaultValue;
}
```

**ポイント:**
- 条件型（Conditional Type）を使用
- キーが存在する場合は対応する値の型
- 存在しない場合は `any` 型（デフォルト値用）

**使用例:**
```typescript
const obj = { name: 'Alice', age: 30 };

getWithDefault(obj, 'name', 'Unknown');     // 'Alice'
getWithDefault(obj, 'email', 'default@example.com'); // 'default@example.com'
```

### 問題14: 関数の制約

```typescript
function call<T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
): ReturnType<T> {
  return fn(...args);
}
```

**ポイント:**
- `T extends (...args: any[]) => any` で関数型に制限
- `Parameters<T>` で引数の型を抽出
- `ReturnType<T>` で戻り値の型を抽出

**使用例:**
```typescript
function add(a: number, b: number): number {
  return a + b;
}

const result = call(add, 1, 2);
// result の型: number
// 値: 3

call(add, 'a', 'b'); // エラー: 引数の型が合わない
```

### 問題15: Promise の制約（infer キーワード）

```typescript
type CustomAwaited<T> = T extends Promise<infer U> ? U : T;
```

**ポイント:**
- `infer U` で Promise の内部型を推論
- 条件型と組み合わせて使用
- Promise でない場合は元の型をそのまま返す

**型の解決:**
```typescript
type A = CustomAwaited<Promise<string>>;  // string
type B = CustomAwaited<Promise<number>>;  // number
type C = CustomAwaited<string>;           // string（Promise でない）

// ネストした Promise
type D = CustomAwaited<Promise<Promise<number>>>; // Promise<number>
// ※ 1段階のみ展開
```

## 制約のベストプラクティス

### 1. 必要最小限の制約を使用

```typescript
// ❌ 過度な制約
function getLength<T extends Array<any>>(arr: T): number {
  return arr.length;
}

// ✅ 必要最小限の制約
function getLength<T extends { length: number }>(arr: T): number {
  return arr.length;
}
// string も受け付けられる
```

### 2. keyof を活用する

```typescript
// ❌ 型安全でない
function getProp(obj: object, key: string): any {
  return (obj as any)[key];
}

// ✅ 型安全
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### 3. 制約の組み合わせ

```typescript
// 複数の制約を組み合わせる
function process<T extends Named & Aged & { id: number }>(item: T): void {
  console.log(item.id, item.name, item.age);
}
```

### 4. デフォルト型との併用

```typescript
// デフォルト型パラメータと制約
type Container<T extends object = { id: number }> = {
  data: T;
};

const c1: Container = { data: { id: 1 } };           // デフォルト型
const c2: Container<{ id: number; name: string }> = {
  data: { id: 1, name: 'Alice' }
};
```

## よくある間違いと解決策

### 1. 制約の不足

```typescript
// ❌ エラー: T に length があるとは限らない
function getLength<T>(value: T): number {
  return value.length; // エラー
}

// ✅ 制約を追加
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}
```

### 2. 過度な制約

```typescript
// ❌ 制約が厳しすぎる
function clone<T extends { clone(): T }>(obj: T): T {
  return obj.clone();
}

// ✅ より柔軟な方法
function clone<T extends object>(obj: T): T {
  return { ...obj };
}
```

### 3. keyof の誤用

```typescript
// ❌ keyof の使い方が間違っている
function getKey<T, K extends keyof T>(obj: T): K {
  return Object.keys(obj)[0] as K; // 危険
}

// ✅ 正しい使い方
function getKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}
```

## 実践的なユースケース

### 1. API クライアント

```typescript
interface Endpoint<T> {
  url: string;
  method: 'GET' | 'POST';
}

async function fetch<T>(endpoint: Endpoint<T>): Promise<T> {
  const response = await globalThis.fetch(endpoint.url, {
    method: endpoint.method,
  });
  return response.json();
}
```

### 2. フォームバリデーション

```typescript
interface Validatable {
  validate(): boolean;
  errors: string[];
}

function validateAll<T extends Validatable>(items: T[]): boolean {
  return items.every(item => item.validate());
}
```

### 3. リポジトリパターン

```typescript
interface Entity {
  id: number;
}

class Repository<T extends Entity> {
  private items: T[] = [];

  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  save(item: T): void {
    this.items.push(item);
  }
}
```

## まとめ

ジェネリック制約を使うと：

- ✅ 型パラメータに必要なプロパティやメソッドを保証できる
- ✅ より具体的な型情報を保持しながら柔軟性を維持できる
- ✅ コンパイル時にエラーを検出できる
- ✅ IDE のサポート（補完、リファクタリング）を受けられる

**主な制約パターン:**
- `T extends { prop: type }` - プロパティ制約
- `T extends Interface` - インターフェース制約
- `K extends keyof T` - キー制約
- `T extends A | B` - ユニオン型制約
- `T extends A & B` - 交差型制約

制約は強力な機能ですが、過度に使用すると柔軟性が失われます。必要最小限の制約を心がけましょう。
