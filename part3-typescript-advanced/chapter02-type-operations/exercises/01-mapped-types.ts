/**
 * Part 3 - Chapter 2: 高度な型操作
 * 演習 1: Mapped Types
 */

/* 問題 1: 基本的な Readonly 型
 * CustomReadonly<T> 型を作成してください。
 * すべてのプロパティを readonly にする
 */

// ここに実装
type CustomReadonly<T> = any; // 修正してください

// テスト
interface User {
  id: number;
  name: string;
}

type ReadonlyUser = CustomReadonly<User>;
// const user: ReadonlyUser = { id: 1, name: '太郎' };
// user.id = 2; // Error になるべき


/* 問題 2: Optional 型
 * MakeOptional<T> 型を作成してください。
 * すべてのプロパティをオプショナルにする
 */

// ここに実装
type MakeOptional<T> = any; // 修正してください

// テスト
interface Config {
  apiUrl: string;
  timeout: number;
}

type OptionalConfig = MakeOptional<Config>;
// const config: OptionalConfig = {}; // OK であるべき


/* 問題 3: Mutable 型
 * Mutable<T> 型を作成してください。
 * readonly 修飾子を削除する
 */

// ここに実装
type Mutable<T> = any; // 修正してください

// テスト
interface ReadonlyData {
  readonly id: number;
  readonly name: string;
}

type MutableData = Mutable<ReadonlyData>;
// const data: MutableData = { id: 1, name: '太郎' };
// data.id = 2; // OK であるべき


/* 問題 4: Required 型
 * MakeRequired<T> 型を作成してください。
 * すべてのプロパティを必須にする（? 修飾子を削除）
 */

// ここに実装
type MakeRequired<T> = any; // 修正してください

// テスト
interface PartialUser {
  id?: number;
  name?: string;
}

type RequiredUser = MakeRequired<PartialUser>;
// const user: RequiredUser = { id: 1 }; // Error になるべき


/* 問題 5: Nullable 型
 * Nullable<T> 型を作成してください。
 * すべてのプロパティに null を許可する
 */

// ここに実装
type Nullable<T> = any; // 修正してください

// テスト
interface Product {
  id: number;
  name: string;
}

type NullableProduct = Nullable<Product>;
// const product: NullableProduct = { id: null, name: 'Product' }; // OK であるべき


/* 問題 6: Stringify 型
 * Stringify<T> 型を作成してください。
 * すべてのプロパティを string 型に変換する
 */

// ここに実装
type Stringify<T> = any; // 修正してください

// テスト
interface Data {
  id: number;
  active: boolean;
  count: number;
}

type StringData = Stringify<Data>;
// const data: StringData = { id: '1', active: 'true', count: '10' }; // OK であるべき


/* 問題 7: Getters 型
 * Getters<T> 型を作成してください。
 * 各プロパティに対して get + プロパティ名(Capitalize) の関数型を生成
 * 例: name -> getName: () => string
 */

// ここに実装
type Getters<T> = any; // 修正してください

// テスト
interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// const getters: PersonGetters = {
//   getName: () => '太郎',
//   getAge: () => 25
// };


/* 問題 8: Setters 型
 * Setters<T> 型を作成してください。
 * 各プロパティに対して set + プロパティ名(Capitalize) の関数型を生成
 * 例: name -> setName: (value: string) => void
 */

// ここに実装
type Setters<T> = any; // 修正してください

// テスト
type PersonSetters = Setters<Person>;
// const setters: PersonSetters = {
//   setName: (value: string) => {},
//   setAge: (value: number) => {}
// };


/* 問題 9: Promisify 型
 * Promisify<T> 型を作成してください。
 * すべてのプロパティを Promise でラップする
 */

// ここに実装
type Promisify<T> = any; // 修正してください

// テスト
interface SyncData {
  id: number;
  name: string;
}

type AsyncData = Promisify<SyncData>;
// const data: AsyncData = {
//   id: Promise.resolve(1),
//   name: Promise.resolve('太郎')
// };


/* 問題 10: PickByType 型
 * PickByType<T, U> 型を作成してください。
 * T の中から型が U であるプロパティのみを抽出する
 */

// ここに実装
type PickByType<T, U> = any; // 修正してください

// テスト
interface Mixed {
  id: number;
  name: string;
  age: number;
  active: boolean;
}

type StringFields = PickByType<Mixed, string>;
// type expected = { name: string }

type NumberFields = PickByType<Mixed, number>;
// type expected = { id: number; age: number }


/* 問題 11: OmitByType 型
 * OmitByType<T, U> 型を作成してください。
 * T の中から型が U であるプロパティを除外する
 */

// ここに実装
type OmitByType<T, U> = any; // 修正してください

// テスト
type NonStringFields = OmitByType<Mixed, string>;
// type expected = { id: number; age: number; active: boolean }


/* 問題 12: ReadonlyByType 型
 * ReadonlyByType<T, U> 型を作成してください。
 * T の中から型が U であるプロパティのみを readonly にする
 */

// ここに実装
type ReadonlyByType<T, U> = any; // 修正してください

// テスト
type PartiallyReadonly = ReadonlyByType<Mixed, number>;
// type expected = {
//   readonly id: number;
//   name: string;
//   readonly age: number;
//   active: boolean;
// }


/* 問題 13: FunctionProperties 型
 * FunctionProperties<T> 型を作成してください。
 * T の中から関数型のプロパティのみを抽出する
 */

// ここに実装
type FunctionProperties<T> = any; // 修正してください

// テスト
interface Methods {
  id: number;
  getName: () => string;
  setAge: (age: number) => void;
  data: string;
}

type OnlyMethods = FunctionProperties<Methods>;
// type expected = {
//   getName: () => string;
//   setAge: (age: number) => void;
// }


/* 問題 14: DeepReadonly 型
 * DeepReadonly<T> 型を作成してください。
 * ネストしたオブジェクトもすべて readonly にする（再帰的）
 */

// ここに実装
type DeepReadonly<T> = any; // 修正してください

// テスト
interface NestedData {
  user: {
    profile: {
      name: string;
      age: number;
    };
  };
}

type ReadonlyNestedData = DeepReadonly<NestedData>;
// const data: ReadonlyNestedData = {
//   user: {
//     profile: {
//       name: '太郎',
//       age: 25
//     }
//   }
// };
// data.user.profile.name = '花子'; // Error になるべき


/* 問題 15: DeepPartial 型
 * DeepPartial<T> 型を作成してください。
 * ネストしたオブジェクトもすべてオプショナルにする（再帰的）
 */

// ここに実装
type DeepPartial<T> = any; // 修正してください

// テスト
type PartialNestedData = DeepPartial<NestedData>;
// const data: PartialNestedData = {}; // OK であるべき
// const data2: PartialNestedData = { user: {} }; // OK であるべき


// テストコード
console.log('--- Mapped Types の演習 ---');
console.log('型定義の問題のため、実行時のテストはありません');
console.log('TypeScript コンパイラでの型チェックを確認してください');
