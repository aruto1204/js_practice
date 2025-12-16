/**
 * 解答例 4: 型ガード（Type Guards）
 */

// ==========================================
// 問題 1: typeof 型ガード
// ==========================================
function processValue(value: string | number): string | number {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value * 2;
}

// ==========================================
// 問題 2: instanceof 型ガード
// ==========================================
function getYear(date: Date | string): number {
  if (date instanceof Date) {
    return date.getFullYear();
  }
  return new Date(date).getFullYear();
}

// ==========================================
// 問題 3: in 型ガード
// ==========================================
type Dog = {
  bark: () => void;
};

type Cat = {
  meow: () => void;
};

function makeSound(animal: Dog | Cat): void {
  if ('bark' in animal) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// ==========================================
// 問題 4: ユーザー定義型ガード（isString）
// ==========================================
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// ==========================================
// 問題 5: ユーザー定義型ガード（isNumber）
// ==========================================
function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

// ==========================================
// 問題 6: オブジェクトの型ガード
// ==========================================
interface User {
  name: string;
  email: string;
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'email' in obj &&
    typeof (obj as User).name === 'string' &&
    typeof (obj as User).email === 'string'
  );
}

// ==========================================
// 問題 7: 配列の型ガード
// ==========================================
function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every(item => typeof item === 'string')
  );
}

// ==========================================
// 問題 8: null/undefined チェック
// ==========================================
function isNotNullish<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

// ==========================================
// 問題 9: 判別可能なユニオンの型ガード
// ==========================================
type Success = {
  success: true;
  data: any;
};

type Failure = {
  success: false;
  error: string;
};

type Result = Success | Failure;

function isSuccess(result: Result): result is Success {
  return result.success === true;
}

// ==========================================
// 問題 10: 複数の型ガードの組み合わせ
// ==========================================
function handleValue(value: string | number | boolean): string | number | boolean {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else if (typeof value === 'number') {
    return value * 2;
  } else {
    return !value;
  }
}

// ==========================================
// 問題 11: クラスインスタンスの型ガード
// ==========================================
class Rectangle {
  constructor(public width: number, public height: number) {}

  getArea(): number {
    return this.width * this.height;
  }
}

class Circle {
  constructor(public radius: number) {}

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

type Shape = Rectangle | Circle;

function getArea(shape: Shape): number {
  if (shape instanceof Rectangle) {
    return shape.getArea();
  }
  return shape.getArea();
}

// ==========================================
// 問題 12: プロパティの存在チェック
// ==========================================
type Car = {
  drive: () => void;
};

type Boat = {
  sail: () => void;
};

type Vehicle = Car | Boat;

function moveVehicle(vehicle: Vehicle): void {
  if ('drive' in vehicle) {
    vehicle.drive();
  } else {
    vehicle.sail();
  }
}

// ==========================================
// 問題 13: ネストしたオブジェクトの型ガード
// ==========================================
type Address = {
  street: string;
  city: string;
};

function isAddress(obj: unknown): obj is Address {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'street' in obj &&
    'city' in obj &&
    typeof (obj as Address).street === 'string' &&
    typeof (obj as Address).city === 'string'
  );
}

// ==========================================
// 問題 14: 型の絞り込みを活用
// ==========================================
type Input =
  | { type: 'text'; value: string }
  | { type: 'number'; value: number }
  | { type: 'checkbox'; checked: boolean };

function getValue(input: Input): string | number | boolean {
  switch (input.type) {
    case 'text':
      return input.value;
    case 'number':
      return input.value;
    case 'checkbox':
      return input.checked;
  }
}

// ==========================================
// 問題 15: 複雑な型ガードの組み合わせ
// ==========================================
type APIResponse<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: { code: number; message: string } }
  | { status: 'loading' };

function handleResponse<T>(response: APIResponse<T>): void {
  switch (response.status) {
    case 'success':
      console.log('Data:', response.data);
      break;
    case 'error':
      console.log(`Error ${response.error.code}: ${response.error.message}`);
      break;
    case 'loading':
      console.log('Loading...');
      break;
  }
}

// ==========================================
// テストコード
// ==========================================
console.log(processValue('hello'));                  // "HELLO"
console.log(processValue(5));                        // 10

console.log(getYear(new Date('2024-01-01')));       // 2024
console.log(getYear('2024-01-01'));                 // 2024

const dog: Dog = { bark: () => console.log('Woof!') };
const cat: Cat = { meow: () => console.log('Meow!') };
makeSound(dog);
makeSound(cat);

console.log(isString('hello'));                      // true
console.log(isString(123));                          // false

console.log(isNumber(42));                           // true
console.log(isNumber('42'));                         // false

const user = { name: 'Alice', email: 'alice@example.com' };
console.log(isUser(user));                           // true
console.log(isUser({ name: 'Bob' }));               // false

console.log(isStringArray(['a', 'b']));             // true
console.log(isStringArray([1, 2]));                 // false

console.log(isNotNullish('value'));                 // true
console.log(isNotNullish(null));                    // false

const success: Result = { success: true, data: 'OK' };
const failure: Result = { success: false, error: 'Failed' };
console.log(isSuccess(success));                     // true
console.log(isSuccess(failure));                     // false

console.log(handleValue('test'));                    // "TEST"
console.log(handleValue(5));                         // 10
console.log(handleValue(true));                      // false

const rect = new Rectangle(5, 3);
const circle = new Circle(5);
console.log(getArea(rect));                          // 15
console.log(getArea(circle));                        // 78.54...

const car: Car = { drive: () => console.log('Driving...') };
const boat: Boat = { sail: () => console.log('Sailing...') };
moveVehicle(car);
moveVehicle(boat);

const address = { street: '123 Main St', city: 'Tokyo' };
console.log(isAddress(address));                     // true

const textInput: Input = { type: 'text', value: 'hello' };
console.log(getValue(textInput));                    // "hello"

const response: APIResponse<string> = { status: 'success', data: 'OK' };
handleResponse(response);
handleResponse({ status: 'error', error: { code: 404, message: 'Not Found' } });
handleResponse({ status: 'loading' });
