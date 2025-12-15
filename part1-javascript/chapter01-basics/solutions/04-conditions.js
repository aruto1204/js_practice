// 解答例 4: 条件分岐

/*
問題1: if文を使って年齢による分類を行ってください
*/

const age = 25;

if (age >= 65) {
  console.log('シニア');
} else if (age >= 20) {
  console.log('成人');
} else if (age >= 13) {
  console.log('10代');
} else {
  console.log('子供');
}



/*
問題2: 三項演算子を使ってください
*/

const temperature = 28;
const weather = temperature >= 25 ? '暑い' : '涼しい';
console.log(weather); // '暑い'



/*
問題3: switch文を使って曜日を判定してください
*/

const dayNumber = 3;

switch (dayNumber) {
  case 0:
    console.log('日曜日');
    break;
  case 1:
    console.log('月曜日');
    break;
  case 2:
    console.log('火曜日');
    break;
  case 3:
    console.log('水曜日');
    break;
  case 4:
    console.log('木曜日');
    break;
  case 5:
    console.log('金曜日');
    break;
  case 6:
    console.log('土曜日');
    break;
  default:
    console.log('無効な曜日');
}



/*
問題4: 複数条件の組み合わせ
*/

const score = 85;
const attendance = 90;

if (score >= 80 && attendance >= 80) {
  console.log('合格');
} else {
  console.log('不合格');
}

// 三項演算子でも書ける
const passOrFail = score >= 80 && attendance >= 80 ? '合格' : '不合格';
console.log(passOrFail);



/*
問題5: if文のネストを減らす（早期リターン）
*/

function checkEligibilityGood(age, hasLicense, hasInsurance) {
  if (age < 18) return '年齢不足';
  if (!hasLicense) return '免許が必要';
  if (!hasInsurance) return '保険が必要';
  return '運転可能';
}

console.log(checkEligibilityGood(20, true, true)); // '運転可能'
console.log(checkEligibilityGood(20, true, false)); // '保険が必要'
console.log(checkEligibilityGood(20, false, true)); // '免許が必要'
console.log(checkEligibilityGood(17, true, true)); // '年齢不足'



/*
問題6: truthy と falsy
*/

const values = [0, '', null, undefined, false, 'hello', 42, [], {}];

values.forEach((value) => {
  if (value) {
    console.log(`${JSON.stringify(value)} は truthy`);
  } else {
    console.log(`${JSON.stringify(value)} は falsy`);
  }
});

/*
出力:
0 は falsy
"" は falsy
null は falsy
undefined は falsy
false は falsy
"hello" は truthy
42 は truthy
[] は truthy（空配列でも truthy）
{} は truthy（空オブジェクトでも truthy）
*/



/*
問題7: 実践問題 - グレード判定
*/

const examScore = 78;
let grade;

if (examScore >= 90) {
  grade = 'A';
} else if (examScore >= 80) {
  grade = 'B';
} else if (examScore >= 70) {
  grade = 'C';
} else if (examScore >= 60) {
  grade = 'D';
} else {
  grade = 'F';
}

console.log(`スコア ${examScore} はグレード ${grade} です`);

// 三項演算子でも書ける（ただし可読性が下がる）
const grade2 =
  examScore >= 90 ? 'A' : examScore >= 80 ? 'B' : examScore >= 70 ? 'C' : examScore >= 60 ? 'D' : 'F';
console.log(`グレード: ${grade2}`);



/*
問題8: 実践問題 - うるう年の判定
*/

const year = 2024;

let isLeapYear;

if (year % 400 === 0) {
  isLeapYear = true; // 400で割り切れる → うるう年
} else if (year % 100 === 0) {
  isLeapYear = false; // 100で割り切れる（400では割り切れない）→ 平年
} else if (year % 4 === 0) {
  isLeapYear = true; // 4で割り切れる → うるう年
} else {
  isLeapYear = false; // それ以外 → 平年
}

console.log(`${year}年は${isLeapYear ? 'うるう年' : '平年'}です`);

// 別解: より簡潔に
const isLeapYear2 = (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
console.log(`${year}年は${isLeapYear2 ? 'うるう年' : '平年'}です`);

// テストケース
console.log('2000年:', (2000 % 400 === 0) || (2000 % 4 === 0 && 2000 % 100 !== 0)); // true
console.log('1900年:', (1900 % 400 === 0) || (1900 % 4 === 0 && 1900 % 100 !== 0)); // false
console.log('2024年:', (2024 % 400 === 0) || (2024 % 4 === 0 && 2024 % 100 !== 0)); // true
console.log('2023年:', (2023 % 400 === 0) || (2023 % 4 === 0 && 2023 % 100 !== 0)); // false
