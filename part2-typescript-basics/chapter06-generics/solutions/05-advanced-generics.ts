/**
 * 練習問題 5: 高度なジェネリクスパターン - 解答例
 *
 * このファイルでは、条件型やMapped Typesなどの高度なパターンを練習します。
 */

// ==========================================
// 問題 1: 条件型の基本
// ==========================================
// T が配列なら要素の型を、そうでなければ T をそのまま返す Unwrap<T> 型を実装してください

/**
 * 条件型を使って配列の要素型を抽出
 * T extends Array<infer U> で配列かどうかを判定し、要素の型 U を抽出
 */
type Unwrap<T> = T extends Array<infer U> ? U : T;


// ==========================================
// 問題 2: infer の使用
// ==========================================
// Promise<T> から T を抽出する Awaited<T> 型を実装してください

/**
 * infer を使って Promise から値の型を抽出
 * Promise<infer U> で Promise の中身の型 U を取り出す
 * ネストした Promise にも対応（再帰的）
 * 注: TypeScript 4.5 以降は組み込み型として存在するため、
 * 学習用に MyAwaited という名前で実装
 */
type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;


// ==========================================
// 問題 3: Mapped Types の基本
// ==========================================
// すべてのプロパティを readonly にする ReadonlyAll<T> 型を実装してください

/**
 * Mapped Types を使ってすべてのプロパティを readonly に
 * [K in keyof T] でオブジェクトのすべてのキーを反復
 */
type ReadonlyAll<T> = {
  readonly [K in keyof T]: T[K];
};


// ==========================================
// 問題 4: Mapped Types とユニオン
// ==========================================
// すべてのプロパティを T | null にする Nullable<T> 型を実装してください

/**
 * Mapped Types を使ってすべてのプロパティを nullable に
 * 各プロパティの型を T[K] | null に変換
 */
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};


// ==========================================
// 問題 5: 条件型とMapped Typesの組み合わせ
// ==========================================
// すべてのプロパティが関数なら () => ReturnType に、そうでなければそのままにする
// FunctionProps<T> 型を実装してください

/**
 * Mapped Types と条件型を組み合わせて関数プロパティを変換
 * 関数型なら引数なしの関数に、それ以外はそのまま
 */
type FunctionProps<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer R
    ? () => R
    : T[K];
};


// ==========================================
// 問題 6: DeepPartial の実装
// ==========================================
// ネストしたオブジェクトのすべてのプロパティをオプショナルにする DeepPartial<T> 型を実装してください

/**
 * 再帰的な Mapped Types でネストしたオブジェクトすべてをオプショナルに
 * object 型のプロパティは再帰的に DeepPartial を適用
 */
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? T[K] extends Array<infer U>
      ? Array<DeepPartial<U>>
      : DeepPartial<T[K]>
    : T[K];
};


// ==========================================
// 問題 7: DeepReadonly の実装
// ==========================================
// ネストしたオブジェクトのすべてのプロパティを readonly にする DeepReadonly<T> 型を実装してください

/**
 * 再帰的な Mapped Types でネストしたオブジェクトすべてを readonly に
 * object 型のプロパティは再帰的に DeepReadonly を適用
 */
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? T[K] extends Array<infer U>
      ? ReadonlyArray<DeepReadonly<U>>
      : DeepReadonly<T[K]>
    : T[K];
};


// ==========================================
// 問題 8: GetterSetterを型変換
// ==========================================
// { name: string } を { getName: () => string; setName: (value: string) => void } に変換する
// Getters<T> 型を実装してください

/**
 * プロパティを getter と setter に変換
 * name → getName, setName のような形式に
 */
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
} & {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};


// ==========================================
// 問題 9: フィルタリング型
// ==========================================
// オブジェクトから特定の型のプロパティのみを抽出する FilterByType<T, U> 型を実装してください

/**
 * 条件型を使って特定の型のプロパティのみをフィルタリング
 * T[K] extends U の条件を満たすプロパティのみを残す
 */
type FilterByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};


// ==========================================
// 問題 10: 関数のオーバーロード型
// ==========================================
// 複数の関数シグネチャを持つ Overload 型を実装してください

/**
 * オーバーロード型の簡易実装
 * 複数の関数シグネチャを持つ型を定義
 */
interface OverloadedFunction {
  (value: string): string;
  (value: number): number;
  (value: boolean): boolean;
}


// ==========================================
// 問題 11: Promisify の実装
// ==========================================
// コールバック関数を Promise を返す関数に変換する Promisify<T> 型を実装してください

/**
 * コールバックベースの関数を Promise ベースに変換
 * (callback: (err: Error | null, result: T) => void) => void
 * を () => Promise<T> に変換
 */
type Promisify<T> = T extends (callback: (err: any, result: infer R) => void) => void
  ? () => Promise<R>
  : T extends (arg: infer A, callback: (err: any, result: infer R) => void) => void
  ? (arg: A) => Promise<R>
  : T extends (arg1: infer A1, arg2: infer A2, callback: (err: any, result: infer R) => void) => void
  ? (arg1: A1, arg2: A2) => Promise<R>
  : never;


// ==========================================
// 問題 12: Tuple to Union
// ==========================================
// タプル型をユニオン型に変換する TupleToUnion<T> 型を実装してください

/**
 * タプル型をユニオン型に変換
 * [string, number] → string | number
 * T[number] でタプルのすべての要素の型をユニオンにできる
 */
type TupleToUnion<T extends readonly any[]> = T[number];


// ==========================================
// 問題 13: Union to Intersection
// ==========================================
// ユニオン型を交差型に変換する UnionToIntersection<U> 型を実装してください

/**
 * ユニオン型を交差型に変換する高度なテクニック
 * 関数の引数の分散性を利用した変換
 *
 * 解説:
 * 1. (U extends any ? (k: U) => void : never) で各ユニオンメンバーを関数引数に
 * 2. extends (k: infer I) => void で交差型 I を抽出
 */
type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;


// ==========================================
// 問題 14: Required Keys の抽出
// ==========================================
// オブジェクト型から必須プロパティのキーのみを抽出する RequiredKeys<T> 型を実装してください

/**
 * 必須プロパティのキーのみを抽出
 * {} extends Pick<T, K> で K がオプショナルかどうかを判定
 * オプショナルでない（必須の）キーのみを残す
 */
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];


// ==========================================
// 問題 15: 型安全な path 関数
// ==========================================
// オブジェクトからネストしたプロパティを安全に取得する get 関数を実装してください

/**
 * ネストしたオブジェクトのパスを表す型（簡易版）
 * 1階層のパスのみサポート
 */
type Path<T> = keyof T;

/**
 * より高度なパス型（3階層まで対応）
 * 実際のプロジェクトでは型レベルの再帰でより深いパスに対応可能
 */
type DeepPath<T> =
  | (keyof T & string)
  | {
      [K in keyof T]: T[K] extends object
        ? K extends string
          ?
            | `${K}.${Extract<keyof T[K], string>}`
            | {
                [K2 in keyof T[K]]: T[K][K2] extends object
                  ? K2 extends string
                    ? `${K}.${K2}.${Extract<keyof T[K][K2], string>}`
                    : never
                  : never;
              }[keyof T[K]]
          : never
        : never;
    }[keyof T];

/**
 * パスを使ってネストしたプロパティを安全に取得
 * 簡易版: 1階層のみ
 */
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

/**
 * ドット記法のパスをサポートする get 関数（3階層まで）
 */
function getDeep<T, P extends DeepPath<T>>(
  obj: T,
  path: P
): any {
  const keys = (path as string).split('.');
  let result: any = obj;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return undefined;
    }
  }

  return result;
}


// ==========================================
// テストコード
// ==========================================

console.log('=== 高度なジェネリクスパターンのテスト ===\n');

// テスト 1: Unwrap
console.log('1. Unwrap のテスト');
type Arr = Unwrap<number[]>;        // number
type Str = Unwrap<string>;          // string
const arrValue: Arr = 42;
const strValue: Str = 'hello';
console.log('配列を unwrap:', arrValue);
console.log('非配列はそのまま:', strValue);
console.log('正常に動作:', typeof arrValue === 'number' && typeof strValue === 'string');

// テスト 2: MyAwaited
console.log('\n2. MyAwaited のテスト');
type Num = MyAwaited<Promise<number>>;  // number
type NestedNum = MyAwaited<Promise<Promise<number>>>;  // number
const numValue: Num = 42;
const nestedNumValue: NestedNum = 100;
console.log('Promise から型を抽出:', numValue);
console.log('ネストした Promise も抽出:', nestedNumValue);
console.log('正常に動作:', typeof numValue === 'number' && typeof nestedNumValue === 'number');

// テスト 3: ReadonlyAll
console.log('\n3. ReadonlyAll のテスト');
interface User {
  name: string;
  age: number;
}
type ReadonlyUser = ReadonlyAll<User>;
const readonlyUser: ReadonlyUser = { name: 'Alice', age: 30 };
console.log('ReadonlyUser:', readonlyUser);
// readonlyUser.name = 'Bob';  // エラー: readonly

// テスト 4: Nullable
console.log('\n4. Nullable のテスト');
type NullableUser = Nullable<User>;
const nullableUser: NullableUser = {
  name: 'Alice',
  age: null
};
console.log('Nullable User:', nullableUser);
console.log('null を許容:', nullableUser.age === null);

// テスト 5: FunctionProps
console.log('\n5. FunctionProps のテスト');
interface Original {
  getName: (prefix: string) => string;
  getAge: () => number;
  email: string;
}
type Transformed = FunctionProps<Original>;
// Transformed = {
//   getName: () => string;
//   getAge: () => number;
//   email: string;
// }
console.log('関数プロパティが変換される型を作成しました');

// テスト 6: DeepPartial
console.log('\n6. DeepPartial のテスト');
type DeepPartialUser = DeepPartial<{
  name: string;
  address: {
    city: string;
    country: string;
  };
}>;
const partialUser: DeepPartialUser = {
  address: {
    city: 'Tokyo'
    // country は省略可能
  }
};
console.log('DeepPartial User:', partialUser);
console.log('ネストしたプロパティもオプショナル:', !partialUser.address?.country);

// テスト 7: DeepReadonly
console.log('\n7. DeepReadonly のテスト');
type DeepReadonlyUser = DeepReadonly<{
  name: string;
  address: {
    city: string;
  };
}>;
const deepReadonlyUser: DeepReadonlyUser = {
  name: 'Alice',
  address: {
    city: 'Tokyo'
  }
};
console.log('DeepReadonly User:', deepReadonlyUser);
// deepReadonlyUser.address.city = 'Osaka';  // エラー: readonly

// テスト 8: Getters
console.log('\n8. Getters のテスト');
type UserGetters = Getters<{ name: string; age: number }>;
// UserGetters = {
//   getName: () => string;
//   setName: (value: string) => void;
//   getAge: () => number;
//   setAge: (value: number) => void;
// }
const userGetters: UserGetters = {
  getName: () => 'Alice',
  setName: (value: string) => {},
  getAge: () => 30,
  setAge: (value: number) => {}
};
console.log('Getter/Setter 型:', userGetters.getName());

// テスト 9: FilterByType
console.log('\n9. FilterByType のテスト');
type OnlyStrings = FilterByType<{
  name: string;
  age: number;
  email: string;
}, string>;
// OnlyStrings = { name: string; email: string }
const onlyStrings: OnlyStrings = {
  name: 'Alice',
  email: 'alice@example.com'
};
console.log('String プロパティのみ:', onlyStrings);
console.log('age が除外されている:', !('age' in onlyStrings));

// テスト 10: Overloaded Function
console.log('\n10. Overloaded Function のテスト');
const overloaded: OverloadedFunction = ((value: any): any => {
  return value;
}) as OverloadedFunction;
console.log('String:', overloaded('hello'));
console.log('Number:', overloaded(42));
console.log('Boolean:', overloaded(true));

// テスト 11: Promisify
console.log('\n11. Promisify のテスト');
type CallbackFn = (callback: (err: Error | null, result: string) => void) => void;
type PromiseFn = Promisify<CallbackFn>;  // () => Promise<string>
console.log('コールバック関数を Promise 化する型を作成しました');

// テスト 12: TupleToUnion
console.log('\n12. TupleToUnion のテスト');
type Colors = TupleToUnion<['red', 'green', 'blue']>;
// Colors = 'red' | 'green' | 'blue'
const color1: Colors = 'red';
const color2: Colors = 'green';
const color3: Colors = 'blue';
console.log('タプルからユニオン型:', color1, color2, color3);
// const invalid: Colors = 'yellow';  // エラー

// テスト 13: UnionToIntersection
console.log('\n13. UnionToIntersection のテスト');
type Intersection = UnionToIntersection<{ a: number } | { b: string }>;
// Intersection = { a: number } & { b: string }
const intersection: Intersection = {
  a: 42,
  b: 'hello'
};
console.log('ユニオンから交差型:', intersection);
console.log('両方のプロパティが必要:', intersection.a && intersection.b);

// テスト 14: RequiredKeys
console.log('\n14. RequiredKeys のテスト');
type RequiredKeysResult = RequiredKeys<{ a: number; b?: string; c: boolean }>;
// RequiredKeysResult = 'a' | 'c'
const requiredKey1: RequiredKeysResult = 'a';
const requiredKey2: RequiredKeysResult = 'c';
console.log('必須プロパティのキー:', requiredKey1, requiredKey2);
// const optionalKey: RequiredKeysResult = 'b';  // エラー

// テスト 15: Path と get 関数
console.log('\n15. Path と get 関数のテスト');
const obj = {
  user: {
    name: 'Alice',
    address: {
      city: 'Tokyo'
    }
  },
  count: 42
};

// 1階層のアクセス
const count = get(obj, 'count');
console.log('1階層アクセス:', count);

// 3階層のアクセス（DeepPath を使用）
const city = getDeep(obj, 'user.address.city');
console.log('3階層アクセス:', city);

// 型安全性のテスト
// const invalid = get(obj, 'invalid');  // エラー: 存在しないキー

console.log('\n=== すべてのテスト完了 ===');

/**
 * 実行方法:
 * npx ts-node part2-typescript-basics/chapter06-generics/solutions/05-advanced-generics.ts
 *
 * または:
 * npx tsc part2-typescript-basics/chapter06-generics/solutions/05-advanced-generics.ts
 * node part2-typescript-basics/chapter06-generics/solutions/05-advanced-generics.js
 */

/**
 * 学習ポイント:
 *
 * 1. 条件型 (Conditional Types)
 *    - T extends U ? X : Y の形式
 *    - 型レベルの if-else
 *
 * 2. infer キーワード
 *    - 条件型の中で型を抽出
 *    - Promise<infer U> で U を取り出す
 *
 * 3. Mapped Types
 *    - [K in keyof T] でオブジェクトの型を変換
 *    - as を使ってキー名も変換可能
 *
 * 4. 再帰的な型定義
 *    - DeepPartial, DeepReadonly など
 *    - ネストしたオブジェクトに対応
 *
 * 5. Template Literal Types
 *    - `get${Capitalize<string & K>}` でキー名を変換
 *    - ドット記法のパスを表現
 *
 * 6. 型レベルのフィルタリング
 *    - as を使って条件に合わないキーを never に
 *    - FilterByType, RequiredKeys など
 *
 * 7. 高度な型操作
 *    - UnionToIntersection: 関数の引数の分散性を利用
 *    - TupleToUnion: インデックスアクセスでユニオン化
 *
 * 8. 型安全なパスアクセス
 *    - Template Literal Types でドット記法を型安全に
 *    - ネストしたプロパティへの安全なアクセス
 */
