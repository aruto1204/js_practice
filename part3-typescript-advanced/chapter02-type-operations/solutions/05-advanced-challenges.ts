/**
 * Part 3 - Chapter 2: 高度な型操作
 * 演習 5: 総合チャレンジ問題 - 解答
 */

/* 問題 1: DeepReadonly 型（完全版）
 * DeepReadonly<T> 型を作成してください。
 * ネストしたオブジェクト、配列、タプルもすべて readonly にする
 */

// 実装: 再帰的に readonly を適用する型
// - 配列は ReadonlyArray に変換
// - オブジェクトは各プロパティに対して再帰的に DeepReadonly を適用
type DeepReadonly<T> = T extends (infer R)[]
  ? ReadonlyArray<DeepReadonly<R>>
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

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

// 実装: 再帰的にすべてのプロパティをオプショナルにする型
// - オブジェクトの各プロパティに ? を付け、さらに再帰的に DeepPartial を適用
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

// テスト
type PartialComplexData = DeepPartial<ComplexData>;


/* 問題 3: KeyPath 型
 * KeyPath<T> 型を作成してください。
 * オブジェクト T のすべてのネストしたキーパスをユニオン型で生成
 * 例: { a: { b: { c: number } } } -> "a" | "a.b" | "a.b.c"
 */

// 実装: オブジェクトのすべてのネストパスを生成する型
// - K in keyof T でトップレベルのキーを取得
// - T[K] がオブジェクトの場合、再帰的にサブパスを生成
// - `${K}.${SubPath}` でドット記法のパスを構築
type KeyPath<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? K | `${K}.${KeyPath<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

// テスト
type Test1 = KeyPath<ComplexData>;
// "user" | "user.name" | "user.tags" | "user.metadata" | "user.metadata.createdAt"


/* 問題 4: GetByPath 型
 * GetByPath<T, P> 型を作成してください。
 * パス文字列 P を使って T の値の型を取得
 */

// 実装: ドット記法のパスから型を取得する型
// - P を "." で分割して、最初のキーと残りのパスに分ける
// - 最初のキーで T のプロパティにアクセスし、残りがあれば再帰
type GetByPath<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? GetByPath<T[K], Rest>
    : never
  : P extends keyof T
  ? T[P]
  : never;

// テスト
type Test2 = GetByPath<ComplexData, 'user.name'>; // string
type Test3 = GetByPath<ComplexData, 'user.tags'>; // string[]


/* 問題 5: SetByPath 型
 * SetByPath<T, P, V> 型を作成してください。
 * パス P の値を型 V に変更した新しい型を生成
 */

// 実装: 指定されたパスの値を新しい型に置き換える型
// - P を "." で分割して、最初のキーと残りのパスに分ける
// - 対象のキーのみ再帰的に SetByPath を適用し、その他は元の型を保持
type SetByPath<T, P extends string, V> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? {
        [Key in keyof T]: Key extends K ? SetByPath<T[Key], Rest, V> : T[Key];
      }
    : T
  : P extends keyof T
  ? {
      [Key in keyof T]: Key extends P ? V : T[Key];
    }
  : T;

// テスト
type Test4 = SetByPath<ComplexData, 'user.name', number>;
// { user: { name: number; tags: string[]; metadata: { createdAt: Date } } }


/* 問題 6: FlattenObject 型
 * FlattenObject<T> 型を作成してください。
 * ネストしたオブジェクトをフラットなキーパス形式に変換
 * 例: { a: { b: number } } -> { "a.b": number }
 */

// 実装: ネストしたオブジェクトをフラット化する型
// - K in keyof T で各キーに対して処理
// - T[K] がオブジェクトの場合、再帰的にフラット化してパスを結合
// - プリミティブの場合は K: T[K] として保持
type FlattenObject<T extends object, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends Date | Function | Array<any>
      ? { [P in `${Prefix extends '' ? '' : `${Prefix}.`}${K & string}`]: T[K] }
      : FlattenObject<T[K], `${Prefix extends '' ? '' : `${Prefix}.`}${K & string}`>
    : { [P in `${Prefix extends '' ? '' : `${Prefix}.`}${K & string}`]: T[K] };
}[keyof T] extends infer U
  ? { [K in keyof U]: U[K] }
  : never;

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

// 実装: ユニオン型をタプルに変換する型（順序は不定）
// - UnionToIntersection を使ってユニオンを関数の交差型に変換
// - OverloadedConsumerFromUnion で関数オーバーロードを作成
// - LastOf でユニオンの最後の要素を抽出
// - 再帰的にタプルを構築
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type LastOf<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? R
  : never;

type Push<T extends any[], V> = [...T, V];

type UnionToTuple<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = true extends N
  ? []
  : Push<UnionToTuple<Exclude<T, L>>, L>;

// テスト
type Test6 = UnionToTuple<'a' | 'b' | 'c'>; // ['a', 'b', 'c'] (順序は不定)


/* 問題 8: IsUnion 型
 * IsUnion<T> 型を作成してください。
 * T がユニオン型なら true、そうでなければ false
 */

// 実装: ユニオン型かどうかを判定する型
// - ユニオン型の distributive conditional types の性質を利用
// - T が配列として T に一致しない場合はユニオン型
type IsUnion<T, U = T> = T extends any
  ? [U] extends [T]
    ? false
    : true
  : never;

// テスト
type Test7 = IsUnion<string | number>; // true
type Test8 = IsUnion<string>; // false


/* 問題 9: PickByValue 型
 * PickByValue<T, V> 型を作成してください。
 * T から値の型が V に一致するプロパティのみを抽出
 */

// 実装: 値の型でプロパティをフィルタリングする型
// - T[K] extends V で値の型が V に一致するかチェック
// - 一致する場合は K を返し、そうでなければ never
// - Pick を使って該当するキーのみを抽出
type PickByValue<T, V> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends V ? K : never;
  }[keyof T]
>;

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

// 実装: 値の型でプロパティを除外する型
// - T[K] extends V で値の型が V に一致するかチェック
// - 一致しない場合は K を返し、そうであれば never
// - Pick を使って該当しないキーのみを抽出
type OmitByValue<T, V> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends V ? never : K;
  }[keyof T]
>;

// テスト
type Test10 = OmitByValue<Mixed, string>;
// { id: number; age: number; active: boolean }


/* 問題 11: CamelToSnake 型
 * CamelToSnake<S> 型を作成してください。
 * camelCase を snake_case に変換
 */

// 実装: camelCase を snake_case に変換する型
// - 大文字を検出したら "_" + 小文字 に変換
// - 再帰的に残りの文字列を処理
type CamelToSnake<S extends string> = S extends `${infer First}${infer Rest}`
  ? First extends Uppercase<First>
    ? First extends Lowercase<First>
      ? `${First}${CamelToSnake<Rest>}`
      : `_${Lowercase<First>}${CamelToSnake<Rest>}`
    : `${First}${CamelToSnake<Rest>}`
  : S;

// テスト
type Test11 = CamelToSnake<'firstName'>; // "first_name"
type Test12 = CamelToSnake<'getUserById'>; // "get_user_by_id"


/* 問題 12: SnakeToCamel 型
 * SnakeToCamel<S> 型を作成してください。
 * snake_case を camelCase に変換
 */

// 実装: snake_case を camelCase に変換する型
// - "_" を検出したら次の文字を大文字に変換
// - 再帰的に残りの文字列を処理
type SnakeToCamel<S extends string> = S extends `${infer First}_${infer Second}${infer Rest}`
  ? `${First}${Uppercase<Second>}${SnakeToCamel<Rest>}`
  : S;

// テスト
type Test13 = SnakeToCamel<'first_name'>; // "firstName"
type Test14 = SnakeToCamel<'get_user_by_id'>; // "getUserById"


/* 問題 13: KebabToCamel 型
 * KebabToCamel<S> 型を作成してください。
 * kebab-case を camelCase に変換
 */

// 実装: kebab-case を camelCase に変換する型
// - "-" を検出したら次の文字を大文字に変換
// - 再帰的に残りの文字列を処理
type KebabToCamel<S extends string> = S extends `${infer First}-${infer Second}${infer Rest}`
  ? `${First}${Uppercase<Second>}${KebabToCamel<Rest>}`
  : S;

// テスト
type Test15 = KebabToCamel<'first-name'>; // "firstName"
type Test16 = KebabToCamel<'background-color'>; // "backgroundColor"


/* 問題 14: ObjectFromKeys 型
 * ObjectFromKeys<K, T> 型を作成してください。
 * キーのユニオン K から、すべての値が型 T のオブジェクト型を生成
 */

// 実装: キーのユニオンから固定の値型を持つオブジェクト型を生成
// - mapped types を使って各キーに対して型 T を割り当て
type ObjectFromKeys<K extends string, T> = {
  [P in K]: T;
};

// テスト
type Test17 = ObjectFromKeys<'a' | 'b' | 'c', number>;
// { a: number; b: number; c: number }


/* 問題 15: PartialDeep 型（高度）
 * PartialDeep<T, K> 型を作成してください。
 * ネストしたオブジェクトの特定のパス K のみをオプショナルにする
 */

// 実装: 特定のパスのみをオプショナルにする型
// - パスを "." で分割して処理
// - 対象のパスに該当するプロパティのみオプショナルにする
// - 他のプロパティは元の型を保持
type PartialDeep<T, K extends string> = K extends `${infer First}.${infer Rest}`
  ? First extends keyof T
    ? {
        [P in keyof T]: P extends First ? PartialDeep<T[P], Rest> : T[P];
      }
    : T
  : K extends keyof T
  ? {
      [P in keyof T]: P extends K ? T[P] | undefined : T[P];
    }
  : T;

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
