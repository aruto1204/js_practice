/**
 * Part 3 - Chapter 2: 高度な型操作
 * 演習 3: Template Literal Types - 解答
 */

/* 問題 1: Greeting 型
 * Greeting<T> 型を作成してください。
 * "Hello, {T}!" という形式の文字列リテラル型を生成
 */

// テンプレートリテラル型を使用して文字列リテラル型を組み立てる
type Greeting<T extends string> = `Hello, ${T}!`;

// テスト
type Test1 = Greeting<'World'>; // "Hello, World!"
type Test2 = Greeting<'TypeScript'>; // "Hello, TypeScript!"


/* 問題 2: EventName 型
 * EventName<T> 型を作成してください。
 * "on" + Capitalize<T> の形式のイベントハンドラー名を生成
 */

// Capitalize ユーティリティ型を使用して先頭文字を大文字化
type EventName<T extends string> = `on${Capitalize<T>}`;

// テスト
type Test3 = EventName<'click'>; // "onClick"
type Test4 = EventName<'focus'>; // "onFocus"


/* 問題 3: AllEventHandlers 型
 * AllEventHandlers 型を作成してください。
 * 'click' | 'focus' | 'blur' から "onClick" | "onFocus" | "onBlur" を生成
 */

type EventTypes = 'click' | 'focus' | 'blur';

// ユニオン型に対してテンプレートリテラル型を適用すると、すべての組み合わせが生成される
type AllEventHandlers = EventName<EventTypes>;

// テスト: "onClick" | "onFocus" | "onBlur"


/* 問題 4: GetterName 型
 * GetterName<T> 型を作成してください。
 * "get" + Capitalize<T> の形式の getter 名を生成
 */

// "get" プレフィックスと Capitalize を組み合わせて getter 名を生成
type GetterName<T extends string> = `get${Capitalize<T>}`;

// テスト
type Test5 = GetterName<'name'>; // "getName"
type Test6 = GetterName<'age'>; // "getAge"


/* 問題 5: SetterName 型
 * SetterName<T> 型を作成してください。
 * "set" + Capitalize<T> の形式の setter 名を生成
 */

// "set" プレフィックスと Capitalize を組み合わせて setter 名を生成
type SetterName<T extends string> = `set${Capitalize<T>}`;

// テスト
type Test7 = SetterName<'name'>; // "setName"
type Test8 = SetterName<'email'>; // "setEmail"


/* 問題 6: HttpMethod 型
 * HttpMethod<T> 型を作成してください。
 * T が 'get' | 'post' | 'put' | 'delete' のとき
 * "GET" | "POST" | "PUT" | "DELETE" に変換
 */

// Uppercase ユーティリティ型を使用して文字列全体を大文字化
type HttpMethod<T extends string> = Uppercase<T>;

// テスト
type Test9 = HttpMethod<'get'>; // "GET"
type Test10 = HttpMethod<'post' | 'put'>; // "POST" | "PUT"


/* 問題 7: CSSProperty 型
 * CSSProperty 型を作成してください。
 * '--' + T の形式の CSS カスタムプロパティ名を生成
 */

// CSS カスタムプロパティの命名規則に従って "--" プレフィックスを追加
type CSSProperty<T extends string> = `--${T}`;

// テスト
type Test11 = CSSProperty<'primary-color'>; // "--primary-color"
type Test12 = CSSProperty<'font-size'>; // "--font-size"


/* 問題 8: Alignment 型
 * Alignment 型を作成してください。
 * VerticalAlignment と HorizontalAlignment の組み合わせ
 * 例: "top-left" | "top-center" | ...
 */

type VerticalAlignment = 'top' | 'middle' | 'bottom';
type HorizontalAlignment = 'left' | 'center' | 'right';

// テンプレートリテラル型は複数のユニオン型を組み合わせて全パターンを生成
type Alignment = `${VerticalAlignment}-${HorizontalAlignment}`;

// テスト: "top-left" | "top-center" | "top-right" | "middle-left" | ...


/* 問題 9: ExtractEventName 型
 * ExtractEventName<T> 型を作成してください。
 * "onClick" から "click" を抽出（先頭の "on" を削除して小文字化）
 */

// Conditional Types と infer を使って "on" を削除し、Uncapitalize で小文字化
type ExtractEventName<T extends string> = T extends `on${infer Rest}`
  ? Uncapitalize<Rest>
  : never;

// テスト
type Test13 = ExtractEventName<'onClick'>; // "click"
type Test14 = ExtractEventName<'onFocus'>; // "focus"


/* 問題 10: RouteParam 型
 * RouteParam 型を作成してください。
 * "/users/:id/posts/:postId" から ":id" | ":postId" を抽出
 */

// 再帰的にパスパラメータを抽出するヘルパー型
type ExtractParams<T extends string> =
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? Param | ExtractParams<`/${Rest}`>  // パラメータを抽出し、残りを再帰的に処理
    : T extends `${infer _Start}:${infer Param}`
      ? Param  // 最後のパラメータを抽出
      : never;  // パラメータが見つからない場合

// テスト
type Test15 = ExtractParams<'/users/:id/posts/:postId'>; // "id" | "postId"


/* 問題 11: SnakeCase 型（シンプル版）
 * SnakeCase<T> 型を作成してください。
 * camelCase を snake_case に変換（簡易版）
 * 例: "firstName" -> "first_name"
 */

// 大文字を見つけたら、その前にアンダースコアを挿入して小文字化
type SnakeCase<T extends string> = T extends `${infer First}${infer Rest}`
  ? Rest extends Uncapitalize<Rest>
    ? `${Lowercase<First>}${SnakeCase<Rest>}`  // 小文字の場合はそのまま
    : `${Lowercase<First>}_${SnakeCase<Uncapitalize<Rest>>}`  // 大文字の場合は _ を追加
  : T;

// テスト
type Test16 = SnakeCase<'firstName'>; // "first_name"
type Test17 = SnakeCase<'lastName'>; // "last_name"


/* 問題 12: PathString 型
 * PathString<T, K> 型を作成してください。
 * T.K の形式のパス文字列を生成
 */

// ドット記法でパスを結合
type PathString<T extends string, K extends string> = `${T}.${K}`;

// テスト
type Test18 = PathString<'user', 'name'>; // "user.name"
type Test19 = PathString<'config', 'api'>; // "config.api"


/* 問題 13: AllGetters 型
 * AllGetters<T> 型を作成してください。
 * オブジェクト型 T のすべてのキーに対して getter 名を生成
 */

// Mapped Types と Template Literal Types を組み合わせて全プロパティに getter を生成
type AllGetters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: T[K]
};

// テスト
interface User {
  name: string;
  age: number;
  email: string;
}

type UserGetters = AllGetters<User>;
// { getName: string; getAge: number; getEmail: string }


/* 問題 14: EventMap 型
 * EventMap<T> 型を作成してください。
 * キーが "on" + Capitalize<T のキー>、値が () => void の型
 */

// Mapped Types でキーを変換し、値を () => void に統一
type EventMap<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: () => void
};

// テスト
interface Events {
  click: string;
  focus: number;
  blur: boolean;
}

type EventHandlers = EventMap<Events>;
// { onClick: () => void; onFocus: () => void; onBlur: () => void }


/* 問題 15: DeepPath 型（高度）
 * DeepPath<T> 型を作成してください。
 * ネストしたオブジェクトのすべてのパスをユニオン型で生成
 * 例: { user: { name: string } } -> "user" | "user.name"
 */

// 再帰的にネストしたオブジェクトのパスを生成
type DeepPath<T> = {
  [K in keyof T & string]: T[K] extends object
    ? K | `${K}.${DeepPath<T[K]>}`  // オブジェクトの場合は自身とネストしたパスを返す
    : K  // プリミティブ型の場合はキーのみ
}[keyof T & string];

// テスト
interface NestedObject {
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

type Paths = DeepPath<NestedObject>;
// "user" | "user.profile" | "user.profile.name" | "user.profile.age" | "user.settings" | "user.settings.theme"


// 実行時テスト
console.log('--- Template Literal Types の演習 ---');

// 問題 1: Greeting のテスト
function greet<T extends string>(name: T): Greeting<T> {
  return `Hello, ${name}!` as Greeting<T>;
}

console.log('Greeting test:', greet('World')); // "Hello, World!"

// 問題 2: EventName のテスト
function createEventName<T extends string>(event: T): EventName<T> {
  const capitalized = event.charAt(0).toUpperCase() + event.slice(1);
  return `on${capitalized}` as EventName<T>;
}

console.log('EventName test:', createEventName('click')); // "onClick"

// 問題 4-5: Getter/Setter のテスト
function createGetterName<T extends string>(prop: T): GetterName<T> {
  const capitalized = prop.charAt(0).toUpperCase() + prop.slice(1);
  return `get${capitalized}` as GetterName<T>;
}

function createSetterName<T extends string>(prop: T): SetterName<T> {
  const capitalized = prop.charAt(0).toUpperCase() + prop.slice(1);
  return `set${capitalized}` as SetterName<T>;
}

console.log('GetterName test:', createGetterName('name')); // "getName"
console.log('SetterName test:', createSetterName('email')); // "setEmail"

// 問題 6: HttpMethod のテスト
function toUpperMethod<T extends string>(method: T): HttpMethod<T> {
  return method.toUpperCase() as HttpMethod<T>;
}

console.log('HttpMethod test:', toUpperMethod('get')); // "GET"

// 問題 7: CSSProperty のテスト
function toCSSProperty<T extends string>(name: T): CSSProperty<T> {
  return `--${name}` as CSSProperty<T>;
}

console.log('CSSProperty test:', toCSSProperty('primary-color')); // "--primary-color"

console.log('\nその他の型は TypeScript コンパイラで検証してください');
