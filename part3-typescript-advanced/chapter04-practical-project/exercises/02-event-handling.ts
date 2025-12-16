/**
 * Part 3: TypeScript 実践編
 * Chapter 4: 実践的なプロジェクト
 * 演習 2: イベントハンドリング
 *
 * このファイルでは、TypeScript でのイベントハンドリングを学びます。
 */

/* ============================================================================
 * 問題 1: クリックイベントの基本
 * ============================================================================
 * ボタンのクリックイベントを処理する関数を実装してください。
 *
 * 要件:
 * - MouseEvent 型を使用
 * - クリックされた座標を console.log で出力
 */

// TODO: handleClick 関数を実装
// function handleClick(event: MouseEvent): void {
//   ...
// }

/* ============================================================================
 * 問題 2: キーボードイベントの処理
 * ============================================================================
 * Enter キーが押されたときのみ処理を実行する関数を実装してください。
 *
 * 要件:
 * - KeyboardEvent 型を使用
 * - event.key が 'Enter' のときのみコールバックを実行
 */

// TODO: onEnterKey 関数を実装
// function onEnterKey(
//   element: HTMLElement,
//   callback: () => void
// ): void {
//   ...
// }

/* ============================================================================
 * 問題 3: フォーム送信イベント
 * ============================================================================
 * フォームの送信を処理する関数を実装してください。
 *
 * 要件:
 * - SubmitEvent 型を使用
 * - デフォルトの送信動作を防ぐ
 * - FormData を使ってフォームデータを取得
 */

// TODO: handleFormSubmit 関数を実装
// function handleFormSubmit(event: SubmitEvent): void {
//   ...
// }

/* ============================================================================
 * 問題 4: 入力イベントの型安全な処理
 * ============================================================================
 * input 要素の値が変更されたときに呼ばれるコールバックを設定してください。
 *
 * 要件:
 * - Event 型を使用し、target を HTMLInputElement にキャスト
 * - 入力値をコールバックに渡す
 */

// TODO: onInputChange 関数を実装
// function onInputChange(
//   input: HTMLInputElement,
//   callback: (value: string) => void
// ): void {
//   ...
// }

/* ============================================================================
 * 問題 5: マウスホバーイベント
 * ============================================================================
 * 要素にマウスが入ったとき・出たときの処理を設定する関数を実装してください。
 *
 * 要件:
 * - mouseenter と mouseleave イベントを使用
 * - それぞれのコールバックを受け取る
 */

// TODO: onHover 関数を実装
// function onHover(
//   element: HTMLElement,
//   onEnter: () => void,
//   onLeave: () => void
// ): void {
//   ...
// }

/* ============================================================================
 * 問題 6: イベント委譲（Event Delegation）
 * ============================================================================
 * リスト要素でイベント委譲を実装してください。
 *
 * 要件:
 * - ul 要素にイベントリスナーを設定
 * - クリックされた li 要素を特定してコールバックを実行
 */

// TODO: delegateListClick 関数を実装
// function delegateListClick(
//   list: HTMLUListElement,
//   callback: (item: HTMLLIElement) => void
// ): void {
//   ...
// }

/* ============================================================================
 * 問題 7: カスタムイベントハンドラー型
 * ============================================================================
 * 汎用的なイベントハンドラー型を定義してください。
 *
 * 要件:
 * - ジェネリック型パラメータで Event の型を指定
 * - void または Promise<void> を返す
 */

// TODO: EventHandler 型を定義
// type EventHandler<E extends Event> = ...

/* ============================================================================
 * 問題 8: 型安全なイベントリスナー登録
 * ============================================================================
 * HTMLElementEventMap を使用した型安全なイベントリスナー登録関数を実装してください。
 *
 * 要件:
 * - イベント名に応じて適切な Event 型が推論される
 * - リスナーの削除関数を返す
 */

// TODO: addEventListener 関数を実装
// function addListener<K extends keyof HTMLElementEventMap>(
//   element: HTMLElement,
//   type: K,
//   handler: (event: HTMLElementEventMap[K]) => void
// ): () => void {
//   ...
// }

/* ============================================================================
 * 問題 9: デバウンス処理
 * ============================================================================
 * イベントハンドラーにデバウンス処理を適用する関数を実装してください。
 *
 * 要件:
 * - 指定されたミリ秒待機してから実行
 * - 連続して呼ばれた場合はタイマーをリセット
 */

// TODO: debounce 関数を実装
// function debounce<T extends (...args: any[]) => any>(
//   func: T,
//   delay: number
// ): (...args: Parameters<T>) => void {
//   ...
// }

/* ============================================================================
 * 問題 10: スロットル処理
 * ============================================================================
 * イベントハンドラーにスロットル処理を適用する関数を実装してください。
 *
 * 要件:
 * - 指定されたミリ秒間に1回だけ実行
 * - それ以外の呼び出しは無視
 */

// TODO: throttle 関数を実装
// function throttle<T extends (...args: any[]) => any>(
//   func: T,
//   limit: number
// ): (...args: Parameters<T>) => void {
//   ...
// }

/* ============================================================================
 * 問題 11: フォーカスイベントの処理
 * ============================================================================
 * input 要素のフォーカス・ブラーイベントを処理する関数を実装してください。
 *
 * 要件:
 * - FocusEvent 型を使用
 * - フォーカス時とブラー時で異なる処理を実行
 */

// TODO: setupFocusHandlers 関数を実装
// function setupFocusHandlers(
//   input: HTMLInputElement,
//   onFocus: () => void,
//   onBlur: () => void
// ): void {
//   ...
// }

/* ============================================================================
 * 問題 12: ドラッグ&ドロップの基本
 * ============================================================================
 * 要素をドラッグ可能にする関数を実装してください。
 *
 * 要件:
 * - dragstart, drag, dragend イベントを使用
 * - DragEvent 型を使用
 */

// TODO: makeDraggable 関数を実装
// function makeDraggable(
//   element: HTMLElement,
//   onDragStart?: (e: DragEvent) => void,
//   onDragEnd?: (e: DragEvent) => void
// ): void {
//   ...
// }

/* ============================================================================
 * 問題 13: カスタムイベントの作成と発火
 * ============================================================================
 * カスタムイベントを作成・発火する関数を実装してください。
 *
 * 要件:
 * - CustomEvent を使用
 * - ジェネリック型でペイロードの型を指定
 */

// TODO: カスタムイベント関連の関数を実装
// function createCustomEvent<T>(
//   name: string,
//   detail: T
// ): CustomEvent<T> {
//   ...
// }
//
// function dispatchCustomEvent<T>(
//   element: HTMLElement,
//   name: string,
//   detail: T
// ): void {
//   ...
// }

/* ============================================================================
 * 問題 14: イベントの伝播制御
 * ============================================================================
 * イベントの伝播を制御する関数を実装してください。
 *
 * 要件:
 * - stopPropagation と preventDefault を使用
 * - オプションで伝播を止めるかどうかを指定可能
 */

// TODO: EventController クラスを実装
// class EventController {
//   static stop(event: Event, prevent = false): void {
//     ...
//   }
//
//   static prevent(event: Event): void {
//     ...
//   }
// }

/* ============================================================================
 * 問題 15: 複数イベントのリスナー登録
 * ============================================================================
 * 複数のイベントに対して同じハンドラーを登録する関数を実装してください。
 *
 * 要件:
 * - 可変長引数でイベント名を受け取る
 * - すべてのイベントリスナーを削除する関数を返す
 */

// TODO: addMultipleListeners 関数を実装
// function addMultipleListeners(
//   element: HTMLElement,
//   events: string[],
//   handler: (event: Event) => void
// ): () => void {
//   ...
// }

/* ============================================================================
 * 問題 16: イベントリスナーの一時停止・再開
 * ============================================================================
 * イベントリスナーを一時停止・再開できるクラスを実装してください。
 *
 * 要件:
 * - pause() で一時停止、resume() で再開
 * - 一時停止中はハンドラーが実行されない
 */

// TODO: PausableListener クラスを実装
// class PausableListener<K extends keyof HTMLElementEventMap> {
//   constructor(
//     private element: HTMLElement,
//     private type: K,
//     private handler: (event: HTMLElementEventMap[K]) => void
//   ) {
//     ...
//   }
//
//   pause(): void {
//     ...
//   }
//
//   resume(): void {
//     ...
//   }
//
//   remove(): void {
//     ...
//   }
// }

/* ============================================================================
 * 問題 17: イベントの once オプション
 * ============================================================================
 * 一度だけ実行されるイベントリスナーを登録する関数を実装してください。
 *
 * 要件:
 * - addEventListener の once オプションを使用
 * - 実行後、自動的にリスナーが削除される
 */

// TODO: addOnceListener 関数を実装
// function addOnceListener<K extends keyof HTMLElementEventMap>(
//   element: HTMLElement,
//   type: K,
//   handler: (event: HTMLElementEventMap[K]) => void
// ): void {
//   ...
// }

/* ============================================================================
 * 問題 18: キーコンビネーションの検出
 * ============================================================================
 * Ctrl+S などのキーコンビネーションを検出する関数を実装してください。
 *
 * 要件:
 * - KeyboardEvent の ctrlKey, shiftKey, altKey を使用
 * - 指定されたキーコンビネーションが押されたときにコールバックを実行
 */

// TODO: キーコンビネーション型と関数を実装
// interface KeyCombination {
//   key: string;
//   ctrl?: boolean;
//   shift?: boolean;
//   alt?: boolean;
// }
//
// function onKeyCombination(
//   element: HTMLElement,
//   combination: KeyCombination,
//   callback: () => void
// ): void {
//   ...
// }

/* ============================================================================
 * 問題 19: クリックアウトサイド検出
 * ============================================================================
 * 要素の外側がクリックされたことを検出する関数を実装してください。
 *
 * 要件:
 * - document にイベントリスナーを登録
 * - 指定された要素の外側がクリックされたときにコールバックを実行
 */

// TODO: onClickOutside 関数を実装
// function onClickOutside(
//   element: HTMLElement,
//   callback: () => void
// ): () => void {
//   ...
// }

/* ============================================================================
 * 問題 20: イベントバス（Pub/Sub パターン）
 * ============================================================================
 * アプリケーション全体でイベントを管理するイベントバスを実装してください。
 *
 * 要件:
 * - on() でイベントをリスン
 * - emit() でイベントを発火
 * - off() でリスナーを削除
 * - ジェネリック型でペイロードの型を指定
 */

// TODO: EventBus クラスを実装
// class EventBus {
//   private listeners: Map<string, Set<Function>> = new Map();
//
//   on<T>(event: string, callback: (data: T) => void): () => void {
//     ...
//   }
//
//   emit<T>(event: string, data: T): void {
//     ...
//   }
//
//   off(event: string, callback: Function): void {
//     ...
//   }
// }

// ============================================================================
// テストコード
// ============================================================================

// 問題 1 のテスト
// const button = document.createElement('button');
// button.addEventListener('click', handleClick);

// 問題 2 のテスト
// const input = document.createElement('input');
// onEnterKey(input, () => console.log('Enter pressed!'));

// 問題 3 のテスト
// const form = document.createElement('form');
// form.addEventListener('submit', handleFormSubmit);

// 問題 4 のテスト
// onInputChange(input, (value) => console.log('Input value:', value));

// 問題 5 のテスト
// const box = document.createElement('div');
// onHover(
//   box,
//   () => console.log('Mouse entered'),
//   () => console.log('Mouse left')
// );

// 問題 6 のテスト
// const list = document.createElement('ul');
// delegateListClick(list, (item) => console.log('Clicked:', item.textContent));

// 問題 7 のテスト
// const handler: EventHandler<MouseEvent> = (e) => console.log(e.clientX);

// 問題 8 のテスト
// const removeListener = addListener(button, 'click', (e) => {
//   console.log('Clicked at', e.clientX, e.clientY);
// });
// removeListener(); // リスナーを削除

// 問題 9 のテスト
// const debouncedLog = debounce((msg: string) => console.log(msg), 500);
// input.addEventListener('input', () => debouncedLog('Input changed'));

// 問題 10 のテスト
// const throttledScroll = throttle(() => console.log('Scrolled'), 1000);
// window.addEventListener('scroll', throttledScroll);

// 問題 11 のテスト
// setupFocusHandlers(
//   input,
//   () => console.log('Focused'),
//   () => console.log('Blurred')
// );

// 問題 12 のテスト
// const draggable = document.createElement('div');
// makeDraggable(
//   draggable,
//   (e) => console.log('Drag started'),
//   (e) => console.log('Drag ended')
// );

// 問題 13 のテスト
// const customEvent = createCustomEvent('user-login', { userId: 123 });
// dispatchCustomEvent(document.body, 'user-login', { userId: 123 });

// 問題 14 のテスト
// button.addEventListener('click', (e) => {
//   EventController.stop(e, true); // 伝播を止めてデフォルト動作も防ぐ
// });

// 問題 15 のテスト
// const removeAll = addMultipleListeners(
//   input,
//   ['focus', 'blur', 'input'],
//   (e) => console.log('Event:', e.type)
// );
// removeAll(); // すべてのリスナーを削除

// 問題 16 のテスト
// const pausable = new PausableListener(button, 'click', (e) => {
//   console.log('Clicked');
// });
// pausable.pause();
// pausable.resume();

// 問題 17 のテスト
// addOnceListener(button, 'click', (e) => {
//   console.log('This will only run once');
// });

// 問題 18 のテスト
// onKeyCombination(
//   document.body,
//   { key: 's', ctrl: true },
//   () => console.log('Ctrl+S pressed')
// );

// 問題 19 のテスト
// const modal = document.createElement('div');
// const removeClickOutside = onClickOutside(modal, () => {
//   console.log('Clicked outside modal');
// });

// 問題 20 のテスト
// const eventBus = new EventBus();
// const unsubscribe = eventBus.on<{ userId: number }>('user-login', (data) => {
//   console.log('User logged in:', data.userId);
// });
// eventBus.emit('user-login', { userId: 123 });
// unsubscribe();
