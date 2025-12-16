/**
 * 練習問題 5: 高度なジェネリクスパターン
 *
 * このファイルでは、条件型やMapped Typesなどの高度なパターンを練習します。
 */

// ==========================================
// 問題 1: 条件型の基本
// ==========================================
// T が配列なら要素の型を、そうでなければ T をそのまま返す Unwrap<T> 型を実装してください
// TODO: Unwrap<T> 型を実装


// ==========================================
// 問題 2: infer の使用
// ==========================================
// Promise<T> から T を抽出する Awaited<T> 型を実装してください
// TODO: Awaited<T> 型を実装


// ==========================================
// 問題 3: Mapped Types の基本
// ==========================================
// すべてのプロパティを readonly にする ReadonlyAll<T> 型を実装してください
// TODO: ReadonlyAll<T> 型を実装


// ==========================================
// 問題 4: Mapped Types とユニオン
// ==========================================
// すべてのプロパティを T | null にする Nullable<T> 型を実装してください
// TODO: Nullable<T> 型を実装


// ==========================================
// 問題 5: 条件型とMapped Typesの組み合わせ
// ==========================================
// すべてのプロパティが関数なら () => ReturnType に、そうでなければそのままにする
// FunctionProps<T> 型を実装してください
// TODO: FunctionProps<T> 型を実装


// ==========================================
// 問題 6: DeepPartial の実装
// ==========================================
// ネストしたオブジェクトのすべてのプロパティをオプショナルにする DeepPartial<T> 型を実装してください
// TODO: DeepPartial<T> 型を実装


// ==========================================
// 問題 7: DeepReadonly の実装
// ==========================================
// ネストしたオブジェクトのすべてのプロパティを readonly にする DeepReadonly<T> 型を実装してください
// TODO: DeepReadonly<T> 型を実装


// ==========================================
// 問題 8: GetterSetterを型変換
// ==========================================
// { name: string } を { getName: () => string; setName: (value: string) => void } に変換する
// Getters<T> 型を実装してください
// TODO: Getters<T> 型を実装


// ==========================================
// 問題 9: フィルタリング型
// ==========================================
// オブジェクトから特定の型のプロパティのみを抽出する FilterByType<T, U> 型を実装してください
// TODO: FilterByType<T, U> 型を実装


// ==========================================
// 問題 10: 関数のオーバーロード型
// ==========================================
// 複数の関数シグネチャを持つ Overload 型を実装してください
// (...args: any[]) => any の配列を受け取り、オーバーロード関数型を生成
// TODO: Overload 型を実装（簡易版でOK）


// ==========================================
// 問題 11: Promisify の実装
// ==========================================
// コールバック関数を Promise を返す関数に変換する Promisify<T> 型を実装してください
// (callback: (err: Error | null, result: T) => void) => void
// を () => Promise<T> に変換
// TODO: Promisify<T> 型を実装


// ==========================================
// 問題 12: Tuple to Union
// ==========================================
// タプル型をユニオン型に変換する TupleToUnion<T> 型を実装してください
// [string, number] → string | number
// TODO: TupleToUnion<T> 型を実装


// ==========================================
// 問題 13: Union to Intersection
// ==========================================
// ユニオン型を交差型に変換する UnionToIntersection<U> 型を実装してください
// ヒント: 関数の引数の分散と infer を使用
// TODO: UnionToIntersection<U> 型を実装


// ==========================================
// 問題 14: Required Keys の抽出
// ==========================================
// オブジェクト型から必須プロパティのキーのみを抽出する RequiredKeys<T> 型を実装してください
// TODO: RequiredKeys<T> 型を実装


// ==========================================
// 問題 15: 型安全な path 関数
// ==========================================
// オブジェクトからネストしたプロパティを安全に取得する get 関数を実装してください
// 例: get(user, 'address.city') のような文字列パスで型安全にアクセス
// TODO: Path<T> 型と get 関数を実装（簡易版でOK）


// ==========================================
// テストコード（実装後にコメントを外して実行）
// ==========================================
/*
type Arr = Unwrap<number[]>;        // number
type Str = Unwrap<string>;          // string

type Num = Awaited<Promise<number>>;  // number

interface User {
  name: string;
  age: number;
}
type ReadonlyUser = ReadonlyAll<User>;

type NullableUser = Nullable<User>;
const user: NullableUser = {
  name: 'Alice',
  age: null
};

type DeepPartialUser = DeepPartial<{
  name: string;
  address: {
    city: string;
    country: string;
  };
}>;

type DeepReadonlyUser = DeepReadonly<{
  name: string;
  address: {
    city: string;
  };
}>;

type UserGetters = Getters<{ name: string; age: number }>;

type OnlyStrings = FilterByType<{
  name: string;
  age: number;
  email: string;
}, string>;
// { name: string; email: string }

type Colors = TupleToUnion<['red', 'green', 'blue']>;
// 'red' | 'green' | 'blue'

type Intersection = UnionToIntersection<{ a: number } | { b: string }>;
// { a: number } & { b: string }

type Required = RequiredKeys<{ a: number; b?: string; c: boolean }>;
// 'a' | 'c'

const obj = {
  user: {
    name: 'Alice',
    address: {
      city: 'Tokyo'
    }
  }
};
// const city = get(obj, 'user.address.city');  // 型安全
*/
