// 練習問題 1: プリミティブ型の基礎

/**
 * 問題 1: 変数の型注釈
 * 以下の変数に適切な型注釈を追加してください。
 */

// ここに型注釈を追加
// let productName = 'ノートPC';
// let price = 99800;
// let inStock = true;
// let description = '高性能なノートパソコンです';

/**
 * 問題 2: 関数の型注釈
 * ユーザー情報を表示する関数に型注釈を追加してください。
 *
 * 仕様:
 * - 関数名: displayUserInfo
 * - 引数: name (string), age (number), isAdmin (boolean)
 * - 戻り値: string
 */

// ここにコードを書く

/**
 * 問題 3: 型エラーの修正
 * 以下のコードには型エラーがあります。修正してください。
 */

/*
let username: string = 'John';
username = 123;

let count: number = '100';

let isActive: boolean = 'true';
*/

/**
 * 問題 4: null と undefined
 * null または undefined を許容する変数を作成してください。
 */

// ここにコードを書く
// let nullableValue: ??? = null;
// nullableValue = 'hello';
// nullableValue = null;

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

// テスト
// console.log(greet('太郎', 'おはよう')); // おはよう、太郎さん！

/**
 * 問題 6: number 型の様々な表現
 * 様々な形式の数値を定義してください。
 */

// ここにコードを書く
// let decimal: number = ???; // 10進数
// let hex: number = ???; // 16進数（0xFF）
// let binary: number = ???; // 2進数（0b1010）

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
// let id: ???;
// id = 123; // OK
// id = 'ABC123'; // OK
// id = true; // エラー

/**
 * 問題 10: 型注釈のベストプラクティス
 * 以下の関数に適切な型注釈を追加してください。
 */

// ここに型注釈を追加
// function calculateTax(amount, rate) {
//   return amount * rate;
// }

// function formatCurrency(amount) {
//   return `¥${amount.toLocaleString()}`;
// }
