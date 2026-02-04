/**
 * Part 3 - Chapter 1: クラスの型定義
 * 演習 4: implements によるインターフェース実装
 */

/* 問題 1: 基本的なインターフェース実装
 * インターフェース Printable を作成してください。
 * - メソッド: print(): void
 *
 * Document クラス (Printable を実装):
 * - プロパティ: content (string)
 * - print() を実装
 */

// ここに実装
interface Printable {
  print(): void;
}

class Document implements Printable {
  constructor(public content: string) {}

  print(): void {
    console.log(this.content);
  }
}

/* 問題 2: 複数のインターフェース実装
 * インターフェース Readable, Writable を作成してください。
 * Readable:
 * - メソッド: read(): string
 * Writable:
 * - メソッド: write(data: string): void
 *
 * File クラス (Readable, Writable を実装):
 * - プロパティ: private content (string)
 * - read() と write() を実装
 */

// ここに実装
interface Readable {
  read(): string;
}

interface Writable {
  write(data: string): void;
}

class File implements Readable, Writable {
  private content: string = '';

  read(): string {
    return this.content;
  }

  write(data: string): void {
    this.content = data;
  }
}



/* 問題 3: インターフェースとプロパティ
 * インターフェース Person を作成してください。
 * - プロパティ: name (string)
 * - プロパティ: age (number)
 * - メソッド: greet(): string
 *
 * Student クラス (Person を実装):
 * - プロパティ: studentId (string)
 * - Person のすべてのメンバーを実装
 */

// ここに実装

interface Person {
  name: string;
  age: number;
  greet(): string;
}

class Student implements Person {
  constructor(
    public name: string,
    public age: number,
    public studentId: string
  ) {}

  greet(): string {
    return `こんにちは、${this.name}です。学籍番号は${this.studentId}です。`;
  }
}


/* 問題 4: インターフェースとオプショナルメンバー
 * インターフェース Config を作成してください。
 * - プロパティ: apiUrl (string)
 * - プロパティ: timeout (オプショナル: number)
 * - メソッド: validate(): boolean
 * - メソッド: load?(): void (オプショナル)
 *
 * AppConfig クラス (Config を実装):
 * - すべてのプロパティとメソッドを実装（オプショナルも含む）
 */

// ここに実装

interface Config {
  apiUrl: string;
  timeout?: number;
  validate(): boolean;
  load?(): void;
}

class AppConfig implements Config {
  constructor(
    public apiUrl: string,
    public timeout?: number
  ) {}

  validate(): boolean {
    return this.apiUrl.startsWith('https://');
  }

  load(): void {
    console.log(`Config loaded from ${this.apiUrl}`);
  }
}



/* 問題 5: ジェネリックインターフェースの実装
 * インターフェース Container<T> を作成してください。
 * - メソッド: add(item: T): void
 * - メソッド: get(): T | undefined
 * - メソッド: isEmpty(): boolean
 *
 * Stack<T> クラス (Container<T> を実装):
 * - プロパティ: private items (T[])
 * - すべてのメソッドを実装（LIFO）
 */

// ここに実装
interface Container<T> {
  add(item: T): void;
  get(): T | undefined;
  isEmpty(): boolean;
}

class Stack<T> implements Container<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(): T | undefined {
    return this.items.pop(); // LIFO (Last In First Out)
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}



/* 問題 6: インターフェースの継承と実装
 * インターフェース Animal を作成してください。
 * - メソッド: makeSound(): string
 *
 * インターフェース Pet (Animal を継承):
 * - プロパティ: name (string)
 * - メソッド: play(): void
 *
 * Dog クラス (Pet を実装):
 * - すべてのメンバーを実装
 */

// ここに実装

interface Animal {
  makeSound(): string;
}

interface Pet extends Animal {
  name: string;
  play(): void;
}

class Dog implements Pet {
  constructor(public name: string) {}

  makeSound(): string {
    return 'ワンワン！';
  }

  play(): void {
    console.log(`${this.name}が遊んでいます！`);
  }
}
/* 問題 7: 関数型プロパティを持つインターフェース
 * インターフェース EventListener を作成してください。
 * - プロパティ: onEvent ((event: string, data: any) => void)
 * - メソッド: trigger(event: string, data: any): void
 *
 * ButtonListener クラス (EventListener を実装):
 * - onEvent と trigger を実装
 */

// ここに実装


/* 問題 8: インターフェースと抽象クラスの組み合わせ
 * インターフェース Comparable を作成してください。
 * - メソッド: compareTo(other: this): number
 *
 * 抽象クラス SortableItem (Comparable を実装):
 * - プロパティ: protected value (number)
 * - compareTo() を実装
 * - 抽象メソッド: display(): string
 *
 * NumberItem クラス (SortableItem を継承):
 * - display() を実装
 */

// ここに実装


/* 問題 9: 複雑なインターフェース実装
 * インターフェース Database を作成してください。
 * - メソッド: connect(): Promise<void>
 * - メソッド: disconnect(): Promise<void>
 * - メソッド: query<T>(sql: string): Promise<T[]>
 *
 * MockDatabase クラス (Database を実装):
 * - connected (private boolean)
 * - すべてのメソッドを実装（モック動作）
 */

// ここに実装


/* 問題 10: インターフェースとクラス型の組み合わせ
 * インターフェース Logger を作成してください。
 * - メソッド: log(message: string): void
 * - メソッド: error(message: string): void
 *
 * インターフェース Service を作成してください。
 * - プロパティ: logger (Logger)
 * - メソッド: execute(): void
 *
 * UserService クラス (Service を実装):
 * - すべてのメンバーを実装
 */

// ここに実装


/* 問題 11: インターフェースと静的メンバー
 * インターフェース Serializable を作成してください。
 * - メソッド: serialize(): string
 * - メソッド: deserialize(data: string): this
 *
 * User クラス (Serializable を実装):
 * - プロパティ: name (string), email (string)
 * - serialize() - JSON文字列に変換
 * - deserialize() - JSON文字列から復元（静的メソッドとしても実装）
 */

// ここに実装


/* 問題 12: 読み取り専用インターフェース
 * インターフェース ReadonlyPoint を作成してください。
 * - プロパティ: readonly x (number)
 * - プロパティ: readonly y (number)
 * - メソッド: distanceFromOrigin(): number
 *
 * Point クラス (ReadonlyPoint を実装):
 * - コンストラクタで x, y を設定
 * - distanceFromOrigin() を実装
 */

// ここに実装


/* 問題 13: インターフェースとインデックスシグネチャ
 * インターフェース StringMap を作成してください。
 * - インデックスシグネチャ: [key: string]: string
 * - メソッド: get(key: string): string | undefined
 * - メソッド: set(key: string, value: string): void
 *
 * HashMap クラス (StringMap を実装):
 * - プロパティ: private data (object)
 * - すべてのメソッドを実装
 * - インデックスアクセスも実装
 */

// ここに実装


/* 問題 14: インターフェースと継承の組み合わせ
 * インターフェース Disposable を作成してください。
 * - メソッド: dispose(): void
 *
 * クラス Resource (Disposable を実装):
 * - プロパティ: protected name (string)
 * - dispose() を実装 - "Disposing {name}" を出力
 *
 * クラス FileResource (Resource を継承):
 * - プロパティ: private filePath (string)
 * - dispose() をオーバーライド - super.dispose() + ファイル固有処理
 */

// ここに実装


/* 問題 15: 高度なインターフェース実装
 * インターフェース Observer を作成してください。
 * - メソッド: update(data: any): void
 *
 * インターフェース Subject を作成してください。
 * - メソッド: attach(observer: Observer): void
 * - メソッド: detach(observer: Observer): void
 * - メソッド: notify(data: any): void
 *
 * NewsPublisher クラス (Subject を実装):
 * - プロパティ: private observers (Set<Observer>)
 * - すべてのメソッドを実装
 *
 * NewsSubscriber クラス (Observer を実装):
 * - プロパティ: name (string)
 * - update() を実装
 */

// ここに実装


// テストコード
console.log('--- 問題 1: Printable ---');
const doc = new Document('重要な文書');
doc.print();

console.log('\n--- 問題 2: Readable & Writable ---');
const file = new File();
file.write('Hello, World!');
console.log(file.read());

console.log('\n--- 問題 3: Person ---');
const student = new Student('太郎', 20, 'S001');
console.log(student.greet());
console.log(student.studentId);

console.log('\n--- 問題 4: Config ---');
const config = new AppConfig('https://api.example.com', 5000);
console.log(config.validate());
config.load?.();

console.log('\n--- 問題 5: Container ---');
const stack = new Stack<number>();
stack.add(1);
stack.add(2);
stack.add(3);
console.log(stack.get()); // 3
console.log(stack.get()); // 2
console.log(stack.get()); // 1
console.log(stack.isEmpty()); // true

console.log('\n--- 問題 6: Pet ---');
const dog = new Dog('ポチ');
console.log(dog.makeSound());
dog.play();

console.log('\n--- 問題 7: EventListener ---');
// const listener = new ButtonListener();
// listener.onEvent = (event, data) => {
//   console.log(`Event: ${event}, Data: ${JSON.stringify(data)}`);
// };
// listener.trigger('click', { x: 100, y: 200 });

console.log('\n--- 問題 8: Comparable ---');
// const item1 = new NumberItem(10);
// const item2 = new NumberItem(20);
// console.log(item1.compareTo(item2)); // 負の数
// console.log(item1.display());

console.log('\n--- 問題 9: Database ---');
// const db = new MockDatabase();
// await db.connect();
// const users = await db.query<{ id: number; name: string }>('SELECT * FROM users');
// console.log(users);
// await db.disconnect();

console.log('\n--- 問題 10: Service ---');
// const logger = { log: (msg: string) => console.log(msg), error: (msg: string) => console.error(msg) };
// const service = new UserService(logger);
// service.execute();

console.log('\n--- 問題 11: Serializable ---');
// const user = new User('太郎', 'taro@example.com');
// const json = user.serialize();
// console.log(json);
// const restored = user.deserialize(json);
// console.log(restored);

console.log('\n--- 問題 12: ReadonlyPoint ---');
// const point = new Point(3, 4);
// console.log(point.x, point.y);
// console.log(point.distanceFromOrigin());
// // point.x = 10; // Error

console.log('\n--- 問題 13: StringMap ---');
// const map = new HashMap();
// map.set('name', '太郎');
// map['age'] = '25';
// console.log(map.get('name'));
// console.log(map['age']);

console.log('\n--- 問題 14: Disposable ---');
// const fileResource = new FileResource('config', '/etc/config.json');
// fileResource.dispose();

console.log('\n--- 問題 15: Observer & Subject ---');
// const publisher = new NewsPublisher();
// const subscriber1 = new NewsSubscriber('購読者1');
// const subscriber2 = new NewsSubscriber('購読者2');
// publisher.attach(subscriber1);
// publisher.attach(subscriber2);
// publisher.notify('最新ニュースです！');
// publisher.detach(subscriber1);
// publisher.notify('2つ目のニュースです');
