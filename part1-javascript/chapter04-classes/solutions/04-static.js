/**
 * 解答例 4: 静的メソッドとプロパティ
 */

// 問題 1: MathHelper クラスを作成
class MathHelper {
  static PI = 3.14159;

  static max(a, b) {
    return a > b ? a : b;
  }

  static min(a, b) {
    return a < b ? a : b;
  }

  static average(...numbers) {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((total, num) => total + num, 0);
    return sum / numbers.length;
  }

  static sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
  }
}

// テスト
console.log('=== 問題 1 のテスト ===');
console.log('max(5, 10):', MathHelper.max(5, 10));
console.log('min(5, 10):', MathHelper.min(5, 10));
console.log('average(1, 2, 3, 4, 5):', MathHelper.average(1, 2, 3, 4, 5));
console.log('sum(10, 20, 30):', MathHelper.sum(10, 20, 30));
console.log('PI:', MathHelper.PI);
console.log('');

// 問題 2: StringHelper クラスを作成
class StringHelper {
  static capitalize(str) {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static reverse(str) {
    return str.split('').reverse().join('');
  }

  static isPalindrome(str) {
    const reversed = str.split('').reverse().join('');
    return str === reversed;
  }

  static truncate(str, length) {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
  }

  static wordCount(str) {
    return str.trim().split(/\s+/).filter((word) => word.length > 0).length;
  }
}

// テスト
console.log('=== 問題 2 のテスト ===');
console.log("capitalize('hello'):", StringHelper.capitalize('hello'));
console.log("reverse('hello'):", StringHelper.reverse('hello'));
console.log("isPalindrome('racecar'):", StringHelper.isPalindrome('racecar'));
console.log("isPalindrome('hello'):", StringHelper.isPalindrome('hello'));
console.log(
  "truncate('This is a long sentence', 10):",
  StringHelper.truncate('This is a long sentence', 10)
);
console.log("wordCount('Hello world from JavaScript'):", StringHelper.wordCount('Hello world from JavaScript'));
console.log('');

// 問題 3: DateHelper クラスを作成
class DateHelper {
  static isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  static getDaysInMonth(year, month) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && this.isLeapYear(year)) {
      return 29;
    }
    return daysInMonth[month - 1];
  }

  static formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  static addDays(date, days) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  static daysBetween(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}

// テスト
console.log('=== 問題 3 のテスト ===');
console.log('isLeapYear(2020):', DateHelper.isLeapYear(2020));
console.log('isLeapYear(2021):', DateHelper.isLeapYear(2021));
console.log('getDaysInMonth(2020, 2):', DateHelper.getDaysInMonth(2020, 2));
console.log('getDaysInMonth(2021, 2):', DateHelper.getDaysInMonth(2021, 2));
console.log('formatDate(new Date(2025, 11, 15)):', DateHelper.formatDate(new Date(2025, 11, 15)));
const today = new Date(2025, 11, 15);
const nextWeek = DateHelper.addDays(today, 7);
console.log('addDays(today, 7):', DateHelper.formatDate(nextWeek));
console.log('daysBetween(today, nextWeek):', DateHelper.daysBetween(today, nextWeek));
console.log('');

// 問題 4: User クラスを作成（インスタンスカウント機能付き）
class User {
  static userCount = 0;
  static allUsers = [];

  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.id = ++User.userCount;
    User.allUsers.push(this);
  }

  static getUserCount() {
    return User.userCount;
  }

  static resetCount() {
    User.userCount = 0;
    User.allUsers = [];
  }

  static getAllUsers() {
    return User.allUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  }
}

// テスト
console.log('=== 問題 4 のテスト ===');
const user1 = new User('太郎', 'taro@example.com');
const user2 = new User('花子', 'hanako@example.com');
const user3 = new User('次郎', 'jiro@example.com');
console.log('ユーザー数:', User.getUserCount());
console.log('user1 の ID:', user1.id);
console.log('user2 の ID:', user2.id);
console.log('user3 の ID:', user3.id);
console.log('全ユーザー:', User.getAllUsers());
User.resetCount();
console.log('リセット後のユーザー数:', User.getUserCount());
console.log('');

// 問題 5: Temperature クラスを作成（ファクトリーメソッド）
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

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

  static compare(temp1, temp2) {
    return temp1.celsius > temp2.celsius ? temp1 : temp2;
  }
}

// テスト
console.log('=== 問題 5 のテスト ===');
const temp1 = new Temperature(25);
const temp2 = Temperature.fromFahrenheit(77);
const temp3 = Temperature.fromKelvin(298.15);

console.log('temp1 (25°C):');
console.log('  摂氏:', temp1.toCelsius());
console.log('  華氏:', temp1.toFahrenheit().toFixed(2));
console.log('  ケルビン:', temp1.toKelvin().toFixed(2));

console.log('temp2 (77°F):');
console.log('  摂氏:', temp2.toCelsius().toFixed(2));
console.log('  華氏:', temp2.toFahrenheit().toFixed(2));

console.log('temp3 (298.15K):');
console.log('  摂氏:', temp3.toCelsius().toFixed(2));
console.log('  ケルビン:', temp3.toKelvin().toFixed(2));

const hotterTemp = Temperature.compare(temp1, temp2);
console.log('temp1 と temp2 の高い方:', hotterTemp.toCelsius().toFixed(2), '°C');
console.log('');
