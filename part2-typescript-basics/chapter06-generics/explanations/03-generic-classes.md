# ジェネリッククラス 解説

## 概要

ジェネリッククラス（Generic Classes）は、クラスに型パラメータを導入することで、様々な型に対応できる再利用可能なクラスを作成する機能です。データ構造やコンテナクラスの実装に特に有用です。

## 基本概念

### ジェネリッククラスの構文

```typescript
class Container<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

// 使用例
const numContainer = new Container<number>(42);
const strContainer = new Container<string>('hello');
```

### 複数の型パラメータ

```typescript
class Pair<T, U> {
  constructor(public first: T, public second: U) {}
}

const pair = new Pair<string, number>('age', 30);
```

## 各問題の解説

### 問題1: Box クラス

```typescript
class Box<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}
```

**ポイント:**
- 最もシンプルなジェネリッククラスの例
- `private value: T` でプライベートフィールドを型安全に保持
- getter/setter パターンの実装

**使用例:**
```typescript
const numBox = new Box(42);
console.log(numBox.getValue()); // 42
numBox.setValue(100);
console.log(numBox.getValue()); // 100

const strBox = new Box('hello');
strBox.setValue(123); // エラー: number は string に割り当てられない
```

### 問題2: Stack クラス（LIFO）

```typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}
```

**ポイント:**
- **LIFO（Last In, First Out）**: 後入れ先出し
- `peek()` は取り出さずに最後の要素を参照
- `pop()` は空の場合 `undefined` を返す

**使用例:**
```typescript
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.peek()); // 3（取り出さない）
console.log(stack.pop());  // 3（取り出す）
console.log(stack.pop());  // 2
console.log(stack.isEmpty()); // false
```

**図解:**
```
push(1) → [1]
push(2) → [1, 2]
push(3) → [1, 2, 3] ← peek() は 3 を返す
pop()   → [1, 2]    ← 3 を返す
```

### 問題3: Queue クラス（FIFO）

```typescript
class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}
```

**ポイント:**
- **FIFO（First In, First Out）**: 先入れ先出し
- `enqueue()` で末尾に追加、`dequeue()` で先頭から取り出し
- 処理待ちキューの実装に使用

**使用例:**
```typescript
const queue = new Queue<string>();
queue.enqueue('first');
queue.enqueue('second');
queue.enqueue('third');

console.log(queue.dequeue()); // 'first'
console.log(queue.dequeue()); // 'second'
```

**図解:**
```
enqueue('first')  → ['first']
enqueue('second') → ['first', 'second']
enqueue('third')  → ['first', 'second', 'third']
dequeue()         → ['second', 'third'] ← 'first' を返す
```

### 問題4: Pair クラス

```typescript
class Pair<T, U> {
  constructor(private first: T, private second: U) {}

  getFirst(): T {
    return this.first;
  }

  getSecond(): U {
    return this.second;
  }

  swap(): Pair<U, T> {
    return new Pair(this.second, this.first);
  }
}
```

**ポイント:**
- 2つの異なる型を保持
- `swap()` は型パラメータを入れ替えた新しい Pair を返す
- イミュータブルな設計（元の Pair は変更しない）

**使用例:**
```typescript
const pair = new Pair('name', 42);
console.log(pair.getFirst());  // 'name' (string)
console.log(pair.getSecond()); // 42 (number)

const swapped = pair.swap();
console.log(swapped.getFirst());  // 42 (number)
console.log(swapped.getSecond()); // 'name' (string)
```

### 問題5: Optional クラス（Option パターン）

```typescript
class Optional<T> {
  private constructor(private value: T | null) {}

  static some<T>(value: T): Optional<T> {
    return new Optional(value);
  }

  static none<T>(): Optional<T> {
    return new Optional<T>(null);
  }

  isSome(): boolean {
    return this.value !== null;
  }

  isNone(): boolean {
    return this.value === null;
  }

  unwrap(): T {
    if (this.value === null) {
      throw new Error('Cannot unwrap None value');
    }
    return this.value;
  }

  unwrapOr(defaultValue: T): T {
    return this.value !== null ? this.value : defaultValue;
  }
}
```

**ポイント:**
- **Option パターン**: null を明示的に扱う
- プライベートコンストラクタと静的ファクトリメソッド
- `unwrap()` は値がない場合に例外をスロー
- `unwrapOr()` はデフォルト値を提供

**使用例:**
```typescript
function findUser(id: number): Optional<User> {
  const user = database.find(u => u.id === id);
  return user ? Optional.some(user) : Optional.none();
}

const result = findUser(1);
if (result.isSome()) {
  console.log(result.unwrap().name);
} else {
  console.log('User not found');
}

// または
const name = result.unwrapOr({ name: 'Anonymous' }).name;
```

### 問題6: Result クラス（Result パターン）

```typescript
class Result<T, E> {
  private constructor(
    private value: T | null,
    private error: E | null,
    private ok: boolean
  ) {}

  static ok<T, E>(value: T): Result<T, E> {
    return new Result<T, E>(value, null, true);
  }

  static err<T, E>(error: E): Result<T, E> {
    return new Result<T, E>(null, error, false);
  }

  isOk(): boolean {
    return this.ok;
  }

  isErr(): boolean {
    return !this.ok;
  }

  unwrap(): T {
    if (!this.ok || this.value === null) {
      throw new Error('Cannot unwrap Err value');
    }
    return this.value;
  }

  unwrapErr(): E {
    if (this.ok || this.error === null) {
      throw new Error('Cannot unwrap Ok value');
    }
    return this.error;
  }
}
```

**ポイント:**
- **Result パターン**: 成功または失敗を表現
- `T` は成功時の値の型、`E` はエラーの型
- 例外をスローせずにエラーを扱える
- Rust の Result 型に着想を得たパターン

**使用例:**
```typescript
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return Result.err('Division by zero');
  }
  return Result.ok(a / b);
}

const result = divide(10, 2);
if (result.isOk()) {
  console.log(`Result: ${result.unwrap()}`); // 5
} else {
  console.log(`Error: ${result.unwrapErr()}`);
}

const result2 = divide(10, 0);
if (result2.isErr()) {
  console.log(result2.unwrapErr()); // 'Division by zero'
}
```

### 問題7: List クラス

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
    newList.items = this.items.filter(predicate);
    return newList;
  }

  map<U>(fn: (item: T) => U): List<U> {
    const newList = new List<U>();
    newList.items = this.items.map(fn);
    return newList;
  }
}
```

**ポイント:**
- 配列のラッパークラス
- `filter()` は同じ型の新しい List を返す
- `map()` は異なる型 `U` の List を返す（メソッドレベルのジェネリクス）
- メソッドチェーンが可能

**使用例:**
```typescript
const list = new List<number>();
list.add(1);
list.add(2);
list.add(3);

const doubled = list.map(x => x * 2);
// doubled は List<number>

const strings = list.map(x => x.toString());
// strings は List<string>

const filtered = list.filter(x => x > 1);
// filtered は List<number>（2, 3 のみ）
```

### 問題8: Cache クラス

```typescript
class Cache<K, V> {
  private store = new Map<K, V>();

  set(key: K, value: V): void {
    this.store.set(key, value);
  }

  get(key: K): V | undefined {
    return this.store.get(key);
  }

  has(key: K): boolean {
    return this.store.has(key);
  }

  clear(): void {
    this.store.clear();
  }
}
```

**ポイント:**
- キーと値の両方に型パラメータ
- `Map` を内部で使用
- シンプルなキャッシュの実装

**使用例:**
```typescript
const userCache = new Cache<number, User>();
userCache.set(1, { id: 1, name: 'Alice' });

if (userCache.has(1)) {
  const user = userCache.get(1);
  console.log(user?.name); // 'Alice'
}

// 異なる型のキャッシュ
const sessionCache = new Cache<string, Session>();
sessionCache.set('abc123', { userId: 1, expires: new Date() });
```

### 問題9: TreeNode クラス

```typescript
class TreeNode<T> {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(public value: T) {}

  insert(value: T): void {
    if ((value as any) < (this.value as any)) {
      if (this.left === null) {
        this.left = new TreeNode(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (this.right === null) {
        this.right = new TreeNode(value);
      } else {
        this.right.insert(value);
      }
    }
  }
}
```

**ポイント:**
- **二分探索木（Binary Search Tree）** の実装
- 再帰的な自己参照型
- 左は小さい値、右は大きい値

**使用例:**
```typescript
const tree = new TreeNode(5);
tree.insert(3);
tree.insert(7);
tree.insert(1);

//       5
//      / \
//     3   7
//    /
//   1

console.log(tree.value);       // 5
console.log(tree.left?.value); // 3
console.log(tree.right?.value); // 7
console.log(tree.left?.left?.value); // 1
```

### 問題10: Observable クラス

```typescript
class Observable<T> {
  private subscribers: Array<(value: T) => void> = [];

  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
    this.subscribers.forEach(callback => callback(value));
  }

  subscribe(callback: (value: T) => void): void {
    this.subscribers.push(callback);
  }
}
```

**ポイント:**
- **Observer パターン** の実装
- 値が変更されると全ての購読者に通知
- リアクティブプログラミングの基礎

**使用例:**
```typescript
const count = new Observable(0);

count.subscribe(value => console.log(`Count: ${value}`));
count.subscribe(value => {
  if (value > 10) {
    console.log('Count exceeded 10!');
  }
});

count.setValue(5);  // Count: 5
count.setValue(15); // Count: 15, Count exceeded 10!
```

### 問題11: Container クラスの継承

```typescript
class Container<T> {
  protected items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return [...this.items];
  }
}

class NumberContainer extends Container<number> {
  sum(): number {
    return this.items.reduce((acc, curr) => acc + curr, 0);
  }
}
```

**ポイント:**
- ジェネリッククラスの継承
- `protected` で子クラスからアクセス可能
- 具体的な型で継承することで特化したメソッドを追加

**使用例:**
```typescript
const numbers = new NumberContainer();
numbers.add(1);
numbers.add(2);
numbers.add(3);

console.log(numbers.getAll()); // [1, 2, 3]
console.log(numbers.sum());    // 6
```

### 問題12: SortedList クラス

```typescript
class SortedList<T> {
  private items: T[] = [];

  constructor(private comparator: (a: T, b: T) => number) {}

  add(item: T): void {
    this.items.push(item);
    this.items.sort(this.comparator);
  }

  getAll(): T[] {
    return [...this.items];
  }
}
```

**ポイント:**
- **Strategy パターン**: 比較ロジックを外部から注入
- 要素追加時に自動的にソート
- どんな型でも比較関数を指定すればソート可能

**使用例:**
```typescript
// 数値の昇順
const numbers = new SortedList<number>((a, b) => a - b);
numbers.add(3);
numbers.add(1);
numbers.add(2);
console.log(numbers.getAll()); // [1, 2, 3]

// オブジェクトの降順（年齢順）
const people = new SortedList<Person>((a, b) => b.age - a.age);
people.add({ name: 'Alice', age: 30 });
people.add({ name: 'Bob', age: 25 });
// [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }]
```

### 問題13: Lazy クラス

```typescript
class Lazy<T> {
  private computed = false;
  private value: T | undefined;

  constructor(private factory: () => T) {}

  getValue(): T {
    if (!this.computed) {
      this.value = this.factory();
      this.computed = true;
    }
    return this.value!;
  }
}
```

**ポイント:**
- **遅延評価（Lazy Evaluation）**: 必要になるまで計算しない
- 一度計算したらキャッシュ（メモ化）
- 重い初期化処理の最適化に使用

**使用例:**
```typescript
const expensiveValue = new Lazy(() => {
  console.log('Computing expensive value...');
  // 重い処理
  return Math.random();
});

console.log(expensiveValue.getValue());
// Computing expensive value...
// 0.123456789

console.log(expensiveValue.getValue());
// 0.123456789（ログは出ない、キャッシュされた値）
```

### 問題14: EventEmitter クラス

```typescript
class EventEmitter<T> {
  private events = new Map<string, Array<(data: T) => void>>();

  on(event: string, callback: (data: T) => void): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
  }

  emit(event: string, data: T): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  off(event: string): void {
    this.events.delete(event);
  }
}
```

**ポイント:**
- **Pub/Sub パターン**: イベント駆動プログラミング
- イベント名とコールバックのマッピング
- 型パラメータでイベントデータの型を指定

**使用例:**
```typescript
interface Message {
  from: string;
  text: string;
}

const emitter = new EventEmitter<Message>();

emitter.on('message', (msg) => {
  console.log(`${msg.from}: ${msg.text}`);
});

emitter.on('message', (msg) => {
  // ログに保存など
});

emitter.emit('message', { from: 'Alice', text: 'Hello!' });
// Alice: Hello!

emitter.off('message'); // 全てのリスナーを解除
```

### 問題15: Builder パターン

```typescript
class Builder<T> {
  private obj: Partial<T> = {};

  set<K extends keyof T>(key: K, value: T[K]): Builder<T> {
    this.obj[key] = value;
    return this;
  }

  build(): T {
    return this.obj as T;
  }
}
```

**ポイント:**
- **Builder パターン**: オブジェクトを段階的に構築
- メソッドチェーンのための `this` 返却
- `keyof T` 制約で型安全なプロパティ設定

**使用例:**
```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

const user = new Builder<User>()
  .set('name', 'Alice')
  .set('age', 30)
  .set('email', 'alice@example.com')
  .build();

// 型エラー
new Builder<User>()
  .set('name', 123); // エラー: number は string に割り当てられない
```

## ジェネリッククラスのベストプラクティス

### 1. 型パラメータの適切な命名

```typescript
// ❌ 意味不明
class Store<A, B, C> { ... }

// ✅ 意味が明確
class Store<Key, Value, Config> { ... }

// ✅ 慣例的な命名
class Container<T> { ... }        // T = Type
class Map<K, V> { ... }           // K = Key, V = Value
class Result<T, E> { ... }        // T = Type, E = Error
```

### 2. 制約の活用

```typescript
// ❌ 制約なし
class Repository<T> {
  findById(id: number): T | undefined { ... }
}

// ✅ 制約あり
interface Entity {
  id: number;
}

class Repository<T extends Entity> {
  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }
}
```

### 3. 静的メンバーとジェネリクス

```typescript
// ❌ 静的プロパティに型パラメータは使えない
class Container<T> {
  static defaultValue: T; // エラー
}

// ✅ 静的メソッドには個別の型パラメータを使う
class Container<T> {
  static create<U>(value: U): Container<U> {
    return new Container(value);
  }
}
```

### 4. イミュータブルな設計

```typescript
// ❌ ミュータブル
class List<T> {
  items: T[] = [];
}

// ✅ イミュータブル
class List<T> {
  private readonly items: readonly T[];

  constructor(items: T[] = []) {
    this.items = [...items];
  }

  add(item: T): List<T> {
    return new List([...this.items, item]);
  }
}
```

## よくある間違いと解決策

### 1. 型パラメータの過剰使用

```typescript
// ❌ 不要な型パラメータ
class Logger<T> {
  log(message: string): void {
    console.log(message);
  }
}

// ✅ 型パラメータが必要ない
class Logger {
  log(message: string): void {
    console.log(message);
  }
}
```

### 2. 型の消失

```typescript
// ❌ 型情報が失われる
class Container<T> {
  getValue(): any {
    return this.value;
  }
}

// ✅ 型情報を保持
class Container<T> {
  getValue(): T {
    return this.value;
  }
}
```

### 3. null/undefined の扱い

```typescript
// ❌ null を考慮していない
class Box<T> {
  get(): T {
    return this.value; // undefined の可能性
  }
}

// ✅ null を考慮
class Box<T> {
  get(): T | undefined {
    return this.value;
  }
}
```

## まとめ

ジェネリッククラスを使うと：

- ✅ 型安全なデータ構造を実装できる
- ✅ 再利用可能なコンテナクラスを作成できる
- ✅ デザインパターンを型安全に実装できる
- ✅ コレクション操作を抽象化できる

**よく使われるパターン:**
- コンテナ（Box, Container, Wrapper）
- コレクション（List, Stack, Queue）
- 結果型（Option, Result）
- イベント（Observable, EventEmitter）
- ビルダー（Builder）

ジェネリッククラスは、TypeScript の型システムを最大限に活用した、堅牢で再利用可能なコードを書くための重要な機能です。
