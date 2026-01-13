/**
 * 練習問題 2: オプショナル引数とデフォルト引数
 *
 * このファイルでは、オプショナル引数（?）とデフォルト引数の使い方を練習します。
 */

// ==========================================
// 問題 1: オプショナル引数の基本
// ==========================================
// 名前（必須）と敬称（オプショナル）を受け取り、挨拶文を返す greet 関数を定義してください
// 敬称が指定されていない場合は、名前のみを使用します
// 例: greet('Alice') → "Hello, Alice!"
//     greet('Bob', 'Mr.') → "Hello, Mr. Bob!"
// TODO: ここに greet 関数を実装
function greet(name: string, title?: string): string {
  if (title) {
    return `Hello, ${title} ${name}!`;
  }
  return `Hello, ${name}!`;
}

// ==========================================
// 問題 2: デフォルト引数の基本
// ==========================================
// 商品価格と税率（デフォルト: 0.1 = 10%）を受け取り、税込価格を返す calculatePrice 関数を定義してください
// TODO: ここに calculatePrice 関数を実装
function calculatePrice(price: number, taxRate: number = 0.1): number {
  return price * (1 + taxRate);
}
// ==========================================
// 問題 3: 複数のオプショナル引数
// ==========================================
// タイトル（必須）、著者（オプショナル）、出版年（オプショナル）を受け取り、
// 本の情報を文字列で返す formatBookInfo 関数を定義してください
// 例: formatBookInfo('TypeScript入門') → "TypeScript入門"
//     formatBookInfo('TypeScript入門', '田中太郎') → "TypeScript入門 by 田中太郎"
//     formatBookInfo('TypeScript入門', '田中太郎', 2024) → "TypeScript入門 by 田中太郎 (2024)"
// TODO: ここに formatBookInfo 関数を実装
function formatBookInfo(title: string, author?: string, year?: number): string {
  let result = title;
  if (author) {
    result += ` by ${author}`;
  }
  if (year) {
    result += ` (${year})`;
  }
  return result;
}
// ==========================================
// 問題 4: オプショナル引数とデフォルト引数の組み合わせ
// ==========================================
// メッセージ（必須）、ログレベル（オプショナル、デフォルト: 'INFO'）、
// タイムスタンプを含めるか（オプショナル、デフォルト: false）を受け取り、
// フォーマットされたログメッセージを返す formatLog 関数を定義してください
// TODO: ここに formatLog 関数を実装
function formatLog(
  message: string,
  level: string = 'INFO',
  includeTimestamp: boolean = false
): string {
  let result = `${level}: ${message}`;
  if (includeTimestamp) {
    result += ` [${new Date().toISOString()}]`;
  }
  return result;
}

// ==========================================
// 問題 5: オブジェクトのプロパティをオプショナルに
// ==========================================
// ユーザー情報を表す型を定義してください
// - name: 必須
// - age: オプショナル
// - email: オプショナル
// そして、この型を引数に取る createUserProfile 関数を実装してください
// TODO: UserInfo 型と createUserProfile 関数を実装
type UserInfo = {
  name: string;
  age?: number;
  email?: string;
};
function createUserProfile(user: UserInfo): string {
  let result = `Hello, ${user.name}!`;
  if (user.age) {
    result += ` You are ${user.age} years old.`;
  }
  if (user.email) {
    result += ` Your email is ${user.email}.`;
  }
  return result;
}

// ==========================================
// 問題 6: 配列の検索関数（オプショナル引数）
// ==========================================
// 配列と検索開始位置（オプショナル、デフォルト: 0）を受け取り、
// 指定した値を探してそのインデックスを返す findInArray 関数を定義してください
// 見つからない場合は -1 を返します
// TODO: ここに findInArray 関数を実装
function findInArray<T>(arr: T[], value: T, startIndex: number = 0): number {
  for (let i = startIndex; i < arr.length; i++) {
    if (arr[i] === value) {
      return i;
    }
  }
  return -1;
}

// ==========================================
// 問題 7: 文字列の繰り返し（デフォルト引数）
// ==========================================
// 文字列と繰り返し回数（デフォルト: 1）を受け取り、
// 文字列を指定回数繰り返した文字列を返す repeat 関数を定義してください
// 例: repeat('ab') → "ab"
//     repeat('ab', 3) → "ababab"
// TODO: ここに repeat 関数を実装
function repeat(str: string, count: number = 1): string {
  return str.repeat(count);
}
// ==========================================
// 問題 8: 範囲内のランダムな整数（オプショナル引数）
// ==========================================
// 最小値（デフォルト: 0）と最大値（必須）を受け取り、
// その範囲内のランダムな整数を返す randomInt 関数を定義してください
// TODO: ここに randomInt 関数を実装
function randomInt(max: number, min: number = 0): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// ==========================================
// 問題 9: 配列のスライス（オプショナル引数）
// ==========================================
// 配列、開始位置（オプショナル、デフォルト: 0）、終了位置（オプショナル）を受け取り、
// その範囲の要素を返す slice 関数を定義してください
// TODO: ここに slice 関数を実装
function slice<T>(arr: T[], start: number = 0, end?: number): T[] {
  return arr.slice(start, end);
}

// ==========================================
// 問題 10: 複雑なオプションオブジェクト
// ==========================================
// ソートオプションを表す型を定義してください
// - ascending: オプショナル（デフォルト: true）
// - caseSensitive: オプショナル（デフォルト: false）
// そして、文字列の配列とオプションを受け取り、ソートされた配列を返す
// sortStrings 関数を実装してください
// TODO: SortOptions 型と sortStrings 関数を実装
type SortOptions = {
  ascending?: boolean;
  caseSensitive?: boolean;
};
function sortStrings(arr: string[], options: SortOptions = {}): string[] {
  const { ascending = true, caseSensitive = false } = options;

  const sorted = [...arr].sort((a, b) => {
    let strA = a;
    let strB = b;

    if (!caseSensitive) {
      strA = a.toLowerCase();
      strB = b.toLowerCase();
    }

    if (strA < strB) return ascending ? -1 : 1;
    if (strA > strB) return ascending ? 1 : -1;
    return 0;
  });

  return sorted;
}
// ==========================================
// 問題 11: undefined と null の扱い
// ==========================================
// 値（string | null | undefined）を受け取り、
// null または undefined の場合は 'N/A' を返し、それ以外はそのまま返す
// formatValue 関数を定義してください
// TODO: ここに formatValue 関数を実装
function formatValue(value: string | null | undefined): string {
  if (value === null || value === undefined) {
    return 'N/A';
  }
  return value;
}
// ==========================================
// 問題 12: オプショナルチェーン
// ==========================================
// ユーザーオブジェクト（address プロパティはオプショナル）を受け取り、
// 都市名を返す getCity 関数を定義してください
// address が存在しない場合は 'Unknown' を返します
// TODO: 必要な型と getCity 関数を実装
type Address = {
  city: string;
};
type UserWithAddress = {
  name: string;
  address?: Address;
};
function getCity(user: UserWithAddress): string {
  return user.address?.city ?? 'Unknown';
}
// ==========================================
// テストコード（実装後にコメントを外して実行）
// ==========================================

console.log(greet('Alice'));
console.log(greet('Bob', 'Mr.'));
console.log(calculatePrice(1000));
console.log(calculatePrice(1000, 0.08));
console.log(formatBookInfo('TypeScript入門'));
console.log(formatBookInfo('TypeScript入門', '田中太郎'));
console.log(formatBookInfo('TypeScript入門', '田中太郎', 2024));
console.log(formatLog('Server started'));
console.log(createUserProfile({ name: 'Alice' }));
console.log(createUserProfile({ name: 'Bob', age: 30, email: 'bob@example.com' }));
console.log(findInArray([1, 2, 3, 4, 5], 3));
console.log(findInArray([1, 2, 3, 4, 5], 6));
console.log(repeat('ab'));
console.log(repeat('ab', 3));
console.log(randomInt(10));
console.log(slice([1, 2, 3, 4, 5]));
console.log(slice([1, 2, 3, 4, 5], 1, 3));
console.log(sortStrings(['banana', 'Apple', 'cherry']));
console.log(formatValue('hello'));
console.log(formatValue(null));
console.log(getCity({ name: 'Alice', address: { city: 'Tokyo' } }));
console.log(getCity({ name: 'Bob' }));
