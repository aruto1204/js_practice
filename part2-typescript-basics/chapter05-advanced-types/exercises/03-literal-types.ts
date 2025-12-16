/**
 * 練習問題 3: リテラル型（Literal Types）
 *
 * このファイルでは、リテラル型と判別可能なユニオンを練習します。
 */

// ==========================================
// 問題 1: 文字列リテラル型
// ==========================================
// Direction 型を定義してください（'north' | 'south' | 'east' | 'west'）
// そして、Direction を受け取って移動メッセージを返す move 関数を実装してください
// TODO: Direction 型と move 関数を実装


// ==========================================
// 問題 2: 数値リテラル型
// ==========================================
// HttpStatus 型を定義してください（200 | 201 | 400 | 401 | 404 | 500）
// そして、HttpStatus を受け取ってステータスメッセージを返す getStatusMessage 関数を実装してください
// TODO: HttpStatus 型と getStatusMessage 関数を実装


// ==========================================
// 問題 3: サイズの定義
// ==========================================
// Size 型を 'xs' | 's' | 'm' | 'l' | 'xl' として定義し、
// Size を受け取って数値（ピクセル）に変換する getSizeInPixels 関数を実装してください
// xs: 12, s: 14, m: 16, l: 18, xl: 20
// TODO: Size 型と getSizeInPixels 関数を実装


// ==========================================
// 問題 4: boolean リテラル型
// ==========================================
// AlwaysTrue 型を true のみ許容する型として定義してください
// そして、AlwaysTrue を返す関数 confirmAction を実装してください
// TODO: AlwaysTrue 型と confirmAction 関数を実装


// ==========================================
// 問題 5: オブジェクトの判別
// ==========================================
// Circle 型（kind: 'circle', radius: number）と
// Square 型（kind: 'square', sideLength: number）を定義し、
// Shape 型をこれらのユニオンとして定義してください
// そして、Shape を受け取って面積を計算する calculateArea 関数を実装してください
// TODO: Circle, Square, Shape 型と calculateArea 関数を実装


// ==========================================
// 問題 6: イベントの型定義
// ==========================================
// ClickEvent 型（type: 'click', x: number, y: number）と
// KeyEvent 型（type: 'keypress', key: string）を定義し、
// Event 型をこれらのユニオンとして定義してください
// そして、Event を受け取って処理する handleEvent 関数を実装してください
// TODO: ClickEvent, KeyEvent, Event 型と handleEvent 関数を実装


// ==========================================
// 問題 7: 色のリテラル型
// ==========================================
// Color 型を 'red' | 'green' | 'blue' として定義し、
// Color を受け取って16進数カラーコードを返す getColorCode 関数を実装してください
// red: '#FF0000', green: '#00FF00', blue: '#0000FF'
// TODO: Color 型と getColorCode 関数を実装


// ==========================================
// 問題 8: 状態管理
// ==========================================
// LoadingState, SuccessState, ErrorState を定義してください
// - LoadingState: { status: 'loading' }
// - SuccessState: { status: 'success', data: string }
// - ErrorState: { status: 'error', error: Error }
// State 型をこれらのユニオンとして定義し、
// State を受け取って UI テキストを返す getStateText 関数を実装してください
// TODO: 各State型と getStateText 関数を実装


// ==========================================
// 問題 9: リテラル型の配列
// ==========================================
// Weekday 型を 'mon' | 'tue' | 'wed' | 'thu' | 'fri' として定義し、
// Weekday の配列を受け取って営業日かどうかを判定する isBusinessDay 関数を実装してください
// TODO: Weekday 型と isBusinessDay 関数を実装


// ==========================================
// 問題 10: ネストしたリテラル型
// ==========================================
// PaymentMethod 型を以下のように定義してください：
// - { method: 'credit_card', cardNumber: string }
// - { method: 'paypal', email: string }
// - { method: 'bank_transfer', accountNumber: string }
// そして、PaymentMethod を受け取って支払い情報を表示する displayPayment 関数を実装してください
// TODO: PaymentMethod 型と displayPayment 関数を実装


// ==========================================
// 問題 11: リテラル型の絞り込み
// ==========================================
// TrafficLight 型を 'red' | 'yellow' | 'green' として定義し、
// TrafficLight を受け取って次の信号を返す getNextLight 関数を実装してください
// red → green, green → yellow, yellow → red
// TODO: TrafficLight 型と getNextLight 関数を実装


// ==========================================
// 問題 12: const アサーション
// ==========================================
// as const を使って、COLORS オブジェクトを readonly リテラル型として定義してください
// そして、その型から ColorName 型を抽出してください
// TODO: COLORS と ColorName 型を実装


// ==========================================
// 問題 13: タグ付きユニオンの応用
// ==========================================
// Request 型を以下のように定義してください：
// - { type: 'get', url: string }
// - { type: 'post', url: string, body: any }
// - { type: 'delete', url: string, id: string }
// そして、Request を受け取って HTTP リクエストの説明を返す describeRequest 関数を実装してください
// TODO: Request 型と describeRequest 関数を実装


// ==========================================
// 問題 14: リテラル型と型ガード
// ==========================================
// Animal 型を以下のように定義してください：
// - { species: 'dog', breed: string }
// - { species: 'cat', indoor: boolean }
// - { species: 'bird', canFly: boolean }
// そして、Animal を受け取って詳細情報を返す getAnimalInfo 関数を実装してください
// TODO: Animal 型と getAnimalInfo 関数を実装


// ==========================================
// 問題 15: 複雑な判別可能なユニオン
// ==========================================
// Message 型を以下のように定義してください：
// - { kind: 'text', content: string, sender: string }
// - { kind: 'image', url: string, width: number, height: number }
// - { kind: 'video', url: string, duration: number }
// - { kind: 'file', filename: string, size: number }
// そして、Message[] を受け取ってサマリーを表示する summarizeMessages 関数を実装してください
// TODO: Message 型と summarizeMessages 関数を実装


// ==========================================
// テストコード（実装後にコメントを外して実行）
// ==========================================
/*
console.log(move('north'));                          // "Moving north"
console.log(getStatusMessage(200));                  // "OK"
console.log(getStatusMessage(404));                  // "Not Found"
console.log(getSizeInPixels('m'));                   // 16
console.log(confirmAction());                        // true
console.log(calculateArea({ kind: 'circle', radius: 5 }));
console.log(calculateArea({ kind: 'square', sideLength: 4 }));
handleEvent({ type: 'click', x: 100, y: 200 });
handleEvent({ type: 'keypress', key: 'Enter' });
console.log(getColorCode('red'));                    // "#FF0000"
console.log(getStateText({ status: 'loading' }));   // "Loading..."
console.log(getStateText({ status: 'success', data: 'OK' }));
console.log(isBusinessDay('mon'));                   // true
console.log(isBusinessDay('sat' as any));            // false
displayPayment({ method: 'credit_card', cardNumber: '1234-5678' });
displayPayment({ method: 'paypal', email: 'user@example.com' });
console.log(getNextLight('red'));                    // "green"
console.log(getNextLight('green'));                  // "yellow"
describeRequest({ type: 'get', url: '/api/users' });
describeRequest({ type: 'post', url: '/api/users', body: { name: 'Alice' } });
console.log(getAnimalInfo({ species: 'dog', breed: 'Labrador' }));
console.log(getAnimalInfo({ species: 'cat', indoor: true }));
const messages: Message[] = [
  { kind: 'text', content: 'Hello', sender: 'Alice' },
  { kind: 'image', url: 'photo.jpg', width: 800, height: 600 },
  { kind: 'video', url: 'video.mp4', duration: 120 }
];
summarizeMessages(messages);
*/
