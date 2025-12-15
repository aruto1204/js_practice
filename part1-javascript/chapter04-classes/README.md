# Chapter 4: クラスとオブジェクト指向

## 学習目標

- クラスの基本構文を理解する
- コンストラクタを使ったインスタンスの初期化をマスターする
- インスタンスメソッドとプロパティを実装する
- 継承（extends）を使ったクラスの拡張を理解する
- 静的メソッドとプロパティを活用する
- getter / setter でカプセル化を実現する

---

## 1. クラスの基本構文

### 1.1 クラスの定義

```javascript
// クラスの定義
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`こんにちは、${this.name}です。`);
  }
}

// インスタンスの作成
const user1 = new User('太郎', 25);
user1.greet(); // 'こんにちは、太郎です。'

console.log(user1.name); // '太郎'
console.log(user1.age); // 25
```

### 1.2 クラス式

```javascript
// クラス式（名前なし）
const User = class {
  constructor(name) {
    this.name = name;
  }
};

// クラス式（名前付き）
const User = class UserClass {
  constructor(name) {
    this.name = name;
  }
};
```

---

## 2. コンストラクタ

### 2.1 コンストラクタの役割

コンストラクタは、クラスからインスタンスを作成する際に自動的に呼び出される特別なメソッドです。

```javascript
class Product {
  constructor(name, price) {
    // インスタンスプロパティの初期化
    this.name = name;
    this.price = price;
    this.createdAt = new Date();
  }

  getInfo() {
    return `${this.name}: ¥${this.price}`;
  }
}

const product1 = new Product('ノートPC', 120000);
console.log(product1.getInfo()); // 'ノートPC: ¥120000'
console.log(product1.createdAt); // 現在の日時
```

### 2.2 デフォルト値の設定

```javascript
class User {
  constructor(name, age = 20, country = '日本') {
    this.name = name;
    this.age = age;
    this.country = country;
  }
}

const user1 = new User('太郎'); // age=20, country='日本'
const user2 = new User('花子', 25); // age=25, country='日本'
const user3 = new User('John', 30, 'USA'); // age=30, country='USA'

console.log(user1); // User { name: '太郎', age: 20, country: '日本' }
```

---

## 3. インスタンスメソッドとプロパティ

### 3.1 インスタンスメソッド

```javascript
class Calculator {
  constructor(initialValue = 0) {
    this.value = initialValue;
  }

  add(num) {
    this.value += num;
    return this; // メソッドチェーンのため
  }

  subtract(num) {
    this.value -= num;
    return this;
  }

  multiply(num) {
    this.value *= num;
    return this;
  }

  divide(num) {
    if (num === 0) {
      throw new Error('0で除算することはできません');
    }
    this.value /= num;
    return this;
  }

  getResult() {
    return this.value;
  }

  reset() {
    this.value = 0;
    return this;
  }
}

// メソッドチェーン
const calc = new Calculator(10);
const result = calc.add(5).multiply(2).subtract(10).getResult();
console.log(result); // 20
```

### 3.2 インスタンスプロパティ

```javascript
class BankAccount {
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
    this.transactions = [];
  }

  deposit(amount) {
    if (amount <= 0) {
      throw new Error('入金額は正の数である必要があります');
    }
    this.balance += amount;
    this.transactions.push({
      type: '入金',
      amount,
      date: new Date(),
    });
    console.log(`¥${amount} を入金しました。残高: ¥${this.balance}`);
  }

  withdraw(amount) {
    if (amount <= 0) {
      throw new Error('出金額は正の数である必要があります');
    }
    if (amount > this.balance) {
      throw new Error('残高が不足しています');
    }
    this.balance -= amount;
    this.transactions.push({
      type: '出金',
      amount,
      date: new Date(),
    });
    console.log(`¥${amount} を出金しました。残高: ¥${this.balance}`);
  }

  getBalance() {
    return this.balance;
  }

  getTransactionHistory() {
    return this.transactions;
  }
}

const account = new BankAccount('太郎', 10000);
account.deposit(5000); // '¥5000 を入金しました。残高: ¥15000'
account.withdraw(3000); // '¥3000 を出金しました。残高: ¥12000'
console.log(account.getBalance()); // 12000
```

---

## 4. 継承（extends）

### 4.1 基本的な継承

```javascript
// 親クラス（スーパークラス）
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

// 子クラス（サブクラス）
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 親クラスのコンストラクタを呼び出す
    this.breed = breed;
  }

  // メソッドのオーバーライド
  speak() {
    console.log(`${this.name} がワンワン鳴いています！`);
  }

  // 子クラス独自のメソッド
  fetch() {
    console.log(`${this.name} がボールを取ってきます。`);
  }
}

const dog = new Dog('ポチ', '柴犬');
dog.speak(); // 'ポチ がワンワン鳴いています！'
dog.move(); // 'ポチ が移動しています。'（親クラスのメソッド）
dog.fetch(); // 'ポチ がボールを取ってきます。'
console.log(dog.breed); // '柴犬'
```

### 4.2 super を使った親クラスのメソッド呼び出し

```javascript
class Cat extends Animal {
  constructor(name, color) {
    super(name);
    this.color = color;
  }

  speak() {
    super.speak(); // 親クラスのメソッドを呼び出す
    console.log(`${this.name} がニャーニャー鳴いています！`);
  }
}

const cat = new Cat('タマ', '白');
cat.speak();
// 'タマ が鳴いています。'
// 'タマ がニャーニャー鳴いています！'
```

### 4.3 複数レベルの継承

```javascript
class LivingThing {
  constructor(name) {
    this.name = name;
    this.isAlive = true;
  }

  breathe() {
    console.log(`${this.name} が呼吸しています。`);
  }
}

class Animal extends LivingThing {
  constructor(name, species) {
    super(name);
    this.species = species;
  }

  move() {
    console.log(`${this.name} が移動しています。`);
  }
}

class Bird extends Animal {
  constructor(name, species, wingSpan) {
    super(name, species);
    this.wingSpan = wingSpan;
  }

  fly() {
    console.log(`${this.name} が飛んでいます（翼幅: ${this.wingSpan}cm）`);
  }
}

const eagle = new Bird('イーグル', '鳥類', 200);
eagle.breathe(); // 'イーグル が呼吸しています。'（LivingThingから継承）
eagle.move(); // 'イーグル が移動しています。'（Animalから継承）
eagle.fly(); // 'イーグル が飛んでいます（翼幅: 200cm）'
```

---

## 5. 静的メソッドとプロパティ

### 5.1 静的メソッド

静的メソッドは、クラス自体に属するメソッドで、インスタンスを作成せずに呼び出せます。

```javascript
class MathUtils {
  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static divide(a, b) {
    if (b === 0) {
      throw new Error('0で除算することはできません');
    }
    return a / b;
  }
}

// インスタンスを作成せずに直接呼び出し
console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.multiply(4, 7)); // 28
```

### 5.2 静的プロパティ

```javascript
class User {
  static userCount = 0;
  static maxUsers = 100;

  constructor(name) {
    if (User.userCount >= User.maxUsers) {
      throw new Error('ユーザー数が上限に達しています');
    }
    this.name = name;
    this.id = ++User.userCount;
  }

  static getUserCount() {
    return User.userCount;
  }

  static resetCount() {
    User.userCount = 0;
  }
}

const user1 = new User('太郎');
const user2 = new User('花子');
const user3 = new User('次郎');

console.log(User.getUserCount()); // 3
console.log(user1.id); // 1
console.log(user2.id); // 2
console.log(user3.id); // 3
```

### 5.3 ファクトリーパターンでの活用

```javascript
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  // 静的ファクトリーメソッド
  static fromFahrenheit(fahrenheit) {
    const celsius = ((fahrenheit - 32) * 5) / 9;
    return new Temperature(celsius);
  }

  static fromKelvin(kelvin) {
    const celsius = kelvin - 273.15;
    return new Temperature(celsius);
  }

  toCelsius() {
    return this.celsius;
  }

  toFahrenheit() {
    return (this.celsius * 9) / 5 + 32;
  }

  toKelvin() {
    return this.celsius + 273.15;
  }
}

const temp1 = new Temperature(25); // 摂氏から作成
const temp2 = Temperature.fromFahrenheit(77); // 華氏から作成
const temp3 = Temperature.fromKelvin(298.15); // ケルビンから作成

console.log(temp1.toCelsius()); // 25
console.log(temp2.toCelsius()); // 25
console.log(temp3.toCelsius()); // 25
```

---

## 6. getter / setter

### 6.1 基本的な使い方

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // getter: プロパティのように値を取得
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // setter: プロパティのように値を設定
  set fullName(name) {
    const parts = name.split(' ');
    this.firstName = parts[0];
    this.lastName = parts[1];
  }
}

const person = new Person('太郎', '山田');

// getter の使用（メソッド呼び出しではなくプロパティアクセス）
console.log(person.fullName); // '太郎 山田'

// setter の使用
person.fullName = '花子 鈴木';
console.log(person.firstName); // '花子'
console.log(person.lastName); // '鈴木'
console.log(person.fullName); // '花子 鈴木'
```

### 6.2 データの検証

```javascript
class Rectangle {
  constructor(width, height) {
    this._width = width; // プライベート風のプロパティ（慣習的に_をつける）
    this._height = height;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    if (value <= 0) {
      throw new Error('幅は正の数である必要があります');
    }
    this._width = value;
  }

  get height() {
    return this._height;
  }

  set height(value) {
    if (value <= 0) {
      throw new Error('高さは正の数である必要があります');
    }
    this._height = value;
  }

  get area() {
    return this._width * this._height;
  }

  get perimeter() {
    return 2 * (this._width + this._height);
  }
}

const rect = new Rectangle(10, 5);
console.log(rect.area); // 50
console.log(rect.perimeter); // 30

rect.width = 20;
console.log(rect.area); // 100

// rect.width = -5; // Error: 幅は正の数である必要があります
```

### 6.3 読み取り専用プロパティ

```javascript
class User {
  constructor(name, email) {
    this._name = name;
    this._email = email;
    this._createdAt = new Date();
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  // createdAt は getter のみ（読み取り専用）
  get createdAt() {
    return this._createdAt;
  }

  // name と email は setter もあり（読み書き可能）
  set name(value) {
    if (value.length === 0) {
      throw new Error('名前は空にできません');
    }
    this._name = value;
  }

  set email(value) {
    if (!value.includes('@')) {
      throw new Error('有効なメールアドレスを入力してください');
    }
    this._email = value;
  }
}

const user = new User('太郎', 'taro@example.com');
console.log(user.name); // '太郎'
console.log(user.createdAt); // 作成日時

user.name = '次郎'; // OK
// user.createdAt = new Date(); // エラーにはならないが、setterがないので無視される

console.log(user.name); // '次郎'
```

### 6.4 計算されたプロパティ

```javascript
class Circle {
  constructor(radius) {
    this._radius = radius;
  }

  get radius() {
    return this._radius;
  }

  set radius(value) {
    if (value <= 0) {
      throw new Error('半径は正の数である必要があります');
    }
    this._radius = value;
  }

  // 計算されたプロパティ
  get diameter() {
    return this._radius * 2;
  }

  get circumference() {
    return 2 * Math.PI * this._radius;
  }

  get area() {
    return Math.PI * this._radius ** 2;
  }

  // diameter の setter
  set diameter(value) {
    this.radius = value / 2; // radius の setter を使う
  }
}

const circle = new Circle(5);
console.log(circle.radius); // 5
console.log(circle.diameter); // 10
console.log(circle.circumference.toFixed(2)); // 31.42
console.log(circle.area.toFixed(2)); // 78.54

circle.diameter = 20; // diameter から radius を逆算
console.log(circle.radius); // 10
console.log(circle.area.toFixed(2)); // 314.16
```

---

## まとめ

### 重要なポイント

1. **クラスの基本**
   - `class` キーワードでクラスを定義
   - `constructor` でインスタンスを初期化
   - `new` キーワードでインスタンスを作成

2. **継承**
   - `extends` でクラスを拡張
   - `super()` で親クラスのコンストラクタを呼び出し
   - メソッドのオーバーライドが可能

3. **静的メンバー**
   - `static` キーワードでクラスメソッド・プロパティを定義
   - インスタンスではなくクラス自体に属する
   - ユーティリティ関数やファクトリーメソッドに便利

4. **getter / setter**
   - `get` でプロパティのように値を取得
   - `set` でプロパティのように値を設定
   - データの検証やカプセル化に有用

### 次のステップ

Chapter 5 では、非同期処理（Promise、async/await）について学びます。
クラスと非同期処理を組み合わせることで、より実践的なアプリケーションを作成できるようになります。

---

## 練習問題

`exercises/` フォルダ内の練習問題に取り組んでください：

1. `01-class-basics.js` - クラスの基本とコンストラクタ
2. `02-methods-properties.js` - インスタンスメソッドとプロパティ
3. `03-inheritance.js` - 継承
4. `04-static.js` - 静的メソッドとプロパティ
5. `05-getters-setters.js` - getter / setter

解答例は `solutions/` フォルダにあります。
