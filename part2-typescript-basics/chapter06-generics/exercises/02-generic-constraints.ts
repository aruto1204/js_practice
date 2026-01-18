/**
 * 練習問題 2: ジェネリック制約
 *
 * このファイルでは、extends を使ったジェネリック制約を練習します。
 */

// ==========================================
// 問題 1: length プロパティを持つ型の制約
// ==========================================
// length プロパティを持つ値を受け取り、その長さを返す getLength 関数を実装してください
// TODO: ここに getLength 関数を実装

function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}



// ==========================================
// 問題 2: オブジェクトのプロパティ取得
// ==========================================
// オブジェクトとキーを受け取り、そのプロパティの値を返す getProperty 関数を実装してください
// K extends keyof T を使用
// TODO: ここに getProperty 関数を実装

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}


// ==========================================
// 問題 3: オブジェクトのプロパティ設定
// ==========================================
// オブジェクト、キー、値を受け取り、プロパティを更新した新しいオブジェクトを返す
// setProperty 関数を実装してください
// TODO: ここに setProperty 関数を実装

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): T {
  return { ...obj, [key]: value };
}


// ==========================================
// 問題 4: 比較可能な型の制約
// ==========================================
// Comparable インターフェースを定義してください（compareTo メソッドを持つ）
// そして、Comparable を実装した型の配列をソートする sort 関数を実装してください
// TODO: Comparable インターフェースと sort 関数を実装
interface Comparable<T> {
  compareTo(other: T): number;
}
function sort<T extends Comparable<T>>(array: T[]): T[] {
  return [...array].sort((a, b) => a.compareTo(b));
}



// ==========================================
// 問題 5: 数値または文字列の制約
// ==========================================
// number または string のみを受け付ける add 関数を実装してください
// 数値の場合は加算、文字列の場合は連結
// TODO: ここに add 関数を実装

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
// TODO: ここに flatten 関数を実装

function flatten<T>(array: T[][]): T[] {
  return array.flat();
}


// ==========================================
// 問題 7: コンストラクタの制約
// ==========================================
// クラスのコンストラクタを受け取り、インスタンスを生成する create 関数を実装してください
// new (...args: any[]) => T を使用
// TODO: ここに create 関数を実装
function create<T>(constructor: new (...args: any[]) => T, ...args: any[]): T {
  return new constructor(...args);
}


// ==========================================
// 問題 8: 複数の制約
// ==========================================
// Named インターフェース（name: string）と Aged インターフェース（age: number）を定義し、
// 両方を満たす型を受け取る describe 関数を実装してください
// TODO: Named, Aged インターフェースと describe 関数を実装

interface Named {
  name: string;
}
interface Aged {
  age: number;
}
function describe<T extends Named & Aged>(obj: T): string {
  return `${obj.name} is ${obj.age} years old`;
}


// ==========================================
// 問題 9: オブジェクト型の制約
// ==========================================
// オブジェクト型のみを受け付ける merge 関数を実装してください（T extends object）
// 2つのオブジェクトをマージして返す
// TODO: ここに merge 関数を実装

function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 } as T & U;
}

// ==========================================
// 問題 10: キーの制約
// ==========================================
// オブジェクトから指定したキーのみを抽出する pick 関数を実装してください
// Pick<T, K> ユーティリティ型を自分で実装
// TODO: ここに pick 関数を実装

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
// TODO: ここに min 関数を実装

function min<T extends number>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return Math.min(...array) as T;
}



// ==========================================
// 問題 12: メソッドを持つ型の制約
// ==========================================
// toString メソッドを持つ型を受け取り、文字列に変換する stringify 関数を実装してください
// TODO: ここに stringify 関数を実装

function stringify<T extends { toString(): string }>(value: T): string {
  return value.toString();
}


// ==========================================
// 問題 13: ジェネリック制約とデフォルト値
// ==========================================
// オブジェクト、キー、デフォルト値を受け取り、
// プロパティが存在すればその値を、なければデフォルト値を返す
// getWithDefault 関数を実装してください
// TODO: ここに getWithDefault 関数を実装
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
// TODO: ここに call 関数を実装

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
// TODO: Awaited<T> 型を実装

type CustomAwaited<T> = T extends Promise<infer U> ? U : T;

// ==========================================
// テストコード（実装後にコメントを外して実行）
// ==========================================

console.log(getLength('hello'));                     // 5
console.log(getLength([1, 2, 3]));                   // 3

const obj = { name: 'Alice', age: 30 };
console.log(getProperty(obj, 'name'));               // "Alice"
console.log(getProperty(obj, 'age'));                // 30

const updated = setProperty(obj, 'age', 31);
console.log(updated);                                // { name: 'Alice', age: 31 }

console.log(add(1, 2));                              // 3
console.log(add('hello', 'world'));                  // "helloworld"

console.log(flatten([[1, 2], [3, 4]]));             // [1, 2, 3, 4]

class Person {
  constructor(public name: string) {}
}
const person = create(Person, 'Alice');
console.log(person);

const personData = { name: 'Bob', age: 25 };
console.log(describe(personData));

const merged = merge({ a: 1 }, { b: 2 });
console.log(merged);                                 // { a: 1, b: 2 }

const picked = pick(obj, ['name']);
console.log(picked);                                 // { name: 'Alice' }

console.log(min([3, 1, 4, 1, 5]));                  // 1

const num = { toString: () => '42' };
console.log(stringify(num));                         // "42"

const value = getWithDefault(obj, 'email', 'default value');
console.log(value);                                  // "default value"

const fn = (x: number, y: number) => x + y;
console.log(call(fn, 3, 4));                        // 7

// type NumPromise = Awaited<Promise<number>>;          // number
