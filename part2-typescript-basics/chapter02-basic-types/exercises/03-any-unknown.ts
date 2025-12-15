// 練習問題 3: any型とunknown型

/**
 * 問題 1: any 型の危険性
 * 以下のコードの問題点を理解してください。
 */

// let data: any = 'hello';
// data = 123;
// data = { name: 'test' };
// data.toUpperCase(); // 実行時エラーの可能性
// data.nonExistentMethod(); // 実行時エラー

// なぜ any は避けるべきか、コメントで説明してください

/**
 * 問題 2: unknown 型の安全性
 * unknown 型を使って型安全に値を扱ってください。
 */

// ここにコードを書く
// let value: unknown = 'hello';

// 型ガードを使って安全に操作
// if (typeof value === 'string') {
//   console.log(value.toUpperCase());
// }

/**
 * 問題 3: any から unknown への変換
 * 以下の any を unknown に書き換えて、型ガードを追加してください。
 */

/*
function processData(data: any) {
  return data.toUpperCase();
}
*/

// ここに unknown を使った安全なバージョンを書く

/**
 * 問題 4: 型ガードの実装
 * 様々な型をチェックする関数を作成してください。
 *
 * 仕様:
 * - 関数名: processValue
 * - 引数: value (unknown)
 * - 戻り値: string
 * - string の場合: 大文字に変換
 * - number の場合: 2倍にして文字列化
 * - boolean の場合: 'true' または 'false'
 * - その他: '不明な型'
 */

// ここにコードを書く

/**
 * 問題 5: オブジェクトの型ガード
 * unknown 型のオブジェクトを安全に扱ってください。
 */

function processUser(user: unknown): string {
  // ここにコードを書く
  // user が { name: string, age: number } の形式かチェック
  // 正しい形式なら 'Name: {name}, Age: {age}' を返す
  // そうでなければ '無効なユーザー' を返す
}

// テスト
// console.log(processUser({ name: '太郎', age: 25 }));
// console.log(processUser({ name: '太郎' }));
// console.log(processUser('invalid'));

/**
 * 問題 6: any の適切な使用例
 * any を使うべき場面を考えてください。
 */

// 例1: JSON.parse の結果（型が事前にわからない）
// let jsonData: any = JSON.parse('{"name": "太郎"}');

// 例2: サードパーティライブラリの型定義がない場合
// declare function externalLibrary(): any;

// 自分で適切な使用例を考えてコメントしてください

/**
 * 問題 7: 型アサーション
 * unknown から特定の型にキャストしてください。
 */

// ここにコードを書く
// let value: unknown = 'hello';
// let str: string = value as string; // 型アサーション
// console.log(str.toUpperCase());

/**
 * 問題 8: 配列の型ガード
 * unknown 型の配列を安全に扱ってください。
 */

function sumNumbers(data: unknown): number {
  // ここにコードを書く
  // data が number[] かチェック
  // 正しい形式なら合計を返す
  // そうでなければ 0 を返す
}

// テスト
// console.log(sumNumbers([1, 2, 3, 4, 5])); // 15
// console.log(sumNumbers('invalid')); // 0

/**
 * 問題 9: ユーザー定義型ガード
 * カスタム型ガード関数を作成してください。
 */

interface User {
  name: string;
  age: number;
}

// ここにコードを書く
// function isUser(value: unknown): value is User {
//   // User 型かチェックする実装
// }

// 使用例
// let data: unknown = { name: '太郎', age: 25 };
// if (isUser(data)) {
//   console.log(data.name); // OK: User 型として扱える
// }

/**
 * 問題 10: 複雑な型ガード
 * 複数の型の可能性がある値を処理してください。
 */

type Response = string | number | { message: string } | null;

function handleResponse(response: unknown): string {
  // ここにコードを書く
  // response が Response 型の各パターンに応じて処理
  // - string: そのまま返す
  // - number: 文字列に変換
  // - { message: string }: message プロパティを返す
  // - null: 'レスポンスなし'
  // - その他: '不明なレスポンス'
}

/**
 * 問題 11: any と unknown の比較
 * 以下の2つの関数の違いを説明してください。
 */

// 関数A: any を使用
function funcA(param: any) {
  param.toUpperCase(); // エラーにならない（危険）
  param.anything(); // エラーにならない（危険）
}

// 関数B: unknown を使用
function funcB(param: unknown) {
  // param.toUpperCase(); // エラーになる（安全）
  if (typeof param === 'string') {
    param.toUpperCase(); // OK
  }
}

// コメントで違いを説明してください

/**
 * 問題 12: 実践的な例
 * API レスポンスを処理する関数を作成してください。
 */

interface ApiResponse {
  success: boolean;
  data: unknown;
}

function processApiResponse(response: ApiResponse): void {
  // ここにコードを書く
  // success が true の場合のみ data を処理
  // data が配列の場合: 要素数を表示
  // data がオブジェクトの場合: プロパティを表示
  // それ以外: 型を表示
}

// テスト
// processApiResponse({ success: true, data: [1, 2, 3] });
// processApiResponse({ success: true, data: { name: '太郎' } });
// processApiResponse({ success: false, data: null });
