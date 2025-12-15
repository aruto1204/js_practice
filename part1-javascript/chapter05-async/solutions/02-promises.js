// 解答例 2: Promise

/**
 * 問題 1: 基本的な Promise の作成
 */

function delay(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${seconds}秒経過`);
    }, seconds * 1000);
  });
}

// テスト
console.log('問題1: 基本的な Promise');
delay(2)
  .then((message) => console.log(message)) // 2秒経過
  .catch((error) => console.error(error));

/**
 * 問題 2: Promise チェーン
 */

function double(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${num} を2倍にします`);
      resolve(num * 2);
    }, 1000);
  });
}

function addTen(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${num} に10を加えます`);
      resolve(num + 10);
    }, 1000);
  });
}

function square(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${num} を2乗します`);
      resolve(num * num);
    }, 1000);
  });
}

// テスト
console.log('\n問題2: Promise チェーン開始（初期値: 5）');
double(5)
  .then((result) => addTen(result))
  .then((result) => square(result))
  .then((result) => {
    console.log('最終結果:', result); // 400
  })
  .catch((error) => console.error('エラー:', error));

/**
 * 問題 3: Promise.all の活用
 */

function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: id, name: `ユーザー${id}` });
    }, 1000);
  });
}

// テスト
console.log('\n問題3: Promise.all でユーザー取得');
Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)])
  .then((users) => {
    console.log('取得したユーザー:', users);
  })
  .catch((error) => console.error('エラー:', error));

/**
 * 問題 4: Promise.race の活用
 */

function slowTask() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('遅いタスク完了'), 3000);
  });
}

function mediumTask() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('普通のタスク完了'), 2000);
  });
}

function fastTask() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('速いタスク完了'), 1000);
  });
}

// テスト
console.log('\n問題4: Promise.race');
Promise.race([slowTask(), mediumTask(), fastTask()])
  .then((result) => {
    console.log('最速のタスク:', result); // 速いタスク完了
  })
  .catch((error) => console.error('エラー:', error));

/**
 * 問題 5: エラーハンドリング
 */

function randomTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve('処理成功');
      } else {
        reject(new Error('処理失敗'));
      }
    }, 1000);
  });
}

// テスト
console.log('\n問題5: エラーハンドリング');
randomTask()
  .then((result) => console.log('成功:', result))
  .catch((error) => console.error('失敗:', error.message))
  .finally(() => console.log('処理完了'));

/**
 * 問題 6: Promise チェーンでのエラーハンドリング
 */

function step1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('ステップ1完了');
      resolve('ステップ1の結果');
    }, 1000);
  });
}

function step2(previousResult) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('ステップ2でエラー発生');
      reject(new Error('ステップ2で失敗しました'));
    }, 1000);
  });
}

function step3(previousResult) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('ステップ3完了');
      resolve('ステップ3の結果');
    }, 1000);
  });
}

// テスト
console.log('\n問題6: Promise チェーンのエラーハンドリング');
step1()
  .then((result) => step2(result))
  .then((result) => step3(result))
  .then((result) => {
    console.log('最終結果:', result);
  })
  .catch((error) => {
    console.error('エラーをキャッチ:', error.message);
  })
  .finally(() => {
    console.log('チェーン終了');
  });

/**
 * 問題 7: Promise のリトライ機能
 */

// 70% の確率で失敗するタスク
function unreliableTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.7) {
        resolve('タスク成功');
      } else {
        reject(new Error('タスク失敗'));
      }
    }, 500);
  });
}

function retryTask(maxRetries) {
  let attempts = 0;

  function attempt() {
    attempts++;
    console.log(`試行 ${attempts} 回目`);

    return unreliableTask().catch((error) => {
      if (attempts < maxRetries) {
        console.log(`失敗しました。リトライします...`);
        return attempt();
      } else {
        throw new Error(`${maxRetries}回試行しましたが、すべて失敗しました`);
      }
    });
  }

  return attempt();
}

// テスト
console.log('\n問題7: リトライ機能');
retryTask(5)
  .then((result) => console.log('最終結果:', result))
  .catch((error) => console.error('すべて失敗:', error.message));
