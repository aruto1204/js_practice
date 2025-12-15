/**
 * 練習問題 4: interface と type の使い分け
 *
 * このファイルでは、interface と type の使い分けを理解します。
 */

// 問題 1: 以下の要件に適した型定義方法（interface または type）を選択してください
//
// 要件 A: ユーザーの基本情報を表す型
// - id: number
// - name: string
// - email: string
// 将来的に AdminUser として拡張する予定

// ここにコードを書いてください（interface または type を使う）

// 問題 2: AdminUser を定義してください（問題1の型を拡張）
// 追加プロパティ:
// - role: 'admin'
// - permissions: string[]

// ここにコードを書いてください

// 問題 3: HTTPメソッドを表す型を定義してください
// 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' のいずれか

// ここにコードを書いてください（適切な方を選択）

// 問題 4: APIレスポンスを表す型を定義してください
// 成功の場合:
// - status: 'success'
// - data: any（実際には具体的な型を使うべきですが、ここでは any で構いません）
//
// エラーの場合:
// - status: 'error'
// - message: string
// - code: number

// ここにコードを書いてください（適切な方を選択）

// 問題 5: Position 型をタプル型で定義してください
// [number, number, number]（x, y, z座標）

// ここにコードを書いてください（適切な方を選択）

// 問題 6: Shape インターフェースを定義してください
// - color: string
// - getArea(): number

// ここにコードを書いてください

// 問題 7: Circle 型を定義してください（Shape を拡張し、radius を追加）

// ここにコードを書いてください（適切な方を選択）

// 問題 8: ID 型をユニオン型で定義してください
// string または number

// ここにコードを書いてください（適切な方を選択）

// 問題 9: DataStore 型を定義してください
// キーが string で、値が any のオブジェクト
// ヒント: Record<K, V> または { [key: string]: any } を使う

// ここにコードを書いてください（適切な方を選択）

// 問題 10: 以下のコメントを読んで、interface と type のどちらを使うべきか判断してください
// それぞれのケースに対して適切な型定義を書いてください

// ケース A: React コンポーネントの Props（将来的に拡張する可能性がある）
// - title: string
// - onClick: () => void

// ここにコードを書いてください

// ケース B: ステータスコード（固定の値のいずれか）
// 200 | 400 | 404 | 500

// ここにコードを書いてください

// ケース C: データベースのモデル（他のモデルで継承される可能性がある）
// - id: number
// - createdAt: Date
// - updatedAt: Date

// ここにコードを書いてください

// テスト用のコード（実行して確認できます）
// npx ts-node exercises/04-interface-vs-type.ts

// 型定義が正しいか確認するテスト
// const user: User = { id: 1, name: '太郎', email: 'taro@example.com' };
// const admin: AdminUser = { id: 2, name: '花子', email: 'admin@example.com', role: 'admin', permissions: ['read', 'write'] };
// const method: HttpMethod = 'GET';
// const response: ApiResponse = { status: 'success', data: { message: 'OK' } };
// const position: Position = [10, 20, 30];
// const id: ID = '123'; // または 123
