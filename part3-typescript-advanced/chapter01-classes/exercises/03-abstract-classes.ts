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
// const fullTime = new FullTimeEmployee('太郎', 'E001', 300000);
// const partTime = new PartTimeEmployee('花子', 'E002', 1500, 80);
// console.log(fullTime.getInfo(), fullTime.calculateSalary());
// console.log(partTime.getInfo(), partTime.calculateSalary());

console.log('\n--- 問題 3: Vehicle ---');
// const car = new Car();
// car.operationCycle();
// const bike = new ElectricBike();
// bike.operationCycle();

console.log('\n--- 問題 4: DataProcessor ---');
// const processor = new JsonProcessor();
// console.log(processor.process('{"name":"太郎"}'));

console.log('\n--- 問題 5: Logger ---');
// const consoleLogger = new ConsoleLogger();
// const fileLogger = new FileLogger();
// consoleLogger.log('メッセージ1');
// fileLogger.log('メッセージ2');
// console.log(Logger.getLogCount()); // 2

console.log('\n--- 問題 6: Animal, Mammal, Dog ---');
// const dog = new Dog('ポチ', true, '茶色');
// dog.introduce();
// console.log(dog.makeSound());
// console.log(dog.describeFur());

console.log('\n--- 問題 7: Repository ---');
// const userRepo = new UserRepository();
// userRepo.add({ id: '1', name: '太郎', email: 'taro@example.com' });
// userRepo.add({ id: '2', name: '', email: 'invalid' }); // false
// console.log(userRepo.count());

console.log('\n--- 問題 8: HttpClient ---');
// const apiClient = new ApiClient('https://api.example.com');
// console.log(apiClient.get('/users'));

console.log('\n--- 問題 9: NotificationFactory ---');
// const email = NotificationFactory.create('email', 'こんにちは', 'user@example.com');
// email.prepare();
// email.send();

console.log('\n--- 問題 10: Configuration ---');
// const config = new JsonConfiguration('app-config');
// const data = config.initialize();
// console.log(data);

console.log('\n--- 問題 11: Shape3D ---');
// const sphere = new Sphere(5);
// console.log(sphere.getVolume());
// console.log(sphere.getDensity(100));

console.log('\n--- 問題 12: StatefulComponent ---');
// const counter = new Counter({ count: 0 });
// console.log(counter.render());
// counter.increment();
// counter.increment();
// console.log(counter.render());

console.log('\n--- 問題 13: QueryBuilder ---');
// const query = new SelectQueryBuilder('users');
// const sql = query.select('id', 'name').where('age > 20').where('active = true').build();
// console.log(sql);

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
