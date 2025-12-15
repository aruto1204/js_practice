/**
 * 解答例 5: getter / setter
 */

// 問題 1: Person クラスを作成
class Person {
  constructor(firstName, lastName) {
    this._firstName = firstName;
    this._lastName = lastName;
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(value) {
    this._firstName = value;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(value) {
    this._lastName = value;
  }

  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }

  set fullName(name) {
    const parts = name.split(' ');
    this._firstName = parts[0];
    this._lastName = parts[1];
  }
}

// テスト
console.log('=== 問題 1 のテスト ===');
const person = new Person('太郎', '山田');
console.log('フルネーム:', person.fullName);
console.log('名:', person.firstName);
console.log('姓:', person.lastName);
person.fullName = '花子 鈴木';
console.log('変更後のフルネーム:', person.fullName);
console.log('変更後の名:', person.firstName);
console.log('変更後の姓:', person.lastName);
console.log('');

// 問題 2: Rectangle クラスを作成
class Rectangle {
  constructor(width, height) {
    this._width = width;
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

  get diagonal() {
    return Math.sqrt(this._width ** 2 + this._height ** 2);
  }
}

// テスト
console.log('=== 問題 2 のテスト ===');
const rect = new Rectangle(10, 5);
console.log('幅:', rect.width);
console.log('高さ:', rect.height);
console.log('面積:', rect.area);
console.log('周囲の長さ:', rect.perimeter);
console.log('対角線:', rect.diagonal.toFixed(2));
rect.width = 20;
rect.height = 10;
console.log('変更後の面積:', rect.area);

try {
  rect.width = -5; // エラー
} catch (error) {
  console.log('エラー:', error.message);
}
console.log('');

// 問題 3: Temperature クラスを作成
class Temperature {
  constructor() {
    this._celsius = 0;
  }

  get celsius() {
    return this._celsius;
  }

  set celsius(value) {
    this._celsius = value;
  }

  get fahrenheit() {
    return (this._celsius * 9) / 5 + 32;
  }

  set fahrenheit(value) {
    this._celsius = ((value - 32) * 5) / 9;
  }

  get kelvin() {
    return this._celsius + 273.15;
  }

  set kelvin(value) {
    this._celsius = value - 273.15;
  }
}

// テスト
console.log('=== 問題 3 のテスト ===');
const temp = new Temperature();
temp.celsius = 25;
console.log('25°C は:');
console.log('  華氏:', temp.fahrenheit.toFixed(2), '°F');
console.log('  ケルビン:', temp.kelvin.toFixed(2), 'K');

temp.fahrenheit = 86;
console.log('86°F は:');
console.log('  摂氏:', temp.celsius.toFixed(2), '°C');
console.log('  ケルビン:', temp.kelvin.toFixed(2), 'K');

temp.kelvin = 300;
console.log('300K は:');
console.log('  摂氏:', temp.celsius.toFixed(2), '°C');
console.log('  華氏:', temp.fahrenheit.toFixed(2), '°F');
console.log('');

// 問題 4: User クラスを作成
class User {
  constructor(email, password) {
    this._email = email;
    this._password = password;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    if (!value.includes('@')) {
      throw new Error('有効なメールアドレスを入力してください');
    }
    this._email = value;
  }

  get username() {
    return this._email.split('@')[0];
  }

  get domain() {
    return this._email.split('@')[1];
  }

  set password(value) {
    if (value.length < 8) {
      throw new Error('パスワードは8文字以上である必要があります');
    }
    this._password = value;
  }

  isPasswordValid(password) {
    return this._password === password;
  }
}

// テスト
console.log('=== 問題 4 のテスト ===');
const user = new User('taro@example.com', 'password123');
console.log('メール:', user.email);
console.log('ユーザー名:', user.username);
console.log('ドメイン:', user.domain);
console.log('パスワード検証（正しい）:', user.isPasswordValid('password123'));
console.log('パスワード検証（間違い）:', user.isPasswordValid('wrongpassword'));

try {
  user.email = 'invalidemail'; // @ がない
} catch (error) {
  console.log('エラー:', error.message);
}

try {
  user.password = 'short'; // 8文字未満
} catch (error) {
  console.log('エラー:', error.message);
}
console.log('');

// 問題 5: Circle クラスを作成
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

  get diameter() {
    return parseFloat((this._radius * 2).toFixed(2));
  }

  set diameter(value) {
    this.radius = value / 2;
  }

  get circumference() {
    return parseFloat((2 * Math.PI * this._radius).toFixed(2));
  }

  set circumference(value) {
    this.radius = value / (2 * Math.PI);
  }

  get area() {
    return parseFloat((Math.PI * this._radius ** 2).toFixed(2));
  }
}

// テスト
console.log('=== 問題 5 のテスト ===');
const circle = new Circle(5);
console.log('半径:', circle.radius);
console.log('直径:', circle.diameter);
console.log('円周:', circle.circumference);
console.log('面積:', circle.area);

circle.diameter = 20;
console.log('\n直径を20に設定後:');
console.log('半径:', circle.radius);
console.log('円周:', circle.circumference);
console.log('面積:', circle.area);

circle.circumference = 62.83;
console.log('\n円周を62.83に設定後:');
console.log('半径:', circle.radius.toFixed(2));
console.log('直径:', circle.diameter);
console.log('面積:', circle.area);

try {
  circle.radius = -5; // 負の値
} catch (error) {
  console.log('エラー:', error.message);
}

try {
  circle.area = 100; // area は読み取り専用（setterがないので無視される）
  console.log('area 設定後（無視される）:', circle.area);
} catch (error) {
  console.log('エラー:', error.message);
}
console.log('');
