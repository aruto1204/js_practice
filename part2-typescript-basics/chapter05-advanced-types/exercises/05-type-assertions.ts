/**
 * 練習問題 5: 型アサーション（Type Assertion）
 *
 * このファイルでは、型アサーションの適切な使用方法を練習します。
 */

// ==========================================
// 問題 1: 基本的な型アサーション
// ==========================================
// unknown 型の変数を string として扱い、大文字に変換する toUpperCase 関数を実装してください
// TODO: ここに toUpperCase 関数を実装

function toUpperCase(value: unknown): string {
  return (value as string).toUpperCase();
}

// ==========================================
// 問題 2: DOM要素の型アサーション
// ==========================================
// getElementById でボタン要素を取得し、disabled プロパティを設定する
// disableButton 関数を実装してください（HTMLButtonElement として型アサーション）
// TODO: ここに disableButton 関数を実装

// function disableButton(id: string): void {
//   const button = document.getElementById(id) as HTMLButtonElement;
//   button.disabled = true;
// }

// ==========================================
// 問題 3: API レスポンスの型アサーション
// ==========================================
// User 型（name: string, email: string）を定義し、
// any 型の API レスポンスを User 型として扱う parseUserResponse 関数を実装してください
// TODO: User 型と parseUserResponse 関数を実装

type User = {
  name: string;
  email: string;
};

function parseUserResponse(response: any): User {
  return response as User;
}

// ==========================================
// 問題 4: as const アサーション
// ==========================================
// COLORS オブジェクトを as const で定義し、readonly かつリテラル型にしてください
// { RED: '#FF0000', GREEN: '#00FF00', BLUE: '#0000FF' }
// TODO: COLORS を as const で定義

const COLORS = {
  RED: '#FF0000',
  GREEN: '#00FF00',
  BLUE: '#0000FF',
} as const;

// ==========================================
// 問題 5: 配列の as const
// ==========================================
// サイズの配列を as const で定義し、readonly タプルとして扱ってください
// ['small', 'medium', 'large']
// TODO: SIZES を as const で定義

const SIZES = ['small', 'medium', 'large'] as const;

// ==========================================
// 問題 6: 非 null アサーション
// ==========================================
// string | null を受け取り、必ず非 null であると仮定して処理する
// getLength 関数を実装してください（! 演算子を使用）
// TODO: ここに getLength 関数を実装

function getLength(str: string | null): number {
  return str!.length;
}

// ==========================================
// 問題 7: ジェネリクスと型アサーション
// ==========================================
// ジェネリック型 T の配列の最初の要素を返す first 関数を実装してください
// 要素が存在することを保証する場合は as を使用
// TODO: ここに first 関数を実装

function first<T>(arr: T[]): T {
  return arr[0] as T;
}

// ==========================================
// 問題 8: オブジェクトの型アサーション
// ==========================================
// JSONから読み込んだデータ（any型）を Config 型にアサーションする
// loadConfig 関数を実装してください
// Config 型: { host: string, port: number, debug: boolean }
// TODO: Config 型と loadConfig 関数を実装

type Config = {
  host: string;
  port: number;
  debug: boolean;
};

function loadConfig(jsonString: string): Config {
  return JSON.parse(jsonString) as Config;
}

// ==========================================
// 問題 9: ユニオン型の絞り込みアサーション
// ==========================================
// string | number を受け取り、string であると確信している場合に
// string として扱う asString 関数を実装してください
// TODO: ここに asString 関数を実装

function asString(value: string | number): string {
  return value as string;
}

// ==========================================
// 問題 10: イベントオブジェクトの型アサーション
// ==========================================
// Event 型を受け取り、MouseEvent として扱って座標を取得する
// getMousePosition 関数を実装してください
// TODO: ここに getMousePosition 関数を実装

// function getMousePosition(event: Event): { x: number; y: number } {
//   const mouseEvent = event as MouseEvent;
//   return { x: mouseEvent.clientX, y: mouseEvent.clientY };
// }

// ==========================================
// 問題 11: 型アサーションと型ガードの組み合わせ
// ==========================================
// unknown 型を受け取り、配列であることを確認してから string[] としてアサーションする
// toStringArray 関数を実装してください
// TODO: ここに toStringArray 関数を実装

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    throw new Error('Not an array');
  }
  return value as string[];
}

// ==========================================
// 問題 12: const アサーションとオブジェクト
// ==========================================
// ルートの定義を as const で作成してください
// { HOME: '/', ABOUT: '/about', CONTACT: '/contact' }
// そして、この型から Route 型を抽出してください
// TODO: ROUTES と Route 型を実装

const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
} as const;

type Route = (typeof ROUTES)[keyof typeof ROUTES];

// ==========================================
// 問題 13: 型アサーションによる型の拡張
// ==========================================
// 基本の User 型に追加のプロパティを持つオブジェクトを作成してください
// 型アサーションを使って { ...user, role: 'admin' } を User & { role: string } として扱う
// TODO: ここに extendUser 関数を実装

function extendUser(user: User, role: string): User & { role: string } {
  return { ...user, role } as User & { role: string };
}

// ==========================================
// 問題 14: satisfies 演算子（TypeScript 4.9+）
// ==========================================
// Config 型を定義し、設定オブジェクトが Config を満たすことを確認しつつ、
// より詳細な型情報を保持する例を実装してください
// TODO: Config 型と config オブジェクトを実装

type Config2 = {
  host: string;
  port: number;
  features: Record<string, boolean>;
};

const config2 = {
  host: 'localhost',
  port: 3000,
  features: {
    auth: true,
    logging: false,
  },
} satisfies Config2;

// ==========================================
// 問題 15: 安全な型アサーション
// ==========================================
// unknown 型を受け取り、型ガードで検証してから型アサーションする
// safeAsString 関数を実装してください
// 検証に失敗した場合はエラーを投げる
// TODO: ここに safeAsString 関数を実装

function safeAsString(value: unknown): string {
  if (typeof value !== 'string') {
    throw new Error('Value is not a string');
  }
  return value as string;
}

// ==========================================
// テストコード（実装後にコメントを外して実行）
// ==========================================

const value: unknown = 'hello';
console.log(toUpperCase(value)); // "HELLO"

// // DOM操作の例（ブラウザ環境で実行）
// disableButton('submitBtn');

const apiData: any = { name: 'Alice', email: 'alice@example.com' };
const user = parseUserResponse(apiData);
console.log(user);

console.log(COLORS.RED); // "#FF0000"
// COLORS.RED = '#000000'; // エラー：readonly

console.log(SIZES[0]); // "small"
// SIZES[0] = 'xs';                                  // エラー：readonly

const nullableStr: string | null = 'test';
console.log(getLength(nullableStr)); // 4

const numbers = [1, 2, 3];
console.log(first(numbers)); // 1

const configData = '{"host":"localhost","port":3000,"debug":true}';
const config = loadConfig(configData);
console.log(config);

const mixedValue: string | number = 'hello';
console.log(asString(mixedValue)); // "hello"

// const mockEvent = { clientX: 100, clientY: 200 } as MouseEvent;
// console.log(getMousePosition(mockEvent)); // { x: 100, y: 200 }

const unknownArray: unknown = ['a', 'b', 'c'];
console.log(toStringArray(unknownArray)); // ['a', 'b', 'c']
// console.log(toStringArray('hello')); // Error

console.log(ROUTES.HOME); // "/"
console.log(ROUTES.ABOUT); // "/about"
console.log(ROUTES.CONTACT); // "/contact"

const baseUser = { name: 'Bob', email: 'bob@example.com' };
const adminUser = extendUser(baseUser, 'admin');
console.log(adminUser);

console.log(safeAsString('valid')); // "valid"
// console.log(safeAsString(123)); // Error
