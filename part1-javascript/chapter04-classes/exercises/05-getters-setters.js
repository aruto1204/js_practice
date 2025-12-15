/**
 * 練習問題 5: getter / setter
 *
 * この練習問題では、getter と setter を使ったカプセル化を学びます。
 */

// 問題 1: Person クラスを作成
// 要件:
// - firstName, lastName をプライベート風プロパティとして持つ
// - fullName の getter で「firstName lastName」を返す
// - fullName の setter で「firstName lastName」形式の文字列を分割して設定
// - firstName, lastName の getter/setter も実装
//
// 使用例:
// const person = new Person('太郎', '山田');
// console.log(person.fullName); // '太郎 山田'
// person.fullName = '花子 鈴木';
// console.log(person.firstName); // '花子'
// console.log(person.lastName); // '鈴木'

class Person {
  // ここにコードを書いてください
}

// テスト
console.log('=== 問題 1 のテスト ===');
const person = new Person('太郎', '山田');
console.log('フルネーム:', person.fullName);
console.log('名:', person.firstName);
console.log('姓:', person.lastName);
person.fullName = '花子 鈴木';
console.log('変更後のフルネーム:', person.fullName);
console.log('変更後の名:', person.firstName);
console.log('変更後の姓:', person.lastName);
console.log('');

// 問題 2: Rectangle クラスを作成
// 要件:
// - width, height をプライベート風プロパティとして持つ
// - width, height の getter/setter を実装（負の値はエラー）
// - area の getter で面積を計算
// - perimeter の getter で周囲の長さを計算
// - diagonal の getter で対角線の長さを計算
//
// 使用例:
// const rect = new Rectangle(10, 5);
// console.log(rect.area); // 50
// console.log(rect.perimeter); // 30
// rect.width = 20;
// console.log(rect.area); // 100

class Rectangle {
  // ここにコードを書いてください
}

// テスト
console.log('=== 問題 2 のテスト ===');
const rect = new Rectangle(10, 5);
console.log('幅:', rect.width);
console.log('高さ:', rect.height);
console.log('面積:', rect.area);
console.log('周囲の長さ:', rect.perimeter);
console.log('対角線:', rect.diagonal.toFixed(2));
rect.width = 20;
rect.height = 10;
console.log('変更後の面積:', rect.area);

try {
  rect.width = -5; // エラー
} catch (error) {
  console.log('エラー:', error.message);
}
console.log('');

// 問題 3: Temperature クラスを作成
// 要件:
// - celsius をプライベート風プロパティとして持つ
// - celsius の getter/setter を実装
// - fahrenheit の getter/setter を実装（内部では celsius に変換して保存）
// - kelvin の getter/setter を実装（内部では celsius に変換して保存）
//
// 変換式:
// - 華氏 -> 摂氏: (F - 32) * 5/9
// - 摂氏 -> 華氏: C * 9/5 + 32
// - ケルビン -> 摂氏: K - 273.15
// - 摂氏 -> ケルビン: C + 273.15
//
// 使用例:
// const temp = new Temperature();
// temp.celsius = 25;
// console.log(temp.fahrenheit); // 77
// temp.fahrenheit = 86;
// console.log(temp.celsius); // 30

class Temperature {
  // ここにコードを書いてください
}

// テスト
console.log('=== 問題 3 のテスト ===');
const temp = new Temperature();
temp.celsius = 25;
console.log('25°C は:');
console.log('  華氏:', temp.fahrenheit.toFixed(2), '°F');
console.log('  ケルビン:', temp.kelvin.toFixed(2), 'K');

temp.fahrenheit = 86;
console.log('86°F は:');
console.log('  摂氏:', temp.celsius.toFixed(2), '°C');
console.log('  ケルビン:', temp.kelvin.toFixed(2), 'K');

temp.kelvin = 300;
console.log('300K は:');
console.log('  摂氏:', temp.celsius.toFixed(2), '°C');
console.log('  華氏:', temp.fahrenheit.toFixed(2), '°F');
console.log('');

// 問題 4: User クラスを作成
// 要件:
// - email をプライベート風プロパティとして持つ
// - email の getter/setter を実装（setter で検証：@を含む必要がある）
// - username の getter で email のローカル部分（@の前）を返す（読み取り専用）
// - domain の getter で email のドメイン部分（@の後）を返す（読み取り専用）
// - password をプライベート風プロパティとして持つ（getter は提供しない）
// - password の setter を実装（8文字以上の検証）
// - isPasswordValid(password) メソッドでパスワードを検証
//
// 使用例:
// const user = new User('taro@example.com', 'password123');
// console.log(user.username); // 'taro'
// console.log(user.domain); // 'example.com'

class User {
  // ここにコードを書いてください
}

// テスト
console.log('=== 問題 4 のテスト ===');
const user = new User('taro@example.com', 'password123');
console.log('メール:', user.email);
console.log('ユーザー名:', user.username);
console.log('ドメイン:', user.domain);
console.log('パスワード検証（正しい）:', user.isPasswordValid('password123'));
console.log('パスワード検証（間違い）:', user.isPasswordValid('wrongpassword'));

try {
  user.email = 'invalidemail'; // @ がない
} catch (error) {
  console.log('エラー:', error.message);
}

try {
  user.password = 'short'; // 8文字未満
} catch (error) {
  console.log('エラー:', error.message);
}
console.log('');

// 問題 5: Circle クラスを作成
// 要件:
// - radius をプライベート風プロパティとして持つ
// - radius の getter/setter を実装（正の数のみ）
// - diameter の getter/setter を実装（内部では radius に変換）
// - circumference の getter/setter を実装（内部では radius に変換）
// - area の getter を実装（読み取り専用）
// - すべての計算結果は小数点以下2桁で丸める
//
// 計算式:
// - 直径 = 半径 * 2
// - 円周 = 2 * π * 半径
// - 面積 = π * 半径²
//
// 使用例:
// const circle = new Circle(5);
// console.log(circle.area); // 78.54
// circle.diameter = 20;
// console.log(circle.radius); // 10
// console.log(circle.area); // 314.16

class Circle {
  // ここにコードを書いてください
}

// テスト
console.log('=== 問題 5 のテスト ===');
const circle = new Circle(5);
console.log('半径:', circle.radius);
console.log('直径:', circle.diameter);
console.log('円周:', circle.circumference);
console.log('面積:', circle.area);

circle.diameter = 20;
console.log('\n直径を20に設定後:');
console.log('半径:', circle.radius);
console.log('円周:', circle.circumference);
console.log('面積:', circle.area);

circle.circumference = 62.83;
console.log('\n円周を62.83に設定後:');
console.log('半径:', circle.radius);
console.log('直径:', circle.diameter);
console.log('面積:', circle.area);

try {
  circle.radius = -5; // 負の値
} catch (error) {
  console.log('エラー:', error.message);
}

try {
  circle.area = 100; // area は読み取り専用（setterがないので無視される）
  console.log('area 設定後（無視される）:', circle.area);
} catch (error) {
  console.log('エラー:', error.message);
}
console.log('');
