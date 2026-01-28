/**
 * Part 3 - Chapter 1: クラスの型定義
 * 演習 1: クラスの型注釈
 */

/* 問題 1: 基本的なクラスの型注釈
 * Book クラスを作成してください。
 * - プロパティ: title (string), author (string), pages (number)
 * - メソッド: getInfo() - 本の情報を文字列で返す
 */

// ここに実装

class Book {
  title: string;
  author: string;
  pages: number;

  constructor(title: string, author: string, pages: number) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }

  getInfo(): string {
    return `「${this.title}」著者: ${this.author}, ページ数: ${this.pages}`;
  }
}

/* 問題 2: オプショナルプロパティ
 * Employee クラスを作成してください。
 * - プロパティ: name (string), department (string), phoneNumber (オプショナル: string)
 * - メソッド: getContact() - 連絡先情報を返す（電話番号がある場合のみ含める）
 */

// ここに実装

class Employee {
  name: string;
  department: string;
  phoneNumber?: string; // オプショナルプロパテ


  constructor(name: string, department: string, phoneNumber?: string) {
    this.name = name;
    this.department = department;
    this.phoneNumber = phoneNumber;
  }

  getContact(): string {
    return `連絡先: ${this.phoneNumber ? `電話番号: ${this.phoneNumber}` : '電話番号なし'}`;
  }
}

/* 問題 3: readonly プロパティ
 * Car クラスを作成してください。
 * - プロパティ: vin (readonly string), model (string), year (readonly number)
 * - コンストラクタで vin と year を初期化
 * - メソッド: getAge(currentYear: number): number - 車齢を返す
 */

// ここに実装

class Car {
  readonly vin: string; // 車両識別番号（変更不可）
  model: string;
  readonly year: number; // 年式（変更不可）

  constructor(vin: string, model: string, year: number) {
    this.vin = vin;
    this.model = model;
    this.year = year;
  }

  getAge(currentYear: number): number {
    return currentYear - this.year;
  }
}

/* 問題 4: パラメータプロパティ
 * Point クラスを作成してください。
 * - パラメータプロパティを使用して x (public number) と y (public number) を定義
 * - メソッド: distanceFromOrigin(): number - 原点からの距離を返す
 * - メソッド: distanceTo(other: Point): number - 他の点との距離を返す
 */

// ここに実装

class Point {
  constructor(public x: number, public y: number) {}

  distanceFromOrigin(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  distanceTo(other: Point): number {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }
}


/* 問題 5: 複数のメソッド型注釈
 * Calculator クラスを作成してください。
 * - プロパティ: result (private number) - 初期値は 0
 * - メソッド: add(value: number): Calculator - 加算してthisを返す（メソッドチェーン用）
 * - メソッド: subtract(value: number): Calculator - 減算してthisを返す
 * - メソッド: multiply(value: number): Calculator - 乗算してthisを返す
 * - メソッド: divide(value: number): Calculator - 除算してthisを返す（0除算チェック）
 * - メソッド: getResult(): number - 現在の結果を返す
 * - メソッド: clear(): Calculator - 結果を0にリセット
 */

// ここに実装

class Calculator {
  private result: number = 0; // 計算結果を保持するプライベートプロパティ

  // 加算メソッド（this を返すことでメソッドチェーンが可能）
  add(value: number): Calculator {
    this.result += value;
    return this;
  }

  // 減算メソッド
  subtract(value: number): Calculator {
    this.result -= value;
    return this;
  }

  // 乗算メソッド
  multiply(value: number): Calculator {
    this.result *= value;
    return this;
  }

  // 除算メソッド（0除算チェック付き）
  divide(value: number): Calculator {
    if (value === 0) {
      throw new Error('0で除算することはできません');
    }
    this.result /= value;
    return this;
  }

  // 現在の結果を取得
  getResult(): number {
    return this.result;
  }

  // 結果をリセット
  clear(): Calculator {
    this.result = 0;
    return this;
  }
}

/* 問題 6: getter と setter
 * Temperature クラスを作成してください。
 * - プロパティ: celsius (private number)
 * - getter: celsius - 摂氏温度を返す
 * - setter: celsius - 摂氏温度を設定
 * - getter: fahrenheit - 華氏温度を返す (F = C * 9/5 + 32)
 * - setter: fahrenheit - 華氏温度から摂氏に変換して設定
 */

// ここに実装

class Temperature {
  private _celsius: number = 0; // 内部的に摂氏で保持

  // 摂氏の getter
  get celsius(): number {
    return this._celsius;
  }

  // 摂氏の setter
  set celsius(value: number) {
    this._celsius = value;
  }

  // 華氏の getter（摂氏から華氏に変換）
  get fahrenheit(): number {
    return this._celsius * 9 / 5 + 32;
  }

  // 華氏の setter（華氏から摂氏に変換）
  set fahrenheit(value: number) {
    this._celsius = (value - 32) * 5 / 9;
  }
}

/* 問題 7: 静的メンバー
 * MathUtils クラスを作成してください。
 * - 静的プロパティ: PI (readonly number) = 3.14159
 * - 静的メソッド: circleArea(radius: number): number - 円の面積
 * - 静的メソッド: circleCircumference(radius: number): number - 円の円周
 * - 静的メソッド: rectangleArea(width: number, height: number): number - 長方形の面積
 */

// ここに実装

class MathUtils {
  static readonly PI: number = 3.14159; // 静的な定数

  // 円の面積を計算
  static circleArea(radius: number): number {
    return MathUtils.PI * radius ** 2;
  }

  // 円の円周を計算
  static circleCircumference(radius: number): number {
    return 2 * MathUtils.PI * radius;
  }

  // 長方形の面積を計算
  static rectangleArea(width: number, height: number): number {
    return width * height;
  }
}


/* 問題 8: プライベートコンストラクタとシングルトンパターン
 * DatabaseConnection クラスを作成してください。
 * - プロパティ: private static instance (DatabaseConnection | null)
 * - プロパティ: private connectionString (string)
 * - プライベートコンストラクタ
 * - 静的メソッド: getInstance(connectionString: string): DatabaseConnection
 * - メソッド: connect(): void - "Connected to: {connectionString}" を出力
 */

// ここに実装

class DatabaseConnection {
  private static instance: DatabaseConnection | null = null;
  private connectionString: string;

  // プライベートコンストラクタ（外部から new できない）
  private constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  // インスタンスを取得（存在しない場合は作成）
  static getInstance(connectionString: string): DatabaseConnection {
    if (DatabaseConnection.instance === null) {
      DatabaseConnection.instance = new DatabaseConnection(connectionString);
    }
    return DatabaseConnection.instance;
  }

  // データベースに接続
  connect(): void {
    console.log(`Connected to: ${this.connectionString}`);
  }
}

/* 問題 9: 配列型プロパティ
 * Playlist クラスを作成してください。
 * - プロパティ: name (string), songs (private string[])
 * - メソッド: addSong(song: string): void - 曲を追加
 * - メソッド: removeSong(song: string): boolean - 曲を削除（成功時true）
 * - メソッド: getSongs(): readonly string[] - 曲のリストを返す（読み取り専用）
 * - メソッド: getSongCount(): number - 曲数を返す
 */

// ここに実装
class Playlist {
  name: string;
  private songs: string[] = []; // プライベートな配列

  constructor(name: string) {
    this.name = name;
  }

  // 曲を追加
  addSong(song: string): void {
    this.songs.push(song);
  }

  // 曲を削除（削除成功時は true を返す）
  removeSong(song: string): boolean {
    const index = this.songs.indexOf(song);
    if (index !== -1) {
      this.songs.splice(index, 1);
      return true;
    }
    return false;
  }

  // 曲のリストを取得（読み取り専用配列として返す）
  getSongs(): readonly string[] {
    return this.songs;
  }

  // 曲数を取得
  getSongCount(): number {
    return this.songs.length;
  }
}



/* 問題 10: ネストしたオブジェクト型
 * User クラスを作成してください。
 * - プロパティ: name (string)
 * - プロパティ: address (オブジェクト型: { street: string, city: string, zipCode: string })
 * - メソッド: getFullAddress(): string - 完全な住所を返す
 * - メソッド: updateAddress(newAddress: Partial<{ street: string, city: string, zipCode: string }>): void
 */

// ここに実装
class User {
  name: string;
  address: { street: string; city: string; zipCode: string };

  constructor(name: string, address: { street: string; city: string; zipCode: string }) {
    this.name = name;
    this.address = address;
  }

  // 完全な住所を文字列で返す
  getFullAddress(): string {
    return `〒${this.address.zipCode} ${this.address.city} ${this.address.street}`;
  }

  // 住所を部分的に更新（Partial を使用して一部のフィールドのみ更新可能）
  updateAddress(newAddress: Partial<{ street: string; city: string; zipCode: string }>): void {
    this.address = { ...this.address, ...newAddress };
  }
}


/* 問題 11: メソッドのオーバーロード（型定義のみ）
 * Formatter クラスを作成してください。
 * - format(value: string): string - 文字列をそのまま返す
 * - format(value: number): string - 数値を "Number: X" の形式で返す
 * - format(value: boolean): string - 真偽値を "Boolean: true/false" の形式で返す
 * - format(value: string[]): string - 配列を "Array: [a, b, c]" の形式で返す
 */

// ここに実装
class Formatter {
  // オーバーロードシグネチャ（型定義のみ）
  format(value: string): string;
  format(value: number): string;
  format(value: boolean): string;
  format(value: string[]): string;

  // 実装シグネチャ
  format(value: string | number | boolean | string[]): string {
    if (typeof value === 'string') {
      return value;
    } else if (typeof value === 'number') {
      return `Number: ${value}`;
    } else if (typeof value === 'boolean') {
      return `Boolean: ${value}`;
    } else if (Array.isArray(value)) {
      return `Array: [${value.join(', ')}]`;
    }
    return '';
  }
}


/* 問題 12: タプル型のプロパティ
 * Coordinate3D クラスを作成してください。
 * - プロパティ: position ([number, number, number])
 * - メソッド: getX(): number
 * - メソッド: getY(): number
 * - メソッド: getZ(): number
 * - メソッド: setPosition(x: number, y: number, z: number): void
 * - メソッド: distanceFromOrigin(): number
 */

// ここに実装


/* 問題 13: 関数型プロパティ
 * EventHandler クラスを作成してください。
 * - プロパティ: handler (private (event: string, data: any) => void | null)
 * - メソッド: setHandler(handler: (event: string, data: any) => void): void
 * - メソッド: trigger(event: string, data: any): void - ハンドラが設定されていれば実行
 * - メソッド: clearHandler(): void
 */

// ここに実装


/* 問題 14: インデックスシグネチャ
 * Dictionary クラスを作成してください。
 * - プロパティ: private items ({ [key: string]: string })
 * - メソッド: set(key: string, value: string): void
 * - メソッド: get(key: string): string | undefined
 * - メソッド: has(key: string): boolean
 * - メソッド: delete(key: string): boolean
 * - メソッド: keys(): string[]
 */

// ここに実装


/* 問題 15: ジェネリッククラス（基本）
 * Box<T> クラスを作成してください。
 * - プロパティ: private value (T | null)
 * - メソッド: set(value: T): void
 * - メソッド: get(): T | null
 * - メソッド: isEmpty(): boolean
 * - メソッド: clear(): void
 */

// ここに実装


// テストコード
console.log('--- 問題 1: Book ---');
const book = new Book('TypeScript入門', '山田太郎', 350);
console.log(book.getInfo());

console.log('\n--- 問題 2: Employee ---');
const emp1 = new Employee('佐藤花子', '開発部', '090-1234-5678');
const emp2 = new Employee('鈴木一郎', '営業部');
console.log(emp1.getContact());
console.log(emp2.getContact());

console.log('\n--- 問題 3: Car ---');
const car = new Car('1HGBH41JXMN109186', 'Toyota Camry', 2020);
console.log(car.getAge(2024));
// car.vin = 'new VIN'; // Error: readonly

console.log('\n--- 問題 4: Point ---');
const p1 = new Point(3, 4);
const p2 = new Point(0, 0);
console.log(p1.distanceFromOrigin());
console.log(p1.distanceTo(p2));

// console.log('\n--- 問題 5: Calculator ---');
const calc = new Calculator();
const result = calc.add(10).subtract(3).multiply(2).divide(2).getResult();
console.log(result); // 7

console.log('\n--- 問題 6: Temperature ---');
const temp = new Temperature();
temp.celsius = 25;
console.log(temp.fahrenheit); // 77
temp.fahrenheit = 86;
console.log(temp.celsius); // 30

console.log('\n--- 問題 7: MathUtils ---');
console.log(MathUtils.circleArea(5));
console.log(MathUtils.circleCircumference(5));
console.log(MathUtils.rectangleArea(4, 6));

console.log('\n--- 問題 8: DatabaseConnection ---');
const db1 = DatabaseConnection.getInstance('localhost:5432');
const db2 = DatabaseConnection.getInstance('localhost:3306');
console.log(db1 === db2); // true (同一インスタンス)
db1.connect();

console.log('\n--- 問題 9: Playlist ---');
const playlist = new Playlist('お気に入り');
playlist.addSong('曲1');
playlist.addSong('曲2');
console.log(playlist.getSongs());
console.log(playlist.getSongCount());
playlist.removeSong('曲1');
console.log(playlist.getSongs());

console.log('\n--- 問題 10: User ---');
const user = new User('田中太郎', { street: '1-2-3', city: '東京', zipCode: '100-0001' });
console.log(user.getFullAddress());
user.updateAddress({ city: '大阪' });
console.log(user.getFullAddress());

console.log('\n--- 問題 11: Formatter ---');
const formatter = new Formatter();
console.log(formatter.format('Hello'));
console.log(formatter.format(42));
console.log(formatter.format(true));
console.log(formatter.format(['a', 'b', 'c']));

// console.log('\n--- 問題 12: Coordinate3D ---');
// const coord = new Coordinate3D(3, 4, 5);
// console.log(coord.getX(), coord.getY(), coord.getZ());
// console.log(coord.distanceFromOrigin());
// coord.setPosition(1, 2, 2);
// console.log(coord.distanceFromOrigin());

// console.log('\n--- 問題 13: EventHandler ---');
// const eventHandler = new EventHandler();
// eventHandler.setHandler((event, data) => {
//   console.log(`Event: ${event}, Data: ${JSON.stringify(data)}`);
// });
// eventHandler.trigger('click', { x: 100, y: 200 });
// eventHandler.clearHandler();
// eventHandler.trigger('click', { x: 100, y: 200 }); // 何も起きない

// console.log('\n--- 問題 14: Dictionary ---');
// const dict = new Dictionary();
// dict.set('name', '太郎');
// dict.set('age', '25');
// console.log(dict.get('name'));
// console.log(dict.has('age'));
// console.log(dict.keys());
// dict.delete('age');
// console.log(dict.keys());

// console.log('\n--- 問題 15: Box ---');
// const numberBox = new Box<number>();
// numberBox.set(42);
// console.log(numberBox.get());
// console.log(numberBox.isEmpty());
// numberBox.clear();
// console.log(numberBox.isEmpty());
