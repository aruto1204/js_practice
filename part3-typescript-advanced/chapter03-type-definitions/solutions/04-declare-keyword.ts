/**
 * Part 3: TypeScript 実践編
 * Chapter 3: 型定義ファイル
 * 演習 4: declare キーワード - 解答
 *
 * このファイルでは、declare キーワードの使い方を学びます。
 *
 * 注意事項:
 * 1. このファイルで表示されるモジュール宣言エラーは ambient 宣言の性質上正常です。
 *    実際の使用時には、これらのモジュールが存在するか、
 *    適切なバンドラー設定が行われることを想定しています。
 *
 * 2. Window や HTMLElement などのブラウザ API を使用するテストコードは、
 *    tsconfig.json の lib に "DOM" を追加することで型エラーが解消されます。
 *    ただし、このプロジェクトは Node.js 環境を想定しているため、
 *    テストコードは参考実装として提供しています。
 *
 * 3. process.env を使用するには Node.js の型定義（@types/node）が必要です。
 */

// このファイルをモジュールとして扱うために空のエクスポートを追加
export {};

/* ============================================================================
 * 問題 1: グローバル定数の宣言
 * ============================================================================
 * 以下のグローバル定数の型宣言を作成してください。
 *
 * - API_VERSION: string 型
 * - MAX_RETRY_COUNT: number 型
 * - IS_PRODUCTION: boolean 型
 */

// グローバル定数の型宣言を作成
// declare const は定数の ambient 宣言に使用
// 実装は別の場所（ランタイム環境など）で提供されることを想定
declare const API_VERSION: string;
declare const MAX_RETRY_COUNT: number;
declare const IS_PRODUCTION: boolean;

/* ============================================================================
 * 問題 2: グローバル関数の宣言
 * ============================================================================
 * 以下のグローバル関数の型宣言を作成してください。
 *
 * - delay(ms: number): Promise<void>
 * - generateId(): string
 * - formatCurrency(amount: number, currency: string): string
 */

// グローバル関数の型宣言を作成
// declare function は関数の ambient 宣言に使用
// これにより、既存のグローバル関数に型情報を追加できる
declare function delay(ms: number): Promise<void>;
declare function generateId(): string;
declare function formatCurrency(amount: number, currency: string): string;

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

// グローバルクラスの型宣言を作成
// declare class は既存のグローバルクラスの型情報を定義
// 実装はランタイム環境で提供される
declare class LocalStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

/* ============================================================================
 * 問題 4: グローバル変数の宣言
 * ============================================================================
 * 以下のグローバル変数の型宣言を作成してください。
 *
 * - appConfig: { baseUrl: string; timeout: number; debug: boolean }
 */

// グローバル変数の型宣言を作成
// declare var は変数の ambient 宣言に使用（再代入可能な変数の場合）
// オブジェクト型を直接インラインで定義
declare var appConfig: { baseUrl: string; timeout: number; debug: boolean };

/* ============================================================================
 * 問題 5: Window オブジェクトの拡張
 * ============================================================================
 * Window インターフェースを拡張して、以下のプロパティを追加してください。
 *
 * - customProperty: string
 * - customMethod(): void
 */

// Window インターフェースの拡張を定義
// declare global ブロック内でグローバルな型を拡張
// Window インターフェースにカスタムプロパティとメソッドを追加
declare global {
  interface Window {
    customProperty: string;
    customMethod(): void;
  }
}

/* ============================================================================
 * 問題 6: Array の拡張
 * ============================================================================
 * Array インターフェースを拡張して、以下のメソッドを追加してください。
 *
 * - chunk(size: number): T[][]  配列を指定サイズで分割
 * - unique(): T[]                重複を除去
 */

// Array インターフェースの拡張を定義
// ジェネリック型 T を使用して、配列の要素型を保持
// chunk は配列の配列を返し、unique は同じ型の配列を返す
declare global {
  interface Array<T> {
    chunk(size: number): T[][];
    unique(): T[];
  }
}

/* ============================================================================
 * 問題 7: String の拡張
 * ============================================================================
 * String インターフェースを拡張して、以下のメソッドを追加してください。
 *
 * - capitalize(): string         先頭を大文字に
 * - truncate(length: number, suffix?: string): string  文字列を切り詰め
 */

// String インターフェースの拡張を定義
// capitalize は文字列を返すシンプルなメソッド
// truncate は省略可能な suffix パラメータを持つ
declare global {
  interface String {
    capitalize(): string;
    truncate(length: number, suffix?: string): string;
  }
}

/* ============================================================================
 * 問題 8: Number の拡張
 * ============================================================================
 * Number インターフェースを拡張して、以下のメソッドを追加してください。
 *
 * - clamp(min: number, max: number): number  値を範囲内に制限
 * - isEven(): boolean                        偶数判定
 */

// Number インターフェースの拡張を定義
// clamp は数値を指定範囲内に制限するメソッド
// isEven は偶数かどうかを判定するメソッド
declare global {
  interface Number {
    clamp(min: number, max: number): number;
    isEven(): boolean;
  }
}

/* ============================================================================
 * 問題 9: モジュールの Ambient 宣言
 * ============================================================================
 * 型定義のない 'legacy-module' モジュールの宣言を作成してください。
 *
 * - default エクスポート: any 型
 */

// 'legacy-module' モジュールの Ambient 宣言を作成
// 型定義が提供されていない外部モジュールの型情報を定義
// any 型を使用することで、型チェックを緩和
declare module 'legacy-module' {
  const content: any;
  export default content;
}

/* ============================================================================
 * 問題 10: CSS モジュールの宣言
 * ============================================================================
 * CSS Modules の型宣言を作成してください。
 *
 * - '*.module.css' の型: { [className: string]: string }
 */

// CSS Modules の型宣言を作成
// '*.module.css' にマッチする全てのファイルに対して型を定義
// インデックスシグネチャを使用して、任意のクラス名にアクセス可能
declare module '*.module.css' {
  const classes: { [className: string]: string };
  export default classes;
}

/* ============================================================================
 * 問題 11: 画像ファイルの宣言
 * ============================================================================
 * 画像ファイルのインポートの型宣言を作成してください。
 *
 * - '*.png': string 型（画像の URL）
 * - '*.jpg': string 型
 * - '*.svg': string 型
 */

// 画像ファイルの型宣言を作成
// 各画像形式に対して個別にモジュール宣言を定義
// インポートされた画像は URL 文字列として扱われる
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

/* ============================================================================
 * 問題 12: JSON ファイルの宣言
 * ============================================================================
 * JSON ファイルのインポートの型宣言を作成してください。
 *
 * - '*.json': any 型
 */

// JSON ファイルの型宣言を作成
// JSON の内容は動的なため any 型を使用
// より厳密な型付けが必要な場合は、個別の型定義を検討
declare module '*.json' {
  const value: any;
  export default value;
}

/* ============================================================================
 * 問題 13: グローバル名前空間の宣言
 * ============================================================================
 * 以下のグローバル名前空間の型宣言を作成してください。
 *
 * - Analytics 名前空間:
 *   - track(event: string, data?: Record<string, any>): void
 *   - identify(userId: string): void
 */

// Analytics 名前空間の型宣言を作成
// declare namespace はグローバルな名前空間を定義
// Analytics オブジェクトに関数をグループ化
declare namespace Analytics {
  function track(event: string, data?: Record<string, any>): void;
  function identify(userId: string): void;
}

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

// ProcessEnv インターフェースの拡張を定義
// NodeJS 名前空間内の ProcessEnv インターフェースを拡張
// カスタム環境変数に型情報を追加し、IDE の自動補完を有効化
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CUSTOM_API_KEY: string;
      CUSTOM_API_URL: string;
      CUSTOM_DEBUG?: string;
    }
  }
}

/* ============================================================================
 * 問題 15: ブラウザ API の拡張
 * ============================================================================
 * HTMLElement インターフェースを拡張して、以下のメソッドを追加してください。
 *
 * - fadeIn(duration: number): Promise<void>
 * - fadeOut(duration: number): Promise<void>
 */

// HTMLElement インターフェースの拡張を定義
// カスタムアニメーションメソッドを追加
// Promise を返すことで、非同期処理を適切に型付け
declare global {
  interface HTMLElement {
    fadeIn(duration: number): Promise<void>;
    fadeOut(duration: number): Promise<void>;
  }
}

// ============================================================================
// テストコード
// ============================================================================

// テスト用の非同期関数でラップ
// declare で宣言された関数や拡張されたメソッドを使用するデモコード
async function runTests() {
  // 問題 1 のテスト
  console.log(API_VERSION); // string
  console.log(MAX_RETRY_COUNT); // number
  console.log(IS_PRODUCTION); // boolean

  // 問題 2 のテスト
  await delay(1000);
  const id = generateId(); // string
  const formatted = formatCurrency(1000, 'USD'); // string

  // 問題 3 のテスト
  const storage = new LocalStorage();
  storage.setItem('key', 'value');
  const value = storage.getItem('key'); // string | null
  storage.removeItem('key');

  // 問題 4 のテスト
  console.log(appConfig.baseUrl);
  console.log(appConfig.timeout);
  console.log(appConfig.debug);

  // 問題 5 のテスト
  window.customProperty = 'value';
  window.customMethod();

  // 問題 6 のテスト
  const arr = [1, 2, 3, 4, 5];
  const chunked = arr.chunk(2); // [[1, 2], [3, 4], [5]]
  const unique = [1, 1, 2, 2, 3].unique(); // [1, 2, 3]

  // 問題 7 のテスト
  const str = 'hello';
  console.log(str.capitalize()); // 'Hello'
  console.log('very long text'.truncate(10, '...')); // 'very long...'

  // 問題 8 のテスト
  const num = 50;
  console.log(num.clamp(0, 100)); // 50
  console.log(num.isEven()); // true

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
  Analytics.track('page_view', { page: '/home' });
  Analytics.identify('user123');

  // 問題 14 のテスト
  const apiKey = process.env.CUSTOM_API_KEY; // string
  const apiUrl = process.env.CUSTOM_API_URL; // string
  const debug = process.env.CUSTOM_DEBUG; // string | undefined

  // 問題 15 のテスト
  const element = document.getElementById('app')!;
  await element.fadeIn(500);
  await element.fadeOut(500);
}

// 実際の実行はコメントアウト（型チェックのみ行う）
// runTests();
