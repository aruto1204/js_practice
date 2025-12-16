/**
 * 解答例 1: ユニオン型（Union Types）
 */

// ==========================================
// 問題 1: 基本的なユニオン型
// ==========================================
function toString(value: string | number): string {
  return String(value);
}

// ==========================================
// 問題 2: ID型の定義
// ==========================================
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
function convertToStrings(arr: (number | string)[]): string[] {
  return arr.map(item => String(item));
}

// ==========================================
// 問題 4: オブジェクトのユニオン型
// ==========================================
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
function getDisplayValue(value: string | null): string {
  return value ?? 'N/A';
}

// ==========================================
// 問題 6: 複数の型のユニオン
// ==========================================
function getTypeName(value: string | number | boolean): string {
  return typeof value;
}

// ==========================================
// 問題 7: 配列またはオブジェクト
// ==========================================
function ensureArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

// ==========================================
// 問題 8: 複数のオブジェクト型のユニオン
// ==========================================
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
function toDate(dateInput: Date | string): Date {
  if (dateInput instanceof Date) {
    return dateInput;
  }
  return new Date(dateInput);
}

// ==========================================
// 問題 10: APIレスポンスの型
// ==========================================
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
function resolve<T>(valueOrFn: T | (() => T)): T {
  if (typeof valueOrFn === 'function') {
    return (valueOrFn as () => T)();
  }
  return valueOrFn;
}

// ==========================================
// 問題 12: 配列要素のユニオン型
// ==========================================
function filterStrings(arr: (string | number)[]): string[] {
  return arr.filter((item): item is string => typeof item === 'string');
}

function filterNumbers(arr: (string | number)[]): number[] {
  return arr.filter((item): item is number => typeof item === 'number');
}

// ==========================================
// 問題 13: オプショナルとユニオン
// ==========================================
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
  messages.forEach(msg => {
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
// テストコード
// ==========================================
console.log(toString(42));                           // "42"
console.log(toString('hello'));                      // "hello"
console.log(formatId(123));                          // "ID-123"
console.log(formatId('abc'));                        // "abc"
console.log(convertToStrings([1, 'two', 3]));       // ['1', 'two', '3']
console.log(getMessage({ success: true, data: 'OK' }));
console.log(getMessage({ success: false, error: 'Failed' }));
console.log(getDisplayValue('Hello'));               // "Hello"
console.log(getDisplayValue(null));                  // "N/A"
console.log(getTypeName('text'));                    // "string"
console.log(getTypeName(123));                       // "number"
console.log(getTypeName(true));                      // "boolean"
console.log(ensureArray(1));                         // [1]
console.log(ensureArray([1, 2]));                    // [1, 2]
console.log(getArea({ kind: 'rectangle', width: 5, height: 3 })); // 15
console.log(getArea({ kind: 'circle', radius: 5 })); // 78.54...
console.log(toDate('2024-01-01'));
console.log(toDate(new Date()));
console.log(renderState({ status: 'loading' }));
console.log(renderState({ status: 'success', data: { name: 'Alice' } }));
console.log(resolve(() => 'result'));                // "result"
console.log(resolve('value'));                       // "value"
console.log(filterStrings([1, 'a', 2, 'b']));       // ['a', 'b']
console.log(filterNumbers([1, 'a', 2, 'b']));       // [1, 2]
console.log(formatUser({ name: 'Alice', age: 25, email: 'alice@example.com' }));
displayMessages([
  { type: 'text', content: 'Hello' },
  { type: 'image', url: 'photo.jpg', caption: 'My photo' }
]);
console.log(validate({ type: 'number', value: 5, min: 0, max: 10 })); // true
console.log(validate({ type: 'text', value: 'hello world', maxLength: 5 })); // false
