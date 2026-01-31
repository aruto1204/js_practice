/**
 * Part 3 - Chapter 1: クラスの型定義
 * 演習 2: アクセス修飾子
 */

/* 問題 1: public メンバー
 * Counter クラスを作成してください。
 * - プロパティ: count (public number) - 初期値 0
 * - メソッド: increment(): void (public)
 * - メソッド: decrement(): void (public)
 * - メソッド: reset(): void (public)
 * すべて外部からアクセス可能にする
 */

// ここに実装

class Counter {
  public count: number = 0;
  public increment(): void {
    this.count++;
  }
  public decrement(): void {
    this.count--;
  }
  public reset(): void {
    this.count = 0;
  }
}


/* 問題 2: private メンバー
 * Password クラスを作成してください。
 * - プロパティ: password (private string)
 * - メソッド: setPassword(newPassword: string): boolean - 8文字以上なら設定成功
 * - メソッド: verify(inputPassword: string): boolean - パスワードが一致するか検証
 * - メソッド: getPasswordLength(): number - パスワードの長さを返す
 */

// ここに実装

class Password {
  // private プロパティはクラス外からアクセス不可
  private password: string = '';

  public setPassword(newPassword: string): boolean {
    if (newPassword.length >= 8) {
      this.password = newPassword;
      return true;
    }
    return false;
  }

  public verify(inputPassword: string): boolean {
    return this.password === inputPassword;
  }

  public getPasswordLength(): number {
    return this.password.length;
  }
}
/* 問題 3: protected メンバー
 * Animal クラスと Dog クラスを作成してください。
 * Animal:
 * - プロパティ: name (protected string)
 * - プロパティ: age (protected number)
 * - メソッド: getInfo(): string (public)
 * Dog (Animal を継承):
 * - プロパティ: breed (private string)
 * - メソッド: bark(): void - "{name}がワンワン！" を出力
 * - メソッド: getDetailedInfo(): string - 名前、年齢、犬種を含む情報
 */

// ここに実装
class Animal {
  // protected プロパティは継承先クラスからアクセス可能
  protected name: string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public getInfo(): string {
    return `名前: ${this.name}, 年齢: ${this.age}歳`;
  }
}

class Dog extends Animal {
  // private プロパティは Dog クラス内のみアクセス可能
  private breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age);
    this.breed = breed;
  }

  public bark(): void {
    // protected な name プロパティにアクセス可能
    console.log(`${this.name}がワンワン！`);
  }

  public getDetailedInfo(): string {
    // protected な name, age と private な breed にアクセス
    return `名前: ${this.name}, 年齢: ${this.age}歳, 犬種: ${this.breed}`;
  }
}


/* 問題 4: private フィールドとカプセル化
 * BankAccount クラスを作成してください。
 * - プロパティ: accountNumber (private readonly string)
 * - プロパティ: balance (private number) - 初期値 0
 * - プロパティ: transactions (private string[])
 * - メソッド: deposit(amount: number): void - 入金（正の数のみ）
 * - メソッド: withdraw(amount: number): boolean - 出金（残高チェック）
 * - メソッド: getBalance(): number
 * - メソッド: getTransactionHistory(): readonly string[]
 */

// ここに実装
class BankAccount {
  // private readonly は初期化後変更不可
  private readonly accountNumber: string;
  private balance: number = 0;
  private transactions: string[] = [];

  constructor(accountNumber: string) {
    this.accountNumber = accountNumber;
  }

  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      this.transactions.push(`入金: +${amount}円`);
    }
  }

  public withdraw(amount: number): boolean {
    if (amount > 0 && this.balance >= amount) {
      this.balance -= amount;
      this.transactions.push(`出金: -${amount}円`);
      return true;
    }
    return false;
  }

  public getBalance(): number {
    return this.balance;
  }

  public getTransactionHistory(): readonly string[] {
    // 配列のコピーを返して内部データを保護
    return [...this.transactions];
  }
}


/* 問題 5: protected メソッドのオーバーライド
 * Vehicle クラスと ElectricCar クラスを作成してください。
 * Vehicle:
 * - プロパティ: brand (protected string)
 * - メソッド: protected startEngine(): string - "エンジン始動"
 * - メソッド: start(): void - startEngine() を呼び出して結果を出力
 * ElectricCar (Vehicle を継承):
 * - プロパティ: batteryLevel (private number)
 * - メソッド: protected startEngine(): string - "モーター始動" をオーバーライド
 * - メソッド: getBatteryLevel(): number
 */

// ここに実装

class Vehicle {
  protected brand: string;

  constructor(brand: string) {
    this.brand = brand;
  }

  // protected メソッドは継承先でオーバーライド可能
  protected startEngine(): string {
    return 'エンジン始動';
  }

  public start(): void {
    const message = this.startEngine();
    console.log(`${this.brand}: ${message}`);
  }
}

class ElectricCar extends Vehicle {
  private batteryLevel: number;

  constructor(brand: string, batteryLevel: number) {
    super(brand);
    this.batteryLevel = batteryLevel;
  }

  // protected メソッドをオーバーライド
  protected startEngine(): string {
    return 'モーター始動';
  }

  public getBatteryLevel(): number {
    return this.batteryLevel;
  }
}


/* 問題 6: アクセス修飾子の混在
 * TodoList クラスを作成してください。
 * - プロパティ: private todos (string[])
 * - プロパティ: public maxTodos (number) - 最大タスク数
 * - プロパティ: protected category (string)
 * - メソッド: addTodo(todo: string): boolean - 最大数チェック
 * - メソッド: getTodos(): readonly string[]
 * - メソッド: private isValidTodo(todo: string): boolean - 空文字列チェック
 */

// ここに実装

class TodoList {
  private todos: string[] = [];
  public maxTodos: number;
  protected category: string;

  constructor(category: string, maxTodos: number) {
    this.category = category;
    this.maxTodos = maxTodos;
  }

  private isValidTodo(todo: string): boolean {
    return todo.trim().length > 0;
  }

  public addTodo(todo: string): boolean {
    if (this.isValidTodo(todo) && this.todos.length < this.maxTodos) {
      this.todos.push(todo);
      return true;
    }
    return false;
  }

  public getTodos(): readonly string[] {
    return [...this.todos];
  }
}


/* 問題 7: private setter, public getter
 * Person クラスを作成してください。
 * - プロパティ: private _age (number)
 * - getter: age (public) - 年齢を返す
 * - private setter: age - 0以上の値のみ設定
 * - メソッド: public celebrateBirthday(): void - 年齢を1増やす
 */

// ここに実装

class Person {
  private _age: number;

  constructor(age: number) {
    this._age = age >= 0 ? age : 0;
  }

  // public getter
  public get age(): number {
    return this._age;
  }

  // private setter（クラス内部でのみ使用可能）
  private set age(value: number) {
    if (value >= 0) {
      this._age = value;
    }
  }

  public celebrateBirthday(): void {
    // private setter を内部で使用
    this.age = this._age + 1;
  }
}


/* 問題 8: 静的メンバーとアクセス修飾子
 * IdGenerator クラスを作成してください。
 * - プロパティ: private static currentId (number) - 初期値 1000
 * - プロパティ: private static readonly prefix (string) = "ID"
 * - メソッド: static generateId(): string - "ID1001", "ID1002"... の形式
 * - メソッド: static reset(): void - currentId を 1000 にリセット
 * - メソッド: private static formatId(id: number): string - ID整形のヘルパー
 */

// ここに実装
class IdGenerator {
  // private static プロパティはクラス内の静的メソッドからのみアクセス可能
  private static currentId: number = 1000;
  private static readonly prefix: string = 'ID';

  // private static ヘルパーメソッド
  private static formatId(id: number): string {
    return `${this.prefix}${id}`;
  }

  public static generateId(): string {
    this.currentId++;
    return this.formatId(this.currentId);
  }

  public static reset(): void {
    this.currentId = 1000;
  }
}



/* 問題 9: protected コンストラクタ
 * Logger 基底クラスと ConsoleLogger, FileLogger を作成してください。
 * Logger:
 * - プロパティ: protected logLevel (string)
 * - protected コンストラクタ(logLevel: string)
 * - メソッド: abstract log(message: string): void
 * ConsoleLogger (Logger を継承):
 * - コンストラクタでログレベル "INFO" を設定
 * - log() を実装 - console.log() を使用
 * FileLogger (Logger を継承):
 * - コンストラクタでログレベル "DEBUG" を設定
 * - log() を実装 - "Writing to file: {message}" を出力
 */

// ここに実装
abstract class Logger {
  protected logLevel: string;

  // protected コンストラクタは継承先クラスからのみ呼び出し可能
  protected constructor(logLevel: string) {
    this.logLevel = logLevel;
  }

  abstract log(message: string): void;
}

class ConsoleLogger extends Logger {
  constructor() {
    super('INFO');
  }

  public log(message: string): void {
    console.log(`[${this.logLevel}] ${message}`);
  }
}

class FileLogger extends Logger {
  constructor() {
    super('DEBUG');
  }

  public log(message: string): void {
    console.log(`Writing to file: [${this.logLevel}] ${message}`);
  }
}



/* 問題 10: private メソッドと内部ロジック
 * EmailValidator クラスを作成してください。
 * - メソッド: validate(email: string): { valid: boolean; errors: string[] }
 * - private メソッド: hasAtSign(email: string): boolean
 * - private メソッド: hasDomain(email: string): boolean
 * - private メソッド: hasValidLength(email: string): boolean (5文字以上)
 * validate() は上記のプライベートメソッドを使ってチェック
 */

// ここに実装
class EmailValidator {
  // private メソッドで検証ロジックを分割
  private hasAtSign(email: string): boolean {
    return email.includes('@');
  }

  private hasDomain(email: string): boolean {
    return email.includes('.');
  }

  private hasValidLength(email: string): boolean {
    return email.length >= 5;
  }

  public validate(email: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.hasValidLength(email)) {
      errors.push('メールアドレスは5文字以上必要です');
    }
    if (!this.hasAtSign(email)) {
      errors.push('@記号が必要です');
    }
    if (!this.hasDomain(email)) {
      errors.push('ドメインが必要です');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}


/* 問題 11: protected static メンバー
 * Shape 基底クラスと Rectangle を作成してください。
 * Shape:
 * - プロパティ: protected static readonly MIN_SIZE (number) = 0
 * - プロパティ: protected color (string)
 * - メソッド: abstract getArea(): number
 * Rectangle (Shape を継承):
 * - プロパティ: private width (number)
 * - プロパティ: private height (number)
 * - コンストラクタで width, height を MIN_SIZE 以上に制限
 * - getArea() を実装
 */

// ここに実装
abstract class Shape {
  // protected static プロパティは継承先クラスからアクセス可能
  protected static readonly MIN_SIZE: number = 0;
  protected color: string;

  constructor(color: string) {
    this.color = color;
  }

  abstract getArea(): number;
}

class Rectangle extends Shape {
  private width: number;
  private height: number;

  constructor(color: string, width: number, height: number) {
    super(color);
    // protected static プロパティにアクセス
    this.width = width > Shape.MIN_SIZE ? width : Shape.MIN_SIZE;
    this.height = height > Shape.MIN_SIZE ? height : Shape.MIN_SIZE;
  }

  public getArea(): number {
    return this.width * this.height;
  }
}


/* 問題 12: private フィールドと依存性注入
 * UserRepository クラスを作成してください。
 * - プロパティ: private database (Database) ※Database型は自分で定義
 * - コンストラクタで database を受け取る
 * - メソッド: findById(id: string): User | null
 * - メソッド: save(user: User): void
 * - private メソッド: validateUser(user: User): boolean
 */

// Database と User の型定義
type Database = {
  get(key: string): any;
  set(key: string, value: any): void;
};

type User = {
  id: string;
  name: string;
  email: string;
};

// ここに実装
class UserRepository {
  // private プロパティで外部依存を保持
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  // private メソッドでバリデーションロジックを隠蔽
  private validateUser(user: User): boolean {
    return (
      user.id.length > 0 &&
      user.name.length > 0 &&
      user.email.includes('@')
    );
  }

  public findById(id: string): User | null {
    const user = this.database.get(id);
    return user || null;
  }

  public save(user: User): void {
    if (this.validateUser(user)) {
      this.database.set(user.id, user);
    }
  }
}

/* 問題 13: アクセス修飾子とパラメータプロパティ
 * Product クラスを作成してください。
 * パラメータプロパティを使用：
 * - public id (string)
 * - public name (string)
 * - private price (number)
 * - protected stock (number)
 * メソッド:
 * - getPrice(): number
 * - setPrice(newPrice: number): boolean - 0以上のみ設定可能
 * - isInStock(): boolean
 */

// ここに実装

class Product {
  // パラメータプロパティでプロパティを宣言と同時に初期化
  constructor(
    public id: string,
    public name: string,
    private price: number,
    protected stock: number
  ) {}

  public getPrice(): number {
    return this.price;
  }

  public setPrice(newPrice: number): boolean {
    if (newPrice >= 0) {
      this.price = newPrice;
      return true;
    }
    return false;
  }

  public isInStock(): boolean {
    return this.stock > 0;
  }
}


/* 問題 14: private と WeakMap パターン（高度）
 * SecureStorage クラスを作成してください。
 * - private static データストア（Map<string, string>）
 * - プロパティ: private key (string)
 * - メソッド: set(value: string): void - key をもとにデータを保存
 * - メソッド: get(): string | undefined - key をもとにデータを取得
 * - メソッド: delete(): boolean
 * 異なるインスタンスでも同じ key なら同じデータにアクセス
 */

// ここに実装
class SecureStorage {
  // private static でクラス全体で共有されるデータストア
  private static dataStore: Map<string, string> = new Map();
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  public set(value: string): void {
    SecureStorage.dataStore.set(this.key, value);
  }

  public get(): string | undefined {
    return SecureStorage.dataStore.get(this.key);
  }

  public delete(): boolean {
    return SecureStorage.dataStore.delete(this.key);
  }
}


/* 問題 15: 複雑なアクセス制御
 * NotificationService クラスを作成してください。
 * - プロパティ: private subscribers (Set<string>)
 * - プロパティ: protected notificationCount (number)
 * - プロパティ: private readonly maxSubscribers (number) = 100
 * - メソッド: subscribe(email: string): boolean - 購読者追加
 * - メソッド: unsubscribe(email: string): boolean
 * - メソッド: notify(message: string): number - 全購読者に通知、送信数を返す
 * - private メソッド: isValidEmail(email: string): boolean
 * - protected メソッド: incrementCount(): void
 * - getter: subscriberCount (public)
 */

// ここに実装


// テストコード
console.log('--- 問題 1: Counter ---');
const counter = new Counter();
counter.increment();
counter.increment();
console.log(counter.count); // 2
counter.decrement();
console.log(counter.count); // 1
counter.reset();
console.log(counter.count); // 0

console.log('\n--- 問題 2: Password ---');
const pwd = new Password();
console.log(pwd.setPassword('123')); // false
console.log(pwd.setPassword('securePass123')); // true
console.log(pwd.verify('wrong')); // false
console.log(pwd.verify('securePass123')); // true
console.log(pwd.getPasswordLength()); // 13

console.log('\n--- 問題 3: Animal & Dog ---');
const dog = new Dog('ポチ', 3, '柴犬');
console.log(dog.getInfo());
dog.bark();
console.log(dog.getDetailedInfo());

console.log('\n--- 問題 4: BankAccount ---');
const account = new BankAccount('12345678');
account.deposit(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
console.log(account.withdraw(300)); // true
console.log(account.getBalance()); // 1200
console.log(account.getTransactionHistory());

console.log('\n--- 問題 5: Vehicle & ElectricCar ---');
const ev = new ElectricCar('Tesla', 80);
ev.start(); // "モーター始動"
console.log(ev.getBatteryLevel()); // 80

console.log('\n--- 問題 6: TodoList ---');
const todoList = new TodoList('仕事', 5);
todoList.addTodo('タスク1');
todoList.addTodo('タスク2');
console.log(todoList.getTodos());

console.log('\n--- 問題 7: Person ---');
const person = new Person(25);
console.log(person.age); // 25
person.celebrateBirthday();
console.log(person.age); // 26

console.log('\n--- 問題 8: IdGenerator ---');
console.log(IdGenerator.generateId()); // ID1001
console.log(IdGenerator.generateId()); // ID1002
IdGenerator.reset();
console.log(IdGenerator.generateId()); // ID1001

console.log('\n--- 問題 9: Logger ---');
const consoleLogger = new ConsoleLogger();
consoleLogger.log('情報メッセージ');
const fileLogger = new FileLogger();
fileLogger.log('デバッグメッセージ');

console.log('\n--- 問題 10: EmailValidator ---');
const validator = new EmailValidator();
console.log(validator.validate('test@example.com'));
console.log(validator.validate('invalid'));

console.log('\n--- 問題 11: Shape & Rectangle ---');
const rect = new Rectangle('赤', 10, 5);
console.log(rect.getArea()); // 50

console.log('\n--- 問題 12: UserRepository ---');
const db: Database = new Map();
const repo = new UserRepository(db);
const user: User = { id: '1', name: '太郎', email: 'taro@example.com' };
repo.save(user);
console.log(repo.findById('1'));


console.log('\n--- 問題 13: Product ---');
const product = new Product('P001', 'ノートPC', 100000, 10);
console.log(product.getPrice()); // 100000
product.setPrice(95000);
console.log(product.getPrice()); // 95000
console.log(product.isInStock()); // true

console.log('\n--- 問題 14: SecureStorage ---');
const storage1 = new SecureStorage('myKey');
storage1.set('秘密のデータ');
const storage2 = new SecureStorage('myKey');
console.log(storage2.get()); // '秘密のデータ'

// console.log('\n--- 問題 15: NotificationService ---');
// const service = new NotificationService();
// service.subscribe('user1@example.com');
// service.subscribe('user2@example.com');
// console.log(service.subscriberCount); // 2
// const sent = service.notify('新着情報があります');
// console.log(sent); // 2
