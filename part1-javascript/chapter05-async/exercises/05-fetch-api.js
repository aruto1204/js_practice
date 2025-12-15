// 練習問題 5: fetch API

/**
 * 注意: このファイルの一部の問題は実際のAPIを使用します。
 * Node.js v18 以上が必要です（fetch APIがネイティブサポート）。
 * それ以前のバージョンでは node-fetch パッケージが必要です。
 */

/**
 * 問題 1: 基本的な GET リクエスト
 * JSONPlaceholder API からユーザー一覧を取得してください。
 *
 * 仕様:
 * - https://jsonplaceholder.typicode.com/users からデータ取得
 * - 取得したユーザーの名前とメールアドレスを表示
 * - エラーハンドリングを実装
 */

async function fetchUsers() {
  // ここにコードを書く
}

// テスト
console.log('問題1: ユーザー一覧取得');
fetchUsers();

/**
 * 問題 2: 単一リソースの取得
 * 特定のユーザーの詳細情報を取得してください。
 *
 * 仕様:
 * - fetchUser(userId) という関数を実装
 * - https://jsonplaceholder.typicode.com/users/{userId} からデータ取得
 * - レスポンスステータスが 404 の場合は適切に処理
 */

async function fetchUser(userId) {
  // ここにコードを書く
}

// テスト
console.log('\n問題2: 単一ユーザー取得');
fetchUser(1).then((user) => console.log('ユーザー:', user));
fetchUser(999).catch((error) => console.error('エラー:', error.message));

/**
 * 問題 3: POST リクエスト
 * 新しい投稿を作成してください。
 *
 * 仕様:
 * - createPost(title, body, userId) という関数を実装
 * - https://jsonplaceholder.typicode.com/posts に POST
 * - Content-Type ヘッダーを設定
 * - 作成された投稿のIDを表示
 */

async function createPost(title, body, userId) {
  // ここにコードを書く
}

// テスト
console.log('\n問題3: 投稿作成');
createPost('テストタイトル', 'テスト本文', 1)
  .then((post) => console.log('作成された投稿:', post));

/**
 * 問題 4: PUT リクエスト（更新）
 * 既存の投稿を更新してください。
 *
 * 仕様:
 * - updatePost(postId, title, body) という関数を実装
 * - https://jsonplaceholder.typicode.com/posts/{postId} に PUT
 * - 更新された投稿を返す
 */

async function updatePost(postId, title, body) {
  // ここにコードを書く
}

// テスト
console.log('\n問題4: 投稿更新');
updatePost(1, '更新されたタイトル', '更新された本文')
  .then((post) => console.log('更新された投稿:', post));

/**
 * 問題 5: DELETE リクエスト
 * 投稿を削除してください。
 *
 * 仕様:
 * - deletePost(postId) という関数を実装
 * - https://jsonplaceholder.typicode.com/posts/{postId} に DELETE
 * - 成功したら true、失敗したら false を返す
 */

async function deletePost(postId) {
  // ここにコードを書く
}

// テスト
console.log('\n問題5: 投稿削除');
deletePost(1).then((success) => console.log('削除成功:', success));

/**
 * 問題 6: 複数のリソースを並列取得
 * ユーザー情報とその投稿一覧を並列で取得してください。
 *
 * 仕様:
 * - getUserWithPosts(userId) という関数を実装
 * - ユーザー情報: https://jsonplaceholder.typicode.com/users/{userId}
 * - 投稿一覧: https://jsonplaceholder.typicode.com/posts?userId={userId}
 * - Promise.all を使って並列取得
 * - { user, posts } の形式で返す
 */

async function getUserWithPosts(userId) {
  // ここにコードを書く
}

// テスト
console.log('\n問題6: ユーザーと投稿を並列取得');
getUserWithPosts(1).then((data) => {
  console.log('ユーザー:', data.user.name);
  console.log('投稿数:', data.posts.length);
});

/**
 * 問題 7: タイムアウト処理
 * リクエストがタイムアウトした場合の処理を実装してください。
 *
 * 仕様:
 * - fetchWithTimeout(url, timeoutMs) という関数を実装
 * - AbortController を使用
 * - timeoutMs ミリ秒以内にレスポンスがなければタイムアウト
 */

async function fetchWithTimeout(url, timeoutMs) {
  // ここにコードを書く
}

// テスト
console.log('\n問題7: タイムアウト処理');
// 通常のリクエスト（成功するはず）
fetchWithTimeout('https://jsonplaceholder.typicode.com/users/1', 5000)
  .then((data) => console.log('成功:', data.name))
  .catch((error) => console.error('エラー:', error.message));

// 極端に短いタイムアウト（失敗するはず）
fetchWithTimeout('https://jsonplaceholder.typicode.com/users/1', 1)
  .then((data) => console.log('成功:', data))
  .catch((error) => console.error('タイムアウト:', error.message));

/**
 * 問題 8: リトライ機能付きフェッチ
 * 失敗したリクエストを自動的にリトライしてください。
 *
 * 仕様:
 * - fetchWithRetry(url, maxRetries) という関数を実装
 * - 失敗したら最大 maxRetries 回までリトライ
 * - 各リトライの間に1秒待つ
 * - すべて失敗したらエラーを throw
 */

async function fetchWithRetry(url, maxRetries) {
  // ここにコードを書く
}

// テスト
console.log('\n問題8: リトライ機能');
// 存在しないエンドポイント（リトライされる）
fetchWithRetry('https://jsonplaceholder.typicode.com/invalid', 3)
  .then((data) => console.log('成功:', data))
  .catch((error) => console.error('最終的に失敗:', error.message));

/**
 * 問題 9: レスポンスのキャッシュ
 * 一度取得したデータをキャッシュして再利用してください。
 *
 * 仕様:
 * - CachedFetcher クラスを実装
 * - fetch(url) メソッドで取得
 * - 同じURLは再度リクエストせずキャッシュから返す
 * - clear() メソッドでキャッシュをクリア
 */

class CachedFetcher {
  // ここにコードを書く
}

// テスト
console.log('\n問題9: レスポンスのキャッシュ');
const fetcher = new CachedFetcher();

(async () => {
  console.log('1回目のリクエスト:');
  console.time('1回目');
  await fetcher.fetch('https://jsonplaceholder.typicode.com/users/1');
  console.timeEnd('1回目');

  console.log('2回目のリクエスト（キャッシュから）:');
  console.time('2回目');
  const user = await fetcher.fetch('https://jsonplaceholder.typicode.com/users/1');
  console.timeEnd('2回目');
  console.log('ユーザー:', user.name);
})();

/**
 * 問題 10: ページネーション処理
 * ページ分割されたデータをすべて取得してください。
 *
 * 仕様:
 * - fetchAllPosts() という関数を実装
 * - https://jsonplaceholder.typicode.com/posts?_page=X&_limit=10 を使用
 * - すべてのページのデータを取得して結合
 * - 総件数が100件あると仮定
 */

async function fetchAllPosts() {
  // ここにコードを書く
}

// テスト
console.log('\n問題10: ページネーション処理');
fetchAllPosts().then((posts) => {
  console.log('取得した投稿数:', posts.length);
});

/**
 * 問題 11: エラーレスポンスの処理
 * さまざまなHTTPステータスコードに対応した処理を実装してください。
 *
 * 仕様:
 * - fetchWithErrorHandling(url) という関数を実装
 * - 200: 正常に処理
 * - 404: 'リソースが見つかりません' エラー
 * - 500: 'サーバーエラー' エラー
 * - その他: 'HTTP エラー: {status}' エラー
 */

async function fetchWithErrorHandling(url) {
  // ここにコードを書く
}

// テスト（手動でテストする場合のコメント例）
console.log('\n問題11: エラーレスポンスの処理');
// fetchWithErrorHandling('https://jsonplaceholder.typicode.com/users/1')
//   .then(data => console.log('成功:', data))
//   .catch(error => console.error('エラー:', error.message));

/**
 * 問題 12: リクエストのキャンセル
 * 進行中のリクエストをキャンセルできる仕組みを実装してください。
 *
 * 仕様:
 * - CancellableFetch クラスを実装
 * - fetch(url) メソッドでリクエスト開始
 * - cancel() メソッドでキャンセル
 * - AbortController を使用
 */

class CancellableFetch {
  // ここにコードを書く
}

// テスト
console.log('\n問題12: リクエストのキャンセル');
const cancellable = new CancellableFetch();

cancellable
  .fetch('https://jsonplaceholder.typicode.com/users/1')
  .then((data) => console.log('取得成功:', data.name))
  .catch((error) => console.error('キャンセルまたはエラー:', error.message));

// 500ms 後にキャンセル
setTimeout(() => {
  console.log('リクエストをキャンセル');
  cancellable.cancel();
}, 500);
