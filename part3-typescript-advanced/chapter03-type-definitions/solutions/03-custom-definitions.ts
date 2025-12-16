/**
 * Part 3: TypeScript 実践編
 * Chapter 3: 型定義ファイル
 * 演習 3: 自作の型定義ファイル - 解答
 *
 * このファイルでは、自作の型定義ファイルの作成方法を学びます。
 */

/* ============================================================================
 * 問題 1: シンプルなモジュールの型定義
 * ============================================================================
 * 以下の JavaScript ライブラリの型定義を作成してください。
 *
 * ライブラリ名: 'simple-logger'
 * 関数:
 * - log(message: string): void
 * - error(message: string): void
 * - warn(message: string): void
 */

// シンプルなモジュールの型定義
// declare module を使ってモジュール名を指定し、エクスポートする関数の型を定義
declare module 'simple-logger' {
  // 各ログレベルの関数を定義
  export function log(message: string): void;
  export function error(message: string): void;
  export function warn(message: string): void;
}

/* ============================================================================
 * 問題 2: クラスベースのライブラリの型定義
 * ============================================================================
 * 以下のクラスベースライブラリの型定義を作成してください。
 *
 * ライブラリ名: 'simple-store'
 * クラス: Store<T>
 * - コンストラクタ: constructor(initialValue: T)
 * - get(): T
 * - set(value: T): void
 * - subscribe(listener: (value: T) => void): () => void
 */

// ジェネリクスを使用したクラスベースの型定義
// デフォルトエクスポートを使用
declare module 'simple-store' {
  // ジェネリクスを持つクラスの定義
  class Store<T> {
    // コンストラクタで初期値を受け取る
    constructor(initialValue: T);
    // 現在の値を取得
    get(): T;
    // 新しい値を設定
    set(value: T): void;
    // リスナーを登録し、解除関数を返す
    subscribe(listener: (value: T) => void): () => void;
  }
  // デフォルトエクスポート
  export default Store;
}

/* ============================================================================
 * 問題 3: 名前空間付きライブラリの型定義
 * ============================================================================
 * 以下の名前空間付きライブラリの型定義を作成してください。
 *
 * ライブラリ名: 'chart-library'
 * 名前空間: Chart
 * - Chart.Bar(data: number[], options?: ChartOptions): void
 * - Chart.Line(data: number[], options?: ChartOptions): void
 * - interface ChartOptions { width?: number; height?: number; }
 */

// 名前空間を使用した型定義
// export = を使用してCommonJSスタイルのエクスポートを定義
declare module 'chart-library' {
  // 名前空間内でインターフェースと関数を定義
  namespace Chart {
    // チャートオプションのインターフェース
    interface ChartOptions {
      width?: number;
      height?: number;
    }

    // 棒グラフ作成関数
    function Bar(data: number[], options?: ChartOptions): void;
    // 折れ線グラフ作成関数
    function Line(data: number[], options?: ChartOptions): void;
  }

  // CommonJSスタイルのエクスポート
  export = Chart;
}

/* ============================================================================
 * 問題 4: プラグインシステムの型定義
 * ============================================================================
 * 以下のプラグインシステムの型定義を作成してください。
 *
 * ライブラリ名: 'plugin-system'
 * - Plugin インターフェース: { name: string; init(): void; }
 * - PluginManager クラス:
 *   - register(plugin: Plugin): void
 *   - unregister(name: string): void
 *   - get(name: string): Plugin | undefined
 */

// プラグインシステムの型定義
// インターフェースとクラスを名前付きエクスポート
declare module 'plugin-system' {
  // プラグインの基本構造を定義
  interface Plugin {
    name: string;
    init(): void;
  }

  // プラグインを管理するクラス
  class PluginManager {
    // プラグインを登録
    register(plugin: Plugin): void;
    // プラグインを解除
    unregister(name: string): void;
    // プラグインを取得（存在しない場合はundefined）
    get(name: string): Plugin | undefined;
  }

  // 名前付きエクスポート
  export { Plugin, PluginManager };
}

/* ============================================================================
 * 問題 5: イベントエミッターの型定義
 * ============================================================================
 * 以下のイベントエミッターライブラリの型定義を作成してください。
 *
 * ライブラリ名: 'event-emitter'
 * - EventEmitter<T> クラス（T はイベント名と引数の型のマッピング）
 * - on<K extends keyof T>(event: K, handler: (...args: T[K]) => void): void
 * - emit<K extends keyof T>(event: K, ...args: T[K]): void
 * - off<K extends keyof T>(event: K, handler: (...args: T[K]) => void): void
 */

// 型安全なイベントエミッターの定義
// ジェネリクスと keyof を使用して、イベント名と引数の型を制約
declare module 'event-emitter' {
  // T はイベント名をキー、引数のタプル型を値とするレコード型
  class EventEmitter<T extends Record<string, any[]>> {
    // イベントハンドラを登録
    // K extends keyof T で、T に定義されたイベント名のみを受け入れる
    on<K extends keyof T>(event: K, handler: (...args: T[K]) => void): void;
    // イベントを発火
    emit<K extends keyof T>(event: K, ...args: T[K]): void;
    // イベントハンドラを解除
    off<K extends keyof T>(event: K, handler: (...args: T[K]) => void): void;
  }

  // デフォルトエクスポート
  export default EventEmitter;
}

/* ============================================================================
 * 問題 6: HTTP クライアントの型定義
 * ============================================================================
 * 以下の HTTP クライアントライブラリの型定義を作成してください。
 *
 * ライブラリ名: 'http-client'
 * - Request インターフェース: { url: string; method: string; body?: any }
 * - Response<T> インターフェース: { data: T; status: number }
 * - send<T>(request: Request): Promise<Response<T>>
 */

// HTTP クライアントの型定義
// リクエスト、レスポンス、送信関数を定義
declare module 'http-client' {
  // HTTPリクエストの構造
  interface Request {
    url: string;
    method: string;
    body?: any;
  }

  // HTTPレスポンスの構造（ジェネリクスでデータ型を指定）
  interface Response<T> {
    data: T;
    status: number;
  }

  // リクエストを送信し、型付きレスポンスを返す
  function send<T>(request: Request): Promise<Response<T>>;

  // 名前付きエクスポート
  export { Request, Response, send };
}

/* ============================================================================
 * 問題 7: バリデーターの型定義
 * ============================================================================
 * 以下のバリデーターライブラリの型定義を作成してください。
 *
 * ライブラリ名: 'validator'
 * - Validator<T> インターフェース:
 *   - validate(value: unknown): value is T
 *   - assert(value: unknown): asserts value is T
 * - string(): Validator<string>
 * - number(): Validator<number>
 * - object<T>(schema: { [K in keyof T]: Validator<T[K]> }): Validator<T>
 */

// 型ガード・型アサーションを使用したバリデーターの定義
declare module 'validator' {
  // バリデーターのインターフェース
  interface Validator<T> {
    // 型ガード関数（true を返した場合、value は T 型）
    validate(value: unknown): value is T;
    // アサーション関数（エラーを投げない場合、value は T 型）
    assert(value: unknown): asserts value is T;
  }

  // 文字列バリデーターを作成
  function string(): Validator<string>;
  // 数値バリデーターを作成
  function number(): Validator<number>;
  // オブジェクトバリデーターを作成（Mapped Types を使用）
  function object<T>(schema: { [K in keyof T]: Validator<T[K]> }): Validator<T>;

  // 名前付きエクスポート
  export { Validator, string, number, object };
}

/* ============================================================================
 * 問題 8: ルーターの型定義
 * ============================================================================
 * 以下のルーターライブラリの型定義を作成してください。
 *
 * ライブラリ名: 'router'
 * - Route インターフェース: { path: string; handler: RouteHandler }
 * - RouteHandler: (params: Record<string, string>) => void
 * - Router クラス:
 *   - add(route: Route): void
 *   - navigate(path: string): void
 */

// ルーティングライブラリの型定義
declare module 'router' {
  // ルートハンドラの型（パラメータを受け取る関数）
  type RouteHandler = (params: Record<string, string>) => void;

  // ルート設定のインターフェース
  interface Route {
    path: string;
    handler: RouteHandler;
  }

  // ルーターを管理するクラス
  class Router {
    // ルートを追加
    add(route: Route): void;
    // 指定されたパスに移動
    navigate(path: string): void;
  }

  // 名前付きエクスポート
  export { Route, RouteHandler, Router };
}

/* ============================================================================
 * 問題 9: 状態管理ライブラリの型定義
 * ============================================================================
 * 以下の状態管理ライブラリの型定義を作成してください。
 *
 * ライブラリ名: 'state-manager'
 * - State<T> クラス:
 *   - constructor(initialState: T)
 *   - get(): T
 *   - set(updater: (state: T) => T): void
 *   - subscribe(listener: (state: T) => void): () => void
 * - createState<T>(initialState: T): State<T>
 */

// 状態管理ライブラリの型定義
// イミュータブルな状態管理を実現
declare module 'state-manager' {
  // 状態を管理するクラス
  class State<T> {
    // 初期状態を受け取る
    constructor(initialState: T);
    // 現在の状態を取得
    get(): T;
    // 状態を更新（更新関数を受け取る）
    set(updater: (state: T) => T): void;
    // 状態変更を監視し、解除関数を返す
    subscribe(listener: (state: T) => void): () => void;
  }

  // 状態オブジェクトを作成するファクトリ関数
  function createState<T>(initialState: T): State<T>;

  // 名前付きエクスポート
  export { State, createState };
}

/* ============================================================================
 * 問題 10: アニメーションライブラリの型定義
 * ============================================================================
 * 以下のアニメーションライブラリの型定義を作成してください。
 *
 * ライブラリ名: 'animator'
 * - AnimationOptions: { duration?: number; easing?: string; }
 * - Animatable インターフェース:
 *   - to(values: Record<string, number>, options?: AnimationOptions): Promise<void>
 *   - play(): void
 *   - pause(): void
 * - animate(element: HTMLElement): Animatable
 */

// アニメーションライブラリの型定義
declare module 'animator' {
  // アニメーションのオプション設定
  interface AnimationOptions {
    duration?: number;
    easing?: string;
  }

  // アニメーション可能なオブジェクトのインターフェース
  interface Animatable {
    // 指定された値にアニメーション（Promiseを返す）
    to(values: Record<string, number>, options?: AnimationOptions): Promise<void>;
    // アニメーションを再生
    play(): void;
    // アニメーションを一時停止
    pause(): void;
  }

  // 要素をアニメーション可能にする関数
  function animate(element: HTMLElement): Animatable;

  // 名前付きエクスポート
  export { AnimationOptions, Animatable, animate };
}

/* ============================================================================
 * 問題 11: データベースクライアントの型定義
 * ============================================================================
 * 以下のデータベースクライアントライブラリの型定義を作成してください。
 *
 * ライブラリ名: 'db-client'
 * - QueryResult<T>: { rows: T[]; count: number }
 * - Database クラス:
 *   - connect(url: string): Promise<void>
 *   - query<T>(sql: string, params?: any[]): Promise<QueryResult<T>>
 *   - close(): Promise<void>
 */

// データベースクライアントの型定義
declare module 'db-client' {
  // クエリ結果の構造（ジェネリクスで行の型を指定）
  interface QueryResult<T> {
    rows: T[];
    count: number;
  }

  // データベース接続を管理するクラス
  class Database {
    // データベースに接続
    connect(url: string): Promise<void>;
    // SQLクエリを実行し、型付き結果を返す
    query<T>(sql: string, params?: any[]): Promise<QueryResult<T>>;
    // 接続を閉じる
    close(): Promise<void>;
  }

  // 名前付きエクスポート
  export { QueryResult, Database };
}

/* ============================================================================
 * 問題 12: テンプレートエンジンの型定義
 * ============================================================================
 * 以下のテンプレートエンジンライブラリの型定義を作成してください。
 *
 * ライブラリ名: 'template-engine'
 * - Template クラス:
 *   - constructor(source: string)
 *   - render(data: Record<string, any>): string
 * - compile(source: string): Template
 */

// テンプレートエンジンの型定義
declare module 'template-engine' {
  // テンプレートを表すクラス
  class Template {
    // テンプレート文字列を受け取る
    constructor(source: string);
    // データを適用してレンダリング
    render(data: Record<string, any>): string;
  }

  // テンプレートをコンパイルする関数
  function compile(source: string): Template;

  // 名前付きエクスポート
  export { Template, compile };
}

/* ============================================================================
 * 問題 13: キャッシュライブラリの型定義
 * ============================================================================
 * 以下のキャッシュライブラリの型定義を作成してください。
 *
 * ライブラリ名: 'cache-lib'
 * - CacheOptions: { ttl?: number; maxSize?: number }
 * - Cache<K, V> クラス:
 *   - constructor(options?: CacheOptions)
 *   - get(key: K): V | undefined
 *   - set(key: K, value: V): void
 *   - has(key: K): boolean
 *   - delete(key: K): boolean
 *   - clear(): void
 */

// キャッシュライブラリの型定義
declare module 'cache-lib' {
  // キャッシュのオプション設定
  interface CacheOptions {
    ttl?: number;      // Time To Live（有効期限）
    maxSize?: number;  // 最大サイズ
  }

  // ジェネリクスでキーと値の型を指定できるキャッシュクラス
  class Cache<K, V> {
    // オプションを受け取る（省略可能）
    constructor(options?: CacheOptions);
    // キーから値を取得（存在しない場合はundefined）
    get(key: K): V | undefined;
    // キーと値を設定
    set(key: K, value: V): void;
    // キーが存在するか確認
    has(key: K): boolean;
    // キーを削除（成功した場合true）
    delete(key: K): boolean;
    // すべてのキャッシュをクリア
    clear(): void;
  }

  // 名前付きエクスポート
  export { CacheOptions, Cache };
}

/* ============================================================================
 * 問題 14: ファイルアップローダーの型定義
 * ============================================================================
 * 以下のファイルアップローダーライブラリの型定義を作成してください。
 *
 * ライブラリ名: 'uploader'
 * - UploadOptions: { url: string; method?: string; headers?: Record<string, string> }
 * - UploadProgress: { loaded: number; total: number; percentage: number }
 * - Uploader クラス:
 *   - upload(file: File, options: UploadOptions): Promise<void>
 *   - onProgress(callback: (progress: UploadProgress) => void): void
 */

// ファイルアップローダーの型定義
declare module 'uploader' {
  // アップロード時のオプション
  interface UploadOptions {
    url: string;
    method?: string;
    headers?: Record<string, string>;
  }

  // アップロード進捗情報
  interface UploadProgress {
    loaded: number;     // アップロード済みのバイト数
    total: number;      // 合計バイト数
    percentage: number; // 進捗率（パーセント）
  }

  // ファイルをアップロードするクラス
  class Uploader {
    // ファイルをアップロード
    upload(file: File, options: UploadOptions): Promise<void>;
    // 進捗コールバックを設定
    onProgress(callback: (progress: UploadProgress) => void): void;
  }

  // 名前付きエクスポート
  export { UploadOptions, UploadProgress, Uploader };
}

/* ============================================================================
 * 問題 15: WebSocket クライアントの型定義
 * ============================================================================
 * 以下の WebSocket クライアントライブラリの型定義を作成してください。
 *
 * ライブラリ名: 'ws-client'
 * - WSOptions: { url: string; protocols?: string[] }
 * - WSClient<T> クラス:
 *   - constructor(options: WSOptions)
 *   - connect(): Promise<void>
 *   - send(data: T): void
 *   - onMessage(callback: (data: T) => void): void
 *   - close(): void
 */

// WebSocketクライアントの型定義
declare module 'ws-client' {
  // WebSocket接続のオプション
  interface WSOptions {
    url: string;
    protocols?: string[];
  }

  // ジェネリクスでメッセージの型を指定できるWebSocketクライアント
  class WSClient<T> {
    // オプションを受け取る
    constructor(options: WSOptions);
    // 接続を確立
    connect(): Promise<void>;
    // データを送信
    send(data: T): void;
    // メッセージ受信時のコールバックを設定
    onMessage(callback: (data: T) => void): void;
    // 接続を閉じる
    close(): void;
  }

  // 名前付きエクスポート
  export { WSOptions, WSClient };
}

// ============================================================================
// テストコード
// ============================================================================
// ※ 型定義の演習なので、実際のモジュールは存在しません
// ※ 型チェックが通ることを確認するために、このセクションはコメントアウトされています

// 問題 1 のテスト（型定義が正しいことを確認）
// import { log, error, warn } from 'simple-logger';
// log('Info message');
// error('Error message');
// warn('Warning message');

// 問題 2 のテスト（ジェネリクスと基本的なメソッドの型チェック）
// import Store from 'simple-store';
// const store = new Store<number>(0);
// store.set(42);
// console.log(store.get()); // 42

// 問題 3 のテスト（名前空間とオプショナルパラメータ）
// import Chart from 'chart-library';
// Chart.Bar([1, 2, 3], { width: 400, height: 300 });
// Chart.Line([1, 2, 3]);

// 問題 4 のテスト（インターフェースとクラスの名前付きエクスポート）
// import { Plugin, PluginManager } from 'plugin-system';
// const plugin: Plugin = { name: 'test', init: () => {} };
// const manager = new PluginManager();
// manager.register(plugin);

// 問題 5 のテスト（型安全なイベントエミッター）
// import EventEmitter from 'event-emitter';
// type Events = { click: [x: number, y: number]; change: [value: string] };
// const emitter = new EventEmitter<Events>();
// emitter.on('click', (x, y) => console.log(x, y));

// 問題 6 のテスト（ジェネリックな非同期関数）
// import { send } from 'http-client';
// const response = await send<{ name: string }>({
//   url: '/api/user',
//   method: 'GET'
// });
// console.log(response.data.name);

// 問題 7 のテスト（型ガードとアサーション）
// import { string, number, object } from 'validator';
// const data: unknown = { name: 'Alice', age: 30 };
// const userValidator = object({ name: string(), age: number() });
// if (userValidator.validate(data)) {
//   console.log(data.name); // 型ガードにより、data.name にアクセス可能
// }

// 問題 8 のテスト（型エイリアスとインターフェース）
// import { Router } from 'router';
// const router = new Router();
// router.add({ path: '/user/:id', handler: (params) => console.log(params.id) });
// router.navigate('/user/123');

// 問題 9 のテスト（関数型の状態更新）
// import { createState } from 'state-manager';
// const state = createState({ count: 0 });
// state.subscribe((s) => console.log(s.count));
// state.set((s) => ({ count: s.count + 1 }));

// 問題 10 のテスト（Promiseを返すメソッド）
// import { animate } from 'animator';
// const element = document.getElementById('box')!;
// const anim = animate(element);
// await anim.to({ opacity: 0 }, { duration: 1000 });

// 問題 11 のテスト（データベースクエリの型安全性）
// import { Database } from 'db-client';
// const db = new Database();
// await db.connect('postgres://localhost/mydb');
// const result = await db.query<{ name: string }>('SELECT * FROM users');
// console.log(result.rows);

// 問題 12 のテスト（クラスとファクトリ関数）
// import { compile } from 'template-engine';
// const template = compile('Hello, {{name}}!');
// const output = template.render({ name: 'World' });

// 問題 13 のテスト（2つのジェネリック型パラメータ）
// import { Cache } from 'cache-lib';
// const cache = new Cache<string, number>({ ttl: 60000 });
// cache.set('key', 42);
// console.log(cache.get('key')); // 42

// 問題 14 のテスト（コールバック登録パターン）
// import { Uploader } from 'uploader';
// const file = new File(['content'], 'test.txt');
// const uploader = new Uploader();
// uploader.onProgress((progress) => console.log(progress.percentage));
// await uploader.upload(file, { url: '/upload' });

// 問題 15 のテスト（WebSocketクライアントの型安全性）
// import { WSClient } from 'ws-client';
// const client = new WSClient<string>({ url: 'ws://localhost:8080' });
// await client.connect();
// client.onMessage((data) => console.log(data));
// client.send('Hello');
