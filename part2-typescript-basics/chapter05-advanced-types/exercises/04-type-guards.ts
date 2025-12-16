/**
 * 練習問題 4: 型ガード（Type Guards）
 *
 * このファイルでは、各種型ガードの実装を練習します。
 */

// ==========================================
// 問題 1: typeof 型ガード
// ==========================================
// string | number を受け取り、適切に処理する processValue 関数を実装してください
// string の場合は大文字に、number の場合は2倍にする
// TODO: ここに processValue 関数を実装


// ==========================================
// 問題 2: instanceof 型ガード
// ==========================================
// Date | string を受け取り、Date オブジェクトの年を返す getYear 関数を実装してください
// string の場合は new Date(dateStr) で変換してから年を取得
// TODO: ここに getYear 関数を実装


// ==========================================
// 問題 3: in 型ガード
// ==========================================
// Dog 型（bark: () => void）と Cat 型（meow: () => void）を定義し、
// これらのユニオン型を受け取って適切な音を出す makeSound 関数を実装してください
// TODO: Dog, Cat 型と makeSound 関数を実装


// ==========================================
// 問題 4: ユーザー定義型ガード（isString）
// ==========================================
// unknown 型を受け取り、string かどうかを判定する isString 型ガード関数を実装してください
// 戻り値の型は value is string
// TODO: ここに isString 関数を実装


// ==========================================
// 問題 5: ユーザー定義型ガード（isNumber）
// ==========================================
// unknown 型を受け取り、number かどうかを判定する isNumber 型ガード関数を実装してください
// TODO: ここに isNumber 関数を実装


// ==========================================
// 問題 6: オブジェクトの型ガード
// ==========================================
// User インターフェース（name: string, email: string）を定義し、
// unknown を受け取って User かどうかを判定する isUser 型ガード関数を実装してください
// TODO: User インターフェースと isUser 関数を実装


// ==========================================
// 問題 7: 配列の型ガード
// ==========================================
// unknown を受け取り、string[] かどうかを判定する isStringArray 型ガード関数を実装してください
// TODO: ここに isStringArray 関数を実装


// ==========================================
// 問題 8: null/undefined チェック
// ==========================================
// T | null | undefined を受け取り、null でも undefined でもないことを判定する
// isNotNullish<T> 型ガード関数を実装してください
// TODO: ここに isNotNullish 関数を実装


// ==========================================
// 問題 9: 判別可能なユニオンの型ガード
// ==========================================
// Success 型（success: true, data: any）と
// Failure 型（success: false, error: string）を定義し、
// Result 型をこれらのユニオンとして定義してください
// そして、Result を受け取って Success かどうかを判定する isSuccess 型ガード関数を実装してください
// TODO: Success, Failure, Result 型と isSuccess 関数を実装


// ==========================================
// 問題 10: 複数の型ガードの組み合わせ
// ==========================================
// string | number | boolean を受け取り、型に応じて処理する handleValue 関数を実装してください
// string: 大文字化、number: 2倍、boolean: 反転
// TODO: ここに handleValue 関数を実装


// ==========================================
// 問題 11: クラスインスタンスの型ガード
// ==========================================
// Rectangle クラスと Circle クラスを定義し、
// Shape 型（Rectangle | Circle）を受け取って面積を計算する getArea 関数を実装してください
// instanceof を使って型を判別
// TODO: Rectangle, Circle クラスと getArea 関数を実装


// ==========================================
// 問題 12: プロパティの存在チェック
// ==========================================
// Car 型（drive: () => void）と Boat 型（sail: () => void）を定義し、
// Vehicle 型（Car | Boat）を受け取って移動する moveVehicle 関数を実装してください
// in 演算子を使って型を判別
// TODO: Car, Boat 型と moveVehicle 関数を実装


// ==========================================
// 問題 13: ネストしたオブジェクトの型ガード
// ==========================================
// Address 型（street: string, city: string）を定義し、
// オブジェクトが Address 型かどうかを判定する isAddress 型ガード関数を実装してください
// TODO: Address 型と isAddress 関数を実装


// ==========================================
// 問題 14: 型の絞り込みを活用
// ==========================================
// Input 型を以下のように定義してください：
// - { type: 'text', value: string }
// - { type: 'number', value: number }
// - { type: 'checkbox', checked: boolean }
// そして、Input を受け取って値を取得する getValue 関数を実装してください
// TODO: Input 型と getValue 関数を実装


// ==========================================
// 問題 15: 複雑な型ガードの組み合わせ
// ==========================================
// APIResponse<T> 型を以下のように定義してください：
// - { status: 'success', data: T }
// - { status: 'error', error: { code: number, message: string } }
// - { status: 'loading' }
// そして、APIResponse<T> を受け取って適切に処理する handleResponse<T> 関数を実装してください
// TODO: APIResponse<T> 型と handleResponse 関数を実装


// ==========================================
// テストコード（実装後にコメントを外して実行）
// ==========================================
/*
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
*/
