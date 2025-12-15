// 解答例 3: main.js

import Product, { TAX_RATE, calculateTax, calculateTotal } from './Product.js';

const laptop = new Product('ノートPC', 100000);

console.log(laptop.getInfo());
console.log(`税額: ¥${calculateTax(laptop.price).toLocaleString()}`);
console.log(`税込合計: ¥${calculateTotal(laptop.price).toLocaleString()}`);
