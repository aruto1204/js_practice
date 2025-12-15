/**
 * 解答例 5: オプショナル・readonly プロパティ
 */

// 問題 1: UserProfile インターフェースを定義してください
interface UserProfile {
  readonly id: number;
  username: string;
  email?: string;
  bio?: string;
  avatarUrl?: string;
}

// 問題 2: UserProfile を使ってユーザープロフィールを作成してください
const profile1: UserProfile = {
  id: 1,
  username: 'taro',
  email: 'taro@example.com',
};

const profile2: UserProfile = {
  id: 2,
  username: 'hanako',
  email: 'hanako@example.com',
  bio: 'フロントエンドエンジニア',
  avatarUrl: 'https://example.com/avatar.jpg',
};

// 問題 3: BlogPost インターフェースを定義してください
interface BlogPost {
  readonly id: number;
  title: string;
  content: string;
  readonly author: string;
  readonly publishedAt: Date;
  tags?: string[];
  views?: number;
}

const blogPost: BlogPost = {
  id: 1,
  title: 'TypeScriptの基礎',
  content: 'TypeScriptは型安全な言語です...',
  author: '山田太郎',
  publishedAt: new Date('2024-01-15'),
  tags: ['TypeScript', 'プログラミング'],
  views: 0,
};

// 問題 4: Config インターフェースを定義してください
interface Config {
  readonly apiUrl: string;
  readonly apiKey: string;
  timeout?: number;
  retryCount?: number;
  debug?: boolean;
}

// 問題 5: connectWithConfig 関数を実装してください
function connectWithConfig(config: Config): void {
  const timeout = config.timeout ?? 5000;
  const retryCount = config.retryCount ?? 3;
  const debug = config.debug ?? false;

  console.log('=== 接続設定 ===');
  console.log(`API URL: ${config.apiUrl}`);
  console.log(`API Key: ${config.apiKey.substring(0, 10)}...`);
  console.log(`タイムアウト: ${timeout}ms`);
  console.log(`リトライ回数: ${retryCount}`);
  console.log(`デバッグモード: ${debug ? '有効' : '無効'}`);
}

// 問題 6: Product インターフェースを定義してください
interface Product {
  readonly id: number;
  name: string;
  price: number;
  description?: string;
  images?: readonly string[];
  stock: number;
}

// 問題 7: updateProduct 関数を実装してください
type ProductUpdate = Partial<Omit<Product, 'id'>>;

function updateProduct(product: Product, updates: ProductUpdate): Product {
  return {
    ...product,
    ...updates,
  };
}

// 問題 8: DatabaseRecord インターフェースを定義してください
interface DatabaseRecord {
  readonly id: number;
  readonly createdAt: Date;
  updatedAt: Date;
  data: Record<string, unknown>;
}

// 問題 9: ReadonlyUser 型を作成してください
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type ReadonlyUser = Readonly<User>;

// 問題 10: Team インターフェースを定義してください
interface Team {
  name: string;
  members: readonly string[];
  captain: string;
}

// テスト用のコード
console.log('=== 問題 2 のテスト ===');
console.log('プロフィール1:', profile1);
console.log('プロフィール2:', profile2);

// readonly のテスト
// profile1.id = 2; // エラー: Cannot assign to 'id' because it is a read-only property
profile1.username = 'taro2'; // OK
console.log('更新後のプロフィール1:', profile1);

console.log('\n=== 問題 3 のテスト ===');
console.log('ブログ投稿:', blogPost);
// blogPost.author = '佐藤花子'; // エラー: readonly プロパティは変更不可

console.log('\n=== 問題 5 のテスト ===');
connectWithConfig({
  apiUrl: 'https://api.example.com',
  apiKey: 'secret-key-12345',
});

console.log('');
connectWithConfig({
  apiUrl: 'https://api.example.com',
  apiKey: 'secret-key-67890',
  timeout: 10000,
  retryCount: 5,
  debug: true,
});

console.log('\n=== 問題 7 のテスト ===');
const product: Product = {
  id: 1,
  name: 'ノートPC',
  price: 80000,
  description: '高性能ノートパソコン',
  stock: 10,
};

console.log('元の商品:', product);

const updatedProduct = updateProduct(product, {
  price: 75000,
  stock: 8,
  description: '高性能ノートパソコン（値下げ中）',
});

console.log('更新後の商品:', updatedProduct);

// readonly 配列のテスト
console.log('\n=== 問題 10 のテスト ===');
const team: Team = {
  name: '開発チーム',
  members: ['太郎', '花子', '次郎'],
  captain: '太郎',
};

console.log('チーム:', team);
// team.members.push('四郎'); // エラー: readonly 配列は変更不可
// team.members[0] = '太郎2'; // エラー: readonly 配列は変更不可
team.captain = '花子'; // OK
console.log('更新後のチーム:', team);

// ReadonlyUser のテスト
console.log('\n=== 問題 9 のテスト ===');
const readonlyUser: ReadonlyUser = {
  id: 1,
  name: '太郎',
  email: 'taro@example.com',
  age: 25,
};

console.log('読み取り専用ユーザー:', readonlyUser);
// readonlyUser.name = '花子'; // エラー: すべてのプロパティが readonly

/**
 * 実行結果:
 *
 * === 問題 2 のテスト ===
 * プロフィール1: { id: 1, username: 'taro', email: 'taro@example.com' }
 * プロフィール2: {
 *   id: 2,
 *   username: 'hanako',
 *   email: 'hanako@example.com',
 *   bio: 'フロントエンドエンジニア',
 *   avatarUrl: 'https://example.com/avatar.jpg'
 * }
 * 更新後のプロフィール1: { id: 1, username: 'taro2', email: 'taro@example.com' }
 *
 * === 問題 3 のテスト ===
 * ブログ投稿: {
 *   id: 1,
 *   title: 'TypeScriptの基礎',
 *   content: 'TypeScriptは型安全な言語です...',
 *   author: '山田太郎',
 *   publishedAt: 2024-01-15T00:00:00.000Z,
 *   tags: [ 'TypeScript', 'プログラミング' ],
 *   views: 0
 * }
 *
 * === 問題 5 のテスト ===
 * === 接続設定 ===
 * API URL: https://api.example.com
 * API Key: secret-key...
 * タイムアウト: 5000ms
 * リトライ回数: 3
 * デバッグモード: 無効
 *
 * === 接続設定 ===
 * API URL: https://api.example.com
 * API Key: secret-key...
 * タイムアウト: 10000ms
 * リトライ回数: 5
 * デバッグモード: 有効
 *
 * === 問題 7 のテスト ===
 * 元の商品: {
 *   id: 1,
 *   name: 'ノートPC',
 *   price: 80000,
 *   description: '高性能ノートパソコン',
 *   stock: 10
 * }
 * 更新後の商品: {
 *   id: 1,
 *   name: 'ノートPC',
 *   price: 75000,
 *   description: '高性能ノートパソコン（値下げ中）',
 *   stock: 8
 * }
 *
 * === 問題 10 のテスト ===
 * チーム: { name: '開発チーム', members: [ '太郎', '花子', '次郎' ], captain: '太郎' }
 * 更新後のチーム: { name: '開発チーム', members: [ '太郎', '花子', '次郎' ], captain: '花子' }
 *
 * === 問題 9 のテスト ===
 * 読み取り専用ユーザー: { id: 1, name: '太郎', email: 'taro@example.com', age: 25 }
 */
