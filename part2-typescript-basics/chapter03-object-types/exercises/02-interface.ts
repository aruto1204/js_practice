/**
 * 練習問題 2: インターフェース（interface）
 *
 * このファイルでは、interface を使った型定義を練習します。
 */

// 問題 1: User インターフェースを定義してください
// - id: number
// - username: string
// - email: string
// - isActive: boolean

// ここにコードを書いてください
interface User {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
}

// 問題 2: 上記の User インターフェースを使って、ユーザーオブジェクトを作成してください

// ここにコードを書いてください
const user1: User = {
  id: 1,
  username: 'taro',
  email: 'taro@example.com',
  isActive: true,
};
const user2: User = {
  id: 2,
  username: 'hanako',
  email: 'hanako@example.com',
  isActive: false,
};
console.log(user1);
console.log(user2);
// 問題 3: Person インターフェースを定義し、それを拡張した Student インターフェースを作成してください
// Person:
// - name: string
// - age: number
//
// Student (Person を拡張):
// - studentId: string
// - grade: number
// - major: string

// ここにコードを書いてください
interface Person {
  name: string;
  age: number;
}
interface Student extends Person {
  studentId: string;
  grade: number;
  major: string;
}
const student1: Student = {
  name: 'taro',
  age: 20,
  studentId: '1234567890',
  grade: 1,
  major: 'computer science',
};
console.log(student1);
// 問題 4: メソッドを持つ Calculator インターフェースを定義してください
// - add(a: number, b: number): number
// - subtract(a: number, b: number): number
// - multiply(a: number, b: number): number
// - divide(a: number, b: number): number

// ここにコードを書いてください
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

// 問題 5: Calculator インターフェースを実装するオブジェクトを作成してください

// ここにコードを書いてください
const calculator: Calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
  multiply(a, b) {
    return a * b;
  },
  divide(a, b) {
    return a / b;
  },
};
console.log(calculator.add(10, 5));
console.log(calculator.subtract(10, 5));
console.log(calculator.multiply(10, 5));
console.log(calculator.divide(10, 5));
// 問題 6: 複数のインターフェースを拡張した Employee インターフェースを作成してください
// Named インターフェース:
// - name: string
//
// Aged インターフェース:
// - age: number
//
// Employee (Named と Aged を拡張):
// - employeeId: string
// - department: string
// - salary: number

// ここにコードを書いてください
interface Named {
  name: string;
}
interface Aged {
  age: number;
}
interface Employee extends Named, Aged {
  employeeId: string;
  department: string;
  salary: number;
}
const employee1: Employee = {
  name: 'taro',
  age: 20,
  employeeId: '1234567890',
  department: 'computer science',
  salary: 100000,
};
console.log(employee1);
// テスト用のコード（実行して確認できます）
// npx ts-node exercises/02-interface.ts

// 問題 5 のテスト
// console.log(calculator.add(10, 5)); // 15
// console.log(calculator.subtract(10, 5)); // 5
// console.log(calculator.multiply(10, 5)); // 50
// console.log(calculator.divide(10, 5)); // 2
