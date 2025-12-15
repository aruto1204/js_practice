// 練習問題 2: 型注釈の基本

/**
 * 問題 1: 基本的な型注釈
 * 以下の変数に適切な型注釈を追加してください。
 */

// ここに型注釈を追加
// let username = '太郎';
// let age = 30;
// let isStudent = false;
// let score = 85.5;

/**
 * 問題 2: 関数の型注釈
 * 2つの数値を足す関数に型注釈を追加してください。
 *
 * 仕様:
 * - 関数名: add
 * - 引数: a, b（両方とも number 型）
 * - 戻り値: number 型
 */

// ここにコードを書く

/**
 * 問題 3: 配列の型注釈
 * 以下の配列に適切な型注釈を追加してください。
 */

// ここに型注釈を追加
// let numbers = [1, 2, 3, 4, 5];
// let names = ['太郎', '花子', '次郎'];
// let flags = [true, false, true];

/**
 * 問題 4: 戻り値の型注釈
 * 文字列の長さを返す関数を作成してください。
 *
 * 仕様:
 * - 関数名: getLength
 * - 引数: str (string 型)
 * - 戻り値: number 型
 * - str.length を返す
 */

// ここにコードを書く

/**
 * 問題 5: 複雑な関数の型注釈
 * 商品の合計金額を計算する関数を作成してください。
 *
 * 仕様:
 * - 関数名: calculateTotal
 * - 引数: price (number), quantity (number), taxRate (number)
 * - 戻り値: number
 * - price * quantity * (1 + taxRate) を返す
 */

// ここにコードを書く

// テスト
// console.log(calculateTotal(1000, 2, 0.1)); // 2200

/**
 * 問題 6: オプショナルパラメータ
 * 挨拶メッセージを作成する関数を作成してください。
 *
 * 仕様:
 * - 関数名: createGreeting
 * - 引数: name (string), title (string, オプショナル)
 * - 戻り値: string
 * - title がある場合: 'Hello, {title} {name}!'
 * - title がない場合: 'Hello, {name}!'
 * - ヒント: title?: string
 */

// ここにコードを書く

// テスト
// console.log(createGreeting('太郎'));           // Hello, 太郎!
// console.log(createGreeting('太郎', 'さん'));   // Hello, さん 太郎!

/**
 * 問題 7: デフォルト引数の型注釈
 * デフォルト値を持つ関数を作成してください。
 *
 * 仕様:
 * - 関数名: repeat
 * - 引数: str (string), times (number, デフォルト値: 3)
 * - 戻り値: string
 * - str を times 回繰り返した文字列を返す
 */

// ここにコードを書く

// テスト
// console.log(repeat('Hello'));      // HelloHelloHello
// console.log(repeat('Hi', 5));      // HiHiHiHiHi

/**
 * 問題 8: 戻り値なしの関数
 * ログを出力する関数を作成してください。
 *
 * 仕様:
 * - 関数名: logMessage
 * - 引数: message (string)
 * - 戻り値: void
 * - console.log でメッセージを出力
 */

// ここにコードを書く

// テスト
// logMessage('TypeScript is awesome!');

/**
 * 問題 9: 型推論との比較
 * 以下の2つの関数を比較してください。
 * どちらが良いか考えてみましょう。
 */

// 型注釈あり（明示的）
function multiply1(a: number, b: number): number {
  return a * b;
}

// 型注釈なし（型推論）
function multiply2(a: number, b: number) {
  return a * b; // 戻り値の型は自動で number と推論される
}

// どちらも動作しますが、明示的な方が可読性が高い場合があります

/**
 * 問題 10: 型エラーの修正
 * 以下のコードには型エラーがあります。修正してください。
 */

/*
function divide(a: number, b: number): number {
  if (b === 0) {
    return 'Cannot divide by zero'; // エラー: string を number に代入できない
  }
  return a / b;
}
*/

// ヒント: 戻り値の型を変更するか、エラー処理を変更する
// ここに修正したコードを書く
