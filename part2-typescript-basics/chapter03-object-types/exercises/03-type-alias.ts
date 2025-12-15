/**
 * 練習問題 3: 型エイリアス（type）
 *
 * このファイルでは、type を使った型定義を練習します。
 */

// 問題 1: Product 型を定義してください
// - id: number
// - name: string
// - price: number
// - inStock: boolean

// ここにコードを書いてください

// 問題 2: Status 型をユニオン型で定義してください
// 'pending' | 'processing' | 'completed' | 'cancelled' のいずれか

// ここにコードを書いてください

// 問題 3: Order 型を定義してください（上記の Product と Status を使用）
// - orderId: string
// - product: Product
// - quantity: number
// - status: Status

// ここにコードを書いてください

// 問題 4: Person 型と Contact 型を定義し、交差型で Employee 型を作成してください
// Person:
// - name: string
// - age: number
//
// Contact:
// - email: string
// - phone: string
//
// Employee (Person & Contact に追加プロパティ):
// - employeeId: string
// - position: string

// ここにコードを書いてください

// 問題 5: Result 型を判別可能なユニオン型で定義してください
// Success の場合:
// - success: true
// - data: string
//
// Error の場合:
// - success: false
// - error: string

// ここにコードを書いてください

// 問題 6: handleResult 関数を実装してください
// Result 型を引数に取り、success の値に応じて適切な処理を行います

// ここにコードを書いてください
function handleResult(/* 引数の型を定義 */) {
  // 実装
}

// 問題 7: Coordinate 型をタプル型で定義してください
// [number, number] の形式（x座標, y座標）

// ここにコードを書いてください

// 問題 8: calculateDistance 関数を実装してください
// 2つの座標（Coordinate型）を受け取り、距離を計算して返します
// 距離の計算式: √((x2-x1)² + (y2-y1)²)

// ここにコードを書いてください
function calculateDistance(/* 引数の型を定義 */) {
  // 実装
}

// テスト用のコード（実行して確認できます）
// npx ts-node exercises/03-type-alias.ts

// 問題 6 のテスト
// handleResult({ success: true, data: 'データ取得成功' });
// handleResult({ success: false, error: 'データ取得失敗' });

// 問題 8 のテスト
// const point1: Coordinate = [0, 0];
// const point2: Coordinate = [3, 4];
// console.log(`距離: ${calculateDistance(point1, point2)}`); // 5
