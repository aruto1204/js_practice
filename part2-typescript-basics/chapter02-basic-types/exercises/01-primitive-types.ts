// 練習問題 1: プリミティブ型の基礎

/**
 * 問題 1: 変数の型注釈
 * 以下の変数に適切な型注釈を追加してください。
 */

// ここに型注釈を追加
const productName: string = 'ノートPC';
const price: number = 99800;
const inStock: boolean = true;
const description: string = '高性能なノートパソコンです';
console.log(productName, price, inStock, description);
/**
 * 問題 2: 関数の型注釈
 * ユーザー情報を表示する関数に型注釈を追加してください。
 *
 * 仕様:
 * - 関数名: displayUserInfo
 * - 引数: name (string), age (number), isAdmin (boolean)
 * - 戻り値: string
 */

function displayUserInfo(name: string, age: number, isAdmin: boolean): string {
  return `名前: ${name}, 年齢: ${age}, 管理者: ${isAdmin}`;
}

// ここにコードを書く

console.log(displayUserInfo('太郎', 25, true));

/**
 * 問題 3: 型エラーの修正
 * 以下のコードには型エラーがあります。修正してください。
 */

let username: string | number = 'John';
username = 123;

const count: number = 100;

const isActive: boolean = true;

console.log(username, count, isActive);

/**
 * 問題 4: null と undefined
 * null または undefined を許容する変数を作成してください。
 */

// ここにコードを書く
let nullableValue: string | null = null;
nullableValue = 'hello';
nullableValue = null;
console.log(nullableValue);

/**
 * 問題 5: テンプレートリテラルの型
 * テンプレートリテラルを使って挨拶文を作成する関数を作成してください。
 *
 * 仕様:
 * - 関数名: greet
 * - 引数: name (string), timeOfDay (string)
 * - 戻り値: string
 * - '{timeOfDay}、{name}さん！' という形式で返す
 */

// ここにコードを書く
function greet(name: string, timeOfDay: string): string {
  return `${timeOfDay}、${name}さん！`;
}
console.log(greet('太郎', 'おはよう'));

/**
 * 問題 6: number 型の様々な表現
 * 様々な形式の数値を定義してください。
 */

// ここにコードを書く
const decimal: number = 10; // 10進数
const hex: number = 0xff; // 16進数（0xFF）
const binary: number = 0b1010; // 2進数（0b1010）

console.log(decimal, hex, binary);

/**
 * 問題 7: 型の互換性チェック
 * 以下のコードで型エラーが発生するものをコメントで指摘してください。
 */

/*
let text: string = 'hello';
let num: number = 42;
let flag: boolean = true;

text = num; // エラー？
num = text; // エラー？
flag = 1; // エラー？
*/

/**
 * 問題 8: リテラル型
 * 特定の値のみを許容する変数を作成してください。
 */

// ここにコードを書く
// let direction: 'north' | 'south' | 'east' | 'west';
// direction = 'north'; // OK
// direction = 'up'; // エラーになることを確認

/**
 * 問題 9: 複数の型を持つ変数
 * string または number を受け入れる変数を作成してください。
 */

// ここにコードを書く
let id: string | number | boolean;
id = 123; // OK
id = 'ABC123'; // OK
id = true; // エラー
console.log(id);

/**
 * 問題 10: 型注釈のベストプラクティス
 * 以下の関数に適切な型注釈を追加してください。
 */

// ここに型注釈を追加
function calculateTax(amount: number, rate: number): number {
  return amount * rate;
}

function formatCurrency(amount: number): string {
  return `¥${amount.toLocaleString()}`;
}

console.log(calculateTax(1000, 0.1));
console.log(formatCurrency(1000));
