/**
 * 解答例 3: 型エイリアス（type）
 */

// 問題 1: Product 型を定義してください
type Product = {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
};

// 問題 2: Status 型をユニオン型で定義してください
type Status = 'pending' | 'processing' | 'completed' | 'cancelled';

// 問題 3: Order 型を定義してください
type Order = {
  orderId: string;
  product: Product;
  quantity: number;
  status: Status;
};

const order: Order = {
  orderId: 'ORD-001',
  product: {
    id: 1,
    name: 'ノートPC',
    price: 80000,
    inStock: true,
  },
  quantity: 2,
  status: 'pending',
};

// 問題 4: Person 型、Contact 型、Employee 型を定義してください
type Person = {
  name: string;
  age: number;
};

type Contact = {
  email: string;
  phone: string;
};

type Employee = Person &
  Contact & {
    employeeId: string;
    position: string;
  };

const employee: Employee = {
  name: '田中一郎',
  age: 35,
  email: 'tanaka@example.com',
  phone: '090-1234-5678',
  employeeId: 'E123',
  position: 'シニアエンジニア',
};

// 問題 5: Result 型を判別可能なユニオン型で定義してください
type Result =
  | { success: true; data: string }
  | { success: false; error: string };

// 問題 6: handleResult 関数を実装してください
function handleResult(result: Result): void {
  if (result.success) {
    console.log('✅ 成功:', result.data);
  } else {
    console.log('❌ エラー:', result.error);
  }
}

// 問題 7: Coordinate 型をタプル型で定義してください
type Coordinate = [number, number];

// 問題 8: calculateDistance 関数を実装してください
function calculateDistance(point1: Coordinate, point2: Coordinate): number {
  const [x1, y1] = point1;
  const [x2, y2] = point2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

// テスト用のコード
console.log('=== 問題 3 のテスト ===');
console.log('注文情報:', order);

console.log('\n=== 問題 4 のテスト ===');
console.log('従業員情報:', employee);

console.log('\n=== 問題 6 のテスト ===');
handleResult({ success: true, data: 'データ取得成功' });
handleResult({ success: false, error: 'ネットワークエラー' });

console.log('\n=== 問題 8 のテスト ===');
const point1: Coordinate = [0, 0];
const point2: Coordinate = [3, 4];
const point3: Coordinate = [0, 0];
const point4: Coordinate = [6, 8];

console.log(`点(0, 0)と点(3, 4)の距離: ${calculateDistance(point1, point2)}`);
console.log(`点(0, 0)と点(6, 8)の距離: ${calculateDistance(point3, point4)}`);

/**
 * 実行結果:
 *
 * === 問題 3 のテスト ===
 * 注文情報: {
 *   orderId: 'ORD-001',
 *   product: { id: 1, name: 'ノートPC', price: 80000, inStock: true },
 *   quantity: 2,
 *   status: 'pending'
 * }
 *
 * === 問題 4 のテスト ===
 * 従業員情報: {
 *   name: '田中一郎',
 *   age: 35,
 *   email: 'tanaka@example.com',
 *   phone: '090-1234-5678',
 *   employeeId: 'E123',
 *   position: 'シニアエンジニア'
 * }
 *
 * === 問題 6 のテスト ===
 * ✅ 成功: データ取得成功
 * ❌ エラー: ネットワークエラー
 *
 * === 問題 8 のテスト ===
 * 点(0, 0)と点(3, 4)の距離: 5
 * 点(0, 0)と点(6, 8)の距離: 10
 */
