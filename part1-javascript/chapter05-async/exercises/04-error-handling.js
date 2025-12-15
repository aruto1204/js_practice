// 練習問題 4: エラーハンドリング

/**
 * 問題 1: 基本的な try-catch
 * 同期処理と非同期処理のエラーハンドリングの違いを理解してください。
 *
 * 仕様:
 * - 同期的にエラーを投げる関数を try-catch で処理
 * - 非同期的にエラーを投げる Promise を try-catch で処理
 */

function syncError() {
  throw new Error('同期エラー');
}

function asyncError() {
  return Promise.reject(new Error('非同期エラー'));
}

// 同期エラーの処理
console.log('問題1-1: 同期エラーの処理');
// ここにコードを書く

// 非同期エラーの処理
console.log('\n問題1-2: 非同期エラーの処理');
// ここにコードを書く

/**
 * 問題 2: Promise チェーンでのエラー伝播
 * Promise チェーンの途中でエラーが発生した場合の挙動を確認してください。
 *
 * 仕様:
 * - 3つの処理を Promise チェーンで繋ぐ
 * - 2番目の処理でエラーを発生させる
 * - エラーを catch で処理
 * - どの処理がスキップされるか確認
 */

function step1() {
  console.log('ステップ1実行');
  return Promise.resolve('ステップ1の結果');
}

function step2() {
  console.log('ステップ2実行');
  return Promise.reject(new Error('ステップ2でエラー'));
}

function step3() {
  console.log('ステップ3実行'); // これは実行されない
  return Promise.resolve('ステップ3の結果');
}

// テスト
console.log('\n問題2: Promise チェーンでのエラー伝播');
// ここにコードを書く

/**
 * 問題 3: エラーからの回復
 * エラーが発生しても処理を継続する方法を実装してください。
 *
 * 仕様:
 * - fetchData(shouldFail) という関数があります
 * - エラーが発生したらデフォルト値を返して処理を継続
 * - 最終的な結果を表示
 */

function fetchData(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('データ取得失敗'));
      } else {
        resolve('正常なデータ');
      }
    }, 1000);
  });
}

async function fetchWithFallback(shouldFail) {
  // ここにコードを書く
  // エラーが発生したら 'デフォルトデータ' を返す
}

// テスト
console.log('\n問題3: エラーからの回復');
fetchWithFallback(false).then((data) => console.log('成功:', data));
fetchWithFallback(true).then((data) => console.log('フォールバック:', data));

/**
 * 問題 4: カスタムエラークラス
 * 独自のエラークラスを作成して、エラーの種類を区別してください。
 *
 * 仕様:
 * - NetworkError クラスを作成（extends Error）
 * - ValidationError クラスを作成（extends Error）
 * - エラーの種類に応じて異なる処理を行う
 */

class NetworkError extends Error {
  // ここにコードを書く
}

class ValidationError extends Error {
  // ここにコードを書く
}

function processRequest(type) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (type === 'network') {
        reject(new NetworkError('ネットワークエラーが発生しました'));
      } else if (type === 'validation') {
        reject(new ValidationError('バリデーションエラーが発生しました'));
      } else {
        resolve('成功');
      }
    }, 1000);
  });
}

async function handleRequest(type) {
  // ここにコードを書く
  // エラーの種類に応じて異なるメッセージを表示
}

// テスト
console.log('\n問題4: カスタムエラークラス');
handleRequest('success');
setTimeout(() => handleRequest('network'), 1500);
setTimeout(() => handleRequest('validation'), 3000);

/**
 * 問題 5: 複数のエラーハンドリング
 * 複数の非同期処理を実行し、すべてのエラーを収集してください。
 *
 * 仕様:
 * - Promise.allSettled を使用
 * - 成功した処理と失敗した処理を分類
 * - 失敗した処理のエラーメッセージを表示
 */

function task(id, shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`タスク${id}失敗`));
      } else {
        resolve(`タスク${id}成功`);
      }
    }, 1000);
  });
}

async function runAllTasks() {
  // ここにコードを書く
  const tasks = [
    task(1, false),
    task(2, true),
    task(3, false),
    task(4, true),
    task(5, false),
  ];

  // Promise.allSettled を使って全タスクの結果を取得
  // 成功と失敗を分類して表示
}

// テスト
console.log('\n問題5: 複数のエラーハンドリング');
runAllTasks();

/**
 * 問題 6: リトライ機能の実装
 * 失敗した処理を自動的にリトライする機能を実装してください。
 *
 * 仕様:
 * - retry(fn, maxAttempts, delay) という関数を作成
 * - fn が失敗したら delay ミリ秒待ってリトライ
 * - maxAttempts 回まで試行
 * - すべて失敗したら最後のエラーを throw
 */

async function retry(fn, maxAttempts, delay) {
  // ここにコードを書く
}

// テスト用の不安定な関数（70%の確率で失敗）
let attemptCount = 0;
function unstableOperation() {
  attemptCount++;
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.3) {
      reject(new Error(`失敗（試行${attemptCount}回目）`));
    } else {
      resolve(`成功（試行${attemptCount}回目）`);
    }
  });
}

// テスト
console.log('\n問題6: リトライ機能');
retry(unstableOperation, 5, 500)
  .then((result) => console.log('最終結果:', result))
  .catch((error) => console.error('すべて失敗:', error.message));

/**
 * 問題 7: エラーログの集約
 * 発生したすべてのエラーをログに記録する仕組みを実装してください。
 *
 * 仕様:
 * - ErrorLogger クラスを作成
 * - log(error) メソッドでエラーを記録
 * - getErrors() メソッドですべてのエラーを取得
 * - clear() メソッドでログをクリア
 */

class ErrorLogger {
  // ここにコードを書く
}

const logger = new ErrorLogger();

async function operationWithLogging(shouldFail, operationName) {
  try {
    if (shouldFail) {
      throw new Error(`${operationName}で失敗`);
    }
    console.log(`${operationName}成功`);
  } catch (error) {
    logger.log(error);
    console.error(`${operationName}エラー:`, error.message);
  }
}

// テスト
console.log('\n問題7: エラーログの集約');
(async () => {
  await operationWithLogging(false, '操作1');
  await operationWithLogging(true, '操作2');
  await operationWithLogging(true, '操作3');
  await operationWithLogging(false, '操作4');

  console.log('\n記録されたエラー:');
  logger.getErrors().forEach((error, index) => {
    console.log(`${index + 1}. ${error.message} (${error.timestamp})`);
  });
})();

/**
 * 問題 8: グレースフルシャットダウン
 * 処理中にエラーが発生してもリソースを適切に解放する仕組みを実装してください。
 *
 * 仕様:
 * - リソースの取得、使用、解放を行う
 * - エラーが発生してもリソースは必ず解放される
 * - finally ブロックを活用
 */

class Resource {
  constructor(name) {
    this.name = name;
    this.isOpen = false;
  }

  open() {
    console.log(`リソース ${this.name} をオープン`);
    this.isOpen = true;
  }

  use(shouldFail) {
    if (!this.isOpen) {
      throw new Error('リソースがオープンされていません');
    }
    if (shouldFail) {
      throw new Error(`リソース ${this.name} の使用中にエラー`);
    }
    console.log(`リソース ${this.name} を使用`);
  }

  close() {
    console.log(`リソース ${this.name} をクローズ`);
    this.isOpen = false;
  }
}

async function useResource(shouldFail) {
  // ここにコードを書く
  // リソースを開く → 使う → 閉じる
  // エラーが発生しても必ずクローズする
}

// テスト
console.log('\n問題8: グレースフルシャットダウン');
console.log('正常ケース:');
useResource(false).catch((error) => console.error('エラー:', error.message));

setTimeout(() => {
  console.log('\nエラーケース:');
  useResource(true).catch((error) => console.error('エラー:', error.message));
}, 2000);
