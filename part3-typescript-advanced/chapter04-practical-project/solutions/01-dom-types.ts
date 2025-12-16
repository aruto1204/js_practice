/**
 * Part 3: TypeScript 実践編
 * Chapter 4: 実践的なプロジェクト
 * 演習 1: DOM 操作と型 - 解答
 *
 * このファイルでは、TypeScript での DOM 操作と型定義を学びます。
 */

/* ============================================================================
 * 問題 1: 要素の取得と型
 * ============================================================================
 * getElementById を使って要素を取得し、適切な型を指定してください。
 *
 * 要件:
 * - ID が "app" の要素を HTMLDivElement 型で取得
 * - null チェックを行い、要素が存在しない場合はエラーをスロー
 */

/**
 * ID が "app" の要素を HTMLDivElement として取得する
 *
 * getElementById は HTMLElement | null を返すため、
 * 型アサーションまたは null チェック後の型ガードが必要
 */
function getAppElement(): HTMLDivElement {
  const element = document.getElementById('app');

  // null チェックを行い、存在しない場合はエラーをスロー
  if (!element) {
    throw new Error('Element with id "app" not found');
  }

  // HTMLDivElement として型アサーション
  return element as HTMLDivElement;
}

/* ============================================================================
 * 問題 2: querySelector の型指定
 * ============================================================================
 * querySelector にジェネリック型を指定して、型安全に要素を取得してください。
 *
 * 要件:
 * - クラス "container" を持つ div 要素を取得
 * - HTMLDivElement 型を明示的に指定
 */

/**
 * クラス "container" を持つ div 要素を取得する
 *
 * querySelector はジェネリック関数で、型パラメータを指定することで
 * 戻り値の型を明示的に指定できる
 */
function getContainerElement(): HTMLDivElement | null {
  // querySelector にジェネリック型パラメータを指定
  return document.querySelector<HTMLDivElement>('.container');
}

/* ============================================================================
 * 問題 3: フォーム要素の取得
 * ============================================================================
 * フォーム内の各種要素を適切な型で取得してください。
 *
 * 要件:
 * - input 要素 (#username) を HTMLInputElement 型で取得
 * - textarea 要素 (#bio) を HTMLTextAreaElement 型で取得
 * - button 要素 (#submit) を HTMLButtonElement 型で取得
 */

/**
 * フォーム内の各種要素を取得する
 *
 * 各要素に対して適切な HTML 要素型を指定することで、
 * value や disabled などのプロパティに型安全にアクセスできる
 */
function getFormElements(): {
  username: HTMLInputElement;
  bio: HTMLTextAreaElement;
  submit: HTMLButtonElement;
} {
  const username = document.querySelector<HTMLInputElement>('#username');
  const bio = document.querySelector<HTMLTextAreaElement>('#bio');
  const submit = document.querySelector<HTMLButtonElement>('#submit');

  // すべての要素が存在することを確認
  if (!username || !bio || !submit) {
    throw new Error('Required form elements not found');
  }

  return { username, bio, submit };
}

/* ============================================================================
 * 問題 4: 要素の作成
 * ============================================================================
 * createElement を使って要素を作成し、適切な型を返す関数を実装してください。
 *
 * 要件:
 * - ジェネリック型を使用
 * - タグ名に応じて適切な HTMLElement 型を返す
 */

/**
 * タグ名に応じて適切な型の要素を作成する
 *
 * HTMLElementTagNameMap はタグ名と対応する要素型のマッピング
 * K extends keyof HTMLElementTagNameMap でタグ名を制限し、
 * HTMLElementTagNameMap[K] で対応する要素型を取得
 */
function createTypedElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K
): HTMLElementTagNameMap[K] {
  return document.createElement(tagName);
}

/* ============================================================================
 * 問題 5: テキストコンテンツの設定
 * ============================================================================
 * 要素のテキストコンテンツを設定する型安全な関数を実装してください。
 *
 * 要件:
 * - 要素が存在しない場合はエラーをスロー
 * - textContent を使用
 */

/**
 * セレクターで指定した要素のテキストコンテンツを設定する
 *
 * textContent は innerHTML と異なり、HTML タグをエスケープするため
 * XSS 攻撃のリスクが低い
 */
function setTextContent(selector: string, text: string): void {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }

  element.textContent = text;
}

/* ============================================================================
 * 問題 6: 属性の操作
 * ============================================================================
 * 要素の属性を設定・取得する型安全な関数を実装してください。
 *
 * 要件:
 * - setAttribute と getAttribute を使用
 * - 型パラメータで要素の型を指定可能にする
 */

/**
 * 要素に属性を設定する
 *
 * ジェネリック型 T を使用することで、どの HTML 要素型でも受け入れ可能
 */
function setAttr<T extends HTMLElement>(
  element: T,
  name: string,
  value: string
): void {
  element.setAttribute(name, value);
}

/**
 * 要素から属性を取得する
 *
 * getAttribute は属性が存在しない場合 null を返すため、
 * 戻り値の型は string | null
 */
function getAttr<T extends HTMLElement>(
  element: T,
  name: string
): string | null {
  return element.getAttribute(name);
}

/* ============================================================================
 * 問題 7: クラスリストの操作
 * ============================================================================
 * 要素のクラスを追加・削除・トグルする関数を実装してください。
 *
 * 要件:
 * - classList API を使用
 * - メソッドチェーンをサポート
 */

/**
 * クラスリストを操作するヘルパークラス
 *
 * メソッドチェーンをサポートするため、各メソッドは this を返す
 * this を返すことで、helper.add('a').remove('b').toggle('c') のように連鎖可能
 */
class ClassListHelper {
  constructor(private element: HTMLElement) {}

  /**
   * クラスを追加する
   */
  add(className: string): this {
    this.element.classList.add(className);
    return this;
  }

  /**
   * クラスを削除する
   */
  remove(className: string): this {
    this.element.classList.remove(className);
    return this;
  }

  /**
   * クラスをトグル（存在すれば削除、存在しなければ追加）する
   */
  toggle(className: string): this {
    this.element.classList.toggle(className);
    return this;
  }

  /**
   * クラスが存在するか確認する
   */
  has(className: string): boolean {
    return this.element.classList.contains(className);
  }
}

/* ============================================================================
 * 問題 8: スタイルの操作
 * ============================================================================
 * 要素のスタイルを設定する型安全な関数を実装してください。
 *
 * 要件:
 * - CSSStyleDeclaration のプロパティを使用
 * - 複数のスタイルを一度に設定可能
 */

/**
 * 要素に複数のスタイルを設定する
 *
 * Partial<CSSStyleDeclaration> により、CSSStyleDeclaration のすべてのプロパティを
 * オプショナルとして受け取ることができる
 * Object.assign を使用して一度に複数のスタイルを設定
 */
function setStyles(
  element: HTMLElement,
  styles: Partial<CSSStyleDeclaration>
): void {
  // CSSStyleDeclaration のプロパティを element.style にコピー
  Object.assign(element.style, styles);
}

/* ============================================================================
 * 問題 9: 子要素の追加
 * ============================================================================
 * 親要素に子要素を追加する関数を実装してください。
 *
 * 要件:
 * - appendChild を使用
 * - 複数の子要素を一度に追加可能
 */

/**
 * 親要素に複数の子要素を追加する
 *
 * 可変長引数（...children）を使用して、任意の数の子要素を受け取る
 * forEach で各子要素を順番に追加
 */
function appendChildren(
  parent: HTMLElement,
  ...children: HTMLElement[]
): void {
  children.forEach(child => {
    parent.appendChild(child);
  });
}

/* ============================================================================
 * 問題 10: 要素の削除
 * ============================================================================
 * セレクターに一致する要素を削除する関数を実装してください。
 *
 * 要件:
 * - querySelector を使用
 * - 要素が存在しない場合は何もしない
 */

/**
 * セレクターで指定した要素を削除する
 *
 * 要素が存在しない場合は何もしない（エラーをスローしない）
 * remove() メソッドで要素を DOM から削除
 */
function removeElement(selector: string): void {
  const element = document.querySelector(selector);

  // 要素が存在する場合のみ削除
  if (element) {
    element.remove();
  }
}

/* ============================================================================
 * 問題 11: NodeList の型安全な操作
 * ============================================================================
 * querySelectorAll の結果を型安全に処理する関数を実装してください。
 *
 * 要件:
 * - ジェネリック型を使用
 * - forEach で各要素を処理
 */

/**
 * セレクターで指定したすべての要素に対してコールバックを実行する
 *
 * querySelectorAll は NodeListOf<Element> を返すため、
 * ジェネリック型 T を指定して型安全に処理
 */
function forEachElement<T extends HTMLElement>(
  selector: string,
  callback: (element: T, index: number) => void
): void {
  const elements = document.querySelectorAll<T>(selector);

  // NodeList の forEach メソッドを使用
  elements.forEach((element, index) => {
    callback(element, index);
  });
}

/* ============================================================================
 * 問題 12: データ属性の型定義
 * ============================================================================
 * data-* 属性を型安全に扱うヘルパー関数を実装してください。
 *
 * 要件:
 * - dataset プロパティを使用
 * - キーの型を制限
 */

/**
 * 使用可能なデータ属性の型定義
 *
 * インターフェースで許可されるキーを定義することで、
 * タイポを防ぎ、型安全性を向上させる
 */
interface DataAttributes {
  userId?: string;
  index?: string;
  active?: string;
}

/**
 * 要素にデータ属性を設定する
 *
 * K extends keyof DataAttributes でキーを制限し、
 * 定義されていないキーは設定できないようにする
 */
function setData<K extends keyof DataAttributes>(
  element: HTMLElement,
  key: K,
  value: string
): void {
  // dataset は data-* 属性にアクセスするための DOMStringMap オブジェクト
  element.dataset[key] = value;
}

/**
 * 要素からデータ属性を取得する
 *
 * 戻り値は string | undefined（属性が存在しない場合は undefined）
 */
function getData<K extends keyof DataAttributes>(
  element: HTMLElement,
  key: K
): string | undefined {
  return element.dataset[key];
}

/* ============================================================================
 * 問題 13: フォームデータの収集
 * ============================================================================
 * フォームからデータを収集する型安全な関数を実装してください。
 *
 * 要件:
 * - FormData API を使用
 * - 型定義されたオブジェクトを返す
 */

/**
 * ログインフォームのデータ型定義
 */
interface LoginFormData {
  username: string;
  password: string;
  remember: string;
}

/**
 * フォームからデータを収集する
 *
 * FormData API を使用してフォームの値を取得し、
 * 型定義されたオブジェクトに変換
 */
function collectFormData(form: HTMLFormElement): LoginFormData {
  const formData = new FormData(form);

  return {
    username: formData.get('username') as string,
    password: formData.get('password') as string,
    remember: formData.get('remember') as string,
  };
}

/* ============================================================================
 * 問題 14: テーブル行の生成
 * ============================================================================
 * データ配列からテーブル行を生成する関数を実装してください。
 *
 * 要件:
 * - ジェネリック型を使用
 * - 各データをテーブル行（tr）として生成
 */

/**
 * ユーザーデータの型定義
 */
interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * データ配列からテーブル行を生成する
 *
 * Record<string, any> を使用して、任意のオブジェクト型を受け入れ可能にする
 * Object.values でオブジェクトの値を配列として取得し、各値を td 要素に変換
 */
function createTableRows<T extends Record<string, any>>(
  data: T[]
): HTMLTableRowElement[] {
  return data.map(item => {
    const tr = document.createElement('tr');

    // オブジェクトの各値を td 要素として追加
    Object.values(item).forEach(value => {
      const td = document.createElement('td');
      td.textContent = String(value);
      tr.appendChild(td);
    });

    return tr;
  });
}

/* ============================================================================
 * 問題 15: リストアイテムの生成
 * ============================================================================
 * 文字列配列からリストアイテム（li）を生成する関数を実装してください。
 *
 * 要件:
 * - map を使用
 * - DocumentFragment を使ってパフォーマンスを最適化
 */

/**
 * 文字列配列からリストアイテムを生成する
 *
 * DocumentFragment を使用することで、DOM への追加を一度にまとめて行い、
 * リフロー/リペイントの回数を減らしてパフォーマンスを向上させる
 */
function createListItems(items: string[]): DocumentFragment {
  const fragment = document.createDocumentFragment();

  // 各文字列を li 要素に変換して fragment に追加
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    fragment.appendChild(li);
  });

  return fragment;
}

/* ============================================================================
 * 問題 16: 要素の検索
 * ============================================================================
 * 親要素内で特定の条件に一致する子要素を検索する関数を実装してください。
 *
 * 要件:
 * - 述語関数を使用
 * - 最初に一致した要素を返す
 */

/**
 * 親要素内で条件に一致する最初の子要素を検索する
 *
 * 述語関数（predicate）を使用して、柔軟な検索条件を指定可能
 * Array.from で NodeList を配列に変換し、find メソッドを使用
 */
function findElement<T extends HTMLElement>(
  parent: HTMLElement,
  predicate: (element: T) => boolean
): T | null {
  // すべての子要素を取得
  const children = Array.from(parent.children) as T[];

  // 述語関数に一致する最初の要素を検索
  return children.find(predicate) || null;
}

/* ============================================================================
 * 問題 17: innerHTML の型安全なラッパー
 * ============================================================================
 * innerHTML を使用する際の型安全なラッパー関数を実装してください。
 *
 * 要件:
 * - XSS 対策のため、HTML をエスケープする関数も提供
 * - サニタイズされていない HTML を扱う場合は警告を表示
 */

/**
 * HTML 文字列をエスケープする
 *
 * XSS 攻撃を防ぐため、特殊文字（<, >, &, ', "）をエンティティに変換
 */
function escapeHTML(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * 要素に innerHTML を設定する
 *
 * sanitize パラメータが true の場合、HTML をエスケープしてから設定
 * false の場合は警告を表示（セキュリティリスクの注意喚起）
 */
function setInnerHTML(element: HTMLElement, html: string, sanitize = true): void {
  if (sanitize) {
    // HTML をエスケープして安全に設定
    element.textContent = html;
  } else {
    // 警告を表示
    console.warn('⚠️ Setting unsanitized HTML. This may be a security risk.');
    element.innerHTML = html;
  }
}

/* ============================================================================
 * 問題 18: 要素の表示/非表示
 * ============================================================================
 * 要素の表示・非表示を切り替える関数を実装してください。
 *
 * 要件:
 * - display プロパティを使用
 * - show, hide, toggle メソッドを提供
 */

/**
 * 要素の表示/非表示を操作するヘルパークラス
 *
 * メソッドチェーンをサポートするため、各メソッドは this を返す
 */
class VisibilityHelper {
  constructor(private element: HTMLElement) {}

  /**
   * 要素を表示する
   */
  show(): this {
    this.element.style.display = '';
    return this;
  }

  /**
   * 要素を非表示にする
   */
  hide(): this {
    this.element.style.display = 'none';
    return this;
  }

  /**
   * 要素の表示/非表示を切り替える
   */
  toggle(): this {
    if (this.isVisible()) {
      this.hide();
    } else {
      this.show();
    }
    return this;
  }

  /**
   * 要素が表示されているか確認する
   */
  isVisible(): boolean {
    return this.element.style.display !== 'none';
  }
}

/* ============================================================================
 * 問題 19: 要素のクローン
 * ============================================================================
 * 要素をクローンする型安全な関数を実装してください。
 *
 * 要件:
 * - cloneNode を使用
 * - ジェネリック型で元の要素の型を保持
 */

/**
 * 要素をクローンする
 *
 * ジェネリック型 T を使用して、元の要素の型をクローン後も保持
 * deep パラメータで、子要素も含めてクローンするかを指定
 */
function cloneElement<T extends HTMLElement>(
  element: T,
  deep = true
): T {
  // cloneNode は Node 型を返すため、元の型にキャスト
  return element.cloneNode(deep) as T;
}

/* ============================================================================
 * 問題 20: DOM ビルダー
 * ============================================================================
 * 流暢な API で DOM 要素を構築するビルダークラスを実装してください。
 *
 * 要件:
 * - メソッドチェーンをサポート
 * - テキスト、属性、クラス、子要素の設定が可能
 */

/**
 * DOM 要素を構築するビルダークラス
 *
 * ビルダーパターンにより、メソッドチェーンで流暢に要素を構築できる
 * 各メソッドは this を返すことで、連鎖的に呼び出し可能
 */
class DOMBuilder<T extends HTMLElement> {
  constructor(private element: T) {}

  /**
   * テキストコンテンツを設定する
   */
  text(content: string): this {
    this.element.textContent = content;
    return this;
  }

  /**
   * 属性を設定する
   */
  attr(name: string, value: string): this {
    this.element.setAttribute(name, value);
    return this;
  }

  /**
   * クラスを追加する
   */
  addClass(className: string): this {
    this.element.classList.add(className);
    return this;
  }

  /**
   * 子要素を追加する
   */
  child(element: HTMLElement): this {
    this.element.appendChild(element);
    return this;
  }

  /**
   * 構築した要素を返す
   */
  build(): T {
    return this.element;
  }
}

/**
 * DOM ビルダーのファクトリー関数
 *
 * タグ名から適切な型の DOMBuilder インスタンスを生成
 */
function dom<K extends keyof HTMLElementTagNameMap>(
  tagName: K
): DOMBuilder<HTMLElementTagNameMap[K]> {
  const element = document.createElement(tagName);
  return new DOMBuilder(element);
}

// ============================================================================
// テストコード
// ============================================================================

// 問題 1 のテスト
const appElement = getAppElement();
console.log(appElement); // HTMLDivElement

// 問題 2 のテスト
const container = getContainerElement();
if (container) {
  console.log(container); // HTMLDivElement | null
}

// 問題 3 のテスト
const formElements = getFormElements();
console.log(formElements.username.value);
console.log(formElements.bio.value);

// 問題 4 のテスト
const div = createTypedElement('div'); // HTMLDivElement
const button = createTypedElement('button'); // HTMLButtonElement
const input = createTypedElement('input'); // HTMLInputElement

// 問題 5 のテスト
setTextContent('#title', 'Hello, TypeScript!');

// 問題 6 のテスト
const element = document.createElement('div');
setAttr(element, 'id', 'test');
const id = getAttr(element, 'id'); // 'test'

// 問題 7 のテスト
const helper = new ClassListHelper(document.createElement('div'));
helper.add('active').add('visible').remove('hidden');
console.log(helper.has('active')); // true

// 問題 8 のテスト
const box = document.createElement('div');
setStyles(box, { color: 'red', backgroundColor: 'blue', fontSize: '16px' });

// 問題 9 のテスト
const parentDiv = document.createElement('div');
const child1 = document.createElement('span');
const child2 = document.createElement('span');
appendChildren(parentDiv, child1, child2);

// 問題 10 のテスト
removeElement('.old-content');

// 問題 11 のテスト
forEachElement<HTMLLIElement>('li', (element, index) => {
  element.textContent = `Item ${index + 1}`;
});

// 問題 12 のテスト
const el = document.createElement('div');
setData(el, 'userId', '123');
const userId = getData(el, 'userId'); // '123'

// 問題 13 のテスト
const form = document.querySelector('form')!;
const data = collectFormData(form);
console.log(data.username, data.password);

// 問題 14 のテスト
const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];
const rows = createTableRows(users);

// 問題 15 のテスト
const items = ['Apple', 'Banana', 'Cherry'];
const fragment = createListItems(items);
document.querySelector('ul')!.appendChild(fragment);

// 問題 16 のテスト
const parentElement = document.body;
const found = findElement<HTMLDivElement>(parentElement, (el) => el.className === 'target');

// 問題 17 のテスト
const containerEl = document.createElement('div');
setInnerHTML(containerEl, '<p>Safe content</p>');
const escaped = escapeHTML('<script>alert("XSS")</script>');

// 問題 18 のテスト
const visibility = new VisibilityHelper(document.createElement('div'));
visibility.hide().show().toggle();
console.log(visibility.isVisible());

// 問題 19 のテスト
const original = document.createElement('div');
const clone = cloneElement(original);

// 問題 20 のテスト
const elementBuilt = dom('div')
  .text('Hello')
  .addClass('container')
  .attr('id', 'main')
  .child(dom('span').text('World').build())
  .build();
