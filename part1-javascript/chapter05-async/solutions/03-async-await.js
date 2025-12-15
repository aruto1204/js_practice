// 解答例 3: async / await

/**
 * 問題 1: 基本的な async/await
 */

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitAndPrint(message) {
  await delay(1000);
  console.log(message);
}

// テスト
console.log('問題1: 基本的な async/await');
waitAndPrint('Hello, async/await!');

/**
 * 問題 2: 連続した非同期処理
 */

async function fetchUserData(userId) {
  await delay(1000);
  return { id: userId, name: `ユーザー${userId}` };
}

async function fetchUserPosts(userId) {
  await delay(1000);
  return ['投稿1', '投稿2', '投稿3'];
}

async function getUserWithPosts(userId) {
  console.log('ユーザー情報を取得中...');
  const user = await fetchUserData(userId);
  console.log('ユーザー情報取得完了:', user);

  console.log('投稿一覧を取得中...');
  const posts = await fetchUserPosts(userId);
  console.log('投稿一覧取得完了');

  return { user, posts };
}

// テスト
console.log('\n問題2: 連続した非同期処理');
getUserWithPosts(1).then((result) => console.log('最終結果:', result));

/**
 * 問題 3: 並列実行の最適化
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
  const [dataA, dataB, dataC] = await Promise.all([
    fetchSlowly('A', 1),
    fetchSlowly('B', 1),
    fetchSlowly('C', 1),
  ]);
  return [dataA, dataB, dataC];
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
  try {
    console.log('処理を開始します');
    const result = await riskyOperation(shouldFail);
    console.log('結果:', result);
    return result;
  } catch (error) {
    console.error('エラーが発生しました:', error.message);
  } finally {
    console.log('処理完了');
  }
}

// テスト
console.log('\n問題4: エラーハンドリング');
safeOperation(false); // 成功ケース
setTimeout(() => safeOperation(true), 2000); // 失敗ケース

/**
 * 問題 5: 複数の処理のエラーハンドリング
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
  try {
    console.log('複数のタスクを開始');
    const results = await Promise.all([task1(), task2(), task3()]);
    console.log('すべてのタスク完了:', results);
    return results;
  } catch (error) {
    console.error('いずれかのタスクが失敗しました:', error.message);
    throw error;
  }
}

// テスト
console.log('\n問題5: 複数の処理のエラーハンドリング');
processMultipleTasks().catch(() => {
  console.log('エラーハンドリング完了');
});

/**
 * 問題 6: async 関数の戻り値
 */

async function getValue() {
  return 42;
}

// テスト
console.log('\n問題6: async 関数の戻り値');
const result = getValue();
console.log('戻り値は Promise?', result instanceof Promise);
result.then((value) => console.log('値:', value));

/**
 * 問題 7: データ取得と加工のパイプライン
 */

async function fetchRawData() {
  console.log('1. 生データを取得中...');
  await delay(1000);
  return { values: [1, 2, 3, 4, 5] };
}

async function processData(data) {
  console.log('2. データを加工中...');
  await delay(1000);
  return { values: data.values.map((v) => v * 2) };
}

async function saveData(data) {
  console.log('3. データを保存中...');
  await delay(1000);
  console.log('保存されたデータ:', data);
  return '保存完了';
}

async function runPipeline() {
  try {
    const rawData = await fetchRawData();
    console.log('取得データ:', rawData);

    const processedData = await processData(rawData);
    console.log('加工データ:', processedData);

    const result = await saveData(processedData);
    console.log('最終結果:', result);

    return result;
  } catch (error) {
    console.error('パイプラインエラー:', error);
    throw error;
  }
}

// テスト
console.log('\n問題7: データ処理パイプライン');
runPipeline().then(() => console.log('パイプライン完了'));

/**
 * 問題 8: タイムアウト処理
 */

function withTimeout(promise, timeoutMs) {
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('タイムアウト'));
    }, timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]);
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
