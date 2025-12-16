/**
 * Part 3: TypeScript 実践編
 * Chapter 3: 型定義ファイル
 * 演習 2: @types パッケージの利用
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

// TODO: ProcessEnv インターフェースを定義
// interface ProcessEnv...

/* ============================================================================
 * 問題 2: fs モジュールの型定義
 * ============================================================================
 * Node.js の fs モジュールの型定義を作成してください。
 *
 * - readFile: (path: string, encoding: string, callback) => void
 * - writeFile: (path: string, data: string, callback) => void
 * callback は (error: Error | null, data?: string) => void
 */

// TODO: fs モジュールの型定義を作成
// declare module 'fs' {
//   ...
// }

/* ============================================================================
 * 問題 3: Express の型定義の理解
 * ============================================================================
 * Express の Request オブジェクトを拡張して、user プロパティを追加してください。
 * user は { id: number, name: string } 型です。
 */

// TODO: Express の Request インターフェースを拡張
// declare namespace Express {
//   interface Request {
//     ...
//   }
// }

/* ============================================================================
 * 問題 4: lodash の型定義
 * ============================================================================
 * lodash の一部の関数の型定義を作成してください。
 *
 * - chunk<T>(array: T[], size: number): T[][]
 * - debounce<T extends (...args: any[]) => any>(func: T, wait: number): T
 */

// TODO: lodash モジュールの型定義を作成
// declare module 'lodash' {
//   ...
// }

/* ============================================================================
 * 問題 5: jQuery の型定義
 * ============================================================================
 * jQuery の $ 関数の型定義を作成してください。
 *
 * - $(selector: string): JQuery
 * - $(element: HTMLElement): JQuery
 * JQuery インターフェースは hide(), show(), click(handler) を持つ
 */

// TODO: jQuery の型定義を作成
// interface JQuery {
//   ...
// }
// declare function $...

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

// TODO: ButtonProps インターフェースを定義
// interface ButtonProps...

/* ============================================================================
 * 問題 7: 関数コンポーネントの型定義
 * ============================================================================
 * React の関数コンポーネントの型を定義してください。
 *
 * FC<P> は Props P を受け取り、ReactElement を返す関数型です。
 */

// TODO: FC 型を定義
// type FC<P = {}> = ...

/* ============================================================================
 * 問題 8: axios の型定義
 * ============================================================================
 * axios の基本的な型定義を作成してください。
 *
 * - AxiosResponse<T>: { data: T, status: number, headers: any }
 * - AxiosError: { message: string, response?: AxiosResponse<any> }
 * - axios.get<T>(url: string): Promise<AxiosResponse<T>>
 */

// TODO: axios モジュールの型定義を作成
// interface AxiosResponse<T> {
//   ...
// }
// declare module 'axios' {
//   ...
// }

/* ============================================================================
 * 問題 9: moment の型定義
 * ============================================================================
 * moment.js の型定義を作成してください。
 *
 * - Moment インターフェース: format(pattern?: string): string
 * - moment(): Moment
 * - moment(date: string | Date): Moment
 */

// TODO: moment モジュールの型定義を作成
// interface Moment {
//   ...
// }
// declare function moment...

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

// TODO: Jest のグローバル関数の型定義を作成
// interface Matchers<T> {
//   ...
// }
// declare function describe...
// declare function it...
// declare function expect...

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

// TODO: TypeDependencies インターフェースを定義
// interface TypeDependencies...

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

// TODO: TypeDefinitionFile インターフェースを定義
// interface TypeDefinitionFile...

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

// TODO: TypeConflictResolution インターフェースを定義
// interface TypeConflictResolution...

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

// TODO: ProcessEnv インターフェースの拡張を定義
// declare global {
//   namespace NodeJS {
//     interface ProcessEnv {
//       ...
//     }
//   }
// }

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

// TODO: TypesPackageJson インターフェースを定義
// interface TypesPackageJson...

// ============================================================================
// テストコード
// ============================================================================

// 問題 1 のテスト
// const env: ProcessEnv = {
//   NODE_ENV: 'development',
//   PORT: '3000',
//   DATABASE_URL: 'postgres://localhost/mydb'
// };

// 問題 2 のテスト
// import * as fs from 'fs';
// fs.readFile('path.txt', 'utf8', (err, data) => {
//   if (err) console.error(err);
//   else console.log(data);
// });

// 問題 3 のテスト
// import { Request, Response } from 'express';
// function handler(req: Request, res: Response) {
//   console.log(req.user.name);
// }

// 問題 4 のテスト
// import { chunk, debounce } from 'lodash';
// const chunks = chunk([1, 2, 3, 4], 2); // [[1, 2], [3, 4]]
// const debouncedFn = debounce(() => console.log('Hello'), 1000);

// 問題 5 のテスト
// const element = $('#app');
// element.hide().show().click(() => console.log('Clicked!'));

// 問題 6 のテスト
// const props: ButtonProps = {
//   label: 'Click me',
//   onClick: () => console.log('Clicked'),
//   disabled: false
// };

// 問題 7 のテスト
// const Button: FC<ButtonProps> = ({ label, onClick, disabled }) => {
//   return { /* JSX */ };
// };

// 問題 8 のテスト
// import axios from 'axios';
// axios.get<{ name: string }>('/api/user')
//   .then(res => console.log(res.data.name))
//   .catch((err: AxiosError) => console.error(err.message));

// 問題 9 のテスト
// import moment from 'moment';
// const now = moment();
// console.log(now.format('YYYY-MM-DD'));

// 問題 10 のテスト
// describe('Math', () => {
//   it('should add numbers', () => {
//     expect(1 + 1).toBe(2);
//   });
// });

// 問題 11 のテスト
// const dep: TypeDependencies = {
//   package: 'express',
//   version: '^4.18.0',
//   typesVersion: '^4.17.0'
// };

// 問題 12 のテスト
// const typeFile: TypeDefinitionFile = {
//   path: 'types/custom.d.ts',
//   exports: ['CustomType', 'AnotherType'],
//   imports: ['@types/node', '@types/express']
// };

// 問題 13 のテスト
// const resolution: TypeConflictResolution = {
//   originalType: 'Request',
//   aliasType: 'ExpressRequest',
//   package: '@types/express'
// };

// 問題 14 のテスト
// const apiKey = process.env.API_KEY; // string
// const redisUrl = process.env.REDIS_URL; // string | undefined

// 問題 15 のテスト
// const pkg: TypesPackageJson = {
//   name: '@types/my-library',
//   version: '1.0.0',
//   description: 'Type definitions for my-library',
//   types: 'index.d.ts'
// };
