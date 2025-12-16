/**
 * 解答例 4: interface と type の使い分け
 */

// 問題 1: ユーザーの基本情報を表す型（拡張する予定があるので interface を使用）
interface User {
  id: number;
  name: string;
  email: string;
}

// 問題 2: AdminUser を定義（User を拡張）
interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
}

// 問題 3: HTTPメソッドを表す型（ユニオン型なので type を使用）
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// 問題 4: APIレスポンスを表す型（判別可能なユニオン型なので type を使用）
type ApiResponse =
  | { status: 'success'; data: any }
  | { status: 'error'; message: string; code: number };

// 問題 5: Position 型（タプル型なので type を使用）
type Position = [number, number, number];

// 問題 6: Shape インターフェース（オブジェクトの形状なので interface を使用）
interface Shape {
  color: string;
  getArea(): number;
}

// 問題 7: Circle 型（Shape を拡張、どちらでも可能だが interface が推奨）
interface Circle extends Shape {
  radius: number;
}

// または type を使った場合
// type Circle = Shape & {
//   radius: number;
// };

// 問題 8: ID 型（ユニオン型なので type を使用）
type ID = string | number;

// 問題 9: DataStore 型（どちらでも可能だが、type が簡潔）
type DataStore = Record<string, any>;

// または
// type DataStore = { [key: string]: any };

// 問題 10: 各ケースに対する型定義

// ケース A: React コンポーネントの Props（拡張する可能性があるので interface を使用）
interface ButtonProps {
  title: string;
  onClick: () => void;
}

// ケース B: ステータスコード（リテラル型のユニオンなので type を使用）
type StatusCode = 200 | 400 | 404 | 500;

// ケース C: データベースのモデル（他のモデルで継承される可能性があるので interface を使用）
interface BaseModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// 実装例とテスト
const user: User = {
  id: 1,
  name: '太郎',
  email: 'taro@example.com',
};

const admin: AdminUser = {
  id: 2,
  name: '花子',
  email: 'admin@example.com',
  role: 'admin',
  permissions: ['read', 'write', 'delete'],
};

const method: HttpMethod = 'GET';

const successResponse: ApiResponse = {
  status: 'success',
  data: { message: 'OK' },
};

const errorResponse: ApiResponse = {
  status: 'error',
  message: 'Not Found',
  code: 404,
};

const position: Position = [10, 20, 30];

const circle: Circle = {
  color: 'red',
  radius: 5,
  getArea() {
    return Math.PI * this.radius * this.radius;
  },
};

const userId: ID = '123';
const productId: ID = 456;

const dataStore: DataStore = {
  user: { name: '太郎' },
  settings: { theme: 'dark' },
};

// テスト用のコード
console.log('=== interface と type の使い分けのテスト ===');
console.log('User:', user);
console.log('AdminUser:', admin);
console.log('HTTPメソッド:', method);
console.log('成功レスポンス:', successResponse);
console.log('エラーレスポンス:', errorResponse);
console.log('座標:', position);
console.log('円の面積:', circle.getArea());
console.log('ユーザーID:', userId);
console.log('商品ID:', productId);
console.log('データストア:', dataStore);

/**
 * 使い分けのまとめ:
 *
 * ✅ interface を使うべき場合:
 * - オブジェクトの形状を定義する
 * - 継承・拡張が必要
 * - React の Props など、外部に公開する API
 *
 * ✅ type を使うべき場合:
 * - ユニオン型を定義する
 * - タプル型を定義する
 * - プリミティブ型にエイリアスをつける
 * - 交差型を使う
 * - 関数型を定義する
 *
 * どちらでも良い場合:
 * - シンプルなオブジェクト型
 * - プロジェクトの規約に従う
 */

/**
 * 実行結果:
 *
 * === interface と type の使い分けのテスト ===
 * User: { id: 1, name: '太郎', email: 'taro@example.com' }
 * AdminUser: { id: 2, name: '花子', email: 'admin@example.com', role: 'admin', permissions: [ 'read', 'write', 'delete' ] }
 * HTTPメソッド: GET
 * 成功レスポンス: { status: 'success', data: { message: 'OK' } }
 * エラーレスポンス: { status: 'error', message: 'Not Found', code: 404 }
 * 座標: [ 10, 20, 30 ]
 * 円の面積: 78.53981633974483
 * ユーザーID: 123
 * 商品ID: 456
 * データストア: { user: { name: '太郎' }, settings: { theme: 'dark' } }
 */
