/**
 * 解答例 3: 継承
 */

// 問題 1: 動物クラスの継承
class Animal {
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
class Shape {
  constructor(name) {
    this.name = name;
  }

  getInfo() {
    return `図形: ${this.name}`;
  }
}

class Rectangle extends Shape {
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
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    console.log(`${this.name}と申します。${this.age}歳です。`);
  }
}

class Employee extends Person {
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
class Vehicle {
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
  constructor(brand, model, year, numDoors) {
    super(brand, model, year);
    this.numDoors = numDoors;
  }

  start() {
    console.log(`${this.brand} ${this.model} のエンジンを始動します。`);
  }
}

class Motorcycle extends Vehicle {
  constructor(brand, model, year, type) {
    super(brand, model, year);
    this.type = type;
  }

  start() {
    console.log(`${this.brand} ${this.model} のエンジンを始動します。バイクを楽しみましょう！`);
  }
}

class ElectricCar extends Car {
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
class Account {
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
  constructor(accountNumber, balance, interestRate) {
    super(accountNumber, balance);
    this.interestRate = interestRate;
  }

  addInterest() {
    const interest = this.balance * this.interestRate;
    this.balance += interest;
  }
}

class CheckingAccount extends Account {
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

const checking = new CheckingAccount('C001', 5000, 3000);
console.log('\n当座預金口座の初期残高:', checking.getBalance());
checking.withdraw(6000);
console.log('6000円引き出し後の残高:', checking.getBalance());
checking.withdraw(3000);
console.log('さらに3000円引き出し後の残高:', checking.getBalance());

try {
  checking.withdraw(1000); // 限度額超過
} catch (error) {
  console.log('エラー:', error.message);
}
console.log('');
