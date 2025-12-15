// 解答例 1: コールバック関数

/**
 * 問題 1: タイマー処理
 */

function delayedMessage(message, seconds, callback) {
  setTimeout(() => {
    callback(message);
  }, seconds * 1000);
}

// テスト
console.log('問題1: タイマー処理を開始');
delayedMessage('3秒経過しました', 3, (msg) => console.log(msg));

/**
 * 問題 2: ファイル読み込みシミュレーション
 */

function readFile(filename, callback) {
  setTimeout(() => {
    const content = `${filename}の内容`;
    callback(content);
  }, 1000);
}

// テスト
console.log('\n問題2: ファイル読み込み開始');
readFile('file1.txt', (content1) => {
  console.log(content1);
  readFile('file2.txt', (content2) => {
    console.log(content2);
    readFile('file3.txt', (content3) => {
      console.log(content3);
      console.log('すべてのファイル読み込み完了');
    });
  });
});

/**
 * 問題 3: ユーザー認証フロー
 */

function login(username, callback) {
  setTimeout(() => {
    const user = { id: 1, username, role: 'admin' };
    console.log('ログイン成功:', username);
    callback(user);
  }, 1000);
}

function checkPermission(user, callback) {
  setTimeout(() => {
    console.log('権限確認:', user.role);
    callback(user);
  }, 1000);
}

function fetchData(user, callback) {
  setTimeout(() => {
    const data = { userId: user.id, posts: ['投稿1', '投稿2'] };
    console.log('データ取得完了');
    callback(data);
  }, 1000);
}

// テスト
console.log('\n問題3: 認証フロー開始');
login('taro', (user) => {
  checkPermission(user, (authorizedUser) => {
    fetchData(authorizedUser, (data) => {
      console.log('最終データ:', data);
    });
  });
});

/**
 * 問題 4: 並列コールバック処理
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
let completedCount = 0;
const totalTasks = 3;
const results = [];

function onTaskComplete(result) {
  console.log(result);
  results.push(result);
  completedCount++;

  if (completedCount === totalTasks) {
    console.log('すべて完了');
    console.log('結果:', results);
  }
}

task1(onTaskComplete);
task2(onTaskComplete);
task3(onTaskComplete);

/**
 * 問題 5: エラーハンドリング付きコールバック
 */

function divide(a, b, callback) {
  setTimeout(() => {
    if (b === 0) {
      callback(new Error('0で割ることはできません'), null);
    } else {
      callback(null, a / b);
    }
  }, 1000);
}

// テスト
console.log('\n問題5: エラーハンドリング');
divide(10, 2, (error, result) => {
  if (error) {
    console.error('エラー:', error.message);
  } else {
    console.log('結果:', result); // 5
  }
});

divide(10, 0, (error, result) => {
  if (error) {
    console.error('エラー:', error.message); // 0で割ることはできません
  } else {
    console.log('結果:', result);
  }
});
