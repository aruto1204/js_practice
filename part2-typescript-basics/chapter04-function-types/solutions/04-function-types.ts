/**
 * 解答例 4: 関数型の定義と高階関数
 */

// ==========================================
// 問題 1: 基本的な関数型
// ==========================================
type BinaryOperation = (a: number, b: number) => number;

const add: BinaryOperation = (a, b) => a + b;
const subtract: BinaryOperation = (a, b) => a - b;

// ==========================================
// 問題 2: コールバック関数の型
// ==========================================
type Callback<T> = (error: Error | null, result?: T) => void;

function processData(filename: string, callback: Callback<string>): void {
  // ファイル読み込みのシミュレーション
  setTimeout(() => {
    if (filename) {
      callback(null, `Data from ${filename}`);
    } else {
      callback(new Error('Invalid filename'));
    }
  }, 100);
}

// ==========================================
// 問題 3: 配列の変換関数
// ==========================================
function map<T, U>(items: T[], fn: (item: T) => U): U[] {
  const result: U[] = [];
  for (const item of items) {
    result.push(fn(item));
  }
  return result;
}

// ==========================================
// 問題 4: フィルター関数
// ==========================================
type Predicate<T> = (item: T) => boolean;

function filter<T>(items: T[], predicate: Predicate<T>): T[] {
  const result: T[] = [];
  for (const item of items) {
    if (predicate(item)) {
      result.push(item);
    }
  }
  return result;
}

// ==========================================
// 問題 5: reduce 関数
// ==========================================
function reduce<T, U>(
  items: T[],
  reducer: (accumulator: U, current: T) => U,
  initialValue: U
): U {
  let accumulator = initialValue;
  for (const item of items) {
    accumulator = reducer(accumulator, item);
  }
  return accumulator;
}

// ==========================================
// 問題 6: 関数を返す関数（カリー化）
// ==========================================
function createAdder(addend: number): (value: number) => number {
  return (value: number) => value + addend;
}

// ==========================================
// 問題 7: 複数の関数を合成
// ==========================================
function compose<T>(f: (x: T) => T, g: (x: T) => T): (x: T) => T {
  return (x: T) => f(g(x));
}

// ==========================================
// 問題 8: メモ化関数
// ==========================================
function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

// ==========================================
// 問題 9: 遅延実行関数
// ==========================================
function delay(fn: () => void, ms: number): void {
  setTimeout(fn, ms);
}

// ==========================================
// 問題 10: パイプライン関数
// ==========================================
function pipe<T>(value: T, ...fns: Array<(x: T) => T>): T {
  return fns.reduce((result, fn) => fn(result), value);
}

// ==========================================
// 問題 11: retry 関数
// ==========================================
async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number
): Promise<T> {
  let lastError: Error | undefined;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries) {
        console.log(`Retry ${i + 1}/${maxRetries}...`);
      }
    }
  }

  throw lastError;
}

// ==========================================
// 問題 12: throttle 関数
// ==========================================
function throttle<T extends (...args: any[]) => void>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= wait) {
      lastCall = now;
      fn(...args);
    }
  };
}

// ==========================================
// 問題 13: インターフェースで関数型を定義
// ==========================================
interface Comparator<T> {
  (a: T, b: T): number;
}

function sort<T>(items: T[], comparator: Comparator<T>): T[] {
  return [...items].sort(comparator);
}

// ==========================================
// 問題 14: 複数の型パラメータを持つ関数型
// ==========================================
type Transformer<T, U, R> = (a: T, b: U) => R;

function transform<T, U, R>(
  items: T[],
  transformer: Transformer<T, U, R>,
  context: U
): R[] {
  return items.map(item => transformer(item, context));
}

// ==========================================
// 問題 15: ジェネリックな高階関数
// ==========================================
function flatMap<T, U>(items: T[][], fn: (item: T) => U): U[] {
  return items.flat().map(fn);
}

// ==========================================
// テストコード
// ==========================================
console.log(add(3, 4));                              // 7
console.log(subtract(10, 3));                        // 7

processData('test.txt', (error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result);                            // "Data from test.txt"
  }
});

console.log(map([1, 2, 3], x => x * 2));            // [2, 4, 6]

const isEven = (x: number) => x % 2 === 0;
console.log(filter([1, 2, 3, 4, 5], isEven));       // [2, 4]

console.log(reduce([1, 2, 3, 4], (acc, cur) => acc + cur, 0)); // 10

const add5 = createAdder(5);
console.log(add5(3));                                 // 8

const double = (x: number) => x * 2;
const addTen = (x: number) => x + 10;
const doubleThenAddTen = compose(addTen, double);
console.log(doubleThenAddTen(5));                     // 20

const expensiveFunction = (n: number) => {
  console.log('Computing...');
  return n * n;
};
const memoized = memoize(expensiveFunction);
console.log(memoized(5));                             // Computing... 25
console.log(memoized(5));                             // 25 (キャッシュから)

delay(() => console.log('Delayed!'), 1000);

console.log(pipe(5, double, addTen));                 // 20

const comparator: Comparator<number> = (a, b) => a - b;
console.log(sort([3, 1, 4, 1, 5], comparator));      // [1, 1, 3, 4, 5]

const multiplier: Transformer<number, number, number> = (a, b) => a * b;
console.log(transform([1, 2, 3], multiplier, 10));   // [10, 20, 30]

console.log(flatMap([[1, 2], [3, 4]], x => x * 2));  // [2, 4, 6, 8]

// throttle のテスト
const throttled = throttle(() => console.log('Throttled!'), 1000);
throttled();  // 実行される
throttled();  // スキップされる（1秒以内）
