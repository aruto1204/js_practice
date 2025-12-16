/**
 * 練習問題 5: 関数オーバーロード
 *
 * このファイルでは、関数オーバーロードを使った型安全な関数の実装を練習します。
 */

// ==========================================
// 問題 1: 基本的なオーバーロード
// ==========================================
// format 関数を実装してください
// - string を受け取ったら "String: {value}" を返す
// - number を受け取ったら "Number: {value}" を返す
// - boolean を受け取ったら "Boolean: {value}" を返す
// オーバーロードシグネチャと実装シグネチャの両方を定義してください
// TODO: ここに format 関数を実装


// ==========================================
// 問題 2: 引数の数によるオーバーロード
// ==========================================
// createDate 関数を実装してください
// - 引数なし: 現在の日付を返す
// - year のみ: その年の1月1日を返す
// - year, month: その年月の1日を返す
// - year, month, day: その年月日を返す
// TODO: ここに createDate 関数を実装


// ==========================================
// 問題 3: 配列と単一値のオーバーロード
// ==========================================
// double 関数を実装してください
// - number を受け取ったら、その2倍を返す
// - number[] を受け取ったら、各要素を2倍にした配列を返す
// TODO: ここに double 関数を実装


// ==========================================
// 問題 4: 戻り値の型が変わるオーバーロード
// ==========================================
// parseData 関数を実装してください
// - 第2引数が 'json' の場合: object を返す
// - 第2引数が 'text' の場合: string を返す
// - 第2引数が 'number' の場合: number を返す
// TODO: ここに parseData 関数を実装


// ==========================================
// 問題 5: オプショナル引数とオーバーロード
// ==========================================
// search 関数を実装してください
// - (items: string[], query: string): string[] - 文字列配列から検索
// - (items: number[], query: number): number[] - 数値配列から検索
// - (items: string[], query: string, caseSensitive: boolean): string[] - 大文字小文字を区別
// TODO: ここに search 関数を実装


// ==========================================
// 問題 6: ジェネリクスとオーバーロード
// ==========================================
// reverse 関数を実装してください
// - string を受け取ったら、反転した文字列を返す
// - T[] を受け取ったら、反転した配列を返す
// TODO: ここに reverse 関数を実装


// ==========================================
// 問題 7: コールバックのオーバーロード
// ==========================================
// fetchData 関数を実装してください
// - (url: string): Promise<string> - Promise を返す
// - (url: string, callback: (data: string) => void): void - コールバックで結果を返す
// TODO: ここに fetchData 関数を実装


// ==========================================
// 問題 8: オブジェクト生成のオーバーロード
// ==========================================
// createPerson 関数を実装してください
// - (name: string): { name: string }
// - (name: string, age: number): { name: string; age: number }
// - (name: string, age: number, email: string): { name: string; age: number; email: string }
// TODO: ここに createPerson 関数を実装


// ==========================================
// 問題 9: 配列操作のオーバーロード
// ==========================================
// slice 関数を実装してください（配列の一部を切り出す）
// - (arr: T[]): T[] - 配列全体のコピー
// - (arr: T[], start: number): T[] - start から最後まで
// - (arr: T[], start: number, end: number): T[] - start から end まで
// TODO: ここに slice 関数を実装


// ==========================================
// 問題 10: 型の絞り込みを活用したオーバーロード
// ==========================================
// filterBy 関数を実装してください
// - (items: string[], predicate: (item: string) => boolean): string[]
// - (items: number[], predicate: (item: number) => boolean): number[]
// - (items: boolean[], predicate: (item: boolean) => boolean): boolean[]
// TODO: ここに filterBy 関数を実装


// ==========================================
// 問題 11: メソッドチェーンのためのオーバーロード
// ==========================================
// Calculator クラスを実装してください
// add メソッドは以下のオーバーロードを持ちます：
// - add(value: number): Calculator - 値を加算してチェーン可能
// - add(value: number, returnResult: true): number - 結果を返す
// TODO: ここに Calculator クラスを実装


// ==========================================
// 問題 12: 条件付き戻り値のオーバーロード
// ==========================================
// get 関数を実装してください
// - (obj: T, key: K): T[K] - オブジェクトからプロパティを取得
// - (obj: T, key: K, defaultValue: D): T[K] | D - デフォルト値付き
// TODO: ここに get 関数を実装


// ==========================================
// 問題 13: イベントハンドラのオーバーロード
// ==========================================
// addEventListener 関数を実装してください
// - (event: 'click', handler: (e: MouseEvent) => void): void
// - (event: 'keypress', handler: (e: KeyboardEvent) => void): void
// - (event: 'change', handler: (e: Event) => void): void
// （簡易版として、イベント名と型の対応を示すシミュレーションで OK）
// TODO: ここに addEventListener 関数を実装


// ==========================================
// 問題 14: 複雑なオーバーロード
// ==========================================
// merge 関数を実装してください
// - (a: T): T - 1つのオブジェクトはそのまま返す
// - (a: T, b: U): T & U - 2つのオブジェクトをマージ
// - (a: T, b: U, c: V): T & U & V - 3つのオブジェクトをマージ
// TODO: ここに merge 関数を実装


// ==========================================
// 問題 15: ユーティリティ関数のオーバーロード
// ==========================================
// clamp 関数を実装してください（値を範囲内に収める）
// - (value: number, max: number): number - 0 から max の範囲
// - (value: number, min: number, max: number): number - min から max の範囲
// TODO: ここに clamp 関数を実装


// ==========================================
// テストコード（実装後にコメントを外して実行）
// ==========================================
/*
console.log(format('hello'));                        // "String: hello"
console.log(format(42));                             // "Number: 42"
console.log(format(true));                           // "Boolean: true"

console.log(createDate());
console.log(createDate(2024));
console.log(createDate(2024, 5));
console.log(createDate(2024, 5, 15));

console.log(double(5));                              // 10
console.log(double([1, 2, 3]));                      // [2, 4, 6]

console.log(parseData('{"name":"Alice"}', 'json'));
console.log(parseData('Hello', 'text'));
console.log(parseData('42', 'number'));

console.log(search(['apple', 'banana'], 'app'));
console.log(search([1, 2, 3], 2));

console.log(reverse('hello'));                       // 'olleh'
console.log(reverse([1, 2, 3]));                     // [3, 2, 1]

// Promise版
fetchData('https://api.example.com').then(data => console.log(data));
// コールバック版
fetchData('https://api.example.com', data => console.log(data));

console.log(createPerson('Alice'));
console.log(createPerson('Bob', 30));
console.log(createPerson('Charlie', 25, 'charlie@example.com'));

console.log(slice([1, 2, 3, 4, 5]));
console.log(slice([1, 2, 3, 4, 5], 2));
console.log(slice([1, 2, 3, 4, 5], 1, 3));

console.log(filterBy([1, 2, 3, 4], x => x > 2));    // [3, 4]

const calc = new Calculator(10);
console.log(calc.add(5).add(3).add(2, true));        // 20

const obj = { name: 'Alice', age: 25 };
console.log(get(obj, 'name'));
console.log(get(obj, 'email', 'N/A'));

console.log(merge({ a: 1 }));
console.log(merge({ a: 1 }, { b: 2 }));
console.log(merge({ a: 1 }, { b: 2 }, { c: 3 }));

console.log(clamp(15, 10));                          // 10
console.log(clamp(5, 0, 10));                        // 5
console.log(clamp(15, 0, 10));                       // 10
*/
