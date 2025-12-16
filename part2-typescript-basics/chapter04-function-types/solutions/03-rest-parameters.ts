/**
 * 解答例 3: 残余引数（Rest Parameters）
 */

// ==========================================
// 問題 1: 数値の合計
// ==========================================
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

// ==========================================
// 問題 2: 最大値を見つける
// ==========================================
function max(...numbers: number[]): number {
  if (numbers.length === 0) return -Infinity;
  return Math.max(...numbers);
}

// ==========================================
// 問題 3: 文字列の結合
// ==========================================
function join(separator: string, ...strings: string[]): string {
  return strings.join(separator);
}

// ==========================================
// 問題 4: 配列の結合
// ==========================================
function merge<T>(...arrays: T[][]): T[] {
  return arrays.flat();
}

// ==========================================
// 問題 5: 平均値の計算
// ==========================================
function average(...numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return sum(...numbers) / numbers.length;
}

// ==========================================
// 問題 6: 関数の合成
// ==========================================
function compose(...fns: Array<(value: number) => number>): (value: number) => number {
  return (value: number) => {
    return fns.reduce((result, fn) => fn(result), value);
  };
}

// ==========================================
// 問題 7: タグ付きテンプレート
// ==========================================
function tagMessages(prefix: string, ...messages: string[]): string[] {
  return messages.map(msg => `${prefix}: ${msg}`);
}

// ==========================================
// 問題 8: オブジェクトのマージ
// ==========================================
function mergeObjects<T extends object>(...objects: T[]): T {
  return Object.assign({}, ...objects);
}

// ==========================================
// 問題 9: すべてが真かチェック
// ==========================================
function all(...values: boolean[]): boolean {
  return values.every(v => v === true);
}

// ==========================================
// 問題 10: いずれかが真かチェック
// ==========================================
function any(...values: boolean[]): boolean {
  return values.some(v => v === true);
}

// ==========================================
// 問題 11: 型の異なる残余引数
// ==========================================
function calculate(operation: 'add' | 'multiply', ...numbers: number[]): number {
  if (operation === 'add') {
    return sum(...numbers);
  } else {
    return numbers.reduce((result, num) => result * num, 1);
  }
}

// ==========================================
// 問題 12: タプルとの組み合わせ
// ==========================================
function createProfile(name: string, age: number, ...hobbies: string[]): object {
  return {
    name,
    age,
    hobbies
  };
}

// ==========================================
// 問題 13: 可変長引数のフィルタリング
// ==========================================
function filterNumbers(...values: (number | string)[]): number[] {
  return values.filter((v): v is number => typeof v === 'number');
}

// ==========================================
// 問題 14: ログ関数
// ==========================================
function log(level: 'INFO' | 'WARN' | 'ERROR', ...messages: string[]): void {
  console.log(`[${level}] ${messages.join(' ')}`);
}

// ==========================================
// 問題 15: 複数の条件チェック
// ==========================================
function validate(value: any, ...validators: Array<(value: any) => boolean>): boolean {
  return validators.every(validator => validator(value));
}

// ==========================================
// テストコード
// ==========================================
console.log(sum(1, 2, 3, 4, 5));                    // 15
console.log(max(1, 5, 3, 9, 2));                    // 9
console.log(join(', ', 'apple', 'banana', 'cherry')); // "apple, banana, cherry"
console.log(merge([1, 2], [3, 4], [5, 6]));         // [1, 2, 3, 4, 5, 6]
console.log(average(1, 2, 3, 4, 5));                // 3

const double = (x: number) => x * 2;
const addTen = (x: number) => x + 10;
const composed = compose(double, addTen);
console.log(composed(5));                            // 20

console.log(tagMessages('INFO', 'Server started', 'Port 3000'));
// ['INFO: Server started', 'INFO: Port 3000']

console.log(mergeObjects({ a: 1 }, { b: 2 }, { a: 3 })); // { a: 3, b: 2 }
console.log(all(true, true, true));                  // true
console.log(all(true, false, true));                 // false
console.log(any(false, false, true));                // true

console.log(calculate('add', 1, 2, 3, 4));          // 10
console.log(calculate('multiply', 2, 3, 4));        // 24

console.log(createProfile('Alice', 25, 'Reading', 'Coding', 'Gaming'));
// { name: 'Alice', age: 25, hobbies: ['Reading', 'Coding', 'Gaming'] }

console.log(filterNumbers(1, 'a', 2, 'b', 3));     // [1, 2, 3]

log('INFO', 'Server started', 'Port 3000');
// [INFO] Server started Port 3000

const isPositive = (x: any) => typeof x === 'number' && x > 0;
const isEven = (x: any) => typeof x === 'number' && x % 2 === 0;
console.log(validate(4, isPositive, isEven));       // true
console.log(validate(-2, isPositive, isEven));      // false
