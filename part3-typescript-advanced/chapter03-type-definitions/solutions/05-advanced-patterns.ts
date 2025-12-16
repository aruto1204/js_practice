/**
 * Part 3: TypeScript 実践編
 * Chapter 3: 型定義ファイル
 * 演習 5: 実践的なパターン - 解答
 *
 * このファイルでは、実践的な型定義パターンの解答を示します。
 */

/* ============================================================================
 * 問題 1: プラグインアーキテクチャの型定義
 * ============================================================================
 * プラグインシステムの型定義を作成してください。
 *
 * - Plugin<T> インターフェース:
 *   - name: string
 *   - version: string
 *   - install(app: T): void
 *   - uninstall?(app: T): void
 *
 * - PluginContext<T, P extends Plugin<T>> 型:
 *   - app: T
 *   - plugin: P
 */

// 解答: プラグインアーキテクチャの型定義
// AppPlugin<T>: アプリケーション型Tに対するプラグインのインターフェース
interface AppPlugin<T> {
  name: string;           // プラグイン名
  version: string;        // バージョン
  install(app: T): void;  // インストール時に呼ばれるメソッド
  uninstall?(app: T): void; // オプショナル: アンインストール時に呼ばれるメソッド
}

// PluginContext: プラグインとアプリケーションのコンテキストを保持する型
type PluginContext<T, P extends AppPlugin<T>> = {
  app: T;       // アプリケーションインスタンス
  plugin: P;    // プラグインインスタンス
};

/* ============================================================================
 * 問題 2: ミドルウェアパターンの型定義
 * ============================================================================
 * ミドルウェアパターンの型定義を作成してください。
 *
 * - Context 型: { request: any; response: any; state: Record<string, any> }
 * - Next 型: () => Promise<void>
 * - Middleware 型: (ctx: Context, next: Next) => Promise<void>
 * - MiddlewareComposer: { use(middleware: Middleware): void; execute(ctx: Context): Promise<void> }
 */

// 解答: ミドルウェアパターンの型定義
// Context: リクエスト、レスポンス、状態を含むコンテキスト型
type Context = {
  request: any;                    // リクエストオブジェクト
  response: any;                   // レスポンスオブジェクト
  state: Record<string, any>;      // ミドルウェア間で共有する状態
};

// Next: 次のミドルウェアを呼び出す関数の型
type Next = () => Promise<void>;

// Middleware: コンテキストとnext関数を受け取るミドルウェア関数の型
type Middleware = (ctx: Context, next: Next) => Promise<void>;

// MiddlewareComposer: ミドルウェアを登録・実行するインターフェース
interface MiddlewareComposer {
  use(middleware: Middleware): void;     // ミドルウェアを追加
  execute(ctx: Context): Promise<void>;  // ミドルウェアチェーンを実行
}

/* ============================================================================
 * 問題 3: ビルダーパターンの型定義
 * ============================================================================
 * 流暢な API のためのビルダーパターンの型定義を作成してください。
 *
 * - Builder<T> 型: T のプロパティごとに set メソッドを持ち、build() で T を返す
 *   例: { setName(value: string): this; setAge(value: number): this; build(): T }
 */

// 解答: ビルダーパターンの型定義
// Builder<T>: 各プロパティに対してsetXxx()メソッドを持つ流暢なAPI
type Builder<T> = {
  // 各プロパティKに対して、setXxx()メソッドを生成（Xxxはプロパティ名の先頭を大文字化したもの）
  // メソッドチェーンのためにthisを返す
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => Builder<T>;
} & {
  // build()メソッド: 最終的にT型のオブジェクトを構築
  build(): T;
};

/* ============================================================================
 * 問題 4: オブザーバーパターンの型定義
 * ============================================================================
 * オブザーバーパターンの型定義を作成してください。
 *
 * - Observer<T> 型: (data: T) => void
 * - Observable<T> インターフェース:
 *   - subscribe(observer: Observer<T>): () => void
 *   - notify(data: T): void
 */

// 解答: オブザーバーパターンの型定義
// Observer<T>: データT受け取って処理する関数の型
type Observer<T> = (data: T) => void;

// Observable<T>: オブザーバーを登録・通知するインターフェース
interface Observable<T> {
  subscribe(observer: Observer<T>): () => void; // オブザーバーを登録し、解除関数を返す
  notify(data: T): void;                        // すべてのオブザーバーに通知
}

/* ============================================================================
 * 問題 5: ファクトリーパターンの型定義
 * ============================================================================
 * ファクトリーパターンの型定義を作成してください。
 *
 * - Factory<T, Args extends any[]> 型: (...args: Args) => T
 * - FactoryRegistry<T> インターフェース:
 *   - register(name: string, factory: Factory<T, any[]>): void
 *   - create<Args extends any[]>(name: string, ...args: Args): T
 */

// 解答: ファクトリーパターンの型定義
// Factory<T, Args>: 引数Argsを受け取ってT型のオブジェクトを生成する関数
type Factory<T, Args extends any[]> = (...args: Args) => T;

// FactoryRegistry<T>: ファクトリー関数を登録・利用するレジストリ
interface FactoryRegistry<T> {
  register(name: string, factory: Factory<T, any[]>): void; // ファクトリーを名前で登録
  create<Args extends any[]>(name: string, ...args: Args): T; // 登録されたファクトリーでオブジェクトを生成
}

/* ============================================================================
 * 問題 6: デコレーターパターンの型定義
 * ============================================================================
 * メソッドデコレーターの型定義を作成してください。
 *
 * - MethodDecorator 型:
 *   (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor
 */

// 解答: メソッドデコレーターの型定義
// CustomMethodDecorator: メソッドに適用されるデコレーターの型
type CustomMethodDecorator = (
  target: any,                           // デコレートされるクラスのプロトタイプ
  propertyKey: string,                   // メソッド名
  descriptor: PropertyDescriptor         // メソッドのプロパティディスクリプタ
) => PropertyDescriptor;                 // 新しいプロパティディスクリプタを返す

/* ============================================================================
 * 問題 7: 依存性注入の型定義
 * ============================================================================
 * 依存性注入コンテナの型定義を作成してください。
 *
 * - Token<T> 型: { name: string; type: T }
 * - Container インターフェース:
 *   - register<T>(token: Token<T>, value: T): void
 *   - resolve<T>(token: Token<T>): T
 */

// 解答: 依存性注入の型定義
// Token<T>: 依存性を識別するトークン型（型情報を保持）
type Token<T> = {
  name: string; // トークン名
  type: T;      // 型情報（実際の値ではなく型の保持のみ）
};

// Container: 依存性を登録・解決するコンテナ
interface Container {
  register<T>(token: Token<T>, value: T): void; // トークンに対して値を登録
  resolve<T>(token: Token<T>): T;               // トークンから値を解決
}

/* ============================================================================
 * 問題 8: ストラテジーパターンの型定義
 * ============================================================================
 * ストラテジーパターンの型定義を作成してください。
 *
 * - Strategy<In, Out> 型: (input: In) => Out
 * - StrategyContext<In, Out> インターフェース:
 *   - setStrategy(strategy: Strategy<In, Out>): void
 *   - execute(input: In): Out
 */

// 解答: ストラテジーパターンの型定義
// Strategy<In, Out>: 入力Inを受け取って出力Outを返す戦略関数
type Strategy<In, Out> = (input: In) => Out;

// StrategyContext<In, Out>: 戦略を切り替えて実行するコンテキスト
interface StrategyContext<In, Out> {
  setStrategy(strategy: Strategy<In, Out>): void; // 使用する戦略を設定
  execute(input: In): Out;                        // 設定された戦略で実行
}

/* ============================================================================
 * 問題 9: コマンドパターンの型定義
 * ============================================================================
 * コマンドパターンの型定義を作成してください。
 *
 * - Command インターフェース:
 *   - execute(): void
 *   - undo(): void
 *
 * - CommandInvoker インターフェース:
 *   - executeCommand(command: Command): void
 *   - undo(): void
 */

// 解答: コマンドパターンの型定義
// ExecutableCommand: 実行可能で取り消し可能なコマンドのインターフェース
interface ExecutableCommand {
  execute(): void; // コマンドを実行
  undo(): void;    // コマンドを取り消し
}

// CommandInvoker: コマンドを実行・取り消しを管理するインボーカー
interface CommandInvoker {
  executeCommand(command: ExecutableCommand): void; // コマンドを実行
  undo(): void;                                     // 最後のコマンドを取り消し
}

/* ============================================================================
 * 問題 10: チェーン・オブ・レスポンシビリティの型定義
 * ============================================================================
 * チェーン・オブ・レスポンシビリティパターンの型定義を作成してください。
 *
 * - Handler<T> インターフェース:
 *   - setNext(handler: Handler<T>): Handler<T>
 *   - handle(request: T): T | null
 */

// 解答: チェーン・オブ・レスポンシビリティの型定義
// Handler<T>: リクエストを処理するハンドラーのチェーン
interface Handler<T> {
  setNext(handler: Handler<T>): Handler<T>; // 次のハンドラーを設定し、そのハンドラーを返す
  handle(request: T): T | null;             // リクエストを処理（処理できない場合はnull）
}

/* ============================================================================
 * 問題 11: リポジトリパターンの型定義
 * ============================================================================
 * リポジトリパターンの型定義を作成してください。
 *
 * - Entity インターフェース: { id: string | number }
 * - Repository<T extends Entity> インターフェース:
 *   - findById(id: T['id']): Promise<T | null>
 *   - findAll(): Promise<T[]>
 *   - save(entity: T): Promise<T>
 *   - delete(id: T['id']): Promise<boolean>
 */

// 解答: リポジトリパターンの型定義
// Entity: IDを持つエンティティの基底インターフェース
interface Entity {
  id: string | number;
}

// Repository<T>: エンティティTに対するCRUD操作を提供するリポジトリ
interface Repository<T extends Entity> {
  findById(id: T['id']): Promise<T | null>; // IDでエンティティを検索
  findAll(): Promise<T[]>;                  // すべてのエンティティを取得
  save(entity: T): Promise<T>;              // エンティティを保存（新規作成または更新）
  delete(id: T['id']): Promise<boolean>;    // IDでエンティティを削除
}

/* ============================================================================
 * 問題 12: ユニット・オブ・ワークパターンの型定義
 * ============================================================================
 * ユニット・オブ・ワークパターンの型定義を作成してください。
 *
 * - UnitOfWork インターフェース:
 *   - registerNew<T>(entity: T): void
 *   - registerDirty<T>(entity: T): void
 *   - registerDeleted<T>(entity: T): void
 *   - commit(): Promise<void>
 *   - rollback(): void
 */

// 解答: ユニット・オブ・ワークパターンの型定義
// UnitOfWork: トランザクション内の変更を追跡し、一括でコミットする
interface UnitOfWork {
  registerNew<T>(entity: T): void;      // 新規エンティティを登録
  registerDirty<T>(entity: T): void;    // 変更されたエンティティを登録
  registerDeleted<T>(entity: T): void;  // 削除するエンティティを登録
  commit(): Promise<void>;              // すべての変更をコミット
  rollback(): void;                     // すべての変更をロールバック
}

/* ============================================================================
 * 問題 13: イベントソーシングの型定義
 * ============================================================================
 * イベントソーシングパターンの型定義を作成してください。
 *
 * - Event<T> インターフェース:
 *   - type: string
 *   - timestamp: number
 *   - data: T
 *
 * - EventStore<T> インターフェース:
 *   - append(event: Event<T>): Promise<void>
 *   - getEvents(aggregateId: string): Promise<Event<T>[]>
 */

// 解答: イベントソーシングの型定義
// DomainEvent<T>: データTを持つイベント
interface DomainEvent<T> {
  type: string;      // イベントタイプ
  timestamp: number; // イベント発生時刻（タイムスタンプ）
  data: T;           // イベントデータ
}

// EventStore<T>: イベントを保存・取得するストア
interface EventStore<T> {
  append(event: DomainEvent<T>): Promise<void>;                // イベントを追加
  getEvents(aggregateId: string): Promise<DomainEvent<T>[]>;   // 集約IDに関連するイベントを取得
}

/* ============================================================================
 * 問題 14: CQRS パターンの型定義
 * ============================================================================
 * CQRS（Command Query Responsibility Segregation）パターンの型定義を作成してください。
 *
 * - Command<T> インターフェース: { type: string; payload: T }
 * - Query<T> インターフェース: { type: string; params: T }
 * - CommandHandler<T, R> 型: (command: Command<T>) => Promise<R>
 * - QueryHandler<T, R> 型: (query: Query<T>) => Promise<R>
 */

// 解答: CQRS パターンの型定義
// CQRSCommand<T>: システムの状態を変更するコマンド
interface CQRSCommand<T> {
  type: string;   // コマンドタイプ
  payload: T;     // コマンドのペイロード
}

// CQRSQuery<T>: システムの状態を照会するクエリ
interface CQRSQuery<T> {
  type: string;   // クエリタイプ
  params: T;      // クエリパラメータ
}

// CommandHandler<T, R>: コマンドを処理して結果Rを返すハンドラー
type CommandHandler<T, R> = (command: CQRSCommand<T>) => Promise<R>;

// QueryHandler<T, R>: クエリを処理して結果Rを返すハンドラー
type QueryHandler<T, R> = (query: CQRSQuery<T>) => Promise<R>;

/* ============================================================================
 * 問題 15: 型安全なルーティングシステム
 * ============================================================================
 * 型安全なルーティングシステムの型定義を作成してください。
 *
 * - Route<Path, Params> 型: { path: Path; params: Params }
 * - ExtractParams<Path> 型: Path から :param を抽出して { param: string } の型を生成
 *   例: '/user/:id' -> { id: string }
 *        '/post/:id/:slug' -> { id: string; slug: string }
 *
 * ヒント: Template Literal Types と Conditional Types を使用
 */

// 解答: 型安全なルーティングシステムの型定義
// ExtractParams<Path>: パス文字列から:paramを抽出してオブジェクト型を生成
type ExtractParams<Path extends string> =
  // パターン1: :param/... の形式（中間のパラメータ）
  Path extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractParams<`/${Rest}`>]: string }
    // パターン2: :param の形式（最後のパラメータ）
    : Path extends `${infer _Start}:${infer Param}`
    ? { [K in Param]: string }
    // パラメータがない場合は空オブジェクト
    : {};

// Route<Path, Params>: パスとそのパラメータを持つルート型
type Route<Path extends string, Params = ExtractParams<Path>> = {
  path: Path;      // ルートパス
  params: Params;  // パスパラメータ
};

// ============================================================================
// テストコード
// ============================================================================

// 問題 1 のテスト
interface App {
  name: string;
}
const plugin: AppPlugin<App> = {
  name: 'test-plugin',
  version: '1.0.0',
  install: (app) => console.log(app.name)
};

// 問題 2 のテスト
const logger: Middleware = async (ctx, next) => {
  console.log('Before');
  await next();
  console.log('After');
};

// 問題 3 のテスト
interface User {
  name: string;
  age: number;
}
const builder: Builder<User> = {} as any;
const user = builder.setName('Alice').setAge(30).build();

// 問題 4 のテスト
const observable: Observable<number> = {} as any;
const unsubscribe = observable.subscribe((data) => console.log(data));
observable.notify(42);

// 問題 5 のテスト
const registry: FactoryRegistry<any> = {} as any;
registry.register('user', (name: string) => ({ name }));
const user2 = registry.create('user', 'Alice');

// 問題 6 のテスト
const log: CustomMethodDecorator = (target, propertyKey, descriptor) => {
  console.log(`Method ${propertyKey} called`);
  return descriptor;
};

// 問題 7 のテスト
const userToken: Token<{ name: string }> = { name: 'user', type: {} as any };
const container: Container = {} as any;
container.register(userToken, { name: 'Alice' });
const user3 = container.resolve(userToken);

// 問題 8 のテスト
const addStrategy: Strategy<{ a: number; b: number }, number> = (input) => input.a + input.b;
const context: StrategyContext<{ a: number; b: number }, number> = {} as any;
context.setStrategy(addStrategy);
const result = context.execute({ a: 1, b: 2 });

// 問題 9 のテスト
const executableCommand: ExecutableCommand = {
  execute: () => console.log('Execute'),
  undo: () => console.log('Undo')
};
const invoker: CommandInvoker = {} as any;
invoker.executeCommand(executableCommand);

// 問題 10 のテスト
const handler: Handler<string> = {} as any;
handler.setNext({} as any).handle('request');

// 問題 11 のテスト
interface User4 extends Entity {
  name: string;
}
const repo: Repository<User4> = {} as any;
// const user4 = await repo.findById('1');
// await repo.save({ id: '1', name: 'Alice' });

// 問題 12 のテスト
const uow: UnitOfWork = {} as any;
uow.registerNew({ id: '1', name: 'Alice' });
// await uow.commit();

// 問題 13 のテスト
const domainEvent: DomainEvent<{ userId: string }> = {
  type: 'USER_CREATED',
  timestamp: Date.now(),
  data: { userId: '1' }
};
const eventStore: EventStore<{ userId: string }> = {} as any;
// await eventStore.append(domainEvent);

// 問題 14 のテスト
const cqrsCommand: CQRSCommand<{ name: string }> = {
  type: 'CREATE_USER',
  payload: { name: 'Alice' }
};
const cqrsQuery: CQRSQuery<{ id: string }> = {
  type: 'GET_USER',
  params: { id: '1' }
};
const cmdHandler: CommandHandler<{ name: string }, void> = async (cmd) => {};
const queryHandler: QueryHandler<{ id: string }, { name: string }> = async (q) => ({ name: 'Alice' });

// 問題 15 のテスト
type UserRoute = Route<'/user/:id'>;
const userRoute: UserRoute = {
  path: '/user/:id',
  params: { id: '123' }
};

type PostRoute = Route<'/post/:id/:slug'>;
const postRoute: PostRoute = {
  path: '/post/:id/:slug',
  params: { id: '123', slug: 'hello-world' }
};
