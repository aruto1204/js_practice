/**
 * 解答例 1: ジェネリクスの基本
 *
 * このファイルでは、ジェネリクスの基本的な使い方の解答例を示します。
 */

// ==========================================
// 問題 1: 基本的なジェネリック関数
// ==========================================
// 引数をそのまま返す identity 関数をジェネリクスで実装してください

/**
 * 引数をそのまま返す identity 関数
 * ジェネリクスを使うことで、どんな型でも型安全に処理できる
 */
function identity<T>(value: T): T {
  return value;
}


// ==========================================
// 問題 2: 配列の最初の要素を取得
// ==========================================
// 配列の最初の要素を返す first 関数をジェネリクスで実装してください
// 配列が空の場合は undefined を返す

/**
 * 配列の最初の要素を返す
 * 空配列の場合は undefined を返す
 */
function first<T>(array: T[]): T | undefined {
  return array[0];
}


// ==========================================
// 問題 3: 配列の最後の要素を取得
// ==========================================
// 配列の最後の要素を返す last 関数をジェネリクスで実装してください

/**
 * 配列の最後の要素を返す
 */
function last<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}


// ==========================================
// 問題 4: ペアの作成
// ==========================================
// 2つの値を受け取り、タプルとして返す makePair 関数をジェネリクスで実装してください

/**
 * 2つの値を受け取り、タプルとして返す
 * 2つの異なる型パラメータを使用
 */
function makePair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}


// ==========================================
// 問題 5: 配列の反転
// ==========================================
// 配列を反転させる reverse 関数をジェネリクスで実装してください

/**
 * 配列を反転させる
 * 元の配列は変更せず、新しい配列を返す
 */
function reverse<T>(array: T[]): T[] {
  return [...array].reverse();
}


// ==========================================
// 問題 6: ラッパーオブジェクト
// ==========================================
// 値をラップするオブジェクトを返す wrap 関数をジェネリクスで実装してください
// 戻り値の型: { value: T }

/**
 * 値をラップするオブジェクトを返す
 */
function wrap<T>(value: T): { value: T } {
  return { value };
}


// ==========================================
// 問題 7: 配列のフィルタリング
// ==========================================
// 配列と述語関数を受け取り、フィルタリングした配列を返す filter 関数をジェネリクスで実装してください

/**
 * 配列をフィルタリングする
 * 述語関数が true を返す要素のみを含む新しい配列を返す
 */
function filter<T>(array: T[], predicate: (item: T) => boolean): T[] {
  return array.filter(predicate);
}


// ==========================================
// 問題 8: 配列のマッピング
// ==========================================
// 配列と変換関数を受け取り、変換後の配列を返す map 関数をジェネリクスで実装してください
// 入力と出力の型が異なる可能性があることに注意

/**
 * 配列の各要素を変換する
 * 入力型 T と出力型 U が異なる場合も対応
 */
function map<T, U>(array: T[], fn: (item: T) => U): U[] {
  return array.map(fn);
}


// ==========================================
// 問題 9: 2つの配列を結合
// ==========================================
// 2つの配列を受け取り、結合した配列を返す concat 関数をジェネリクスで実装してください

/**
 * 2つの配列を結合する
 */
function concat<T>(array1: T[], array2: T[]): T[] {
  return [...array1, ...array2];
}


// ==========================================
// 問題 10: 配列の検索
// ==========================================
// 配列と述語関数を受け取り、条件を満たす最初の要素を返す find 関数をジェネリクスで実装してください
// 見つからない場合は undefined を返す

/**
 * 条件を満たす最初の要素を検索する
 * 見つからない場合は undefined を返す
 */
function find<T>(array: T[], predicate: (item: T) => boolean): T | undefined {
  return array.find(predicate);
}


// ==========================================
// 問題 11: ジェネリックインターフェース
// ==========================================
// Result<T> インターフェースを定義してください
// - success: boolean
// - data: T（success が true の場合）
// - error: string（success が false の場合）
// ヒント: 判別可能なユニオンを使用

/**
 * 成功または失敗を表す Result 型
 * 判別可能なユニオンとして実装
 */
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };


// ==========================================
// 問題 12: オプショナルな値
// ==========================================
// Maybe<T> 型を定義してください（T | null）
// そして、Maybe<T> を受け取り、null でなければ値を、null なら defaultValue を返す
// getOrDefault 関数を実装してください

/**
 * 値が存在するかしないかを表す型
 */
type Maybe<T> = T | null;

/**
 * Maybe 型の値から、null の場合はデフォルト値を返す
 */
function getOrDefault<T>(value: Maybe<T>, defaultValue: T): T {
  return value !== null ? value : defaultValue;
}


// ==========================================
// 問題 13: ジェネリックな比較関数
// ==========================================
// 2つの値と比較関数を受け取り、大きい方を返す max 関数をジェネリクスで実装してください
// 比較関数の型: (a: T, b: T) => number（a > b なら正、a < b なら負、等しければ0）

/**
 * 2つの値を比較して大きい方を返す
 * 比較関数を使うことで、あらゆる型に対応
 */
function max<T>(a: T, b: T, comparator: (a: T, b: T) => number): T {
  return comparator(a, b) >= 0 ? a : b;
}


// ==========================================
// 問題 14: 配列の重複削除
// ==========================================
// 配列を受け取り、重複を削除した配列を返す unique 関数をジェネリクスで実装してください

/**
 * 配列から重複を削除する
 * Set を使用して実装
 */
function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}


// ==========================================
// 問題 15: ジェネリックな型エイリアス
// ==========================================
// Predicate<T> 型を定義してください（T を受け取り boolean を返す関数）
// そして、配列とPredicateを受け取り、すべての要素が条件を満たすかを返す
// all 関数を実装してください

/**
 * 述語関数の型
 * T を受け取り、boolean を返す
 */
type Predicate<T> = (value: T) => boolean;

/**
 * 配列のすべての要素が条件を満たすかチェック
 */
function all<T>(array: T[], predicate: Predicate<T>): boolean {
  return array.every(predicate);
}


// ==========================================
// テストコード
// ==========================================
console.log('=== 問題 1: identity ===');
console.log(identity(42));                           // 42
console.log(identity('hello'));                      // "hello"

console.log('\n=== 問題 2: first ===');
console.log(first([1, 2, 3]));                       // 1
console.log(first([]));                              // undefined

console.log('\n=== 問題 3: last ===');
console.log(last([1, 2, 3]));                        // 3

console.log('\n=== 問題 4: makePair ===');
console.log(makePair('hello', 42));                  // ['hello', 42]

console.log('\n=== 問題 5: reverse ===');
console.log(reverse([1, 2, 3]));                     // [3, 2, 1]

console.log('\n=== 問題 6: wrap ===');
console.log(wrap(42));                               // { value: 42 }

console.log('\n=== 問題 7: filter ===');
console.log(filter([1, 2, 3, 4], x => x > 2));      // [3, 4]

console.log('\n=== 問題 8: map ===');
console.log(map([1, 2, 3], x => x * 2));            // [2, 4, 6]
console.log(map(['a', 'b'], s => s.toUpperCase())); // ['A', 'B']

console.log('\n=== 問題 9: concat ===');
console.log(concat([1, 2], [3, 4]));                // [1, 2, 3, 4]

console.log('\n=== 問題 10: find ===');
console.log(find([1, 2, 3, 4], x => x > 2));        // 3

console.log('\n=== 問題 11: Result ===');
const success: Result<string> = { success: true, data: 'OK' };
const failure: Result<string> = { success: false, error: 'Failed' };
console.log(success);
console.log(failure);

console.log('\n=== 問題 12: Maybe と getOrDefault ===');
const value: Maybe<number> = 42;
const nullValue: Maybe<number> = null;
console.log(getOrDefault(value, 0));                 // 42
console.log(getOrDefault(nullValue, 0));             // 0

console.log('\n=== 問題 13: max ===');
const comparator = (a: number, b: number) => a - b;
console.log(max(10, 20, comparator));                // 20

console.log('\n=== 問題 14: unique ===');
console.log(unique([1, 2, 2, 3, 3, 4]));            // [1, 2, 3, 4]

console.log('\n=== 問題 15: Predicate と all ===');
const isPositive: Predicate<number> = x => x > 0;
console.log(all([1, 2, 3], isPositive));            // true
console.log(all([1, -2, 3], isPositive));           // false
