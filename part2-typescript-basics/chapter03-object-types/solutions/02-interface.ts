/**
 * 解答例 2: インターフェース（interface）
 */

// 問題 1: User インターフェースを定義してください
interface User {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
}

// 問題 2: User インターフェースを使ってユーザーオブジェクトを作成してください
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

// 問題 3: Person インターフェースと Student インターフェースを定義してください
interface Person {
  name: string;
  age: number;
}

interface Student extends Person {
  studentId: string;
  grade: number;
  major: string;
}

const student: Student = {
  name: '山田太郎',
  age: 20,
  studentId: 'S12345',
  grade: 3,
  major: '情報工学',
};

// 問題 4: Calculator インターフェースを定義してください
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

// 問題 5: Calculator インターフェースを実装するオブジェクトを作成してください
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
    if (b === 0) {
      throw new Error('0で割ることはできません');
    }
    return a / b;
  },
};

// 問題 6: 複数のインターフェースを拡張した Employee インターフェースを作成してください
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

const employee: Employee = {
  name: '佐藤花子',
  age: 28,
  employeeId: 'E001',
  department: '開発部',
  salary: 5000000,
};

// テスト用のコード
console.log('=== 問題 2 のテスト ===');
console.log('ユーザー1:', user1);
console.log('ユーザー2:', user2);

console.log('\n=== 問題 3 のテスト ===');
console.log('学生情報:', student);

console.log('\n=== 問題 5 のテスト ===');
console.log('10 + 5 =', calculator.add(10, 5));
console.log('10 - 5 =', calculator.subtract(10, 5));
console.log('10 × 5 =', calculator.multiply(10, 5));
console.log('10 ÷ 5 =', calculator.divide(10, 5));

console.log('\n=== 問題 6 のテスト ===');
console.log('従業員情報:', employee);

/**
 * 実行結果:
 *
 * === 問題 2 のテスト ===
 * ユーザー1: { id: 1, username: 'taro', email: 'taro@example.com', isActive: true }
 * ユーザー2: { id: 2, username: 'hanako', email: 'hanako@example.com', isActive: false }
 *
 * === 問題 3 のテスト ===
 * 学生情報: { name: '山田太郎', age: 20, studentId: 'S12345', grade: 3, major: '情報工学' }
 *
 * === 問題 5 のテスト ===
 * 10 + 5 = 15
 * 10 - 5 = 5
 * 10 × 5 = 50
 * 10 ÷ 5 = 2
 *
 * === 問題 6 のテスト ===
 * 従業員情報: { name: '佐藤花子', age: 28, employeeId: 'E001', department: '開発部', salary: 5000000 }
 */
