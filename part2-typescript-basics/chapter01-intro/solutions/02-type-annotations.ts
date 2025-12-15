// 解答例 2: 型注釈の基本

/**
 * 問題 1: 基本的な型注釈
 */

let username: string = '太郎';
let age: number = 30;
let isStudent: boolean = false;
let score: number = 85.5;

/**
 * 問題 2: 関数の型注釈
 */

function add(a: number, b: number): number {
  return a + b;
}

console.log(add(5, 3)); // 8

/**
 * 問題 3: 配列の型注釈
 */

let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ['太郎', '花子', '次郎'];
let flags: boolean[] = [true, false, true];

// または Array<T> の記法も使える
let numbers2: Array<number> = [1, 2, 3, 4, 5];
let names2: Array<string> = ['太郎', '花子', '次郎'];

/**
 * 問題 4: 戻り値の型注釈
 */

function getLength(str: string): number {
  return str.length;
}

console.log(getLength('Hello')); // 5
console.log(getLength('TypeScript')); // 10

/**
 * 問題 5: 複雑な関数の型注釈
 */

function calculateTotal(price: number, quantity: number, taxRate: number): number {
  return price * quantity * (1 + taxRate);
}

console.log(calculateTotal(1000, 2, 0.1)); // 2200
console.log(calculateTotal(500, 3, 0.08)); // 1620

/**
 * 問題 6: オプショナルパラメータ
 */

function createGreeting(name: string, title?: string): string {
  if (title) {
    return `Hello, ${title} ${name}!`;
  }
  return `Hello, ${name}!`;
}

console.log(createGreeting('太郎')); // Hello, 太郎!
console.log(createGreeting('太郎', 'さん')); // Hello, さん 太郎!

/**
 * 問題 7: デフォルト引数の型注釈
 */

function repeat(str: string, times: number = 3): string {
  return str.repeat(times);
}

console.log(repeat('Hello')); // HelloHelloHello
console.log(repeat('Hi', 5)); // HiHiHiHiHi
console.log(repeat('*', 10)); // **********

/**
 * 問題 8: 戻り値なしの関数
 */

function logMessage(message: string): void {
  console.log(message);
}

logMessage('TypeScript is awesome!');
logMessage('Learning TypeScript!');

/**
 * 問題 9: 型推論との比較
 */

// 型注釈あり（明示的）
function multiply1(a: number, b: number): number {
  return a * b;
}

// 型注釈なし（型推論）
function multiply2(a: number, b: number) {
  return a * b; // 戻り値の型は自動で number と推論される
}

// どちらも正しく動作する
console.log(multiply1(5, 3)); // 15
console.log(multiply2(5, 3)); // 15

/**
 * 問題 10: 型エラーの修正
 */

// 解決方法1: エラーを throw する
function divide1(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

// 解決方法2: 戻り値の型を number | string にする
function divide2(a: number, b: number): number | string {
  if (b === 0) {
    return 'Cannot divide by zero';
  }
  return a / b;
}

// 解決方法3: null を返す
function divide3(a: number, b: number): number | null {
  if (b === 0) {
    return null;
  }
  return a / b;
}

// テスト
console.log(divide1(10, 2)); // 5
// console.log(divide1(10, 0)); // Error: Cannot divide by zero

console.log(divide2(10, 2)); // 5
console.log(divide2(10, 0)); // Cannot divide by zero

console.log(divide3(10, 2)); // 5
console.log(divide3(10, 0)); // null
