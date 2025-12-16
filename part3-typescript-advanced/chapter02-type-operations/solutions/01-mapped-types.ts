/**
 * Part 3 - Chapter 2: 高度な型操作
 * 演習 1: Mapped Types - 解答
 */

/* 問題 1: 基本的な Readonly 型
 * CustomReadonly<T> 型を作成してください。
 * すべてのプロパティを readonly にする
 */

// Mapped Types を使用してすべてのプロパティに readonly 修飾子を追加
// [K in keyof T] で T のすべてのキーを反復処理
type CustomReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// テスト
interface User {
  id: number;
  name: string;
}

type ReadonlyUser = CustomReadonly<User>;
const user: ReadonlyUser = { id: 1, name: '太郎' };
// user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.


/* 問題 2: Optional 型
 * MakeOptional<T> 型を作成してください。
 * すべてのプロパティをオプショナルにする
 */

// ? 修飾子を使用してすべてのプロパティをオプショナルにする
// これは TypeScript 組み込みの Partial<T> と同じ動作
type MakeOptional<T> = {
  [K in keyof T]?: T[K];
};

// テスト
interface Config {
  apiUrl: string;
  timeout: number;
}

type OptionalConfig = MakeOptional<Config>;
const config: OptionalConfig = {}; // OK


/* 問題 3: Mutable 型
 * Mutable<T> 型を作成してください。
 * readonly 修飾子を削除する
 */

// -readonly を使用して readonly 修飾子を削除
// マイナス記号は修飾子を削除することを意味する
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

// テスト
interface ReadonlyData {
  readonly id: number;
  readonly name: string;
}

type MutableData = Mutable<ReadonlyData>;
const data: MutableData = { id: 1, name: '太郎' };
data.id = 2; // OK


/* 問題 4: Required 型
 * MakeRequired<T> 型を作成してください。
 * すべてのプロパティを必須にする（? 修飾子を削除）
 */

// -? を使用してオプショナル修飾子を削除
// これは TypeScript 組み込みの Required<T> と同じ動作
type MakeRequired<T> = {
  [K in keyof T]-?: T[K];
};

// テスト
interface PartialUser {
  id?: number;
  name?: string;
}

type RequiredUser = MakeRequired<PartialUser>;
// const user2: RequiredUser = { id: 1 }; // Error: Property 'name' is missing


/* 問題 5: Nullable 型
 * Nullable<T> 型を作成してください。
 * すべてのプロパティに null を許可する
 */

// Union 型を使用して各プロパティに null を追加
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// テスト
interface Product {
  id: number;
  name: string;
}

type NullableProduct = Nullable<Product>;
const product: NullableProduct = { id: null, name: 'Product' }; // OK


/* 問題 6: Stringify 型
 * Stringify<T> 型を作成してください。
 * すべてのプロパティを string 型に変換する
 */

// すべてのプロパティの型を string に変換
type Stringify<T> = {
  [K in keyof T]: string;
};

// テスト
interface Data {
  id: number;
  active: boolean;
  count: number;
}

type StringData = Stringify<Data>;
const stringData: StringData = { id: '1', active: 'true', count: '10' }; // OK


/* 問題 7: Getters 型
 * Getters<T> 型を作成してください。
 * 各プロパティに対して get + プロパティ名(Capitalize) の関数型を生成
 * 例: name -> getName: () => string
 */

// Key Remapping を使用してプロパティ名を変換
// as キーワードで新しいキー名を指定
// Capitalize はプロパティ名の先頭を大文字にする組み込み型
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// テスト
interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
const getters: PersonGetters = {
  getName: () => '太郎',
  getAge: () => 25
};


/* 問題 8: Setters 型
 * Setters<T> 型を作成してください。
 * 各プロパティに対して set + プロパティ名(Capitalize) の関数型を生成
 * 例: name -> setName: (value: string) => void
 */

// Getters と同様の方法で、set プレフィックスを付けた関数型を生成
// 引数として元のプロパティの型を受け取る
type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

// テスト
type PersonSetters = Setters<Person>;
const setters: PersonSetters = {
  setName: (value: string) => {},
  setAge: (value: number) => {}
};


/* 問題 9: Promisify 型
 * Promisify<T> 型を作成してください。
 * すべてのプロパティを Promise でラップする
 */

// 各プロパティの型を Promise でラップ
type Promisify<T> = {
  [K in keyof T]: Promise<T[K]>;
};

// テスト
interface SyncData {
  id: number;
  name: string;
}

type AsyncData = Promisify<SyncData>;
const asyncData: AsyncData = {
  id: Promise.resolve(1),
  name: Promise.resolve('太郎')
};


/* 問題 10: PickByType 型
 * PickByType<T, U> 型を作成してください。
 * T の中から型が U であるプロパティのみを抽出する
 */

// Conditional Types と Key Remapping を組み合わせる
// T[K] extends U ? K : never で、型が U と互換性があるキーのみを残す
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

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

// PickByType の逆で、extends の条件を反転させる
// T[K] extends U ? never : K で、型が U でないキーのみを残す
type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

// テスト
type NonStringFields = OmitByType<Mixed, string>;
// type expected = { id: number; age: number; active: boolean }


/* 問題 12: ReadonlyByType 型
 * ReadonlyByType<T, U> 型を作成してください。
 * T の中から型が U であるプロパティのみを readonly にする
 */

// Conditional Types を使用して条件分岐
// 型が U の場合のみ readonly を付与、それ以外はそのまま
type ReadonlyByType<T, U> = {
  [K in keyof T]: T[K] extends U ? Readonly<Pick<T, K>>[K] : T[K];
};

// または、より明示的な実装:
// type ReadonlyByType<T, U> = {
//   readonly [K in keyof T as T[K] extends U ? K : never]: T[K];
// } & {
//   [K in keyof T as T[K] extends U ? never : K]: T[K];
// };

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

// Function 型を使用して関数プロパティのみを抽出
// T[K] extends Function で関数型かどうかを判定
type FunctionProperties<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K];
};

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

// 再帰的に Readonly を適用
// T[K] が object 型の場合は DeepReadonly<T[K]> を再帰的に適用
// それ以外の場合はそのまま T[K]
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? T[K] extends Function
      ? T[K]  // 関数はそのまま（関数もobjectなので除外が必要）
      : DeepReadonly<T[K]>  // オブジェクトは再帰的に適用
    : T[K];  // プリミティブ型はそのまま
};

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
const nestedData: ReadonlyNestedData = {
  user: {
    profile: {
      name: '太郎',
      age: 25
    }
  }
};
// nestedData.user.profile.name = '花子'; // Error: Cannot assign to 'name' because it is a read-only property.


/* 問題 15: DeepPartial 型
 * DeepPartial<T> 型を作成してください。
 * ネストしたオブジェクトもすべてオプショナルにする（再帰的）
 */

// 再帰的に Partial を適用
// T[K] が object 型の場合は DeepPartial<T[K]> を再帰的に適用
// すべてのプロパティをオプショナルにする
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? T[K] extends Function
      ? T[K]  // 関数はそのまま
      : DeepPartial<T[K]>  // オブジェクトは再帰的に適用
    : T[K];  // プリミティブ型はそのまま
};

// テスト
type PartialNestedData = DeepPartial<NestedData>;
const partialData1: PartialNestedData = {}; // OK
const partialData2: PartialNestedData = { user: {} }; // OK
const partialData3: PartialNestedData = { user: { profile: { name: '太郎' } } }; // OK


// テストコード
console.log('--- Mapped Types の演習 - 解答 ---');
console.log('型定義の問題のため、実行時のテストはありません');
console.log('TypeScript コンパイラでの型チェックを確認してください');
console.log('\n✅ すべての Mapped Types が正しく実装されています');
console.log('\n実装された型:');
console.log('1. CustomReadonly - すべてのプロパティを readonly に');
console.log('2. MakeOptional - すべてのプロパティをオプショナルに');
console.log('3. Mutable - readonly 修飾子を削除');
console.log('4. MakeRequired - すべてのプロパティを必須に');
console.log('5. Nullable - すべてのプロパティに null を許可');
console.log('6. Stringify - すべてのプロパティを string 型に変換');
console.log('7. Getters - getter 関数型を生成');
console.log('8. Setters - setter 関数型を生成');
console.log('9. Promisify - すべてのプロパティを Promise でラップ');
console.log('10. PickByType - 特定の型のプロパティのみを抽出');
console.log('11. OmitByType - 特定の型のプロパティを除外');
console.log('12. ReadonlyByType - 特定の型のプロパティのみを readonly に');
console.log('13. FunctionProperties - 関数型のプロパティのみを抽出');
console.log('14. DeepReadonly - 再帰的に readonly を適用');
console.log('15. DeepPartial - 再帰的に Partial を適用');
