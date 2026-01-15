/**
 * 練習問題 1: ユニオン型（Union Types）
 *
 * このファイルでは、ユニオン型の基本から応用までを練習します。
 */

// ==========================================
// 問題 1: 基本的なユニオン型
// ==========================================
// string または number を受け取り、文字列として返す toString 関数を定義してください
// TODO: ここに toString 関数を実装

function toString(value: string | number): string {
  return String(value);
}

// ==========================================
// 問題 2: ID型の定義
// ==========================================
// ID型を定義してください（string または number）
// そして、IDを受け取ってフォーマットする formatId 関数を実装してください
// 数値の場合は "ID-{数値}"、文字列の場合はそのまま返す
// TODO: ID型と formatId 関数を実装

type ID = string | number;

function formatId(id: ID): string {
  if (typeof id === 'number') {
    return `ID-${id}`;
  }
  return id;
}
// ==========================================
// 問題 3: 配列のユニオン型
// ==========================================
// number または string の配列を受け取り、すべての要素を文字列に変換した配列を返す
// convertToStrings 関数を実装してください
// TODO: ここに convertToStrings 関数を実装

function convertToStrings(arr: (number | string)[]): string[] {
  return arr.map((item) => String(item));
}

// ==========================================
// 問題 4: オブジェクトのユニオン型
// ==========================================
// Success 型と Error 型を定義してください
// - Success: { success: true; data: string }
// - Error: { success: false; error: string }
// Result 型をこれらのユニオン型として定義し、
// Result を受け取って適切なメッセージを返す getMessage 関数を実装してください
// TODO: Success, Error, Result 型と getMessage 関数を実装

type Success = {
  success: true;
  data: string;
};

type Error = {
  success: false;
  error: string;
};

type Result = Success | Error;

function getMessage(result: Result): string {
  if (result.success) {
    return `Success: ${result.data}`;
  }
  return `Error: ${result.error}`;
}
// ==========================================
// 問題 5: null を含むユニオン型
// ==========================================
// string | null を受け取り、null の場合は "N/A" を返す getDisplayValue 関数を実装してください
// TODO: ここに getDisplayValue 関数を実装
function getDisplayValue(value: string | null): string {
  return value ?? 'N/A';
}

// ==========================================
// 問題 6: 複数の型のユニオン
// ==========================================
// string | number | boolean を受け取り、その型名を返す getTypeName 関数を実装してください
// 例: getTypeName('hello') → 'string'
// TODO: ここに getTypeName 関数を実装
function getTypeName(value: string | number | boolean): string {
  return typeof value;
}

// ==========================================
// 問題 7: 配列またはオブジェクト
// ==========================================
// 配列または単一の値を受け取り、必ず配列として返す ensureArray 関数を実装してください
// 例: ensureArray(1) → [1]
//     ensureArray([1, 2]) → [1, 2]
// TODO: ここに ensureArray 関数を実装
function ensureArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

// ==========================================
// 問題 8: 複数のオブジェクト型のユニオン
// ==========================================
// Rectangle 型（width, height）と Circle 型（radius）を定義し、
// これらのユニオン型 Shape を作成してください
// そして、Shape を受け取って面積を計算する getArea 関数を実装してください
// ヒント: 型を区別するための kind プロパティを追加
// TODO: Rectangle, Circle, Shape 型と getArea 関数を実装
type Rectangle = {
  kind: 'rectangle';
  width: number;
  height: number;
};

type Circle = {
  kind: 'circle';
  radius: number;
};

type Shape = Rectangle | Circle;

function getArea(shape: Shape): number {
  if (shape.kind === 'rectangle') {
    return shape.width * shape.height;
  }
  return Math.PI * shape.radius ** 2;
}

// ==========================================
// 問題 9: ユニオン型の絞り込み
// ==========================================
// Date または string を受け取り、Date オブジェクトとして返す toDate 関数を実装してください
// string の場合は new Date(dateStr) で変換
// TODO: ここに toDate 関数を実装
function toDate(dateInput: Date | string): Date {
  if (dateInput instanceof Date) {
    return dateInput;
  }
  return new Date(dateInput);
}

// ==========================================
// 問題 10: APIレスポンスの型
// ==========================================
// Loading, Success, Error の3つの状態を持つ ApiState 型を定義してください
// - Loading: { status: 'loading' }
// - Success: { status: 'success'; data: any }
// - Error: { status: 'error'; message: string }
// そして、ApiState を受け取って適切な表示文字列を返す renderState 関数を実装してください
// TODO: Loading, Success, Error, ApiState 型と renderState 関数を実装
type Loading = {
  status: 'loading';
};

type SuccessResponse = {
  status: 'success';
  data: any;
};

type ErrorResponse = {
  status: 'error';
  message: string;
};

type ApiState = Loading | SuccessResponse | ErrorResponse;

function renderState(state: ApiState): string {
  switch (state.status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return `Success: ${JSON.stringify(state.data)}`;
    case 'error':
      return `Error: ${state.message}`;
  }
}

// ==========================================
// 問題 11: 関数のユニオン型
// ==========================================
// 関数または値を受け取り、関数の場合は実行結果を、値の場合はそのまま返す
// resolve 関数を実装してください
// TODO: ここに resolve 関数を実装
function resolve<T>(valueOrFn: T | (() => T)): T {
  if (typeof valueOrFn === 'function') {
    return (valueOrFn as () => T)();
  }
  return valueOrFn;
}

// ==========================================
// 問題 12: 配列要素のユニオン型
// ==========================================
// (string | number)[] 型の配列を受け取り、
// 文字列のみを抽出する filterStrings 関数と
// 数値のみを抽出する filterNumbers 関数を実装してください
// TODO: ここに filterStrings と filterNumbers 関数を実装
function filterStrings(arr: (string | number)[]): string[] {
  return arr.filter((item): item is string => typeof item === 'string');
}

function filterNumbers(arr: (string | number)[]): number[] {
  return arr.filter((item): item is number => typeof item === 'number');
}

// ==========================================
// 問題 13: オプショナルとユニオン
// ==========================================
// User 型を定義してください
// - name: string（必須）
// - age: number | undefined（オプショナル）
// - email: string | null（nullを許容）
// そして、User を受け取って情報を整形する formatUser 関数を実装してください
// TODO: User 型と formatUser 関数を実装
type User = {
  name: string;
  age?: number;
  email: string | null;
};

function formatUser(user: User): string {
  let result = `Name: ${user.name}`;
  if (user.age !== undefined) {
    result += `, Age: ${user.age}`;
  }
  if (user.email !== null) {
    result += `, Email: ${user.email}`;
  }
  return result;
}

// ==========================================
// 問題 14: ネストしたユニオン型
// ==========================================
// TextMessage 型（type: 'text', content: string）と
// ImageMessage 型（type: 'image', url: string, caption?: string）を定義し、
// Message 型をこれらのユニオンとして定義してください
// そして、Message[] を受け取って各メッセージを表示する displayMessages 関数を実装してください
// TODO: TextMessage, ImageMessage, Message 型と displayMessages 関数を実装
type TextMessage = {
  type: 'text';
  content: string;
};

type ImageMessage = {
  type: 'image';
  url: string;
  caption?: string;
};

type Message = TextMessage | ImageMessage;

function displayMessages(messages: Message[]): void {
  messages.forEach((msg) => {
    if (msg.type === 'text') {
      console.log(`Text: ${msg.content}`);
    } else {
      console.log(`Image: ${msg.url}${msg.caption ? ` - ${msg.caption}` : ''}`);
    }
  });
}

// ==========================================
// 問題 15: ユニオン型と型の絞り込み
// ==========================================
// Input 型を以下のように定義してください：
// - { type: 'number'; value: number; min?: number; max?: number }
// - { type: 'text'; value: string; maxLength?: number }
// - { type: 'checkbox'; checked: boolean }
// そして、Input を受け取ってバリデーションする validate 関数を実装してください
// TODO: Input 型と validate 関数を実装
type NumberInput = {
  type: 'number';
  value: number;
  min?: number;
  max?: number;
};

type TextInput = {
  type: 'text';
  value: string;
  maxLength?: number;
};

type CheckboxInput = {
  type: 'checkbox';
  checked: boolean;
};

type Input = NumberInput | TextInput | CheckboxInput;

function validate(input: Input): boolean {
  if (input.type === 'number') {
    if (input.min !== undefined && input.value < input.min) return false;
    if (input.max !== undefined && input.value > input.max) return false;
    return true;
  } else if (input.type === 'text') {
    if (input.maxLength !== undefined && input.value.length > input.maxLength) {
      return false;
    }
    return true;
  } else {
    return true; // checkbox は常に有効
  }
}

// ==========================================
// テストコード（実装後にコメントを外して実行）
// ==========================================

console.log(toString(42)); // "42"
console.log(toString('hello')); // "hello"
console.log(formatId(123)); // "ID-123"
console.log(formatId('abc')); // "abc"
console.log(convertToStrings([1, 'two', 3])); // ['1', 'two', '3']
console.log(getMessage({ success: true, data: 'OK' }));
console.log(getMessage({ success: false, error: 'Failed' }));
console.log(getDisplayValue('Hello')); // "Hello"
console.log(getDisplayValue(null)); // "N/A"
console.log(getTypeName('text')); // "string"
console.log(getTypeName(123)); // "number"
console.log(getTypeName(true)); // "boolean"
console.log(ensureArray(1)); // [1]
console.log(ensureArray([1, 2])); // [1, 2]
console.log(getArea({ kind: 'rectangle', width: 5, height: 3 })); // 15
console.log(getArea({ kind: 'circle', radius: 5 })); // 78.54...
console.log(toDate('2024-01-01'));
console.log(toDate(new Date()));
console.log(renderState({ status: 'loading' }));
console.log(renderState({ status: 'success', data: { name: 'Alice' } }));
console.log(resolve(() => 'result')); // "result"
console.log(resolve('value')); // "value"
console.log(filterStrings([1, 'a', 2, 'b'])); // ['a', 'b']
console.log(filterNumbers([1, 'a', 2, 'b'])); // [1, 2]
console.log(formatUser({ name: 'Alice', age: 25, email: 'alice@example.com' }));

displayMessages([
  { type: 'text', content: 'Hello' },
  { type: 'image', url: 'photo.jpg', caption: 'My photo' },
]);
console.log(validate({ type: 'number', value: 5, min: 0, max: 10 })); // true
console.log(validate({ type: 'text', value: 'hello world', maxLength: 5 })); // false
