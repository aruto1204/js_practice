/**
 * Part 3 - Chapter 1: クラスの型定義
 * 演習 3: 抽象クラス
 */

/* 問題 1: 基本的な抽象クラス
 * 抽象クラス Shape を作成してください。
 * - プロパティ: color (protected string)
 * - 抽象メソッド: getArea(): number
 * - 抽象メソッド: getPerimeter(): number
 * - 通常メソッド: describe(): string - "This is a {color} shape"
 *
 * Circle クラス (Shape を継承):
 * - プロパティ: radius (private number)
 * - getArea() と getPerimeter() を実装
 */

// ここに実装
abstract class Shape {
  protected color: string;

  constructor(color: string) {
    this.color = color;
  }

  // 抽象メソッド: 派生クラスで実装が必須
  abstract getArea(): number;
  abstract getPerimeter(): number;

  // 通常メソッド: 派生クラスで共通の処理
  describe(): string {
    return `This is a ${this.color} shape`;
  }
}

class Circle extends Shape {
  private radius: number;

  constructor(color: string, radius: number) {
    super(color);
    this.radius = radius;
  }

  // 抽象メソッドの実装: 円の面積 = π * r²
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }

  // 抽象メソッドの実装: 円の周長 = 2 * π * r
  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

/* 問題 2: 抽象クラスとコンストラクタ
 * 抽象クラス Employee を作成してください。
 * - プロパティ: name (protected string)
 * - プロパティ: id (protected string)
 * - コンストラクタ(name: string, id: string)
 * - 抽象メソッド: calculateSalary(): number
 * - 通常メソッド: getInfo(): string
 *
 * FullTimeEmployee (Employee を継承):
 * - プロパティ: private monthlySalary (number)
 * - calculateSalary() を実装 - 月給そのまま返す
 *
 * PartTimeEmployee (Employee を継承):
 * - プロパティ: private hourlyRate (number)
 * - プロパティ: private hoursWorked (number)
 * - calculateSalary() を実装 - 時給 × 時間
 */

// ここに実装

abstract class Employee {
  protected name: string;
  protected id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }

  abstract calculateSalary(): number;

  getInfo(): string {
    return `Employee: ${this.name} (ID: ${this.id})`;
  }
}

class FullTimeEmployee extends Employee {
  private monthlySalary: number;

  constructor(name: string, id: string, monthlySalary: number) {
    super(name, id);
    this.monthlySalary = monthlySalary;
  }

  // 正社員は月給をそのまま返す
  calculateSalary(): number {
    return this.monthlySalary;
  }
}

class PartTimeEmployee extends Employee {
  private hourlyRate: number;
  private hoursWorked: number;

  constructor(name: string, id: string, hourlyRate: number, hoursWorked: number) {
    super(name, id);
    this.hourlyRate = hourlyRate;
    this.hoursWorked = hoursWorked;
  }

  // パートタイムは時給 × 労働時間
  calculateSalary(): number {
    return this.hourlyRate * this.hoursWorked;
  }
}

/* 問題 3: 複数の抽象メソッド
 * 抽象クラス Vehicle を作成してください。
 * - 抽象メソッド: start(): string
 * - 抽象メソッド: stop(): string
 * - 抽象メソッド: getFuelType(): string
 * - 通常メソッド: operationCycle(): void - start → stop の順で実行し出力
 *
 * Car (Vehicle を継承):
 * - すべての抽象メソッドを実装（ガソリン車）
 *
 * ElectricBike (Vehicle を継承):
 * - すべての抽象メソッドを実装（電気バイク）
 */

// ここに実装
abstract class Vehicle {
  abstract start(): string;
  abstract stop(): string;
  abstract getFuelType(): string;

  operationCycle(): void {
    console.log(this.start());
    console.log(`Fuel type: ${this.getFuelType()}`);
    console.log(this.stop());
  }
}

class Car extends Vehicle {
  start(): string {
    return 'Car engine started';
  }

  stop(): string {
    return 'Car engine stopped';
  }

  getFuelType(): string {
    return 'Gasoline';
  }
}

class ElectricBike extends Vehicle {
  start(): string {
    return 'Electric bike powered on';
  }

  stop(): string {
    return 'Electric bike powered off';
  }

  getFuelType(): string {
    return 'Electric';
  }
}



/* 問題 4: テンプレートメソッドパターン
 * 抽象クラス DataProcessor を作成してください。
 * - 通常メソッド: process(data: string): string - 以下を順に実行
 *   1. validate(data)
 *   2. transform(data)
 *   3. save(data)
 * - 抽象メソッド: protected validate(data: string): boolean
 * - 抽象メソッド: protected transform(data: string): string
 * - 抽象メソッド: protected save(data: string): void
 *
 * JsonProcessor (DataProcessor を継承):
 * - validate: JSON として妥当かチェック
 * - transform: JSON を整形（インデント追加）
 * - save: "Saving JSON: {data}" を出力
 */

// ここに実装
abstract class DataProcessor {
  // テンプレートメソッド: 処理の流れを定義
  process(data: string): string {
    if (!this.validate(data)) {
      throw new Error('Invalid data');
    }
    const transformed = this.transform(data);
    this.save(transformed);
    return transformed;
  }

  // 抽象メソッド: 派生クラスで詳細を実装
  protected abstract validate(data: string): boolean;
  protected abstract transform(data: string): string;
  protected abstract save(data: string): void;
}

class JsonProcessor extends DataProcessor {
  // JSON 文字列として妥当かチェック
  protected validate(data: string): boolean {
    try {
      JSON.parse(data);
      return true;
    } catch {
      return false;
    }
  }

  // JSON を整形（インデント2スペース）
  protected transform(data: string): string {
    const parsed = JSON.parse(data);
    return JSON.stringify(parsed, null, 2);
  }

  // データを保存（今回は出力のみ）
  protected save(data: string): void {
    console.log(`Saving JSON: ${data}`);
  }
}


/* 問題 5: 抽象クラスと静的メンバー
 * 抽象クラス Logger を作成してください。
 * - 静的プロパティ: protected static logCount (number) = 0
 * - 抽象メソッド: protected writeLog(message: string): void
 * - 通常メソッド: log(message: string): void
 *   - logCount をインクリメント
 *   - writeLog() を呼び出す
 * - 静的メソッド: getLogCount(): number
 *
 * ConsoleLogger (Logger を継承):
 * - writeLog() を実装 - console.log() を使用
 *
 * FileLogger (Logger を継承):
 * - writeLog() を実装 - "Writing to file: {message}" を出力
 */

// ここに実装
abstract class Logger {
  protected static logCount: number = 0;

  protected abstract writeLog(message: string): void;

  // 静的カウンターを使ってログ回数を記録
  log(message: string): void {
    Logger.logCount++;
    this.writeLog(message);
  }

  static getLogCount(): number {
    return Logger.logCount;
  }
}

class ConsoleLogger extends Logger {
  protected writeLog(message: string): void {
    console.log(message);
  }
}

class FileLogger extends Logger {
  protected writeLog(message: string): void {
    console.log(`Writing to file: ${message}`);
  }
}

/* 問題 6: 階層的な抽象クラス
 * 抽象クラス Animal を作成してください。
 * - プロパティ: protected name (string)
 * - 抽象メソッド: makeSound(): string
 * - 通常メソッド: introduce(): void
 *
 * 抽象クラス Mammal (Animal を継承):
 * - プロパティ: protected hasFur (boolean)
 * - 抽象メソッド: getFurColor(): string
 * - 通常メソッド: describeFur(): string
 *
 * Dog (Mammal を継承):
 * - すべての抽象メソッドを実装
 */

// ここに実装
abstract class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract makeSound(): string;

  introduce(): void {
    console.log(`This is ${this.name}`);
  }
}

abstract class Mammal extends Animal {
  protected hasFur: boolean;

  constructor(name: string, hasFur: boolean) {
    super(name);
    this.hasFur = hasFur;
  }

  abstract getFurColor(): string;

  describeFur(): string {
    if (this.hasFur) {
      return `This mammal has ${this.getFurColor()} fur`;
    }
    return 'This mammal has no fur';
  }
}

class Dog extends Mammal {
  private furColor: string;

  constructor(name: string, hasFur: boolean, furColor: string) {
    super(name, hasFur);
    this.furColor = furColor;
  }

  // Animal の抽象メソッドを実装
  makeSound(): string {
    return 'Woof! Woof!';
  }

  // Mammal の抽象メソッドを実装
  getFurColor(): string {
    return this.furColor;
  }
}


/* 問題 7: 抽象クラスとジェネリクス
 * 抽象クラス Repository<T> を作成してください。
 * - プロパティ: protected items (T[]) = []
 * - 抽象メソッド: validate(item: T): boolean
 * - 通常メソッド: add(item: T): boolean - validate() を使ってチェック後追加
 * - 通常メソッド: getAll(): T[]
 * - 通常メソッド: count(): number
 *
 * UserRepository (Repository<User> を継承):
 * - validate() を実装 - name と email が空でないかチェック
 */

type User = {
  id: string;
  name: string;
  email: string;
};

// ここに実装
abstract class Repository<T> {
  protected items: T[] = [];

  abstract validate(item: T): boolean;

  // バリデーションが通った場合のみ追加
  add(item: T): boolean {
    if (this.validate(item)) {
      this.items.push(item);
      return true;
    }
    return false;
  }

  getAll(): T[] {
    return this.items;
  }

  count(): number {
    return this.items.length;
  }
}

class UserRepository extends Repository<User> {
  // User 型に特化したバリデーション
  validate(item: User): boolean {
    return item.name.trim() !== '' && item.email.trim() !== '';
  }
}

/* 問題 8: 抽象クラスとプロテクトメソッド
 * 抽象クラス HttpClient を作成してください。
 * - 抽象メソッド: protected buildUrl(endpoint: string): string
 * - 抽象メソッド: protected handleError(error: Error): void
 * - 通常メソッド: get(endpoint: string): string
 *   - buildUrl() を使ってURLを構築
 *   - "Fetching: {url}" を返す
 *
 * ApiClient (HttpClient を継承):
 * - プロパティ: private baseUrl (string)
 * - buildUrl() を実装 - baseUrl + endpoint
 * - handleError() を実装 - エラーメッセージを出力
 */

// ここに実装
abstract class HttpClient {
  protected abstract buildUrl(endpoint: string): string;
  protected abstract handleError(error: Error): void;

  // public メソッドから protected メソッドを呼び出す
  get(endpoint: string): string {
    const url = this.buildUrl(endpoint);
    return `Fetching: ${url}`;
  }
}

class ApiClient extends HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    super();
    this.baseUrl = baseUrl;
  }

  // URL を構築する処理
  protected buildUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  // エラーハンドリング処理
  protected handleError(error: Error): void {
    console.error(`API Error: ${error.message}`);
  }
}



/* 問題 9: Factory パターンと抽象クラス
 * 抽象クラス Notification を作成してください。
 * - プロパティ: protected message (string)
 * - 抽象メソッド: send(): void
 * - 通常メソッド: prepare(): void - "Preparing: {message}" を出力
 *
 * EmailNotification (Notification を継承):
 * - プロパティ: private to (string)
 * - send() を実装
 *
 * SmsNotification (Notification を継承):
 * - プロパティ: private phoneNumber (string)
 * - send() を実装
 *
 * NotificationFactory クラス:
 * - 静的メソッド: create(type: 'email' | 'sms', message: string, recipient: string): Notification
 */

// ここに実装
abstract class Notification {
  protected message: string;

  constructor(message: string) {
    this.message = message;
  }

  abstract send(): void;

  prepare(): void {
    console.log(`Preparing: ${this.message}`);
  }
}

class EmailNotification extends Notification {
  private to: string;

  constructor(message: string, to: string) {
    super(message);
    this.to = to;
  }

  send(): void {
    console.log(`Sending email to ${this.to}: ${this.message}`);
  }
}

class SmsNotification extends Notification {
  private phoneNumber: string;

  constructor(message: string, phoneNumber: string) {
    super(message);
    this.phoneNumber = phoneNumber;
  }

  send(): void {
    console.log(`Sending SMS to ${this.phoneNumber}: ${this.message}`);
  }
}

class NotificationFactory {
  static create(type: 'email' | 'sms', message: string, recipient: string): Notification {
    switch (type) {
      case 'email':
        return new EmailNotification(message, recipient);
      case 'sms':
        return new SmsNotification(message, recipient);
      default:
        throw new Error('Unknown notification type');
    }
  }
}



/* 問題 10: 抽象クラスと readonly
 * 抽象クラス Configuration を作成してください。
 * - プロパティ: protected readonly configName (string)
 * - コンストラクタ(configName: string)
 * - 抽象メソッド: load(): Record<string, any>
 * - 抽象メソッド: validate(): boolean
 * - 通常メソッド: initialize(): Record<string, any> | null
 *   - validate() が true なら load() を実行
 *
 * JsonConfiguration (Configuration を継承):
 * - load() と validate() を実装
 */

// ここに実装
abstract class Configuration {
  protected readonly configName: string;

  constructor(configName: string) {
    this.configName = configName;
  }

  abstract load(): Record<string, any>;
  abstract validate(): boolean;

  // 初期化処理: バリデーション → ロード
  initialize(): Record<string, any> | null {
    if (this.validate()) {
      return this.load();
    }
    return null;
  }
}

class JsonConfiguration extends Configuration {
  protected load(): Record<string, any> {
    // 実際にはファイルから読み込むが、ここでは固定値
    return {
      name: this.configName,
      version: '1.0.0',
      settings: { debug: true }
    };
  }

  protected validate(): boolean {
    // 設定名が空でないかチェック
    return this.configName.trim() !== '';
  }
}


/* 問題 11: 抽象クラスと計算ロジック
 * 抽象クラス Shape3D を作成してください。
 * - 抽象メソッド: getVolume(): number
 * - 抽象メソッド: getSurfaceArea(): number
 * - 通常メソッド: getDensity(mass: number): number - mass / volume
 *
 * Sphere (Shape3D を継承):
 * - プロパティ: private radius (number)
 * - 体積: (4/3) * π * r³
 * - 表面積: 4 * π * r²
 *
 * Cube (Shape3D を継承):
 * - プロパティ: private sideLength (number)
 * - 体積: side³
 * - 表面積: 6 * side²
 */

// ここに実装

abstract class Shape3D {
  abstract getVolume(): number;
  abstract getSurfaceArea(): number;

  // 抽象メソッドの結果を使った共通計算
  getDensity(mass: number): number {
    return mass / this.getVolume();
  }
}

class Sphere extends Shape3D {
  private radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  // 球の体積: (4/3) * π * r³
  getVolume(): number {
    return (4 / 3) * Math.PI * Math.pow(this.radius, 3);
  }

  // 球の表面積: 4 * π * r²
  getSurfaceArea(): number {
    return 4 * Math.PI * Math.pow(this.radius, 2);
  }
}

class Cube extends Shape3D {
  private sideLength: number;

  constructor(sideLength: number) {
    super();
    this.sideLength = sideLength;
  }

  // 立方体の体積: side³
  getVolume(): number {
    return Math.pow(this.sideLength, 3);
  }

  // 立方体の表面積: 6 * side²
  getSurfaceArea(): number {
    return 6 * Math.pow(this.sideLength, 2);
  }
}



/* 問題 12: 抽象クラスと状態管理
 * 抽象クラス StatefulComponent を作成してください。
 * - プロパティ: protected state (any)
 * - 抽象メソッド: render(): string
 * - 通常メソッド: setState(newState: any): void
 *   - state を更新して render() を呼び出す
 *
 * Counter (StatefulComponent を継承):
 * - state: { count: number }
 * - メソッド: increment(), decrement()
 * - render() を実装 - "Count: {count}" を返す
 */

// ここに実装

abstract class StatefulComponent {
  protected state: any;

  constructor(initialState: any) {
    this.state = initialState;
  }

  abstract render(): string;

  // 状態を更新して再レンダリング
  setState(newState: any): void {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}

class Counter extends StatefulComponent {
  constructor(initialState: { count: number }) {
    super(initialState);
  }

  increment(): void {
    this.setState({ count: this.state.count + 1 });
  }

  decrement(): void {
    this.setState({ count: this.state.count - 1 });
  }

  render(): string {
    return `Count: ${this.state.count}`;
  }
}


/* 問題 13: 抽象クラスとビルダーパターン
 * 抽象クラス QueryBuilder を作成してください。
 * - プロパティ: protected tableName (string)
 * - プロパティ: protected conditions (string[]) = []
 * - 抽象メソッド: build(): string
 * - 通常メソッド: where(condition: string): this
 *   - conditions に追加してthisを返す
 *
 * SelectQueryBuilder (QueryBuilder を継承):
 * - プロパティ: private fields (string[]) = ['*']
 * - メソッド: select(...fields: string[]): this
 * - build() を実装 - "SELECT {fields} FROM {table} WHERE {conditions}"
 */

// ここに実装
abstract class QueryBuilder {
  protected tableName: string;
  protected conditions: string[] = [];

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  abstract build(): string;

  // メソッドチェーンのため this を返す
  where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }
}

class SelectQueryBuilder extends QueryBuilder {
  private fields: string[] = ['*'];

  select(...fields: string[]): this {
    this.fields = fields;
    return this;
  }

  // SQL クエリを構築
  build(): string {
    const fieldsStr = this.fields.join(', ');
    const whereClause = this.conditions.length > 0
      ? ` WHERE ${this.conditions.join(' AND ')}`
      : '';
    return `SELECT ${fieldsStr} FROM ${this.tableName}${whereClause}`;
  }
}



/* 問題 14: 抽象クラスとイベント処理
 * 抽象クラス EventEmitter を作成してください。
 * - プロパティ: protected listeners (Map<string, Function[]>)
 * - 抽象メソッド: protected onEvent(event: string, data: any): void
 * - 通常メソッド: on(event: string, callback: Function): void
 * - 通常メソッド: emit(event: string, data: any): void
 *   - onEvent() を呼び出す
 *   - 登録されたリスナーを実行
 *
 * CustomEventEmitter (EventEmitter を継承):
 * - onEvent() を実装 - "Event '{event}' fired" を出力
 */

// ここに実装
abstract class EventEmitter {
  protected listeners: Map<string, Function[]>;

  constructor() {
    this.listeners = new Map();
  }

  protected abstract onEvent(event: string, data: any): void;

  // イベントリスナーを登録
  on(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  // イベントを発火
  emit(event: string, data: any): void {
    this.onEvent(event, data);
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }
}

class CustomEventEmitter extends EventEmitter {
  protected onEvent(event: string, data: any): void {
    console.log(`Event '${event}' fired`);
  }
}


/* 問題 15: 抽象クラスと高度なパターン
 * 抽象クラス Command を作成してください。
 * - 抽象メソッド: execute(): void
 * - 抽象メソッド: undo(): void
 * - 通常メソッド: getTimestamp(): Date
 *
 * AddTextCommand (Command を継承):
 * - プロパティ: private text (string)
 * - プロパティ: private document (string[])
 * - execute() - text を document に追加
 * - undo() - document から最後の要素を削除
 *
 * CommandInvoker クラス:
 * - プロパティ: private history (Command[])
 * - メソッド: executeCommand(command: Command): void
 * - メソッド: undoLastCommand(): void
 */

// ここに実装


// テストコード
console.log('--- 問題 1: Shape ---');
const circle = new Circle('赤', 5);
console.log(circle.describe());
console.log(circle.getArea());
console.log(circle.getPerimeter());

console.log('\n--- 問題 2: Employee ---');
const fullTime = new FullTimeEmployee('太郎', 'E001', 300000);
const partTime = new PartTimeEmployee('花子', 'E002', 1500, 80);
console.log(fullTime.getInfo(), fullTime.calculateSalary());
console.log(partTime.getInfo(), partTime.calculateSalary());

console.log('\n--- 問題 3: Vehicle ---');
const car = new Car();
car.operationCycle();
const bike = new ElectricBike();
bike.operationCycle();

console.log('\n--- 問題 4: DataProcessor ---');
const processor = new JsonProcessor();
console.log(processor.process('{"name":"太郎"}'));

console.log('\n--- 問題 5: Logger ---');
const consoleLogger = new ConsoleLogger();
const fileLogger = new FileLogger();
consoleLogger.log('メッセージ1');
fileLogger.log('メッセージ2');
console.log(Logger.getLogCount()); // 2

console.log('\n--- 問題 6: Animal, Mammal, Dog ---');
const dog = new Dog('ポチ', true, '茶色');
dog.introduce();
console.log(dog.makeSound());
console.log(dog.describeFur());

console.log('\n--- 問題 7: Repository ---');
const userRepo = new UserRepository();
userRepo.add({ id: '1', name: '太郎', email: 'taro@example.com' });
userRepo.add({ id: '2', name: '', email: 'invalid' }); // false
console.log(userRepo.count());
console.log(userRepo.getAll());

console.log('\n--- 問題 8: HttpClient ---');
const apiClient = new ApiClient('https://api.example.com');
console.log(apiClient.get('/users'));

console.log('\n--- 問題 9: NotificationFactory ---');
const email = NotificationFactory.create('email', 'こんにちは', 'user@example.com');
email.prepare();
email.send();

console.log('\n--- 問題 10: Configuration ---');
const config = new JsonConfiguration('app-config');
const data = config.initialize();
console.log(data);

console.log('\n--- 問題 11: Shape3D ---');
const sphere = new Sphere(5);
console.log(sphere.getVolume());
console.log(sphere.getDensity(100));
const cube = new Cube(5);
console.log(cube.getVolume());
console.log(cube.getDensity(100));

console.log('\n--- 問題 12: StatefulComponent ---');
const counter = new Counter({ count: 0 });
console.log(counter.render());
counter.increment();
counter.increment();
console.log(counter.render());

console.log('\n--- 問題 13: QueryBuilder ---');
const query = new SelectQueryBuilder('users');
const sql = query.select('id', 'name').where('age > 20').where('active = true').build();
console.log(sql);

console.log('\n--- 問題 14: EventEmitter ---');
// const emitter = new CustomEventEmitter();
// emitter.on('click', (data: any) => console.log('Clicked:', data));
// emitter.emit('click', { x: 100, y: 200 });

console.log('\n--- 問題 15: Command ---');
// const document: string[] = [];
// const cmd1 = new AddTextCommand('Hello', document);
// const invoker = new CommandInvoker();
// invoker.executeCommand(cmd1);
// console.log(document); // ['Hello']
// invoker.undoLastCommand();
// console.log(document); // []
