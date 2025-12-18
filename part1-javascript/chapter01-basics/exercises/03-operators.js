// 練習問題 3: 演算子
// 難易度: ⭐⭐

/*
問題1: 算術演算子を使って計算してください
*/

const a = 15;
const b = 4;

// 以下の計算結果を変数に格納してください
const sum = a + b;
const difference = a - b;
const product = a * b;
const quotient = a / b;
const remainder = a % b;
const power = a ** 2;

console.log('和:', sum);
console.log('差:', difference);
console.log('積:', product);
console.log('商:', quotient);
console.log('余り:', remainder);
console.log('べき乗:', power);

/*
問題2: 比較演算子を使ってください
*/

const num1 = 10;
const num2 = '10';

// == と === の違いを確認
console.log('num1 == num2:', num1 == num2);
console.log('num1 === num2:', num1 === num2);

// どちらを使うべき？→ 常に === を使う

/*
問題3: 論理演算子を使って条件を組み合わせてください
*/

const age = 22;
const hasLicense = true;
const hasInsurance = false;

// 年齢が20歳以上でかつ免許を持っている
const canDrive = age >= 20 && hasLicense; /* ここにコードを書く */

// 免許を持っているか、または保険に加入している
const hasEitherDocument = hasLicense || hasInsurance; /* ここにコードを書く */

// 免許を持っていない
const noLicense = !hasLicense; /* ここにコードを書く */

console.log('運転できる:', canDrive);
console.log('書類を持っている:', hasEitherDocument);
console.log('免許なし:', noLicense);

/*
問題4: 複合代入演算子を使ってください
*/

let score = 100;

// score に 10 を足す
score += 10;
console.log('加算後:', score);

// score から 5 を引く
score -= 5;
console.log('減算後:', score);

// score を 2 倍にする
score *= 2;
console.log('乗算後:', score);

// score を 3 で割る
score /= 3;
console.log('除算後:', score);

console.log('最終スコア:', score);

/*
問題5: インクリメント・デクリメント演算子
*/

let counter = 0;

counter++; // 1増やす
console.log('インクリメント後:', counter);

counter--; // 1減らす
console.log('デクリメント後:', counter);

// 前置と後置の違い
let x = 5;
console.log('x++:', x++); // 5を表示してから6になる
console.log('x:', x); // 6

let y = 5;
console.log('++y:', ++y); // 6になってから表示
console.log('y:', y); // 6

/*
問題6: 三項演算子を使ってください
*/

const testScore = 75;

// testScore が 60 以上なら '合格'、未満なら '不合格'
const result = testScore >= 60 ? '合格' : '不合格';

console.log('結果:', result);

// 年齢によるメッセージを三項演算子で作成
const personAge = 18;
const ageMessage = personAge >= 20 ? '成人' : '未成年';
console.log('年齢メッセージ:', ageMessage);
