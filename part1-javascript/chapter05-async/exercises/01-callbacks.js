// 練習問題 1: コールバック関数

/**
 * 問題 1: タイマー処理
 * 指定した秒数後にメッセージを表示する関数を作成してください。
 *
 * 仕様:
 * - delayedMessage(message, seconds, callback) という関数を作成
 * - seconds 秒後に callback 関数を呼び出す
 * - callback には message を渡す
 *
 * 例:
 * delayedMessage('Hello', 2, (msg) => console.log(msg));
 * // 2秒後に 'Hello' が表示される
 */

function delayedMessage(message, seconds, callback) {
  // ここにコードを書く
}

// テスト
console.log('問題1: タイマー処理を開始');
delayedMessage('3秒経過しました', 3, (msg) => console.log(msg));

/**
 * 問題 2: ファイル読み込みシミュレーション
 * 複数のファイルを順番に読み込むシミュレーションをしてください。
 *
 * 仕様:
 * - readFile(filename, callback) という関数を実装
 * - 1秒後に「${filename}の内容」を返す
 * - ファイル1 → ファイル2 → ファイル3 の順で読み込む
 */

function readFile(filename, callback) {
  // ここにコードを書く
}

// テスト
console.log('\n問題2: ファイル読み込み開始');
// file1.txt → file2.txt → file3.txt の順で読み込む

/**
 * 問題 3: ユーザー認証フロー
 * ログイン → 権限確認 → データ取得 という流れをシミュレートしてください。
 *
 * 仕様:
 * - login(username, callback) - ユーザー認証（1秒）
 * - checkPermission(user, callback) - 権限確認（1秒）
 * - fetchData(user, callback) - データ取得（1秒）
 * - 各関数は成功時に次の処理用のデータを渡す
 */

function login(username, callback) {
  // ここにコードを書く
}

function checkPermission(user, callback) {
  // ここにコードを書く
}

function fetchData(user, callback) {
  // ここにコードを書く
}

// テスト
console.log('\n問題3: 認証フロー開始');
// login → checkPermission → fetchData の順で実行

/**
 * 問題 4: 並列コールバック処理
 * 複数の非同期処理を並列に実行し、すべて完了したら結果を表示してください。
 *
 * 仕様:
 * - task1, task2, task3 という3つの非同期関数があります
 * - これらを並列に実行し、すべて完了したら 'すべて完了' と表示
 * - ヒント: カウンターを使う
 */

function task1(callback) {
  setTimeout(() => callback('タスク1完了'), 1000);
}

function task2(callback) {
  setTimeout(() => callback('タスク2完了'), 1500);
}

function task3(callback) {
  setTimeout(() => callback('タスク3完了'), 800);
}

// テスト
console.log('\n問題4: 並列処理開始');
// ここにコードを書く

/**
 * 問題 5: エラーハンドリング付きコールバック
 * エラーが発生する可能性のある非同期処理を実装してください。
 *
 * 仕様:
 * - divide(a, b, callback) という関数を作成
 * - 1秒後に a ÷ b の結果を返す
 * - b が 0 の場合はエラーを返す
 * - callback(error, result) の形式（Node.js スタイル）
 */

function divide(a, b, callback) {
  // ここにコードを書く
}

// テスト
console.log('\n問題5: エラーハンドリング');
divide(10, 2, (error, result) => {
  if (error) {
    console.error('エラー:', error);
  } else {
    console.log('結果:', result);
  }
});

divide(10, 0, (error, result) => {
  if (error) {
    console.error('エラー:', error);
  } else {
    console.log('結果:', result);
  }
});
