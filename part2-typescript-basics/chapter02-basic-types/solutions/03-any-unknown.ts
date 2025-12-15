// 解答例 3: any型とunknown型

/**
 * 問題 1: any 型の危険性
 */

// any は型チェックを無効にするため、以下の問題があります：
// 1. タイプミスに気づけない
// 2. 存在しないメソッドを呼び出してもコンパイルエラーにならない
// 3. 実行時エラーが発生する可能性が高い
// 4. IDE の補完機能が使えない
// → できるだけ unknown を使うべき

/**
 * 問題 2: unknown 型の安全性
 */

let value: unknown = 'hello';

// 型ガードを使って安全に操作
if (typeof value === 'string') {
  console.log(value.toUpperCase()); // HELLO
}

if (typeof value === 'number') {
  console.log(value.toFixed(2));
}

/**
 * 問題 3: any から unknown への変換
 */

function processData(data: unknown): string {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  return '';
}

console.log(processData('hello')); // HELLO
console.log(processData(123)); // ''

/**
 * 問題 4: 型ガードの実装
 */

function processValue(value: unknown): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else if (typeof value === 'number') {
    return (value * 2).toString();
  } else if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  } else {
    return '不明な型';
  }
}

console.log(processValue('hello')); // HELLO
console.log(processValue(21)); // 42
console.log(processValue(true)); // true
console.log(processValue(null)); // 不明な型

/**
 * 問題 5: オブジェクトの型ガード
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

console.log(processUser({ name: '太郎', age: 25 })); // Name: 太郎, Age: 25
console.log(processUser({ name: '太郎' })); // 無効なユーザー
console.log(processUser('invalid')); // 無効なユーザー

/**
 * 問題 6: any の適切な使用例
 */

// 1. JSON.parse の結果（型が事前にわからない）
let jsonData: any = JSON.parse('{"name": "太郎"}');

// 2. サードパーティライブラリの型定義がない場合
// declare function externalLibrary(): any;

// 3. 段階的な型付け（JavaScript から TypeScript への移行時）

/**
 * 問題 7: 型アサーション
 */

let something: unknown = 'hello';
let str: string = something as string;
console.log(str.toUpperCase()); // HELLO

// より安全な方法
if (typeof something === 'string') {
  console.log(something.toUpperCase());
}

/**
 * 問題 8: 配列の型ガード
 */

function sumNumbers(data: unknown): number {
  if (Array.isArray(data) && data.every((item) => typeof item === 'number')) {
    return data.reduce((sum, num) => sum + num, 0);
  }
  return 0;
}

console.log(sumNumbers([1, 2, 3, 4, 5])); // 15
console.log(sumNumbers('invalid')); // 0
console.log(sumNumbers([1, 'two', 3])); // 0

/**
 * 問題 9: ユーザー定義型ガード
 */

interface User {
  name: string;
  age: number;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'age' in value &&
    typeof (value as any).name === 'string' &&
    typeof (value as any).age === 'number'
  );
}

let data: unknown = { name: '太郎', age: 25 };
if (isUser(data)) {
  console.log(data.name); // OK: User 型として扱える
  console.log(data.age);
}

/**
 * 問題 10: 複雑な型ガード
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

console.log(handleResponse('success')); // success
console.log(handleResponse(200)); // 200
console.log(handleResponse({ message: 'OK' })); // OK
console.log(handleResponse(null)); // レスポンスなし

/**
 * 問題 11: any と unknown の比較
 */

// any: 型チェックがない（危険）
// - コンパイル時にエラーを検出できない
// - 実行時エラーのリスクが高い
// - IDEの補完が効かない

// unknown: 型チェックがある（安全）
// - 型ガードなしでは操作できない
// - コンパイル時にエラーを検出できる
// - 型安全性が保たれる

/**
 * 問題 12: 実践的な例
 */

interface ApiResponse {
  success: boolean;
  data: unknown;
}

function processApiResponse(response: ApiResponse): void {
  if (!response.success) {
    console.log('APIリクエスト失敗');
    return;
  }

  const data = response.data;

  if (Array.isArray(data)) {
    console.log(`配列: ${data.length}個の要素`);
  } else if (typeof data === 'object' && data !== null) {
    console.log('オブジェクト:', Object.keys(data).join(', '));
  } else {
    console.log('型:', typeof data);
  }
}

processApiResponse({ success: true, data: [1, 2, 3] });
// 出力: 配列: 3個の要素

processApiResponse({ success: true, data: { name: '太郎' } });
// 出力: オブジェクト: name

processApiResponse({ success: false, data: null });
// 出力: APIリクエスト失敗
