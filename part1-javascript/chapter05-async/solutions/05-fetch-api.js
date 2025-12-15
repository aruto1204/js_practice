// 解答例 5: fetch API

/**
 * 注意: Node.js v18 以上が必要です（fetch APIがネイティブサポート）
 */

/**
 * 問題 1: 基本的な GET リクエスト
 */

async function fetchUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();

    console.log('取得したユーザー:');
    users.forEach((user) => {
      console.log(`- ${user.name} (${user.email})`);
    });

    return users;
  } catch (error) {
    console.error('ユーザー取得エラー:', error.message);
    throw error;
  }
}

// テスト
console.log('問題1: ユーザー一覧取得');
// fetchUsers();

/**
 * 問題 2: 単一リソースの取得
 */

async function fetchUser(userId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );

    if (response.status === 404) {
      throw new Error('ユーザーが見つかりません');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('ユーザー取得エラー:', error.message);
    throw error;
  }
}

// テスト
console.log('\n問題2: 単一ユーザー取得');
// fetchUser(1).then((user) => console.log('ユーザー:', user));
// fetchUser(999).catch((error) => console.error('エラー:', error.message));

/**
 * 問題 3: POST リクエスト
 */

async function createPost(title, body, userId) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const post = await response.json();
    console.log('作成された投稿ID:', post.id);
    return post;
  } catch (error) {
    console.error('投稿作成エラー:', error.message);
    throw error;
  }
}

// テスト
console.log('\n問題3: 投稿作成');
// createPost('テストタイトル', 'テスト本文', 1).then((post) =>
//   console.log('作成された投稿:', post)
// );

/**
 * 問題 4: PUT リクエスト（更新）
 */

async function updatePost(postId, title, body) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: postId,
          title,
          body,
          userId: 1,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const post = await response.json();
    return post;
  } catch (error) {
    console.error('投稿更新エラー:', error.message);
    throw error;
  }
}

// テスト
console.log('\n問題4: 投稿更新');
// updatePost(1, '更新されたタイトル', '更新された本文').then((post) =>
//   console.log('更新された投稿:', post)
// );

/**
 * 問題 5: DELETE リクエスト
 */

async function deletePost(postId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: 'DELETE',
      }
    );

    return response.ok;
  } catch (error) {
    console.error('投稿削除エラー:', error.message);
    return false;
  }
}

// テスト
console.log('\n問題5: 投稿削除');
// deletePost(1).then((success) => console.log('削除成功:', success));

/**
 * 問題 6: 複数のリソースを並列取得
 */

async function getUserWithPosts(userId) {
  try {
    const [userResponse, postsResponse] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
    ]);

    if (!userResponse.ok || !postsResponse.ok) {
      throw new Error('データ取得に失敗しました');
    }

    const user = await userResponse.json();
    const posts = await postsResponse.json();

    return { user, posts };
  } catch (error) {
    console.error('データ取得エラー:', error.message);
    throw error;
  }
}

// テスト
console.log('\n問題6: ユーザーと投稿を並列取得');
// getUserWithPosts(1).then((data) => {
//   console.log('ユーザー:', data.user.name);
//   console.log('投稿数:', data.posts.length);
// });

/**
 * 問題 7: タイムアウト処理
 */

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('リクエストがタイムアウトしました');
    }
    throw error;
  }
}

// テスト
console.log('\n問題7: タイムアウト処理');
// fetchWithTimeout('https://jsonplaceholder.typicode.com/users/1', 5000)
//   .then((data) => console.log('成功:', data.name))
//   .catch((error) => console.error('エラー:', error.message));

/**
 * 問題 8: リトライ機能付きフェッチ
 */

async function fetchWithRetry(url, maxRetries) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`試行 ${attempt}/${maxRetries}`);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log(`失敗: ${error.message}`);
      lastError = error;

      if (attempt < maxRetries) {
        console.log('1秒後にリトライします...');
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  throw lastError;
}

// テスト
console.log('\n問題8: リトライ機能');
// fetchWithRetry('https://jsonplaceholder.typicode.com/invalid', 3)
//   .then((data) => console.log('成功:', data))
//   .catch((error) => console.error('最終的に失敗:', error.message));

/**
 * 問題 9: レスポンスのキャッシュ
 */

class CachedFetcher {
  constructor() {
    this.cache = new Map();
  }

  async fetch(url) {
    // キャッシュに存在する場合
    if (this.cache.has(url)) {
      console.log('キャッシュからデータを返します');
      return this.cache.get(url);
    }

    // キャッシュにない場合はフェッチ
    console.log('APIからデータを取得します');
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    this.cache.set(url, data);
    return data;
  }

  clear() {
    this.cache.clear();
  }
}

// テスト
console.log('\n問題9: レスポンスのキャッシュ');
// const fetcher = new CachedFetcher();
// (async () => {
//   console.log('1回目のリクエスト:');
//   console.time('1回目');
//   await fetcher.fetch('https://jsonplaceholder.typicode.com/users/1');
//   console.timeEnd('1回目');

//   console.log('2回目のリクエスト（キャッシュから）:');
//   console.time('2回目');
//   const user = await fetcher.fetch('https://jsonplaceholder.typicode.com/users/1');
//   console.timeEnd('2回目');
//   console.log('ユーザー:', user.name);
// })();

/**
 * 問題 10: ページネーション処理
 */

async function fetchAllPosts() {
  const allPosts = [];
  const limit = 10;
  const totalPages = 10; // 総件数100件と仮定

  const fetchPromises = [];

  for (let page = 1; page <= totalPages; page++) {
    const promise = fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
    ).then((response) => response.json());

    fetchPromises.push(promise);
  }

  const results = await Promise.all(fetchPromises);

  results.forEach((posts) => {
    allPosts.push(...posts);
  });

  return allPosts;
}

// テスト
console.log('\n問題10: ページネーション処理');
// fetchAllPosts().then((posts) => {
//   console.log('取得した投稿数:', posts.length);
// });

/**
 * 問題 11: エラーレスポンスの処理
 */

async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);

    if (response.status === 404) {
      throw new Error('リソースが見つかりません');
    } else if (response.status >= 500) {
      throw new Error('サーバーエラー');
    } else if (!response.ok) {
      throw new Error(`HTTP エラー: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('エラー:', error.message);
    throw error;
  }
}

// テスト
console.log('\n問題11: エラーレスポンスの処理');
// fetchWithErrorHandling('https://jsonplaceholder.typicode.com/users/1')
//   .then((data) => console.log('成功:', data))
//   .catch((error) => console.error('エラー:', error.message));

/**
 * 問題 12: リクエストのキャンセル
 */

class CancellableFetch {
  constructor() {
    this.controller = null;
  }

  fetch(url) {
    this.controller = new AbortController();

    return fetch(url, {
      signal: this.controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          throw new Error('リクエストがキャンセルされました');
        }
        throw error;
      });
  }

  cancel() {
    if (this.controller) {
      this.controller.abort();
    }
  }
}

// テスト
console.log('\n問題12: リクエストのキャンセル');
// const cancellable = new CancellableFetch();

// cancellable
//   .fetch('https://jsonplaceholder.typicode.com/users/1')
//   .then((data) => console.log('取得成功:', data.name))
//   .catch((error) => console.error('キャンセルまたはエラー:', error.message));

// // 500ms 後にキャンセル
// setTimeout(() => {
//   console.log('リクエストをキャンセル');
//   cancellable.cancel();
// }, 500);
