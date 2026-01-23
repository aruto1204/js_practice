/**
 * 練習問題 4: ユーティリティ型の活用
 *
 * このファイルでは、TypeScript 組み込みのユーティリティ型を使った実践を行います。
 */

// ==========================================
// 問題 1: Partial の使用
// ==========================================
// User 型を定義し、Partial<User> を使って一部のプロパティのみを更新する
// updateUser 関数を実装してください
// TODO: User 型と updateUser 関数を実装

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}

// ==========================================
// 問題 2: Required の使用
// ==========================================
// Config 型（すべてオプショナル）を定義し、
// Required<Config> を使って必須にする validate 関数を実装してください
// TODO: Config 型と validate 関数を実装

interface Config {
  host?: string;
  port?: number;
  debug?: boolean;
}

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
// TODO: Point 型と freezePoint 関数を実装

interface Point {
  x: number;
  y: number;
}

function freezePoint(point: Point): Readonly<Point> {
  return Object.freeze({ ...point });
}

// ==========================================
// 問題 4: Pick の使用
// ==========================================
// User 型から id と name のみを抽出した UserPreview 型を作成してください
// TODO: User 型と UserPreview 型を実装

type UserPreview = Pick<User, 'id' | 'name'>;


// ==========================================
// 問題 5: Omit の使用
// ==========================================
// User 型から password を除外した SafeUser 型を作成してください
// TODO: SafeUser 型を実装

interface UserWithPassword extends User {
  password: string;
}

type SafeUser = Omit<UserWithPassword, 'password'>;


// ==========================================
// 問題 6: Record の使用
// ==========================================
// Role 型（'admin' | 'user' | 'guest'）を定義し、
// Record<Role, Permissions> を使って権限マップを作成してください
// TODO: Role, Permissions 型と権限マップを実装

type Role = 'admin' | 'user' | 'guest';

// ==========================================
// 問題 7: Extract の使用
// ==========================================
// type T = string | number | boolean から string | number のみを抽出してください
// TODO: Extract を使って StringOrNumber 型を実装

type StringOrNumber = Extract<string | number | boolean, string | number>;


// ==========================================
// 問題 8: Exclude の使用
// ==========================================
// type T = string | number | boolean から boolean を除外してください
// TODO: Exclude を使って NonBoolean 型を実装

type NonBoolean = Exclude<string | number | boolean, boolean>;


// ==========================================
// 問題 9: NonNullable の使用
// ==========================================
// string | null | undefined から null と undefined を除外してください
// TODO: NonNullable を使って NonNullString 型を実装

type NonNullString = NonNullable<string | null | undefined>;
// ==========================================
// 問題 10: ReturnType の使用
// ==========================================
// 関数 getUser の戻り値の型を抽出してください
// TODO: getUser 関数と UserType 型を実装

function getUser() {
  return { id: 1, name: 'Alice' };
}
type UserType = ReturnType<typeof getUser>;
// ==========================================
// 問題 11: Parameters の使用
// ==========================================
// 関数 createUser の引数の型をタプルとして抽出してください
// TODO: createUser 関数と CreateUserParams 型を実装

function createUser(name: string, age: number, email: string) {
  return { name, age, email };
}
type CreateUserParams = Parameters<typeof createUser>;
// ==========================================
// 問題 12: ConstructorParameters の使用
// ==========================================
// クラス Person のコンストラクタ引数の型を抽出してください
// TODO: Person クラスと PersonParams 型を実装

class Person {
  constructor(public name: string, public age: number) {}
}

type PersonParams = ConstructorParameters<typeof Person>;


// ==========================================
// 問題 13: Partial と Required の組み合わせ
// ==========================================
// FormData 型を定義し、一部のフィールドのみを必須にする関数を実装してください
// TODO: FormData 型と関数を実装

interface FormData {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

type RequiredFields<T, K extends keyof T> = Required<Pick<T, K>> & Partial<Omit<T, K>>;


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
// TODO: Nullable<T> 型を実装

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};



// ==========================================
// 問題 15: 複雑なユーティリティ型の組み合わせ
// ==========================================
// User 型から email を除外し、すべてのプロパティをオプショナルにし、
// さらに readonly にした型を作成してください
// TODO: ProcessedUser 型を実装
type ProcessedUser = Readonly<Partial<Omit<User, 'email'>>>;

// ==========================================
// テストコード（実装後にコメントを外して実行）
// ==========================================

const user: User = { id: 1, name: 'Alice', email: 'alice@example.com', age: 30 };
const updated = updateUser(user, { age: 31 });
console.log(updated);

const config: Required<Config> = {
  host: 'localhost',
  port: 3000,
  debug: true
};
console.log(validateConfig(config));

const point: Point = { x: 10, y: 20 };
const frozen = freezePoint(point);
console.log(frozen);
// frozen.x = 30;  // エラー

const preview: UserPreview = {
  id: 1,
  name: 'Alice'
};
console.log(preview);

const safeUser: SafeUser = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  age: 30
};
console.log(safeUser);

type Permissions = string[];
const permissions: Record<Role, Permissions> = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
};
console.log(permissions);

const value: StringOrNumber = 42;  // OK
console.log(value);
// const invalid: StringOrNumber = true;  // エラー


const stringValue: StringOrNumber = 'hello';
const numberValue: StringOrNumber = 42;
console.log('string 値:', stringValue);
console.log('number 値:', numberValue);

const str: NonBoolean = 'hello';
const num: NonBoolean = 42;
console.log('string 値:', str);
console.log('number 値:', num);

const text: NonNullString = 'hello';
console.log('null でない文字列:', text);


const userFromFunction: UserType = getUser();
console.log('関数から取得したユーザー:', userFromFunction);
console.log('正しい型が抽出できた:',typeof userFromFunction.id === 'number' && typeof userFromFunction.name === 'string');

const params: CreateUserParams = ['Bob', 25, 'bob@example.com'];
const newUser = createUser(...params);
console.log('引数タプル:', params);
console.log('作成されたユーザー:', newUser);

const personParams: PersonParams = ['Charlie', 35];
const person = new Person(...personParams);
console.log('コンストラクタ引数:', personParams);
console.log('作成された Person:', person);


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

console.log('\n14. Nullable のテスト');
const nullableUser: Nullable<User> = {
  id: 1,
  name: null,
  email: null,
  age: null
};
console.log('Nullable User:', nullableUser);
console.log('null 値を許容している:', nullableUser.name === null);

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
