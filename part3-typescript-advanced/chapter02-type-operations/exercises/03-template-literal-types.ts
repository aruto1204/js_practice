/**
 * Part 3 - Chapter 2: 高度な型操作
 * 演習 3: Template Literal Types
 */

/* 問題 1: Greeting 型
 * Greeting<T> 型を作成してください。
 * "Hello, {T}!" という形式の文字列リテラル型を生成
 */

// ここに実装
type Greeting<T extends string> = any; // 修正してください

// テスト
type Test1 = Greeting<'World'>; // "Hello, World!"
type Test2 = Greeting<'TypeScript'>; // "Hello, TypeScript!"


/* 問題 2: EventName 型
 * EventName<T> 型を作成してください。
 * "on" + Capitalize<T> の形式のイベントハンドラー名を生成
 */

// ここに実装
type EventName<T extends string> = any; // 修正してください

// テスト
type Test3 = EventName<'click'>; // "onClick"
type Test4 = EventName<'focus'>; // "onFocus"


/* 問題 3: AllEventHandlers 型
 * AllEventHandlers 型を作成してください。
 * 'click' | 'focus' | 'blur' から "onClick" | "onFocus" | "onBlur" を生成
 */

type Events = 'click' | 'focus' | 'blur';

// ここに実装
type AllEventHandlers = any; // 修正してください

// テスト: "onClick" | "onFocus" | "onBlur"


/* 問題 4: GetterName 型
 * GetterName<T> 型を作成してください。
 * "get" + Capitalize<T> の形式の getter 名を生成
 */

// ここに実装
type GetterName<T extends string> = any; // 修正してください

// テスト
type Test5 = GetterName<'name'>; // "getName"
type Test6 = GetterName<'age'>; // "getAge"


/* 問題 5: SetterName 型
 * SetterName<T> 型を作成してください。
 * "set" + Capitalize<T> の形式の setter 名を生成
 */

// ここに実装
type SetterName<T extends string> = any; // 修正してください

// テスト
type Test7 = SetterName<'name'>; // "setName"
type Test8 = SetterName<'email'>; // "setEmail"


/* 問題 6: HttpMethod 型
 * HttpMethod<T> 型を作成してください。
 * T が 'get' | 'post' | 'put' | 'delete' のとき
 * "GET" | "POST" | "PUT" | "DELETE" に変換
 */

// ここに実装
type HttpMethod<T extends string> = any; // 修正してください

// テスト
type Test9 = HttpMethod<'get'>; // "GET"
type Test10 = HttpMethod<'post' | 'put'>; // "POST" | "PUT"


/* 問題 7: CSSProperty 型
 * CSSProperty 型を作成してください。
 * '--' + T の形式の CSS カスタムプロパティ名を生成
 */

// ここに実装
type CSSProperty<T extends string> = any; // 修正してください

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

// ここに実装
type Alignment = any; // 修正してください

// テスト: "top-left" | "top-center" | "top-right" | "middle-left" | ...


/* 問題 9: ExtractEventName 型
 * ExtractEventName<T> 型を作成してください。
 * "onClick" から "click" を抽出（先頭の "on" を削除して小文字化）
 */

// ここに実装
type ExtractEventName<T extends string> = any; // 修正してください

// テスト
type Test13 = ExtractEventName<'onClick'>; // "click"
type Test14 = ExtractEventName<'onFocus'>; // "focus"


/* 問題 10: RouteParam 型
 * RouteParam 型を作成してください。
 * "/users/:id/posts/:postId" から ":id" | ":postId" を抽出
 */

// ここに実装
type ExtractParams<T extends string> = any; // 修正してください

// テスト
type Test15 = ExtractParams<'/users/:id/posts/:postId'>; // "id" | "postId"


/* 問題 11: SnakeCase 型（シンプル版）
 * SnakeCase<T> 型を作成してください。
 * camelCase を snake_case に変換（簡易版）
 * 例: "firstName" -> "first_name"
 */

// ここに実装
type SnakeCase<T extends string> = any; // 修正してください

// テスト
type Test16 = SnakeCase<'firstName'>; // "first_name"
type Test17 = SnakeCase<'lastName'>; // "last_name"


/* 問題 12: PathString 型
 * PathString<T, K> 型を作成してください。
 * T.K の形式のパス文字列を生成
 */

// ここに実装
type PathString<T extends string, K extends string> = any; // 修正してください

// テスト
type Test18 = PathString<'user', 'name'>; // "user.name"
type Test19 = PathString<'config', 'api'>; // "config.api"


/* 問題 13: AllGetters 型
 * AllGetters<T> 型を作成してください。
 * オブジェクト型 T のすべてのキーに対して getter 名を生成
 */

// ここに実装
type AllGetters<T> = any; // 修正してください

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

// ここに実装
type EventMap<T> = any; // 修正してください

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

// ここに実装
type DeepPath<T> = any; // 修正してください

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
