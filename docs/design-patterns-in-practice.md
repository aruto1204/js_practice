# デザインパターン 実践活用ガイド

`part3-typescript-advanced/chapter01-classes/exercises/05-advanced-patterns.ts` で学習したパターンが、実際の開発でどのように使われるかをまとめたドキュメントです。

---

## 目次

1. [Mixin パターン](#1-mixin-パターン)
2. [Decorator パターン（クラスベース）](#2-decorator-パターンクラスベース)
3. [Builder パターン](#3-builder-パターン)
4. [Chain of Responsibility パターン](#4-chain-of-responsibility-パターン)
5. [Strategy パターン](#5-strategy-パターン)
6. [State パターン](#6-state-パターン)
7. [Template Method パターン](#7-template-method-パターン)
8. [Prototype パターン](#8-prototype-パターン)
9. [Adapter パターン](#9-adapter-パターン)
10. [Composite パターン](#10-composite-パターン)
11. [Proxy パターン](#11-proxy-パターン)
12. [Memento パターン](#12-memento-パターン)
13. [Visitor パターン](#13-visitor-パターン)
14. [Fluent Interface パターン](#14-fluent-interface-パターン)
15. [Dependency Injection パターン](#15-dependency-injection-パターン)

---

## 1. Mixin パターン

### 概要

複数のクラスから機能を「混ぜ込む」ことで多重継承を実現するパターン。TypeScript では単一継承しか使えないため、Mixin でそれを補う。

### 実際の使用場面

**React コンポーネントへの共通機能追加**

```typescript
type Constructor<T = {}> = new (...args: any[]) => T;

// ローディング状態の管理
function WithLoading<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isLoading = false;

    setLoading(state: boolean) {
      this.isLoading = state;
    }
  };
}

// エラー管理
function WithError<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    error: string | null = null;

    setError(message: string | null) {
      this.error = message;
    }
  };
}

class UserComponent {
  constructor(public userId: string) {}
}

// 複数の機能を合成
class UserProfileComponent extends WithError(WithLoading(UserComponent)) {
  async fetchUser() {
    this.setLoading(true);
    try {
      // API 呼び出し
    } catch (e) {
      this.setError('ユーザーの取得に失敗しました');
    } finally {
      this.setLoading(false);
    }
  }
}
```

### 採用しているライブラリ・フレームワーク

- **TypeORM** — `@CreateDateColumn()` などのエンティティ共通フィールドを Mixin で提供
- **NestJS** — ミドルウェア機能の合成
- **Vue 2** — `mixins()` オプションで機能を共有（Vue 3 では Composables に移行）

---

## 2. Decorator パターン（クラスベース）

### 概要

既存オブジェクトを変更せずに、ラッパーで機能を動的に追加するパターン。継承と異なり、実行時に組み合わせを変更できる。

### 実際の使用場面

**Express ミドルウェアのレスポンス装飾**

```typescript
interface HttpResponse {
  send(body: string): string;
}

class JsonResponse implements HttpResponse {
  send(body: string): string {
    return body;
  }
}

// CORS ヘッダーを付与するデコレータ
class CorsDecorator implements HttpResponse {
  constructor(private response: HttpResponse) {}
  send(body: string): string {
    return `Access-Control-Allow-Origin: *\n${this.response.send(body)}`;
  }
}

// 圧縮するデコレータ
class GzipDecorator implements HttpResponse {
  constructor(private response: HttpResponse) {}
  send(body: string): string {
    return `Content-Encoding: gzip\n${this.response.send(body)}`;
  }
}

// 実行時に組み合わせを決定できる
const response = new GzipDecorator(new CorsDecorator(new JsonResponse()));
```

**ログ出力の追加（横断的関心事）**

```typescript
interface DataRepository<T> {
  findById(id: string): T | null;
}

class LoggingDecorator<T> implements DataRepository<T> {
  constructor(private repo: DataRepository<T>) {}

  findById(id: string): T | null {
    console.log(`[${new Date().toISOString()}] findById called: ${id}`);
    const result = this.repo.findById(id);
    console.log(`[${new Date().toISOString()}] findById result: ${result !== null ? 'found' : 'not found'}`);
    return result;
  }
}
```

### 採用しているライブラリ・フレームワーク

- **NestJS** — `@Controller()`, `@Injectable()` などが TypeScript デコレータ構文で実装
- **class-transformer** — `@Transform()` でシリアライズ処理を装飾
- **winston** — ログフォーマットをデコレータチェーンで構成

---

## 3. Builder パターン

### 概要

複雑なオブジェクトを段階的に構築するパターン。必須項目と任意項目が多いオブジェクトや、構築手順が複雑なものに有効。

### 実際の使用場面

**HTTP リクエストの構築**

```typescript
class HttpRequest {
  private constructor(
    public readonly url: string,
    public readonly method: string,
    public readonly headers: Record<string, string>,
    public readonly body: string | null,
    public readonly timeout: number
  ) {}

  static builder(url: string) {
    return new HttpRequestBuilder(url);
  }
}

class HttpRequestBuilder {
  private method = 'GET';
  private headers: Record<string, string> = {};
  private body: string | null = null;
  private timeout = 30000;

  constructor(private url: string) {}

  setMethod(method: string): this {
    this.method = method;
    return this;
  }

  setHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  setBody(body: object): this {
    this.body = JSON.stringify(body);
    this.headers['Content-Type'] = 'application/json';
    return this;
  }

  setTimeout(ms: number): this {
    this.timeout = ms;
    return this;
  }

  build(): HttpRequest {
    return new HttpRequest(this.url, this.method, this.headers, this.body, this.timeout);
  }
}

// 使用例
const request = HttpRequest.builder('https://api.example.com/users')
  .setMethod('POST')
  .setHeader('Authorization', 'Bearer token123')
  .setBody({ name: '太郎', email: 'taro@example.com' })
  .setTimeout(5000)
  .build();
```

### 採用しているライブラリ・フレームワーク

- **TypeORM / Prisma** — `createQueryBuilder()` でクエリを段階的に構築
- **Jest** — `expect().toHaveBeenCalledWith()` のチェーンメソッド
- **got / axios** — リクエストオプションを流れるように設定

---

## 4. Chain of Responsibility パターン

### 概要

リクエストを受け取ったハンドラが処理できなければ次のハンドラに渡す、連鎖構造のパターン。

### 実際の使用場面

**Express ミドルウェアチェーン**

```typescript
abstract class Middleware {
  protected next: Middleware | null = null;

  setNext(middleware: Middleware): Middleware {
    this.next = middleware;
    return middleware;
  }

  abstract handle(req: Request, res: Response): void;
}

class AuthMiddleware extends Middleware {
  handle(req: Request, res: Response): void {
    const token = req.headers['authorization'];
    if (!token) {
      res.status(401).send('Unauthorized');
      return;
    }
    this.next?.handle(req, res);
  }
}

class RateLimitMiddleware extends Middleware {
  private requestCount = new Map<string, number>();

  handle(req: Request, res: Response): void {
    const ip = req.ip;
    const count = (this.requestCount.get(ip) ?? 0) + 1;
    this.requestCount.set(ip, count);

    if (count > 100) {
      res.status(429).send('Too Many Requests');
      return;
    }
    this.next?.handle(req, res);
  }
}
```

**バリデーションパイプライン**

```typescript
abstract class Validator<T> {
  protected next: Validator<T> | null = null;

  setNext(validator: Validator<T>): Validator<T> {
    this.next = validator;
    return validator;
  }

  abstract validate(data: T): string | null;
}

class RequiredFieldValidator extends Validator<{ name: string; email: string }> {
  validate(data: { name: string; email: string }): string | null {
    if (!data.name || !data.email) return '名前とメールは必須です';
    return this.next?.validate(data) ?? null;
  }
}

class EmailFormatValidator extends Validator<{ name: string; email: string }> {
  validate(data: { name: string; email: string }): string | null {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'メール形式が不正です';
    return this.next?.validate(data) ?? null;
  }
}
```

### 採用しているライブラリ・フレームワーク

- **Express.js** — `app.use()` で登録するミドルウェアがチェーンを形成
- **Koa.js** — `compose()` で非同期ミドルウェアをチェーン化
- **NestJS** — Guards → Interceptors → Pipes の処理順

---

## 5. Strategy パターン

### 概要

アルゴリズムをカプセル化し、実行時に切り替え可能にするパターン。条件分岐でアルゴリズムを選ぶ代わりに、オブジェクトを差し替える。

### 実際の使用場面

**決済方法の切り替え**

```typescript
interface PaymentStrategy {
  pay(amount: number): Promise<boolean>;
}

class CreditCardPayment implements PaymentStrategy {
  constructor(private cardNumber: string) {}

  async pay(amount: number): Promise<boolean> {
    console.log(`クレジットカード(${this.cardNumber.slice(-4)})で ${amount}円 決済`);
    return true;
  }
}

class PayPayPayment implements PaymentStrategy {
  async pay(amount: number): Promise<boolean> {
    console.log(`PayPay で ${amount}円 決済`);
    return true;
  }
}

class PaymentProcessor {
  constructor(private strategy: PaymentStrategy) {}

  setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }

  async checkout(amount: number): Promise<boolean> {
    return this.strategy.pay(amount);
  }
}

// ユーザーの選択に応じて切り替え
const processor = new PaymentProcessor(new CreditCardPayment('1234-5678-9012-3456'));
await processor.checkout(3000);

processor.setStrategy(new PayPayPayment());
await processor.checkout(1500);
```

**データ圧縮アルゴリズムの切り替え**

```typescript
interface CompressionStrategy {
  compress(data: Buffer): Buffer;
  decompress(data: Buffer): Buffer;
}

class FileCompressor {
  constructor(private strategy: CompressionStrategy) {}

  compressFile(filePath: string): Buffer {
    const data = readFileSync(filePath);
    return this.strategy.compress(data);
  }
}
```

### 採用しているライブラリ・フレームワーク

- **Passport.js** — 認証方式(Local/OAuth/JWT)を Strategy で切り替え
- **Webpack** — ローダーやプラグインが Strategy として機能
- **Mongoose** — バリデーション戦略を差し替え可能

---

## 6. State パターン

### 概要

オブジェクトの内部状態が変わると振る舞いが変わるパターン。状態ごとに条件分岐するのではなく、状態オブジェクト自体に振る舞いを持たせる。

### 実際の使用場面

**注文の状態管理**

```typescript
interface OrderState {
  confirm(order: Order): void;
  ship(order: Order): void;
  cancel(order: Order): void;
}

class Order {
  constructor(private state: OrderState = new PendingState()) {}

  setState(state: OrderState): void {
    this.state = state;
  }

  confirm(): void { this.state.confirm(this); }
  ship(): void { this.state.ship(this); }
  cancel(): void { this.state.cancel(this); }
}

class PendingState implements OrderState {
  confirm(order: Order): void {
    console.log('注文確定');
    order.setState(new ConfirmedState());
  }
  ship(order: Order): void { console.log('確定前は発送できません'); }
  cancel(order: Order): void {
    console.log('注文キャンセル');
    order.setState(new CancelledState());
  }
}

class ConfirmedState implements OrderState {
  confirm(order: Order): void { console.log('すでに確定済みです'); }
  ship(order: Order): void {
    console.log('発送済み');
    order.setState(new ShippedState());
  }
  cancel(order: Order): void { console.log('確定後はキャンセルできません'); }
}
```

**信号機のシミュレーション**

```typescript
// 赤→青→黄→赤 のサイクルを State で表現
class TrafficLight {
  constructor(private state: TrafficLightState = new RedState()) {}

  setState(state: TrafficLightState): void { this.state = state; }
  change(): void { this.state.change(this); }
  getColor(): string { return this.state.getColor(); }
}
```

### 採用しているライブラリ・フレームワーク

- **XState** — TypeScript 対応の有限状態機械ライブラリ。State パターンを体系化
- **Redux** — action と reducer が State パターンに近い構造
- **React** — コンポーネントのライフサイクルが State で管理

---

## 7. Template Method パターン

### 概要

アルゴリズムの骨格を基底クラスで定義し、一部のステップをサブクラスに任せるパターン。処理の流れは変えず、詳細だけ変える。

### 実際の使用場面

**データのインポート処理**

```typescript
abstract class DataImporter {
  // テンプレートメソッド: 処理の流れを定義
  async import(filePath: string): Promise<void> {
    const rawData = await this.readFile(filePath);
    const parsed = this.parse(rawData);
    const validated = this.validate(parsed);
    await this.save(validated);
    this.notify();
  }

  protected abstract parse(raw: string): unknown[];
  protected abstract validate(data: unknown[]): unknown[];

  private async readFile(path: string): Promise<string> {
    const { readFile } = await import('fs/promises');
    return readFile(path, 'utf-8');
  }

  private async save(data: unknown[]): Promise<void> {
    console.log(`${data.length}件保存`);
  }

  private notify(): void {
    console.log('インポート完了通知を送信');
  }
}

class CsvImporter extends DataImporter {
  protected parse(raw: string): unknown[] {
    return raw.split('\n').map((line) => line.split(','));
  }

  protected validate(data: unknown[]): unknown[] {
    return data.filter((row) => Array.isArray(row) && row.length >= 3);
  }
}

class JsonImporter extends DataImporter {
  protected parse(raw: string): unknown[] {
    return JSON.parse(raw);
  }

  protected validate(data: unknown[]): unknown[] {
    return data.filter((item) => item !== null && typeof item === 'object');
  }
}
```

### 採用しているライブラリ・フレームワーク

- **Jest** — `beforeAll`, `beforeEach`, `afterEach` がテストのテンプレートを定義
- **NestJS** — `OnModuleInit`, `OnModuleDestroy` ライフサイクルフック
- **TypeORM** — マイグレーションクラスの `up()` / `down()` メソッド

---

## 8. Prototype パターン

### 概要

既存オブジェクトをコピーして新しいオブジェクトを生成するパターン。コンストラクタのコストが高い場合や、設定済みオブジェクトを複製したい場合に有効。

### 実際の使用場面

**設定オブジェクトのテンプレート複製**

```typescript
interface Cloneable<T> {
  clone(): T;
}

class ApiConfig implements Cloneable<ApiConfig> {
  constructor(
    public baseUrl: string,
    public timeout: number,
    public headers: Record<string, string>,
    public retryOptions: { maxRetries: number; delay: number }
  ) {}

  clone(): ApiConfig {
    return new ApiConfig(
      this.baseUrl,
      this.timeout,
      { ...this.headers },
      { ...this.retryOptions }
    );
  }
}

// 基本設定をテンプレートとして使い回す
const defaultConfig = new ApiConfig(
  'https://api.example.com',
  5000,
  { 'Content-Type': 'application/json' },
  { maxRetries: 3, delay: 1000 }
);

// 認証トークンだけ違う設定を簡単に作成
const authConfig = defaultConfig.clone();
authConfig.headers['Authorization'] = 'Bearer token123';
```

**ゲームのキャラクター生成**

```typescript
class EnemyCharacter implements Cloneable<EnemyCharacter> {
  constructor(
    public name: string,
    public hp: number,
    public skills: string[],
    public position: { x: number; y: number }
  ) {}

  clone(): EnemyCharacter {
    return new EnemyCharacter(
      this.name,
      this.hp,
      [...this.skills],
      { ...this.position }
    );
  }
}

// 敵のテンプレートを複製して配置
const goblinTemplate = new EnemyCharacter('ゴブリン', 30, ['攻撃', '逃走'], { x: 0, y: 0 });
const goblin1 = goblinTemplate.clone();
goblin1.position = { x: 100, y: 200 };
```

### 採用しているライブラリ・フレームワーク

- **Immer.js** — `produce()` で不変オブジェクトを安全に複製・変更
- **lodash** — `_.cloneDeep()` が Prototype パターンの実装
- **Redux** — ストアの状態をディープコピーして更新

---

## 9. Adapter パターン

### 概要

互換性のないインターフェースを持つクラス同士を接続するパターン。既存コードを変更せずに新しいコードと協調できるようにする。

### 実際の使用場面

**外部決済 API の統合**

```typescript
// 自社システムが期待するインターフェース
interface PaymentGateway {
  charge(amount: number, currency: string): Promise<{ success: boolean; transactionId: string }>;
}

// Stripe の SDK（変更できない外部コード）
class StripeClient {
  async createPaymentIntent(params: { amount: number; currency: string }) {
    return { id: 'pi_xxx', status: 'succeeded' };
  }
}

// PayPal の SDK（変更できない外部コード）
class PayPalClient {
  async executePayment(data: { value: string; currencyCode: string }) {
    return { paymentId: 'PAY_xxx', state: 'approved' };
  }
}

// Stripe アダプター
class StripeAdapter implements PaymentGateway {
  private client = new StripeClient();

  async charge(amount: number, currency: string) {
    const result = await this.client.createPaymentIntent({ amount, currency });
    return { success: result.status === 'succeeded', transactionId: result.id };
  }
}

// PayPal アダプター
class PayPalAdapter implements PaymentGateway {
  private client = new PayPalClient();

  async charge(amount: number, currency: string) {
    const result = await this.client.executePayment({
      value: String(amount),
      currencyCode: currency,
    });
    return { success: result.state === 'approved', transactionId: result.paymentId };
  }
}
```

**旧ストレージ API から新 API への移行**

```typescript
// 旧インターフェースで動いているコード
interface LegacyStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

// 新しい非同期ストレージ
class AsyncStorage {
  async get(key: string): Promise<string | null> { return null; }
  async set(key: string, value: string): Promise<void> {}
}

// アダプターで旧インターフェースを維持しながら内部は新実装に移行
class StorageAdapter implements LegacyStorage {
  private cache = new Map<string, string>();
  private asyncStorage = new AsyncStorage();

  getItem(key: string): string | null {
    return this.cache.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.cache.set(key, value);
    this.asyncStorage.set(key, value); // 非同期で永続化
  }
}
```

### 採用しているライブラリ・フレームワーク

- **Axios** — ブラウザの `XMLHttpRequest` と Node.js の `http` を共通 API に適合
- **TypeORM** — 各 DB ドライバーを共通インターフェースに適合
- **React-Redux** — `connect()` が Redux Store を React コンポーネントに適合

---

## 10. Composite パターン

### 概要

木構造のオブジェクトを統一したインターフェースで扱うパターン。単一オブジェクトとオブジェクトのコンテナを同じように操作できる。

### 実際の使用場面

**UI コンポーネントツリー**

```typescript
abstract class UIComponent {
  constructor(protected name: string) {}
  abstract render(): string;
  abstract getSize(): { width: number; height: number };
}

class Button extends UIComponent {
  constructor(name: string, private label: string) {
    super(name);
  }

  render(): string { return `<button>${this.label}</button>`; }
  getSize(): { width: number; height: number } { return { width: 80, height: 30 }; }
}

class Panel extends UIComponent {
  private children: UIComponent[] = [];

  add(child: UIComponent): void { this.children.push(child); }

  render(): string {
    const content = this.children.map((c) => c.render()).join('\n');
    return `<div class="${this.name}">\n${content}\n</div>`;
  }

  getSize(): { width: number; height: number } {
    const totalHeight = this.children.reduce((sum, c) => sum + c.getSize().height, 0);
    const maxWidth = Math.max(...this.children.map((c) => c.getSize().width));
    return { width: maxWidth, height: totalHeight };
  }
}

// 単一コンポーネントとコンテナを同じ方法で操作
const form = new Panel('login-form');
form.add(new Button('submit', 'ログイン'));
form.add(new Button('cancel', 'キャンセル'));
console.log(form.render());
```

**権限グループの管理**

```typescript
abstract class Permission {
  abstract hasAccess(resource: string): boolean;
}

class SinglePermission extends Permission {
  constructor(private resource: string) { super(); }
  hasAccess(resource: string): boolean { return this.resource === resource; }
}

class PermissionGroup extends Permission {
  private permissions: Permission[] = [];
  add(permission: Permission): void { this.permissions.push(permission); }
  hasAccess(resource: string): boolean {
    return this.permissions.some((p) => p.hasAccess(resource));
  }
}
```

### 採用しているライブラリ・フレームワーク

- **React / Vue** — コンポーネントツリーが Composite パターンそのもの
- **DOM API** — `Element` と `Document` が同じ `Node` インターフェースを持つ
- **Webpack** — 依存グラフのモジュール解決

---

## 11. Proxy パターン

### 概要

実際のオブジェクトへのアクセスを制御する代理オブジェクトを提供するパターン。遅延初期化、アクセス制御、キャッシュなどに使われる。

### 実際の使用場面

**API 呼び出しのキャッシュ**

```typescript
interface UserRepository {
  findById(id: string): Promise<User>;
}

class UserRepositoryImpl implements UserRepository {
  async findById(id: string): Promise<User> {
    // DB への高コストな処理
    console.log(`DB クエリ実行: ${id}`);
    return { id, name: '太郎' };
  }
}

class CachedUserRepository implements UserRepository {
  private cache = new Map<string, User>();
  private repo = new UserRepositoryImpl();

  async findById(id: string): Promise<User> {
    if (this.cache.has(id)) {
      console.log(`キャッシュヒット: ${id}`);
      return this.cache.get(id)!;
    }
    const user = await this.repo.findById(id);
    this.cache.set(id, user);
    return user;
  }
}
```

**JavaScript の `Proxy` オブジェクト（言語機能）**

```typescript
// Vue 3 のリアクティブシステムは Proxy を利用
function reactive<T extends object>(target: T): T {
  return new Proxy(target, {
    get(obj, key) {
      console.log(`${String(key)} が読み取られました`);
      return Reflect.get(obj, key);
    },
    set(obj, key, value) {
      console.log(`${String(key)} が ${value} に変更されました`);
      return Reflect.set(obj, key, value);
    },
  });
}

const state = reactive({ count: 0 });
state.count = 1; // 「count が 1 に変更されました」とログ出力
```

### 採用しているライブラリ・フレームワーク

- **Vue 3** — `reactive()` が `Proxy` で DOM の自動更新を実現
- **MobX** — `observable()` で状態変化を検知
- **Apollo Client** — クエリ結果のキャッシュ管理

---

## 12. Memento パターン

### 概要

オブジェクトの内部状態をスナップショットとして保存し、後で復元できるようにするパターン。カプセル化を破らずに状態を保存する。

### 実際の使用場面

**テキストエディタの Undo/Redo 機能**

```typescript
class TextEditorMemento {
  constructor(
    private readonly content: string,
    private readonly cursorPosition: number
  ) {}

  getContent(): string { return this.content; }
  getCursorPosition(): number { return this.cursorPosition; }
}

class TextEditor {
  private content = '';
  private cursorPosition = 0;

  type(text: string): void {
    this.content = this.content.slice(0, this.cursorPosition) + text + this.content.slice(this.cursorPosition);
    this.cursorPosition += text.length;
  }

  save(): TextEditorMemento {
    return new TextEditorMemento(this.content, this.cursorPosition);
  }

  restore(memento: TextEditorMemento): void {
    this.content = memento.getContent();
    this.cursorPosition = memento.getCursorPosition();
  }
}

class UndoManager {
  private history: TextEditorMemento[] = [];

  push(memento: TextEditorMemento): void { this.history.push(memento); }
  undo(): TextEditorMemento | undefined { return this.history.pop(); }
  canUndo(): boolean { return this.history.length > 0; }
}

// 使用例
const editor = new TextEditor();
const undoManager = new UndoManager();

editor.type('Hello');
undoManager.push(editor.save());  // スナップショット保存

editor.type(' World');
undoManager.push(editor.save());

// Undo
const snapshot = undoManager.undo();
if (snapshot) editor.restore(snapshot);
```

**フォームの下書き保存**

```typescript
class FormMemento {
  constructor(private readonly fields: Record<string, string>) {}
  getFields(): Record<string, string> { return { ...this.fields }; }
}

class Form {
  private fields: Record<string, string> = {};

  setField(key: string, value: string): void { this.fields[key] = value; }

  // LocalStorage に保存する用のスナップショット
  save(): FormMemento { return new FormMemento({ ...this.fields }); }
  restore(memento: FormMemento): void { this.fields = memento.getFields(); }
}
```

### 採用しているライブラリ・フレームワーク

- **Redux** — `redux-undo` ライブラリが Memento パターンで Undo を実装
- **Immer.js** — 変更前のスナップショットを内部で管理
- **Monaco Editor** — エディタの Undo/Redo スタック

---

## 13. Visitor パターン

### 概要

データ構造とアルゴリズムを分離するパターン。データ構造を変えずに新しい操作を追加できる。

### 実際の使用場面

**AST（抽象構文木）の処理**

```typescript
interface AstNode {
  accept(visitor: AstVisitor): void;
}

interface AstVisitor {
  visitNumber(node: NumberNode): void;
  visitBinaryOp(node: BinaryOpNode): void;
  visitVariable(node: VariableNode): void;
}

class NumberNode implements AstNode {
  constructor(public value: number) {}
  accept(visitor: AstVisitor): void { visitor.visitNumber(this); }
}

class BinaryOpNode implements AstNode {
  constructor(public op: '+' | '-' | '*', public left: AstNode, public right: AstNode) {}
  accept(visitor: AstVisitor): void { visitor.visitBinaryOp(this); }
}

class VariableNode implements AstNode {
  constructor(public name: string) {}
  accept(visitor: AstVisitor): void { visitor.visitVariable(this); }
}

// コード生成ビジター
class CodeGeneratorVisitor implements AstVisitor {
  private output = '';

  visitNumber(node: NumberNode): void { this.output += node.value; }
  visitBinaryOp(node: BinaryOpNode): void {
    node.left.accept(this);
    this.output += ` ${node.op} `;
    node.right.accept(this);
  }
  visitVariable(node: VariableNode): void { this.output += node.name; }

  getOutput(): string { return this.output; }
}

// 型チェックビジター（同じ AST に別の処理を追加）
class TypeCheckerVisitor implements AstVisitor {
  private errors: string[] = [];

  visitNumber(node: NumberNode): void {}
  visitBinaryOp(node: BinaryOpNode): void {
    node.left.accept(this);
    node.right.accept(this);
  }
  visitVariable(node: VariableNode): void {
    // 変数の型チェックロジック
  }

  getErrors(): string[] { return this.errors; }
}
```

**レポート出力の多形式対応**

```typescript
interface ReportElement {
  accept(visitor: ReportVisitor): void;
}

interface ReportVisitor {
  visitTable(element: TableElement): void;
  visitChart(element: ChartElement): void;
  visitText(element: TextElement): void;
}

// PDF 出力ビジター
class PdfExportVisitor implements ReportVisitor { ... }

// Excel 出力ビジター（AST を変えずに新形式を追加）
class ExcelExportVisitor implements ReportVisitor { ... }
```

### 採用しているライブラリ・フレームワーク

- **TypeScript コンパイラ** — AST ノードの走査に Visitor を使用
- **Babel** — プラグインが AST を Visitor で変換
- **ESLint** — ルールが AST の Visitor として実装

---

## 14. Fluent Interface パターン

### 概要

メソッドチェーンで読みやすい DSL（ドメイン固有言語）を作るパターン。各メソッドが `this` を返すことで連鎖させる。

### 実際の使用場面

**クエリビルダー**

```typescript
class QueryBuilder {
  private tableName = '';
  private selectedFields: string[] = ['*'];
  private conditions: string[] = [];
  private orderByField = '';
  private orderDirection: 'ASC' | 'DESC' = 'ASC';
  private limitValue: number | null = null;

  from(table: string): this {
    this.tableName = table;
    return this;
  }

  select(...fields: string[]): this {
    this.selectedFields = fields;
    return this;
  }

  where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }

  orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): this {
    this.orderByField = field;
    this.orderDirection = direction;
    return this;
  }

  limit(value: number): this {
    this.limitValue = value;
    return this;
  }

  build(): string {
    const fields = this.selectedFields.join(', ');
    let sql = `SELECT ${fields} FROM ${this.tableName}`;

    if (this.conditions.length > 0) {
      sql += ` WHERE ${this.conditions.join(' AND ')}`;
    }
    if (this.orderByField) {
      sql += ` ORDER BY ${this.orderByField} ${this.orderDirection}`;
    }
    if (this.limitValue !== null) {
      sql += ` LIMIT ${this.limitValue}`;
    }

    return sql;
  }
}

// 使用例（SQL に近い読みやすさ）
const query = new QueryBuilder()
  .from('users')
  .select('id', 'name', 'email')
  .where('age > 20')
  .where('active = true')
  .orderBy('name', 'ASC')
  .limit(10)
  .build();

console.log(query);
// SELECT id, name, email FROM users WHERE age > 20 AND active = true ORDER BY name ASC LIMIT 10
```

### 採用しているライブラリ・フレームワーク

- **Knex.js** — SQL クエリビルダーが Fluent Interface を採用
- **Prisma** — `prisma.user.findMany({ where: {...} })` のチェーンAPI
- **RxJS** — `Observable` のオペレーターチェーン (`pipe`, `map`, `filter`)
- **Jest** — `expect(value).toBe().not.toThrow()` のアサーションチェーン

---

## 15. Dependency Injection パターン

### 概要

クラスが依存するオブジェクトを自分で生成せず、外部から受け取るパターン。テスタビリティと疎結合を実現する。

### 実際の使用場面

**サービス層の実装**

```typescript
interface IDatabase {
  query<T>(sql: string, params?: unknown[]): Promise<T[]>;
}

interface ILogger {
  log(level: 'info' | 'error', message: string): void;
}

interface IEmailService {
  send(to: string, subject: string, body: string): Promise<void>;
}

class UserService {
  constructor(
    private readonly db: IDatabase,
    private readonly logger: ILogger,
    private readonly emailService: IEmailService
  ) {}

  async createUser(name: string, email: string): Promise<User> {
    this.logger.log('info', `ユーザー作成開始: ${email}`);
    const [user] = await this.db.query<User>(
      'INSERT INTO users (name, email) VALUES (?, ?) RETURNING *',
      [name, email]
    );
    await this.emailService.send(email, 'ようこそ', `${name}さん、登録ありがとうございます`);
    this.logger.log('info', `ユーザー作成完了: ${user.id}`);
    return user;
  }
}

// テスト時はモックを注入
const mockDb: IDatabase = {
  query: async () => [{ id: '1', name: '太郎', email: 'test@example.com' }],
};
const mockLogger: ILogger = { log: () => {} };
const mockEmailService: IEmailService = { send: async () => {} };

const service = new UserService(mockDb, mockLogger, mockEmailService);
```

**DI コンテナ**

```typescript
class DIContainer {
  private services = new Map<string, unknown>();

  register<T>(name: string, instance: T): void {
    this.services.set(name, instance);
  }

  get<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) throw new Error(`サービス "${name}" が登録されていません`);
    return service as T;
  }
}

// 使用例
const container = new DIContainer();
container.register<IDatabase>('database', new PostgresDatabase());
container.register<ILogger>('logger', new ConsoleLogger());
container.register<IEmailService>('email', new SendGridEmailService());

const userService = new UserService(
  container.get<IDatabase>('database'),
  container.get<ILogger>('logger'),
  container.get<IEmailService>('email')
);
```

### 採用しているライブラリ・フレームワーク

- **NestJS** — `@Injectable()` と `@Inject()` で DI を自動管理
- **InversifyJS** — TypeScript 向け DI コンテナライブラリ
- **tsyringe** — Microsoft 製の軽量 DI コンテナ
- **Angular** — フレームワーク全体が DI を核として設計

---

## パターン選択の指針

| 問題 | 適用するパターン |
|------|----------------|
| 複数のクラスから機能を組み合わせたい | Mixin |
| 既存クラスを変えずに機能を追加したい | Decorator |
| 複雑なオブジェクトを段階的に作りたい | Builder |
| リクエストを複数のハンドラで順番に処理したい | Chain of Responsibility |
| アルゴリズムを実行時に切り替えたい | Strategy |
| オブジェクトの状態によって振る舞いを変えたい | State |
| 処理の流れは固定し、一部だけ変えたい | Template Method |
| オブジェクトを低コストで複製したい | Prototype |
| 互換性のないインターフェースを繋ぎたい | Adapter |
| 木構造を統一した方法で操作したい | Composite |
| オブジェクトへのアクセスを制御・キャッシュしたい | Proxy |
| 状態を保存して Undo を実装したい | Memento |
| データ構造を変えずに新しい操作を追加したい | Visitor |
| メソッドチェーンで読みやすい API を作りたい | Fluent Interface |
| テスタブルな疎結合な設計にしたい | Dependency Injection |
