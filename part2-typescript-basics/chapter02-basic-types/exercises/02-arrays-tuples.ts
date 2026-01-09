// 練習問題 2: 配列型とタプル型

/**
 * 問題 1: 基本的な配列型
 * 以下の配列に適切な型注釈を追加してください。
 */

// ここに型注釈を追加
const scores: number[] = [85, 90, 78, 92];
const names: string[] = ['太郎', '花子', '次郎'];
const flags: boolean[] = [true, false, true];

console.log(scores, names, flags);

/**
 * 問題 2: 配列操作の型安全性
 * 以下の配列に要素を追加してください。型エラーが出るものを確認してください。
 */

// ここにコードを書く
const numbers: number[] = [1, 2, 3];
numbers.push(4); // OK
// numbers.push('5'); // エラーになることを確認

console.log(numbers);

/**
 * 問題 3: 多次元配列
 * 3x3 の数値行列を定義してください。
 */

// ここにコードを書く
const matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(matrix);

/**
 * 問題 4: 読み取り専用配列
 * 変更できない配列を作成してください。
 */

// ここにコードを書く
const readonlyScores: readonly number[] = [100, 95, 88];
// readonlyScores.push(92); // エラーになることを確認
// readonlyScores[0] = 85; // エラーになることを確認

console.log(readonlyScores);

/**
 * 問題 5: 基本的なタプル
 * 座標を表すタプル [x: number, y: number] を作成してください。
 */

// ここにコードを書く
const point: [number, number] = [10, 20];
console.log(`x: ${point[0]}, y: ${point[1]}`);
console.log(point);

/**
 * 問題 6: ラベル付きタプル
 * 商品情報を表すタプルを作成してください。
 *
 * 仕様:
 * - [name: string, price: number, inStock: boolean]
 */

// ここにコードを書く
const product: [string, number, boolean] = ['ノートPC', 99800, true];
console.log(product);

/**
 * 問題 7: オプショナルタプル
 * 郵便番号を表すタプルを作成してください。
 * ハイフンの後は省略可能にしてください。
 *
 * 仕様:
 * - [first: string, second?: string]
 * - 例: ['123', '4567'] または ['123']
 */

// ここにコードを書く
const zipCode: [string, string?] = ['123', '4567'];
console.log(zipCode);

/**
 * 問題 8: 残余要素を持つタプル
 * 最初の要素が string で、残りが number[] のタプルを作成してください。
 *
 * 仕様:
 * - ['label', 1, 2, 3, ...] のような形式
 */

// ここにコードを書く
const data: [string, ...number[]] = ['スコア', 85, 90, 78, 92];
console.log(data);

/**
 * 問題 9: タプルを返す関数
 * ユーザー名と年齢のタプルを返す関数を作成してください。
 *
 * 仕様:
 * - 関数名: getUser
 * - 引数: id (number)
 * - 戻り値: [string, number]
 */

// ここにコードを書く
function getUser(id: number): [string, number] {
  return ['太郎', 25];
}
console.log(getUser(1));

/**
 * 問題 10: 配列 vs タプルの使い分け
 * 以下のデータを配列とタプルのどちらで表現すべきか考えてください。
 */

// 1. ユーザーのスコア一覧（可変長）
// → 配列: number[]

// 2. RGB色（固定3要素）
// → タプル: [number, number, number]

// ここにコードを書く
const colors: [number, number, number] = [255, 128, 0];
const allScores: number[] = [85, 90, 78, 92, 88];

console.log(colors, allScores);
/**
 * 問題 11: タプルの分割代入
 * タプルを分割代入で取り出してください。
 */

// ここにコードを書く
const person: [string, number, string] = ['太郎', 25, '東京'];
const [name, age, city] = person;
console.log(`${name}さん、${age}歳、${city}在住`);

/**
 * 問題 12: 複雑なタプル
 * 従業員情報を表す複雑なタプルを作成してください。
 *
 * 仕様:
 * - [id: number, name: string, skills: string[], isActive: boolean]
 */

// ここにコードを書く
const employee: [number, string, string[], boolean] = [
  1,
  '太郎',
  ['TypeScript', 'React', 'Node.js'],
  true,
];
console.log(employee);
