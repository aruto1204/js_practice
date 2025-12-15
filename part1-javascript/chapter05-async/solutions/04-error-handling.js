// 解答例 4: エラーハンドリング

/**
 * 問題 1: 基本的な try-catch
 */

function syncError() {
  throw new Error('同期エラー');
}

function asyncError() {
  return Promise.reject(new Error('非同期エラー'));
}

// 同期エラーの処理
console.log('問題1-1: 同期エラーの処理');
try {
  syncError();
} catch (error) {
  console.error('同期エラーをキャッチ:', error.message);
}

// 非同期エラーの処理
console.log('\n問題1-2: 非同期エラーの処理');
asyncError()
  .then(() => {
    console.log('成功');
  })
  .catch((error) => {
    console.error('非同期エラーをキャッチ:', error.message);
  });

// async/await を使った非同期エラーの処理
(async () => {
  try {
    await asyncError();
  } catch (error) {
    console.error('async/await で非同期エラーをキャッチ:', error.message);
  }
})();

/**
 * 問題 2: Promise チェーンでのエラー伝播
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
step1()
  .then((result) => {
    console.log('ステップ1完了:', result);
    return step2();
  })
  .then((result) => {
    console.log('ステップ2完了:', result);
    return step3();
  })
  .then((result) => {
    console.log('ステップ3完了:', result);
  })
  .catch((error) => {
    console.error('エラーをキャッチ:', error.message);
  })
  .finally(() => {
    console.log('チェーン終了');
  });

/**
 * 問題 3: エラーからの回復
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
  try {
    const data = await fetchData(shouldFail);
    return data;
  } catch (error) {
    console.log('エラーが発生しました。デフォルト値を返します。');
    return 'デフォルトデータ';
  }
}

// テスト
console.log('\n問題3: エラーからの回復');
fetchWithFallback(false).then((data) => console.log('成功:', data));
fetchWithFallback(true).then((data) => console.log('フォールバック:', data));

/**
 * 問題 4: カスタムエラークラス
 */

class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
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
  try {
    const result = await processRequest(type);
    console.log('処理成功:', result);
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error('ネットワークエラー:', error.message);
      console.log('→ リトライします...');
    } else if (error instanceof ValidationError) {
      console.error('バリデーションエラー:', error.message);
      console.log('→ 入力を修正してください');
    } else {
      console.error('不明なエラー:', error);
    }
  }
}

// テスト
console.log('\n問題4: カスタムエラークラス');
handleRequest('success');
setTimeout(() => handleRequest('network'), 1500);
setTimeout(() => handleRequest('validation'), 3000);

/**
 * 問題 5: 複数のエラーハンドリング
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
  const tasks = [
    task(1, false),
    task(2, true),
    task(3, false),
    task(4, true),
    task(5, false),
  ];

  const results = await Promise.allSettled(tasks);

  const succeeded = results.filter((r) => r.status === 'fulfilled');
  const failed = results.filter((r) => r.status === 'rejected');

  console.log('\n成功したタスク:');
  succeeded.forEach((r) => console.log('  -', r.value));

  console.log('\n失敗したタスク:');
  failed.forEach((r) => console.log('  -', r.reason.message));

  console.log(`\n合計: ${succeeded.length}成功, ${failed.length}失敗`);
}

// テスト
console.log('\n問題5: 複数のエラーハンドリング');
runAllTasks();

/**
 * 問題 6: リトライ機能の実装
 */

async function retry(fn, maxAttempts, delay) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`試行 ${attempt}/${maxAttempts}`);
      const result = await fn();
      console.log('成功しました');
      return result;
    } catch (error) {
      console.log(`失敗: ${error.message}`);
      lastError = error;

      if (attempt < maxAttempts) {
        console.log(`${delay}ms 待機してリトライします...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
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
 */

class ErrorLogger {
  constructor() {
    this.errors = [];
  }

  log(error) {
    this.errors.push({
      message: error.message,
      timestamp: new Date().toLocaleString(),
      stack: error.stack,
    });
  }

  getErrors() {
    return this.errors;
  }

  clear() {
    this.errors = [];
  }
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
  const resource = new Resource('データベース接続');

  try {
    resource.open();
    await new Promise((resolve) => setTimeout(resolve, 500));
    resource.use(shouldFail);
    return '処理完了';
  } catch (error) {
    console.error('エラー:', error.message);
    throw error;
  } finally {
    // エラーが発生してもリソースは必ずクローズ
    if (resource.isOpen) {
      resource.close();
    }
  }
}

// テスト
console.log('\n問題8: グレースフルシャットダウン');
console.log('正常ケース:');
useResource(false).catch((error) => console.error('エラー:', error.message));

setTimeout(() => {
  console.log('\nエラーケース:');
  useResource(true).catch((error) => console.error('エラー:', error.message));
}, 2000);
