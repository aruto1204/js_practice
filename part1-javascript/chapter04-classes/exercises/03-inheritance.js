/**
 * 練習問題 3: 継承
 *
 * この練習問題では、extends と super を使った継承を学びます。
 */

// 問題 1: 動物クラスの継承
// 要件:
// - Animal クラスを作成（name プロパティ、speak() と move() メソッド）
// - Dog クラスを Animal から継承
//   - breed プロパティを追加
//   - speak() をオーバーライドして「ワンワン」と鳴くようにする
//   - fetch() メソッドを追加
// - Cat クラスを Animal から継承
//   - color プロパティを追加
//   - speak() をオーバーライドして「ニャー」と鳴くようにする
//   - scratch() メソッドを追加
//
// 使用例:
// const dog = new Dog('ポチ', '柴犬');
// dog.speak(); // 'ポチ がワンワン鳴いています！'
// dog.fetch(); // 'ポチ がボールを取ってきます。'

class Animal {
  // ここにコードを書いてください
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} が鳴いています。`);
  }

  move() {
    console.log(`${this.name} が移動しています。`);
  }
}

class Dog extends Animal {
  // ここにコードを書いてください
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    console.log(`${this.name} がワンワン鳴いています！`);
  }

  fetch() {
    console.log(`${this.name} がボールを取ってきます。`);
  }
}

class Cat extends Animal {
  // ここにコードを書いてください
  constructor(name, color) {
    super(name);
    this.color = color;
  }

  speak() {
    console.log(`${this.name} がニャー鳴いています！`);
  }

  scratch() {
    console.log(`${this.name} が爪を研いでいます。`);
  }
}

// テスト
console.log('=== 問題 1 のテスト ===');
const dog = new Dog('ポチ', '柴犬');
dog.speak();
dog.move();
dog.fetch();
console.log('犬種:', dog.breed);

const cat = new Cat('タマ', '白');
cat.speak();
cat.move();
cat.scratch();
console.log('色:', cat.color);
console.log('');

// 問題 2: 図形クラスの継承
// 要件:
// - Shape クラスを作成（name プロパティ、getInfo() メソッド）
// - Rectangle クラスを Shape から継承
//   - width, height プロパティを追加
//   - getArea() メソッドで面積を計算
//   - getPerimeter() メソッドで周囲の長さを計算
// - Circle クラスを Shape から継承
//   - radius プロパティを追加
//   - getArea() メソッドで面積を計算
//   - getCircumference() メソッドで円周を計算
//
// 使用例:
// const rect = new Rectangle(10, 5);
// console.log(rect.getArea()); // 50
// console.log(rect.getPerimeter()); // 30

class Shape {
  // ここにコードを書いてください
  constructor(name) {
    this.name = name;
  }

  getInfo() {
    return `${this.name} は図形です。`;
  }
}

class Rectangle extends Shape {
  // ここにコードを書いてください
  constructor(width, height) {
    super('長方形');
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }

  getPerimeter() {
    return 2 * (this.width + this.height);
  }
}

class Circle extends Shape {
  // ここにコードを書いてください
  constructor(radius) {
    super('円');
    this.radius = radius;
  }

  getArea() {
    return Math.PI * this.radius ** 2;
  }

  getCircumference() {
    return 2 * Math.PI * this.radius;
  }
}

// テスト
console.log('=== 問題 2 のテスト ===');
const rect = new Rectangle(10, 5);
console.log(rect.getInfo());
console.log('面積:', rect.getArea());
console.log('周囲の長さ:', rect.getPerimeter());

const circle = new Circle(7);
console.log(circle.getInfo());
console.log('面積:', circle.getArea().toFixed(2));
console.log('円周:', circle.getCircumference().toFixed(2));
console.log('');

// 問題 3: 従業員クラスの継承
// 要件:
// - Person クラスを作成（name, age プロパティ、introduce() メソッド）
// - Employee クラスを Person から継承
//   - employeeId, department プロパティを追加
//   - introduce() をオーバーライドして、親の introduce() も呼び出す
//   - getEmployeeInfo() メソッドを追加
// - Manager クラスを Employee から継承
//   - teamSize プロパティを追加
//   - introduce() をオーバーライド
//   - getTeamInfo() メソッドを追加
//
// 使用例:
// const employee = new Employee('太郎', 30, 'E001', '営業部');
// employee.introduce();
// // '太郎と申します。30歳です。'
// // '社員ID: E001、所属: 営業部'

class Person {
  // ここにコードを書いてください
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    console.log(`${this.name} と申します。${this.age}歳です。`);
  }
}

class Employee extends Person {
  // ここにコードを書いてください
  constructor(name, age, employeeId, department) {
    super(name, age);
    this.employeeId = employeeId;
    this.department = department;
  }

  introduce() {
    super.introduce();
    console.log(`社員ID: ${this.employeeId}、所属: ${this.department}`);
  }

  getEmployeeInfo() {
    return `${this.employeeId} - ${this.name} (${this.department})`;
  }
}

class Manager extends Employee {
  // ここにコードを書いてください
  constructor(name, age, employeeId, department, teamSize) {
    super(name, age, employeeId, department);
    this.teamSize = teamSize;
  }

  introduce() {
    super.introduce();
    console.log(`マネージャーとして${this.teamSize}人のチームを率いています。`);
  }

  getTeamInfo() {
    return `チームサイズ: ${this.teamSize}人`;
  }
}

// テスト
console.log('=== 問題 3 のテスト ===');
const person = new Person('一般人', 25);
person.introduce();
console.log('');

const employee = new Employee('太郎', 30, 'E001', '営業部');
employee.introduce();
console.log(employee.getEmployeeInfo());
console.log('');

const manager = new Manager('花子', 35, 'M001', '開発部', 5);
manager.introduce();
console.log(manager.getTeamInfo());
console.log('');

// 問題 4: 乗り物クラスの継承
// 要件:
// - Vehicle クラスを作成（brand, model, year プロパティ、getInfo() メソッド）
// - Car クラスを Vehicle から継承
//   - numDoors プロパティを追加
//   - start() メソッドを実装
// - Motorcycle クラスを Vehicle から継承
//   - type（'スポーツ', 'ツーリング' など）プロパティを追加
//   - start() メソッドを実装（Car とは異なるメッセージ）
// - ElectricCar クラスを Car から継承
//   - batteryCapacity プロパティを追加
//   - start() をオーバーライド（電気自動車特有のメッセージ）
//   - charge() メソッドを追加
//
// 使用例:
// const car = new Car('Toyota', 'Corolla', 2020, 4);
// car.start(); // 'Toyota Corolla のエンジンを始動します。'

class Vehicle {
  // ここにコードを書いてください
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  getInfo() {
    return `${this.year}年式 ${this.brand} ${this.model}`;
  }
}

class Car extends Vehicle {
  // ここにコードを書いてください
  constructor(brand, model, year, numDoors) {
    super(brand, model, year);
    this.numDoors = numDoors;
  }

  start() {
    console.log(`${this.brand} ${this.model} のエンジンを始動します。`);
  }
}

class Motorcycle extends Vehicle {
  // ここにコードを書いてください
  constructor(brand, model, year, type) {
    super(brand, model, year);
    this.type = type;
  }

  start() {
    console.log(`${this.brand} ${this.model} のエンジンを始動します。バイクを楽しみましょう！`);
  }
}

class ElectricCar extends Car {
  // ここにコードを書いてください
  constructor(brand, model, year, numDoors, batteryCapacity) {
    super(brand, model, year, numDoors);
    this.batteryCapacity = batteryCapacity;
  }

  start() {
    console.log(`${this.brand} ${this.model} の電源をオンにします。静かに発進します。`);
  }

  charge() {
    console.log(`バッテリーを充電中... (容量: ${this.batteryCapacity}kWh)`);
  }
}

// テスト
console.log('=== 問題 4 のテスト ===');
const car = new Car('Toyota', 'Corolla', 2020, 4);
console.log(car.getInfo());
car.start();

const motorcycle = new Motorcycle('Harley-Davidson', 'Street 750', 2019, 'ツーリング');
console.log(motorcycle.getInfo());
motorcycle.start();

const electricCar = new ElectricCar('Tesla', 'Model 3', 2023, 4, 75);
console.log(electricCar.getInfo());
electricCar.start();
electricCar.charge();
console.log('');

// 問題 5: アカウントクラスの継承
// 要件:
// - Account クラスを作成（accountNumber, balance プロパティ、deposit(), getBalance() メソッド）
// - SavingsAccount クラスを Account から継承
//   - interestRate プロパティを追加
//   - addInterest() メソッドで利息を追加
// - CheckingAccount クラスを Account から継承
//   - overdraftLimit プロパティを追加（マイナス残高の上限）
//   - withdraw(amount) メソッドを実装（overdraftLimit まで引き出し可能）
//
// 使用例:
// const savings = new SavingsAccount('S001', 10000, 0.03);
// savings.addInterest();
// console.log(savings.getBalance()); // 10300

class Account {
  // ここにコードを書いてください
  constructor(accountNumber, balance = 0) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new Error('入金額は正の数である必要があります');
    }
    this.balance += amount;
  }

  getBalance() {
    return this.balance;
  }
}

class SavingsAccount extends Account {
  // ここにコードを書いてください
  constructor(accountNumber, balance, interestRate) {
    super(accountNumber, balance);
    this.interestRate = interestRate;
  }

  addInterest() {
    this.balance += this.balance * this.interestRate;
  }
}

class CheckingAccount extends Account {
  // ここにコードを書いてください
  constructor(accountNumber, balance, overdraftLimit) {
    super(accountNumber, balance);
    this.overdraftLimit = overdraftLimit;
  }

  withdraw(amount) {
    if (amount <= 0) {
      throw new Error('出金額は正の数である必要があります');
    }
    if (this.balance - amount < -this.overdraftLimit) {
      throw new Error(`引き出し限度額を超えています（限度額: ¥${this.overdraftLimit}）`);
    }
    this.balance -= amount;
  }
}

// テスト
console.log('=== 問題 5 のテスト ===');
const savings = new SavingsAccount('S001', 10000, 0.03);
console.log('貯蓄口座の初期残高:', savings.getBalance());
savings.addInterest();
console.log('利息追加後の残高:', savings.getBalance());
savings.deposit(5000);
console.log('入金後の残高:', savings.getBalance());

const checking = new CheckingAccount('C001', 5000, 4000);
console.log('\n当座預金口座の初期残高:', checking.getBalance());
checking.withdraw(6000);
console.log('6000円引き出し後の残高:', checking.getBalance());
checking.withdraw(3000);
console.log('さらに3000円引き出し後の残高:', checking.getBalance());

try {
  checking.withdraw(1000); // 限度額超過
  console.log('1000円引き出し後の残高:', checking.getBalance());
} catch (error) {
  console.log('エラー:', error.message);
}
console.log('');
