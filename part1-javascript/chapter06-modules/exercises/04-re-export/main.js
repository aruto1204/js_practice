// 練習問題 4: main.js
// utils/index.js からすべての関数をインポートして使用してください

// ここにコードを書く
import { capitalize, reverse, shuffle, unique, isEven, isOdd } from './utils/index.js';

// 文字列操作のテスト
console.log('--- 文字列操作 ---');
console.log(capitalize('hello')); // Hello
console.log(reverse('hello')); // olleh

// 配列操作のテスト
console.log('\n--- 配列操作 ---');
const numbers = [1, 2, 3, 4, 5];
console.log('元の配列:', numbers);
console.log('シャッフル:', shuffle(numbers));

const duplicates = [1, 2, 2, 3, 3, 3, 4];
console.log('重複あり:', duplicates);
console.log('重複除去:', unique(duplicates));

// 数値判定のテスト
console.log('\n--- 数値判定 ---');
console.log('4は偶数?', isEven(4)); // true
console.log('4は奇数?', isOdd(4)); // false
console.log('7は偶数?', isEven(7)); // false
console.log('7は奇数?', isOdd(7)); // true
