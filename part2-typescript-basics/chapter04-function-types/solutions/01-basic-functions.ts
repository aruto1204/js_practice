/**
 * 解答例 1: 基本的な関数の型定義
 */

// ==========================================
// 問題 1: 簡単な計算関数
// ==========================================
function multiply(a: number, b: number): number {
  return a * b;
}

// ==========================================
// 問題 2: 文字列操作関数
// ==========================================
function getLength(str: string): number {
  return str.length;
}

// ==========================================
// 問題 3: boolean を返す関数
// ==========================================
function isEven(num: number): boolean {
  return num % 2 === 0;
}

// ==========================================
// 問題 4: void 型の関数
// ==========================================
function greet(name: string): void {
  console.log(`Hello, ${name}!`);
}

// ==========================================
// 問題 5: 複数の引数を持つ関数
// ==========================================
function createProfile(name: string, age: number, city: string): string {
  return `${name} is ${age} years old and lives in ${city}.`;
}

// ==========================================
// 問題 6: オブジェクトを返す関数
// ==========================================
function calculate(a: number, b: number): { sum: number; difference: number } {
  return {
    sum: a + b,
    difference: a - b
  };
}

// ==========================================
// 問題 7: 配列を受け取る関数
// ==========================================
function getAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

// ==========================================
// 問題 8: アロー関数での型定義
// ==========================================
const capitalize = (str: string): string => {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// ==========================================
// 問題 9: 複雑な戻り値の型
// ==========================================
type User = {
  name: string;
  email: string;
};

function createUser(name: string, email: string): User {
  return { name, email };
}

// ==========================================
// 問題 10: null を返す可能性がある関数
// ==========================================
function findIndex<T>(arr: T[], value: T): number | null {
  const index = arr.indexOf(value);
  return index !== -1 ? index : null;
}

// ==========================================
// テストコード
// ==========================================
console.log(multiply(3, 4));                    // 12
console.log(getLength('TypeScript'));           // 10
console.log(isEven(4));                         // true
console.log(isEven(7));                         // false
greet('Alice');                                  // "Hello, Alice!"
console.log(createProfile('Bob', 30, 'Osaka')); // "Bob is 30 years old and lives in Osaka."
console.log(calculate(10, 3));                  // { sum: 13, difference: 7 }
console.log(getAverage([1, 2, 3, 4, 5]));      // 3
console.log(capitalize('hello'));               // "Hello"
console.log(createUser('Charlie', 'charlie@example.com'));
console.log(findIndex([1, 2, 3, 4], 3));       // 2
console.log(findIndex([1, 2, 3, 4], 5));       // null
