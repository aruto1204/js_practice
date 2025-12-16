/**
 * Part 3: TypeScript 実践編
 * Chapter 3: 型定義ファイル
 * 演習 1: 型定義ファイルの基本 - 解答
 *
 * このファイルでは、.d.ts ファイルの基本的な役割と使い方を学びます。
 */

/* ============================================================================
 * 問題 1: 型定義の基本
 * ============================================================================
 * 以下の JavaScript 関数に対する型定義を作成してください。
 *
 * JavaScript コード:
 * export function multiply(a, b) {
 *   return a * b;
 * }
 */

// 解答: 基本的な関数の型定義
// 2つの数値を受け取り、数値を返す関数として定義
// .d.ts ファイルでは declare を使用するが、.ts ファイルでは実装が必要
function multiply(a: number, b: number): number {
  return a * b;
}

/* ============================================================================
 * 問題 2: クラスの型定義
 * ============================================================================
 * 以下の JavaScript クラスに対する型定義を作成してください。
 *
 * JavaScript コード:
 * export class Calculator {
 *   constructor() {
 *     this.result = 0;
 *   }
 *   add(n) {
 *     this.result += n;
 *     return this;
 *   }
 *   getResult() {
 *     return this.result;
 *   }
 * }
 */

// 解答: クラスの型定義
// プロパティとメソッドの型を定義
// add メソッドはメソッドチェーンのために this を返す
class Calculator {
  result: number = 0;

  add(n: number): this {
    this.result += n;
    return this;
  }

  getResult(): number {
    return this.result;
  }
}

/* ============================================================================
 * 問題 3: インターフェースを含む型定義
 * ============================================================================
 * 以下の JavaScript コードに対する型定義を作成してください。
 * Options インターフェースも定義してください。
 *
 * JavaScript コード:
 * export function createServer(options) {
 *   // options: { port: number, host?: string, secure?: boolean }
 *   return {};
 * }
 */

// 解答: インターフェースと関数の型定義
// Options インターフェースでオプショナルプロパティを定義
// createServer 関数は任意の型のオブジェクトを返す
interface Options {
  port: number;
  host?: string;
  secure?: boolean;
}

function createServer(options: Options): any {
  return {};
}

/* ============================================================================
 * 問題 4: 複数のエクスポート
 * ============================================================================
 * 以下の JavaScript モジュールの型定義を作成してください。
 *
 * JavaScript コード:
 * export const VERSION = '1.0.0';
 * export function init(config) { }
 * export class Logger { }
 */

// 解答: 複数のエクスポートの型定義
// 定数、関数、クラスそれぞれの型を定義
const VERSION: string = '1.0.0';

function init(config: any): void {}

class Logger {}

/* ============================================================================
 * 問題 5: デフォルトエクスポート
 * ============================================================================
 * 以下のデフォルトエクスポートの型定義を作成してください。
 *
 * JavaScript コード:
 * export default class Database {
 *   connect(url) { }
 *   disconnect() { }
 * }
 */

// 解答: デフォルトエクスポートの型定義
// .d.ts ファイルでは declare class と export default を使用
// .ts ファイルでは通常のクラス定義
class Database {
  connect(url: string): void {}
  disconnect(): void {}
}

/* ============================================================================
 * 問題 6: 名前空間の型定義
 * ============================================================================
 * 以下の名前空間型定義を作成してください。
 *
 * ライブラリは Math という名前空間を持ち、以下のメンバーを持ちます：
 * - PI: 定数（number）
 * - add(a: number, b: number): number
 * - Vector クラス（x: number, y: number プロパティを持つ）
 */

// 解答: 名前空間の型定義
// namespace キーワードで名前空間を定義
// 定数、関数、クラスをまとめてグループ化
namespace Math {
  export const PI: number = 3.14159;

  export function add(a: number, b: number): number {
    return a + b;
  }

  export class Vector {
    x: number = 0;
    y: number = 0;
  }
}

/* ============================================================================
 * 問題 7: グローバル変数の型定義
 * ============================================================================
 * 以下のグローバル変数の型定義を作成してください。
 *
 * - APP_CONFIG: { apiUrl: string, timeout: number } 型のオブジェクト
 * - DEBUG_MODE: boolean 型の定数
 */

// 解答: グローバル変数の型定義
// オブジェクト型をインラインで定義
const APP_CONFIG: {
  apiUrl: string;
  timeout: number;
} = {
  apiUrl: 'http://localhost',
  timeout: 5000
};

const DEBUG_MODE: boolean = false;

/* ============================================================================
 * 問題 8: オーバーロードを含む型定義
 * ============================================================================
 * 以下の関数は引数の数によって動作が異なります。
 * オーバーロードを使った型定義を作成してください。
 *
 * JavaScript コード:
 * export function format(template) { }          // string -> string
 * export function format(template, ...args) { } // string, ...any[] -> string
 */

// 解答: 関数オーバーロードの型定義
// 複数のシグネチャを定義することで、引数の数による違いを表現
function format(template: string): string;
function format(template: string, ...args: any[]): string;
function format(template: string, ...args: any[]): string {
  return template;
}

/* ============================================================================
 * 問題 9: ジェネリックを含む型定義
 * ============================================================================
 * 以下のジェネリック関数の型定義を作成してください。
 *
 * JavaScript コード:
 * export function toArray(value) {
 *   return Array.isArray(value) ? value : [value];
 * }
 */

// 解答: ジェネリック関数の型定義
// 型パラメータ T を使用して、値が配列か単一の値かに関わらず
// 常に T[] を返すことを表現
function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

/* ============================================================================
 * 問題 10: 型エイリアスを含む型定義
 * ============================================================================
 * 以下の型エイリアスと関数の型定義を作成してください。
 *
 * - Callback 型: (error: Error | null, data?: any) => void
 * - readFile 関数: (path: string, callback: Callback) => void
 */

// 解答: 型エイリアスと関数の型定義
// Node.js スタイルのコールバック型を定義
// エラーファーストのパターン
type Callback = (error: Error | null, data?: any) => void;

function readFile(path: string, callback: Callback): void {}

/* ============================================================================
 * 問題 11: プロパティシグネチャ
 * ============================================================================
 * 以下のオブジェクトの型定義を作成してください。
 *
 * JavaScript コード:
 * export const config = {
 *   get: function(key) { },      // string -> any
 *   set: function(key, value) { } // string, any -> void
 * };
 */

// 解答: プロパティシグネチャを持つ型定義
// インターフェースでメソッドプロパティを定義
interface Config {
  get(key: string): any;
  set(key: string, value: any): void;
}

const config: Config = {
  get(key: string): any {
    return null;
  },
  set(key: string, value: any): void {}
};

/* ============================================================================
 * 問題 12: インデックスシグネチャを含む型定義
 * ============================================================================
 * 以下の辞書オブジェクトの型定義を作成してください。
 *
 * JavaScript コード:
 * export const translations = {
 *   // キーは文字列、値も文字列の辞書
 * };
 */

// 解答: インデックスシグネチャの型定義
// [key: string]: string でキーと値の型を定義
// 任意の文字列キーで文字列値にアクセス可能
const translations: {
  [key: string]: string;
} = {};

/* ============================================================================
 * 問題 13: 読み取り専用プロパティ
 * ============================================================================
 * 以下の定数オブジェクトの型定義を作成してください。
 * すべてのプロパティは読み取り専用にしてください。
 *
 * JavaScript コード:
 * export const constants = {
 *   MAX_SIZE: 1000,
 *   MIN_SIZE: 10,
 *   DEFAULT_NAME: 'untitled'
 * };
 */

// 解答: 読み取り専用プロパティの型定義
// readonly キーワードで変更不可能なプロパティを定義
const constants: {
  readonly MAX_SIZE: number;
  readonly MIN_SIZE: number;
  readonly DEFAULT_NAME: string;
} = {
  MAX_SIZE: 1000,
  MIN_SIZE: 10,
  DEFAULT_NAME: 'untitled'
};

/* ============================================================================
 * 問題 14: 関数プロパティを持つ型定義
 * ============================================================================
 * 以下の関数とそのプロパティの型定義を作成してください。
 *
 * JavaScript コード:
 * export function request(url) { }
 * request.get = function(url) { };
 * request.post = function(url, data) { };
 */

// 解答: 関数プロパティを持つ型定義
// 関数自体の型とプロパティメソッドの型をインターフェースで定義
// 呼び出し可能な関数にプロパティを追加するパターン
interface RequestFunction {
  (url: string): any;
  get(url: string): any;
  post(url: string, data: any): any;
}

const request: RequestFunction = Object.assign(
  function(url: string): any {},
  {
    get(url: string): any {},
    post(url: string, data: any): any {}
  }
);

/* ============================================================================
 * 問題 15: モジュール拡張の型定義
 * ============================================================================
 * 既存の Array インターフェースを拡張して、以下のメソッドを追加してください。
 *
 * - first(): T | undefined  配列の最初の要素を返す
 * - last(): T | undefined   配列の最後の要素を返す
 */

// 解答: グローバルなインターフェース拡張
// declare global ブロック内で既存のインターフェースを拡張
// 配列のジェネリック型パラメータ T を使用
declare global {
  interface Array<T> {
    first(): T | undefined;
    last(): T | undefined;
  }
}

// 実際にメソッドを実装（学習目的）
Array.prototype.first = function<T>(this: T[]): T | undefined {
  return this[0];
};

Array.prototype.last = function<T>(this: T[]): T | undefined {
  return this[this.length - 1];
};

// ============================================================================
// テストコード
// ============================================================================

// 問題 1 のテスト
const result1 = multiply(3, 4); // 12
console.log('問題1:', result1);

// 問題 2 のテスト
const calc = new Calculator();
const result2 = calc.add(5).add(3).getResult(); // 8
console.log('問題2:', result2);

// 問題 3 のテスト
const server = createServer({ port: 3000, host: 'localhost' });
console.log('問題3:', server);

// 問題 4 のテスト
console.log('問題4:', VERSION); // '1.0.0'
init({ debug: true });
const logger = new Logger();
console.log('問題4:', logger);

// 問題 5 のテスト
const db = new Database();
db.connect('mongodb://localhost');
db.disconnect();
console.log('問題5:', db);

// 問題 6 のテスト
console.log('問題6:', Math.PI);
console.log('問題6:', Math.add(1, 2));
const vec = new Math.Vector();
console.log('問題6:', vec);

// 問題 7 のテスト
console.log('問題7:', APP_CONFIG.apiUrl);
console.log('問題7:', DEBUG_MODE);

// 問題 8 のテスト
const formatted1 = format('Hello'); // string
const formatted2 = format('Hello, %s!', 'World'); // string
console.log('問題8:', formatted1, formatted2);

// 問題 9 のテスト
const array1 = toArray(5); // number[]
const array2 = toArray([1, 2, 3]); // number[]
console.log('問題9:', array1, array2);

// 問題 10 のテスト
readFile('path.txt', (err, data) => {
  if (err) console.error(err);
  else console.log('問題10:', data);
});

// 問題 11 のテスト
config.get('key');
config.set('key', 'value');
console.log('問題11:', config);

// 問題 12 のテスト
translations['hello'] = 'こんにちは';
const greeting = translations['hello'];
console.log('問題12:', greeting);

// 問題 13 のテスト
console.log('問題13:', constants.MAX_SIZE);
// constants.MAX_SIZE = 2000; // エラーになるべき（コメントアウト）

// 問題 14 のテスト
request('/api/users');
request.get('/api/users');
request.post('/api/users', { name: 'Alice' });
console.log('問題14:', request);

// 問題 15 のテスト
const arr = [1, 2, 3];
console.log('問題15:', arr.first()); // 1
console.log('問題15:', arr.last()); // 3

// グローバルスコープに影響を与えないためのエクスポート
export {};
