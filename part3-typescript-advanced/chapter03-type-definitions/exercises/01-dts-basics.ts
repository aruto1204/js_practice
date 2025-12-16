/**
 * Part 3: TypeScript 実践編
 * Chapter 3: 型定義ファイル
 * 演習 1: 型定義ファイルの基本
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

// TODO: multiply 関数の型定義を作成（実装は不要）
// declare function multiply...

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

// TODO: Calculator クラスの型定義を作成
// declare class Calculator...

/* ============================================================================
 * 問題 3: インターフェースを含む型定義
 * ============================================================================
 * 以下の JavaScript コードに対する型定義を作成してください。
 * Options インターフェースも定義してください。
 *
 * JavaScript コード:
 * export function createServer(options) {
 *   // options: { port: number, host?: string, secure?: boolean }
 *   return { /* server object */ };
 * }
 */

// TODO: Options インターフェースと createServer 関数の型定義を作成
// interface Options...
// declare function createServer...

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

// TODO: VERSION、init、Logger の型定義を作成
// declare const VERSION...
// declare function init...
// declare class Logger...

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

// TODO: Database クラスのデフォルトエクスポートの型定義を作成
// declare class Database...
// export default Database;

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

// TODO: Math 名前空間の型定義を作成
// declare namespace Math...

/* ============================================================================
 * 問題 7: グローバル変数の型定義
 * ============================================================================
 * 以下のグローバル変数の型定義を作成してください。
 *
 * - APP_CONFIG: { apiUrl: string, timeout: number } 型のオブジェクト
 * - DEBUG_MODE: boolean 型の定数
 */

// TODO: グローバル変数の型定義を作成
// declare const APP_CONFIG...
// declare const DEBUG_MODE...

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

// TODO: format 関数のオーバーロード型定義を作成
// declare function format(template: string): string;
// declare function format...

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

// TODO: toArray 関数のジェネリック型定義を作成
// declare function toArray...

/* ============================================================================
 * 問題 10: 型エイリアスを含む型定義
 * ============================================================================
 * 以下の型エイリアスと関数の型定義を作成してください。
 *
 * - Callback 型: (error: Error | null, data?: any) => void
 * - readFile 関数: (path: string, callback: Callback) => void
 */

// TODO: Callback 型と readFile 関数の型定義を作成
// type Callback...
// declare function readFile...

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

// TODO: config オブジェクトの型定義を作成（インターフェースまたは型エイリアスを使用）
// interface Config...
// declare const config...

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

// TODO: translations オブジェクトの型定義を作成（インデックスシグネチャを使用）
// declare const translations...

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

// TODO: constants オブジェクトの型定義を作成（readonly を使用）
// declare const constants...

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

// TODO: request 関数とそのプロパティの型定義を作成
// interface RequestFunction...
// declare const request...

/* ============================================================================
 * 問題 15: モジュール拡張の型定義
 * ============================================================================
 * 既存の Array インターフェースを拡張して、以下のメソッドを追加してください。
 *
 * - first(): T | undefined  配列の最初の要素を返す
 * - last(): T | undefined   配列の最後の要素を返す
 */

// TODO: Array インターフェースの拡張を定義
// declare global {
//   interface Array<T> {
//     ...
//   }
// }

// ============================================================================
// テストコード
// ============================================================================

// 問題 1 のテスト
// const result1 = multiply(3, 4); // 12

// 問題 2 のテスト
// const calc = new Calculator();
// calc.add(5).add(3).getResult(); // 8

// 問題 3 のテスト
// const server = createServer({ port: 3000, host: 'localhost' });

// 問題 4 のテスト
// console.log(VERSION); // '1.0.0'
// init({ debug: true });
// const logger = new Logger();

// 問題 5 のテスト
// const db = new Database();
// db.connect('mongodb://localhost');
// db.disconnect();

// 問題 6 のテスト
// console.log(Math.PI);
// Math.add(1, 2);
// const vec = new Math.Vector();

// 問題 7 のテスト
// console.log(APP_CONFIG.apiUrl);
// console.log(DEBUG_MODE);

// 問題 8 のテスト
// format('Hello'); // string
// format('Hello, %s!', 'World'); // string

// 問題 9 のテスト
// toArray(5); // number[]
// toArray([1, 2, 3]); // number[]

// 問題 10 のテスト
// readFile('path.txt', (err, data) => {
//   if (err) console.error(err);
//   else console.log(data);
// });

// 問題 11 のテスト
// config.get('key');
// config.set('key', 'value');

// 問題 12 のテスト
// translations['hello'] = 'こんにちは';
// const greeting = translations['hello'];

// 問題 13 のテスト
// console.log(constants.MAX_SIZE);
// constants.MAX_SIZE = 2000; // エラーになるべき

// 問題 14 のテスト
// request('/api/users');
// request.get('/api/users');
// request.post('/api/users', { name: 'Alice' });

// 問題 15 のテスト
// const arr = [1, 2, 3];
// arr.first(); // 1
// arr.last(); // 3
