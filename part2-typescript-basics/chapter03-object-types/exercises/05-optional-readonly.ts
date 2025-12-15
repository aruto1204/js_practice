/**
 * 練習問題 5: オプショナル・readonly プロパティ
 *
 * このファイルでは、オプショナルプロパティと readonly プロパティの使い方を練習します。
 */

// 問題 1: UserProfile インターフェースを定義してください
// 必須プロパティ:
// - id: number (readonly)
// - username: string
//
// オプショナルプロパティ:
// - email: string
// - bio: string
// - avatarUrl: string

// ここにコードを書いてください

// 問題 2: 上記の UserProfile を使ってユーザープロフィールを作成してください
// email のみを含むもの、すべてのプロパティを含むもの、2つ作成してください

// ここにコードを書いてください

// 問題 3: BlogPost インターフェースを定義してください
// - id: number (readonly)
// - title: string
// - content: string
// - author: string (readonly)
// - publishedAt: Date (readonly)
// - tags: string[] (オプショナル)
// - views: number (オプショナル、デフォルトは 0)

// ここにコードを書いてください

// 問題 4: Config インターフェースを定義してください
// - apiUrl: string (readonly)
// - apiKey: string (readonly)
// - timeout: number (オプショナル、デフォルトは 5000)
// - retryCount: number (オプショナル、デフォルトは 3)
// - debug: boolean (オプショナル、デフォルトは false)

// ここにコードを書いてください

// 問題 5: connectWithConfig 関数を実装してください
// Config を引数に取り、デフォルト値を使って設定情報を表示します

// ここにコードを書いてください
function connectWithConfig(/* 引数の型を定義 */) {
  // デフォルト値の設定
  // 接続情報の表示
}

// 問題 6: Product インターフェースを定義してください
// - id: number (readonly)
// - name: string
// - price: number
// - description: string (オプショナル)
// - images: readonly string[] (オプショナル)
// - stock: number

// ここにコードを書いてください

// 問題 7: updateProduct 関数を実装してください
// 既存の Product と、更新用の部分的なプロパティを受け取り、新しい Product を返します
// id や readonly プロパティは変更できないようにしてください

// ヒント: Partial<T> と Omit<T, K> を使うと便利です
// ここにコードを書いてください
function updateProduct(/* 引数の型を定義 */) {
  // 実装
}

// 問題 8: DatabaseRecord インターフェースを定義してください
// - id: number (readonly)
// - createdAt: Date (readonly)
// - updatedAt: Date
// - data: Record<string, unknown>

// ここにコードを書いてください

// 問題 9: Readonly<T> を使って、User インターフェースのすべてのプロパティを
// 読み取り専用にした ReadonlyUser 型を作成してください

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// ここにコードを書いてください

// 問題 10: 配列を readonly にする練習
// Team インターフェースを定義してください
// - name: string
// - members: readonly string[] (変更不可の配列)
// - captain: string

// ここにコードを書いてください

// テスト用のコード（実行して確認できます）
// npx ts-node exercises/05-optional-readonly.ts

// 問題 2 のテスト
// const profile1: UserProfile = {
//   id: 1,
//   username: 'taro',
//   email: 'taro@example.com',
// };

// profile1.username = 'taro2'; // OK
// profile1.id = 2; // エラー: readonly プロパティは変更不可

// 問題 5 のテスト
// connectWithConfig({
//   apiUrl: 'https://api.example.com',
//   apiKey: 'secret-key',
// });

// connectWithConfig({
//   apiUrl: 'https://api.example.com',
//   apiKey: 'secret-key',
//   timeout: 10000,
//   debug: true,
// });

// 問題 7 のテスト
// const product: Product = {
//   id: 1,
//   name: 'ノートPC',
//   price: 80000,
//   stock: 10,
// };

// const updated = updateProduct(product, { price: 75000, stock: 8 });
// console.log(updated);
