# Chapter 5: 非同期処理

## 目次
1. [コールバック関数](#1-コールバック関数)
2. [Promise](#2-promise)
3. [async / await](#3-async--await)
4. [エラーハンドリング](#4-エラーハンドリング)
5. [fetch API](#5-fetch-api)

---

## 1. コールバック関数

非同期処理の最も基本的な形式です。処理が完了した後に実行される関数を渡します。

```javascript
// setTimeout を使った非同期処理の例
console.log('開始');

setTimeout(() => {
  console.log('2秒後に実行');
}, 2000);

console.log('終了');

// 出力順序:
// 開始
// 終了
// 2秒後に実行
```

### コールバック地獄

複数の非同期処理を順次実行すると、ネストが深くなります（Callback Hell）。

```javascript
// 悪い例: コールバック地獄
setTimeout(() => {
  console.log('1秒後');
  setTimeout(() => {
    console.log('さらに1秒後');
    setTimeout(() => {
      console.log('さらにさらに1秒後');
    }, 1000);
  }, 1000);
}, 1000);
```

---

## 2. Promise

Promise は非同期処理の結果を表すオブジェクトです。コールバック地獄を解決します。

### Promise の状態

- **pending**: 処理中
- **fulfilled**: 成功
- **rejected**: 失敗

### Promise の基本的な使い方

```javascript
// Promise を返す関数
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;

      if (success) {
        resolve('データ取得成功');
      } else {
        reject('データ取得失敗');
      }
    }, 1000);
  });
}

// Promise を使用
fetchData()
  .then((result) => {
    console.log(result); // データ取得成功
    return 'さらに処理';
  })
  .then((result) => {
    console.log(result); // さらに処理
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log('処理完了');
  });
```

### Promise.all

複数の Promise を並列に実行し、すべて完了するまで待ちます。

```javascript
const promise1 = Promise.resolve(10);
const promise2 = Promise.resolve(20);
const promise3 = Promise.resolve(30);

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log(results); // [10, 20, 30]
    const sum = results.reduce((acc, curr) => acc + curr, 0);
    console.log('合計:', sum); // 合計: 60
  });
```

### Promise.race

複数の Promise のうち、最初に完了したものの結果を返します。

```javascript
const slow = new Promise((resolve) => setTimeout(() => resolve('遅い'), 2000));
const fast = new Promise((resolve) => setTimeout(() => resolve('速い'), 1000));

Promise.race([slow, fast])
  .then((result) => {
    console.log(result); // 速い
  });
```

---

## 3. async / await

Promise をより読みやすく書くための構文糖衣です。

### async 関数

`async` キーワードを付けた関数は、必ず Promise を返します。

```javascript
async function fetchUser() {
  return 'ユーザーデータ';
}

fetchUser().then((data) => console.log(data)); // ユーザーデータ
```

### await キーワード

`await` は Promise の解決を待ちます。`async` 関数内でのみ使用できます。

```javascript
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processData() {
  console.log('処理開始');

  await delay(1000);
  console.log('1秒経過');

  await delay(1000);
  console.log('2秒経過');

  return '処理完了';
}

processData().then((result) => console.log(result));
```

### 並列実行

複数の非同期処理を並列に実行する場合は、Promise.all と組み合わせます。

```javascript
async function fetchAllData() {
  // 逐次実行（遅い）
  const user = await fetchUser();
  const posts = await fetchPosts();
  const comments = await fetchComments();

  return { user, posts, comments };
}

async function fetchAllDataParallel() {
  // 並列実行（速い）
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
  ]);

  return { user, posts, comments };
}
```

---

## 4. エラーハンドリング

### try-catch で Promise のエラーを処理

```javascript
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('エラーが発生しました:', error);
    throw error; // エラーを再スロー
  } finally {
    console.log('処理が完了しました');
  }
}
```

### Promise チェーンのエラーハンドリング

```javascript
fetchData()
  .then((data) => {
    return processData(data);
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    // どの段階でエラーが起きてもここでキャッチ
    console.error('エラー:', error);
  });
```

---

## 5. fetch API

Web API からデータを取得するための標準的な方法です。

### 基本的な GET リクエスト

```javascript
async function fetchUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    // レスポンスのステータスコードを確認
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error('データ取得エラー:', error);
    throw error;
  }
}

// 使用例
fetchUsers()
  .then((users) => {
    console.log('ユーザー一覧:', users);
  })
  .catch((error) => {
    console.error('処理に失敗しました:', error);
  });
```

### POST リクエスト

```javascript
async function createUser(userData) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error('ユーザー作成エラー:', error);
    throw error;
  }
}

// 使用例
createUser({ name: '太郎', email: 'taro@example.com' })
  .then((user) => {
    console.log('作成されたユーザー:', user);
  });
```

### その他の HTTP メソッド

```javascript
// PUT リクエスト（更新）
async function updateUser(id, userData) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
}

// DELETE リクエスト（削除）
async function deleteUser(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'DELETE',
  });
  return response.ok;
}
```

---

## まとめ

| 方法 | 特徴 | 使いどころ |
|------|------|-----------|
| コールバック | 最も基本的 | 単純な非同期処理 |
| Promise | チェーン可能 | 複数の非同期処理の連携 |
| async/await | 同期的な見た目 | 読みやすい非同期コード |

### ベストプラクティス

1. **新しいコードでは async/await を使う**: 可読性が高い
2. **エラーハンドリングを忘れない**: try-catch または .catch() を使う
3. **並列処理できるものは並列で**: Promise.all を活用する
4. **fetch のレスポンスは必ずチェック**: response.ok や status を確認する

---

## 練習問題

次のファイルで非同期処理の練習をしましょう：

1. `exercises/01-callbacks.js` - コールバック関数の基礎
2. `exercises/02-promises.js` - Promise の使い方
3. `exercises/03-async-await.js` - async/await の実践
4. `exercises/04-error-handling.js` - エラーハンドリング
5. `exercises/05-fetch-api.js` - fetch API の活用
