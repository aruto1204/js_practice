/**
 * 練習問題 1: クラスの基本とコンストラクタ
 *
 * この練習問題では、クラスの基本的な定義とコンストラクタの使い方を学びます。
 */

// 問題 1: Book クラスを作成
// 要件:
// - title, author, year をプロパティとして持つ
// - コンストラクタでこれらのプロパティを初期化する
// - getInfo() メソッドで「タイトル (著者, 年)」の形式で情報を返す
//
// 使用例:
// const book = new Book('吾輩は猫である', '夏目漱石', 1905);
// console.log(book.getInfo()); // '吾輩は猫である (夏目漱石, 1905)'

class Book {
  // ここにコードを書いてください
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  getInfo() {
    return `${this.title} (${this.author}, ${this.year})`;
  }
}

// テスト
console.log('=== 問題 1 のテスト ===');
const book1 = new Book('吾輩は猫である', '夏目漱石', 1905);
const book2 = new Book('人間失格', '太宰治', 1948);
console.log(book1.getInfo());
console.log(book2.getInfo());
console.log('');

// 問題 2: Student クラスを作成
// 要件:
// - name, age, grade をプロパティとして持つ
// - grade はデフォルト値を 1 とする
// - introduce() メソッドで自己紹介を出力する
//   （例: 「こんにちは、太郎です。20歳、2年生です。」）
//
// 使用例:
// const student1 = new Student('太郎', 20, 2);
// student1.introduce(); // 'こんにちは、太郎です。20歳、2年生です。'
// const student2 = new Student('花子', 18);
// student2.introduce(); // 'こんにちは、花子です。18歳、1年生です。'

class Student {
  // ここにコードを書いてください
  constructor(name, age, grade = 1) {
    this.name = name;
    this.age = age;
    this.grade = grade;
  }

  introduce() {
    console.log(`こんにちは、${this.name}です。${this.age}歳、${this.grade}年生です。`);
  }
}

// テスト
console.log('=== 問題 2 のテスト ===');
const student1 = new Student('太郎', 20, 2);
student1.introduce();
const student2 = new Student('花子', 18);
student2.introduce();
console.log('');

// 問題 3: Counter クラスを作成
// 要件:
// - count プロパティを持ち、初期値は 0
// - コンストラクタで初期値を設定できるようにする（デフォルトは 0）
// - increment() メソッドで count を 1 増やす
// - decrement() メソッドで count を 1 減らす
// - reset() メソッドで count を 0 に戻す
// - getValue() メソッドで現在の count を返す
//
// 使用例:
// const counter = new Counter();
// counter.increment();
// counter.increment();
// console.log(counter.getValue()); // 2
// counter.decrement();
// console.log(counter.getValue()); // 1
// counter.reset();
// console.log(counter.getValue()); // 0

class Counter {
  // ここにコードを書いてください
  constructor(initialValue = 0) {
    this.count = initialValue;
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  reset() {
    this.count = 0;
  }

  getValue() {
    return this.count;
  }
}

// テスト
console.log('=== 問題 3 のテスト ===');
const counter1 = new Counter();
counter1.increment();
counter1.increment();
counter1.increment();
console.log('カウント:', counter1.getValue()); // 3
counter1.decrement();
console.log('カウント:', counter1.getValue()); // 2
counter1.reset();
console.log('カウント:', counter1.getValue()); // 0

const counter2 = new Counter(10);
console.log('初期値 10 のカウント:', counter2.getValue()); // 10
counter2.increment();
console.log('カウント:', counter2.getValue()); // 11
console.log('');

// 問題 4: TodoItem クラスを作成
// 要件:
// - title, completed をプロパティとして持つ
// - completed の初期値は false
// - toggle() メソッドで completed を反転させる
// - getStatus() メソッドで「[完了] タイトル」または「[未完了] タイトル」を返す
//
// 使用例:
// const todo = new TodoItem('JavaScript を学ぶ');
// console.log(todo.getStatus()); // '[未完了] JavaScript を学ぶ'
// todo.toggle();
// console.log(todo.getStatus()); // '[完了] JavaScript を学ぶ'

class TodoItem {
  // ここにコードを書いてください
  constructor(title, completed = false) {
    this.title = title;
    this.completed = completed;
  }

  getStatus() {
    return this.completed ? `[完了] ${this.title}` : `[未完了] ${this.title}`;
  }

  toggle() {
    this.completed = !this.completed;
  }
}

// テスト
console.log('=== 問題 4 のテスト ===');
const todo1 = new TodoItem('JavaScript を学ぶ');
console.log(todo1.getStatus()); // '[未完了] JavaScript を学ぶ'
todo1.toggle();
console.log(todo1.getStatus()); // '[完了] JavaScript を学ぶ'
todo1.toggle();
console.log(todo1.getStatus()); // '[未完了] JavaScript を学ぶ'

const todo2 = new TodoItem('TypeScript を学ぶ');
console.log(todo2.getStatus()); // '[未完了] TypeScript を学ぶ'
console.log('');

// 問題 5: Point クラスを作成
// 要件:
// - x, y 座標をプロパティとして持つ
// - distanceFromOrigin() メソッドで原点 (0, 0) からの距離を計算して返す
//   （ヒント: √(x² + y²) を計算）
// - distanceTo(otherPoint) メソッドで他の Point との距離を計算して返す
//   （ヒント: √((x2-x1)² + (y2-y1)²) を計算）
//
// 使用例:
// const point1 = new Point(3, 4);
// console.log(point1.distanceFromOrigin()); // 5
// const point2 = new Point(0, 0);
// console.log(point1.distanceTo(point2)); // 5

class Point {
  // ここにコードを書いてください
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceFromOrigin() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  distanceTo(otherPoint) {
    return Math.sqrt((this.x - otherPoint.x) ** 2 + (this.y - otherPoint.y) ** 2);
  }
}

// テスト
console.log('=== 問題 5 のテスト ===');
const point1 = new Point(3, 4);
console.log('原点からの距離:', point1.distanceFromOrigin()); // 5

const point2 = new Point(0, 0);
const point3 = new Point(6, 8);
console.log('point1 から point2 までの距離:', point1.distanceTo(point2)); // 5
console.log('point1 から point3 までの距離:', point1.distanceTo(point3)); // 5
console.log('');
