/**
 * Part 3 - Chapter 2: 高度な型操作
 * 演習 2: Conditional Types - 解答
 */

/* 問題 1: IsString 型
 * IsString<T> 型を作成してください。
 * T が string 型なら true、そうでなければ false
 */

// 基本的な条件型: T extends string で型を判定
type IsString<T> = T extends string ? true : false;

// テスト
type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false


/* 問題 2: IsArray 型
 * IsArray<T> 型を作成してください。
 * T が配列型なら true、そうでなければ false
 */

// 配列型の判定: T extends any[] で配列かどうかを判定
type IsArray<T> = T extends any[] ? true : false;

// テスト
type Test3 = IsArray<string[]>; // true
type Test4 = IsArray<number>; // false


/* 問題 3: ArrayElement 型
 * ArrayElement<T> 型を作成してください。
 * T が配列なら要素の型を返し、そうでなければ never
 */

// infer を使用して配列の要素型を抽出
type ArrayElement<T> = T extends (infer U)[] ? U : never;

// テスト
type Test5 = ArrayElement<string[]>; // string
type Test6 = ArrayElement<number[]>; // number
type Test7 = ArrayElement<boolean>; // never


/* 問題 4: CustomReturnType 型
 * CustomReturnType<T> 型を作成してください。
 * 関数型 T の戻り値の型を取得する（infer を使用）
 */

// 関数の戻り値型を infer で推論
type CustomReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// テスト
type Test8 = CustomReturnType<() => string>; // string
type Test9 = CustomReturnType<(x: number) => boolean>; // boolean


/* 問題 5: CustomParameters 型
 * CustomParameters<T> 型を作成してください。
 * 関数型 T の引数の型をタプルで取得する（infer を使用）
 */

// 関数の引数型をタプルとして infer で推論
type CustomParameters<T> = T extends (...args: infer P) => any ? P : never;

// テスト
type Test10 = CustomParameters<(a: string, b: number) => void>; // [string, number]
type Test11 = CustomParameters<() => void>; // []


/* 問題 6: PromiseType 型
 * PromiseType<T> 型を作成してください。
 * T が Promise<U> なら U を返し、そうでなければ T をそのまま返す
 */

// Promise の中身の型を抽出、Promise でなければそのまま返す
type PromiseType<T> = T extends Promise<infer U> ? U : T;

// テスト
type Test12 = PromiseType<Promise<string>>; // string
type Test13 = PromiseType<number>; // number


/* 問題 7: FirstElement 型
 * FirstElement<T> 型を作成してください。
 * タプル T の最初の要素の型を取得する
 */

// タプルの最初の要素を infer で推論
type FirstElement<T> = T extends [infer F, ...any[]] ? F : never;

// テスト
type Test14 = FirstElement<[string, number, boolean]>; // string
type Test15 = FirstElement<[number]>; // number


/* 問題 8: LastElement 型
 * LastElement<T> 型を作成してください。
 * タプル T の最後の要素の型を取得する（infer を使用）
 */

// タプルの最後の要素を infer で推論
type LastElement<T> = T extends [...any[], infer L] ? L : never;

// テスト
type Test16 = LastElement<[string, number, boolean]>; // boolean
type Test17 = LastElement<[string]>; // string


/* 問題 9: ExcludeFunction 型
 * ExcludeFunction<T> 型を作成してください。
 * T から関数型を除外する
 */

// 組み込みの Exclude を使用して関数型を除外
type ExcludeFunction<T> = Exclude<T, Function>;

// テスト
type Test18 = ExcludeFunction<string | number | (() => void)>; // string | number


/* 問題 10: ExtractFunction 型
 * ExtractFunction<T> 型を作成してください。
 * T から関数型のみを抽出する
 */

// 組み込みの Extract を使用して関数型のみを抽出
type ExtractFunction<T> = Extract<T, Function>;

// テスト
type Test19 = ExtractFunction<string | (() => void) | ((x: number) => string)>;
// (() => void) | ((x: number) => string)


/* 問題 11: NonNullableFields 型
 * NonNullableFields<T> 型を作成してください。
 * オブジェクト型 T のすべてのプロパティから null と undefined を除去
 */

// Mapped Types と NonNullable を組み合わせて各プロパティから null/undefined を除去
type NonNullableFields<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

// テスト
interface NullableUser {
  id: number | null;
  name: string | undefined;
  email: string;
}

type Test20 = NonNullableFields<NullableUser>;
// { id: number; name: string; email: string }


/* 問題 12: FlattenArray 型
 * FlattenArray<T> 型を作成してください。
 * ネストした配列を1段階フラット化する
 */

// 配列が1段階ネストしている場合、内側の配列の要素型を抽出
type FlattenArray<T> = T extends (infer U)[] ? U : T;

// テスト
type Test21 = FlattenArray<number[][]>; // number[]
type Test22 = FlattenArray<string[][][]>; // string[][]


/* 問題 13: DeepFlatten 型
 * DeepFlatten<T> 型を作成してください。
 * ネストした配列を完全にフラット化する（再帰的）
 */

// 再帰的に配列をフラット化（配列でなくなるまで再帰）
type DeepFlatten<T> = T extends (infer U)[]
  ? DeepFlatten<U>
  : T;

// テスト
type Test23 = DeepFlatten<number[][][]>; // number
type Test24 = DeepFlatten<string[][]>; // string


/* 問題 14: TupleToUnion 型
 * TupleToUnion<T> 型を作成してください。
 * タプルの要素をユニオン型に変換する
 */

// タプルの要素型をインデックスアクセスでユニオン型に変換
type TupleToUnion<T> = T extends readonly (infer U)[] ? U : never;

// テスト
type Test25 = TupleToUnion<[string, number, boolean]>; // string | number | boolean


/* 問題 15: UnionToIntersection 型
 * UnionToIntersection<U> 型を作成してください。
 * ユニオン型を交差型に変換する（高度）
 * ヒント: 関数の引数位置での反変性を利用
 */

// 関数の引数の反変性を利用してユニオンを交差型に変換
// 1. U を関数の引数型に配置することで、反変性により交差型が推論される
type UnionToIntersection<U> = (
  U extends any ? (x: U) => void : never
) extends (x: infer I) => void
  ? I
  : never;

// テスト
type Test26 = UnionToIntersection<{ a: string } | { b: number }>;
// { a: string } & { b: number }


// 実行時テスト
console.log('--- Conditional Types の演習 ---');

// 問題 1-2: 型判定のテスト
function testIsString<T>(value: T): IsString<T> {
  return (typeof value === 'string') as IsString<T>;
}

console.log('IsString test:', testIsString('hello')); // true
console.log('IsString test:', testIsString(123)); // false

// 問題 3: ArrayElement のテスト
function getFirstElement<T extends any[]>(arr: T): ArrayElement<T> | undefined {
  return arr[0];
}

console.log('ArrayElement test:', getFirstElement([1, 2, 3])); // 1

// 問題 4: ReturnType のテスト
function createGetter<F extends (...args: any[]) => any>(
  fn: F
): () => CustomReturnType<F> {
  return () => fn();
}

const getter = createGetter(() => 'hello');
console.log('ReturnType test:', getter()); // "hello"

// 問題 6: PromiseType のテスト
async function unwrap<T>(value: T): Promise<PromiseType<T>> {
  if (value instanceof Promise) {
    return await value as PromiseType<T>;
  }
  return value as PromiseType<T>;
}

unwrap(Promise.resolve(42)).then(v => console.log('PromiseType test:', v)); // 42

console.log('\nその他の型は TypeScript コンパイラで検証してください');
