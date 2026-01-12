// 解答例 5: 型推論の活用

/**
 * 問題 1: 基本的な型推論
 */

const message = 'Hello'; // string 型
const count = 42; // number 型
const isActive = true; // boolean 型

// マウスカーソルを変数に当てると型が確認できます

/**
 * 問題 2: 配列の型推論
 */

const numbers = [1, 2, 3];
const mixed = [1, 'two', true]; // (string | number | boolean)[] 型
const empty = []; // any[] 型（危険）

/**
 * 問題 3: 関数の戻り値の型推論
 */

function add(a: number, b: number) {
  return a + b; // 戻り値の型は number と推論される
}

function greet(name: string) {
  return `Hello, ${name}`; // 戻り値の型は string と推論される
}

function isEven(num: number) {
  return num % 2 === 0; // 戻り値の型は boolean と推論される
}

/**
 * 問題 4: オブジェクトの型推論
 */

const user = {
  name: '太郎',
  age: 25,
}; // { name: string; age: number; } 型

user.name = '花子'; // OK
user.age = 30; // OK
// user.email = 'test@example.com'; // エラー: プロパティが存在しない

/**
 * 問題 5: const による型推論
 */

// const mutableString = 'hello'; // string 型
// const immutableString = 'hello'; // 'hello' 型（リテラル型）

// const mutableNumber = 42; // number 型
// const immutableNumber = 42; // 42 型（リテラル型）

/**
 * 問題 6: 文脈的型付け
 */

const numbers2 = [1, 2, 3, 4, 5];

numbers2.forEach((num) => {
  // num の型は自動的に number と推論される
  console.log(num.toFixed(2));
});

numbers2.map((num) => {
  // num の型は number と推論される
  return num * 2;
}); // 戻り値は number[]

/**
 * 問題 7: 型推論の限界
 */

// 悪い例: any[] と推論される
const emptyArray = [];
emptyArray.push(1);
emptyArray.push('text'); // OK（型安全でない）

// 良い例: 型注釈を追加
const typedArray: number[] = [];
typedArray.push(1); // OK
// typedArray.push('text'); // エラー

/**
 * 問題 8: 関数の引数と戻り値
 */

// 戻り値は推論される
function multiply(a: number, b: number) {
  return a * b; // number
}

// 明示的な方が良い場合もある
function divide(a: number, b: number): number {
  return a / b;
}

/**
 * 問題 9: ユニオン型の推論
 */

function getValue(flag: boolean) {
  if (flag) {
    return 'string';
  } else {
    return 123;
  }
} // 戻り値の型は string | number

const result1 = getValue(true); // string | number
const result2 = getValue(false); // string | number

/**
 * 問題 10: ジェネリクスと型推論
 */

function identity<T>(value: T): T {
  return value;
}

const str = identity('hello'); // T は string と推論
const num = identity(42); // T は number と推論

/**
 * 問題 11: オブジェクトメソッドの型推論
 */

const calculator = {
  add(a: number, b: number) {
    return a + b; // 戻り値の型は number と推論される
  },
  subtract(a: number, b: number) {
    return a - b; // 戻り値の型は number と推論される
  },
};

// calculator.add の型は (a: number, b: number) => number

/**
 * 問題 12: 配列メソッドの型推論
 */

const numbers3 = [1, 2, 3, 4, 5];

const result = numbers3
  .filter((n) => n > 2) // number[]
  .map((n) => n * 2) // number[]
  .reduce((sum, n) => sum + n, 0); // number

console.log(result); // 24

/**
 * 問題 13: 型アノテーションが推奨される場面
 */

// ケース1: 関数の引数（必須）
interface User {
  name: string;
  age: number;
}

function processUser(user: User): string {
  return user.name;
}

// ケース2: 関数の戻り値（推奨）
function getUsers(): User[] {
  return [{ name: '太郎', age: 25 }];
}

// ケース3: 空配列（必須）
let items: string[] = [];
items.push('item1');

/**
 * 問題 14: as const を使った型推論
 */

// 通常の配列
const colors = ['red', 'green', 'blue']; // string[]

// as const を使用
const readonlyColors = ['red', 'green', 'blue'] as const;
// readonly ['red', 'green', 'blue']

// 通常のオブジェクト
const config = {
  host: 'localhost',
  port: 3000,
}; // { host: string; port: number; }

// as const を使用
const readonlyConfig = {
  host: 'localhost',
  port: 3000,
} as const;
// { readonly host: 'localhost'; readonly port: 3000; }

/**
 * 問題 15: 型推論のベストプラクティス
 */

interface Item {
  price: number;
  quantity: number;
}

// 改善後
function calculateTotal(items: Item[]): number {
  let total = 0; // number と推論される
  for (const item of items) {
    // item の型は Item と推論される
    total += item.price * item.quantity;
  }
  return total;
}

const items: Item[] = [
  { price: 100, quantity: 2 },
  { price: 200, quantity: 1 },
];

console.log(calculateTotal(items)); // 400
