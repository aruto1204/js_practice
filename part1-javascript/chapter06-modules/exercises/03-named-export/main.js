// 練習問題 3: main.js
// Product クラスと関数・定数をインポートして使用してください

// ここにコードを書く
import Product, { TAX_RATE, calculateTax, calculateTotal } from './Product.js';

const laptop = new Product('ノートPC', 100000);

console.log(laptop.getInfo());
console.log(`税額: ${calculateTax(laptop.price)}`);
console.log(`税込合計: ${calculateTotal(laptop.price)}`);
