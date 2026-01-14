/**
 * 練習問題 4: 関数型の定義と高階関数
 *
 * このファイルでは、関数型の定義方法と高階関数の実装を練習します。
 */

// ==========================================
// 問題 1: 基本的な関数型
// ==========================================
// 2つの数値を受け取り数値を返す関数の型 BinaryOperation を定義してください
// そして、この型を使って add と subtract 関数を実装してください
// TODO: BinaryOperation 型と関数を実装
type BinaryOperation = (a: number, b: number) => number;

// ==========================================
// 問題 2: コールバック関数の型
// ==========================================
// エラーまたは結果を受け取るコールバックの型 Callback を定義してください
// (error: Error | null, result?: T) => void の形式
// そして、この型を使う processData 関数を実装してください
// TODO: Callback<T> 型と processData 関数を実装
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
// 配列の各要素に関数を適用して新しい配列を返す map 関数を実装してください
// (items: T[], fn: (item: T) => U) => U[] のシグネチャ
// TODO: ここに map 関数を実装
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
// Predicate 型を定義してください: (item: T) => boolean
// そして、配列と述語関数を受け取り、条件を満たす要素のみを返す filter 関数を実装してください
// TODO: Predicate<T> 型と filter 関数を実装
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
// 配列、reducer 関数、初期値を受け取り、単一の値を返す reduce 関数を実装してください
// reducer の型: (accumulator: U, current: T) => U
// TODO: ここに reduce 関数を実装
function reduce<T, U>(items: T[], reducer: (accumulator: U, current: T) => U, initialValue: U): U {
  let accumulator = initialValue;
  for (const item of items) {
    accumulator = reducer(accumulator, item);
  }
  return accumulator;
}
// ==========================================
// 問題 6: 関数を返す関数（カリー化）
// ==========================================
// 数値を受け取り、その数値を加算する関数を返す createAdder 関数を実装してください
// 例: const add5 = createAdder(5); add5(3) → 8
// TODO: ここに createAdder 関数を実装
function createAdder(addend: number): (value: number) => number {
  return (value: number) => value + addend;
}

// ==========================================
// 問題 7: 複数の関数を合成
// ==========================================
// 2つの関数を受け取り、それらを合成した新しい関数を返す compose 関数を実装してください
// compose(f, g)(x) は f(g(x)) と同じ結果になります
// TODO: ここに compose 関数を実装
function compose<T, U, V>(f: (x: U) => V, g: (x: T) => U): (x: T) => V {
  return (x: T) => f(g(x));
}

// ==========================================
// 問題 8: メモ化関数
// ==========================================
// 関数を受け取り、結果をキャッシュする関数を返す memoize 関数を実装してください
// キャッシュのキーは引数を文字列化したものとします
// TODO: ここに memoize 関数を実装

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
// 関数と遅延時間（ミリ秒）を受け取り、指定時間後に関数を実行する delay 関数を実装してください
// TODO: ここに delay 関数を実装

function delay(fn: () => void, ms: number): void {
  setTimeout(fn, ms);
}
// ==========================================
// 問題 10: パイプライン関数
// ==========================================
// 初期値と任意の数の変換関数を受け取り、順番に適用する pipe 関数を実装してください
// pipe(5, double, addTen) → (5 * 2) + 10 = 20
// TODO: ここに pipe 関数を実装

function pipe<T>(value: T, ...fns: Array<(x: T) => T>): T {
  return fns.reduce((result, fn) => fn(result), value);
}
// ==========================================
// 問題 11: retry 関数
// ==========================================
// 非同期関数とリトライ回数を受け取り、成功するまで最大n回実行する retry 関数を実装してください
// TODO: ここに retry 関数を実装

async function retry<T>(fn: () => Promise<T>, maxRetries: number): Promise<T> {
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
// 関数と待機時間を受け取り、指定時間内に複数回呼ばれても1回しか実行しない
// throttle 関数を実装してください
// TODO: ここに throttle 関数を実装

function throttle<T extends (...args: any[]) => void>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | undefined;
  return (...args: Parameters<T>) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = undefined;
        fn(...args);
      }, wait);
    }
  };
}
// ==========================================
// 問題 13: インターフェースで関数型を定義
// ==========================================
// Comparator インターフェースを定義してください
// (a: T, b: T) => number の形式（a < b なら負、a > b なら正、等しければ0）
// そして、配列とコンパレータを受け取ってソートする sort 関数を実装してください
// TODO: Comparator<T> インターフェースと sort 関数を実装
interface Comparator<T> {
  (a: T, b: T): number;
}

function sort<T>(items: T[], comparator: Comparator<T>): T[] {
  return [...items].sort(comparator);
}

// ==========================================
// 問題 14: 複数の型パラメータを持つ関数型
// ==========================================
// 2つの異なる型の値を受け取り、別の型の値を返す Transformer 型を定義してください
// そして、配列をマップで変換する transform 関数を実装してください
// TODO: Transformer<T, U, R> 型と transform 関数を実装
type Transformer<T, U, R> = (a: T, b: U) => R;

function transform<T, U, R>(items: T[], transformer: Transformer<T, U, R>, context: U): R[] {
  return items.map((item) => transformer(item, context));
}

// ==========================================
// 問題 15: ジェネリックな高階関数
// ==========================================
// 配列の配列を受け取り、各配列に指定した関数を適用して平坦化する flatMap 関数を実装してください
// TODO: ここに flatMap 関数を実装

function flatMap<T, U>(items: T[][], fn: (item: T) => U): U[] {
  return items.flat().map(fn);
}

// ==========================================
// テストコード（実装後にコメントを外して実行）
// ==========================================

const add: BinaryOperation = (a, b) => a + b;
console.log(add(3, 4)); // 7

// processData('test.txt', (error, result) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(result);
//   }
// });

console.log(map([1, 2, 3], (x) => x * 2)); // [2, 4, 6]

const isEven = (x: number) => x % 2 === 0;
console.log(filter([1, 2, 3, 4, 5], isEven)); // [2, 4]

console.log(reduce([1, 2, 3, 4], (acc, cur) => acc + cur, 0)); // 10

const add5 = createAdder(5);
console.log(add5(3)); // 8

const double = (x: number) => x * 2;
const addTen = (x: number) => x + 10;
const doubleThenAddTen = compose(addTen, double);
console.log(doubleThenAddTen(5)); // 20

const expensiveFunction = (n: number) => {
  console.log('Computing...');
  return n * n;
};
const memoized = memoize(expensiveFunction);
console.log(memoized(5)); // Computing... 25
console.log(memoized(5)); // 25 (キャッシュから)

// delay(() => console.log('Delayed!'), 1000);

console.log(pipe(5, double, addTen)); // 20

const comparator: Comparator<number> = (a, b) => a - b;
console.log(sort([3, 1, 4, 1, 5], comparator)); // [1, 1, 3, 4, 5]

const multiplier: Transformer<number, number, number> = (a, b) => a * b;
console.log(transform([1, 2, 3], multiplier, 10)); // [10, 20, 30]

console.log(
  flatMap(
    [
      [1, 2],
      [3, 4],
    ],
    (x) => x * 2
  )
); // [2, 4, 6, 8]
