// 練習問題 3: async / await

/**
 * 問題 1: 基本的な async/await
 * Promise を返す関数を async/await で書き換えてください。
 *
 * 仕様:
 * - delay(ms) という関数があります（Promise を返す）
 * - これを使って、1秒待ってからメッセージを表示する
 *   async 関数 waitAndPrint(message) を作成
 */

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitAndPrint(message) {
  // ここにコードを書く
}

// テスト
console.log('問題1: 基本的な async/await');
waitAndPrint('Hello, async/await!');

/**
 * 問題 2: 連続した非同期処理
 * 複数の非同期処理を順番に実行する async 関数を作成してください。
 *
 * 仕様:
 * - fetchUserData(userId) という関数を実装（1秒後にユーザー情報を返す）
 * - fetchUserPosts(userId) という関数を実装（1秒後に投稿一覧を返す）
 * - getUserWithPosts(userId) という async 関数で両方を順番に取得
 */

async function fetchUserData(userId) {
  // ここにコードを書く
  // { id: userId, name: `ユーザー${userId}` } を返す
}

async function fetchUserPosts(userId) {
  // ここにコードを書く
  // ['投稿1', '投稿2', '投稿3'] を返す
}

async function getUserWithPosts(userId) {
  // ここにコードを書く
}

// テスト
console.log('\n問題2: 連続した非同期処理');
getUserWithPosts(1).then((result) => console.log(result));

/**
 * 問題 3: 並列実行の最適化
 * 以下の逐次実行を並列実行に書き換えて高速化してください。
 *
 * 仕様:
 * - 下記の fetchSlowly 関数を使用
 * - データA、データB、データC を並列で取得
 * - Promise.all と async/await を組み合わせる
 */

function fetchSlowly(dataName, seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${dataName}のデータ`);
    }, seconds * 1000);
  });
}

// 遅い実装（逐次実行）
async function fetchDataSequential() {
  const dataA = await fetchSlowly('A', 1);
  const dataB = await fetchSlowly('B', 1);
  const dataC = await fetchSlowly('C', 1);
  return [dataA, dataB, dataC];
}

// 速い実装（並列実行）
async function fetchDataParallel() {
  // ここにコードを書く
}

// テスト
console.log('\n問題3: 並列実行の最適化');
console.time('逐次実行');
fetchDataSequential().then((result) => {
  console.log('逐次実行結果:', result);
  console.timeEnd('逐次実行');
});

console.time('並列実行');
fetchDataParallel().then((result) => {
  console.log('並列実行結果:', result);
  console.timeEnd('並列実行');
});

/**
 * 問題 4: try-catch によるエラーハンドリング
 * エラーが発生する可能性のある処理を try-catch で処理してください。
 *
 * 仕様:
 * - riskyOperation(shouldFail) という関数があります
 * - この関数を呼び出し、エラーが発生したら適切に処理
 * - finally ブロックで '処理完了' を表示
 */

function riskyOperation(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('処理に失敗しました'));
      } else {
        resolve('処理成功');
      }
    }, 1000);
  });
}

async function safeOperation(shouldFail) {
  // ここにコードを書く
}

// テスト
console.log('\n問題4: エラーハンドリング');
safeOperation(false); // 成功ケース
setTimeout(() => safeOperation(true), 2000); // 失敗ケース

/**
 * 問題 5: 複数の処理のエラーハンドリング
 * 複数の非同期処理を実行し、いずれかが失敗したら全体を失敗させてください。
 *
 * 仕様:
 * - processMultipleTasks() という async 関数を作成
 * - task1, task2, task3 を並列実行
 * - いずれかが失敗したらエラーメッセージを表示
 * - すべて成功したら結果を配列で返す
 */

function task1() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('タスク1完了'), 1000);
  });
}

function task2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('タスク2失敗')), 1500);
  });
}

function task3() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('タスク3完了'), 800);
  });
}

async function processMultipleTasks() {
  // ここにコードを書く
}

// テスト
console.log('\n問題5: 複数の処理のエラーハンドリング');
processMultipleTasks();

/**
 * 問題 6: async 関数の戻り値
 * async 関数は常に Promise を返すことを確認してください。
 *
 * 仕様:
 * - getValue() という async 関数を作成
 * - 単純に数値 42 を return する
 * - この関数を呼び出し、戻り値が Promise であることを確認
 */

async function getValue() {
  // ここにコードを書く
}

// テスト
console.log('\n問題6: async 関数の戻り値');
const result = getValue();
console.log('戻り値は Promise?', result instanceof Promise);
result.then((value) => console.log('値:', value));

/**
 * 問題 7: データ取得と加工のパイプライン
 * データ取得 → 加工 → 保存 という一連の流れを実装してください。
 *
 * 仕様:
 * - fetchRawData(): 生データを取得（1秒）
 * - processData(data): データを加工（1秒）
 * - saveData(data): データを保存（1秒）
 * - runPipeline() ですべてを実行し、各ステップの進捗を表示
 */

async function fetchRawData() {
  // ここにコードを書く
  // { values: [1, 2, 3, 4, 5] } を返す
}

async function processData(data) {
  // ここにコードを書く
  // values を2倍にして返す
}

async function saveData(data) {
  // ここにコードを書く
  // '保存完了' を返す
}

async function runPipeline() {
  // ここにコードを書く
  // 各ステップの進捗を console.log で表示
}

// テスト
console.log('\n問題7: データ処理パイプライン');
runPipeline().then(() => console.log('パイプライン完了'));

/**
 * 問題 8: タイムアウト処理
 * 指定した時間内に処理が完了しなかったらタイムアウトさせてください。
 *
 * 仕様:
 * - withTimeout(promise, timeoutMs) という関数を作成
 * - promise が timeoutMs ミリ秒以内に完了すればその結果を返す
 * - 時間内に完了しなければ 'タイムアウト' エラーを投げる
 */

function withTimeout(promise, timeoutMs) {
  // ここにコードを書く
}

// テスト用の遅い処理
function slowProcess() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('完了'), 3000);
  });
}

// テスト
console.log('\n問題8: タイムアウト処理');
withTimeout(slowProcess(), 2000)
  .then((result) => console.log('結果:', result))
  .catch((error) => console.error('エラー:', error.message));
