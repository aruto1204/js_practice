// 練習問題 5: JavaScript との比較

/**
 * 問題 1: 型エラーの検出
 *
 * JavaScript では実行時にしかわからないエラーを、
 * TypeScript ではコンパイル時に検出できます。
 */

// JavaScript の場合
/*
function greetJS(name) {
  return 'Hello, ' + name.toUpperCase();
}

greetJS(123); // 実行時エラー: name.toUpperCase is not a function
*/

// TypeScript の場合
function greetTS(name: string): string {
  return 'Hello, ' + name.toUpperCase();
}

// greetTS(123); // コンパイルエラー（実行前に検出）
greetTS('TypeScript'); // OK

/**
 * 問題 2: オブジェクトの型安全性
 *
 * JavaScript ではプロパティ名のタイプミスが実行時エラーになります。
 * TypeScript では型定義によりコンパイル時に検出できます。
 */

// JavaScript の場合
/*
const userJS = {
  name: '太郎',
  age: 25
};

console.log(userJS.naem); // undefined (タイポに気づかない)
*/

// TypeScript の場合
interface User {
  name: string;
  age: number;
}

const userTS: User = {
  name: '太郎',
  age: 25
};

// console.log(userTS.naem); // コンパイルエラー（タイポを検出）
console.log(userTS.name); // OK

/**
 * 問題 3: 関数の引数チェック
 *
 * JavaScript では引数の数や型が間違っていても実行できてしまいます。
 */

// JavaScript の場合
/*
function addJS(a, b) {
  return a + b;
}

addJS(5);           // NaN (b が undefined)
addJS(5, 3, 10);    // 8 (余分な引数は無視される)
addJS('5', '3');    // '53' (文字列連結になる)
*/

// TypeScript の場合
function addTS(a: number, b: number): number {
  return a + b;
}

// addTS(5);        // コンパイルエラー: 引数が足りない
// addTS(5, 3, 10); // コンパイルエラー: 引数が多すぎる
// addTS('5', '3'); // コンパイルエラー: 型が違う
addTS(5, 3); // OK

/**
 * 問題 4: 配列の型安全性
 */

// JavaScript の場合
/*
const numbersJS = [1, 2, 3];
numbersJS.push('4'); // OK（混在した配列になる）
console.log(numbersJS); // [1, 2, 3, '4']
*/

// TypeScript の場合
const numbersTS: number[] = [1, 2, 3];
// numbersTS.push('4'); // コンパイルエラー
numbersTS.push(4); // OK

/**
 * 問題 5: null/undefined のチェック
 *
 * strictNullChecks を有効にすると、null/undefined の扱いが厳密になります。
 */

// JavaScript の場合
/*
function getLengthJS(str) {
  return str.length; // str が null/undefined だとエラー
}

getLengthJS(null); // 実行時エラー
*/

// TypeScript の場合（strictNullChecks: true）
function getLengthTS(str: string | null): number {
  if (str === null) {
    return 0;
  }
  return str.length; // null チェック後なので安全
}

console.log(getLengthTS(null)); // 0
console.log(getLengthTS('Hello')); // 5

/**
 * 問題 6: インターフェースの活用
 *
 * TypeScript ではインターフェースを使ってオブジェクトの構造を定義できます。
 */

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

function displayProduct(product: Product): void {
  console.log(`${product.name}: ¥${product.price}`);
  console.log(`在庫: ${product.inStock ? 'あり' : 'なし'}`);
}

const laptop: Product = {
  id: 1,
  name: 'ノートPC',
  price: 100000,
  inStock: true
};

displayProduct(laptop);

// 以下はエラー（プロパティが足りない）
// const invalidProduct: Product = {
//   id: 2,
//   name: 'マウス'
// };

/**
 * 問題 7: クラスの型安全性
 */

// JavaScript の場合
/*
class PersonJS {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, I'm ${this.naem}`; // タイポ（実行時に undefined）
  }
}
*/

// TypeScript の場合
class PersonTS {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet(): string {
    // return `Hello, I'm ${this.naem}`; // コンパイルエラー（タイポを検出）
    return `Hello, I'm ${this.name}`;
  }
}

/**
 * 問題 8: 列挙型（Enum）
 *
 * TypeScript では列挙型を使って定数をグループ化できます。
 */

enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING'
}

interface Account {
  id: number;
  status: Status;
}

const account: Account = {
  id: 1,
  status: Status.Active
};

// account.status = 'ACTIVE'; // エラー: string は Status 型に代入できない
// account.status = Status.Active; // OK

/**
 * 問題 9: ジェネリクスの使用
 *
 * TypeScript ではジェネリクスを使って型安全な汎用コードを書けます。
 */

// JavaScript の場合（型安全でない）
/*
function firstJS(arr) {
  return arr[0];
}

const num = firstJS([1, 2, 3]);   // number だが、型情報がない
const str = firstJS(['a', 'b']);  // string だが、型情報がない
*/

// TypeScript の場合（型安全）
function firstTS<T>(arr: T[]): T | undefined {
  return arr[0];
}

const num = firstTS([1, 2, 3]); // number 型と推論
const str = firstTS(['a', 'b']); // string 型と推論

/**
 * 問題 10: 型ガードの活用
 */

function processValue(value: string | number): void {
  // JavaScript の場合
  // typeof チェックは必要だが、型システムの恩恵はない

  // TypeScript の場合
  if (typeof value === 'string') {
    // この中では value は string 型として扱われる
    console.log(value.toUpperCase());
  } else {
    // この中では value は number 型として扱われる
    console.log(value.toFixed(2));
  }
}

processValue('hello');
processValue(123.456);

/**
 * まとめ: TypeScript の利点
 *
 * 1. コンパイル時の型チェック - 実行前にエラーを検出
 * 2. IDEの補完機能が強力 - 開発効率が向上
 * 3. リファクタリングが安全 - 型システムがサポート
 * 4. 大規模開発に適している - コードの保守性が向上
 * 5. ドキュメント代わりになる - 型が仕様を表現
 */
