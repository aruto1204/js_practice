// 解答例 3: 演算子

/*
問題1: 算術演算子を使って計算してください
*/

const a = 15;
const b = 4;

const sum = a + b; // 19
const difference = a - b; // 11
const product = a * b; // 60
const quotient = a / b; // 3.75
const remainder = a % b; // 3
const power = a ** 2; // 225

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

console.log('num1 == num2:', num1 == num2); // true（型変換が行われる）
console.log('num1 === num2:', num1 === num2); // false（型も比較）

// 常に === を使うべき理由
console.log('0 == false:', 0 == false); // true（予期しない結果）
console.log('0 === false:', 0 === false); // false（期待通り）



/*
問題3: 論理演算子を使って条件を組み合わせてください
*/

const age = 22;
const hasLicense = true;
const hasInsurance = false;

const canDrive = age >= 20 && hasLicense; // true
const hasEitherDocument = hasLicense || hasInsurance; // true
const noLicense = !hasLicense; // false

console.log('運転できる:', canDrive);
console.log('書類を持っている:', hasEitherDocument);
console.log('免許なし:', noLicense);



/*
問題4: 複合代入演算子を使ってください
*/

let score = 100;

score += 10; // 110
console.log('加算後:', score);

score -= 5; // 105
console.log('減算後:', score);

score *= 2; // 210
console.log('乗算後:', score);

score /= 3; // 70
console.log('除算後:', score);

console.log('最終スコア:', score);



/*
問題5: インクリメント・デクリメント演算子
*/

let counter = 0;

counter++;
console.log('インクリメント後:', counter); // 1

counter--;
console.log('デクリメント後:', counter); // 0

// 前置と後置の違い
let x = 5;
console.log('x++:', x++); // 5（表示してから増加）
console.log('x:', x); // 6

let y = 5;
console.log('++y:', ++y); // 6（増加してから表示）
console.log('y:', y); // 6



/*
問題6: 三項演算子を使ってください
*/

const testScore = 75;
const result = testScore >= 60 ? '合格' : '不合格';
console.log('結果:', result); // '合格'

const personAge = 18;
const ageMessage = personAge >= 20 ? '成人' : '未成年';
console.log(ageMessage); // '未成年'

// より複雑な例
const grade = testScore >= 90 ? 'A' : testScore >= 80 ? 'B' : testScore >= 70 ? 'C' : 'D';
console.log('グレード:', grade); // 'C'
