/**
 * Part 3: TypeScript 実践編
 * Chapter 3: 型定義ファイル
 * 演習 4: declare キーワード
 *
 * このファイルでは、declare キーワードの使い方を学びます。
 */

/* ============================================================================
 * 問題 1: グローバル定数の宣言
 * ============================================================================
 * 以下のグローバル定数の型宣言を作成してください。
 *
 * - API_VERSION: string 型
 * - MAX_RETRY_COUNT: number 型
 * - IS_PRODUCTION: boolean 型
 */

// TODO: グローバル定数の型宣言を作成
// declare const API_VERSION...
// declare const MAX_RETRY_COUNT...
// declare const IS_PRODUCTION...

/* ============================================================================
 * 問題 2: グローバル関数の宣言
 * ============================================================================
 * 以下のグローバル関数の型宣言を作成してください。
 *
 * - delay(ms: number): Promise<void>
 * - generateId(): string
 * - formatCurrency(amount: number, currency: string): string
 */

// TODO: グローバル関数の型宣言を作成
// declare function delay...
// declare function generateId...
// declare function formatCurrency...

/* ============================================================================
 * 問題 3: グローバルクラスの宣言
 * ============================================================================
 * 以下のグローバルクラスの型宣言を作成してください。
 *
 * - LocalStorage クラス:
 *   - getItem(key: string): string | null
 *   - setItem(key: string, value: string): void
 *   - removeItem(key: string): void
 */

// TODO: グローバルクラスの型宣言を作成
// declare class LocalStorage...

/* ============================================================================
 * 問題 4: グローバル変数の宣言
 * ============================================================================
 * 以下のグローバル変数の型宣言を作成してください。
 *
 * - appConfig: { baseUrl: string; timeout: number; debug: boolean }
 */

// TODO: グローバル変数の型宣言を作成
// declare var appConfig...

/* ============================================================================
 * 問題 5: Window オブジェクトの拡張
 * ============================================================================
 * Window インターフェースを拡張して、以下のプロパティを追加してください。
 *
 * - customProperty: string
 * - customMethod(): void
 */

// TODO: Window インターフェースの拡張を定義
// declare global {
//   interface Window {
//     ...
//   }
// }

/* ============================================================================
 * 問題 6: Array の拡張
 * ============================================================================
 * Array インターフェースを拡張して、以下のメソッドを追加してください。
 *
 * - chunk(size: number): T[][]  配列を指定サイズで分割
 * - unique(): T[]                重複を除去
 */

// TODO: Array インターフェースの拡張を定義
// declare global {
//   interface Array<T> {
//     ...
//   }
// }

/* ============================================================================
 * 問題 7: String の拡張
 * ============================================================================
 * String インターフェースを拡張して、以下のメソッドを追加してください。
 *
 * - capitalize(): string         先頭を大文字に
 * - truncate(length: number, suffix?: string): string  文字列を切り詰め
 */

// TODO: String インターフェースの拡張を定義
// declare global {
//   interface String {
//     ...
//   }
// }

/* ============================================================================
 * 問題 8: Number の拡張
 * ============================================================================
 * Number インターフェースを拡張して、以下のメソッドを追加してください。
 *
 * - clamp(min: number, max: number): number  値を範囲内に制限
 * - isEven(): boolean                        偶数判定
 */

// TODO: Number インターフェースの拡張を定義
// declare global {
//   interface Number {
//     ...
//   }
// }

/* ============================================================================
 * 問題 9: モジュールの Ambient 宣言
 * ============================================================================
 * 型定義のない 'legacy-module' モジュールの宣言を作成してください。
 *
 * - default エクスポート: any 型
 */

// TODO: 'legacy-module' モジュールの Ambient 宣言を作成
// declare module 'legacy-module' {
//   const content: any;
//   export default content;
// }

/* ============================================================================
 * 問題 10: CSS モジュールの宣言
 * ============================================================================
 * CSS Modules の型宣言を作成してください。
 *
 * - '*.module.css' の型: { [className: string]: string }
 */

// TODO: CSS Modules の型宣言を作成
// declare module '*.module.css' {
//   ...
// }

/* ============================================================================
 * 問題 11: 画像ファイルの宣言
 * ============================================================================
 * 画像ファイルのインポートの型宣言を作成してください。
 *
 * - '*.png': string 型（画像の URL）
 * - '*.jpg': string 型
 * - '*.svg': string 型
 */

// TODO: 画像ファイルの型宣言を作成
// declare module '*.png' {
//   ...
// }
// declare module '*.jpg' {
//   ...
// }
// declare module '*.svg' {
//   ...
// }

/* ============================================================================
 * 問題 12: JSON ファイルの宣言
 * ============================================================================
 * JSON ファイルのインポートの型宣言を作成してください。
 *
 * - '*.json': any 型
 */

// TODO: JSON ファイルの型宣言を作成
// declare module '*.json' {
//   ...
// }

/* ============================================================================
 * 問題 13: グローバル名前空間の宣言
 * ============================================================================
 * 以下のグローバル名前空間の型宣言を作成してください。
 *
 * - Analytics 名前空間:
 *   - track(event: string, data?: Record<string, any>): void
 *   - identify(userId: string): void
 */

// TODO: Analytics 名前空間の型宣言を作成
// declare namespace Analytics {
//   ...
// }

/* ============================================================================
 * 問題 14: process.env の拡張
 * ============================================================================
 * NodeJS の ProcessEnv インターフェースを拡張して、
 * 以下のカスタム環境変数を追加してください。
 *
 * - CUSTOM_API_KEY: string
 * - CUSTOM_API_URL: string
 * - CUSTOM_DEBUG?: string
 */

// TODO: ProcessEnv インターフェースの拡張を定義
// declare global {
//   namespace NodeJS {
//     interface ProcessEnv {
//       ...
//     }
//   }
// }

/* ============================================================================
 * 問題 15: ブラウザ API の拡張
 * ============================================================================
 * HTMLElement インターフェースを拡張して、以下のメソッドを追加してください。
 *
 * - fadeIn(duration: number): Promise<void>
 * - fadeOut(duration: number): Promise<void>
 */

// TODO: HTMLElement インターフェースの拡張を定義
// declare global {
//   interface HTMLElement {
//     ...
//   }
// }

// ============================================================================
// テストコード
// ============================================================================

// 問題 1 のテスト
// console.log(API_VERSION); // string
// console.log(MAX_RETRY_COUNT); // number
// console.log(IS_PRODUCTION); // boolean

// 問題 2 のテスト
// await delay(1000);
// const id = generateId(); // string
// const formatted = formatCurrency(1000, 'USD'); // string

// 問題 3 のテスト
// const storage = new LocalStorage();
// storage.setItem('key', 'value');
// const value = storage.getItem('key'); // string | null
// storage.removeItem('key');

// 問題 4 のテスト
// console.log(appConfig.baseUrl);
// console.log(appConfig.timeout);
// console.log(appConfig.debug);

// 問題 5 のテスト
// window.customProperty = 'value';
// window.customMethod();

// 問題 6 のテスト
// const arr = [1, 2, 3, 4, 5];
// const chunked = arr.chunk(2); // [[1, 2], [3, 4], [5]]
// const unique = [1, 1, 2, 2, 3].unique(); // [1, 2, 3]

// 問題 7 のテスト
// const str = 'hello';
// console.log(str.capitalize()); // 'Hello'
// console.log('very long text'.truncate(10, '...')); // 'very long...'

// 問題 8 のテスト
// const num = 50;
// console.log(num.clamp(0, 100)); // 50
// console.log(num.isEven()); // true

// 問題 9 のテスト
// import legacy from 'legacy-module';
// console.log(legacy); // any

// 問題 10 のテスト
// import styles from './App.module.css';
// console.log(styles.container); // string

// 問題 11 のテスト
// import logo from './logo.png';
// import photo from './photo.jpg';
// import icon from './icon.svg';
// console.log(logo); // string
// console.log(photo); // string
// console.log(icon); // string

// 問題 12 のテスト
// import data from './data.json';
// console.log(data); // any

// 問題 13 のテスト
// Analytics.track('page_view', { page: '/home' });
// Analytics.identify('user123');

// 問題 14 のテスト
// const apiKey = process.env.CUSTOM_API_KEY; // string
// const apiUrl = process.env.CUSTOM_API_URL; // string
// const debug = process.env.CUSTOM_DEBUG; // string | undefined

// 問題 15 のテスト
// const element = document.getElementById('app')!;
// await element.fadeIn(500);
// await element.fadeOut(500);
