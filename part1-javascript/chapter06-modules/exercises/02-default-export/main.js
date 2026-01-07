// 練習問題 2: main.js
// User クラスをインポートして使用してください

// ここにコードを書く
import User from './User.js';

const taro = new User('太郎', 'taro@example.com');
const hanako = new User('花子', 'hanako@example.com');

console.log(taro.getInfo());
console.log(hanako.getInfo());
