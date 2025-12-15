// 練習問題 1: 最初の TypeScript プログラム

/**
 * 問題 1: Hello World
 * TypeScript で最初のプログラムを書いてください。
 *
 * 仕様:
 * - greet という関数を作成
 * - 引数 name は string 型
 * - 戻り値も string 型
 * - 'Hello, {name}!' という文字列を返す
 */

// ここにコードを書く

// テスト
// console.log(greet('TypeScript'));
// 期待される出力: Hello, TypeScript!

/**
 * 問題 2: 年齢計算
 * 生まれ年から年齢を計算する関数を作成してください。
 *
 * 仕様:
 * - calculateAge という関数を作成
 * - 引数 birthYear は number 型
 * - 戻り値は number 型
 * - 2025年から birthYear を引いた値を返す
 */

// ここにコードを書く

// テスト
// console.log(calculateAge(2000)); // 25
// console.log(calculateAge(1990)); // 35

/**
 * 問題 3: 型エラーの体験
 * 以下のコードのコメントを外してコンパイルしてみてください。
 * どのようなエラーが出るか確認しましょう。
 */

function multiply(a: number, b: number): number {
  return a * b;
}

// console.log(multiply(5, 3));      // OK
// console.log(multiply('5', 3));    // エラー - コメントを外してみる
// console.log(multiply(5, '3'));    // エラー - コメントを外してみる

/**
 * 問題 4: 型推論の確認
 * TypeScript の型推論を確認してください。
 *
 * 仕様:
 * - 以下の変数を作成（型注釈なし）
 * - message: 'Hello' を代入
 * - count: 100 を代入
 * - isValid: true を代入
 * - その後、別の型の値を代入しようとしてエラーを確認
 */

// ここにコードを書く
// let message = 'Hello';
// message = 123; // エラーになることを確認

/**
 * 問題 5: 複数の型注釈
 * ユーザー情報を表示する関数を作成してください。
 *
 * 仕様:
 * - displayUser という関数を作成
 * - 引数: name (string), age (number), isAdmin (boolean)
 * - 戻り値: string
 * - 'Name: {name}, Age: {age}, Admin: {isAdmin}' という形式で返す
 */

// ここにコードを書く

// テスト
// console.log(displayUser('太郎', 25, true));
// 期待される出力: Name: 太郎, Age: 25, Admin: true
