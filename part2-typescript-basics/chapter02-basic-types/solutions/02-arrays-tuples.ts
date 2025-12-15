// 解答例 2: 配列型とタプル型

/**
 * 問題 1: 基本的な配列型
 */

let scores: number[] = [85, 90, 78, 92];
let names: string[] = ['太郎', '花子', '次郎'];
let flags: boolean[] = [true, false, true];

/**
 * 問題 2: 配列操作の型安全性
 */

let numbers: number[] = [1, 2, 3];
numbers.push(4); // OK
// numbers.push('5'); // エラー: Argument of type 'string' is not assignable

console.log(numbers);

/**
 * 問題 3: 多次元配列
 */

let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log(matrix[0][0]); // 1
console.log(matrix[1][2]); // 6

/**
 * 問題 4: 読み取り専用配列
 */

let readonlyScores: readonly number[] = [100, 95, 88];
// または
let readonlyScores2: ReadonlyArray<number> = [100, 95, 88];

// readonlyScores.push(92); // エラー: Property 'push' does not exist
// readonlyScores[0] = 85; // エラー: Index signature in type 'readonly number[]' only permits reading

console.log(readonlyScores);

/**
 * 問題 5: 基本的なタプル
 */

let point: [number, number] = [10, 20];
console.log(`x: ${point[0]}, y: ${point[1]}`);
// 出力: x: 10, y: 20

/**
 * 問題 6: ラベル付きタプル
 */

let product: [name: string, price: number, inStock: boolean] = [
  'ノートPC',
  99800,
  true
];

console.log(`商品: ${product[0]}, 価格: ${product[1]}, 在庫: ${product[2]}`);

/**
 * 問題 7: オプショナルタプル
 */

let zipCode1: [first: string, second?: string] = ['123', '4567'];
let zipCode2: [first: string, second?: string] = ['123'];

console.log(zipCode1); // ['123', '4567']
console.log(zipCode2); // ['123']

/**
 * 問題 8: 残余要素を持つタプル
 */

let data: [string, ...number[]] = ['スコア', 85, 90, 78, 92];

console.log(data[0]); // 'スコア'
console.log(data.slice(1)); // [85, 90, 78, 92]

/**
 * 問題 9: タプルを返す関数
 */

function getUser(id: number): [string, number] {
  // 実際にはデータベースから取得する想定
  return ['太郎', 25];
}

const [name, age] = getUser(1);
console.log(`名前: ${name}, 年齢: ${age}`);
// 出力: 名前: 太郎, 年齢: 25

/**
 * 問題 10: 配列 vs タプルの使い分け
 */

// RGB色（固定3要素） → タプル
let color: [number, number, number] = [255, 128, 0];

// スコア一覧（可変長） → 配列
let allScores: number[] = [85, 90, 78, 92, 88];

/**
 * 問題 11: タプルの分割代入
 */

let person: [string, number, string] = ['太郎', 25, '東京'];
const [personName, personAge, city] = person;
console.log(`${personName}さん、${personAge}歳、${city}在住`);
// 出力: 太郎さん、25歳、東京在住

/**
 * 問題 12: 複雑なタプル
 */

let employee: [id: number, name: string, skills: string[], isActive: boolean] = [
  1,
  '花子',
  ['TypeScript', 'React', 'Node.js'],
  true
];

console.log(`ID: ${employee[0]}`);
console.log(`名前: ${employee[1]}`);
console.log(`スキル: ${employee[2].join(', ')}`);
console.log(`アクティブ: ${employee[3]}`);
