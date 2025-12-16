/**
 * Part 3: TypeScript 実践編
 * Chapter 4: 実践的なプロジェクト
 * 演習 3: API 通信と型定義
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

// TODO: fetchData 関数を実装
// async function fetchData<T>(url: string): Promise<T> {
//   ...
// }

/* ============================================================================
 * 問題 2: POST リクエスト
 * ============================================================================
 * POST リクエストを送信する型安全な関数を実装してください。
 *
 * 要件:
 * - リクエストボディとレスポンスの型を別々に指定
 * - JSON.stringify でボディをシリアライズ
 */

// TODO: postData 関数を実装
// async function postData<TRequest, TResponse>(
//   url: string,
//   data: TRequest
// ): Promise<TResponse> {
//   ...
// }

/* ============================================================================
 * 問題 3: API エラーの型定義
 * ============================================================================
 * API エラーを表すカスタムエラークラスを実装してください。
 *
 * 要件:
 * - Error クラスを継承
 * - ステータスコードとレスポンスボディを保持
 */

// TODO: APIError クラスを実装
// class APIError extends Error {
//   constructor(
//     public status: number,
//     message: string,
//     public response?: any
//   ) {
//     ...
//   }
// }

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

// TODO: User 関連の型を定義
// interface User {
//   ...
// }
//
// interface GetUserResponse {
//   ...
// }
//
// interface CreateUserRequest {
//   ...
// }
//
// interface CreateUserResponse {
//   ...
// }

/* ============================================================================
 * 問題 5: ページネーション対応のレスポンス型
 * ============================================================================
 * ページネーション情報を含むレスポンスの型を定義してください。
 *
 * 要件:
 * - ジェネリック型でデータの型を指定
 * - data, page, perPage, total を含む
 */

// TODO: PaginatedResponse 型を定義
// interface PaginatedResponse<T> {
//   ...
// }

/* ============================================================================
 * 問題 6: HTTP メソッドの型定義
 * ============================================================================
 * すべての HTTP メソッドに対応した汎用的な fetch 関数を実装してください。
 *
 * 要件:
 * - GET, POST, PUT, PATCH, DELETE に対応
 * - メソッドに応じて適切な型を返す
 */

// TODO: HTTPMethod 型と request 関数を実装
// type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
//
// async function request<TResponse, TRequest = void>(
//   url: string,
//   method: HTTPMethod,
//   data?: TRequest
// ): Promise<TResponse> {
//   ...
// }

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

// TODO: APIClient クラスを実装
// class APIClient {
//   constructor(
//     private baseURL: string,
//     private headers: Record<string, string> = {}
//   ) {}
//
//   async get<T>(endpoint: string): Promise<T> {
//     ...
//   }
//
//   async post<TRequest, TResponse>(
//     endpoint: string,
//     data: TRequest
//   ): Promise<TResponse> {
//     ...
//   }
//
//   async put<TRequest, TResponse>(
//     endpoint: string,
//     data: TRequest
//   ): Promise<TResponse> {
//     ...
//   }
//
//   async delete<T>(endpoint: string): Promise<T> {
//     ...
//   }
// }

/* ============================================================================
 * 問題 8: リクエストインターセプター
 * ============================================================================
 * リクエスト送信前に処理を挟むインターセプター機能を実装してください。
 *
 * 要件:
 * - リクエスト前に実行されるコールバックを登録
 * - ヘッダーの追加や認証トークンの設定などに使用
 */

// TODO: RequestInterceptor 型とインターセプター機能を実装
// type RequestInterceptor = (
//   url: string,
//   options: RequestInit
// ) => RequestInit | Promise<RequestInit>;
//
// class InterceptableClient {
//   private interceptors: RequestInterceptor[] = [];
//
//   addInterceptor(interceptor: RequestInterceptor): void {
//     ...
//   }
//
//   private async applyInterceptors(
//     url: string,
//     options: RequestInit
//   ): Promise<RequestInit> {
//     ...
//   }
//
//   async fetch<T>(url: string, options: RequestInit = {}): Promise<T> {
//     ...
//   }
// }

/* ============================================================================
 * 問題 9: レスポンストランスフォーマー
 * ============================================================================
 * API レスポンスを変換する機能を実装してください。
 *
 * 要件:
 * - Date 文字列を Date オブジェクトに変換
 * - スネークケースをキャメルケースに変換
 */

// TODO: ResponseTransformer 型と変換関数を実装
// type ResponseTransformer<T, U> = (data: T) => U;
//
// function transformDates<T>(data: T): T {
//   // Date 文字列を Date オブジェクトに変換
//   ...
// }
//
// function transformKeys<T>(data: T): T {
//   // スネークケースをキャメルケースに変換
//   ...
// }

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

// TODO: retry 関数を実装
// async function retry<T>(
//   fn: () => Promise<T>,
//   options: {
//     maxRetries: number;
//     delay: number;
//     retryableStatuses?: number[];
//   }
// ): Promise<T> {
//   ...
// }

/* ============================================================================
 * 問題 11: タイムアウト処理
 * ============================================================================
 * リクエストにタイムアウトを設定する機能を実装してください。
 *
 * 要件:
 * - AbortController を使用
 * - 指定時間内にレスポンスがない場合はエラーをスロー
 */

// TODO: fetchWithTimeout 関数を実装
// async function fetchWithTimeout<T>(
//   url: string,
//   options: RequestInit = {},
//   timeout: number = 5000
// ): Promise<T> {
//   ...
// }

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

// TODO: CachedAPIClient クラスを実装
// interface CacheEntry<T> {
//   data: T;
//   timestamp: number;
// }
//
// class CachedAPIClient {
//   private cache = new Map<string, CacheEntry<any>>();
//
//   constructor(private ttl: number = 60000) {}
//
//   async get<T>(url: string): Promise<T> {
//     ...
//   }
//
//   clearCache(): void {
//     ...
//   }
// }

/* ============================================================================
 * 問題 13: バリデーション機能
 * ============================================================================
 * API レスポンスを検証する機能を実装してください。
 *
 * 要件:
 * - 型ガードを使用してレスポンスを検証
 * - 検証失敗時はエラーをスロー
 */

// TODO: バリデーション関数を実装
// function isUser(data: any): data is User {
//   ...
// }
//
// async function fetchValidatedUser(url: string): Promise<User> {
//   ...
// }

/* ============================================================================
 * 問題 14: マルチパートフォームデータ
 * ============================================================================
 * ファイルアップロードを含むマルチパートフォームデータを送信する関数を実装してください。
 *
 * 要件:
 * - FormData を使用
 * - ファイルとその他のデータを含む
 */

// TODO: uploadFile 関数を実装
// interface UploadRequest {
//   file: File;
//   metadata: Record<string, string>;
// }
//
// async function uploadFile(
//   url: string,
//   request: UploadRequest
// ): Promise<{ url: string }> {
//   ...
// }

/* ============================================================================
 * 問題 15: 並列リクエスト
 * ============================================================================
 * 複数の API リクエストを並列実行する関数を実装してください。
 *
 * 要件:
 * - Promise.all を使用
 * - 型安全な結果を返す
 */

// TODO: parallelFetch 関数を実装
// async function parallelFetch<T extends readonly any[]>(
//   ...urls: string[]
// ): Promise<{ [K in keyof T]: T[K] }> {
//   ...
// }

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

// TODO: GraphQL 関連の型と関数を実装
// interface GraphQLRequest<TVariables = Record<string, any>> {
//   query: string;
//   variables?: TVariables;
// }
//
// interface GraphQLResponse<TData> {
//   data?: TData;
//   errors?: Array<{ message: string }>;
// }
//
// async function graphql<TData, TVariables = Record<string, any>>(
//   url: string,
//   request: GraphQLRequest<TVariables>
// ): Promise<TData> {
//   ...
// }

/* ============================================================================
 * 問題 17: WebSocket 通信の型定義
 * ============================================================================
 * WebSocket 通信を型安全に扱うクラスを実装してください。
 *
 * 要件:
 * - ジェネリック型でメッセージの型を指定
 * - イベントリスナーを型安全に登録
 */

// TODO: TypedWebSocket クラスを実装
// class TypedWebSocket<TSend, TReceive> {
//   private ws: WebSocket;
//
//   constructor(url: string) {
//     ...
//   }
//
//   send(data: TSend): void {
//     ...
//   }
//
//   onMessage(callback: (data: TReceive) => void): void {
//     ...
//   }
//
//   close(): void {
//     ...
//   }
// }

/* ============================================================================
 * 問題 18: API レスポンスの Union 型
 * ============================================================================
 * 成功・失敗の両方を表現する Union 型を実装してください。
 *
 * 要件:
 * - Result<T, E> 型（Success または Failure）
 * - 型ガードで成功・失敗を判定
 */

// TODO: Result 型と関連関数を実装
// type Success<T> = { success: true; data: T };
// type Failure<E> = { success: false; error: E };
// type Result<T, E> = Success<T> | Failure<E>;
//
// function isSuccess<T, E>(result: Result<T, E>): result is Success<T> {
//   ...
// }
//
// async function safeFetch<T>(url: string): Promise<Result<T, APIError>> {
//   ...
// }

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

// TODO: AuthenticatedAPIClient クラスを実装
// class AuthenticatedAPIClient extends APIClient {
//   constructor(
//     baseURL: string,
//     private token: string
//   ) {
//     ...
//   }
//
//   setToken(token: string): void {
//     ...
//   }
//
//   async refreshToken(): Promise<void> {
//     ...
//   }
// }

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

// TODO: MockAPIClient クラスを実装
// class MockAPIClient {
//   constructor(private delay: number = 0) {}
//
//   async get<T>(endpoint: string, mockData: T): Promise<T> {
//     ...
//   }
//
//   async post<TRequest, TResponse>(
//     endpoint: string,
//     data: TRequest,
//     mockResponse: TResponse
//   ): Promise<TResponse> {
//     ...
//   }
//
//   async error(status: number, message: string): Promise<never> {
//     ...
//   }
// }

// ============================================================================
// テストコード
// ============================================================================

// 問題 1 のテスト
// interface Todo {
//   id: number;
//   title: string;
//   completed: boolean;
// }
// const todo = await fetchData<Todo>('https://jsonplaceholder.typicode.com/todos/1');
// console.log(todo);

// 問題 2 のテスト
// interface PostRequest {
//   title: string;
//   body: string;
//   userId: number;
// }
// const newPost = await postData<PostRequest, Todo>(
//   'https://jsonplaceholder.typicode.com/posts',
//   { title: 'Test', body: 'Content', userId: 1 }
// );

// 問題 3 のテスト
// try {
//   const response = await fetch('https://api.example.com/error');
//   if (!response.ok) {
//     throw new APIError(response.status, 'Request failed', await response.json());
//   }
// } catch (error) {
//   if (error instanceof APIError) {
//     console.error('API Error:', error.status, error.message);
//   }
// }

// 問題 4 のテスト
// const user: User = { id: 1, name: 'Alice', email: 'alice@example.com', createdAt: new Date() };
// const getUserRes: GetUserResponse = { user };
// const createReq: CreateUserRequest = { name: 'Bob', email: 'bob@example.com' };

// 問題 5 のテスト
// const paginated: PaginatedResponse<User> = {
//   data: [user],
//   page: 1,
//   perPage: 10,
//   total: 100
// };

// 問題 6 のテスト
// const result = await request<User>('/api/users/1', 'GET');
// const created = await request<User, CreateUserRequest>(
//   '/api/users',
//   'POST',
//   { name: 'Charlie', email: 'charlie@example.com' }
// );

// 問題 7 のテスト
// const client = new APIClient('https://api.example.com', {
//   'Authorization': 'Bearer token123'
// });
// const user = await client.get<User>('/users/1');
// const newUser = await client.post<CreateUserRequest, User>('/users', {
//   name: 'Dave',
//   email: 'dave@example.com'
// });

// 問題 8 のテスト
// const interceptableClient = new InterceptableClient();
// interceptableClient.addInterceptor((url, options) => ({
//   ...options,
//   headers: { ...options.headers, 'X-Custom-Header': 'value' }
// }));

// 問題 9 のテスト
// const transformed = transformDates({ createdAt: '2023-01-01T00:00:00Z' });
// const camelCase = transformKeys({ user_name: 'Alice' });

// 問題 10 のテスト
// const data = await retry(() => fetchData<User>('/api/users/1'), {
//   maxRetries: 3,
//   delay: 1000,
//   retryableStatuses: [500, 502, 503]
// });

// 問題 11 のテスト
// const data = await fetchWithTimeout<User>(
//   'https://api.example.com/users/1',
//   {},
//   3000
// );

// 問題 12 のテスト
// const cachedClient = new CachedAPIClient(60000);
// const user1 = await cachedClient.get<User>('/users/1'); // API 呼び出し
// const user2 = await cachedClient.get<User>('/users/1'); // キャッシュから取得

// 問題 13 のテスト
// const validatedUser = await fetchValidatedUser('/api/users/1');

// 問題 14 のテスト
// const file = new File(['content'], 'test.txt', { type: 'text/plain' });
// const uploadResult = await uploadFile('/api/upload', {
//   file,
//   metadata: { description: 'Test file' }
// });

// 問題 15 のテスト
// const [user, posts, comments] = await parallelFetch<[User, Post[], Comment[]]>(
//   '/api/users/1',
//   '/api/posts',
//   '/api/comments'
// );

// 問題 16 のテスト
// const data = await graphql<{ user: User }, { id: number }>(
//   'https://api.example.com/graphql',
//   {
//     query: 'query GetUser($id: ID!) { user(id: $id) { id name email } }',
//     variables: { id: 1 }
//   }
// );

// 問題 17 のテスト
// interface SendMessage {
//   type: 'message';
//   content: string;
// }
// interface ReceiveMessage {
//   type: 'response';
//   content: string;
// }
// const ws = new TypedWebSocket<SendMessage, ReceiveMessage>('ws://localhost:8080');
// ws.onMessage((data) => console.log(data.content));
// ws.send({ type: 'message', content: 'Hello' });

// 問題 18 のテスト
// const result = await safeFetch<User>('/api/users/1');
// if (isSuccess(result)) {
//   console.log(result.data);
// } else {
//   console.error(result.error);
// }

// 問題 19 のテスト
// const authClient = new AuthenticatedAPIClient('https://api.example.com', 'token123');
// authClient.setToken('new-token');
// await authClient.refreshToken();

// 問題 20 のテスト
// const mockClient = new MockAPIClient(500);
// const mockUser = await mockClient.get<User>('/users/1', {
//   id: 1,
//   name: 'Mock User',
//   email: 'mock@example.com',
//   createdAt: new Date()
// });
