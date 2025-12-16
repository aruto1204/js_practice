/**
 * Part 3: TypeScript 実践編
 * Chapter 4: 実践的なプロジェクト
 * 演習 2: イベントハンドリング - 解答
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

// MouseEvent を受け取り、クリック座標を出力する関数
function handleClick(event: MouseEvent): void {
  // clientX, clientY はビューポート（表示領域）からの座標
  // pageX, pageY はドキュメント全体からの座標（スクロール含む）
  console.log(`Clicked at: (${event.clientX}, ${event.clientY})`);
  console.log(`Page coordinates: (${event.pageX}, ${event.pageY})`);
}

/* ============================================================================
 * 問題 2: キーボードイベントの処理
 * ============================================================================
 * Enter キーが押されたときのみ処理を実行する関数を実装してください。
 *
 * 要件:
 * - KeyboardEvent 型を使用
 * - event.key が 'Enter' のときのみコールバックを実行
 */

// Enter キーが押されたときのみコールバックを実行する関数
function onEnterKey(
  element: HTMLElement,
  callback: () => void
): void {
  // keydown イベントリスナーを登録
  element.addEventListener('keydown', (event: Event) => {
    // Event を KeyboardEvent にキャスト
    const keyEvent = event as KeyboardEvent;

    // Enter キーが押された場合のみコールバックを実行
    if (keyEvent.key === 'Enter') {
      callback();
    }
  });
}

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

// フォーム送信イベントを処理する関数
function handleFormSubmit(event: SubmitEvent): void {
  // デフォルトのフォーム送信動作（ページリロード）を防ぐ
  event.preventDefault();

  // SubmitEvent.target は EventTarget 型なので HTMLFormElement にキャスト
  const form = event.target as HTMLFormElement;

  // FormData API を使ってフォームデータを取得
  const formData = new FormData(form);

  // フォームデータをオブジェクトに変換して表示
  const data: Record<string, string> = {};
  formData.forEach((value, key) => {
    data[key] = value.toString();
  });

  console.log('Form submitted with data:', data);
}

/* ============================================================================
 * 問題 4: 入力イベントの型安全な処理
 * ============================================================================
 * input 要素の値が変更されたときに呼ばれるコールバックを設定してください。
 *
 * 要件:
 * - Event 型を使用し、target を HTMLInputElement にキャスト
 * - 入力値をコールバックに渡す
 */

// input 要素の値変更時にコールバックを実行する関数
function onInputChange(
  input: HTMLInputElement,
  callback: (value: string) => void
): void {
  // input イベントリスナーを登録
  input.addEventListener('input', (event: Event) => {
    // event.target を HTMLInputElement にキャスト
    const target = event.target as HTMLInputElement;

    // 入力値をコールバックに渡す
    callback(target.value);
  });
}

/* ============================================================================
 * 問題 5: マウスホバーイベント
 * ============================================================================
 * 要素にマウスが入ったとき・出たときの処理を設定する関数を実装してください。
 *
 * 要件:
 * - mouseenter と mouseleave イベントを使用
 * - それぞれのコールバックを受け取る
 */

// マウスホバー時の処理を設定する関数
function onHover(
  element: HTMLElement,
  onEnter: () => void,
  onLeave: () => void
): void {
  // mouseenter: マウスが要素内に入ったとき
  // mouseover との違い: 子要素から親要素に入っても発火しない
  element.addEventListener('mouseenter', onEnter);

  // mouseleave: マウスが要素から出たとき
  // mouseout との違い: 親要素から子要素に移動しても発火しない
  element.addEventListener('mouseleave', onLeave);
}

/* ============================================================================
 * 問題 6: イベント委譲（Event Delegation）
 * ============================================================================
 * リスト要素でイベント委譲を実装してください。
 *
 * 要件:
 * - ul 要素にイベントリスナーを設定
 * - クリックされた li 要素を特定してコールバックを実行
 */

// イベント委譲でリストアイテムのクリックを処理する関数
function delegateListClick(
  list: HTMLUListElement,
  callback: (item: HTMLLIElement) => void
): void {
  // 親要素（ul）にイベントリスナーを1つだけ設定
  // これにより、動的に追加される li にも対応可能
  list.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;

    // クリックされた要素が li かどうかをチェック
    if (target.tagName === 'LI') {
      callback(target as HTMLLIElement);
    }

    // クリックされた要素が li の子要素の場合、最も近い li を探す
    const listItem = target.closest('li');
    if (listItem && list.contains(listItem)) {
      callback(listItem as HTMLLIElement);
    }
  });
}

/* ============================================================================
 * 問題 7: カスタムイベントハンドラー型
 * ============================================================================
 * 汎用的なイベントハンドラー型を定義してください。
 *
 * 要件:
 * - ジェネリック型パラメータで Event の型を指定
 * - void または Promise<void> を返す
 */

// Event のサブタイプを受け取る汎用イベントハンドラー型
// 同期・非同期どちらにも対応
type EventHandler<E extends Event> = (event: E) => void | Promise<void>;

/* ============================================================================
 * 問題 8: 型安全なイベントリスナー登録
 * ============================================================================
 * HTMLElementEventMap を使用した型安全なイベントリスナー登録関数を実装してください。
 *
 * 要件:
 * - イベント名に応じて適切な Event 型が推論される
 * - リスナーの削除関数を返す
 */

// 型安全なイベントリスナー登録関数
// HTMLElementEventMap を使うことで、イベント名に応じた適切な Event 型が自動推論される
function addListener<K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: K,
  handler: (event: HTMLElementEventMap[K]) => void
): () => void {
  // イベントリスナーを登録
  element.addEventListener(type, handler as EventListener);

  // リスナーを削除する関数を返す（クリーンアップ用）
  return () => {
    element.removeEventListener(type, handler as EventListener);
  };
}

/* ============================================================================
 * 問題 9: デバウンス処理
 * ============================================================================
 * イベントハンドラーにデバウンス処理を適用する関数を実装してください。
 *
 * 要件:
 * - 指定されたミリ秒待機してから実行
 * - 連続して呼ばれた場合はタイマーをリセット
 */

// デバウンス処理を適用する関数
// 連続して呼ばれても、最後の呼び出しから指定時間後に1回だけ実行
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  // タイマーIDを保持する変数
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    // 既存のタイマーがあればクリア（リセット）
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    // 新しいタイマーをセット
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/* ============================================================================
 * 問題 10: スロットル処理
 * ============================================================================
 * イベントハンドラーにスロットル処理を適用する関数を実装してください。
 *
 * 要件:
 * - 指定されたミリ秒間に1回だけ実行
 * - それ以外の呼び出しは無視
 */

// スロットル処理を適用する関数
// 指定時間内に何度呼ばれても、最初の1回だけ実行
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  // 実行中かどうかのフラグ
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    // 実行中でなければ実行
    if (!inThrottle) {
      func(...args);
      inThrottle = true;

      // 指定時間後にフラグをリセット
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/* ============================================================================
 * 問題 11: フォーカスイベントの処理
 * ============================================================================
 * input 要素のフォーカス・ブラーイベントを処理する関数を実装してください。
 *
 * 要件:
 * - FocusEvent 型を使用
 * - フォーカス時とブラー時で異なる処理を実行
 */

// フォーカス・ブラーイベントのハンドラーを設定する関数
function setupFocusHandlers(
  input: HTMLInputElement,
  onFocus: () => void,
  onBlur: () => void
): void {
  // focus イベント: 要素がフォーカスを受け取ったとき
  input.addEventListener('focus', (event: Event) => {
    const focusEvent = event as FocusEvent;
    console.log('Focus event:', focusEvent.relatedTarget); // フォーカス移動元
    onFocus();
  });

  // blur イベント: 要素がフォーカスを失ったとき
  input.addEventListener('blur', (event: Event) => {
    const focusEvent = event as FocusEvent;
    console.log('Blur event:', focusEvent.relatedTarget); // フォーカス移動先
    onBlur();
  });
}

/* ============================================================================
 * 問題 12: ドラッグ&ドロップの基本
 * ============================================================================
 * 要素をドラッグ可能にする関数を実装してください。
 *
 * 要件:
 * - dragstart, drag, dragend イベントを使用
 * - DragEvent 型を使用
 */

// 要素をドラッグ可能にする関数
function makeDraggable(
  element: HTMLElement,
  onDragStart?: (e: DragEvent) => void,
  onDragEnd?: (e: DragEvent) => void
): void {
  // draggable 属性を true に設定
  element.draggable = true;

  // dragstart: ドラッグ開始時
  element.addEventListener('dragstart', (event: Event) => {
    const dragEvent = event as DragEvent;
    console.log('Drag started');

    // dataTransfer にデータを設定（ドロップ先で取得可能）
    if (dragEvent.dataTransfer) {
      dragEvent.dataTransfer.effectAllowed = 'move';
      dragEvent.dataTransfer.setData('text/html', element.innerHTML);
    }

    onDragStart?.(dragEvent);
  });

  // drag: ドラッグ中（連続して発火）
  element.addEventListener('drag', (event: Event) => {
    const dragEvent = event as DragEvent;
    // ドラッグ中の処理（必要に応じて）
  });

  // dragend: ドラッグ終了時
  element.addEventListener('dragend', (event: Event) => {
    const dragEvent = event as DragEvent;
    console.log('Drag ended');
    onDragEnd?.(dragEvent);
  });
}

/* ============================================================================
 * 問題 13: カスタムイベントの作成と発火
 * ============================================================================
 * カスタムイベントを作成・発火する関数を実装してください。
 *
 * 要件:
 * - CustomEvent を使用
 * - ジェネリック型でペイロードの型を指定
 */

// カスタムイベントを作成する関数
// ジェネリック型 T でペイロードの型を指定
function createCustomEvent<T>(
  name: string,
  detail: T
): CustomEvent<T> {
  // CustomEvent を作成
  // detail プロパティに任意のデータを含めることができる
  return new CustomEvent<T>(name, {
    detail,
    bubbles: true,    // イベントバブリングを有効化
    cancelable: true  // preventDefault() を可能にする
  });
}

// カスタムイベントを発火する関数
function dispatchCustomEvent<T>(
  element: HTMLElement,
  name: string,
  detail: T
): void {
  // カスタムイベントを作成して発火
  const event = createCustomEvent(name, detail);
  element.dispatchEvent(event);
}

/* ============================================================================
 * 問題 14: イベントの伝播制御
 * ============================================================================
 * イベントの伝播を制御する関数を実装してください。
 *
 * 要件:
 * - stopPropagation と preventDefault を使用
 * - オプションで伝播を止めるかどうかを指定可能
 */

// イベントの伝播を制御するクラス
class EventController {
  // イベントの伝播を停止（オプションでデフォルト動作も防ぐ）
  static stop(event: Event, prevent = false): void {
    // イベントバブリング・キャプチャリングを停止
    event.stopPropagation();

    // オプションでデフォルト動作も防ぐ
    if (prevent) {
      event.preventDefault();
    }
  }

  // デフォルト動作を防ぐ
  static prevent(event: Event): void {
    // ブラウザのデフォルト動作を防ぐ
    // 例: リンクのクリック、フォームの送信など
    event.preventDefault();
  }
}

/* ============================================================================
 * 問題 15: 複数イベントのリスナー登録
 * ============================================================================
 * 複数のイベントに対して同じハンドラーを登録する関数を実装してください。
 *
 * 要件:
 * - 可変長引数でイベント名を受け取る
 * - すべてのイベントリスナーを削除する関数を返す
 */

// 複数のイベントに同じハンドラーを登録する関数
function addMultipleListeners(
  element: HTMLElement,
  events: string[],
  handler: (event: Event) => void
): () => void {
  // すべてのイベントにハンドラーを登録
  events.forEach(eventType => {
    element.addEventListener(eventType, handler);
  });

  // すべてのリスナーを削除する関数を返す
  return () => {
    events.forEach(eventType => {
      element.removeEventListener(eventType, handler);
    });
  };
}

/* ============================================================================
 * 問題 16: イベントリスナーの一時停止・再開
 * ============================================================================
 * イベントリスナーを一時停止・再開できるクラスを実装してください。
 *
 * 要件:
 * - pause() で一時停止、resume() で再開
 * - 一時停止中はハンドラーが実行されない
 */

// イベントリスナーの一時停止・再開が可能なクラス
class PausableListener<K extends keyof HTMLElementEventMap> {
  private isPaused = false;
  private wrappedHandler: (event: HTMLElementEventMap[K]) => void;

  constructor(
    private element: HTMLElement,
    private type: K,
    private handler: (event: HTMLElementEventMap[K]) => void
  ) {
    // ラッパー関数でハンドラーを包む
    this.wrappedHandler = (event: HTMLElementEventMap[K]) => {
      // 一時停止中でなければハンドラーを実行
      if (!this.isPaused) {
        this.handler(event);
      }
    };

    // イベントリスナーを登録
    this.element.addEventListener(this.type, this.wrappedHandler as EventListener);
  }

  // イベントリスナーを一時停止
  pause(): void {
    this.isPaused = true;
  }

  // イベントリスナーを再開
  resume(): void {
    this.isPaused = false;
  }

  // イベントリスナーを完全に削除
  remove(): void {
    this.element.removeEventListener(this.type, this.wrappedHandler as EventListener);
  }
}

/* ============================================================================
 * 問題 17: イベントの once オプション
 * ============================================================================
 * 一度だけ実行されるイベントリスナーを登録する関数を実装してください。
 *
 * 要件:
 * - addEventListener の once オプションを使用
 * - 実行後、自動的にリスナーが削除される
 */

// 一度だけ実行されるイベントリスナーを登録する関数
function addOnceListener<K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: K,
  handler: (event: HTMLElementEventMap[K]) => void
): void {
  // once: true オプションで、1回実行後に自動的にリスナーが削除される
  element.addEventListener(type, handler as EventListener, { once: true });
}

/* ============================================================================
 * 問題 18: キーコンビネーションの検出
 * ============================================================================
 * Ctrl+S などのキーコンビネーションを検出する関数を実装してください。
 *
 * 要件:
 * - KeyboardEvent の ctrlKey, shiftKey, altKey を使用
 * - 指定されたキーコンビネーションが押されたときにコールバックを実行
 */

// キーコンビネーションの設定を表すインターフェース
interface KeyCombination {
  key: string;        // 押されるべきキー（例: 's', 'Enter'）
  ctrl?: boolean;     // Ctrl キーが押されているか
  shift?: boolean;    // Shift キーが押されているか
  alt?: boolean;      // Alt キーが押されているか
}

// キーコンビネーションを検出してコールバックを実行する関数
function onKeyCombination(
  element: HTMLElement,
  combination: KeyCombination,
  callback: () => void
): void {
  element.addEventListener('keydown', (event: Event) => {
    const keyEvent = event as KeyboardEvent;

    // キーが一致するかチェック
    const keyMatches = keyEvent.key.toLowerCase() === combination.key.toLowerCase();

    // 修飾キーが一致するかチェック（指定がない場合は押されていないことを期待）
    const ctrlMatches = combination.ctrl === undefined ? true : keyEvent.ctrlKey === combination.ctrl;
    const shiftMatches = combination.shift === undefined ? true : keyEvent.shiftKey === combination.shift;
    const altMatches = combination.alt === undefined ? true : keyEvent.altKey === combination.alt;

    // すべての条件が一致したらコールバックを実行
    if (keyMatches && ctrlMatches && shiftMatches && altMatches) {
      // ブラウザのデフォルト動作を防ぐ（例: Ctrl+S で保存ダイアログが開くのを防ぐ）
      keyEvent.preventDefault();
      callback();
    }
  });
}

/* ============================================================================
 * 問題 19: クリックアウトサイド検出
 * ============================================================================
 * 要素の外側がクリックされたことを検出する関数を実装してください。
 *
 * 要件:
 * - document にイベントリスナーを登録
 * - 指定された要素の外側がクリックされたときにコールバックを実行
 */

// 要素の外側がクリックされたことを検出する関数
// モーダルやドロップダウンを閉じる際などに使用
function onClickOutside(
  element: HTMLElement,
  callback: () => void
): () => void {
  // クリックイベントハンドラー
  const handler = (event: Event) => {
    const target = event.target as Node;

    // クリックされた要素が、指定された要素の外側の場合
    if (!element.contains(target)) {
      callback();
    }
  };

  // document にイベントリスナーを登録
  // キャプチャフェーズで登録することで、より早く検出可能
  document.addEventListener('click', handler, true);

  // リスナーを削除する関数を返す
  return () => {
    document.removeEventListener('click', handler, true);
  };
}

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

// イベントバス（Pub/Sub パターン）の実装
// アプリケーション全体でイベントを管理するためのクラス
class EventBus {
  // イベント名とリスナーのマッピング
  // Set を使うことで、同じリスナーを重複登録しない
  private listeners: Map<string, Set<Function>> = new Map();

  // イベントをリスン（購読）
  on<T>(event: string, callback: (data: T) => void): () => void {
    // イベント名に対応するリスナーセットを取得または作成
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    const eventListeners = this.listeners.get(event)!;
    eventListeners.add(callback);

    // 購読解除関数を返す
    return () => {
      this.off(event, callback);
    };
  }

  // イベントを発火（発行）
  emit<T>(event: string, data: T): void {
    // イベント名に対応するリスナーを取得
    const eventListeners = this.listeners.get(event);

    if (eventListeners) {
      // すべてのリスナーを実行
      eventListeners.forEach(callback => {
        // 型安全性のため、コールバックの型をチェック
        (callback as (data: T) => void)(data);
      });
    }
  }

  // イベントリスナーを削除（購読解除）
  off(event: string, callback: Function): void {
    const eventListeners = this.listeners.get(event);

    if (eventListeners) {
      eventListeners.delete(callback);

      // リスナーがなくなったらマップからも削除
      if (eventListeners.size === 0) {
        this.listeners.delete(event);
      }
    }
  }
}

// ============================================================================
// テストコード
// ============================================================================

// 問題 1 のテスト
const button = document.createElement('button');
button.addEventListener('click', handleClick);

// 問題 2 のテスト
const input = document.createElement('input');
onEnterKey(input, () => console.log('Enter pressed!'));

// 問題 3 のテスト
const form = document.createElement('form');
form.addEventListener('submit', handleFormSubmit);

// 問題 4 のテスト
onInputChange(input, (value) => console.log('Input value:', value));

// 問題 5 のテスト
const box = document.createElement('div');
onHover(
  box,
  () => console.log('Mouse entered'),
  () => console.log('Mouse left')
);

// 問題 6 のテスト
const list = document.createElement('ul');
delegateListClick(list, (item) => console.log('Clicked:', item.textContent));

// 問題 7 のテスト
const handler: EventHandler<MouseEvent> = (e) => console.log(e.clientX);

// 問題 8 のテスト
const removeListener = addListener(button, 'click', (e) => {
  console.log('Clicked at', e.clientX, e.clientY);
});
removeListener(); // リスナーを削除

// 問題 9 のテスト
const debouncedLog = debounce((msg: string) => console.log(msg), 500);
input.addEventListener('input', () => debouncedLog('Input changed'));

// 問題 10 のテスト
const throttledScroll = throttle(() => console.log('Scrolled'), 1000);
window.addEventListener('scroll', throttledScroll);

// 問題 11 のテスト
setupFocusHandlers(
  input,
  () => console.log('Focused'),
  () => console.log('Blurred')
);

// 問題 12 のテスト
const draggable = document.createElement('div');
makeDraggable(
  draggable,
  (e) => console.log('Drag started'),
  (e) => console.log('Drag ended')
);

// 問題 13 のテスト
const customEvent = createCustomEvent('user-login', { userId: 123 });
dispatchCustomEvent(document.body, 'user-login', { userId: 123 });

// 問題 14 のテスト
button.addEventListener('click', (e) => {
  EventController.stop(e, true); // 伝播を止めてデフォルト動作も防ぐ
});

// 問題 15 のテスト
const removeAll = addMultipleListeners(
  input,
  ['focus', 'blur', 'input'],
  (e) => console.log('Event:', e.type)
);
removeAll(); // すべてのリスナーを削除

// 問題 16 のテスト
const pausable = new PausableListener(button, 'click', (e) => {
  console.log('Clicked');
});
pausable.pause();
pausable.resume();

// 問題 17 のテスト
addOnceListener(button, 'click', (e) => {
  console.log('This will only run once');
});

// 問題 18 のテスト
onKeyCombination(
  document.body,
  { key: 's', ctrl: true },
  () => console.log('Ctrl+S pressed')
);

// 問題 19 のテスト
const modal = document.createElement('div');
const removeClickOutside = onClickOutside(modal, () => {
  console.log('Clicked outside modal');
});

// 問題 20 のテスト
const eventBus = new EventBus();
const unsubscribe = eventBus.on<{ userId: number }>('user-login', (data) => {
  console.log('User logged in:', data.userId);
});
eventBus.emit('user-login', { userId: 123 });
unsubscribe();
