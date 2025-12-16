/**
 * 解答例 2: オプショナル引数とデフォルト引数
 */

// ==========================================
// 問題 1: オプショナル引数の基本
// ==========================================
function greet(name: string, title?: string): string {
  if (title) {
    return `Hello, ${title} ${name}!`;
  }
  return `Hello, ${name}!`;
}

// ==========================================
// 問題 2: デフォルト引数の基本
// ==========================================
function calculatePrice(price: number, taxRate: number = 0.1): number {
  return price * (1 + taxRate);
}

// ==========================================
// 問題 3: 複数のオプショナル引数
// ==========================================
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
function formatLog(
  message: string,
  level: string = 'INFO',
  includeTimestamp: boolean = false
): string {
  let log = `[${level}] ${message}`;
  if (includeTimestamp) {
    const timestamp = new Date().toISOString();
    log = `[${timestamp}] ${log}`;
  }
  return log;
}

// ==========================================
// 問題 5: オブジェクトのプロパティをオプショナルに
// ==========================================
type UserInfo = {
  name: string;
  age?: number;
  email?: string;
};

function createUserProfile(user: UserInfo): string {
  let profile = `Name: ${user.name}`;
  if (user.age !== undefined) {
    profile += `, Age: ${user.age}`;
  }
  if (user.email) {
    profile += `, Email: ${user.email}`;
  }
  return profile;
}

// ==========================================
// 問題 6: 配列の検索関数（オプショナル引数）
// ==========================================
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
function repeat(str: string, count: number = 1): string {
  return str.repeat(count);
}

// ==========================================
// 問題 8: 範囲内のランダムな整数（オプショナル引数）
// ==========================================
function randomInt(max: number, min: number = 0): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ==========================================
// 問題 9: 配列のスライス（オプショナル引数）
// ==========================================
function slice<T>(arr: T[], start: number = 0, end?: number): T[] {
  return arr.slice(start, end);
}

// ==========================================
// 問題 10: 複雑なオプションオブジェクト
// ==========================================
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
function formatValue(value: string | null | undefined): string {
  if (value === null || value === undefined) {
    return 'N/A';
  }
  return value;
}

// ==========================================
// 問題 12: オプショナルチェーン
// ==========================================
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
// テストコード
// ==========================================
console.log(greet('Alice'));                                 // "Hello, Alice!"
console.log(greet('Bob', 'Mr.'));                           // "Hello, Mr. Bob!"
console.log(calculatePrice(1000));                          // 1100
console.log(calculatePrice(1000, 0.08));                    // 1080
console.log(formatBookInfo('TypeScript入門'));              // "TypeScript入門"
console.log(formatBookInfo('TypeScript入門', '田中太郎'));  // "TypeScript入門 by 田中太郎"
console.log(formatBookInfo('TypeScript入門', '田中太郎', 2024)); // "TypeScript入門 by 田中太郎 (2024)"
console.log(formatLog('Server started'));                   // "[INFO] Server started"
console.log(createUserProfile({ name: 'Alice' }));          // "Name: Alice"
console.log(createUserProfile({ name: 'Bob', age: 30, email: 'bob@example.com' }));
console.log(findInArray([1, 2, 3, 4, 5], 3));              // 2
console.log(repeat('ab'));                                   // "ab"
console.log(repeat('ab', 3));                               // "ababab"
console.log(randomInt(10));                                 // 0-10のランダムな整数
console.log(slice([1, 2, 3, 4, 5]));                        // [1, 2, 3, 4, 5]
console.log(slice([1, 2, 3, 4, 5], 1, 3));                  // [2, 3]
console.log(sortStrings(['banana', 'Apple', 'cherry']));    // ['Apple', 'banana', 'cherry']
console.log(formatValue('hello'));                          // "hello"
console.log(formatValue(null));                             // "N/A"
console.log(getCity({ name: 'Alice', address: { city: 'Tokyo' } })); // "Tokyo"
console.log(getCity({ name: 'Bob' }));                      // "Unknown"
