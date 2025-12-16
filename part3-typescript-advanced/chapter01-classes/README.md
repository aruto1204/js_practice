# Chapter 1: クラスの型定義

TypeScript のクラスにおける型注釈、アクセス修飾子、抽象クラス、インターフェース実装について学びます。

## 目次

1. [クラスの型注釈](#1-クラスの型注釈)
2. [アクセス修飾子](#2-アクセス修飾子)
3. [抽象クラス](#3-抽象クラス)
4. [implements によるインターフェース実装](#4-implements-によるインターフェース実装)

---

## 1. クラスの型注釈

### 1.1 プロパティとメソッドの型

TypeScript では、クラスのプロパティとメソッドに型を付けることができます。

```typescript
class Person {
  // プロパティの型注釈
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // メソッドの戻り値の型注釈
  greet(): string {
    return `こんにちは、${this.name}です`;
  }

  // メソッドの引数と戻り値の型注釈
  getYearsUntil(targetAge: number): number {
    return targetAge - this.age;
  }
}

const person = new Person('太郎', 25);
console.log(person.greet()); // "こんにちは、太郎です"
console.log(person.getYearsUntil(30)); // 5
```

### 1.2 オプショナルプロパティと初期化

```typescript
class User {
  name: string;
  email: string;
  age?: number; // オプショナルプロパティ

  // プロパティの初期化を含むコンストラクタ
  constructor(name: string, email: string, age?: number) {
    this.name = name;
    this.email = email;
    this.age = age;
  }
}

const user1 = new User('太郎', 'taro@example.com', 25);
const user2 = new User('花子', 'hanako@example.com'); // age は省略可能
```

### 1.3 読み取り専用プロパティ

```typescript
class Config {
  readonly apiUrl: string;
  readonly timeout: number = 3000; // 初期値を設定

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  // エラー: readonly プロパティは再代入できない
  // updateUrl(newUrl: string) {
  //   this.apiUrl = newUrl; // Error!
  // }
}

const config = new Config('https://api.example.com');
// config.apiUrl = 'https://newapi.com'; // Error!
```

### 1.4 パラメータプロパティ

コンストラクタのパラメータにアクセス修飾子を付けることで、プロパティの宣言と初期化を同時に行えます。

```typescript
class Product {
  // パラメータプロパティ（簡潔な書き方）
  constructor(
    public name: string,
    public price: number,
    private stock: number = 0
  ) {}

  getInfo(): string {
    return `${this.name}: ${this.price}円`;
  }

  isAvailable(): boolean {
    return this.stock > 0;
  }
}

// 上記は下記と同じ意味
// class Product {
//   public name: string;
//   public price: number;
//   private stock: number;
//
//   constructor(name: string, price: number, stock: number = 0) {
//     this.name = name;
//     this.price = price;
//     this.stock = stock;
//   }
// }

const product = new Product('ノートPC', 100000, 5);
console.log(product.name); // "ノートPC"
// console.log(product.stock); // Error: private プロパティ
```

---

## 2. アクセス修飾子

TypeScript には 3 つのアクセス修飾子があります。

### 2.1 public（デフォルト）

どこからでもアクセス可能です。明示的に指定しない場合は `public` になります。

```typescript
class Counter {
  public count: number = 0;

  public increment(): void {
    this.count++;
  }

  public getCount(): number {
    return this.count;
  }
}

const counter = new Counter();
counter.increment();
console.log(counter.count); // 0 → 1（外部からアクセス可能）
```

### 2.2 private

クラス内部からのみアクセス可能です。

```typescript
class BankAccount {
  private balance: number = 0;

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  withdraw(amount: number): boolean {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount();
account.deposit(1000);
console.log(account.getBalance()); // 1000
// console.log(account.balance); // Error: private プロパティ
```

### 2.3 protected

クラス内部とサブクラスからアクセス可能です。

```typescript
class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  protected makeSound(): void {
    console.log('何か音を出す');
  }
}

class Dog extends Animal {
  bark(): void {
    // protected プロパティとメソッドにアクセス可能
    console.log(`${this.name}がワンワン！`);
    this.makeSound();
  }
}

const dog = new Dog('ポチ');
dog.bark(); // "ポチがワンワン！"
// console.log(dog.name); // Error: protected プロパティ
// dog.makeSound(); // Error: protected メソッド
```

### 2.4 アクセス修飾子の比較

| 修飾子 | クラス内 | サブクラス | 外部 |
|--------|----------|-----------|------|
| public | ⭕ | ⭕ | ⭕ |
| protected | ⭕ | ⭕ | ❌ |
| private | ⭕ | ❌ | ❌ |

---

## 3. 抽象クラス

抽象クラスは、他のクラスの基底クラスとしてのみ使用され、直接インスタンス化できません。

### 3.1 抽象クラスの定義

```typescript
abstract class Shape {
  constructor(public color: string) {}

  // 抽象メソッド（実装を持たない）
  abstract getArea(): number;
  abstract getPerimeter(): number;

  // 通常のメソッド（実装を持つ）
  describe(): string {
    return `この図形は${this.color}色です`;
  }
}

// const shape = new Shape('赤'); // Error: 抽象クラスはインスタンス化できない
```

### 3.2 抽象クラスの継承

```typescript
class Circle extends Shape {
  constructor(color: string, public radius: number) {
    super(color);
  }

  // 抽象メソッドを実装
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(
    color: string,
    public width: number,
    public height: number
  ) {
    super(color);
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const circle = new Circle('赤', 5);
console.log(circle.describe()); // "この図形は赤色です"
console.log(circle.getArea()); // 78.53...

const rectangle = new Rectangle('青', 10, 5);
console.log(rectangle.getArea()); // 50
```

### 3.3 抽象クラスの利用シーン

抽象クラスは以下のような場合に有用です：

- 共通の基底実装を持ちながら、一部のメソッドを派生クラスで実装させたい
- 継承階層を設計し、派生クラスに特定のメソッドの実装を強制したい

```typescript
abstract class DataProcessor {
  // テンプレートメソッドパターン
  process(data: string): string {
    const validated = this.validate(data);
    const transformed = this.transform(validated);
    return this.output(transformed);
  }

  // 抽象メソッド（派生クラスで実装）
  protected abstract validate(data: string): string;
  protected abstract transform(data: string): string;
  protected abstract output(data: string): string;
}

class JsonProcessor extends DataProcessor {
  protected validate(data: string): string {
    JSON.parse(data); // JSON として妥当か検証
    return data;
  }

  protected transform(data: string): string {
    const obj = JSON.parse(data);
    return JSON.stringify(obj, null, 2); // 整形
  }

  protected output(data: string): string {
    return `JSON Output:\n${data}`;
  }
}

const processor = new JsonProcessor();
const result = processor.process('{"name":"太郎","age":25}');
console.log(result);
```

---

## 4. implements によるインターフェース実装

`implements` キーワードを使って、クラスがインターフェースを実装していることを宣言できます。

### 4.1 基本的なインターフェース実装

```typescript
interface Printable {
  print(): void;
}

interface Saveable {
  save(filename: string): void;
}

class Document implements Printable, Saveable {
  constructor(public content: string) {}

  print(): void {
    console.log(this.content);
  }

  save(filename: string): void {
    console.log(`${filename}に保存しました`);
  }
}

const doc = new Document('重要な文書');
doc.print(); // "重要な文書"
doc.save('document.txt'); // "document.txtに保存しました"
```

### 4.2 インターフェースと抽象クラスの違い

| | インターフェース | 抽象クラス |
|---|----------------|----------|
| 多重継承/実装 | 複数実装可能 | 単一継承のみ |
| 実装の有無 | 実装を持てない | 実装を持てる |
| アクセス修飾子 | 使えない | 使える |
| コンストラクタ | 定義できない | 定義できる |

```typescript
// インターフェース：複数実装可能
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Duck implements Flyable, Swimmable {
  fly(): void {
    console.log('飛ぶ');
  }

  swim(): void {
    console.log('泳ぐ');
  }
}

// 抽象クラス：実装を持てる
abstract class Bird {
  constructor(public name: string) {}

  // 共通の実装
  eat(): void {
    console.log(`${this.name}が食べる`);
  }

  // 抽象メソッド
  abstract makeSound(): void;
}

class Sparrow extends Bird {
  makeSound(): void {
    console.log('チュンチュン');
  }
}
```

### 4.3 インターフェースとクラスの組み合わせ

```typescript
interface Logger {
  log(message: string): void;
}

abstract class BaseService {
  constructor(protected logger: Logger) {}

  protected logOperation(operation: string): void {
    this.logger.log(`Operation: ${operation}`);
  }
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}

class UserService extends BaseService {
  createUser(name: string): void {
    this.logOperation(`Creating user: ${name}`);
    // ユーザー作成処理...
  }
}

const logger = new ConsoleLogger();
const userService = new UserService(logger);
userService.createUser('太郎'); // "[LOG] Operation: Creating user: 太郎"
```

### 4.4 型としてのインターフェース活用

```typescript
interface Comparable<T> {
  compareTo(other: T): number;
}

class Version implements Comparable<Version> {
  constructor(
    public major: number,
    public minor: number,
    public patch: number
  ) {}

  compareTo(other: Version): number {
    if (this.major !== other.major) {
      return this.major - other.major;
    }
    if (this.minor !== other.minor) {
      return this.minor - other.minor;
    }
    return this.patch - other.patch;
  }

  toString(): string {
    return `${this.major}.${this.minor}.${this.patch}`;
  }
}

function sortVersions(versions: Comparable<Version>[]): void {
  versions.sort((a, b) => a.compareTo(b as Version));
}

const versions = [
  new Version(1, 2, 0),
  new Version(2, 0, 0),
  new Version(1, 1, 5),
];

sortVersions(versions);
versions.forEach(v => console.log(v.toString()));
// 1.1.5
// 1.2.0
// 2.0.0
```

---

## まとめ

このチャプターで学んだこと：

1. **クラスの型注釈**: プロパティ、メソッド、パラメータプロパティ
2. **アクセス修飾子**: `public`, `private`, `protected` の使い分け
3. **抽象クラス**: 基底クラスとしての役割、抽象メソッドの強制実装
4. **インターフェース実装**: `implements` による契約の実装、複数インターフェースの実装

次のステップ：
- `exercises/` フォルダの練習問題に取り組む
- 実際のプロジェクトでクラスの型定義を活用する
- 次のチャプター（高度な型操作）に進む
