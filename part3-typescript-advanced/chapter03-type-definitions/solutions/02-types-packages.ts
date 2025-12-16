/**
 * Part 3: TypeScript 実践編
 * Chapter 3: 型定義ファイル
 * 演習 2: @types パッケージの利用 - 解答
 *
 * このファイルでは、@types パッケージの利用方法を学びます。
 * 注: 実際にパッケージをインストールせず、型定義の理解を深めます。
 */

/* ============================================================================
 * 問題 1: Node.js の型定義
 * ============================================================================
 * @types/node から提供される型を使って、以下の型を定義してください。
 *
 * - ProcessEnv: 環境変数の型（NODE_ENV, PORT, DATABASE_URL を含む）
 */

// 【解答】環境変数の型を定義
// Node.js の環境変数は process.env で参照されるため、
// その型を定義することでプロジェクト全体での環境変数の型安全性が向上する
interface ProcessEnv {
  NODE_ENV: string;        // 環境（'development', 'production' など）
  PORT: string;            // ポート番号（環境変数は文字列として扱われる）
  DATABASE_URL: string;    // データベース接続URL
}

/* ============================================================================
 * 問題 2: fs モジュールの型定義
 * ============================================================================
 * Node.js の fs モジュールの型定義を作成してください。
 *
 * - readFile: (path: string, encoding: string, callback) => void
 * - writeFile: (path: string, data: string, callback) => void
 * callback は (error: Error | null, data?: string) => void
 */

// 【解答】fs モジュールの型定義
// declare module を使用して、外部モジュールの型定義を行う
// これにより、実際のモジュールをインポートする際に型補完が効くようになる
declare module 'fs' {
  // ファイル読み込み用のコールバック型
  // エラーが発生した場合は Error オブジェクト、成功した場合は null が渡される
  type ReadFileCallback = (error: Error | null, data?: string) => void;

  // ファイル書き込み用のコールバック型
  // エラーが発生した場合は Error オブジェクト、成功した場合は null が渡される
  type WriteFileCallback = (error: Error | null) => void;

  // ファイルを非同期で読み込む関数
  export function readFile(path: string, encoding: string, callback: ReadFileCallback): void;

  // ファイルに非同期で書き込む関数
  export function writeFile(path: string, data: string, callback: WriteFileCallback): void;
}

/* ============================================================================
 * 問題 3: Express の型定義の理解
 * ============================================================================
 * Express の Request オブジェクトを拡張して、user プロパティを追加してください。
 * user は { id: number, name: string } 型です。
 */

// 【解答】Express の Request インターフェースを拡張
// declare namespace を使用して既存の名前空間を拡張する
// これは Declaration Merging（宣言のマージ）と呼ばれる機能で、
// 既存の型定義に新しいプロパティやメソッドを追加できる
declare namespace Express {
  // Request インターフェースに user プロパティを追加
  // これにより、認証後のリクエストオブジェクトでユーザー情報を型安全に扱える
  interface Request {
    user: {
      id: number;      // ユーザーID
      name: string;    // ユーザー名
    };
  }
}

/* ============================================================================
 * 問題 4: lodash の型定義
 * ============================================================================
 * lodash の一部の関数の型定義を作成してください。
 *
 * - chunk<T>(array: T[], size: number): T[][]
 * - debounce<T extends (...args: any[]) => any>(func: T, wait: number): T
 */

// 【解答】lodash モジュールの型定義
// ジェネリクスを使用することで、様々な型の配列や関数に対応できる
declare module 'lodash' {
  // 配列を指定されたサイズのチャンクに分割する関数
  // T[] を受け取り、T[][] を返す（配列の配列）
  export function chunk<T>(array: T[], size: number): T[][];

  // 関数の実行を遅延させる（デバウンス）関数
  // T extends (...args: any[]) => any により、任意の関数型を受け入れる
  // 元の関数と同じ型を返すことで、型安全性を保つ
  export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T;
}

/* ============================================================================
 * 問題 5: jQuery の型定義
 * ============================================================================
 * jQuery の $ 関数の型定義を作成してください。
 *
 * - $(selector: string): JQuery
 * - $(element: HTMLElement): JQuery
 * JQuery インターフェースは hide(), show(), click(handler) を持つ
 */

// 【解答】jQuery の型定義
// jQuery オブジェクトが持つメソッドを定義
// メソッドチェーンを可能にするため、各メソッドは this を返す
interface JQuery {
  // 要素を非表示にする
  hide(): this;

  // 要素を表示する
  show(): this;

  // クリックイベントハンドラを登録する
  click(handler: () => void): this;
}

// $ 関数のオーバーロード定義
// 関数オーバーロードにより、異なる引数の型で同じ関数を呼び出せる
// CSSセレクタ文字列で要素を取得
declare function $(selector: string): JQuery;
// HTML要素オブジェクトをラップ
declare function $(element: HTMLElement): JQuery;

/* ============================================================================
 * 問題 6: React の型定義
 * ============================================================================
 * React コンポーネントの Props の型を定義してください。
 *
 * ButtonProps:
 * - label: string
 * - onClick: () => void
 * - disabled?: boolean
 */

// 【解答】ButtonProps インターフェースを定義
// React コンポーネントの Props は通常インターフェースで定義する
// オプショナルなプロパティには ? を付ける
interface ButtonProps {
  label: string;              // ボタンのラベルテキスト（必須）
  onClick: () => void;        // クリック時のハンドラ（必須）
  disabled?: boolean;         // 無効化フラグ（オプション）
}

/* ============================================================================
 * 問題 7: 関数コンポーネントの型定義
 * ============================================================================
 * React の関数コンポーネントの型を定義してください。
 *
 * FC<P> は Props P を受け取り、ReactElement を返す関数型です。
 */

// 【解答】FC 型を定義
// React の Function Component (FC) 型を定義
// ジェネリクスで Props の型を受け取り、デフォルトは空オブジェクト
// 関数は Props を引数として受け取り、ReactElement（JSXで生成される要素）を返す
type FC<P = {}> = (props: P) => ReactElement;

// ReactElement は JSX で生成される要素の型（簡略化した定義）
interface ReactElement {
  type: string | Function;
  props: any;
  key: string | null;
}

/* ============================================================================
 * 問題 8: axios の型定義
 * ============================================================================
 * axios の基本的な型定義を作成してください。
 *
 * - AxiosResponse<T>: { data: T, status: number, headers: any }
 * - AxiosError: { message: string, response?: AxiosResponse<any> }
 * - axios.get<T>(url: string): Promise<AxiosResponse<T>>
 */

// 【解答】axios モジュールの型定義
// axios のレスポンス型をジェネリクスで定義
// T は data プロパティの型を表す
interface AxiosResponse<T> {
  data: T;              // レスポンスデータ（型はジェネリクスで指定）
  status: number;       // HTTPステータスコード
  headers: any;         // レスポンスヘッダー
}

// axios のエラー型を定義
// エラーが発生した場合、レスポンス情報が含まれることがある
interface AxiosError {
  message: string;                      // エラーメッセージ
  response?: AxiosResponse<any>;        // レスポンス情報（オプション）
}

// axios モジュールの型定義
declare module 'axios' {
  // axios オブジェクトを export default として定義
  // get メソッドはジェネリクスでレスポンスの data の型を指定できる
  const axios: {
    get<T>(url: string): Promise<AxiosResponse<T>>;
  };
  export default axios;

  // AxiosError を名前付きエクスポート
  export { AxiosError };
}

/* ============================================================================
 * 問題 9: moment の型定義
 * ============================================================================
 * moment.js の型定義を作成してください。
 *
 * - Moment インターフェース: format(pattern?: string): string
 * - moment(): Moment
 * - moment(date: string | Date): Moment
 */

// 【解答】moment モジュールの型定義
// Moment オブジェクトが持つメソッドを定義
interface Moment {
  // 日付を指定されたパターンでフォーマットする
  // パターンを省略した場合はデフォルトのフォーマットが使用される
  format(pattern?: string): string;
}

// moment 関数のオーバーロード定義
// 引数なしで呼び出すと現在時刻の Moment オブジェクトを返す
declare function moment(): Moment;
// 文字列または Date オブジェクトを受け取り、Moment オブジェクトを返す
declare function moment(date: string | Date): Moment;

// moment モジュールの export default として定義
declare module 'moment' {
  export = moment;
}

/* ============================================================================
 * 問題 10: jest の型定義
 * ============================================================================
 * Jest のテスト関数の型定義を作成してください。
 *
 * - describe(name: string, fn: () => void): void
 * - it(name: string, fn: () => void | Promise<void>): void
 * - expect<T>(value: T): Matchers<T>
 * - Matchers<T>: toBe(expected: T): void
 */

// 【解答】Jest のグローバル関数の型定義
// Matchers インターフェースを定義
// ジェネリクス T は検証対象の値の型を表す
interface Matchers<T> {
  // 値が期待値と厳密に等しいかを検証する
  toBe(expected: T): void;
}

// テストスイートを定義するグローバル関数
// name: テストスイートの名前
// fn: テストケースを含むコールバック関数
declare function describe(name: string, fn: () => void): void;

// テストケースを定義するグローバル関数
// name: テストケースの名前
// fn: テスト実行関数（同期または非同期）
declare function it(name: string, fn: () => void | Promise<void>): void;

// アサーション（検証）を行うグローバル関数
// ジェネリクスで検証対象の値の型を指定し、Matchers オブジェクトを返す
declare function expect<T>(value: T): Matchers<T>;

/* ============================================================================
 * 問題 11: @types パッケージのバージョン管理
 * ============================================================================
 * package.json の devDependencies に @types パッケージを追加する際の
 * ベストプラクティスを示すオブジェクト型を定義してください。
 *
 * TypeDependencies:
 * - package: string        // パッケージ名
 * - version: string        // バージョン
 * - typesVersion: string   // @types パッケージのバージョン
 */

// 【解答】TypeDependencies インターフェースを定義
// パッケージとその型定義のバージョンを管理するための型
// @types パッケージは対応するライブラリのバージョンに合わせることが重要
interface TypeDependencies {
  package: string;          // ライブラリ名（例: 'express'）
  version: string;          // ライブラリのバージョン（例: '^4.18.0'）
  typesVersion: string;     // @types パッケージのバージョン（例: '^4.17.0'）
}

/* ============================================================================
 * 問題 12: カスタム型定義の配置
 * ============================================================================
 * プロジェクト内のカスタム型定義ファイルの構造を表す型を定義してください。
 *
 * TypeDefinitionFile:
 * - path: string           // ファイルパス（例: 'types/custom.d.ts'）
 * - exports: string[]      // エクスポートされる型名の配列
 * - imports: string[]      // インポートする型定義パッケージの配列
 */

// 【解答】TypeDefinitionFile インターフェースを定義
// プロジェクト内のカスタム型定義ファイルの情報を管理する型
// 型定義ファイルの依存関係やエクスポート内容を明確にする
interface TypeDefinitionFile {
  path: string;             // 型定義ファイルのパス
  exports: string[];        // このファイルでエクスポートされる型名のリスト
  imports: string[];        // このファイルが依存する @types パッケージのリスト
}

/* ============================================================================
 * 問題 13: 型定義の競合解決
 * ============================================================================
 * 複数の型定義パッケージで同じ名前の型が定義されている場合の
 * 解決策を示す型を定義してください。
 *
 * TypeConflictResolution:
 * - originalType: string   // 元の型名
 * - aliasType: string      // エイリアス名
 * - package: string        // パッケージ名
 */

// 【解答】TypeConflictResolution インターフェースを定義
// 型定義の競合を解決するための情報を管理する型
// 複数のライブラリで同名の型が定義されている場合、
// エイリアスを使用して区別することができる
interface TypeConflictResolution {
  originalType: string;     // 元の型名（例: 'Request'）
  aliasType: string;        // 衝突を避けるためのエイリアス名（例: 'ExpressRequest'）
  package: string;          // この型が定義されているパッケージ名
}

/* ============================================================================
 * 問題 14: グローバル型の拡張パターン
 * ============================================================================
 * @types/node の ProcessEnv を拡張して、カスタム環境変数を追加する
 * パターンを定義してください。
 *
 * カスタム環境変数:
 * - API_KEY: string
 * - API_SECRET: string
 * - REDIS_URL?: string
 */

// 【解答】ProcessEnv インターフェースの拡張を定義
// declare global を使用してグローバルスコープに型を追加
// Node.js の ProcessEnv インターフェースを拡張して、
// プロジェクト固有の環境変数を型安全に扱えるようにする
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;          // APIキー（必須）
      API_SECRET: string;       // APIシークレット（必須）
      REDIS_URL?: string;       // Redis接続URL（オプション）
    }
  }
}

/* ============================================================================
 * 問題 15: 型定義パッケージの作成
 * ============================================================================
 * 自作のライブラリ用の型定義パッケージの package.json の型を定義してください。
 *
 * TypesPackageJson:
 * - name: string           // '@types/ライブラリ名'
 * - version: string
 * - description: string
 * - types: string          // メインの型定義ファイル（例: 'index.d.ts'）
 * - typesVersions?: Record<string, Record<string, string[]>>
 */

// 【解答】TypesPackageJson インターフェースを定義
// @types パッケージの package.json の構造を定義
// typesVersions は TypeScript のバージョンごとに異なる型定義を提供する際に使用する
interface TypesPackageJson {
  name: string;             // パッケージ名（'@types/' で始まる）
  version: string;          // バージョン番号
  description: string;      // パッケージの説明
  types: string;            // メインの型定義ファイル（通常は 'index.d.ts'）
  typesVersions?: Record<string, Record<string, string[]>>;  // TypeScript バージョン別の型定義
}

// ============================================================================
// テストコード
// ============================================================================

// 問題 1 のテスト
const env: ProcessEnv = {
  NODE_ENV: 'development',
  PORT: '3000',
  DATABASE_URL: 'postgres://localhost/mydb'
};

// 問題 2 のテスト
import * as fs from 'fs';
fs.readFile('path.txt', 'utf8', (err, data) => {
  if (err) console.error(err);
  else console.log(data);
});

// 問題 3 のテスト
// Note: 実際の Express の Request と Response は import できないため、コメントとして残す
// import { Request, Response } from 'express';
// function handler(req: Request, res: Response) {
//   console.log(req.user.name);
// }

// 問題 4 のテスト
// Note: 実際のパッケージがインストールされていないため、コメントとして残す
// import { chunk, debounce } from 'lodash';
// const chunks = chunk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
// const debouncedFn = debounce(() => console.log('Hello'), 1000);

// 問題 5 のテスト
const element = $('#app');
element.hide().show().click(() => console.log('Clicked!'));

// 問題 6 のテスト
const props: ButtonProps = {
  label: 'Click me',
  onClick: () => console.log('Clicked'),
  disabled: false
};

// 問題 7 のテスト
const Button: FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return { type: 'button', props: { label, onClick, disabled }, key: null };
};

// 問題 8 のテスト
// Note: 実際のパッケージがインストールされていないため、コメントとして残す
// import axios from 'axios';
// axios.get<{ name: string }>('/api/user')
//   .then(res => console.log(res.data.name))
//   .catch((err: AxiosError) => console.error(err.message));

// 問題 9 のテスト
// Note: 実際のパッケージがインストールされていないため、コメントとして残す
// import moment from 'moment';
// const now = moment();
// console.log(now.format('YYYY-MM-DD'));

// 問題 10 のテスト
describe('Math', () => {
  it('should add numbers', () => {
    expect(1 + 1).toBe(2);
  });
});

// 問題 11 のテスト
const dep: TypeDependencies = {
  package: 'express',
  version: '^4.18.0',
  typesVersion: '^4.17.0'
};

// 問題 12 のテスト
const typeFile: TypeDefinitionFile = {
  path: 'types/custom.d.ts',
  exports: ['CustomType', 'AnotherType'],
  imports: ['@types/node', '@types/express']
};

// 問題 13 のテスト
const resolution: TypeConflictResolution = {
  originalType: 'Request',
  aliasType: 'ExpressRequest',
  package: '@types/express'
};

// 問題 14 のテスト
const apiKey = process.env.API_KEY; // string
const redisUrl = process.env.REDIS_URL; // string | undefined

// 問題 15 のテスト
const pkg: TypesPackageJson = {
  name: '@types/my-library',
  version: '1.0.0',
  description: 'Type definitions for my-library',
  types: 'index.d.ts'
};
