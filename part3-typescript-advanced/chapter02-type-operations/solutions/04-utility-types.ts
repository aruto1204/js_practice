/**
 * Part 3 - Chapter 2: 高度な型操作
 * 演習 4: 高度なユーティリティ型 - 解答
 */

/* 問題 1: RequiredKeys 型
 * RequiredKeys<T> 型を作成してください。
 * T の必須プロパティのキーのユニオン型を生成
 */

// 必須プロパティのキーを抽出する型
// {} extends Pick<T, K> は、K プロパティが空オブジェクトに割り当て可能（=オプショナル）かどうかを判定
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

// テスト
interface User {
  id: number;
  name: string;
  email?: string;
  phone?: string;
}

type Test1 = RequiredKeys<User>; // "id" | "name"


/* 問題 2: OptionalKeys 型
 * OptionalKeys<T> 型を作成してください。
 * T のオプショナルプロパティのキーのユニオン型を生成
 */

// オプショナルプロパティのキーを抽出する型
// {} extends Pick<T, K> が true の場合、そのプロパティはオプショナル
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// テスト
type Test2 = OptionalKeys<User>; // "email" | "phone"


/* 問題 3: PickRequired 型
 * PickRequired<T> 型を作成してください。
 * T から必須プロパティのみを抽出
 */

// 必須プロパティのみを抽出する型
// RequiredKeys<T> で必須キーを取得し、Pick で抽出
type PickRequired<T> = Pick<T, RequiredKeys<T>>;

// テスト
type Test3 = PickRequired<User>; // { id: number; name: string }


/* 問題 4: PickOptional 型
 * PickOptional<T> 型を作成してください。
 * T からオプショナルプロパティのみを抽出
 */

// オプショナルプロパティのみを抽出する型
// OptionalKeys<T> でオプショナルキーを取得し、Pick で抽出
type PickOptional<T> = Pick<T, OptionalKeys<T>>;

// テスト
type Test4 = PickOptional<User>; // { email?: string; phone?: string }


/* 問題 5: Merge 型
 * Merge<T, U> 型を作成してください。
 * T と U をマージ（U のプロパティが優先）
 */

// 2つの型をマージする型
// T から U に存在するキーを除外し、U と合成することで U が優先される
type Merge<T, U> = Omit<T, keyof U> & U;

// テスト
interface Base {
  id: number;
  name: string;
}

interface Extended {
  name: string;
  email: string;
}

type Test5 = Merge<Base, Extended>;
// { id: number; name: string; email: string }


/* 問題 6: Diff 型
 * Diff<T, U> 型を作成してください。
 * T から U に存在するプロパティを除外
 */

// T から U のキーを除外する型
// Omit を使って U のキーを T から除外
type Diff<T, U> = Omit<T, keyof U>;

// テスト
type Test6 = Diff<Base, Extended>;
// { id: number }


/* 問題 7: Intersection 型
 * Intersection<T, U> 型を作成してください。
 * T と U の両方に存在するプロパティのみ抽出
 */

// T と U の共通キーのみを抽出する型
// Extract で共通キーを取得し、Pick で抽出
type Intersection<T, U> = Pick<T, Extract<keyof T, keyof U>>;

// テスト
type Test7 = Intersection<Base, Extended>;
// { name: string }


/* 問題 8: PartialBy 型
 * PartialBy<T, K> 型を作成してください。
 * T のうち K で指定したプロパティのみをオプショナルにする
 */

// 指定したキーのみをオプショナルにする型
// K のプロパティを Partial にし、残りはそのまま維持
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// テスト
type Test8 = PartialBy<User, 'id' | 'name'>;
// { id?: number; name?: string; email?: string; phone?: string }


/* 問題 9: RequiredBy 型
 * RequiredBy<T, K> 型を作成してください。
 * T のうち K で指定したプロパティを必須にする
 */

// 指定したキーを必須にする型
// K のプロパティを Required にし、残りはそのまま維持
type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// テスト
type Test9 = RequiredBy<User, 'email'>;
// { id: number; name: string; email: string; phone?: string }


/* 問題 10: Mutable 型
 * Mutable<T> 型を作成してください。
 * すべての readonly を削除
 */

// すべての readonly 修飾子を削除する型
// -readonly でマッピング修飾子を削除
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

// テスト
interface ReadonlyData {
  readonly id: number;
  readonly name: string;
}

type Test10 = Mutable<ReadonlyData>;
// { id: number; name: string }


/* 問題 11: DeepMutable 型
 * DeepMutable<T> 型を作成してください。
 * ネストしたオブジェクトの readonly も削除（再帰的）
 */

// 再帰的に readonly を削除する型
// オブジェクト型の場合は再帰的に DeepMutable を適用
type DeepMutable<T> = {
  -readonly [K in keyof T]: T[K] extends object
    ? DeepMutable<T[K]>
    : T[K];
};

// テスト
interface DeepReadonly {
  readonly user: {
    readonly name: string;
    readonly profile: {
      readonly age: number;
    };
  };
}

type Test11 = DeepMutable<DeepReadonly>;
// { user: { name: string; profile: { age: number } } }


/* 問題 12: PromiseValue 型
 * PromiseValue<T> 型を作成してください。
 * Promise<T> から T を取り出す（ネストした Promise にも対応）
 */

// Promise から値の型を取り出す型（再帰的）
// infer で Promise の型引数を取り出し、ネストした Promise も展開
type PromiseValue<T> = T extends Promise<infer U>
  ? PromiseValue<U>
  : T;

// テスト
type Test12 = PromiseValue<Promise<string>>; // string
type Test13 = PromiseValue<Promise<Promise<number>>>; // number


/* 問題 13: FunctionKeys 型
 * FunctionKeys<T> 型を作成してください。
 * T のプロパティのうち、関数型のキーのみを抽出
 */

// 関数型のキーのみを抽出する型
// T[K] が Function に割り当て可能かどうかを判定
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

// テスト
interface Methods {
  id: number;
  getName: () => string;
  setAge: (age: number) => void;
  data: string;
}

type Test14 = FunctionKeys<Methods>; // "getName" | "setAge"


/* 問題 14: NonFunctionKeys 型
 * NonFunctionKeys<T> 型を作成してください。
 * T のプロパティのうち、関数型でないキーのみを抽出
 */

// 関数型でないキーのみを抽出する型
// T[K] が Function に割り当て可能でない場合のみキーを残す
type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

// テスト
type Test15 = NonFunctionKeys<Methods>; // "id" | "data"


/* 問題 15: PathValue 型（高度）
 * PathValue<T, P> 型を作成してください。
 * ネストしたオブジェクト T のパス P の値の型を取得
 * 例: PathValue<{ user: { name: string } }, "user.name"> -> string
 */

// ネストしたオブジェクトのパスから値の型を取得する型
// パスを "." で分割し、再帰的に型を辿る
type PathValue<T, P extends string> = P extends `${infer First}.${infer Rest}`
  ? First extends keyof T
    ? PathValue<T[First], Rest>
    : never
  : P extends keyof T
  ? T[P]
  : never;

// テスト
interface NestedData {
  user: {
    profile: {
      name: string;
      age: number;
    };
    settings: {
      theme: string;
    };
  };
}

type Test16 = PathValue<NestedData, 'user'>; // { profile: { name: string; age: number }; settings: { theme: string } }
type Test17 = PathValue<NestedData, 'user.profile'>; // { name: string; age: number }
type Test18 = PathValue<NestedData, 'user.profile.name'>; // string


// 実行時テスト
console.log('--- 高度なユーティリティ型の演習 ---');

// 問題 1-2: RequiredKeys と OptionalKeys のテスト
function getRequiredKeys<T>(obj: T): RequiredKeys<T>[] {
  // 実装は省略（型チェックのみ）
  return [] as RequiredKeys<T>[];
}

const user: User = { id: 1, name: '太郎' };
console.log('User:', user);

// 問題 5: Merge のテスト
function merge<T, U>(obj1: T, obj2: U): Merge<T, U> {
  return { ...obj1, ...obj2 } as Merge<T, U>;
}

const base: Base = { id: 1, name: '太郎' };
const extended: Extended = { name: '花子', email: 'hanako@example.com' };
const merged = merge(base, extended);
console.log('Merged:', merged); // { id: 1, name: '花子', email: 'hanako@example.com' }

// 問題 8: PartialBy のテスト
function createPartialUser(data: PartialBy<User, 'id'>): User {
  return {
    id: data.id ?? 0,
    name: data.name,
    email: data.email,
    phone: data.phone,
  };
}

const partialUser = createPartialUser({ name: '太郎' });
console.log('Partial User:', partialUser);

// 問題 10: Mutable のテスト
function makeMutable<T extends ReadonlyData>(obj: T): Mutable<T> {
  return { ...obj } as Mutable<T>;
}

const readonlyData: ReadonlyData = { id: 1, name: '太郎' };
const mutableData = makeMutable(readonlyData);
mutableData.id = 2; // OK
console.log('Mutable Data:', mutableData);

// 問題 12: PromiseValue のテスト
async function unwrapPromise<T>(promise: Promise<T>): Promise<PromiseValue<T>> {
  return await promise as PromiseValue<T>;
}

unwrapPromise(Promise.resolve('hello')).then(v => {
  console.log('Promise Value:', v); // "hello"
});

// 問題 13-14: FunctionKeys/NonFunctionKeys のテスト
const methods: Methods = {
  id: 1,
  getName: () => '太郎',
  setAge: (age: number) => {},
  data: 'test',
};

console.log('Methods:', methods);

console.log('\nその他の型は TypeScript コンパイラで検証してください');
