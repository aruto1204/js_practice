// 練習問題 4: 条件分岐
// 難易度: ⭐⭐

/*
問題1: if文を使って年齢による分類を行ってください
*/

const age = 25;

// 年齢によって以下のように分類してください
// 0-12: 子供
// 13-19: 10代
// 20-64: 成人
// 65以上: シニア

// ここにコードを書いてください

if (age >= 0 && age <= 12) {
  console.log('子供');
} else if (age >= 13 && age <= 19) {
  console.log('10代');
} else if (age >= 20 && age <= 64) {
  console.log('成人');
} else {
  console.log('シニア');
}

/*
問題2: 三項演算子を使ってください
*/

const temperature = 28;

// temperature が 25 以上なら '暑い'、未満なら '涼しい'
const weather = temperature >= 25 ? '暑い' : '涼しい';

console.log(weather);

/*
問題3: switch文を使って曜日を判定してください
*/

const dayNumber = 3; // 0: 日曜日, 1: 月曜日, ..., 6: 土曜日

// switch文を使って曜日名を表示してください
// ここにコードを書いてください

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
const attendance = 90; // 出席率（%）

// 以下の条件で合否を判定してください
// - スコアが80以上、かつ出席率が80%以上 → '合格'
// - それ以外 → '不合格'

// ここにコードを書いてください

const passOrFail = score >= 80 && attendance >= 80 ? '合格' : '不合格';
console.log(passOrFail);

/*
問題5: if文のネストを減らす（早期リターン）
*/

// ❌ 悪い例（ネストが深い）
// function checkEligibilityBad(age, hasLicense, hasInsurance) {
//   if (age >= 18) {
//     if (hasLicense) {
//       if (hasInsurance) {
//         return '運転可能';
//       } else {
//         return '保険が必要';
//       }
//     } else {
//       return '免許が必要';
//     }
//   } else {
//     return '年齢不足';
//   }
// }

// ✅ 良い例（早期リターンでネストを減らす）
function checkEligibilityGood(age, hasLicense, hasInsurance) {
  // ここにコードを書いてください
  // 条件を満たさない場合は早めに return する
  if (age < 18) return '年齢不足';
  if (!hasLicense) return '免許が必要';
  if (!hasInsurance) return '保険が必要';
  return '運転可能';
}

console.log(checkEligibilityGood(20, true, true)); // '運転可能'
console.log(checkEligibilityGood(20, true, false)); // '保険が必要'
console.log(checkEligibilityGood(17, true, true)); // '年齢不足'

/*
問題6: truthy と falsy
*/

// JavaScriptでは以下の値は falsy（偽）として扱われる
// false, 0, '', null, undefined, NaN

// 以下の値を if 文で評価してください
const values = [0, '', null, undefined, false, 'hello', 42, [28, 'あ'], {}];

values.forEach((value) => {
  if (value) {
    console.log(`${JSON.stringify(value)} は truthy`);
  } else {
    console.log(`${JSON.stringify(value)} は falsy`);
  }
});

/*
問題7: 実践問題 - グレード判定
*/

const examScore = 78;

// スコアに応じてグレードを判定してください
// 90-100: A
// 80-89: B
// 70-79: C
// 60-69: D
// 0-59: F

let grade;
// ここにコードを書いてください

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

/*
問題8: 実践問題 - うるう年の判定
*/

const year = 2024;

// うるう年の条件:
// - 4で割り切れる年はうるう年
// - ただし、100で割り切れる年はうるう年ではない
// - さらに、400で割り切れる年はうるう年

let isLeapYear;
// ここにコードを書いてください

if (year % 400 === 0) {
  isLeapYear = true;
} else if (year % 100 === 0) {
  isLeapYear = false;
} else if (year % 4 === 0) {
  isLeapYear = true;
} else {
  isLeapYear = false;
}
console.log(`${year}年は${isLeapYear ? 'うるう年' : '平年'}です`);
