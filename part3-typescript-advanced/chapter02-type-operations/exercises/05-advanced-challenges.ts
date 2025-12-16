/**
 * Part 3 - Chapter 2: 高度な型操作
 * 演習 5: 総合チャレンジ問題
 */

/* 問題 1: DeepReadonly 型（完全版）
 * DeepReadonly<T> 型を作成してください。
 * ネストしたオブジェクト、配列、タプルもすべて readonly にする
 */

// ここに実装
type DeepReadonly<T> = any; // 修正してください

// テスト
interface ComplexData {
  user: {
    name: string;
    tags: string[];
    metadata: {
      createdAt: Date;
    };
  };
}

type ReadonlyComplexData = DeepReadonly<ComplexData>;


/* 問題 2: DeepPartial 型（完全版）
 * DeepPartial<T> 型を作成してください。
 * ネストしたオブジェクトもすべてオプショナルにする
 */

// ここに実装
type DeepPartial<T> = any; // 修正してください

// テスト
type PartialComplexData = DeepPartial<ComplexData>;


/* 問題 3: KeyPath 型
 * KeyPath<T> 型を作成してください。
 * オブジェクト T のすべてのネストしたキーパスをユニオン型で生成
 * 例: { a: { b: { c: number } } } -> "a" | "a.b" | "a.b.c"
 */

// ここに実装
type KeyPath<T> = any; // 修正してください

// テスト
type Test1 = KeyPath<ComplexData>;
// "user" | "user.name" | "user.tags" | "user.metadata" | "user.metadata.createdAt"


/* 問題 4: GetByPath 型
 * GetByPath<T, P> 型を作成してください。
 * パス文字列 P を使って T の値の型を取得
 */

// ここに実装
type GetByPath<T, P extends string> = any; // 修正してください

// テスト
type Test2 = GetByPath<ComplexData, 'user.name'>; // string
type Test3 = GetByPath<ComplexData, 'user.tags'>; // string[]


/* 問題 5: SetByPath 型
 * SetByPath<T, P, V> 型を作成してください。
 * パス P の値を型 V に変更した新しい型を生成
 */

// ここに実装
type SetByPath<T, P extends string, V> = any; // 修正してください

// テスト
type Test4 = SetByPath<ComplexData, 'user.name', number>;
// { user: { name: number; tags: string[]; metadata: { createdAt: Date } } }


/* 問題 6: FlattenObject 型
 * FlattenObject<T> 型を作成してください。
 * ネストしたオブジェクトをフラットなキーパス形式に変換
 * 例: { a: { b: number } } -> { "a.b": number }
 */

// ここに実装
type FlattenObject<T> = any; // 修正してください

// テスト
interface Nested {
  user: {
    name: string;
    age: number;
  };
}

type Test5 = FlattenObject<Nested>;
// { "user.name": string; "user.age": number }


/* 問題 7: UnionToTuple 型（超高度）
 * UnionToTuple<U> 型を作成してください。
 * ユニオン型をタプル型に変換
 * 例: 'a' | 'b' | 'c' -> ['a', 'b', 'c']
 */

// ここに実装
type UnionToTuple<U> = any; // 修正してください

// テスト
type Test6 = UnionToTuple<'a' | 'b' | 'c'>; // ['a', 'b', 'c'] (順序は不定)


/* 問題 8: IsUnion 型
 * IsUnion<T> 型を作成してください。
 * T がユニオン型なら true、そうでなければ false
 */

// ここに実装
type IsUnion<T> = any; // 修正してください

// テスト
type Test7 = IsUnion<string | number>; // true
type Test8 = IsUnion<string>; // false


/* 問題 9: PickByValue 型
 * PickByValue<T, V> 型を作成してください。
 * T から値の型が V に一致するプロパティのみを抽出
 */

// ここに実装
type PickByValue<T, V> = any; // 修正してください

// テスト
interface Mixed {
  id: number;
  name: string;
  age: number;
  email: string;
  active: boolean;
}

type Test9 = PickByValue<Mixed, string>;
// { name: string; email: string }


/* 問題 10: OmitByValue 型
 * OmitByValue<T, V> 型を作成してください。
 * T から値の型が V に一致するプロパティを除外
 */

// ここに実装
type OmitByValue<T, V> = any; // 修正してください

// テスト
type Test10 = OmitByValue<Mixed, string>;
// { id: number; age: number; active: boolean }


/* 問題 11: CamelToSnake 型
 * CamelToSnake<S> 型を作成してください。
 * camelCase を snake_case に変換
 */

// ここに実装
type CamelToSnake<S extends string> = any; // 修正してください

// テスト
type Test11 = CamelToSnake<'firstName'>; // "first_name"
type Test12 = CamelToSnake<'getUserById'>; // "get_user_by_id"


/* 問題 12: SnakeToCamel 型
 * SnakeToCamel<S> 型を作成してください。
 * snake_case を camelCase に変換
 */

// ここに実装
type SnakeToCamel<S extends string> = any; // 修正してください

// テスト
type Test13 = SnakeToCamel<'first_name'>; // "firstName"
type Test14 = SnakeToCamel<'get_user_by_id'>; // "getUserById"


/* 問題 13: KebabToCamel 型
 * KebabToCamel<S> 型を作成してください。
 * kebab-case を camelCase に変換
 */

// ここに実装
type KebabToCamel<S extends string> = any; // 修正してください

// テスト
type Test15 = KebabToCamel<'first-name'>; // "firstName"
type Test16 = KebabToCamel<'background-color'>; // "backgroundColor"


/* 問題 14: ObjectFromKeys 型
 * ObjectFromKeys<K, T> 型を作成してください。
 * キーのユニオン K から、すべての値が型 T のオブジェクト型を生成
 */

// ここに実装
type ObjectFromKeys<K extends string, T> = any; // 修正してください

// テスト
type Test17 = ObjectFromKeys<'a' | 'b' | 'c', number>;
// { a: number; b: number; c: number }


/* 問題 15: PartialDeep 型（高度）
 * PartialDeep<T, K> 型を作成してください。
 * ネストしたオブジェクトの特定のパス K のみをオプショナルにする
 */

// ここに実装
type PartialDeep<T, K extends string> = any; // 修正してください

// テスト
type Test18 = PartialDeep<ComplexData, 'user.name'>;
// { user: { name?: string; tags: string[]; metadata: { createdAt: Date } } }


// 実行時テスト
console.log('--- 総合チャレンジ問題の演習 ---');

// 問題 1: DeepReadonly のテスト
const deepReadonlyData: DeepReadonly<ComplexData> = {
  user: {
    name: '太郎',
    tags: ['admin', 'user'],
    metadata: {
      createdAt: new Date(),
    },
  },
};

console.log('DeepReadonly Data:', deepReadonlyData);
// deepReadonlyData.user.name = '花子'; // Error になるべき

// 問題 2: DeepPartial のテスト
const deepPartialData: DeepPartial<ComplexData> = {
  user: {
    name: '太郎',
  },
};

console.log('DeepPartial Data:', deepPartialData);

// 問題 9: PickByValue のテスト
const stringFields: PickByValue<Mixed, string> = {
  name: '太郎',
  email: 'taro@example.com',
};

console.log('String Fields:', stringFields);

// 問題 11-13: ケース変換のテスト（実行時）
function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

console.log('camelToSnake:', camelToSnake('firstName')); // "first_name"
console.log('snakeToCamel:', snakeToCamel('first_name')); // "firstName"
console.log('kebabToCamel:', kebabToCamel('first-name')); // "firstName"

// 問題 14: ObjectFromKeys のテスト
const obj: ObjectFromKeys<'a' | 'b' | 'c', number> = {
  a: 1,
  b: 2,
  c: 3,
};

console.log('Object From Keys:', obj);

console.log('\nその他の型は TypeScript コンパイラで検証してください');
console.log('これらは非常に高度な型レベルプログラミングの例です');
