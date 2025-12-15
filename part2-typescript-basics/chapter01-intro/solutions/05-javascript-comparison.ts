// 解答例 5: JavaScript との比較

/**
 * 問題 1: 型エラーの検出
 */

// TypeScript の場合
function greetTS(name: string): string {
  return 'Hello, ' + name.toUpperCase();
}

greetTS('TypeScript'); // OK
// greetTS(123); // コンパイルエラー

console.log(greetTS('World'));

/**
 * 問題 2: オブジェクトの型安全性
 */

interface User {
  name: string;
  age: number;
}

const userTS: User = {
  name: '太郎',
  age: 25
};

console.log(userTS.name); // OK
// console.log(userTS.naem); // コンパイルエラー（タイポを検出）

/**
 * 問題 3: 関数の引数チェック
 */

function addTS(a: number, b: number): number {
  return a + b;
}

console.log(addTS(5, 3)); // 8

// 以下はすべてコンパイルエラー
// addTS(5);        // 引数が足りない
// addTS(5, 3, 10); // 引数が多すぎる
// addTS('5', '3'); // 型が違う

/**
 * 問題 4: 配列の型安全性
 */

const numbersTS: number[] = [1, 2, 3];
numbersTS.push(4); // OK
// numbersTS.push('4'); // コンパイルエラー

console.log(numbersTS);

/**
 * 問題 5: null/undefined のチェック
 */

function getLengthTS(str: string | null): number {
  if (str === null) {
    return 0;
  }
  return str.length;
}

console.log(getLengthTS(null)); // 0
console.log(getLengthTS('Hello')); // 5

/**
 * 問題 6: インターフェースの活用
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

/**
 * 問題 7: クラスの型安全性
 */

class PersonTS {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet(): string {
    return `Hello, I'm ${this.name}`;
  }
}

const person = new PersonTS('太郎');
console.log(person.greet());

/**
 * 問題 8: 列挙型（Enum）
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

console.log(`アカウント状態: ${account.status}`);

/**
 * 問題 9: ジェネリクスの使用
 */

function firstTS<T>(arr: T[]): T | undefined {
  return arr[0];
}

const num = firstTS([1, 2, 3]); // number 型
const str = firstTS(['a', 'b']); // string 型

console.log(num); // 1
console.log(str); // a

/**
 * 問題 10: 型ガードの活用
 */

function processValue(value: string | number): void {
  if (typeof value === 'string') {
    console.log(`String: ${value.toUpperCase()}`);
  } else {
    console.log(`Number: ${value.toFixed(2)}`);
  }
}

processValue('hello'); // String: HELLO
processValue(123.456); // Number: 123.46

/**
 * TypeScript の利点まとめ:
 *
 * ✅ コンパイル時のエラー検出
 * ✅ 強力な IDE サポート（補完、リファクタリング）
 * ✅ 型安全性によるバグの削減
 * ✅ コードの可読性向上
 * ✅ 大規模プロジェクトでの保守性
 * ✅ チーム開発での共通理解
 */
