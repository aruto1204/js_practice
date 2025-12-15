// 解答例 3: Product.js

export default class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getInfo() {
    return `商品: ${this.name}, 価格: ¥${this.price.toLocaleString()}`;
  }
}

export const TAX_RATE = 0.1;

export function calculateTax(price) {
  return Math.floor(price * TAX_RATE);
}

export function calculateTotal(price) {
  return price + calculateTax(price);
}
