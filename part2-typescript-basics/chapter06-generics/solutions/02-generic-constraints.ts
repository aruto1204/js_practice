/**
 * 解答例 2: ジェネリック制約
 *
 * このファイルでは、extends を使ったジェネリック制約の解答例を示します。
 */

// ==========================================
// 問題 1: length プロパティを持つ型の制約
// ==========================================
// length プロパティを持つ値を受け取り、その長さを返す getLength 関数を実装してください

/**
 * length プロパティを持つ型の制約
 * 文字列や配列などに使用可能
 */
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}


// ==========================================
// 問題 2: オブジェクトのプロパティ取得
// ==========================================
// オブジェクトとキーを受け取り、そのプロパティの値を返す getProperty 関数を実装してください
// K extends keyof T を使用

/**
 * オブジェクトから指定したキーの値を取得
 * K は T のキーに限定される
 */
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}


// ==========================================
// 問題 3: オブジェクトのプロパティ設定
// ==========================================
// オブジェクト、キー、値を受け取り、プロパティを更新した新しいオブジェクトを返す
// setProperty 関数を実装してください

/**
 * オブジェクトのプロパティを更新した新しいオブジェクトを返す
 * イミュータブルな更新を実現
 */
function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): T {
  return { ...obj, [key]: value };
}


// ==========================================
// 問題 4: 比較可能な型の制約
// ==========================================
// Comparable インターフェースを定義してください（compareTo メソッドを持つ）
// そして、Comparable を実装した型の配列をソートする sort 関数を実装してください

/**
 * 比較可能なオブジェクトを表すインターフェース
 */
interface Comparable<T> {
  compareTo(other: T): number;
}

/**
 * Comparable を実装した型の配列をソート
 */
function sort<T extends Comparable<T>>(array: T[]): T[] {
  return [...array].sort((a, b) => a.compareTo(b));
}


// ==========================================
// 問題 5: 数値または文字列の制約
// ==========================================
// number または string のみを受け付ける add 関数を実装してください
// 数値の場合は加算、文字列の場合は連結

/**
 * 数値または文字列の加算/連結
 * オーバーロードを使用して型安全に実装
 */
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add<T extends number | string>(a: T, b: T): T {
  if (typeof a === 'number' && typeof b === 'number') {
    return (a + b) as T;
  }
  return (String(a) + String(b)) as T;
}


// ==========================================
// 問題 6: 配列要素の制約
// ==========================================
// 配列の配列を受け取り、平坦化する flatten 関数を実装してください
// T extends any[] を使用

/**
 * 配列の配列を平坦化
 * T extends any[] で配列型を制約
 */
function flatten<T>(array: T[][]): T[] {
  return array.flat();
}


// ==========================================
// 問題 7: コンストラクタの制約
// ==========================================
// クラスのコンストラクタを受け取り、インスタンスを生成する create 関数を実装してください
// new (...args: any[]) => T を使用

/**
 * クラスのコンストラクタからインスタンスを生成
 */
function create<T>(constructor: new (...args: any[]) => T, ...args: any[]): T {
  return new constructor(...args);
}


// ==========================================
// 問題 8: 複数の制約
// ==========================================
// Named インターフェース（name: string）と Aged インターフェース（age: number）を定義し、
// 両方を満たす型を受け取る describe 関数を実装してください

/**
 * 名前を持つオブジェクトを表すインターフェース
 */
interface Named {
  name: string;
}

/**
 * 年齢を持つオブジェクトを表すインターフェース
 */
interface Aged {
  age: number;
}

/**
 * Named と Aged の両方を満たす型を受け取る
 * 複数の制約を & で結合
 */
function describe<T extends Named & Aged>(obj: T): string {
  return `${obj.name} is ${obj.age} years old`;
}


// ==========================================
// 問題 9: オブジェクト型の制約
// ==========================================
// オブジェクト型のみを受け付ける merge 関数を実装してください（T extends object）
// 2つのオブジェクトをマージして返す

/**
 * 2つのオブジェクトをマージ
 * プリミティブ型を除外
 */
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 } as T & U;
}


// ==========================================
// 問題 10: キーの制約
// ==========================================
// オブジェクトから指定したキーのみを抽出する pick 関数を実装してください
// Pick<T, K> ユーティリティ型を自分で実装

/**
 * オブジェクトから指定したキーのみを抽出
 * Pick ユーティリティ型を自作
 */
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}


// ==========================================
// 問題 11: 配列の最小値
// ==========================================
// number の配列を受け取り、最小値を返す min 関数を実装してください
// T extends number を使用

/**
 * 数値配列の最小値を取得
 * 空配列の場合は undefined
 */
function min<T extends number>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return Math.min(...array) as T;
}


// ==========================================
// 問題 12: メソッドを持つ型の制約
// ==========================================
// toString メソッドを持つ型を受け取り、文字列に変換する stringify 関数を実装してください

/**
 * toString メソッドを持つ型を文字列に変換
 */
function stringify<T extends { toString(): string }>(value: T): string {
  return value.toString();
}


// ==========================================
// 問題 13: ジェネリック制約とデフォルト値
// ==========================================
// オブジェクト、キー、デフォルト値を受け取り、
// プロパティが存在すればその値を、なければデフォルト値を返す
// getWithDefault 関数を実装してください

/**
 * オブジェクトから値を取得、存在しない場合はデフォルト値
 */
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


// ==========================================
// 問題 14: 関数の制約
// ==========================================
// 関数を受け取り、引数と戻り値の型を保持したまま実行する call 関数を実装してください
// T extends (...args: any[]) => any を使用

/**
 * 関数を実行し、その結果を返す
 * 関数の型情報を保持
 */
function call<T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
): ReturnType<T> {
  return fn(...args);
}


// ==========================================
// 問題 15: Promise の制約
// ==========================================
// Promise を受け取り、resolve した値を返す型 Awaited<T> を実装してください
// T extends Promise<infer U> を使用

/**
 * Promise の解決値の型を抽出
 * 条件型と infer を使用
 * 注: TypeScript 4.5 以降は組み込み型として Awaited が存在するため、
 * ここでは CustomAwaited として定義
 */
type CustomAwaited<T> = T extends Promise<infer U> ? U : T;


// ==========================================
// テストコード
// ==========================================
console.log('=== 問題 1: getLength ===');
console.log(getLength('hello'));                     // 5
console.log(getLength([1, 2, 3]));                   // 3

console.log('\n=== 問題 2: getProperty ===');
const obj = { name: 'Alice', age: 30 };
console.log(getProperty(obj, 'name'));               // "Alice"
console.log(getProperty(obj, 'age'));                // 30

console.log('\n=== 問題 3: setProperty ===');
const updated = setProperty(obj, 'age', 31);
console.log(updated);                                // { name: 'Alice', age: 31 }

console.log('\n=== 問題 4: Comparable と sort ===');
class ComparableNumber implements Comparable<ComparableNumber> {
  constructor(private value: number) {}
  compareTo(other: ComparableNumber): number {
    return this.value - other.value;
  }
  toString(): string {
    return String(this.value);
  }
}
const numbers = [new ComparableNumber(3), new ComparableNumber(1), new ComparableNumber(2)];
console.log(sort(numbers).map(n => n.toString()));   // ['1', '2', '3']

console.log('\n=== 問題 5: add ===');
console.log(add(1, 2));                              // 3
console.log(add('hello', 'world'));                  // "helloworld"

console.log('\n=== 問題 6: flatten ===');
console.log(flatten([[1, 2], [3, 4]]));             // [1, 2, 3, 4]

console.log('\n=== 問題 7: create ===');
class Person {
  constructor(public name: string) {}
}
const person = create(Person, 'Alice');
console.log(person);

console.log('\n=== 問題 8: describe ===');
const personData = { name: 'Bob', age: 25 };
console.log(describe(personData));

console.log('\n=== 問題 9: merge ===');
const merged = merge({ a: 1 }, { b: 2 });
console.log(merged);                                 // { a: 1, b: 2 }

console.log('\n=== 問題 10: pick ===');
const picked = pick(obj, ['name']);
console.log(picked);                                 // { name: 'Alice' }

console.log('\n=== 問題 11: min ===');
console.log(min([3, 1, 4, 1, 5]));                  // 1

console.log('\n=== 問題 12: stringify ===');
const num = { toString: () => '42' };
console.log(stringify(num));                         // "42"

console.log('\n=== 問題 13: getWithDefault ===');
const valueFromObj = getWithDefault(obj, 'email' as any, 'N/A');
console.log(valueFromObj);                           // "N/A"

console.log('\n=== 問題 14: call ===');
const fn = (x: number, y: number) => x + y;
console.log(call(fn, 3, 4));                        // 7

console.log('\n=== 問題 15: CustomAwaited ===');
type NumPromise = CustomAwaited<Promise<number>>;    // number
type Num = CustomAwaited<number>;                    // number
console.log('CustomAwaited 型のテストは型レベルで完了');
