/**
 * Part 3 - Chapter 1: クラスの型定義
 * 演習 5: 高度なパターン
 */

/* 問題 1: Mixin パターン
 * TimestampMixin を作成してください。
 * - プロパティ: createdAt (Date)
 * - メソッド: getAge(): number - 作成からの経過秒数
 *
 * LoggableMixin を作成してください。
 * - メソッド: log(message: string): void
 *
 * Document クラス (両方の Mixin を適用):
 * - プロパティ: content (string)
 * - Mixin のすべての機能を持つ
 */

// ヒント: type Constructor<T = {}> = new (...args: any[]) => T;

// ここに実装


/* 問題 2: デコレータパターン（クラスベース）
 * インターフェース Component を作成してください。
 * - メソッド: operation(): string
 *
 * ConcreteComponent クラス (Component を実装):
 * - operation() - "基本機能" を返す
 *
 * 抽象クラス Decorator (Component を実装):
 * - プロパティ: protected component (Component)
 * - operation() - component.operation() を返す
 *
 * BoldDecorator, ItalicDecorator (Decorator を継承):
 * - operation() をオーバーライド - テキストを装飾
 */

// ここに実装


/* 問題 3: ビルダーパターン
 * User クラスを作成してください。
 * - プロパティ: name, email, age, address (すべて readonly)
 * - プライベートコンストラクタ
 *
 * UserBuilder クラス:
 * - メソッド: setName(name: string): this
 * - メソッド: setEmail(email: string): this
 * - メソッド: setAge(age: number): this
 * - メソッド: setAddress(address: string): this
 * - メソッド: build(): User
 */

// ここに実装


/* 問題 4: Chain of Responsibility パターン
 * 抽象クラス Handler を作成してください。
 * - プロパティ: protected next (Handler | null)
 * - メソッド: setNext(handler: Handler): Handler
 * - 抽象メソッド: handle(request: string): string | null
 *
 * AuthHandler, ValidationHandler, LogHandler (Handler を継承):
 * - handle() を実装
 * - 処理できない場合は next?.handle() を呼ぶ
 */

// ここに実装


/* 問題 5: Strategy パターン
 * インターフェース SortStrategy を作成してください。
 * - メソッド: sort(data: number[]): number[]
 *
 * BubbleSort, QuickSort クラス (SortStrategy を実装):
 * - sort() を実装
 *
 * Sorter クラス:
 * - プロパティ: private strategy (SortStrategy)
 * - メソッド: setStrategy(strategy: SortStrategy): void
 * - メソッド: sort(data: number[]): number[]
 */

// ここに実装


/* 問題 6: State パターン
 * インターフェース State を作成してください。
 * - メソッド: handle(context: Context): void
 *
 * ConcreteStateA, ConcreteStateB クラス (State を実装):
 * - handle() を実装 - context の状態を変更
 *
 * Context クラス:
 * - プロパティ: private state (State)
 * - メソッド: setState(state: State): void
 * - メソッド: request(): void - state.handle(this) を呼ぶ
 */

// ここに実装


/* 問題 7: Template Method パターン
 * 抽象クラス Game を作成してください。
 * - 通常メソッド: play(): void - テンプレートメソッド
 *   1. initialize()
 *   2. startPlay()
 *   3. endPlay()
 * - 抽象メソッド: initialize(): void
 * - 抽象メソッド: startPlay(): void
 * - 抽象メソッド: endPlay(): void
 *
 * Chess, Football クラス (Game を継承):
 * - すべての抽象メソッドを実装
 */

// ここに実装


/* 問題 8: Prototype パターン
 * インターフェース Cloneable<T> を作成してください。
 * - メソッド: clone(): T
 *
 * Person クラス (Cloneable<Person> を実装):
 * - プロパティ: name, age, address (object)
 * - clone() を実装 - deep copy
 */

// ここに実装


/* 問題 9: Adapter パターン
 * インターフェース MediaPlayer を作成してください。
 * - メソッド: play(audioType: string, fileName: string): void
 *
 * クラス AdvancedMediaPlayer:
 * - メソッド: playVlc(fileName: string): void
 * - メソッド: playMp4(fileName: string): void
 *
 * MediaAdapter クラス (MediaPlayer を実装):
 * - プロパティ: private advancedPlayer (AdvancedMediaPlayer)
 * - play() を実装 - audioType に応じて適切なメソッドを呼ぶ
 */

// ここに実装


/* 問題 10: Composite パターン
 * 抽象クラス FileSystemItem を作成してください。
 * - プロパティ: protected name (string)
 * - 抽象メソッド: getSize(): number
 * - メソッド: getName(): string
 *
 * File クラス (FileSystemItem を継承):
 * - プロパティ: private size (number)
 * - getSize() を実装
 *
 * Directory クラス (FileSystemItem を継承):
 * - プロパティ: private children (FileSystemItem[])
 * - メソッド: add(item: FileSystemItem): void
 * - getSize() を実装 - 子要素のサイズの合計
 */

// ここに実装


/* 問題 11: Proxy パターン
 * インターフェース Image を作成してください。
 * - メソッド: display(): void
 *
 * RealImage クラス (Image を実装):
 * - プロパティ: private fileName (string)
 * - コンストラクタで loadFromDisk() を呼ぶ
 * - private メソッド: loadFromDisk(): void
 * - display() を実装
 *
 * ProxyImage クラス (Image を実装):
 * - プロパティ: private realImage (RealImage | null)
 * - display() - realImage が null なら作成してから表示
 */

// ここに実装


/* 問題 12: Memento パターン
 * クラス EditorMemento を作成してください。
 * - プロパティ: private readonly content (string)
 * - getter: content
 *
 * クラス Editor:
 * - プロパティ: private content (string)
 * - メソッド: write(text: string): void
 * - メソッド: save(): EditorMemento
 * - メソッド: restore(memento: EditorMemento): void
 * - getter: content
 *
 * クラス History:
 * - プロパティ: private mementos (EditorMemento[])
 * - メソッド: push(memento: EditorMemento): void
 * - メソッド: pop(): EditorMemento | undefined
 */

// ここに実装


/* 問題 13: Visitor パターン
 * インターフェース Visitor を作成してください。
 * - メソッド: visitCircle(circle: Circle): void
 * - メソッド: visitRectangle(rectangle: Rectangle): void
 *
 * インターフェース Shape を作成してください。
 * - メソッド: accept(visitor: Visitor): void
 *
 * Circle, Rectangle クラス (Shape を実装):
 * - 必要なプロパティ（radius, width/height）
 * - accept() を実装
 *
 * AreaCalculator クラス (Visitor を実装):
 * - プロパティ: totalArea (number)
 * - visitCircle(), visitRectangle() を実装
 */

// ここに実装


/* 問題 14: Fluent Interface パターン
 * QueryBuilder クラスを作成してください。
 * - プロパティ: private table, fields, conditions, orderBy, limitValue
 * - メソッド: from(table: string): this
 * - メソッド: select(...fields: string[]): this
 * - メソッド: where(condition: string): this
 * - メソッド: orderBy(field: string, direction: 'ASC' | 'DESC'): this
 * - メソッド: limit(value: number): this
 * - メソッド: build(): string - SQL文字列を生成
 */

// ここに実装


/* 問題 15: Dependency Injection パターン
 * インターフェース IDatabase を作成してください。
 * - メソッド: query(sql: string): any[]
 *
 * インターフェース ILogger を作成してください。
 * - メソッド: log(message: string): void
 *
 * UserService クラス:
 * - コンストラクタで IDatabase と ILogger を受け取る
 * - メソッド: getUser(id: string): any
 * - メソッド: createUser(name: string): void
 *
 * DIContainer クラス:
 * - プロパティ: private services (Map<string, any>)
 * - メソッド: register(name: string, instance: any): void
 * - メソッド: get<T>(name: string): T
 */

// ここに実装


// テストコード
console.log('--- 問題 1: Mixin ---');
// const doc = new Document('重要な文書');
// doc.log('作成しました');
// setTimeout(() => {
//   console.log(`経過時間: ${doc.getAge()}秒`);
// }, 1000);

console.log('\n--- 問題 2: Decorator ---');
// const component = new ConcreteComponent();
// const bold = new BoldDecorator(component);
// const italic = new ItalicDecorator(bold);
// console.log(italic.operation());

console.log('\n--- 問題 3: Builder ---');
// const user = new UserBuilder()
//   .setName('太郎')
//   .setEmail('taro@example.com')
//   .setAge(25)
//   .setAddress('東京都')
//   .build();
// console.log(user);

console.log('\n--- 問題 4: Chain of Responsibility ---');
// const auth = new AuthHandler();
// const validation = new ValidationHandler();
// const log = new LogHandler();
// auth.setNext(validation).setNext(log);
// console.log(auth.handle('リクエスト'));

console.log('\n--- 問題 5: Strategy ---');
// const sorter = new Sorter(new BubbleSort());
// console.log(sorter.sort([3, 1, 4, 1, 5, 9]));
// sorter.setStrategy(new QuickSort());
// console.log(sorter.sort([3, 1, 4, 1, 5, 9]));

console.log('\n--- 問題 6: State ---');
// const context = new Context(new ConcreteStateA());
// context.request(); // StateA -> StateB
// context.request(); // StateB -> StateA

console.log('\n--- 問題 7: Template Method ---');
// const chess = new Chess();
// chess.play();
// const football = new Football();
// football.play();

console.log('\n--- 問題 8: Prototype ---');
// const person1 = new Person('太郎', 25, { city: '東京', zip: '100-0001' });
// const person2 = person1.clone();
// console.log(person1 === person2); // false
// console.log(person1.address === person2.address); // false (deep copy)

console.log('\n--- 問題 9: Adapter ---');
// const adapter = new MediaAdapter();
// adapter.play('vlc', 'movie.vlc');
// adapter.play('mp4', 'video.mp4');

console.log('\n--- 問題 10: Composite ---');
// const file1 = new File('file1.txt', 100);
// const file2 = new File('file2.txt', 200);
// const dir = new Directory('documents');
// dir.add(file1);
// dir.add(file2);
// console.log(dir.getSize()); // 300

console.log('\n--- 問題 11: Proxy ---');
// const proxy = new ProxyImage('large_image.jpg');
// proxy.display(); // 初回: ロード + 表示
// proxy.display(); // 2回目: 表示のみ

console.log('\n--- 問題 12: Memento ---');
// const editor = new Editor();
// const history = new History();
// editor.write('Hello');
// history.push(editor.save());
// editor.write(' World');
// console.log(editor.content); // "Hello World"
// const memento = history.pop();
// if (memento) editor.restore(memento);
// console.log(editor.content); // "Hello"

console.log('\n--- 問題 13: Visitor ---');
// const circle = new Circle(5);
// const rectangle = new Rectangle(4, 6);
// const calculator = new AreaCalculator();
// circle.accept(calculator);
// rectangle.accept(calculator);
// console.log(calculator.totalArea);

console.log('\n--- 問題 14: Fluent Interface ---');
// const query = new QueryBuilder()
//   .from('users')
//   .select('id', 'name', 'email')
//   .where('age > 20')
//   .where('active = true')
//   .orderBy('name', 'ASC')
//   .limit(10)
//   .build();
// console.log(query);

console.log('\n--- 問題 15: Dependency Injection ---');
// const db: IDatabase = { query: (sql) => [] };
// const logger: ILogger = { log: (msg) => console.log(msg) };
// const container = new DIContainer();
// container.register('database', db);
// container.register('logger', logger);
// const userService = new UserService(
//   container.get<IDatabase>('database'),
//   container.get<ILogger>('logger')
// );
// userService.createUser('太郎');
