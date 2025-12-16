/**
 * 解答例 3: ジェネリッククラス
 *
 * このファイルでは、ジェネリッククラスの実装の解答例を示します。
 */

// ==========================================
// 問題 1: Box クラス
// ==========================================
// 値を1つ保持する Box<T> クラスを実装してください
// メソッド: getValue(), setValue(value: T)

/**
 * 値を1つ保持するシンプルなコンテナクラス
 */
class Box<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}


// ==========================================
// 問題 2: Stack クラス
// ==========================================
// スタック（LIFO）を実装する Stack<T> クラスを作成してください
// メソッド: push(item: T), pop(): T | undefined, peek(): T | undefined, isEmpty(): boolean

/**
 * スタック（後入れ先出し）データ構造
 */
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


// ==========================================
// 問題 3: Queue クラス
// ==========================================
// キュー（FIFO）を実装する Queue<T> クラスを作成してください
// メソッド: enqueue(item: T), dequeue(): T | undefined, isEmpty(): boolean

/**
 * キュー（先入れ先出し）データ構造
 */
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


// ==========================================
// 問題 4: Pair クラス
// ==========================================
// 2つの値を保持する Pair<T, U> クラスを実装してください
// メソッド: getFirst(): T, getSecond(): U, swap(): Pair<U, T>

/**
 * 2つの異なる型の値を保持するペアクラス
 */
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


// ==========================================
// 問題 5: Option クラス
// ==========================================
// 値が存在するかしないかを表現する Option<T> クラスを実装してください
// メソッド: isSome(): boolean, isNone(): boolean, unwrap(): T, unwrapOr(defaultValue: T): T
// 静的メソッド: some(value: T), none()

/**
 * 値の有無を表現する Optional 型
 * Rust の Option や Scala の Option に相当
 */
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


// ==========================================
// 問題 6: Result クラス
// ==========================================
// 成功または失敗を表現する Result<T, E> クラスを実装してください
// メソッド: isOk(): boolean, isErr(): boolean, unwrap(): T, unwrapErr(): E
// 静的メソッド: ok(value: T), err(error: E)

/**
 * 成功または失敗を表現する Result 型
 * エラーハンドリングに使用
 */
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


// ==========================================
// 問題 7: List クラス
// ==========================================
// 配列のラッパー List<T> クラスを実装してください
// メソッド: add(item: T), get(index: number): T | undefined,
//          filter(predicate: (item: T) => boolean): List<T>,
//          map<U>(fn: (item: T) => U): List<U>

/**
 * 配列をラップしたリストクラス
 * 関数型プログラミングのメソッドを提供
 */
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


// ==========================================
// 問題 8: Cache クラス
// ==========================================
// キャッシュを実装する Cache<K, V> クラスを作成してください
// メソッド: set(key: K, value: V), get(key: K): V | undefined, has(key: K): boolean, clear()

/**
 * キー・バリューストアを実装したキャッシュクラス
 */
class GenericCache<K, V> {
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


// ==========================================
// 問題 9: TreeNode クラス
// ==========================================
// 二分木のノードを表す TreeNode<T> クラスを実装してください
// プロパティ: value: T, left: TreeNode<T> | null, right: TreeNode<T> | null
// メソッド: insert(value: T) （単純な二分探索木として実装）

/**
 * 二分探索木のノード
 * 数値の比較が可能な型を想定
 */
class TreeNode<T> {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(public value: T) {}

  insert(value: T): void {
    // 単純化のため、数値として比較
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


// ==========================================
// 問題 10: Observable クラス
// ==========================================
// 値の変更を監視できる Observable<T> クラスを実装してください
// メソッド: getValue(): T, setValue(value: T), subscribe(callback: (value: T) => void)
// setValue が呼ばれたら全ての購読者に通知

/**
 * リアクティブな値の変更を監視できるクラス
 */
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


// ==========================================
// 問題 11: Container クラスの拡張
// ==========================================
// Container<T> 基底クラスを作成し、それを継承した NumberContainer クラスを実装してください
// Container: add(item: T), getAll(): T[]
// NumberContainer: sum(): number（数値の合計を返す）

/**
 * 汎用的なコンテナ基底クラス
 */
class Container<T> {
  protected items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return [...this.items];
  }
}

/**
 * 数値専用のコンテナクラス
 * sum メソッドを追加
 */
class NumberContainer extends Container<number> {
  sum(): number {
    return this.items.reduce((acc, curr) => acc + curr, 0);
  }
}


// ==========================================
// 問題 12: Comparator を使った SortedList
// ==========================================
// 常にソートされた状態を保つ SortedList<T> クラスを実装してください
// コンストラクタで比較関数を受け取る
// メソッド: add(item: T), getAll(): T[]

/**
 * 常にソートされた状態を保つリストクラス
 */
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


// ==========================================
// 問題 13: Lazy クラス
// ==========================================
// 遅延評価を実装する Lazy<T> クラスを作成してください
// コンストラクタで関数を受け取り、getValue() が最初に呼ばれたときのみ実行

/**
 * 遅延評価を実装するクラス
 * 値は最初のアクセス時に計算される
 */
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


// ==========================================
// 問題 14: EventEmitter クラス
// ==========================================
// イベントシステムを実装する EventEmitter<T> クラスを作成してください
// メソッド: on(event: string, callback: (data: T) => void),
//          emit(event: string, data: T), off(event: string)

/**
 * イベント駆動プログラミングを実現するクラス
 */
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


// ==========================================
// 問題 15: Builder パターン
// ==========================================
// Builder パターンを実装する Builder<T> クラスを作成してください
// メソッド: set<K extends keyof T>(key: K, value: T[K]): Builder<T>, build(): T

/**
 * Builder パターンでオブジェクトを段階的に構築
 */
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


// ==========================================
// テストコード
// ==========================================
console.log('=== 問題 1: Box ===');
const box = new Box(42);
console.log(box.getValue());                         // 42
box.setValue(100);
console.log(box.getValue());                         // 100

console.log('\n=== 問題 2: Stack ===');
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log(stack.pop());                            // 2
console.log(stack.peek());                           // 1

console.log('\n=== 問題 3: Queue ===');
const queue = new Queue<string>();
queue.enqueue('first');
queue.enqueue('second');
console.log(queue.dequeue());                        // "first"

console.log('\n=== 問題 4: Pair ===');
const pair = new Pair('hello', 42);
console.log(pair.getFirst());                        // "hello"
console.log(pair.getSecond());                       // 42

console.log('\n=== 問題 5: Optional ===');
const some = Optional.some(42);
const none = Optional.none<number>();
console.log(some.unwrap());                          // 42
console.log(none.unwrapOr(0));                       // 0

console.log('\n=== 問題 6: Result ===');
const ok = Result.ok<number, string>(42);
const err = Result.err<number, string>('error');
console.log(ok.unwrap());                            // 42
console.log(err.isErr());                            // true

console.log('\n=== 問題 7: List ===');
const list = new List<number>();
list.add(1);
list.add(2);
console.log(list.map(x => x * 2).get(0));           // 2

console.log('\n=== 問題 8: GenericCache ===');
const cache = new GenericCache<string, number>();
cache.set('age', 30);
console.log(cache.get('age'));                       // 30

console.log('\n=== 問題 9: TreeNode ===');
const tree = new TreeNode(5);
tree.insert(3);
tree.insert(7);
console.log(tree.value);                             // 5
console.log(tree.left?.value);                       // 3
console.log(tree.right?.value);                      // 7

console.log('\n=== 問題 10: Observable ===');
const observable = new Observable(10);
observable.subscribe(value => console.log('Value:', value));
observable.setValue(20);                             // Value: 20

console.log('\n=== 問題 11: Container と NumberContainer ===');
const numberContainer = new NumberContainer();
numberContainer.add(1);
numberContainer.add(2);
numberContainer.add(3);
console.log(numberContainer.sum());                  // 6

console.log('\n=== 問題 12: SortedList ===');
const sortedList = new SortedList<number>((a, b) => a - b);
sortedList.add(3);
sortedList.add(1);
sortedList.add(2);
console.log(sortedList.getAll());                    // [1, 2, 3]

console.log('\n=== 問題 13: Lazy ===');
const lazy = new Lazy(() => {
  console.log('Computing...');
  return 42;
});
console.log(lazy.getValue());                        // Computing... 42
console.log(lazy.getValue());                        // 42 (no log)

console.log('\n=== 問題 14: EventEmitter ===');
const emitter = new EventEmitter<string>();
emitter.on('message', data => console.log('Received:', data));
emitter.emit('message', 'Hello');                    // Received: Hello

console.log('\n=== 問題 15: Builder ===');
interface User {
  name: string;
  age: number;
}
const builder = new Builder<User>();
const user = builder.set('name', 'Alice').set('age', 30).build();
console.log(user);
