// 解答例 1: 最初の TypeScript プログラム

/**
 * 問題 1: Hello World
 */

function greet(name: string): string {
  return 'Hello, ' + name + '!';
}

// テスト
console.log(greet('TypeScript'));
// 出力: Hello, TypeScript!

/**
 * 問題 2: 年齢計算
 */

function calculateAge(birthYear: number): number {
  return 2025 - birthYear;
}

// テスト
console.log(calculateAge(2000)); // 25
console.log(calculateAge(1990)); // 35

/**
 * 問題 3: 型エラーの体験
 */

function multiply(a: number, b: number): number {
  return a * b;
}

console.log(multiply(5, 3)); // OK: 15

// 以下はコンパイルエラー
// console.log(multiply('5', 3));
// エラー: Argument of type 'string' is not assignable to parameter of type 'number'

// console.log(multiply(5, '3'));
// エラー: Argument of type 'string' is not assignable to parameter of type 'number'

/**
 * 問題 4: 型推論の確認
 */

let message = 'Hello'; // string 型と推論される
let count = 100; // number 型と推論される
let isValid = true; // boolean 型と推論される

// 以下はエラー
// message = 123;
// エラー: Type 'number' is not assignable to type 'string'

// count = 'text';
// エラー: Type 'string' is not assignable to type 'number'

// isValid = 'yes';
// エラー: Type 'string' is not assignable to type 'boolean'

/**
 * 問題 5: 複数の型注釈
 */

function displayUser(name: string, age: number, isAdmin: boolean): string {
  return `Name: ${name}, Age: ${age}, Admin: ${isAdmin}`;
}

// テスト
console.log(displayUser('太郎', 25, true));
// 出力: Name: 太郎, Age: 25, Admin: true

console.log(displayUser('花子', 30, false));
// 出力: Name: 花子, Age: 30, Admin: false
