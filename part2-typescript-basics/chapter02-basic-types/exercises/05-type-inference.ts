// 練習問題 5: 型推論の活用

/**
 * 問題 1: 基本的な型推論
 * 以下の変数の型を確認してください（型注釈なし）。
 */

// ここにコードを書く
// let message = 'Hello'; // 型は？
// let count = 42; // 型は？
// let isActive = true; // 型は？

// マウスカーソルを変数に当てて型を確認しましょう

/**
 * 問題 2: 配列の型推論
 * 様々な配列の型がどう推論されるか確認してください。
 */

// ここにコードを書く
// let numbers = [1, 2, 3]; // 型は？
// let mixed = [1, 'two', true]; // 型は？
// let empty = []; // 型は？

/**
 * 問題 3: 関数の戻り値の型推論
 * 以下の関数の戻り値の型を確認してください。
 */

function add(a: number, b: number) {
  return a + b; // 戻り値の型は？
}

function greet(name: string) {
  return `Hello, ${name}`; // 戻り値の型は？
}

function isEven(num: number) {
  return num % 2 === 0; // 戻り値の型は？
}

/**
 * 問題 4: オブジェクトの型推論
 * オブジェクトの型がどう推論されるか確認してください。
 */

// ここにコードを書く
// let user = {
//   name: '太郎',
//   age: 25
// }; // 型は？

// user.name = '花子'; // OK
// user.age = 30; // OK
// user.email = 'test@example.com'; // エラー

/**
 * 問題 5: const による型推論
 * let と const で型推論がどう変わるか確認してください。
 */

// ここにコードを書く
// let mutableString = 'hello'; // 型は？
// const immutableString = 'hello'; // 型は？

// let mutableNumber = 42; // 型は？
// const immutableNumber = 42; // 型は？

/**
 * 問題 6: 文脈的型付け
 * コールバック関数の引数の型が推論されることを確認してください。
 */

// ここにコードを書く
// const numbers = [1, 2, 3, 4, 5];

// numbers.forEach((num) => {
//   // num の型は自動的に number と推論される
//   console.log(num.toFixed(2));
// });

// numbers.map((num) => {
//   // num の型は？
//   return num * 2;
// });

/**
 * 問題 7: 型推論の限界
 * 型推論だけでは不十分な場合を確認してください。
 */

// ここにコードを書く
// let emptyArray = []; // any[] と推論される（危険）
// emptyArray.push(1);
// emptyArray.push('text'); // OK（型安全でない）

// 修正: 型注釈を追加
// let typedArray: number[] = [];
// typedArray.push(1); // OK
// typedArray.push('text'); // エラー

/**
 * 問題 8: 関数の引数と戻り値
 * 以下の関数に型注釈が必要かどうか判断してください。
 */

// 型注釈が不要な例（戻り値は推論される）
function multiply(a: number, b: number) {
  return a * b;
}

// 型注釈が推奨される例（明示的な方が良い）
function divide(a: number, b: number): number {
  return a / b;
}

/**
 * 問題 9: ユニオン型の推論
 * 条件によって異なる型を返す関数の型推論を確認してください。
 */

function getValue(flag: boolean) {
  if (flag) {
    return 'string';
  } else {
    return 123;
  }
  // 戻り値の型は？ string | number
}

/**
 * 問題 10: ジェネリクスと型推論
 * ジェネリック関数で型が推論されることを確認してください。
 */

function identity<T>(value: T): T {
  return value;
}

// ここにコードを書く
// const str = identity('hello'); // T は string と推論
// const num = identity(42); // T は number と推論

/**
 * 問題 11: オブジェクトメソッドの型推論
 * オブジェクトのメソッドの型が推論されることを確認してください。
 */

const calculator = {
  add(a: number, b: number) {
    return a + b; // 戻り値の型は推論される
  },
  subtract(a: number, b: number) {
    return a - b;
  }
};

// calculator.add の型は？ (a: number, b: number) => number

/**
 * 問題 12: 配列メソッドの型推論
 * 配列メソッドチェーンでの型推論を確認してください。
 */

const numbers = [1, 2, 3, 4, 5];

const result = numbers
  .filter((n) => n > 2) // number[]
  .map((n) => n * 2) // number[]
  .reduce((sum, n) => sum + n, 0); // number

// 各ステップの型を確認してください

/**
 * 問題 13: 型アノテーションが推奨される場面
 * 以下のケースで型注釈を追加すべき場所を特定してください。
 */

// ケース1: 関数の引数（必須）
function processUser(user) {
  // user の型を指定すべき
  return user.name;
}

// ケース2: 関数の戻り値（推奨）
function getUsers() {
  // 戻り値の型を明示すべき
  return [{ name: '太郎', age: 25 }];
}

// ケース3: 空配列（必須）
let items = [];
// items の型を指定すべき

/**
 * 問題 14: as const を使った型推論
 * as const で型をより厳密にできることを確認してください。
 */

// ここにコードを書く
// const colors = ['red', 'green', 'blue']; // string[]
// const readonlyColors = ['red', 'green', 'blue'] as const; // readonly ['red', 'green', 'blue']

// const config = {
//   host: 'localhost',
//   port: 3000
// }; // { host: string; port: number; }

// const readonlyConfig = {
//   host: 'localhost',
//   port: 3000
// } as const; // { readonly host: 'localhost'; readonly port: 3000; }

/**
 * 問題 15: 型推論のベストプラクティス
 * 以下のコードを型推論と明示的な型注釈を適切に使い分けてください。
 */

// 改善前
function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
}

// 改善後（ここにコードを書く）
// - items の型を明示
// - item の型が推論されることを確認
// - 戻り値の型を明示（推奨）
