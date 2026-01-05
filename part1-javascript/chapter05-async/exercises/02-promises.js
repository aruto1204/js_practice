// 練習問題 2: Promise

/**
 * 問題 1: 基本的な Promise の作成
 * 指定した秒数後に解決される Promise を返す関数を作成してください。
 *
 * 仕様:
 * - delay(seconds) という関数を作成
 * - seconds 秒後に resolve される Promise を返す
 * - resolve 時に '${seconds}秒経過' というメッセージを渡す
 */

function delay(seconds) {
  // ここにコードを書く
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${seconds}秒経過`);
    }, seconds * 1000);
  });
}

// テスト
console.log('問題1: 基本的な Promise');
// delay(2)
//   .then((message) => console.log(message))
//   .catch((error) => console.error(error));

/**
 * 問題 2: Promise チェーン
 * 数値を受け取り、以下の処理を順番に行う Promise チェーンを作成してください。
 *
 * 仕様:
 * - 最初の Promise: 受け取った数値を2倍にする（1秒後）
 * - 2番目の Promise: 結果に10を加える（1秒後）
 * - 3番目の Promise: 結果を2乗する（1秒後）
 * - 最終結果を表示する
 */

function double(num) {
  // ここにコードを書く
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * 2);
    }, 1000);
  });
}

function addTen(num) {
  // ここにコードを書く
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num + 10);
    }, 1000);
  });
}

function square(num) {
  // ここにコードを書く
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
}

// テスト
console.log('\n問題2: Promise チェーン開始（初期値: 5）');
// ここに Promise チェーンを書く
// double(5)
//   .then((result) => {
//     console.log(result);
//     return addTen(result);
//   })
//   .then((result) => {
//     console.log(result);
//     return square(result);
//   })
//   .then((result) => console.log(result));
// 期待される結果: (5 * 2 + 10) ^ 2 = 400

/**
 * 問題 3: Promise.all の活用
 * 複数のユーザー情報を並列に取得してください。
 *
 * 仕様:
 * - fetchUser(id) という関数を実装（1秒後にユーザー情報を返す）
 * - ユーザーID 1, 2, 3 の情報を並列に取得
 * - すべて取得できたら配列で表示
 */

function fetchUser(id) {
  // ここにコードを書く
  // { id: id, name: `ユーザー${id}` } を返す
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: id, name: `ユーザー${id}` });
    }, 1000);
  });
}

// テスト
console.log('\n問題3: Promise.all でユーザー取得');
// ここにコードを書く
// Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)])
//   .then((users) => {
//     console.log('取得したユーザー:', users);
//   })
//   .catch((error) => console.error('エラー:', error));

/**
 * 問題 4: Promise.race の活用
 * 最も速く完了したタスクの結果を取得してください。
 *
 * 仕様:
 * - slowTask(): 3秒かかるタスク
 * - mediumTask(): 2秒かかるタスク
 * - fastTask(): 1秒かかるタスク
 * - Promise.race を使って最速のタスク結果を表示
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
// ここにコードを書く
// Promise.race([slowTask(), mediumTask(), fastTask()]).then((result) =>
//   console.log('最速のタスク:', result)
// );

/**
 * 問題 5: エラーハンドリング
 * ランダムに成功または失敗する非同期処理を実装してください。
 *
 * 仕様:
 * - randomTask() という関数を作成
 * - 50% の確率で成功、50% の確率で失敗
 * - 成功時: '処理成功' を resolve
 * - 失敗時: '処理失敗' を reject
 * - .then() と .catch() を使ってエラーハンドリング
 */

function randomTask() {
  // ここにコードを書く
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
// randomTask()
//   .then((result) => console.log('成功:', result))
//   .catch((error) => console.error('失敗:', error.message))
//   .finally(() => console.log('処理完了'));

/**
 * 問題 6: Promise チェーンでのエラーハンドリング
 * 複数の処理のうち、途中でエラーが発生した場合の処理を実装してください。
 *
 * 仕様:
 * - step1(): 成功（1秒後）
 * - step2(): 失敗（エラーを throw）
 * - step3(): 成功（実行されない）
 * - エラーを catch して適切に処理
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
// ここにコードを書く
// step1()
//   .then((result) => step2(result))
//   .then((result) => step3(result))
//   .catch((error) => console.error('エラー:', error.message))
//   .finally(() => console.log('処理完了'));

/**
 * 問題 7: Promise のリトライ機能
 * 失敗した処理を自動的にリトライする機能を実装してください。
 *
 * 仕様:
 * - retryTask(maxRetries) という関数を作成
 * - 最大 maxRetries 回までリトライする
 * - 成功したら結果を返す
 * - すべて失敗したらエラーを返す
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
