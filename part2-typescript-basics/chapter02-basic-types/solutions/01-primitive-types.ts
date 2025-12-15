// 解答例 1: プリミティブ型の基礎

/**
 * 問題 1: 変数の型注釈
 */

let productName: string = 'ノートPC';
let price: number = 99800;
let inStock: boolean = true;
let description: string = '高性能なノートパソコンです';

/**
 * 問題 2: 関数の型注釈
 */

function displayUserInfo(name: string, age: number, isAdmin: boolean): string {
  return `名前: ${name}, 年齢: ${age}, 管理者: ${isAdmin}`;
}

console.log(displayUserInfo('太郎', 25, true));
// 出力: 名前: 太郎, 年齢: 25, 管理者: true

/**
 * 問題 3: 型エラーの修正
 */

let username: string = 'John';
// username = 123; // エラー: 型が合わない

let count: number = 100; // 文字列から数値に修正
// let count: number = '100'; // エラー

let isActive: boolean = true; // 文字列からbooleanに修正
// let isActive: boolean = 'true'; // エラー

/**
 * 問題 4: null と undefined
 */

let nullableValue: string | null = null;
nullableValue = 'hello';
nullableValue = null;

let undefinedValue: string | undefined = undefined;
undefinedValue = 'world';
undefinedValue = undefined;

/**
 * 問題 5: テンプレートリテラルの型
 */

function greet(name: string, timeOfDay: string): string {
  return `${timeOfDay}、${name}さん！`;
}

console.log(greet('太郎', 'おはよう')); // おはよう、太郎さん！
console.log(greet('花子', 'こんにちは')); // こんにちは、花子さん！

/**
 * 問題 6: number 型の様々な表現
 */

let decimal: number = 10; // 10進数
let hex: number = 0xff; // 16進数（255）
let binary: number = 0b1010; // 2進数（10）
let octal: number = 0o744; // 8進数（484）

console.log(decimal, hex, binary, octal);

/**
 * 問題 7: 型の互換性チェック
 */

let text: string = 'hello';
let num: number = 42;
let flag: boolean = true;

// text = num; // エラー: Type 'number' is not assignable to type 'string'
// num = text; // エラー: Type 'string' is not assignable to type 'number'
// flag = 1; // エラー: Type 'number' is not assignable to type 'boolean'

/**
 * 問題 8: リテラル型
 */

let direction: 'north' | 'south' | 'east' | 'west';
direction = 'north'; // OK
direction = 'south'; // OK
// direction = 'up'; // エラー: Type '"up"' is not assignable to type

console.log(direction);

/**
 * 問題 9: 複数の型を持つ変数
 */

let id: string | number;
id = 123; // OK
id = 'ABC123'; // OK
// id = true; // エラー: Type 'boolean' is not assignable

console.log(id);

/**
 * 問題 10: 型注釈のベストプラクティス
 */

function calculateTax(amount: number, rate: number): number {
  return amount * rate;
}

function formatCurrency(amount: number): string {
  return `¥${amount.toLocaleString()}`;
}

console.log(calculateTax(1000, 0.1)); // 100
console.log(formatCurrency(99800)); // ¥99,800
