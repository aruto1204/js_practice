/**
 * 練習問題 2: インスタンスメソッドとプロパティ
 *
 * この練習問題では、インスタンスメソッドとプロパティの実装を学びます。
 */

// 問題 1: ShoppingCart クラスを作成
// 要件:
// - items プロパティ（配列）を持つ
// - addItem(name, price, quantity) メソッドで商品を追加
// - removeItem(name) メソッドで商品を削除
// - getTotalPrice() メソッドで合計金額を計算して返す
// - getItemCount() メソッドで商品の総数を返す
// - clear() メソッドでカートを空にする
//
// 使用例:
// const cart = new ShoppingCart();
// cart.addItem('りんご', 100, 3);
// cart.addItem('バナナ', 150, 2);
// console.log(cart.getTotalPrice()); // 600
// console.log(cart.getItemCount()); // 5

class ShoppingCart {
  // ここにコードを書いてください
}

// テスト
console.log('=== 問題 1 のテスト ===');
const cart = new ShoppingCart();
cart.addItem('りんご', 100, 3);
cart.addItem('バナナ', 150, 2);
cart.addItem('オレンジ', 120, 1);
console.log('合計金額:', cart.getTotalPrice()); // 720
console.log('商品数:', cart.getItemCount()); // 6
cart.removeItem('バナナ');
console.log('バナナ削除後の合計金額:', cart.getTotalPrice()); // 420
console.log('バナナ削除後の商品数:', cart.getItemCount()); // 4
cart.clear();
console.log('クリア後の合計金額:', cart.getTotalPrice()); // 0
console.log('');

// 問題 2: Timer クラスを作成
// 要件:
// - seconds プロパティを持つ（初期値は 0）
// - start() メソッドでタイマーを開始（1秒ごとに seconds を増やす）
// - stop() メソッドでタイマーを停止
// - reset() メソッドでタイマーをリセット（seconds を 0 に戻す）
// - getElapsedTime() メソッドで経過時間を「MM:SS」形式で返す
//
// ヒント: setInterval と clearInterval を使う
// 注意: この問題は実際に時間が経過するので、テストは手動で行ってください

class Timer {
  // ここにコードを書いてください
}

// テスト（手動で確認してください）
console.log('=== 問題 2 のテスト ===');
console.log('※ Timer は実際に時間が経過するため、コメントアウトしています');
// const timer = new Timer();
// console.log('開始:', timer.getElapsedTime()); // '00:00'
// timer.start();
// setTimeout(() => {
//   console.log('3秒後:', timer.getElapsedTime()); // '00:03'
//   timer.stop();
//   timer.reset();
//   console.log('リセット後:', timer.getElapsedTime()); // '00:00'
// }, 3000);
console.log('');

// 問題 3: Playlist クラスを作成
// 要件:
// - songs プロパティ（配列）を持つ
// - currentIndex プロパティで現在再生中の曲のインデックスを保持
// - addSong(title, artist) メソッドで曲を追加
// - play() メソッドで現在の曲の情報を返す
// - next() メソッドで次の曲に進む（最後の曲の場合は最初に戻る）
// - previous() メソッドで前の曲に戻る（最初の曲の場合は最後に戻る）
// - shuffle() メソッドで曲順をシャッフルする
//
// 使用例:
// const playlist = new Playlist();
// playlist.addSong('Song A', 'Artist 1');
// playlist.addSong('Song B', 'Artist 2');
// console.log(playlist.play()); // '♪ Song A - Artist 1'
// playlist.next();
// console.log(playlist.play()); // '♪ Song B - Artist 2'

class Playlist {
  // ここにコードを書いてください
}

// テスト
console.log('=== 問題 3 のテスト ===');
const playlist = new Playlist();
playlist.addSong('夜に駆ける', 'YOASOBI');
playlist.addSong('Pretender', 'Official髭男dism');
playlist.addSong('マリーゴールド', 'あいみょん');
console.log('現在の曲:', playlist.play());
playlist.next();
console.log('次の曲:', playlist.play());
playlist.next();
console.log('次の曲:', playlist.play());
playlist.next();
console.log('次の曲（最初に戻る）:', playlist.play());
playlist.previous();
console.log('前の曲:', playlist.play());
console.log('');

// 問題 4: Calculator クラスを作成（メソッドチェーン対応）
// 要件:
// - value プロパティを持つ
// - add(num), subtract(num), multiply(num), divide(num) メソッドを実装
// - すべてのメソッドは this を返す（メソッドチェーンを可能にする）
// - getResult() メソッドで現在の値を返す
// - clear() メソッドで値を 0 にリセット
//
// 使用例:
// const calc = new Calculator();
// const result = calc.add(10).multiply(2).subtract(5).divide(3).getResult();
// console.log(result); // 5

class Calculator {
  // ここにコードを書いてください
}

// テスト
console.log('=== 問題 4 のテスト ===');
const calc = new Calculator();
const result1 = calc.add(10).multiply(2).subtract(5).divide(3).getResult();
console.log('(10 + 10) * 2 - 5 / 3 =', result1);
calc.clear();
const result2 = calc.add(5).add(3).multiply(4).getResult();
console.log('(5 + 3) * 4 =', result2);
console.log('');

// 問題 5: BankAccount クラスを作成
// 要件:
// - owner, balance, transactions プロパティを持つ
// - deposit(amount) メソッドで入金（負の数はエラー）
// - withdraw(amount) メソッドで出金（残高不足または負の数はエラー）
// - getBalance() メソッドで残高を返す
// - getTransactionHistory() メソッドで取引履歴を返す
// - 各取引は { type, amount, date, balance } の形式で記録
//
// 使用例:
// const account = new BankAccount('太郎', 10000);
// account.deposit(5000);
// account.withdraw(3000);
// console.log(account.getBalance()); // 12000

class BankAccount {
  // ここにコードを書いてください
}

// テスト
console.log('=== 問題 5 のテスト ===');
const account = new BankAccount('太郎', 10000);
console.log('初期残高:', account.getBalance());
account.deposit(5000);
console.log('入金後の残高:', account.getBalance());
account.withdraw(3000);
console.log('出金後の残高:', account.getBalance());
account.deposit(2000);
console.log('最終残高:', account.getBalance());
console.log('取引履歴:');
account.getTransactionHistory().forEach((tx, index) => {
  console.log(`  ${index + 1}. ${tx.type}: ¥${tx.amount} (残高: ¥${tx.balance})`);
});

// エラーケースのテスト
console.log('\nエラーケースのテスト:');
try {
  account.withdraw(20000); // 残高不足
} catch (error) {
  console.log('エラー:', error.message);
}

try {
  account.deposit(-1000); // 負の金額
} catch (error) {
  console.log('エラー:', error.message);
}
console.log('');
