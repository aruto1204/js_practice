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
// const value: unknown = 'hello';

// 型ガードを使って安全に操作;
// if (typeof value === 'string') {
//   console.log(value.toUpperCase());
// }
// if (typeof value === 'number') {
//   console.log(value.toFixed(2));
// }
/**
 * 問題 3: any から unknown への変換
 * 以下の any を unknown に書き換えて、型ガードを追加してください。
 */

// function processData(data: any) {
//   if (typeof data === 'string') {
//     return data.toUpperCase();
//   }
//   return '';
// }
// console.log(processData('hello'));
// console.log(processData(123));

// ここに unknown を使った安全なバージョンを書く

function processData(data: unknown): string {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  return '';
}
console.log(processData('hello'));
console.log(processData(123));
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
function processValue(value: unknown): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  if (typeof value === 'number') {
    return (value * 2).toString();
  }
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  return '不明な型';
}
console.log(processValue('hello'));
console.log(processValue(21));
console.log(processValue(true));
console.log(processValue(null));
/**
 * 問題 5: オブジェクトの型ガード
 * unknown 型のオブジェクトを安全に扱ってください。
 */

function processUser(user: unknown): string {
  if (
    typeof user === 'object' &&
    user !== null &&
    'name' in user &&
    'age' in user &&
    typeof (user as any).name === 'string' &&
    typeof (user as any).age === 'number'
  ) {
    const validUser = user as { name: string; age: number };
    return `Name: ${validUser.name}, Age: ${validUser.age}`;
  }
  return '無効なユーザー';
}

// テスト
console.log(processUser({ name: '太郎', age: 25 }));
console.log(processUser({ name: '太郎' }));
console.log(processUser('invalid'));

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
const value: unknown = 'hello';
const str: string = value as string; // 型アサーション
console.log(str.toUpperCase());

/**
 * 問題 8: 配列の型ガード
 * unknown 型の配列を安全に扱ってください。
 */

function sumNumbers(data: unknown): number {
  // ここにコードを書く
  if (Array.isArray(data) && data.every((item) => typeof item === 'number')) {
    return data.reduce((sum, num) => sum + num, 0);
  }
  return 0;
}
console.log(sumNumbers([1, 2, 3, 4, 5]));
console.log(sumNumbers('invalid'));

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
function isUser(value: unknown): value is User {
  // User 型かチェックする実装
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'age' in value &&
    typeof (value as any).name === 'string' &&
    typeof (value as any).age === 'number'
  );
}
console.log(`isUserチェック: ${isUser({ name: '太郎', age: 25 })}`);
console.log(`isUserチェック: ${isUser({ name: '太郎' })}`);
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
  if (typeof response === 'string') {
    return response;
  } else if (typeof response === 'number') {
    return response.toString();
  } else if (
    typeof response === 'object' &&
    response !== null &&
    'message' in response &&
    typeof (response as any).message === 'string'
  ) {
    return (response as { message: string }).message;
  } else if (response === null) {
    return 'レスポンスなし';
  } else {
    return '不明なレスポンス';
  }
}
console.log(handleResponse('success'));
console.log(handleResponse(200));
console.log(handleResponse({ message: 'OK' }));
console.log(handleResponse(null));

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
  if (!response.success) {
    console.log('APIリクエスト失敗');
    return;
  }
  if (Array.isArray(response.data)) {
    console.log(`配列の要素数: ${response.data.length}`);
  } else if (typeof response.data === 'object' && response.data !== null) {
    console.log(`オブジェクトのプロパティ: ${Object.keys(response.data).join(', ')}`);
  } else {
    console.log(`不明な型: ${typeof response.data}`);
  }
}

// テスト
processApiResponse({ success: true, data: [1, 2, 3] });
processApiResponse({ success: true, data: { name: '太郎', age: 25 } });
processApiResponse({ success: true, data: 'hello' });
processApiResponse({ success: false, data: null });
