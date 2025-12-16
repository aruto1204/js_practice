/**
 * Part 3: TypeScript 実践編
 * Chapter 3: 型定義ファイル
 * 演習 5: 実践的なパターン
 *
 * このファイルでは、実践的な型定義パターンを学びます。
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

// TODO: プラグインアーキテクチャの型定義を作成
// interface Plugin<T> {
//   ...
// }
// type PluginContext<T, P extends Plugin<T>> = ...

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

// TODO: ミドルウェアパターンの型定義を作成
// type Context = ...
// type Next = ...
// type Middleware = ...
// interface MiddlewareComposer {
//   ...
// }

/* ============================================================================
 * 問題 3: ビルダーパターンの型定義
 * ============================================================================
 * 流暢な API のためのビルダーパターンの型定義を作成してください。
 *
 * - Builder<T> 型: T のプロパティごとに set メソッドを持ち、build() で T を返す
 *   例: { setName(value: string): this; setAge(value: number): this; build(): T }
 */

// TODO: ビルダーパターンの型定義を作成
// type Builder<T> = {
//   [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => Builder<T>;
// } & {
//   build(): T;
// };

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

// TODO: オブザーバーパターンの型定義を作成
// type Observer<T> = ...
// interface Observable<T> {
//   ...
// }

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

// TODO: ファクトリーパターンの型定義を作成
// type Factory<T, Args extends any[]> = ...
// interface FactoryRegistry<T> {
//   ...
// }

/* ============================================================================
 * 問題 6: デコレーターパターンの型定義
 * ============================================================================
 * メソッドデコレーターの型定義を作成してください。
 *
 * - MethodDecorator 型:
 *   (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor
 */

// TODO: メソッドデコレーターの型定義を作成
// type MethodDecorator = ...

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

// TODO: 依存性注入の型定義を作成
// type Token<T> = ...
// interface Container {
//   ...
// }

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

// TODO: ストラテジーパターンの型定義を作成
// type Strategy<In, Out> = ...
// interface StrategyContext<In, Out> {
//   ...
// }

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

// TODO: コマンドパターンの型定義を作成
// interface Command {
//   ...
// }
// interface CommandInvoker {
//   ...
// }

/* ============================================================================
 * 問題 10: チェーン・オブ・レスポンシビリティの型定義
 * ============================================================================
 * チェーン・オブ・レスポンシビリティパターンの型定義を作成してください。
 *
 * - Handler<T> インターフェース:
 *   - setNext(handler: Handler<T>): Handler<T>
 *   - handle(request: T): T | null
 */

// TODO: チェーン・オブ・レスポンシビリティの型定義を作成
// interface Handler<T> {
//   ...
// }

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

// TODO: リポジトリパターンの型定義を作成
// interface Entity {
//   ...
// }
// interface Repository<T extends Entity> {
//   ...
// }

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

// TODO: ユニット・オブ・ワークパターンの型定義を作成
// interface UnitOfWork {
//   ...
// }

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

// TODO: イベントソーシングの型定義を作成
// interface Event<T> {
//   ...
// }
// interface EventStore<T> {
//   ...
// }

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

// TODO: CQRS パターンの型定義を作成
// interface Command<T> {
//   ...
// }
// interface Query<T> {
//   ...
// }
// type CommandHandler<T, R> = ...
// type QueryHandler<T, R> = ...

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

// TODO: 型安全なルーティングシステムの型定義を作成
// type ExtractParams<Path extends string> =
//   Path extends `${infer _Start}:${infer Param}/${infer Rest}`
//     ? { [K in Param | keyof ExtractParams<`/${Rest}`>]: string }
//     : Path extends `${infer _Start}:${infer Param}`
//     ? { [K in Param]: string }
//     : {};
//
// type Route<Path extends string, Params = ExtractParams<Path>> = {
//   path: Path;
//   params: Params;
// };

// ============================================================================
// テストコード
// ============================================================================

// 問題 1 のテスト
// interface App {
//   name: string;
// }
// const plugin: Plugin<App> = {
//   name: 'test-plugin',
//   version: '1.0.0',
//   install: (app) => console.log(app.name)
// };

// 問題 2 のテスト
// const logger: Middleware = async (ctx, next) => {
//   console.log('Before');
//   await next();
//   console.log('After');
// };

// 問題 3 のテスト
// interface User {
//   name: string;
//   age: number;
// }
// const builder: Builder<User> = {} as any;
// const user = builder.setName('Alice').setAge(30).build();

// 問題 4 のテスト
// const observable: Observable<number> = {} as any;
// const unsubscribe = observable.subscribe((data) => console.log(data));
// observable.notify(42);

// 問題 5 のテスト
// const registry: FactoryRegistry<any> = {} as any;
// registry.register('user', (name: string) => ({ name }));
// const user = registry.create('user', 'Alice');

// 問題 6 のテスト
// const log: MethodDecorator = (target, propertyKey, descriptor) => {
//   console.log(`Method ${propertyKey} called`);
//   return descriptor;
// };

// 問題 7 のテスト
// const userToken: Token<{ name: string }> = { name: 'user', type: {} as any };
// const container: Container = {} as any;
// container.register(userToken, { name: 'Alice' });
// const user = container.resolve(userToken);

// 問題 8 のテスト
// const addStrategy: Strategy<{ a: number; b: number }, number> = (input) => input.a + input.b;
// const context: StrategyContext<{ a: number; b: number }, number> = {} as any;
// context.setStrategy(addStrategy);
// const result = context.execute({ a: 1, b: 2 });

// 問題 9 のテスト
// const command: Command = {
//   execute: () => console.log('Execute'),
//   undo: () => console.log('Undo')
// };
// const invoker: CommandInvoker = {} as any;
// invoker.executeCommand(command);

// 問題 10 のテスト
// const handler: Handler<string> = {} as any;
// handler.setNext({} as any).handle('request');

// 問題 11 のテスト
// interface User extends Entity {
//   name: string;
// }
// const repo: Repository<User> = {} as any;
// const user = await repo.findById('1');
// await repo.save({ id: '1', name: 'Alice' });

// 問題 12 のテスト
// const uow: UnitOfWork = {} as any;
// uow.registerNew({ id: '1', name: 'Alice' });
// await uow.commit();

// 問題 13 のテスト
// const event: Event<{ userId: string }> = {
//   type: 'USER_CREATED',
//   timestamp: Date.now(),
//   data: { userId: '1' }
// };
// const eventStore: EventStore<{ userId: string }> = {} as any;
// await eventStore.append(event);

// 問題 14 のテスト
// const command: Command<{ name: string }> = {
//   type: 'CREATE_USER',
//   payload: { name: 'Alice' }
// };
// const query: Query<{ id: string }> = {
//   type: 'GET_USER',
//   params: { id: '1' }
// };
// const cmdHandler: CommandHandler<{ name: string }, void> = async (cmd) => {};
// const queryHandler: QueryHandler<{ id: string }, { name: string }> = async (q) => ({ name: 'Alice' });

// 問題 15 のテスト
// type UserRoute = Route<'/user/:id'>;
// const userRoute: UserRoute = {
//   path: '/user/:id',
//   params: { id: '123' }
// };
//
// type PostRoute = Route<'/post/:id/:slug'>;
// const postRoute: PostRoute = {
//   path: '/post/:id/:slug',
//   params: { id: '123', slug: 'hello-world' }
// };
