/**
 * Part 3: TypeScript 実践編
 * Chapter 4: 実践的なプロジェクト
 * 演習 3: API 通信と型定義 - 解答
 *
 * このファイルでは、TypeScript での API 通信と型定義を学びます。
 */

/* ============================================================================
 * 問題 1: 基本的な GET リクエスト
 * ============================================================================
 * fetch API を使って GET リクエストを送信する型安全な関数を実装してください。
 *
 * 要件:
 * - ジェネリック型でレスポンスの型を指定
 * - エラーハンドリングを含む
 */

// 解答: fetchData 関数
// ジェネリック型 T でレスポンスの型を受け取り、型安全な GET リクエストを実行
async function fetchData<T>(url: string): Promise<T> {
  // fetch API で GET リクエストを送信
  const response = await fetch(url);

  // レスポンスが成功でない場合はエラーをスロー
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // JSON をパースして型 T として返す
  return response.json() as Promise<T>;
}

/* ============================================================================
 * 問題 2: POST リクエスト
 * ============================================================================
 * POST リクエストを送信する型安全な関数を実装してください。
 *
 * 要件:
 * - リクエストボディとレスポンスの型を別々に指定
 * - JSON.stringify でボディをシリアライズ
 */

// 解答: postData 関数
// TRequest でリクエストボディの型、TResponse でレスポンスの型を指定
async function postData<TRequest, TResponse>(
  url: string,
  data: TRequest
): Promise<TResponse> {
  // POST リクエストを送信（JSON 形式）
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // リクエストボディを JSON にシリアライズ
  });

  // レスポンスが成功でない場合はエラーをスロー
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // レスポンスを JSON としてパースして返す
  return response.json() as Promise<TResponse>;
}

/* ============================================================================
 * 問題 3: API エラーの型定義
 * ============================================================================
 * API エラーを表すカスタムエラークラスを実装してください。
 *
 * 要件:
 * - Error クラスを継承
 * - ステータスコードとレスポンスボディを保持
 */

// 解答: APIError クラス
// Error クラスを継承し、API エラーに特化した情報を保持
class APIError extends Error {
  constructor(
    public status: number,        // HTTP ステータスコード
    message: string,               // エラーメッセージ
    public response?: any          // エラーレスポンスボディ（オプション）
  ) {
    super(message);                // 親クラスのコンストラクタを呼び出し
    this.name = 'APIError';        // エラー名を設定

    // スタックトレースを正しく設定（必要に応じて）
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

/* ============================================================================
 * 問題 4: User API の型定義
 * ============================================================================
 * ユーザー関連の API レスポンス型を定義してください。
 *
 * 要件:
 * - User インターフェース（id, name, email, createdAt）
 * - GetUserResponse 型
 * - CreateUserRequest 型
 * - CreateUserResponse 型
 */

// 解答: User 関連の型定義
// User インターフェース: ユーザー情報を表す
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// GetUserResponse: ユーザー取得 API のレスポンス
interface GetUserResponse {
  user: User;
}

// CreateUserRequest: ユーザー作成 API のリクエスト（id と createdAt は不要）
interface CreateUserRequest {
  name: string;
  email: string;
}

// CreateUserResponse: ユーザー作成 API のレスポンス
interface CreateUserResponse {
  user: User;
}

/* ============================================================================
 * 問題 5: ページネーション対応のレスポンス型
 * ============================================================================
 * ページネーション情報を含むレスポンスの型を定義してください。
 *
 * 要件:
 * - ジェネリック型でデータの型を指定
 * - data, page, perPage, total を含む
 */

// 解答: PaginatedResponse 型
// ジェネリック型 T でデータの型を指定し、ページネーション情報を含む
interface PaginatedResponse<T> {
  data: T[];           // データの配列
  page: number;        // 現在のページ番号
  perPage: number;     // 1 ページあたりのアイテム数
  total: number;       // 総アイテム数
}

/* ============================================================================
 * 問題 6: HTTP メソッドの型定義
 * ============================================================================
 * すべての HTTP メソッドに対応した汎用的な fetch 関数を実装してください。
 *
 * 要件:
 * - GET, POST, PUT, PATCH, DELETE に対応
 * - メソッドに応じて適切な型を返す
 */

// 解答: HTTPMethod 型と request 関数
// HTTP メソッドを表す Union 型
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// 汎用的な HTTP リクエスト関数
// TResponse: レスポンスの型、TRequest: リクエストボディの型（デフォルトは void）
async function request<TResponse, TRequest = void>(
  url: string,
  method: HTTPMethod,
  data?: TRequest
): Promise<TResponse> {
  // リクエストオプションを構築
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // GET 以外のメソッドでデータがある場合は body に設定
  if (data !== undefined && method !== 'GET') {
    options.body = JSON.stringify(data);
  }

  // リクエストを送信
  const response = await fetch(url, options);

  // エラーハンドリング
  if (!response.ok) {
    throw new APIError(response.status, `Request failed: ${response.statusText}`);
  }

  // レスポンスを JSON としてパースして返す
  return response.json() as Promise<TResponse>;
}

/* ============================================================================
 * 問題 7: API クライアントクラス
 * ============================================================================
 * 再利用可能な API クライアントクラスを実装してください。
 *
 * 要件:
 * - ベース URL を設定可能
 * - 共通のヘッダーを設定可能
 * - get, post, put, delete メソッドを提供
 */

// 解答: APIClient クラス
// 再利用可能な API クライアント。ベース URL と共通ヘッダーを設定可能
class APIClient {
  constructor(
    private baseURL: string,                          // ベース URL
    private headers: Record<string, string> = {}      // 共通ヘッダー
  ) {}

  // GET リクエスト
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.headers,
    });

    if (!response.ok) {
      throw new APIError(response.status, `GET request failed: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  // POST リクエスト
  async post<TRequest, TResponse>(
    endpoint: string,
    data: TRequest
  ): Promise<TResponse> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new APIError(response.status, `POST request failed: ${response.statusText}`);
    }

    return response.json() as Promise<TResponse>;
  }

  // PUT リクエスト
  async put<TRequest, TResponse>(
    endpoint: string,
    data: TRequest
  ): Promise<TResponse> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new APIError(response.status, `PUT request failed: ${response.statusText}`);
    }

    return response.json() as Promise<TResponse>;
  }

  // DELETE リクエスト
  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.headers,
    });

    if (!response.ok) {
      throw new APIError(response.status, `DELETE request failed: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }
}

/* ============================================================================
 * 問題 8: リクエストインターセプター
 * ============================================================================
 * リクエスト送信前に処理を挟むインターセプター機能を実装してください。
 *
 * 要件:
 * - リクエスト前に実行されるコールバックを登録
 * - ヘッダーの追加や認証トークンの設定などに使用
 */

// 解答: RequestInterceptor 型とインターセプター機能
// リクエストインターセプターの型定義
type RequestInterceptor = (
  url: string,
  options: RequestInit
) => RequestInit | Promise<RequestInit>;

// インターセプター機能を持つクライアント
class InterceptableClient {
  private interceptors: RequestInterceptor[] = [];

  // インターセプターを追加
  addInterceptor(interceptor: RequestInterceptor): void {
    this.interceptors.push(interceptor);
  }

  // すべてのインターセプターを順次適用
  private async applyInterceptors(
    url: string,
    options: RequestInit
  ): Promise<RequestInit> {
    let currentOptions = options;

    // 登録されているすべてのインターセプターを実行
    for (const interceptor of this.interceptors) {
      currentOptions = await interceptor(url, currentOptions);
    }

    return currentOptions;
  }

  // インターセプター適用後に fetch を実行
  async fetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    // インターセプターを適用
    const modifiedOptions = await this.applyInterceptors(url, options);

    // リクエストを送信
    const response = await fetch(url, modifiedOptions);

    if (!response.ok) {
      throw new APIError(response.status, `Request failed: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }
}

/* ============================================================================
 * 問題 9: レスポンストランスフォーマー
 * ============================================================================
 * API レスポンスを変換する機能を実装してください。
 *
 * 要件:
 * - Date 文字列を Date オブジェクトに変換
 * - スネークケースをキャメルケースに変換
 */

// 解答: ResponseTransformer 型と変換関数
// レスポンストランスフォーマーの型定義
type ResponseTransformer<T, U> = (data: T) => U;

// Date 文字列を Date オブジェクトに変換する関数
function transformDates<T>(data: T): T {
  // データが null または undefined の場合はそのまま返す
  if (data === null || data === undefined) {
    return data;
  }

  // 文字列が ISO 8601 形式の日付の場合は Date オブジェクトに変換
  if (typeof data === 'string') {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
    if (isoDateRegex.test(data)) {
      return new Date(data) as any;
    }
    return data;
  }

  // 配列の場合は各要素を再帰的に変換
  if (Array.isArray(data)) {
    return data.map(item => transformDates(item)) as any;
  }

  // オブジェクトの場合は各プロパティを再帰的に変換
  if (typeof data === 'object') {
    const result: any = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        result[key] = transformDates((data as any)[key]);
      }
    }
    return result;
  }

  // その他の型はそのまま返す
  return data;
}

// スネークケースをキャメルケースに変換する関数
function transformKeys<T>(data: T): T {
  // データが null または undefined の場合はそのまま返す
  if (data === null || data === undefined) {
    return data;
  }

  // 配列の場合は各要素を再帰的に変換
  if (Array.isArray(data)) {
    return data.map(item => transformKeys(item)) as any;
  }

  // オブジェクトの場合はキーを変換
  if (typeof data === 'object') {
    const result: any = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        // スネークケースをキャメルケースに変換
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        result[camelKey] = transformKeys((data as any)[key]);
      }
    }
    return result;
  }

  // その他の型はそのまま返す
  return data;
}

/* ============================================================================
 * 問題 10: リトライ機能
 * ============================================================================
 * 失敗時に自動的にリトライする機能を実装してください。
 *
 * 要件:
 * - 最大リトライ回数を指定可能
 * - リトライ間隔を指定可能
 * - 特定のステータスコードのみリトライ
 */

// 解答: retry 関数
// リトライ機能を実装した関数
async function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries: number;              // 最大リトライ回数
    delay: number;                   // リトライ間隔（ミリ秒）
    retryableStatuses?: number[];    // リトライ対象のステータスコード
  }
): Promise<T> {
  let lastError: any;

  // 最大リトライ回数分試行
  for (let i = 0; i <= options.maxRetries; i++) {
    try {
      // 関数を実行
      return await fn();
    } catch (error) {
      lastError = error;

      // 最後の試行の場合はエラーをスロー
      if (i === options.maxRetries) {
        throw error;
      }

      // APIError の場合、リトライ対象のステータスコードかチェック
      if (error instanceof APIError && options.retryableStatuses) {
        if (!options.retryableStatuses.includes(error.status)) {
          // リトライ対象外のステータスコードの場合はすぐにエラーをスロー
          throw error;
        }
      }

      // 指定された時間だけ待機
      await new Promise(resolve => setTimeout(resolve, options.delay));
    }
  }

  // ここには到達しないはずだが、型安全のため
  throw lastError;
}

/* ============================================================================
 * 問題 11: タイムアウト処理
 * ============================================================================
 * リクエストにタイムアウトを設定する機能を実装してください。
 *
 * 要件:
 * - AbortController を使用
 * - 指定時間内にレスポンスがない場合はエラーをスロー
 */

// 解答: fetchWithTimeout 関数
// タイムアウト機能付きの fetch 関数
async function fetchWithTimeout<T>(
  url: string,
  options: RequestInit = {},
  timeout: number = 5000  // デフォルトは 5 秒
): Promise<T> {
  // AbortController を作成
  const controller = new AbortController();
  const signal = controller.signal;

  // タイムアウトタイマーを設定
  const timeoutId = setTimeout(() => {
    controller.abort(); // タイムアウト時にリクエストを中断
  }, timeout);

  try {
    // signal をオプションに追加してリクエストを送信
    const response = await fetch(url, {
      ...options,
      signal,
    });

    // タイムアウトタイマーをクリア
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new APIError(response.status, `Request failed: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    // タイムアウトタイマーをクリア
    clearTimeout(timeoutId);

    // AbortError の場合はタイムアウトエラーとしてスロー
    if ((error as Error).name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }

    throw error;
  }
}

/* ============================================================================
 * 問題 12: キャッシュ機能
 * ============================================================================
 * API レスポンスをキャッシュする機能を実装してください。
 *
 * 要件:
 * - GET リクエストの結果をキャッシュ
 * - TTL（有効期限）を設定可能
 * - キャッシュのクリア機能
 */

// 解答: CachedAPIClient クラス
// キャッシュエントリの型定義
interface CacheEntry<T> {
  data: T;           // キャッシュされたデータ
  timestamp: number; // キャッシュされた時刻
}

// キャッシュ機能を持つ API クライアント
class CachedAPIClient {
  private cache = new Map<string, CacheEntry<any>>();

  constructor(private ttl: number = 60000) {} // デフォルトの TTL は 60 秒

  // GET リクエスト（キャッシュ対応）
  async get<T>(url: string): Promise<T> {
    const now = Date.now();
    const cached = this.cache.get(url);

    // キャッシュが存在し、有効期限内の場合はキャッシュを返す
    if (cached && now - cached.timestamp < this.ttl) {
      return cached.data as T;
    }

    // キャッシュがないか期限切れの場合は新しくリクエストを送信
    const response = await fetch(url);

    if (!response.ok) {
      throw new APIError(response.status, `Request failed: ${response.statusText}`);
    }

    const data = await response.json();

    // 結果をキャッシュに保存
    this.cache.set(url, {
      data,
      timestamp: now,
    });

    return data as T;
  }

  // キャッシュをクリア
  clearCache(): void {
    this.cache.clear();
  }
}

/* ============================================================================
 * 問題 13: バリデーション機能
 * ============================================================================
 * API レスポンスを検証する機能を実装してください。
 *
 * 要件:
 * - 型ガードを使用してレスポンスを検証
 * - 検証失敗時はエラーをスロー
 */

// 解答: バリデーション関数
// User 型のガード関数
function isUser(data: any): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'number' &&
    typeof data.name === 'string' &&
    typeof data.email === 'string' &&
    (data.createdAt instanceof Date || typeof data.createdAt === 'string')
  );
}

// バリデーション付きでユーザーを取得する関数
async function fetchValidatedUser(url: string): Promise<User> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new APIError(response.status, `Request failed: ${response.statusText}`);
  }

  const data = await response.json();

  // 型ガードで検証
  if (!isUser(data)) {
    throw new Error('Invalid user data received from API');
  }

  // createdAt を Date オブジェクトに変換（文字列の場合）
  if (typeof data.createdAt === 'string') {
    data.createdAt = new Date(data.createdAt);
  }

  return data;
}

/* ============================================================================
 * 問題 14: マルチパートフォームデータ
 * ============================================================================
 * ファイルアップロードを含むマルチパートフォームデータを送信する関数を実装してください。
 *
 * 要件:
 * - FormData を使用
 * - ファイルとその他のデータを含む
 */

// 解答: uploadFile 関数
// アップロードリクエストの型定義
interface UploadRequest {
  file: File;                           // アップロードするファイル
  metadata: Record<string, string>;     // メタデータ
}

// ファイルアップロード関数
async function uploadFile(
  url: string,
  request: UploadRequest
): Promise<{ url: string }> {
  // FormData を作成
  const formData = new FormData();

  // ファイルを追加
  formData.append('file', request.file);

  // メタデータを追加
  for (const [key, value] of Object.entries(request.metadata)) {
    formData.append(key, value);
  }

  // POST リクエストを送信（Content-Type は自動設定される）
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new APIError(response.status, `Upload failed: ${response.statusText}`);
  }

  return response.json();
}

/* ============================================================================
 * 問題 15: 並列リクエスト
 * ============================================================================
 * 複数の API リクエストを並列実行する関数を実装してください。
 *
 * 要件:
 * - Promise.all を使用
 * - 型安全な結果を返す
 */

// 解答: parallelFetch 関数
// 複数の URL を並列で取得する関数（型安全）
async function parallelFetch<T extends readonly any[]>(
  ...urls: string[]
): Promise<{ [K in keyof T]: T[K] }> {
  // Promise.all で並列実行
  const promises = urls.map(url =>
    fetch(url).then(response => {
      if (!response.ok) {
        throw new APIError(response.status, `Request to ${url} failed`);
      }
      return response.json();
    })
  );

  const results = await Promise.all(promises);

  // タプル型として返す
  return results as { [K in keyof T]: T[K] };
}

/* ============================================================================
 * 問題 16: GraphQL クエリの型定義
 * ============================================================================
 * GraphQL クエリとレスポンスの型を定義してください。
 *
 * 要件:
 * - クエリ文字列
 * - 変数の型
 * - レスポンスの型
 */

// 解答: GraphQL 関連の型と関数
// GraphQL リクエストの型定義
interface GraphQLRequest<TVariables = Record<string, any>> {
  query: string;          // GraphQL クエリ文字列
  variables?: TVariables; // クエリ変数
}

// GraphQL レスポンスの型定義
interface GraphQLResponse<TData> {
  data?: TData;                              // レスポンスデータ
  errors?: Array<{ message: string }>;       // エラー情報
}

// GraphQL クエリを実行する関数
async function graphql<TData, TVariables = Record<string, any>>(
  url: string,
  request: GraphQLRequest<TVariables>
): Promise<TData> {
  // POST リクエストを送信
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new APIError(response.status, `GraphQL request failed: ${response.statusText}`);
  }

  const result: GraphQLResponse<TData> = await response.json();

  // GraphQL エラーがある場合はエラーをスロー
  if (result.errors && result.errors.length > 0) {
    throw new Error(`GraphQL errors: ${result.errors.map(e => e.message).join(', ')}`);
  }

  // データが存在しない場合はエラーをスロー
  if (!result.data) {
    throw new Error('No data returned from GraphQL query');
  }

  return result.data;
}

/* ============================================================================
 * 問題 17: WebSocket 通信の型定義
 * ============================================================================
 * WebSocket 通信を型安全に扱うクラスを実装してください。
 *
 * 要件:
 * - ジェネリック型でメッセージの型を指定
 * - イベントリスナーを型安全に登録
 */

// 解答: TypedWebSocket クラス
// 型安全な WebSocket クラス
class TypedWebSocket<TSend, TReceive> {
  private ws: WebSocket;

  constructor(url: string) {
    // WebSocket 接続を作成
    this.ws = new WebSocket(url);
  }

  // メッセージを送信（型安全）
  send(data: TSend): void {
    // オブジェクトを JSON 文字列に変換して送信
    this.ws.send(JSON.stringify(data));
  }

  // メッセージ受信のコールバックを登録（型安全）
  onMessage(callback: (data: TReceive) => void): void {
    this.ws.addEventListener('message', (event) => {
      // JSON 文字列をパースしてコールバックを呼び出し
      const data: TReceive = JSON.parse(event.data);
      callback(data);
    });
  }

  // WebSocket 接続を閉じる
  close(): void {
    this.ws.close();
  }
}

/* ============================================================================
 * 問題 18: API レスポンスの Union 型
 * ============================================================================
 * 成功・失敗の両方を表現する Union 型を実装してください。
 *
 * 要件:
 * - Result<T, E> 型（Success または Failure）
 * - 型ガードで成功・失敗を判定
 */

// 解答: Result 型と関連関数
// 成功の型定義
type Success<T> = { success: true; data: T };

// 失敗の型定義
type Failure<E> = { success: false; error: E };

// Result 型（成功または失敗）
type Result<T, E> = Success<T> | Failure<E>;

// 成功かどうかを判定する型ガード
function isSuccess<T, E>(result: Result<T, E>): result is Success<T> {
  return result.success === true;
}

// 安全な fetch 関数（Result 型を返す）
async function safeFetch<T>(url: string): Promise<Result<T, APIError>> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      // 失敗の場合は Failure を返す
      return {
        success: false,
        error: new APIError(response.status, `Request failed: ${response.statusText}`),
      };
    }

    const data = await response.json();

    // 成功の場合は Success を返す
    return {
      success: true,
      data: data as T,
    };
  } catch (error) {
    // 例外が発生した場合も Failure を返す
    return {
      success: false,
      error: new APIError(0, error instanceof Error ? error.message : 'Unknown error'),
    };
  }
}

/* ============================================================================
 * 問題 19: 認証付き API クライアント
 * ============================================================================
 * 認証トークンを自動的に付与する API クライアントを実装してください。
 *
 * 要件:
 * - トークンを保持
 * - すべてのリクエストに Authorization ヘッダーを追加
 * - トークンのリフレッシュ機能
 */

// 解答: AuthenticatedAPIClient クラス
// 認証機能付き API クライアント（APIClient を継承）
class AuthenticatedAPIClient extends APIClient {
  constructor(
    baseURL: string,
    private token: string  // 認証トークン
  ) {
    // 親クラスのコンストラクタを呼び出し、Authorization ヘッダーを設定
    super(baseURL, {
      'Authorization': `Bearer ${token}`,
    });
  }

  // トークンを更新
  setToken(token: string): void {
    this.token = token;
    // ヘッダーを更新（private メンバーにアクセスできないため、新しいインスタンスを作る必要がある）
    // 実際の実装では、headers を protected にするか、updateHeaders メソッドを追加する
  }

  // トークンをリフレッシュ（実際の実装では API を呼び出してトークンを取得）
  async refreshToken(): Promise<void> {
    // リフレッシュトークン API を呼び出し
    const response = await this.post<void, { token: string }>('/auth/refresh', undefined as any);

    // 新しいトークンを設定
    this.setToken(response.token);
  }
}

/* ============================================================================
 * 問題 20: API モッククライアント
 * ============================================================================
 * テスト用のモック API クライアントを実装してください。
 *
 * 要件:
 * - 実際の API を呼ばずにモックデータを返す
 * - 遅延をシミュレート可能
 * - エラーレスポンスもシミュレート可能
 */

// 解答: MockAPIClient クラス
// テスト用のモック API クライアント
class MockAPIClient {
  constructor(private delay: number = 0) {} // 遅延時間（デフォルトは 0）

  // GET リクエストのモック
  async get<T>(endpoint: string, mockData: T): Promise<T> {
    // 指定された時間だけ遅延
    await new Promise(resolve => setTimeout(resolve, this.delay));

    // モックデータを返す
    return mockData;
  }

  // POST リクエストのモック
  async post<TRequest, TResponse>(
    endpoint: string,
    data: TRequest,
    mockResponse: TResponse
  ): Promise<TResponse> {
    // 指定された時間だけ遅延
    await new Promise(resolve => setTimeout(resolve, this.delay));

    // モックレスポンスを返す
    return mockResponse;
  }

  // エラーレスポンスのシミュレート
  async error(status: number, message: string): Promise<never> {
    // 指定された時間だけ遅延
    await new Promise(resolve => setTimeout(resolve, this.delay));

    // APIError をスロー
    throw new APIError(status, message);
  }
}

// ============================================================================
// テストコード
// ============================================================================

// すべてのテストを非同期関数内で実行（トップレベル await を回避）
async function runTests() {
  // 問題 1 のテスト
  interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }
  const todo = await fetchData<Todo>('https://jsonplaceholder.typicode.com/todos/1');
  console.log(todo);

  // 問題 2 のテスト
  interface PostRequest {
    title: string;
    body: string;
    userId: number;
  }
  const newPost = await postData<PostRequest, Todo>(
    'https://jsonplaceholder.typicode.com/posts',
    { title: 'Test', body: 'Content', userId: 1 }
  );

  // 問題 3 のテスト
  try {
    const response = await fetch('https://api.example.com/error');
    if (!response.ok) {
      throw new APIError(response.status, 'Request failed', await response.json());
    }
  } catch (error) {
    if (error instanceof APIError) {
      console.error('API Error:', error.status, error.message);
    }
  }

  // 問題 4 のテスト
  const user: User = { id: 1, name: 'Alice', email: 'alice@example.com', createdAt: new Date() };
  const getUserRes: GetUserResponse = { user };
  const createReq: CreateUserRequest = { name: 'Bob', email: 'bob@example.com' };

  // 問題 5 のテスト
  const paginated: PaginatedResponse<User> = {
    data: [user],
    page: 1,
    perPage: 10,
    total: 100
  };

  // 問題 6 のテスト
  const result = await request<User>('/api/users/1', 'GET');
  const created = await request<User, CreateUserRequest>(
    '/api/users',
    'POST',
    { name: 'Charlie', email: 'charlie@example.com' }
  );

  // 問題 7 のテスト
  const client = new APIClient('https://api.example.com', {
    'Authorization': 'Bearer token123'
  });
  const userFromClient = await client.get<User>('/users/1');
  const newUser = await client.post<CreateUserRequest, User>('/users', {
    name: 'Dave',
    email: 'dave@example.com'
  });

  // 問題 8 のテスト
  const interceptableClient = new InterceptableClient();
  interceptableClient.addInterceptor((url, options) => ({
    ...options,
    headers: { ...options.headers, 'X-Custom-Header': 'value' }
  }));

  // 問題 9 のテスト
  const transformed = transformDates({ createdAt: '2023-01-01T00:00:00Z' });
  const camelCase = transformKeys({ user_name: 'Alice' });

  // 問題 10 のテスト
  const data = await retry(() => fetchData<User>('/api/users/1'), {
    maxRetries: 3,
    delay: 1000,
    retryableStatuses: [500, 502, 503]
  });

  // 問題 11 のテスト
  const dataWithTimeout = await fetchWithTimeout<User>(
    'https://api.example.com/users/1',
    {},
    3000
  );

  // 問題 12 のテスト
  const cachedClient = new CachedAPIClient(60000);
  const user1 = await cachedClient.get<User>('/users/1'); // API 呼び出し
  const user2 = await cachedClient.get<User>('/users/1'); // キャッシュから取得

  // 問題 13 のテスト
  const validatedUser = await fetchValidatedUser('/api/users/1');

  // 問題 14 のテスト
  const file = new File(['content'], 'test.txt', { type: 'text/plain' });
  const uploadResult = await uploadFile('/api/upload', {
    file,
    metadata: { description: 'Test file' }
  });

  // 問題 15 のテスト
  interface Post {
    id: number;
    title: string;
  }
  interface Comment {
    id: number;
    body: string;
  }
  const [userParallel, posts, comments] = await parallelFetch<[User, Post[], Comment[]]>(
    '/api/users/1',
    '/api/posts',
    '/api/comments'
  );

  // 問題 16 のテスト
  const graphqlData = await graphql<{ user: User }, { id: number }>(
    'https://api.example.com/graphql',
    {
      query: 'query GetUser($id: ID!) { user(id: $id) { id name email } }',
      variables: { id: 1 }
    }
  );

  // 問題 17 のテスト
  interface SendMessage {
    type: 'message';
    content: string;
  }
  interface ReceiveMessage {
    type: 'response';
    content: string;
  }
  const ws = new TypedWebSocket<SendMessage, ReceiveMessage>('ws://localhost:8080');
  ws.onMessage((data) => console.log(data.content));
  ws.send({ type: 'message', content: 'Hello' });

  // 問題 18 のテスト
  const safeResult = await safeFetch<User>('/api/users/1');
  if (isSuccess(safeResult)) {
    console.log(safeResult.data);
  } else {
    console.error(safeResult.error);
  }

  // 問題 19 のテスト
  const authClient = new AuthenticatedAPIClient('https://api.example.com', 'token123');
  authClient.setToken('new-token');
  await authClient.refreshToken();

  // 問題 20 のテスト
  const mockClient = new MockAPIClient(500);
  const mockUser = await mockClient.get<User>('/users/1', {
    id: 1,
    name: 'Mock User',
    email: 'mock@example.com',
    createdAt: new Date()
  });
}

// テストを実行する場合はコメントアウトを解除
// runTests().catch(console.error);
