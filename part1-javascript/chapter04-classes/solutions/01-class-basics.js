/**
 * 解答例 1: クラスの基本とコンストラクタ
 */

// 問題 1: Book クラスを作成
class Book {
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
class Student {
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
class Counter {
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
class TodoItem {
  constructor(title) {
    this.title = title;
    this.completed = false;
  }

  toggle() {
    this.completed = !this.completed;
  }

  getStatus() {
    const status = this.completed ? '完了' : '未完了';
    return `[${status}] ${this.title}`;
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
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceFromOrigin() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  distanceTo(otherPoint) {
    const dx = this.x - otherPoint.x;
    const dy = this.y - otherPoint.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
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
