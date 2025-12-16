/**
 * Part 3 - Chapter 1: クラスの型定義
 * 演習 5: 高度なパターン - 解答
 */

/* 問題 1: Mixin パターン
 * Mixinパターン: 複数のクラスの機能を1つのクラスに組み合わせるパターン
 * 多重継承のような機能をTypeScriptで実現できる
 */

// コンストラクタの型定義
type Constructor<T = {}> = new (...args: any[]) => T;

// TimestampMixin: タイムスタンプ機能を追加するMixin
function TimestampMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    createdAt: Date;

    constructor(...args: any[]) {
      super(...args);
      this.createdAt = new Date();
    }

    // 作成からの経過秒数を取得
    getAge(): number {
      return Math.floor((Date.now() - this.createdAt.getTime()) / 1000);
    }
  };
}

// LoggableMixin: ログ機能を追加するMixin
function LoggableMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    log(message: string): void {
      console.log(`[LOG] ${message}`);
    }
  };
}

// 基底クラス
class DocumentBase {
  constructor(public content: string) {}
}

// 両方のMixinを適用したDocumentクラス
class Document extends LoggableMixin(TimestampMixin(DocumentBase)) {}


/* 問題 2: デコレータパターン（クラスベース）
 * Decoratorパターン: オブジェクトに動的に新しい機能を追加するパターン
 * 継承の代わりに、ラッパーを使って機能を拡張する
 */

// Componentインターフェース: 装飾対象の共通インターフェース
interface Component {
  operation(): string;
}

// ConcreteComponent: 基本となる具体的なコンポーネント
class ConcreteComponent implements Component {
  operation(): string {
    return '基本機能';
  }
}

// Decorator: 抽象デコレータクラス
abstract class Decorator implements Component {
  constructor(protected component: Component) {}

  operation(): string {
    return this.component.operation();
  }
}

// BoldDecorator: 太字装飾を追加するデコレータ
class BoldDecorator extends Decorator {
  operation(): string {
    return `<b>${this.component.operation()}</b>`;
  }
}

// ItalicDecorator: イタリック装飾を追加するデコレータ
class ItalicDecorator extends Decorator {
  operation(): string {
    return `<i>${this.component.operation()}</i>`;
  }
}


/* 問題 3: ビルダーパターン
 * Builderパターン: 複雑なオブジェクトの生成プロセスを段階的に構築するパターン
 * オブジェクト生成のコードを読みやすく、柔軟にする
 */

// User: ビルダーで構築される対象のクラス
class User {
  // プライベートコンストラクタで直接生成を防ぐ
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly age: number,
    public readonly address: string
  ) {}

  // ビルダーを返す静的ファクトリメソッド
  static get builder(): UserBuilder {
    return new UserBuilder();
  }
}

// UserBuilder: Userオブジェクトを段階的に構築するビルダー
class UserBuilder {
  private name: string = '';
  private email: string = '';
  private age: number = 0;
  private address: string = '';

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setEmail(email: string): this {
    this.email = email;
    return this;
  }

  setAge(age: number): this {
    this.age = age;
    return this;
  }

  setAddress(address: string): this {
    this.address = address;
    return this;
  }

  // 最終的なUserオブジェクトを構築
  build(): User {
    return new User(this.name, this.email, this.age, this.address);
  }
}


/* 問題 4: Chain of Responsibility パターン
 * Chain of Responsibilityパターン: 複数のハンドラを連鎖させて処理を委譲するパターン
 * リクエストを処理できるハンドラが見つかるまで順番に試す
 */

// Handler: 抽象ハンドラクラス
abstract class Handler {
  protected next: Handler | null = null;

  // 次のハンドラを設定
  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler; // チェーンを構築しやすいように次のハンドラを返す
  }

  // リクエストを処理（サブクラスで実装）
  abstract handle(request: string): string | null;
}

// AuthHandler: 認証を処理するハンドラ
class AuthHandler extends Handler {
  handle(request: string): string | null {
    if (request.includes('認証')) {
      return '認証OK';
    }
    return this.next?.handle(request) ?? null;
  }
}

// ValidationHandler: バリデーションを処理するハンドラ
class ValidationHandler extends Handler {
  handle(request: string): string | null {
    if (request.includes('検証')) {
      return 'バリデーションOK';
    }
    return this.next?.handle(request) ?? null;
  }
}

// LogHandler: ログを処理するハンドラ
class LogHandler extends Handler {
  handle(request: string): string | null {
    console.log(`ログ記録: ${request}`);
    return 'ログ記録完了';
  }
}


/* 問題 5: Strategy パターン
 * Strategyパターン: アルゴリズムをカプセル化し、実行時に切り替え可能にするパターン
 * 条件分岐の代わりに、異なる戦略クラスを使用する
 */

// SortStrategy: ソートアルゴリズムの共通インターフェース
interface SortStrategy {
  sort(data: number[]): number[];
}

// BubbleSort: バブルソートアルゴリズム
class BubbleSort implements SortStrategy {
  sort(data: number[]): number[] {
    const arr = [...data]; // 元の配列を変更しない
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}

// QuickSort: クイックソートアルゴリズム
class QuickSort implements SortStrategy {
  sort(data: number[]): number[] {
    if (data.length <= 1) return data;

    const pivot = data[0];
    const left = data.slice(1).filter(x => x <= pivot);
    const right = data.slice(1).filter(x => x > pivot);

    return [...this.sort(left), pivot, ...this.sort(right)];
  }
}

// Sorter: ソート戦略を使用するコンテキスト
class Sorter {
  constructor(private strategy: SortStrategy) {}

  setStrategy(strategy: SortStrategy): void {
    this.strategy = strategy;
  }

  sort(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}


/* 問題 6: State パターン
 * Stateパターン: オブジェクトの状態に応じて振る舞いを変更するパターン
 * 状態ごとの処理を別クラスに分離することで、コードを整理する
 */

// Context: 状態を保持し、リクエストを委譲するクラス
class Context {
  constructor(private state: State) {}

  setState(state: State): void {
    this.state = state;
  }

  request(): void {
    this.state.handle(this);
  }
}

// State: 状態の共通インターフェース
interface State {
  handle(context: Context): void;
}

// ConcreteStateA: 状態A
class ConcreteStateA implements State {
  handle(context: Context): void {
    console.log('状態A: 状態Bに遷移します');
    context.setState(new ConcreteStateB());
  }
}

// ConcreteStateB: 状態B
class ConcreteStateB implements State {
  handle(context: Context): void {
    console.log('状態B: 状態Aに遷移します');
    context.setState(new ConcreteStateA());
  }
}


/* 問題 7: Template Method パターン
 * Template Methodパターン: アルゴリズムの骨組みを定義し、一部をサブクラスで実装するパターン
 * 共通の処理フローを親クラスで定義し、詳細を子クラスに委譲する
 */

// Game: ゲームの抽象クラス
abstract class Game {
  // テンプレートメソッド: ゲームの流れを定義
  play(): void {
    this.initialize();
    this.startPlay();
    this.endPlay();
  }

  // 以下の抽象メソッドはサブクラスで実装
  abstract initialize(): void;
  abstract startPlay(): void;
  abstract endPlay(): void;
}

// Chess: チェスゲーム
class Chess extends Game {
  initialize(): void {
    console.log('チェス: ゲームを初期化します');
  }

  startPlay(): void {
    console.log('チェス: ゲームを開始します');
  }

  endPlay(): void {
    console.log('チェス: ゲームを終了します');
  }
}

// Football: サッカーゲーム
class Football extends Game {
  initialize(): void {
    console.log('サッカー: ゲームを初期化します');
  }

  startPlay(): void {
    console.log('サッカー: ゲームを開始します');
  }

  endPlay(): void {
    console.log('サッカー: ゲームを終了します');
  }
}


/* 問題 8: Prototype パターン
 * Prototypeパターン: 既存のオブジェクトを複製して新しいオブジェクトを生成するパターン
 * オブジェクトの生成コストが高い場合や、既存の設定を引き継ぎたい場合に有効
 */

// Cloneable: 複製可能なオブジェクトのインターフェース
interface Cloneable<T> {
  clone(): T;
}

// Person: 複製可能な人物クラス
class Person implements Cloneable<Person> {
  constructor(
    public name: string,
    public age: number,
    public address: { city: string; zip: string }
  ) {}

  // ディープコピーを実装
  clone(): Person {
    return new Person(
      this.name,
      this.age,
      { ...this.address } // アドレスオブジェクトもコピー
    );
  }
}


/* 問題 9: Adapter パターン
 * Adapterパターン: 互換性のないインターフェースを変換して使えるようにするパターン
 * 既存のクラスを変更せずに、新しいインターフェースに適合させる
 */

// MediaPlayer: メディアプレイヤーの共通インターフェース
interface MediaPlayer {
  play(audioType: string, fileName: string): void;
}

// AdvancedMediaPlayer: 高度なメディアプレイヤー（既存のクラス）
class AdvancedMediaPlayer {
  playVlc(fileName: string): void {
    console.log(`VLCで再生: ${fileName}`);
  }

  playMp4(fileName: string): void {
    console.log(`MP4で再生: ${fileName}`);
  }
}

// MediaAdapter: アダプタークラス
class MediaAdapter implements MediaPlayer {
  private advancedPlayer: AdvancedMediaPlayer;

  constructor() {
    this.advancedPlayer = new AdvancedMediaPlayer();
  }

  play(audioType: string, fileName: string): void {
    if (audioType === 'vlc') {
      this.advancedPlayer.playVlc(fileName);
    } else if (audioType === 'mp4') {
      this.advancedPlayer.playMp4(fileName);
    } else {
      console.log(`サポートされていない形式: ${audioType}`);
    }
  }
}


/* 問題 10: Composite パターン
 * Compositeパターン: 部分と全体を同じように扱えるようにするパターン
 * ツリー構造を表現する際に、リーフとノードを統一的に扱える
 */

// FileSystemItem: ファイルシステムアイテムの抽象クラス
abstract class FileSystemItem {
  constructor(protected name: string) {}

  getName(): string {
    return this.name;
  }

  abstract getSize(): number;
}

// File: ファイル（リーフノード）
class File extends FileSystemItem {
  constructor(name: string, private size: number) {
    super(name);
  }

  getSize(): number {
    return this.size;
  }
}

// Directory: ディレクトリ（コンポジットノード）
class Directory extends FileSystemItem {
  private children: FileSystemItem[] = [];

  add(item: FileSystemItem): void {
    this.children.push(item);
  }

  // 子要素のサイズの合計を返す
  getSize(): number {
    return this.children.reduce((total, child) => total + child.getSize(), 0);
  }
}


/* 問題 11: Proxy パターン
 * Proxyパターン: オブジェクトへのアクセスを制御するパターン
 * 遅延初期化、アクセス制御、ログ記録などに使用される
 */

// Image: 画像の共通インターフェース
interface Image {
  display(): void;
}

// RealImage: 実際の画像クラス
class RealImage implements Image {
  constructor(private fileName: string) {
    this.loadFromDisk();
  }

  private loadFromDisk(): void {
    console.log(`ディスクから読み込み: ${this.fileName}`);
  }

  display(): void {
    console.log(`表示: ${this.fileName}`);
  }
}

// ProxyImage: プロキシ画像クラス（遅延初期化）
class ProxyImage implements Image {
  private realImage: RealImage | null = null;

  constructor(private fileName: string) {}

  display(): void {
    // 初回アクセス時にのみRealImageを生成
    if (this.realImage === null) {
      this.realImage = new RealImage(this.fileName);
    }
    this.realImage.display();
  }
}


/* 問題 12: Memento パターン
 * Mementoパターン: オブジェクトの状態を保存し、後で復元できるようにするパターン
 * Undo/Redo機能の実装などに使用される
 */

// EditorMemento: エディタの状態を保存するメメント
class EditorMemento {
  constructor(private readonly _content: string) {}

  get content(): string {
    return this._content;
  }
}

// Editor: エディタクラス
class Editor {
  private _content: string = '';

  write(text: string): void {
    this._content += text;
  }

  // 現在の状態を保存
  save(): EditorMemento {
    return new EditorMemento(this._content);
  }

  // メメントから状態を復元
  restore(memento: EditorMemento): void {
    this._content = memento.content;
  }

  get content(): string {
    return this._content;
  }
}

// History: メメントの履歴を管理
class History {
  private mementos: EditorMemento[] = [];

  push(memento: EditorMemento): void {
    this.mementos.push(memento);
  }

  pop(): EditorMemento | undefined {
    return this.mementos.pop();
  }
}


/* 問題 13: Visitor パターン
 * Visitorパターン: データ構造と操作を分離するパターン
 * 新しい操作を追加する際に、既存のクラスを変更せずに済む
 */

// Shape: 図形の共通インターフェース
interface Shape {
  accept(visitor: Visitor): void;
}

// Visitor: 訪問者の共通インターフェース
interface Visitor {
  visitCircle(circle: Circle): void;
  visitRectangle(rectangle: Rectangle): void;
}

// Circle: 円
class Circle implements Shape {
  constructor(public radius: number) {}

  accept(visitor: Visitor): void {
    visitor.visitCircle(this);
  }
}

// Rectangle: 長方形
class Rectangle implements Shape {
  constructor(public width: number, public height: number) {}

  accept(visitor: Visitor): void {
    visitor.visitRectangle(this);
  }
}

// AreaCalculator: 面積計算を行うビジター
class AreaCalculator implements Visitor {
  public totalArea: number = 0;

  visitCircle(circle: Circle): void {
    const area = Math.PI * circle.radius * circle.radius;
    this.totalArea += area;
  }

  visitRectangle(rectangle: Rectangle): void {
    const area = rectangle.width * rectangle.height;
    this.totalArea += area;
  }
}


/* 問題 14: Fluent Interface パターン
 * Fluent Interfaceパターン: メソッドチェーンで読みやすいAPIを提供するパターン
 * メソッドがthisを返すことで、連続して呼び出せる
 */

// QueryBuilder: SQLクエリを構築するビルダー
class QueryBuilder {
  private table: string = '';
  private fields: string[] = [];
  private conditions: string[] = [];
  private _orderBy: string = '';
  private limitValue: number | null = null;

  from(table: string): this {
    this.table = table;
    return this;
  }

  select(...fields: string[]): this {
    this.fields = fields;
    return this;
  }

  where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }

  orderBy(field: string, direction: 'ASC' | 'DESC'): this {
    this._orderBy = `${field} ${direction}`;
    return this;
  }

  limit(value: number): this {
    this.limitValue = value;
    return this;
  }

  // SQL文字列を生成
  build(): string {
    let query = `SELECT ${this.fields.join(', ')} FROM ${this.table}`;

    if (this.conditions.length > 0) {
      query += ` WHERE ${this.conditions.join(' AND ')}`;
    }

    if (this._orderBy) {
      query += ` ORDER BY ${this._orderBy}`;
    }

    if (this.limitValue !== null) {
      query += ` LIMIT ${this.limitValue}`;
    }

    return query;
  }
}


/* 問題 15: Dependency Injection パターン
 * Dependency Injectionパターン: 依存関係を外部から注入するパターン
 * クラス間の結合度を下げ、テストしやすいコードを実現する
 */

// IDatabase: データベースの共通インターフェース
interface IDatabase {
  query(sql: string): any[];
}

// ILogger: ロガーの共通インターフェース
interface ILogger {
  log(message: string): void;
}

// UserService: ユーザーサービス（依存性を注入）
class UserService {
  constructor(
    private database: IDatabase,
    private logger: ILogger
  ) {}

  getUser(id: string): any {
    this.logger.log(`ユーザーを取得: ${id}`);
    return this.database.query(`SELECT * FROM users WHERE id = ${id}`);
  }

  createUser(name: string): void {
    this.logger.log(`ユーザーを作成: ${name}`);
    this.database.query(`INSERT INTO users (name) VALUES (${name})`);
  }
}

// DIContainer: 依存性注入コンテナ
class DIContainer {
  private services: Map<string, any> = new Map();

  register(name: string, instance: any): void {
    this.services.set(name, instance);
  }

  get<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`サービスが見つかりません: ${name}`);
    }
    return service;
  }
}


// テストコード
console.log('--- 問題 1: Mixin ---');
const doc = new Document('重要な文書');
doc.log('作成しました');
setTimeout(() => {
  console.log(`経過時間: ${doc.getAge()}秒`);
}, 1000);

console.log('\n--- 問題 2: Decorator ---');
const component = new ConcreteComponent();
const bold = new BoldDecorator(component);
const italic = new ItalicDecorator(bold);
console.log(italic.operation());

console.log('\n--- 問題 3: Builder ---');
const user = new UserBuilder()
  .setName('太郎')
  .setEmail('taro@example.com')
  .setAge(25)
  .setAddress('東京都')
  .build();
console.log(user);

console.log('\n--- 問題 4: Chain of Responsibility ---');
const auth = new AuthHandler();
const validation = new ValidationHandler();
const log = new LogHandler();
auth.setNext(validation).setNext(log);
console.log(auth.handle('リクエスト'));

console.log('\n--- 問題 5: Strategy ---');
const sorter = new Sorter(new BubbleSort());
console.log(sorter.sort([3, 1, 4, 1, 5, 9]));
sorter.setStrategy(new QuickSort());
console.log(sorter.sort([3, 1, 4, 1, 5, 9]));

console.log('\n--- 問題 6: State ---');
const context = new Context(new ConcreteStateA());
context.request(); // StateA -> StateB
context.request(); // StateB -> StateA

console.log('\n--- 問題 7: Template Method ---');
const chess = new Chess();
chess.play();
const football = new Football();
football.play();

console.log('\n--- 問題 8: Prototype ---');
const person1 = new Person('太郎', 25, { city: '東京', zip: '100-0001' });
const person2 = person1.clone();
console.log(person1 === person2); // false
console.log(person1.address === person2.address); // false (deep copy)

console.log('\n--- 問題 9: Adapter ---');
const adapter = new MediaAdapter();
adapter.play('vlc', 'movie.vlc');
adapter.play('mp4', 'video.mp4');

console.log('\n--- 問題 10: Composite ---');
const file1 = new File('file1.txt', 100);
const file2 = new File('file2.txt', 200);
const dir = new Directory('documents');
dir.add(file1);
dir.add(file2);
console.log(dir.getSize()); // 300

console.log('\n--- 問題 11: Proxy ---');
const proxy = new ProxyImage('large_image.jpg');
proxy.display(); // 初回: ロード + 表示
proxy.display(); // 2回目: 表示のみ

console.log('\n--- 問題 12: Memento ---');
const editor = new Editor();
const history = new History();
editor.write('Hello');
history.push(editor.save());
editor.write(' World');
console.log(editor.content); // "Hello World"
const memento = history.pop();
if (memento) editor.restore(memento);
console.log(editor.content); // "Hello"

console.log('\n--- 問題 13: Visitor ---');
const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);
const calculator = new AreaCalculator();
circle.accept(calculator);
rectangle.accept(calculator);
console.log(calculator.totalArea);

console.log('\n--- 問題 14: Fluent Interface ---');
const query = new QueryBuilder()
  .from('users')
  .select('id', 'name', 'email')
  .where('age > 20')
  .where('active = true')
  .orderBy('name', 'ASC')
  .limit(10)
  .build();
console.log(query);

console.log('\n--- 問題 15: Dependency Injection ---');
const db: IDatabase = { query: (sql) => [] };
const logger: ILogger = { log: (msg) => console.log(msg) };
const container = new DIContainer();
container.register('database', db);
container.register('logger', logger);
const userService = new UserService(
  container.get<IDatabase>('database'),
  container.get<ILogger>('logger')
);
userService.createUser('太郎');
