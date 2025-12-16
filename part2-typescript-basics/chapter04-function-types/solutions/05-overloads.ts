/**
 * 解答例 5: 関数オーバーロード
 */

// ==========================================
// 問題 1: 基本的なオーバーロード
// ==========================================
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
function double(value: number): number;
function double(value: number[]): number[];
function double(value: number | number[]): number | number[] {
  if (Array.isArray(value)) {
    return value.map(v => v * 2);
  }
  return value * 2;
}

// ==========================================
// 問題 4: 戻り値の型が変わるオーバーロード
// ==========================================
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
      return stringItems.filter(item => item.includes(query));
    }
    const lowerQuery = query.toLowerCase();
    return stringItems.filter(item => item.toLowerCase().includes(lowerQuery));
  } else {
    const numberItems = items as number[];
    return numberItems.filter(item => item === query);
  }
}

// ==========================================
// 問題 6: ジェネリクスとオーバーロード
// ==========================================
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
function slice<T>(arr: T[]): T[];
function slice<T>(arr: T[], start: number): T[];
function slice<T>(arr: T[], start: number, end: number): T[];
function slice<T>(arr: T[], start?: number, end?: number): T[] {
  return arr.slice(start, end);
}

// ==========================================
// 問題 10: 型の絞り込みを活用したオーバーロード
// ==========================================
function filterBy(items: string[], predicate: (item: string) => boolean): string[];
function filterBy(items: number[], predicate: (item: number) => boolean): number[];
function filterBy(items: boolean[], predicate: (item: boolean) => boolean): boolean[];
function filterBy<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

// ==========================================
// 問題 11: メソッドチェーンのためのオーバーロード
// ==========================================
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
// 簡易版のイベント型
type MouseEvent = { type: 'click'; x: number; y: number };
type KeyboardEvent = { type: 'keypress'; key: string };
type Event = { type: 'change'; value: string };

function addEventListener(event: 'click', handler: (e: MouseEvent) => void): void;
function addEventListener(event: 'keypress', handler: (e: KeyboardEvent) => void): void;
function addEventListener(event: 'change', handler: (e: Event) => void): void;
function addEventListener(
  event: 'click' | 'keypress' | 'change',
  handler: (e: any) => void
): void {
  console.log(`Added listener for ${event}`);
  // 実際の実装はここに書く
}

// ==========================================
// 問題 14: 複雑なオーバーロード
// ==========================================
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
// テストコード
// ==========================================
console.log(format('hello'));                        // "String: hello"
console.log(format(42));                             // "Number: 42"
console.log(format(true));                           // "Boolean: true"

console.log(createDate());
console.log(createDate(2024));
console.log(createDate(2024, 5));
console.log(createDate(2024, 5, 15));

console.log(double(5));                              // 10
console.log(double([1, 2, 3]));                      // [2, 4, 6]

console.log(parseData('{"name":"Alice"}', 'json'));  // { name: 'Alice' }
console.log(parseData('Hello', 'text'));             // "Hello"
console.log(parseData('42', 'number'));              // 42

console.log(search(['apple', 'banana'], 'app'));     // ['apple']
console.log(search([1, 2, 3], 2));                   // [2]

console.log(reverse('hello'));                       // 'olleh'
console.log(reverse([1, 2, 3]));                     // [3, 2, 1]

// Promise版
fetchData('https://api.example.com').then(data => console.log(data));
// コールバック版
fetchData('https://api.example.com', data => console.log(data));

console.log(createPerson('Alice'));                  // { name: 'Alice' }
console.log(createPerson('Bob', 30));                // { name: 'Bob', age: 30 }
console.log(createPerson('Charlie', 25, 'charlie@example.com'));

console.log(slice([1, 2, 3, 4, 5]));                // [1, 2, 3, 4, 5]
console.log(slice([1, 2, 3, 4, 5], 2));             // [3, 4, 5]
console.log(slice([1, 2, 3, 4, 5], 1, 3));          // [2, 3]

console.log(filterBy([1, 2, 3, 4], x => x > 2));    // [3, 4]

const calc = new Calculator(10);
console.log(calc.add(5).add(3).add(2, true));        // 20

const obj = { name: 'Alice', age: 25 };
console.log(get(obj, 'name'));                       // 'Alice'
console.log(get(obj, 'email' as any, 'N/A'));        // 'N/A'

addEventListener('click', (e) => console.log(e.x, e.y));
addEventListener('keypress', (e) => console.log(e.key));

console.log(merge({ a: 1 }));                        // { a: 1 }
console.log(merge({ a: 1 }, { b: 2 }));              // { a: 1, b: 2 }
console.log(merge({ a: 1 }, { b: 2 }, { c: 3 }));    // { a: 1, b: 2, c: 3 }

console.log(clamp(15, 10));                          // 10
console.log(clamp(5, 0, 10));                        // 5
console.log(clamp(15, 0, 10));                       // 10
