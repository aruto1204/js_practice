/**
 * 練習問題 4: ユーティリティ型の活用 - 解答例
 *
 * このファイルでは、TypeScript 組み込みのユーティリティ型を使った実践を行います。
 */

// ==========================================
// 問題 1: Partial の使用
// ==========================================
// User 型を定義し、Partial<User> を使って一部のプロパティのみを更新する
// updateUser 関数を実装してください

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

/**
 * ユーザー情報を部分的に更新する関数
 * Partial<User> を使うことで、すべてのプロパティがオプショナルになる
 */
function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}


// ==========================================
// 問題 2: Required の使用
// ==========================================
// Config 型（すべてオプショナル）を定義し、
// Required<Config> を使って必須にする validate 関数を実装してください

interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
}

/**
 * 設定の検証関数
 * Required<Config> を使うことで、すべてのプロパティが必須になる
 */
function validateConfig(config: Required<Config>): boolean {
  return (
    typeof config.host === 'string' &&
    typeof config.port === 'number' &&
    typeof config.debug === 'boolean'
  );
}


// ==========================================
// 問題 3: Readonly の使用
// ==========================================
// Point 型を定義し、Readonly<Point> を使って不変にする freezePoint 関数を実装してください

interface Point {
  x: number;
  y: number;
}

/**
 * Point を不変オブジェクトに変換する関数
 * Readonly<Point> を使うことで、プロパティが読み取り専用になる
 */
function freezePoint(point: Point): Readonly<Point> {
  return Object.freeze({ ...point });
}


// ==========================================
// 問題 4: Pick の使用
// ==========================================
// User 型から id と name のみを抽出した UserPreview 型を作成してください

/**
 * Pick を使って User 型から特定のプロパティのみを抽出
 * id と name のみを持つプレビュー型を作成
 */
type UserPreview = Pick<User, 'id' | 'name'>;


// ==========================================
// 問題 5: Omit の使用
// ==========================================
// User 型から password を除外した SafeUser 型を作成してください

/**
 * Omit を使って User 型から password を除外
 * 公開しても安全なユーザー情報の型を作成
 */
interface UserWithPassword extends User {
  password: string;
}

type SafeUser = Omit<UserWithPassword, 'password'>;


// ==========================================
// 問題 6: Record の使用
// ==========================================
// Role 型（'admin' | 'user' | 'guest'）を定義し、
// Record<Role, Permissions> を使って権限マップを作成してください

type Role = 'admin' | 'user' | 'guest';
type PermissionList = string[];

/**
 * Record を使って Role と PermissionList のマッピングを作成
 * すべての Role に対して PermissionList が定義される
 */
const rolePermissions: Record<Role, PermissionList> = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  user: ['read', 'write'],
  guest: ['read'],
};


// ==========================================
// 問題 7: Extract の使用
// ==========================================
// type T = string | number | boolean から string | number のみを抽出してください

/**
 * Extract を使ってユニオン型から特定の型のみを抽出
 * string と number のみを取り出す
 */
type StringOrNumber = Extract<string | number | boolean, string | number>;


// ==========================================
// 問題 8: Exclude の使用
// ==========================================
// type T = string | number | boolean から boolean を除外してください

/**
 * Exclude を使ってユニオン型から特定の型を除外
 * boolean を除外して string | number のみを残す
 */
type NonBoolean = Exclude<string | number | boolean, boolean>;


// ==========================================
// 問題 9: NonNullable の使用
// ==========================================
// string | null | undefined から null と undefined を除外してください

/**
 * NonNullable を使って null と undefined を除外
 * null 安全な型を作成
 */
type NonNullString = NonNullable<string | null | undefined>;


// ==========================================
// 問題 10: ReturnType の使用
// ==========================================
// 関数 getUser の戻り値の型を抽出してください

function getUser() {
  return { id: 1, name: 'Alice', email: 'alice@example.com' };
}

/**
 * ReturnType を使って関数の戻り値の型を抽出
 * typeof を組み合わせて使用
 */
type UserType = ReturnType<typeof getUser>;


// ==========================================
// 問題 11: Parameters の使用
// ==========================================
// 関数 createUser の引数の型をタプルとして抽出してください

function createUser(name: string, age: number, email: string) {
  return { name, age, email };
}

/**
 * Parameters を使って関数の引数の型をタプルとして抽出
 * [string, number, string] という型になる
 */
type CreateUserParams = Parameters<typeof createUser>;


// ==========================================
// 問題 12: ConstructorParameters の使用
// ==========================================
// クラス Person のコンストラクタ引数の型を抽出してください

class Person {
  constructor(public name: string, public age: number) {}
}

/**
 * ConstructorParameters を使ってコンストラクタの引数の型を抽出
 * [string, number] という型になる
 */
type PersonParams = ConstructorParameters<typeof Person>;


// ==========================================
// 問題 13: Partial と Required の組み合わせ
// ==========================================
// FormData 型を定義し、一部のフィールドのみを必須にする関数を実装してください

interface FormData {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

/**
 * 特定のフィールドのみを必須にする型
 * Required<Pick<T, K>> と Partial<Omit<T, K>> を組み合わせる
 */
type RequiredFields<T, K extends keyof T> = Required<Pick<T, K>> & Partial<Omit<T, K>>;

/**
 * ログインフォームのデータ型
 * username と password は必須、他はオプショナル
 */
type LoginForm = RequiredFields<FormData, 'username' | 'password'>;

function validateLoginForm(form: LoginForm): boolean {
  return (
    form.username.length > 0 &&
    form.password.length >= 8
  );
}


// ==========================================
// 問題 14: カスタムユーティリティ型の作成
// ==========================================
// すべてのプロパティを nullable にする Nullable<T> 型を自分で実装してください

/**
 * Mapped Types を使ってカスタムユーティリティ型を作成
 * すべてのプロパティを T | null にする
 */
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};


// ==========================================
// 問題 15: 複雑なユーティリティ型の組み合わせ
// ==========================================
// User 型から email を除外し、すべてのプロパティをオプショナルにし、
// さらに readonly にした型を作成してください

/**
 * 複数のユーティリティ型を組み合わせて複雑な型を作成
 * 1. Omit で email を除外
 * 2. Partial でオプショナルに
 * 3. Readonly で読み取り専用に
 */
type ProcessedUser = Readonly<Partial<Omit<User, 'email'>>>;


// ==========================================
// テストコード
// ==========================================

console.log('=== ユーティリティ型の活用テスト ===\n');

// テスト 1: Partial
console.log('1. Partial のテスト');
const user: User = { id: 1, name: 'Alice', email: 'alice@example.com', age: 30 };
const updated = updateUser(user, { age: 31 });
console.log('更新前:', user);
console.log('更新後:', updated);
console.log('age のみ更新できた:', updated.age === 31 && updated.name === 'Alice');

// テスト 2: Required
console.log('\n2. Required のテスト');
const config: Required<Config> = {
  host: 'localhost',
  port: 3000,
  debug: true
};
console.log('設定:', config);
console.log('検証結果:', validateConfig(config));

// テスト 3: Readonly
console.log('\n3. Readonly のテスト');
const point: Point = { x: 10, y: 20 };
const frozen = freezePoint(point);
console.log('元のポイント:', point);
console.log('凍結されたポイント:', frozen);
try {
  // @ts-expect-error - 読み取り専用なので代入できない
  frozen.x = 30;
  console.log('エラー: 代入できてしまった');
} catch (error) {
  console.log('正常: 読み取り専用のため変更できない');
}

// テスト 4: Pick
console.log('\n4. Pick のテスト');
const preview: UserPreview = {
  id: 1,
  name: 'Alice'
};
console.log('ユーザープレビュー:', preview);
console.log('id と name のみを持つ:', Object.keys(preview).length === 2);

// テスト 5: Omit
console.log('\n5. Omit のテスト');
const safeUser: SafeUser = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  age: 30
};
console.log('安全なユーザー情報:', safeUser);
console.log('password が除外されている:', !('password' in safeUser));

// テスト 6: Record
console.log('\n6. Record のテスト');
console.log('権限マップ:', rolePermissions);
console.log('admin の権限:', rolePermissions.admin);
console.log('すべての Role が定義されている:',
  rolePermissions.admin && rolePermissions.user && rolePermissions.guest);

// テスト 7: Extract
console.log('\n7. Extract のテスト');
const stringValue: StringOrNumber = 'hello';
const numberValue: StringOrNumber = 42;
console.log('string 値:', stringValue);
console.log('number 値:', numberValue);
// const boolValue: StringOrNumber = true;  // エラー

// テスト 8: Exclude
console.log('\n8. Exclude のテスト');
const str: NonBoolean = 'hello';
const num: NonBoolean = 42;
console.log('string 値:', str);
console.log('number 値:', num);
// const bool: NonBoolean = true;  // エラー

// テスト 9: NonNullable
console.log('\n9. NonNullable のテスト');
const text: NonNullString = 'hello';
console.log('null でない文字列:', text);
// const nullText: NonNullString = null;  // エラー
// const undefinedText: NonNullString = undefined;  // エラー

// テスト 10: ReturnType
console.log('\n10. ReturnType のテスト');
const userFromFunction: UserType = getUser();
console.log('関数から取得したユーザー:', userFromFunction);
console.log('正しい型が抽出できた:',
  typeof userFromFunction.id === 'number' &&
  typeof userFromFunction.name === 'string');

// テスト 11: Parameters
console.log('\n11. Parameters のテスト');
const params: CreateUserParams = ['Bob', 25, 'bob@example.com'];
const newUser = createUser(...params);
console.log('引数タプル:', params);
console.log('作成されたユーザー:', newUser);

// テスト 12: ConstructorParameters
console.log('\n12. ConstructorParameters のテスト');
const personParams: PersonParams = ['Charlie', 35];
const person = new Person(...personParams);
console.log('コンストラクタ引数:', personParams);
console.log('作成された Person:', person);

// テスト 13: Partial と Required の組み合わせ
console.log('\n13. Partial と Required の組み合わせテスト');
const loginForm: LoginForm = {
  username: 'alice',
  password: 'password123'
};
console.log('ログインフォーム:', loginForm);
console.log('検証結果:', validateLoginForm(loginForm));

// オプショナルフィールドも設定可能
const loginFormWithEmail: LoginForm = {
  username: 'alice',
  password: 'password123',
  email: 'alice@example.com'
};
console.log('メール付きログインフォーム:', loginFormWithEmail);

// テスト 14: Nullable
console.log('\n14. Nullable のテスト');
const nullableUser: Nullable<User> = {
  id: 1,
  name: null,
  email: null,
  age: null
};
console.log('Nullable User:', nullableUser);
console.log('null 値を許容している:', nullableUser.name === null);

// テスト 15: 複雑なユーティリティ型の組み合わせ
console.log('\n15. 複雑なユーティリティ型の組み合わせテスト');
const processed: ProcessedUser = {
  id: 1,
  name: 'Alice'
};
console.log('処理済みユーザー:', processed);
console.log('email が除外されている:', !('email' in processed));
try {
  // @ts-expect-error - 読み取り専用なので代入できない
  processed.id = 2;
  console.log('エラー: 代入できてしまった');
} catch (error) {
  console.log('正常: 読み取り専用のため変更できない');
}

console.log('\n=== すべてのテスト完了 ===');

/**
 * 実行方法:
 * npx ts-node part2-typescript-basics/chapter06-generics/solutions/04-utility-types.ts
 *
 * または:
 * npx tsc part2-typescript-basics/chapter06-generics/solutions/04-utility-types.ts
 * node part2-typescript-basics/chapter06-generics/solutions/04-utility-types.js
 */

/**
 * 学習ポイント:
 *
 * 1. Partial<T> - すべてのプロパティをオプショナルに
 * 2. Required<T> - すべてのプロパティを必須に
 * 3. Readonly<T> - すべてのプロパティを読み取り専用に
 * 4. Pick<T, K> - 特定のプロパティのみを抽出
 * 5. Omit<T, K> - 特定のプロパティを除外
 * 6. Record<K, T> - キーと値の型を指定したオブジェクト型
 * 7. Extract<T, U> - ユニオン型から特定の型を抽出
 * 8. Exclude<T, U> - ユニオン型から特定の型を除外
 * 9. NonNullable<T> - null と undefined を除外
 * 10. ReturnType<T> - 関数の戻り値の型を抽出
 * 11. Parameters<T> - 関数の引数の型をタプルとして抽出
 * 12. ConstructorParameters<T> - コンストラクタの引数の型を抽出
 * 13. ユーティリティ型の組み合わせで複雑な型を作成
 * 14. Mapped Types でカスタムユーティリティ型を作成
 * 15. 複数のユーティリティ型を連鎖させて使用
 */
