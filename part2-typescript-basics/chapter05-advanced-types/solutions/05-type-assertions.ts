/**
 * 解答例 5: 型アサーション（Type Assertion）
 */

// ==========================================
// 問題 1: 基本的な型アサーション
// ==========================================
function toUpperCase(value: unknown): string {
  return (value as string).toUpperCase();
}

// ==========================================
// 問題 2: DOM要素の型アサーション
// ==========================================
function disableButton(id: string): void {
  const button = document.getElementById(id) as HTMLButtonElement;
  button.disabled = true;
}

// ==========================================
// 問題 3: API レスポンスの型アサーション
// ==========================================
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
const COLORS = {
  RED: '#FF0000',
  GREEN: '#00FF00',
  BLUE: '#0000FF'
} as const;

// ==========================================
// 問題 5: 配列の as const
// ==========================================
const SIZES = ['small', 'medium', 'large'] as const;

// ==========================================
// 問題 6: 非 null アサーション
// ==========================================
function getLength(str: string | null): number {
  return str!.length;
}

// ==========================================
// 問題 7: ジェネリクスと型アサーション
// ==========================================
function first<T>(arr: T[]): T {
  return arr[0] as T;
}

// ==========================================
// 問題 8: オブジェクトの型アサーション
// ==========================================
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
function asString(value: string | number): string {
  return value as string;
}

// ==========================================
// 問題 10: イベントオブジェクトの型アサーション
// ==========================================
function getMousePosition(event: Event): { x: number; y: number } {
  const mouseEvent = event as MouseEvent;
  return { x: mouseEvent.clientX, y: mouseEvent.clientY };
}

// ==========================================
// 問題 11: 型アサーションと型ガードの組み合わせ
// ==========================================
function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    throw new Error('Not an array');
  }
  return value as string[];
}

// ==========================================
// 問題 12: const アサーションとオブジェクト
// ==========================================
const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact'
} as const;

type Route = typeof ROUTES[keyof typeof ROUTES];

// ==========================================
// 問題 13: 型アサーションによる型の拡張
// ==========================================
function extendUser(user: User, role: string): User & { role: string } {
  return { ...user, role } as User & { role: string };
}

// ==========================================
// 問題 14: satisfies 演算子（TypeScript 4.9+）
// ==========================================
type Config2 = {
  host: string;
  port: number;
  features: Record<string, boolean>;
};

const config = {
  host: 'localhost',
  port: 3000,
  features: {
    auth: true,
    logging: false
  }
} satisfies Config2;

// ==========================================
// 問題 15: 安全な型アサーション
// ==========================================
function safeAsString(value: unknown): string {
  if (typeof value !== 'string') {
    throw new Error('Value is not a string');
  }
  return value as string;
}

// ==========================================
// テストコード
// ==========================================
const value: unknown = 'hello';
console.log(toUpperCase(value));                     // "HELLO"

// DOM操作の例（ブラウザ環境でのみ動作）
// disableButton('submitBtn');

const apiData: any = { name: 'Alice', email: 'alice@example.com' };
const user = parseUserResponse(apiData);
console.log(user);

console.log(COLORS.RED);                             // "#FF0000"
// COLORS.RED = '#000000';                           // エラー：readonly

console.log(SIZES[0]);                               // "small"
// SIZES[0] = 'xs';                                  // エラー：readonly

const nullableStr: string | null = 'test';
console.log(getLength(nullableStr));                 // 4

const numbers = [1, 2, 3];
console.log(first(numbers));                         // 1

const configData = '{"host":"localhost","port":3000,"debug":true}';
const loadedConfig = loadConfig(configData);
console.log(loadedConfig);

const mixedValue: string | number = 'hello';
console.log(asString(mixedValue));                   // "hello"

const mockEvent = { clientX: 100, clientY: 200 } as MouseEvent;
console.log(getMousePosition(mockEvent));            // { x: 100, y: 200 }

const unknownArray: unknown = ['a', 'b', 'c'];
console.log(toStringArray(unknownArray));            // ['a', 'b', 'c']

console.log(ROUTES.HOME);                            // "/"

const baseUser = { name: 'Bob', email: 'bob@example.com' };
const adminUser = extendUser(baseUser, 'admin');
console.log(adminUser);

console.log(config.host);                            // "localhost"
console.log(config.features.auth);                   // true

console.log(safeAsString('valid'));                  // "valid"
try {
  console.log(safeAsString(123));                    // Error
} catch (e) {
  console.error((e as Error).message);
}
