/**
 * 練習問題 3: 残余引数（Rest Parameters）
 *
 * このファイルでは、残余引数を使った可変長引数の関数を練習します。
 */

// ==========================================
// 問題 1: 数値の合計
// ==========================================
// 任意の数の数値を受け取り、その合計を返す sum 関数を定義してください
// TODO: ここに sum 関数を実装
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

// ==========================================
// 問題 2: 最大値を見つける
// ==========================================
// 任意の数の数値を受け取り、最大値を返す max 関数を定義してください
// 引数が0個の場合は -Infinity を返してください
// TODO: ここに max 関数を実装
function max(...numbers: number[]): number {
  if (numbers.length === 0) return -Infinity;
  return Math.max(...numbers);
}
// ==========================================
// 問題 3: 文字列の結合
// ==========================================
// セパレータ（string）と任意の数の文字列を受け取り、
// セパレータで結合した文字列を返す join 関数を定義してください
// 例: join(', ', 'apple', 'banana', 'cherry') → "apple, banana, cherry"
// TODO: ここに join 関数を実装
function join(separator: string, ...strings: string[]): string {
  return strings.join(separator);
}

// ==========================================
// 問題 4: 配列の結合
// ==========================================
// 任意の数の配列を受け取り、それらを1つの配列に結合する merge 関数を定義してください
// TODO: ここに merge 関数を実装
function merge<T>(...arrays: T[][]): T[] {
  return arrays.flat();
}
// ==========================================
// 問題 5: 平均値の計算
// ==========================================
// 任意の数の数値を受け取り、平均値を返す average 関数を定義してください
// 引数が0個の場合は 0 を返してください
// TODO: ここに average 関数を実装
function average(...numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return sum(...numbers) / numbers.length;
}

// ==========================================
// 問題 6: 関数の合成
// ==========================================
// 任意の数の関数を受け取り、それらを順番に適用する関数を返す compose 関数を定義してください
// 各関数は (value: number) => number の形式です
// TODO: ここに compose 関数を実装
function compose(...fns: Array<(value: number) => number>): (value: number) => number {
  return (value: number) => fns.reduce((acc, fn) => fn(acc), value);
}

// ==========================================
// 問題 7: タグ付きテンプレート
// ==========================================
// プレフィックス（string）と任意の数のメッセージを受け取り、
// すべてのメッセージにプレフィックスをつけた配列を返す tagMessages 関数を定義してください
// 例: tagMessages('INFO', 'Server started', 'Port 3000')
//     → ['INFO: Server started', 'INFO: Port 3000']
// TODO: ここに tagMessages 関数を実装
function tagMessages(prefix: string, ...messages: string[]): string[] {
  return messages.map((msg) => `${prefix}: ${msg}`);
}

// ==========================================
// 問題 8: オブジェクトのマージ
// ==========================================
// 任意の数のオブジェクトを受け取り、それらをマージした新しいオブジェクトを返す
// mergeObjects 関数を定義してください
// 後のオブジェクトのプロパティが前のものを上書きします
// TODO: ここに mergeObjects 関数を実装
function mergeObjects<T extends object>(...objects: T[]): T {
  return Object.assign({}, ...objects);
}

// ==========================================
// 問題 9: すべてが真かチェック
// ==========================================
// 任意の数の boolean 値を受け取り、すべてが true の場合のみ true を返す
// all 関数を定義してください
// TODO: ここに all 関数を実装
function all(...values: boolean[]): boolean {
  return values.every((v) => v === true);
}

// ==========================================
// 問題 10: いずれかが真かチェック
// ==========================================
// 任意の数の boolean 値を受け取り、1つでも true があれば true を返す
// any 関数を定義してください
// TODO: ここに any 関数を実装
function any(...values: boolean[]): boolean {
  return values.some((v) => v === true);
}
// ==========================================
// 問題 11: 型の異なる残余引数
// ==========================================
// 最初の引数として操作の種類（'add' | 'multiply'）を受け取り、
// その後任意の数の数値を受け取って、指定された操作を適用する calculate 関数を定義してください
// TODO: ここに calculate 関数を実装
function calculate(operation: 'add' | 'multiply', ...numbers: number[]): number {
  if (operation === 'add') return numbers.reduce((acc, num) => acc + num, 0);
  return numbers.reduce((acc, num) => acc * num, 1);
}
// ==========================================
// 問題 12: タプルとの組み合わせ
// ==========================================
// 最初の2つの引数は必須（name: string, age: number）で、
// その後任意の数の趣味（string）を受け取り、プロフィールオブジェクトを返す
// createProfile 関数を定義してください
// TODO: ここに createProfile 関数を実装
function createProfile(name: string, age: number, ...hobbies: string[]): object {
  return { name, age, hobbies };
}
// ==========================================
// 問題 13: 可変長引数のフィルタリング
// ==========================================
// 任意の数の値（number | string）を受け取り、数値のみを抽出して配列で返す
// filterNumbers 関数を定義してください
// TODO: ここに filterNumbers 関数を実装
function filterNumbers(...values: (number | string)[]): number[] {
  return values.filter((v): v is number => typeof v === 'number');
}

// ==========================================
// 問題 14: ログ関数
// ==========================================
// ログレベル（'INFO' | 'WARN' | 'ERROR'）と任意の数のメッセージを受け取り、
// フォーマットして出力する log 関数を定義してください
// 出力形式: [LEVEL] message1 message2 ...
// TODO: ここに log 関数を実装
function log(level: 'INFO' | 'WARN' | 'ERROR', ...messages: string[]): void {
  console.log(`[${level}] ${messages.join(' ')}`);
}
// ==========================================
// 問題 15: 複数の条件チェック
// ==========================================
// 値と任意の数の検証関数を受け取り、すべての検証をパスすれば true を返す
// validate 関数を定義してください
// 検証関数の型: (value: any) => boolean
// TODO: ここに validate 関数を実装
function validate(value: any, ...validators: Array<(value: any) => boolean>): boolean {
  return validators.every((validator) => validator(value));
}

// ==========================================
// テストコード（実装後にコメントを外して実行）
// ==========================================

console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(max(1, 5, 3, 9, 2)); // 9
console.log(max()); // -Infinity
console.log(join(', ', 'apple', 'banana', 'cherry')); // "apple, banana, cherry"
console.log(merge([1, 2], [3, 4], [5, 6])); // [1, 2, 3, 4, 5, 6]
console.log(average(1, 2, 3, 4, 5)); // 3
const double = (x: number) => x * 2;
const addTen = (x: number) => x + 10;
const composed = compose(double, addTen);
console.log(composed(5)); // 20 (5 * 2 + 10)
console.log(tagMessages('INFO', 'Server started', 'Port 3000'));
console.log(mergeObjects({ a: 1 }, { b: 2 }, { a: 3 })); // { a: 3, b: 2 }
console.log(all(true, true, true)); // true
console.log(all(true, false, true)); // false
console.log(any(false, false, true)); // true
console.log(calculate('add', 1, 2, 3, 4)); // 10
console.log(calculate('multiply', 2, 3, 4)); // 24
console.log(createProfile('Alice', 25, 'Reading', 'Coding', 'Gaming'));
console.log(filterNumbers(1, 'a', 2, 'b', 3)); // [1, 2, 3]
log('INFO', 'Server started', 'Port 3000');
const isPositive = (x: any) => typeof x === 'number' && x > 0;
const isEven = (x: any) => typeof x === 'number' && x % 2 === 0;
console.log(validate(4, isPositive, isEven)); // true
console.log(validate(-2, isPositive, isEven)); // false
