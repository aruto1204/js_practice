/**
 * 練習問題 5: 関数オーバーロード
 *
 * このファイルでは、関数オーバーロードを使った型安全な関数の実装を練習します。
 */

// ==========================================
// 問題 1: 基本的なオーバーロード
// ==========================================
// format 関数を実装してください
// - string を受け取ったら "String: {value}" を返す
// - number を受け取ったら "Number: {value}" を返す
// - boolean を受け取ったら "Boolean: {value}" を返す
// オーバーロードシグネチャと実装シグネチャの両方を定義してください
// TODO: ここに format 関数を実装

function format(value: string): string;
function format(value: number): string;
function format(value: boolean): string;
function format(value: string | number | boolean): string {
  if (typeof value === 'string') {
    return `String: ${value}`;
  } else if (typeof value === 'number') {
    return `Number: ${value}`;
  } else {
    return `Boolean: ${value}`;
  }
}

// ==========================================
// 問題 2: 引数の数によるオーバーロード
// ==========================================
// createDate 関数を実装してください
// - 引数なし: 現在の日付を返す
// - year のみ: その年の1月1日を返す
// - year, month: その年月の1日を返す
// - year, month, day: その年月日を返す
// TODO: ここに createDate 関数を実装

function createDate(): Date;
function createDate(year: number): Date;
function createDate(year: number, month: number): Date;
function createDate(year: number, month: number, day: number): Date;
function createDate(year?: number, month?: number, day?: number): Date {
  if (year === undefined) {
    return new Date();
  } else if (month === undefined) {
    return new Date(year, 0, 1);
  } else if (day === undefined) {
    return new Date(year, month - 1, 1);
  } else {
    return new Date(year, month - 1, day);
  }
}
// ==========================================
// 問題 3: 配列と単一値のオーバーロード
// ==========================================
// double 関数を実装してください
// - number を受け取ったら、その2倍を返す
// - number[] を受け取ったら、各要素を2倍にした配列を返す
// TODO: ここに double 関数を実装
function double(value: number): number;
function double(value: number[]): number[];
function double(value: number | number[]): number | number[] {
  if (Array.isArray(value)) {
    return value.map((v) => v * 2);
  }
  return value * 2;
}

// ==========================================
// 問題 4: 戻り値の型が変わるオーバーロード
// ==========================================
// parseData 関数を実装してください
// - 第2引数が 'json' の場合: object を返す
// - 第2引数が 'text' の場合: string を返す
// - 第2引数が 'number' の場合: number を返す
// TODO: ここに parseData 関数を実装

function parseData(data: string, format: 'json'): object;
function parseData(data: string, format: 'text'): string;
function parseData(data: string, format: 'number'): number;
function parseData(data: string, format: 'json' | 'text' | 'number'): object | string | number {
  if (format === 'json') {
    return JSON.parse(data);
  } else if (format === 'text') {
    return data;
  } else {
    return parseFloat(data);
  }
}
// ==========================================
// 問題 5: オプショナル引数とオーバーロード
// ==========================================
// search 関数を実装してください
// - (items: string[], query: string): string[] - 文字列配列から検索
// - (items: number[], query: number): number[] - 数値配列から検索
// - (items: string[], query: string, caseSensitive: boolean): string[] - 大文字小文字を区別
// TODO: ここに search 関数を実装
function search(items: string[], query: string): string[];
function search(items: number[], query: number): number[];
function search(items: string[], query: string, caseSensitive: boolean): string[];
function search(
  items: string[] | number[],
  query: string | number,
  caseSensitive?: boolean
): string[] | number[] {
  if (typeof query === 'string') {
    const stringItems = items as string[];
    if (caseSensitive) {
      return stringItems.filter((item) => item.includes(query));
    }
    const lowerQuery = query.toLowerCase();
    return stringItems.filter((item) => item.toLowerCase().includes(lowerQuery));
  } else {
    const numberItems = items as number[];
    return numberItems.filter((item) => item === query);
  }
}

// ==========================================
// 問題 6: ジェネリクスとオーバーロード
// ==========================================
// reverse 関数を実装してください
// - string を受け取ったら、反転した文字列を返す
// - T[] を受け取ったら、反転した配列を返す
// TODO: ここに reverse 関数を実装

function reverse(value: string): string;
function reverse<T>(value: T[]): T[];
function reverse<T>(value: string | T[]): string | T[] {
  if (typeof value === 'string') {
    return value.split('').reverse().join('');
  }
  return value.slice().reverse();
}

// ==========================================
// 問題 7: コールバックのオーバーロード
// ==========================================
// fetchData 関数を実装してください
// - (url: string): Promise<string> - Promise を返す
// - (url: string, callback: (data: string) => void): void - コールバックで結果を返す
// TODO: ここに fetchData 関数を実装
function fetchData(url: string): Promise<string>;
function fetchData(url: string, callback: (data: string) => void): void;
function fetchData(url: string, callback?: (data: string) => void): Promise<string> | void {
  const data = `Data from ${url}`;

  if (callback) {
    // コールバック版
    setTimeout(() => callback(data), 100);
  } else {
    // Promise版
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 100);
    });
  }
}

// ==========================================
// 問題 8: オブジェクト生成のオーバーロード
// ==========================================
// createPerson 関数を実装してください
// - (name: string): { name: string }
// - (name: string, age: number): { name: string; age: number }
// - (name: string, age: number, email: string): { name: string; age: number; email: string }
// TODO: ここに createPerson 関数を実装

function createPerson(name: string): { name: string };
function createPerson(name: string, age: number): { name: string; age: number };
function createPerson(
  name: string,
  age: number,
  email: string
): { name: string; age: number; email: string };
function createPerson(
  name: string,
  age?: number,
  email?: string
): { name: string; age?: number; email?: string } {
  const person: any = { name };
  if (age !== undefined) person.age = age;
  if (email !== undefined) person.email = email;
  return person;
}
// ==========================================
// 問題 9: 配列操作のオーバーロード
// ==========================================
// slice 関数を実装してください（配列の一部を切り出す）
// - (arr: T[]): T[] - 配列全体のコピー
// - (arr: T[], start: number): T[] - start から最後まで
// - (arr: T[], start: number, end: number): T[] - start から end まで
// TODO: ここに slice 関数を実装

function slice<T>(arr: T[]): T[];
function slice<T>(arr: T[], start: number): T[];
function slice<T>(arr: T[], start: number, end: number): T[];
function slice<T>(arr: T[], start?: number, end?: number): T[] {
  return arr.slice(start, end);
}

// ==========================================
// 問題 10: 型の絞り込みを活用したオーバーロード
// ==========================================
// filterBy 関数を実装してください
// - (items: string[], predicate: (item: string) => boolean): string[]
// - (items: number[], predicate: (item: number) => boolean): number[]
// - (items: boolean[], predicate: (item: boolean) => boolean): boolean[]
// TODO: ここに filterBy 関数を実装
function filterBy(items: string[], predicate: (item: string) => boolean): string[];
function filterBy(items: number[], predicate: (item: number) => boolean): number[];
function filterBy(items: boolean[], predicate: (item: boolean) => boolean): boolean[];
function filterBy<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

// ==========================================
// 問題 11: メソッドチェーンのためのオーバーロード
// ==========================================
// Calculator クラスを実装してください
// add メソッドは以下のオーバーロードを持ちます：
// - add(value: number): Calculator - 値を加算してチェーン可能
// - add(value: number, returnResult: true): number - 結果を返す
// TODO: ここに Calculator クラスを実装
class Calculator {
  private value: number;

  constructor(initialValue: number = 0) {
    this.value = initialValue;
  }

  add(value: number): Calculator;
  add(value: number, returnResult: true): number;
  add(value: number, returnResult?: boolean): Calculator | number {
    this.value += value;
    if (returnResult) {
      return this.value;
    }
    return this;
  }
}

// ==========================================
// 問題 12: 条件付き戻り値のオーバーロード
// ==========================================
// get 関数を実装してください
// - (obj: T, key: K): T[K] - オブジェクトからプロパティを取得
// - (obj: T, key: K, defaultValue: D): T[K] | D - デフォルト値付き
// TODO: ここに get 関数を実装
function get<T, K extends keyof T>(obj: T, key: K): T[K];
function get<T, K extends keyof T, D>(obj: T, key: K, defaultValue: D): T[K] | D;
function get<T, K extends keyof T, D>(obj: T, key: K, defaultValue?: D): T[K] | D {
  const value = obj[key];
  if (value === undefined && defaultValue !== undefined) {
    return defaultValue;
  }
  return value;
}

// ==========================================
// 問題 13: イベントハンドラのオーバーロード
// ==========================================
// addEventListener 関数を実装してください
// - (event: 'click', handler: (e: MouseEvent) => void): void
// - (event: 'keypress', handler: (e: KeyboardEvent) => void): void
// - (event: 'change', handler: (e: Event) => void): void
// （簡易版として、イベント名と型の対応を示すシミュレーションで OK）
// TODO: ここに addEventListener 関数を実装
type MouseEvent = { type: 'click'; x: number; y: number };
type KeyboardEvent = { type: 'keypress'; key: string };
type Event = { type: 'change'; value: string };

function addEventListener(event: 'click', handler: (e: MouseEvent) => void): void;
function addEventListener(event: 'keypress', handler: (e: KeyboardEvent) => void): void;
function addEventListener(event: 'change', handler: (e: Event) => void): void;
function addEventListener(event: 'click' | 'keypress' | 'change', handler: (e: any) => void): void {
  console.log(`Added listener for ${event}`);
  // 実際の実装はここに書く
}

// ==========================================
// 問題 14: 複雑なオーバーロード
// ==========================================
// merge 関数を実装してください
// - (a: T): T - 1つのオブジェクトはそのまま返す
// - (a: T, b: U): T & U - 2つのオブジェクトをマージ
// - (a: T, b: U, c: V): T & U & V - 3つのオブジェクトをマージ
// TODO: ここに merge 関数を実装
function merge<T>(a: T): T;
function merge<T, U>(a: T, b: U): T & U;
function merge<T, U, V>(a: T, b: U, c: V): T & U & V;
function merge<T, U, V>(a: T, b?: U, c?: V): T | (T & U) | (T & U & V) {
  if (b === undefined) {
    return a;
  } else if (c === undefined) {
    return { ...a, ...b };
  } else {
    return { ...a, ...b, ...c };
  }
}

// ==========================================
// 問題 15: ユーティリティ関数のオーバーロード
// ==========================================
// clamp 関数を実装してください（値を範囲内に収める）
// - (value: number, max: number): number - 0 から max の範囲
// - (value: number, min: number, max: number): number - min から max の範囲
// TODO: ここに clamp 関数を実装
function clamp(value: number, max: number): number;
function clamp(value: number, min: number, max: number): number;
function clamp(value: number, minOrMax: number, max?: number): number {
  if (max === undefined) {
    // 2引数版: 0 から max の範囲
    return Math.min(Math.max(value, 0), minOrMax);
  } else {
    // 3引数版: min から max の範囲
    return Math.min(Math.max(value, minOrMax), max);
  }
}

// ==========================================
// テストコード（実装後にコメントを外して実行）
// ==========================================

console.log(format('hello')); // "String: hello"
console.log(format(42)); // "Number: 42"
console.log(format(true)); // "Boolean: true"

console.log(createDate());
console.log(createDate(2024));
console.log(createDate(2024, 5));
console.log(createDate(2024, 5, 15));

console.log(double(5)); // 10
console.log(double([1, 2, 3])); // [2, 4, 6]

console.log(parseData('{"name":"Alice"}', 'json'));
console.log(parseData('Hello', 'text'));
console.log(parseData('42', 'number'));

console.log(search(['apple', 'banana'], 'app'));
console.log(search([1, 2, 3], 2));

console.log(reverse('hello')); // 'olleh'
console.log(reverse([1, 2, 3])); // [3, 2, 1]

// // Promise版
// fetchData('https://api.example.com').then((data) => console.log(data));
// // コールバック版
// fetchData('https://api.example.com', (data) => console.log(data));

console.log(createPerson('Alice'));
console.log(createPerson('Bob', 30));
console.log(createPerson('Charlie', 25, 'charlie@example.com'));

console.log(slice([1, 2, 3, 4, 5]));
console.log(slice([1, 2, 3, 4, 5], 2));
console.log(slice([1, 2, 3, 4, 5], 1, 3));

console.log(filterBy([1, 2, 3, 4], (x) => x > 2)); // [3, 4]

const calc = new Calculator(10);
console.log(calc.add(5).add(3).add(2, true)); // 20

const obj = { name: 'Alice', age: 25 };
console.log(get(obj, 'name'));
console.log(get(obj, 'email' as any, 'N/A')); // 'N/A'

addEventListener('click', (e) => console.log(e.x, e.y));
addEventListener('keypress', (e) => console.log(e.key));

console.log(merge({ a: 1 }));
console.log(merge({ a: 1 }, { b: 2 }));
console.log(merge({ a: 1 }, { b: 2 }, { c: 3 }));

console.log(clamp(15, 10)); // 10
console.log(clamp(5, 0, 10)); // 5
console.log(clamp(15, 0, 10)); // 10
