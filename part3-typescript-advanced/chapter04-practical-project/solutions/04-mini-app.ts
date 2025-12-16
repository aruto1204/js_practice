/**
 * Part 3: TypeScript 実践編
 * Chapter 4: 実践的なプロジェクト
 * 演習 4: 小規模アプリケーション - 解答
 *
 * このファイルでは、これまで学んだ知識を統合して小規模アプリケーションを作成します。
 */

/* ============================================================================
 * プロジェクト 1: Todo アプリケーション(基本)
 * ============================================================================
 * シンプルな Todo アプリケーションを実装してください。
 *
 * 要件:
 * - Todo の追加・削除・完了状態の切り替え
 * - Todo インターフェース（id, text, completed）
 * - TodoApp クラス
 */

// Todo インターフェース: 各Todoアイテムの型定義
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// TodoApp クラス: Todo管理アプリケーション
class TodoApp {
  private todos: Todo[] = [];
  private nextId = 1;

  constructor(
    private listElement: HTMLUListElement,
    private inputElement: HTMLInputElement,
    private addButton: HTMLButtonElement
  ) {
    this.setupEventListeners();
    this.render();
  }

  // イベントリスナーの設定
  private setupEventListeners(): void {
    // 追加ボタンのクリックイベント
    this.addButton.addEventListener('click', () => this.addTodo());

    // Enterキーでも追加できるように
    this.inputElement.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addTodo();
      }
    });
  }

  // Todoの追加
  private addTodo(): void {
    const text = this.inputElement.value.trim();
    if (text === '') return;

    const todo: Todo = {
      id: this.nextId++,
      text,
      completed: false,
    };

    this.todos.push(todo);
    this.inputElement.value = '';
    this.render();
  }

  // Todoの完了状態の切り替え
  protected toggleTodo(id: number): void {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.render();
    }
  }

  // Todoの削除
  protected deleteTodo(id: number): void {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.render();
  }

  // Todoリストの表示
  protected render(): void {
    this.listElement.innerHTML = '';

    this.todos.forEach((todo) => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.gap = '10px';
      li.style.padding = '8px';
      li.style.borderBottom = '1px solid #eee';

      // チェックボックス
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', () => this.toggleTodo(todo.id));

      // テキスト
      const span = document.createElement('span');
      span.textContent = todo.text;
      span.style.textDecoration = todo.completed ? 'line-through' : 'none';
      span.style.color = todo.completed ? '#999' : '#000';
      span.style.flex = '1';

      // 削除ボタン
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '削除';
      deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      this.listElement.appendChild(li);
    });
  }
}

/* ============================================================================
 * プロジェクト 2: フィルター機能付き Todo アプリ
 * ============================================================================
 * フィルター機能を追加した Todo アプリケーションを実装してください。
 *
 * 要件:
 * - 全て・完了済み・未完了のフィルター
 * - FilterType 型（'all' | 'active' | 'completed'）
 * - フィルターボタンの実装
 */

// フィルタータイプの定義
type FilterType = 'all' | 'active' | 'completed';

// フィルター機能付きTodoApp
class FilteredTodoApp extends TodoApp {
  private filter: FilterType = 'all';

  constructor(
    listElement: HTMLUListElement,
    inputElement: HTMLInputElement,
    addButton: HTMLButtonElement,
    private filterButtons: {
      all: HTMLButtonElement;
      active: HTMLButtonElement;
      completed: HTMLButtonElement;
    }
  ) {
    super(listElement, inputElement, addButton);
    this.setupFilterListeners();
  }

  // フィルターボタンのイベントリスナー設定
  private setupFilterListeners(): void {
    this.filterButtons.all.addEventListener('click', () =>
      this.setFilter('all')
    );
    this.filterButtons.active.addEventListener('click', () =>
      this.setFilter('active')
    );
    this.filterButtons.completed.addEventListener('click', () =>
      this.setFilter('completed')
    );
  }

  // フィルターの設定
  private setFilter(filter: FilterType): void {
    this.filter = filter;
    this.updateFilterButtonStyles();
    this.render();
  }

  // フィルターボタンのスタイル更新
  private updateFilterButtonStyles(): void {
    Object.entries(this.filterButtons).forEach(([key, button]) => {
      button.style.fontWeight = key === this.filter ? 'bold' : 'normal';
      button.style.backgroundColor =
        key === this.filter ? '#007bff' : '#f0f0f0';
      button.style.color = key === this.filter ? '#fff' : '#000';
    });
  }

  // フィルター適用後のTodoリストを取得
  private getFilteredTodos(): Todo[] {
    const todos = (this as any).todos as Todo[];

    switch (this.filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }

  // renderメソッドをオーバーライド（フィルター適用）
  protected render(): void {
    const listElement = (this as any).listElement as HTMLUListElement;
    listElement.innerHTML = '';

    const filteredTodos = this.getFilteredTodos();

    filteredTodos.forEach((todo) => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.gap = '10px';
      li.style.padding = '8px';
      li.style.borderBottom = '1px solid #eee';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', () => this.toggleTodo(todo.id));

      const span = document.createElement('span');
      span.textContent = todo.text;
      span.style.textDecoration = todo.completed ? 'line-through' : 'none';
      span.style.color = todo.completed ? '#999' : '#000';
      span.style.flex = '1';

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '削除';
      deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      listElement.appendChild(li);
    });
  }
}

/* ============================================================================
 * プロジェクト 3: ユーザー検索アプリ
 * ============================================================================
 * API からユーザーを検索して表示するアプリケーションを実装してください。
 *
 * 要件:
 * - 検索フォーム
 * - ユーザーリストの表示
 * - デバウンス処理
 * - ローディング状態の表示
 */

// ユーザー情報のインターフェース
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

// ユーザー検索アプリケーション
class UserSearchApp {
  private users: User[] = [];
  private isLoading = false;
  private debounceTimer: number | null = null;

  constructor(
    private searchInput: HTMLInputElement,
    private userList: HTMLUListElement,
    private loadingIndicator: HTMLElement
  ) {
    this.setupEventListeners();
  }

  // イベントリスナーの設定
  private setupEventListeners(): void {
    this.searchInput.addEventListener('input', () => {
      const query = this.searchInput.value.trim();

      // デバウンス処理: 300ms後に検索実行
      if (this.debounceTimer !== null) {
        clearTimeout(this.debounceTimer);
      }

      this.debounceTimer = window.setTimeout(() => {
        this.searchUsers(query);
      }, 300);
    });
  }

  // ユーザー検索（API呼び出しをシミュレート）
  private async searchUsers(query: string): Promise<void> {
    if (query === '') {
      this.users = [];
      this.render();
      return;
    }

    this.showLoading();

    try {
      // 実際のAPIコールの代わりにダミーデータを返す
      await new Promise((resolve) => setTimeout(resolve, 500));

      // ダミーユーザーデータ
      const allUsers: User[] = [
        { id: 1, name: '田中太郎', email: 'tanaka@example.com' },
        { id: 2, name: '佐藤花子', email: 'sato@example.com' },
        { id: 3, name: '鈴木一郎', email: 'suzuki@example.com' },
        { id: 4, name: '高橋美咲', email: 'takahashi@example.com' },
        { id: 5, name: '渡辺健太', email: 'watanabe@example.com' },
      ];

      // クエリに一致するユーザーをフィルタリング
      this.users = allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('ユーザー検索エラー:', error);
      this.users = [];
    } finally {
      this.hideLoading();
      this.render();
    }
  }

  // ユーザーリストの表示
  private render(): void {
    this.userList.innerHTML = '';

    if (this.users.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'ユーザーが見つかりませんでした';
      li.style.color = '#999';
      this.userList.appendChild(li);
      return;
    }

    this.users.forEach((user) => {
      const li = document.createElement('li');
      li.style.padding = '12px';
      li.style.borderBottom = '1px solid #eee';

      const nameDiv = document.createElement('div');
      nameDiv.textContent = user.name;
      nameDiv.style.fontWeight = 'bold';

      const emailDiv = document.createElement('div');
      emailDiv.textContent = user.email;
      emailDiv.style.color = '#666';
      emailDiv.style.fontSize = '14px';

      li.appendChild(nameDiv);
      li.appendChild(emailDiv);
      this.userList.appendChild(li);
    });
  }

  // ローディングインジケーターの表示
  private showLoading(): void {
    this.isLoading = true;
    this.loadingIndicator.style.display = 'block';
  }

  // ローディングインジケーターの非表示
  private hideLoading(): void {
    this.isLoading = false;
    this.loadingIndicator.style.display = 'none';
  }
}

/* ============================================================================
 * プロジェクト 4: カウンターアプリ
 * ============================================================================
 * 状態管理を持つカウンターアプリケーションを実装してください。
 *
 * 要件:
 * - カウント値の表示
 * - インクリメント・デクリメント・リセット
 * - 履歴機能（Undo/Redo）
 */

// カウンターアプリケーション（履歴機能付き）
class CounterApp {
  private count = 0;
  private history: number[] = [0]; // 初期値を履歴に含める
  private historyIndex = 0;

  constructor(
    private countElement: HTMLElement,
    private incrementButton: HTMLButtonElement,
    private decrementButton: HTMLButtonElement,
    private resetButton: HTMLButtonElement,
    private undoButton: HTMLButtonElement,
    private redoButton: HTMLButtonElement
  ) {
    this.setupEventListeners();
    this.render();
  }

  // イベントリスナーの設定
  private setupEventListeners(): void {
    this.incrementButton.addEventListener('click', () => this.increment());
    this.decrementButton.addEventListener('click', () => this.decrement());
    this.resetButton.addEventListener('click', () => this.reset());
    this.undoButton.addEventListener('click', () => this.undo());
    this.redoButton.addEventListener('click', () => this.redo());
  }

  // インクリメント
  private increment(): void {
    this.count++;
    this.saveToHistory();
    this.render();
  }

  // デクリメント
  private decrement(): void {
    this.count--;
    this.saveToHistory();
    this.render();
  }

  // リセット
  private reset(): void {
    this.count = 0;
    this.saveToHistory();
    this.render();
  }

  // 元に戻す（Undo）
  private undo(): void {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.count = this.history[this.historyIndex];
      this.render();
    }
  }

  // やり直し（Redo）
  private redo(): void {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.count = this.history[this.historyIndex];
      this.render();
    }
  }

  // 履歴への保存
  private saveToHistory(): void {
    // 現在の位置より後の履歴を削除（新しい分岐を作成）
    this.history = this.history.slice(0, this.historyIndex + 1);
    // 新しい状態を追加
    this.history.push(this.count);
    this.historyIndex = this.history.length - 1;
  }

  // カウンターの表示
  private render(): void {
    this.countElement.textContent = String(this.count);

    // Undo/Redoボタンの有効/無効化
    this.undoButton.disabled = this.historyIndex === 0;
    this.redoButton.disabled = this.historyIndex === this.history.length - 1;
  }
}

/* ============================================================================
 * プロジェクト 5: モーダルダイアログ
 * ============================================================================
 * 再利用可能なモーダルダイアログコンポーネントを実装してください。
 *
 * 要件:
 * - 表示・非表示のメソッド
 * - 外側クリックで閉じる
 * - ESC キーで閉じる
 * - コールバックの型定義
 */

// モーダルオプションの型定義
interface ModalOptions {
  title?: string;
  content?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

// モーダルダイアログコンポーネント
class Modal {
  private element: HTMLDivElement;
  private overlay: HTMLDivElement;

  constructor(private options: ModalOptions) {
    this.overlay = this.createOverlay();
    this.element = this.createModalElement();
    this.setupEventListeners();
  }

  // オーバーレイ（背景）の作成
  private createOverlay(): HTMLDivElement {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.display = 'none';
    overlay.style.zIndex = '999';
    return overlay;
  }

  // モーダル要素の作成
  private createModalElement(): HTMLDivElement {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.borderRadius = '8px';
    modal.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    modal.style.minWidth = '300px';
    modal.style.display = 'none';
    modal.style.zIndex = '1000';

    // タイトル
    if (this.options.title) {
      const title = document.createElement('h3');
      title.textContent = this.options.title;
      title.style.marginTop = '0';
      modal.appendChild(title);
    }

    // コンテンツ
    if (this.options.content) {
      const content = document.createElement('p');
      content.textContent = this.options.content;
      modal.appendChild(content);
    }

    // ボタンコンテナ
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '10px';
    buttonContainer.style.justifyContent = 'flex-end';
    buttonContainer.style.marginTop = '20px';

    // キャンセルボタン
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'キャンセル';
    cancelBtn.addEventListener('click', () => {
      this.hide();
      this.options.onCancel?.();
    });

    // 確認ボタン
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = '確認';
    confirmBtn.style.backgroundColor = '#007bff';
    confirmBtn.style.color = 'white';
    confirmBtn.style.border = 'none';
    confirmBtn.style.padding = '8px 16px';
    confirmBtn.style.borderRadius = '4px';
    confirmBtn.addEventListener('click', () => {
      this.hide();
      this.options.onConfirm?.();
    });

    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(confirmBtn);
    modal.appendChild(buttonContainer);

    return modal;
  }

  // イベントリスナーの設定
  private setupEventListeners(): void {
    // オーバーレイクリックで閉じる
    this.overlay.addEventListener('click', () => {
      this.hide();
      this.options.onCancel?.();
    });

    // ESCキーで閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.element.style.display !== 'none') {
        this.hide();
        this.options.onCancel?.();
      }
    });
  }

  // モーダルの表示
  show(): void {
    if (!this.overlay.parentElement) {
      document.body.appendChild(this.overlay);
      document.body.appendChild(this.element);
    }
    this.overlay.style.display = 'block';
    this.element.style.display = 'block';
  }

  // モーダルの非表示
  hide(): void {
    this.overlay.style.display = 'none';
    this.element.style.display = 'none';
  }
}

/* ============================================================================
 * プロジェクト 6: タブコンポーネント
 * ============================================================================
 * タブ切り替えコンポーネントを実装してください。
 *
 * 要件:
 * - 複数のタブパネル
 * - アクティブなタブのハイライト
 * - タブの動的追加・削除
 */

// タブの型定義
interface Tab {
  id: string;
  title: string;
  content: HTMLElement;
}

// タブコンポーネント
class Tabs {
  private tabs: Tab[] = [];
  private activeTabId: string | null = null;

  constructor(
    private tabsContainer: HTMLElement,
    private panelsContainer: HTMLElement
  ) {
    // 初期化
    this.render();
  }

  // タブの追加
  addTab(tab: Tab): void {
    this.tabs.push(tab);

    // 最初のタブを自動的にアクティブにする
    if (this.tabs.length === 1) {
      this.activeTabId = tab.id;
    }

    this.render();
  }

  // タブの削除
  removeTab(id: string): void {
    const index = this.tabs.findIndex((tab) => tab.id === id);
    if (index === -1) return;

    this.tabs.splice(index, 1);

    // アクティブなタブが削除された場合
    if (this.activeTabId === id) {
      this.activeTabId = this.tabs.length > 0 ? this.tabs[0].id : null;
    }

    this.render();
  }

  // アクティブなタブを設定
  setActive(id: string): void {
    if (this.tabs.some((tab) => tab.id === id)) {
      this.activeTabId = id;
      this.render();
    }
  }

  // タブとパネルの表示
  private render(): void {
    // タブヘッダーのクリア
    this.tabsContainer.innerHTML = '';

    // タブヘッダーの作成
    this.tabs.forEach((tab) => {
      const tabButton = document.createElement('button');
      tabButton.textContent = tab.title;
      tabButton.style.padding = '10px 20px';
      tabButton.style.border = 'none';
      tabButton.style.borderBottom =
        tab.id === this.activeTabId ? '3px solid #007bff' : '3px solid #ddd';
      tabButton.style.backgroundColor =
        tab.id === this.activeTabId ? '#fff' : '#f0f0f0';
      tabButton.style.cursor = 'pointer';

      tabButton.addEventListener('click', () => this.setActive(tab.id));

      this.tabsContainer.appendChild(tabButton);
    });

    // パネルコンテンツのクリア
    this.panelsContainer.innerHTML = '';

    // アクティブなタブのコンテンツを表示
    const activeTab = this.tabs.find((tab) => tab.id === this.activeTabId);
    if (activeTab) {
      this.panelsContainer.appendChild(activeTab.content);
    }
  }
}

/* ============================================================================
 * プロジェクト 7: ページネーションコンポーネント
 * ============================================================================
 * ページネーション機能を実装してください。
 *
 * 要件:
 * - ページ番号の表示
 * - 前へ・次へボタン
 * - ページ変更時のコールバック
 */

// ページネーションオプションの型定義
interface PaginationOptions {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

// ページネーションコンポーネント
class Pagination {
  private currentPage: number;
  private totalPages: number;

  constructor(
    private container: HTMLElement,
    private options: PaginationOptions
  ) {
    this.currentPage = options.currentPage;
    this.totalPages = Math.ceil(options.totalItems / options.itemsPerPage);
    this.render();
  }

  // ページの設定
  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.goToPage(page);
  }

  // ページネーションの表示
  private render(): void {
    this.container.innerHTML = '';

    const nav = document.createElement('nav');
    nav.style.display = 'flex';
    nav.style.gap = '5px';
    nav.style.alignItems = 'center';

    // 前へボタン
    const prevButton = document.createElement('button');
    prevButton.textContent = '前へ';
    prevButton.disabled = this.currentPage === 1;
    prevButton.addEventListener('click', () =>
      this.goToPage(this.currentPage - 1)
    );
    nav.appendChild(prevButton);

    // ページ番号ボタン
    const maxVisible = 5; // 表示する最大ページ数
    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxVisible / 2)
    );
    let endPage = Math.min(this.totalPages, startPage + maxVisible - 1);

    // startPageを調整
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // 最初のページ
    if (startPage > 1) {
      const firstButton = this.createPageButton(1);
      nav.appendChild(firstButton);

      if (startPage > 2) {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        ellipsis.style.padding = '0 5px';
        nav.appendChild(ellipsis);
      }
    }

    // ページ番号
    for (let i = startPage; i <= endPage; i++) {
      const pageButton = this.createPageButton(i);
      nav.appendChild(pageButton);
    }

    // 最後のページ
    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        ellipsis.style.padding = '0 5px';
        nav.appendChild(ellipsis);
      }

      const lastButton = this.createPageButton(this.totalPages);
      nav.appendChild(lastButton);
    }

    // 次へボタン
    const nextButton = document.createElement('button');
    nextButton.textContent = '次へ';
    nextButton.disabled = this.currentPage === this.totalPages;
    nextButton.addEventListener('click', () =>
      this.goToPage(this.currentPage + 1)
    );
    nav.appendChild(nextButton);

    this.container.appendChild(nav);
  }

  // ページボタンの作成
  private createPageButton(page: number): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = String(page);
    button.style.padding = '8px 12px';
    button.style.border = '1px solid #ddd';
    button.style.backgroundColor =
      page === this.currentPage ? '#007bff' : '#fff';
    button.style.color = page === this.currentPage ? '#fff' : '#000';
    button.style.cursor = 'pointer';
    button.addEventListener('click', () => this.goToPage(page));
    return button;
  }

  // ページへ移動
  private goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage)
      return;

    this.currentPage = page;
    this.options.onPageChange(page);
    this.render();
  }
}

/* ============================================================================
 * プロジェクト 8: フォームバリデーション
 * ============================================================================
 * フォームバリデーション機能を実装してください。
 *
 * 要件:
 * - 複数のバリデーションルール
 * - エラーメッセージの表示
 * - リアルタイムバリデーション
 */

// バリデーションルールの型定義（値を検証してエラーメッセージまたはnullを返す）
type ValidationRule = (value: string) => string | null;

// フィールド設定の型定義
interface FieldConfig {
  name: string;
  rules: ValidationRule[];
}

// フォームバリデーター
class FormValidator {
  private errors: Map<string, string> = new Map();

  constructor(
    private form: HTMLFormElement,
    private fields: FieldConfig[]
  ) {
    this.setupEventListeners();
  }

  // イベントリスナーの設定
  private setupEventListeners(): void {
    this.fields.forEach((field) => {
      const input = this.form.elements.namedItem(
        field.name
      ) as HTMLInputElement;
      if (!input) return;

      // blur イベントでバリデーション
      input.addEventListener('blur', () => {
        this.validateField(field.name, input.value);
      });

      // input イベントでエラーをクリア
      input.addEventListener('input', () => {
        if (this.errors.has(field.name)) {
          this.clearError(field.name);
        }
      });
    });

    // フォーム送信時のバリデーション
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.validate()) {
        console.log('フォームが正常に送信されました');
      }
    });
  }

  // 単一フィールドのバリデーション
  private validateField(name: string, value: string): void {
    const field = this.fields.find((f) => f.name === name);
    if (!field) return;

    // すべてのルールを実行
    for (const rule of field.rules) {
      const error = rule(value);
      if (error) {
        this.showError(name, error);
        return;
      }
    }

    // エラーがなければクリア
    this.clearError(name);
  }

  // フォーム全体のバリデーション
  validate(): boolean {
    this.errors.clear();

    this.fields.forEach((field) => {
      const input = this.form.elements.namedItem(
        field.name
      ) as HTMLInputElement;
      if (input) {
        this.validateField(field.name, input.value);
      }
    });

    return this.errors.size === 0;
  }

  // エラーメッセージの表示
  private showError(name: string, message: string): void {
    this.errors.set(name, message);

    const input = this.form.elements.namedItem(name) as HTMLInputElement;
    if (!input) return;

    // エラーメッセージ要素の取得または作成
    let errorElement = input.parentElement?.querySelector(
      '.error-message'
    ) as HTMLElement;

    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.style.color = 'red';
      errorElement.style.fontSize = '14px';
      errorElement.style.marginTop = '5px';
      input.parentElement?.appendChild(errorElement);
    }

    errorElement.textContent = message;
    input.style.borderColor = 'red';
  }

  // エラーのクリア
  private clearError(name: string): void {
    this.errors.delete(name);

    const input = this.form.elements.namedItem(name) as HTMLInputElement;
    if (!input) return;

    const errorElement = input.parentElement?.querySelector(
      '.error-message'
    ) as HTMLElement;
    if (errorElement) {
      errorElement.remove();
    }

    input.style.borderColor = '';
  }
}

// バリデーションルールの例

// 必須チェック
const required: ValidationRule = (value) =>
  value.trim() === '' ? 'この項目は必須です' : null;

// メールアドレス形式チェック
const email: ValidationRule = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ? null
    : 'メールアドレスの形式が正しくありません';

// 最小文字数チェック（高階関数）
const minLength = (min: number): ValidationRule => (value) =>
  value.length >= min ? null : `${min}文字以上入力してください`;

/* ============================================================================
 * プロジェクト 9: ドラッグ&ドロップリスト
 * ============================================================================
 * ドラッグ&ドロップで並び替え可能なリストを実装してください。
 *
 * 要件:
 * - リストアイテムのドラッグ&ドロップ
 * - 並び順の保存
 * - ビジュアルフィードバック
 */

// リストアイテムの型定義
interface ListItem {
  id: string;
  content: string;
  order: number;
}

// ドラッグ&ドロップリスト
class DraggableList {
  private items: ListItem[] = [];
  private draggedItem: ListItem | null = null;

  constructor(private container: HTMLUListElement) {
    this.container.style.listStyle = 'none';
    this.container.style.padding = '0';
  }

  // アイテムの追加
  addItem(content: string): void {
    const item: ListItem = {
      id: `item-${Date.now()}-${Math.random()}`,
      content,
      order: this.items.length,
    };

    this.items.push(item);
    this.render();
  }

  // リストの表示
  private render(): void {
    this.container.innerHTML = '';

    // orderでソート
    const sortedItems = [...this.items].sort((a, b) => a.order - b.order);

    sortedItems.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = item.content;
      li.draggable = true;
      li.style.padding = '12px';
      li.style.margin = '5px 0';
      li.style.backgroundColor = '#f0f0f0';
      li.style.border = '1px solid #ddd';
      li.style.borderRadius = '4px';
      li.style.cursor = 'move';
      li.dataset.index = String(index);

      this.setupDragHandlers(li, item);
      this.container.appendChild(li);
    });
  }

  // ドラッグイベントハンドラーの設定
  private setupDragHandlers(element: HTMLLIElement, item: ListItem): void {
    // ドラッグ開始
    element.addEventListener('dragstart', (e) => {
      this.draggedItem = item;
      element.style.opacity = '0.5';
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
      }
    });

    // ドラッグ終了
    element.addEventListener('dragend', () => {
      element.style.opacity = '1';
      this.draggedItem = null;
    });

    // ドラッグオーバー
    element.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move';
      }
    });

    // ドロップ
    element.addEventListener('drop', (e) => {
      e.preventDefault();

      if (!this.draggedItem || this.draggedItem.id === item.id) return;

      const fromIndex = this.items.findIndex(
        (i) => i.id === this.draggedItem!.id
      );
      const toIndex = this.items.findIndex((i) => i.id === item.id);

      this.reorder(fromIndex, toIndex);
    });

    // ドラッグエンター（視覚的フィードバック）
    element.addEventListener('dragenter', (e) => {
      if (this.draggedItem && this.draggedItem.id !== item.id) {
        element.style.borderTop = '3px solid #007bff';
      }
    });

    // ドラッグリーブ
    element.addEventListener('dragleave', () => {
      element.style.borderTop = '';
    });
  }

  // 並び順の変更
  private reorder(fromIndex: number, toIndex: number): void {
    const [movedItem] = this.items.splice(fromIndex, 1);
    this.items.splice(toIndex, 0, movedItem);

    // orderを再設定
    this.items.forEach((item, index) => {
      item.order = index;
    });

    this.render();
  }
}

/* ============================================================================
 * プロジェクト 10: リアルタイム検索
 * ============================================================================
 * リアルタイムで検索結果をハイライトする機能を実装してください。
 *
 * 要件:
 * - 入力に応じて即座にハイライト
 * - デバウンス処理
 * - ハイライトのクリア
 */

// 検索ハイライト機能
class SearchHighlighter {
  private searchTerm = '';
  private debounceTimer: number | null = null;
  private originalContents: Map<HTMLElement, string> = new Map();

  constructor(
    private searchInput: HTMLInputElement,
    private targetElements: HTMLElement[]
  ) {
    // 元のコンテンツを保存
    this.targetElements.forEach((element) => {
      this.originalContents.set(element, element.textContent || '');
    });

    this.setupEventListeners();
  }

  // イベントリスナーの設定
  private setupEventListeners(): void {
    this.searchInput.addEventListener('input', () => {
      // デバウンス処理
      if (this.debounceTimer !== null) {
        clearTimeout(this.debounceTimer);
      }

      this.debounceTimer = window.setTimeout(() => {
        const term = this.searchInput.value.trim();
        if (term === '') {
          this.clearHighlight();
        } else {
          this.highlight(term);
        }
      }, 200);
    });
  }

  // テキストのハイライト
  private highlight(term: string): void {
    this.searchTerm = term;

    this.targetElements.forEach((element) => {
      const originalText = this.originalContents.get(element) || '';

      if (originalText === '') return;

      // 正規表現でマッチング（大文字小文字を区別しない）
      const escapedTerm = this.escapeRegex(term);
      const regex = new RegExp(`(${escapedTerm})`, 'gi');

      // ハイライト用のHTMLを作成
      const highlightedText = originalText.replace(
        regex,
        '<mark style="background-color: yellow; padding: 2px;">$1</mark>'
      );

      element.innerHTML = highlightedText;
    });
  }

  // ハイライトのクリア
  private clearHighlight(): void {
    this.searchTerm = '';

    this.targetElements.forEach((element) => {
      const originalText = this.originalContents.get(element) || '';
      element.textContent = originalText;
    });
  }

  // 正規表現の特殊文字をエスケープ
  private escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

/* ============================================================================
 * プロジェクト 11: データテーブル
 * ============================================================================
 * ソート・フィルター機能付きのデータテーブルを実装してください。
 *
 * 要件:
 * - カラムヘッダーでソート
 * - テキストフィルター
 * - ページネーション
 */

// カラム定義の型
interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
}

// ソート設定の型
interface SortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

// データテーブルコンポーネント
class DataTable<T extends Record<string, any>> {
  private data: T[] = [];
  private filteredData: T[] = [];
  private sortConfig: SortConfig<T> | null = null;

  constructor(
    private container: HTMLElement,
    private columns: Column<T>[]
  ) {
    this.render();
  }

  // データの設定
  setData(data: T[]): void {
    this.data = data;
    this.filteredData = [...data];
    this.render();
  }

  // ソート処理
  private sort(key: keyof T): void {
    // 現在のソートキーと同じ場合は方向を反転
    if (this.sortConfig && this.sortConfig.key === key) {
      this.sortConfig.direction =
        this.sortConfig.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortConfig = { key, direction: 'asc' };
    }

    this.filteredData.sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue < bValue) {
        return this.sortConfig!.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortConfig!.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.render();
  }

  // フィルター処理
  private filter(term: string): void {
    if (term === '') {
      this.filteredData = [...this.data];
    } else {
      this.filteredData = this.data.filter((row) => {
        return this.columns.some((column) => {
          const value = String(row[column.key]).toLowerCase();
          return value.includes(term.toLowerCase());
        });
      });
    }

    this.render();
  }

  // テーブルの表示
  private render(): void {
    this.container.innerHTML = '';

    // フィルター入力欄
    const filterInput = document.createElement('input');
    filterInput.type = 'text';
    filterInput.placeholder = '検索...';
    filterInput.style.marginBottom = '10px';
    filterInput.style.padding = '8px';
    filterInput.style.width = '100%';
    filterInput.addEventListener('input', () => {
      this.filter(filterInput.value);
    });
    this.container.appendChild(filterInput);

    // テーブル
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';

    // ヘッダー
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    this.columns.forEach((column) => {
      const th = document.createElement('th');
      th.textContent = column.header;
      th.style.padding = '12px';
      th.style.textAlign = 'left';
      th.style.borderBottom = '2px solid #ddd';
      th.style.backgroundColor = '#f8f9fa';

      if (column.sortable !== false) {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => this.sort(column.key));

        // ソートインジケーター
        if (this.sortConfig && this.sortConfig.key === column.key) {
          const indicator =
            this.sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
          th.textContent += indicator;
        }
      }

      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // ボディ
    const tbody = document.createElement('tbody');

    this.filteredData.forEach((row, index) => {
      const tr = document.createElement('tr');
      tr.style.backgroundColor = index % 2 === 0 ? '#fff' : '#f9f9f9';

      this.columns.forEach((column) => {
        const td = document.createElement('td');
        td.textContent = String(row[column.key]);
        td.style.padding = '12px';
        td.style.borderBottom = '1px solid #ddd';
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    this.container.appendChild(table);

    // データ件数表示
    const info = document.createElement('div');
    info.textContent = `全 ${this.filteredData.length} 件`;
    info.style.marginTop = '10px';
    info.style.color = '#666';
    this.container.appendChild(info);
  }
}

/* ============================================================================
 * プロジェクト 12: 画像ギャラリー
 * ============================================================================
 * サムネイルクリックで拡大表示する画像ギャラリーを実装してください。
 *
 * 要件:
 * - サムネイル表示
 * - クリックで拡大モーダル
 * - 前へ・次へナビゲーション
 */

// ギャラリー画像の型定義
interface GalleryImage {
  id: string;
  thumbnailUrl: string;
  fullUrl: string;
  alt: string;
}

// 画像ギャラリーコンポーネント
class ImageGallery {
  private images: GalleryImage[] = [];
  private currentIndex = 0;
  private modalElement: HTMLDivElement | null = null;

  constructor(private container: HTMLElement) {
    this.container.style.display = 'grid';
    this.container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))';
    this.container.style.gap = '10px';
  }

  // 画像の設定
  setImages(images: GalleryImage[]): void {
    this.images = images;
    this.render();
  }

  // サムネイルの表示
  private render(): void {
    this.container.innerHTML = '';

    this.images.forEach((image, index) => {
      const img = document.createElement('img');
      img.src = image.thumbnailUrl;
      img.alt = image.alt;
      img.style.width = '100%';
      img.style.height = '150px';
      img.style.objectFit = 'cover';
      img.style.cursor = 'pointer';
      img.style.borderRadius = '4px';

      img.addEventListener('click', () => this.showFullImage(index));

      this.container.appendChild(img);
    });
  }

  // 拡大画像の表示
  private showFullImage(index: number): void {
    this.currentIndex = index;

    // モーダルの作成
    if (!this.modalElement) {
      this.modalElement = document.createElement('div');
      this.modalElement.style.position = 'fixed';
      this.modalElement.style.top = '0';
      this.modalElement.style.left = '0';
      this.modalElement.style.width = '100%';
      this.modalElement.style.height = '100%';
      this.modalElement.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
      this.modalElement.style.display = 'flex';
      this.modalElement.style.alignItems = 'center';
      this.modalElement.style.justifyContent = 'center';
      this.modalElement.style.zIndex = '1000';

      // 閉じるボタン
      const closeButton = document.createElement('button');
      closeButton.textContent = '×';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '20px';
      closeButton.style.right = '20px';
      closeButton.style.fontSize = '32px';
      closeButton.style.color = 'white';
      closeButton.style.background = 'none';
      closeButton.style.border = 'none';
      closeButton.style.cursor = 'pointer';
      closeButton.addEventListener('click', () => this.closeModal());

      // 前へボタン
      const prevButton = document.createElement('button');
      prevButton.textContent = '←';
      prevButton.style.position = 'absolute';
      prevButton.style.left = '20px';
      prevButton.style.fontSize = '32px';
      prevButton.style.color = 'white';
      prevButton.style.background = 'none';
      prevButton.style.border = 'none';
      prevButton.style.cursor = 'pointer';
      prevButton.addEventListener('click', () => this.previous());

      // 次へボタン
      const nextButton = document.createElement('button');
      nextButton.textContent = '→';
      nextButton.style.position = 'absolute';
      nextButton.style.right = '20px';
      nextButton.style.fontSize = '32px';
      nextButton.style.color = 'white';
      nextButton.style.background = 'none';
      nextButton.style.border = 'none';
      nextButton.style.cursor = 'pointer';
      nextButton.addEventListener('click', () => this.next());

      this.modalElement.appendChild(closeButton);
      this.modalElement.appendChild(prevButton);
      this.modalElement.appendChild(nextButton);

      document.body.appendChild(this.modalElement);
    }

    // 画像の更新
    const existingImg = this.modalElement.querySelector('img.gallery-full-img');
    if (existingImg) {
      existingImg.remove();
    }

    const img = document.createElement('img');
    img.className = 'gallery-full-img';
    img.src = this.images[this.currentIndex].fullUrl;
    img.alt = this.images[this.currentIndex].alt;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.objectFit = 'contain';

    this.modalElement.appendChild(img);
    this.modalElement.style.display = 'flex';
  }

  // モーダルを閉じる
  private closeModal(): void {
    if (this.modalElement) {
      this.modalElement.style.display = 'none';
    }
  }

  // 次の画像
  private next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.showFullImage(this.currentIndex);
  }

  // 前の画像
  private previous(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.showFullImage(this.currentIndex);
  }
}

/* ============================================================================
 * プロジェクト 13: チャートコンポーネント
 * ============================================================================
 * シンプルな棒グラフを描画するコンポーネントを実装してください。
 *
 * 要件:
 * - データから棒グラフを生成
 * - ラベルと値の表示
 * - レスポンシブ対応
 */

// チャートデータの型定義
interface ChartData {
  label: string;
  value: number;
  color?: string;
}

// チャートオプションの型定義
interface ChartOptions {
  width?: number;
  height?: number;
  barGap?: number;
}

// 棒グラフコンポーネント
class BarChart {
  private width: number;
  private height: number;
  private barGap: number;

  constructor(
    private container: HTMLElement,
    private data: ChartData[],
    private options: ChartOptions = {}
  ) {
    this.width = options.width || 600;
    this.height = options.height || 400;
    this.barGap = options.barGap || 10;

    this.render();
  }

  // チャートの描画
  render(): void {
    this.container.innerHTML = '';
    this.container.style.width = `${this.width}px`;
    this.container.style.height = `${this.height}px`;
    this.container.style.position = 'relative';
    this.container.style.backgroundColor = '#f9f9f9';
    this.container.style.padding = '20px';

    if (this.data.length === 0) return;

    // 最大値を取得
    const maxValue = Math.max(...this.data.map((d) => d.value));

    // 棒グラフの幅を計算
    const barWidth =
      (this.width - this.barGap * (this.data.length + 1)) / this.data.length;

    // 各棒グラフを描画
    this.data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * (this.height - 60);
      const x = this.barGap + index * (barWidth + this.barGap);
      const y = this.height - barHeight - 40;

      // 棒グラフ
      const bar = document.createElement('div');
      bar.style.position = 'absolute';
      bar.style.left = `${x}px`;
      bar.style.bottom = '40px';
      bar.style.width = `${barWidth}px`;
      bar.style.height = `${barHeight}px`;
      bar.style.backgroundColor = item.color || '#007bff';
      bar.style.transition = 'height 0.3s ease';

      // 値のラベル
      const valueLabel = document.createElement('div');
      valueLabel.textContent = String(item.value);
      valueLabel.style.position = 'absolute';
      valueLabel.style.left = `${x}px`;
      valueLabel.style.bottom = `${barHeight + 45}px`;
      valueLabel.style.width = `${barWidth}px`;
      valueLabel.style.textAlign = 'center';
      valueLabel.style.fontSize = '12px';
      valueLabel.style.fontWeight = 'bold';

      // X軸のラベル
      const label = document.createElement('div');
      label.textContent = item.label;
      label.style.position = 'absolute';
      label.style.left = `${x}px`;
      label.style.bottom = '10px';
      label.style.width = `${barWidth}px`;
      label.style.textAlign = 'center';
      label.style.fontSize = '12px';

      this.container.appendChild(bar);
      this.container.appendChild(valueLabel);
      this.container.appendChild(label);
    });
  }

  // データの更新
  updateData(data: ChartData[]): void {
    this.data = data;
    this.render();
  }
}

/* ============================================================================
 * プロジェクト 14: ノーティフィケーションシステム
 * ============================================================================
 * トースト通知システムを実装してください。
 *
 * 要件:
 * - 成功・エラー・警告・情報の通知タイプ
 * - 自動消去機能
 * - 複数の通知を管理
 */

// 通知タイプの型定義
type NotificationType = 'success' | 'error' | 'warning' | 'info';

// 通知オプションの型定義
interface NotificationOptions {
  message: string;
  type: NotificationType;
  duration?: number;
}

// 通知マネージャー
class NotificationManager {
  private container: HTMLElement;
  private notifications: Set<HTMLElement> = new Set();

  constructor() {
    // 通知コンテナの作成
    this.container = document.createElement('div');
    this.container.style.position = 'fixed';
    this.container.style.top = '20px';
    this.container.style.right = '20px';
    this.container.style.zIndex = '9999';
    this.container.style.display = 'flex';
    this.container.style.flexDirection = 'column';
    this.container.style.gap = '10px';
    document.body.appendChild(this.container);
  }

  // 通知の表示
  show(options: NotificationOptions): void {
    const notification = this.createNotification(options);
    this.notifications.add(notification);
    this.container.appendChild(notification);

    // アニメーション
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
      notification.style.opacity = '1';
    }, 10);

    // 自動削除
    const duration = options.duration || 3000;
    setTimeout(() => {
      this.remove(notification);
    }, duration);
  }

  // 通知要素の作成
  private createNotification(options: NotificationOptions): HTMLElement {
    const notification = document.createElement('div');
    notification.style.minWidth = '300px';
    notification.style.padding = '16px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.justifyContent = 'space-between';
    notification.style.transform = 'translateX(400px)';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease';

    // タイプに応じた色設定
    const colors = {
      success: { bg: '#d4edda', border: '#c3e6cb', text: '#155724' },
      error: { bg: '#f8d7da', border: '#f5c6cb', text: '#721c24' },
      warning: { bg: '#fff3cd', border: '#ffeaa7', text: '#856404' },
      info: { bg: '#d1ecf1', border: '#bee5eb', text: '#0c5460' },
    };

    const color = colors[options.type];
    notification.style.backgroundColor = color.bg;
    notification.style.borderLeft = `4px solid ${color.border}`;
    notification.style.color = color.text;

    // メッセージ
    const message = document.createElement('span');
    message.textContent = options.message;
    message.style.flex = '1';

    // 閉じるボタン
    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '20px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = color.text;
    closeButton.addEventListener('click', () => this.remove(notification));

    notification.appendChild(message);
    notification.appendChild(closeButton);

    return notification;
  }

  // 通知の削除
  private remove(element: HTMLElement): void {
    element.style.transform = 'translateX(400px)';
    element.style.opacity = '0';

    setTimeout(() => {
      if (element.parentElement) {
        element.parentElement.removeChild(element);
      }
      this.notifications.delete(element);
    }, 300);
  }
}

/* ============================================================================
 * プロジェクト 15: 自動保存機能
 * ============================================================================
 * テキストエディタの自動保存機能を実装してください。
 *
 * 要件:
 * - 一定時間後に自動保存
 * - ローカルストレージに保存
 * - 保存状態の表示
 */

// 自動保存エディター
class AutoSaveEditor {
  private saveTimer: number | null = null;
  private isSaved = true;

  constructor(
    private textarea: HTMLTextAreaElement,
    private statusElement: HTMLElement,
    private saveDelay: number = 1000
  ) {
    this.setupEventListeners();
    this.load();
    this.updateStatus(true);
  }

  // イベントリスナーの設定
  private setupEventListeners(): void {
    this.textarea.addEventListener('input', () => {
      this.isSaved = false;
      this.updateStatus(false);
      this.scheduleSave();
    });
  }

  // 保存のスケジュール
  private scheduleSave(): void {
    // 既存のタイマーをクリア
    if (this.saveTimer !== null) {
      clearTimeout(this.saveTimer);
    }

    // 新しいタイマーを設定
    this.saveTimer = window.setTimeout(() => {
      this.save();
    }, this.saveDelay);
  }

  // ローカルストレージへの保存
  private save(): void {
    const content = this.textarea.value;
    localStorage.setItem('auto-save-content', content);
    this.isSaved = true;
    this.updateStatus(true);
  }

  // ローカルストレージからの読み込み
  private load(): void {
    const savedContent = localStorage.getItem('auto-save-content');
    if (savedContent !== null) {
      this.textarea.value = savedContent;
    }
  }

  // 保存状態の表示更新
  private updateStatus(saved: boolean): void {
    if (saved) {
      this.statusElement.textContent = '✓ 保存済み';
      this.statusElement.style.color = '#28a745';
    } else {
      this.statusElement.textContent = '編集中...';
      this.statusElement.style.color = '#ffc107';
    }
  }
}

/* ============================================================================
 * プロジェクト 16: ステッパーコンポーネント
 * ============================================================================
 * マルチステップフォームのステッパーを実装してください。
 *
 * 要件:
 * - 複数のステップ
 * - 前へ・次へボタン
 * - ステップの完了状態
 */

// ステップの型定義
interface Step {
  id: string;
  title: string;
  content: HTMLElement;
  isValid?: () => boolean;
}

// ステッパーコンポーネント
class Stepper {
  private currentStepIndex = 0;

  constructor(
    private container: HTMLElement,
    private steps: Step[]
  ) {
    this.render();
  }

  // 次のステップへ
  next(): void {
    const currentStep = this.steps[this.currentStepIndex];

    // バリデーションチェック
    if (currentStep.isValid && !currentStep.isValid()) {
      alert('入力内容を確認してください');
      return;
    }

    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.render();
    }
  }

  // 前のステップへ
  previous(): void {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.render();
    }
  }

  // 特定のステップへ移動
  goToStep(index: number): void {
    if (index >= 0 && index < this.steps.length) {
      this.currentStepIndex = index;
      this.render();
    }
  }

  // ステッパーの表示
  private render(): void {
    this.container.innerHTML = '';

    // ステップインジケーター
    const stepIndicator = document.createElement('div');
    stepIndicator.style.display = 'flex';
    stepIndicator.style.justifyContent = 'space-between';
    stepIndicator.style.marginBottom = '30px';

    this.steps.forEach((step, index) => {
      const stepItem = document.createElement('div');
      stepItem.style.flex = '1';
      stepItem.style.textAlign = 'center';

      // ステップ番号
      const stepNumber = document.createElement('div');
      stepNumber.textContent = String(index + 1);
      stepNumber.style.width = '40px';
      stepNumber.style.height = '40px';
      stepNumber.style.borderRadius = '50%';
      stepNumber.style.display = 'inline-flex';
      stepNumber.style.alignItems = 'center';
      stepNumber.style.justifyContent = 'center';
      stepNumber.style.margin = '0 auto';
      stepNumber.style.marginBottom = '8px';

      if (index < this.currentStepIndex) {
        stepNumber.style.backgroundColor = '#28a745';
        stepNumber.style.color = 'white';
      } else if (index === this.currentStepIndex) {
        stepNumber.style.backgroundColor = '#007bff';
        stepNumber.style.color = 'white';
      } else {
        stepNumber.style.backgroundColor = '#e9ecef';
        stepNumber.style.color = '#6c757d';
      }

      // ステップタイトル
      const stepTitle = document.createElement('div');
      stepTitle.textContent = step.title;
      stepTitle.style.fontSize = '14px';
      stepTitle.style.color = index === this.currentStepIndex ? '#000' : '#6c757d';

      stepItem.appendChild(stepNumber);
      stepItem.appendChild(stepTitle);
      stepIndicator.appendChild(stepItem);
    });

    this.container.appendChild(stepIndicator);

    // 現在のステップのコンテンツ
    const contentContainer = document.createElement('div');
    contentContainer.style.padding = '20px';
    contentContainer.style.minHeight = '200px';
    contentContainer.appendChild(this.steps[this.currentStepIndex].content);
    this.container.appendChild(contentContainer);

    // ナビゲーションボタン
    const navigation = document.createElement('div');
    navigation.style.display = 'flex';
    navigation.style.justifyContent = 'space-between';
    navigation.style.marginTop = '20px';

    const prevButton = document.createElement('button');
    prevButton.textContent = '前へ';
    prevButton.disabled = this.currentStepIndex === 0;
    prevButton.addEventListener('click', () => this.previous());

    const nextButton = document.createElement('button');
    nextButton.textContent =
      this.currentStepIndex === this.steps.length - 1 ? '完了' : '次へ';
    nextButton.style.backgroundColor = '#007bff';
    nextButton.style.color = 'white';
    nextButton.style.border = 'none';
    nextButton.style.padding = '10px 20px';
    nextButton.style.borderRadius = '4px';
    nextButton.addEventListener('click', () => {
      if (this.currentStepIndex === this.steps.length - 1) {
        alert('フォームが完了しました！');
      } else {
        this.next();
      }
    });

    navigation.appendChild(prevButton);
    navigation.appendChild(nextButton);
    this.container.appendChild(navigation);
  }
}

/* ============================================================================
 * プロジェクト 17: カラーピッカー
 * ============================================================================
 * シンプルなカラーピッカーを実装してください。
 *
 * 要件:
 * - プリセットカラー
 * - カスタムカラー入力
 * - 選択したカラーのコールバック
 */

// カラーピッカーオプションの型定義
interface ColorPickerOptions {
  presetColors?: string[];
  onColorSelect?: (color: string) => void;
}

// カラーピッカーコンポーネント
class ColorPicker {
  private selectedColor = '#000000';
  private presetColors: string[];

  constructor(
    private container: HTMLElement,
    private options: ColorPickerOptions = {}
  ) {
    this.presetColors = options.presetColors || [
      '#000000',
      '#ffffff',
      '#ff0000',
      '#00ff00',
      '#0000ff',
      '#ffff00',
      '#ff00ff',
      '#00ffff',
      '#ffa500',
      '#800080',
      '#ffc0cb',
      '#a52a2a',
    ];

    this.render();
  }

  // カラーピッカーの表示
  private render(): void {
    this.container.innerHTML = '';

    // 現在の色の表示
    const currentColorDisplay = document.createElement('div');
    currentColorDisplay.style.width = '100%';
    currentColorDisplay.style.height = '60px';
    currentColorDisplay.style.backgroundColor = this.selectedColor;
    currentColorDisplay.style.border = '1px solid #ddd';
    currentColorDisplay.style.borderRadius = '4px';
    currentColorDisplay.style.marginBottom = '15px';
    this.container.appendChild(currentColorDisplay);

    // カスタムカラー入力
    const customColorLabel = document.createElement('label');
    customColorLabel.textContent = 'カスタムカラー:';
    customColorLabel.style.display = 'block';
    customColorLabel.style.marginBottom = '5px';

    const customColorInput = document.createElement('input');
    customColorInput.type = 'color';
    customColorInput.value = this.selectedColor;
    customColorInput.style.width = '100%';
    customColorInput.style.height = '40px';
    customColorInput.style.marginBottom = '15px';
    customColorInput.addEventListener('input', () => {
      this.setColor(customColorInput.value);
    });

    this.container.appendChild(customColorLabel);
    this.container.appendChild(customColorInput);

    // プリセットカラー
    const presetLabel = document.createElement('div');
    presetLabel.textContent = 'プリセットカラー:';
    presetLabel.style.marginBottom = '10px';
    this.container.appendChild(presetLabel);

    const presetContainer = document.createElement('div');
    presetContainer.style.display = 'grid';
    presetContainer.style.gridTemplateColumns = 'repeat(6, 1fr)';
    presetContainer.style.gap = '8px';

    this.presetColors.forEach((color) => {
      const colorBox = document.createElement('div');
      colorBox.style.width = '40px';
      colorBox.style.height = '40px';
      colorBox.style.backgroundColor = color;
      colorBox.style.border =
        color === this.selectedColor ? '3px solid #007bff' : '1px solid #ddd';
      colorBox.style.borderRadius = '4px';
      colorBox.style.cursor = 'pointer';

      colorBox.addEventListener('click', () => {
        this.setColor(color);
      });

      presetContainer.appendChild(colorBox);
    });

    this.container.appendChild(presetContainer);
  }

  // 色の設定
  setColor(color: string): void {
    this.selectedColor = color;
    this.render();
    this.options.onColorSelect?.(color);
  }

  // 現在の色を取得
  getColor(): string {
    return this.selectedColor;
  }
}

/* ============================================================================
 * プロジェクト 18: アコーディオン
 * ============================================================================
 * アコーディオンコンポーネントを実装してください。
 *
 * 要件:
 * - 複数のパネル
 * - クリックで開閉
 * - 1つだけ開くモード
 */

// アコーディオンアイテムの型定義
interface AccordionItem {
  id: string;
  title: string;
  content: string;
  isOpen?: boolean;
}

// アコーディオンコンポーネント
class Accordion {
  private items: AccordionItem[] = [];

  constructor(
    private container: HTMLElement,
    private allowMultiple = false
  ) {
    // コンテナのスタイル設定
    this.container.style.border = '1px solid #ddd';
    this.container.style.borderRadius = '4px';
  }

  // アイテムの追加
  addItem(item: AccordionItem): void {
    this.items.push(item);
    this.render();
  }

  // アイテムの開閉切り替え
  toggle(id: string): void {
    const item = this.items.find((i) => i.id === id);
    if (!item) return;

    // 1つだけ開くモードの場合、他を閉じる
    if (!this.allowMultiple && !item.isOpen) {
      this.items.forEach((i) => {
        if (i.id !== id) {
          i.isOpen = false;
        }
      });
    }

    item.isOpen = !item.isOpen;
    this.render();
  }

  // アコーディオンの表示
  private render(): void {
    this.container.innerHTML = '';

    this.items.forEach((item, index) => {
      // アイテムコンテナ
      const itemContainer = document.createElement('div');
      itemContainer.style.borderBottom =
        index < this.items.length - 1 ? '1px solid #ddd' : 'none';

      // ヘッダー
      const header = document.createElement('div');
      header.textContent = item.title;
      header.style.padding = '15px';
      header.style.backgroundColor = '#f8f9fa';
      header.style.cursor = 'pointer';
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.style.alignItems = 'center';
      header.style.fontWeight = 'bold';

      // 開閉アイコン
      const icon = document.createElement('span');
      icon.textContent = item.isOpen ? '−' : '+';
      icon.style.fontSize = '20px';
      header.appendChild(icon);

      header.addEventListener('click', () => this.toggle(item.id));

      // コンテンツ
      const content = document.createElement('div');
      content.textContent = item.content;
      content.style.padding = item.isOpen ? '15px' : '0';
      content.style.maxHeight = item.isOpen ? '500px' : '0';
      content.style.overflow = 'hidden';
      content.style.transition = 'all 0.3s ease';

      itemContainer.appendChild(header);
      itemContainer.appendChild(content);
      this.container.appendChild(itemContainer);
    });
  }
}

/* ============================================================================
 * プロジェクト 19: スライダー（カルーセル）
 * ============================================================================
 * 自動再生機能付きスライダーを実装してください。
 *
 * 要件:
 * - スライドの自動切り替え
 * - 前へ・次へボタン
 * - インジケーター（ドット）
 */

// スライドの型定義
interface Slide {
  id: string;
  imageUrl: string;
  caption?: string;
}

// スライダーコンポーネント
class Slider {
  private currentIndex = 0;
  private autoPlayTimer: number | null = null;

  constructor(
    private container: HTMLElement,
    private slides: Slide[],
    private autoPlayInterval = 3000
  ) {
    this.container.style.position = 'relative';
    this.container.style.overflow = 'hidden';
    this.container.style.width = '100%';
    this.container.style.height = '400px';

    this.render();
    this.startAutoPlay();
  }

  // スライダーの表示
  private render(): void {
    this.container.innerHTML = '';

    // スライドコンテナ
    const slidesContainer = document.createElement('div');
    slidesContainer.style.display = 'flex';
    slidesContainer.style.transition = 'transform 0.5s ease';
    slidesContainer.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    slidesContainer.style.height = '100%';

    this.slides.forEach((slide) => {
      const slideElement = document.createElement('div');
      slideElement.style.minWidth = '100%';
      slideElement.style.height = '100%';
      slideElement.style.position = 'relative';

      const img = document.createElement('img');
      img.src = slide.imageUrl;
      img.alt = slide.caption || '';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';

      slideElement.appendChild(img);

      if (slide.caption) {
        const caption = document.createElement('div');
        caption.textContent = slide.caption;
        caption.style.position = 'absolute';
        caption.style.bottom = '20px';
        caption.style.left = '20px';
        caption.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        caption.style.color = 'white';
        caption.style.padding = '10px 20px';
        caption.style.borderRadius = '4px';
        slideElement.appendChild(caption);
      }

      slidesContainer.appendChild(slideElement);
    });

    this.container.appendChild(slidesContainer);

    // 前へボタン
    const prevButton = document.createElement('button');
    prevButton.textContent = '❮';
    prevButton.style.position = 'absolute';
    prevButton.style.left = '10px';
    prevButton.style.top = '50%';
    prevButton.style.transform = 'translateY(-50%)';
    prevButton.style.fontSize = '30px';
    prevButton.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    prevButton.style.color = 'white';
    prevButton.style.border = 'none';
    prevButton.style.padding = '10px 15px';
    prevButton.style.cursor = 'pointer';
    prevButton.addEventListener('click', () => this.previous());
    this.container.appendChild(prevButton);

    // 次へボタン
    const nextButton = document.createElement('button');
    nextButton.textContent = '❯';
    nextButton.style.position = 'absolute';
    nextButton.style.right = '10px';
    nextButton.style.top = '50%';
    nextButton.style.transform = 'translateY(-50%)';
    nextButton.style.fontSize = '30px';
    nextButton.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    nextButton.style.color = 'white';
    nextButton.style.border = 'none';
    nextButton.style.padding = '10px 15px';
    nextButton.style.cursor = 'pointer';
    nextButton.addEventListener('click', () => this.next());
    this.container.appendChild(nextButton);

    // インジケーター（ドット）
    const indicators = document.createElement('div');
    indicators.style.position = 'absolute';
    indicators.style.bottom = '10px';
    indicators.style.left = '50%';
    indicators.style.transform = 'translateX(-50%)';
    indicators.style.display = 'flex';
    indicators.style.gap = '8px';

    this.slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.style.width = '12px';
      dot.style.height = '12px';
      dot.style.borderRadius = '50%';
      dot.style.backgroundColor =
        index === this.currentIndex ? 'white' : 'rgba(255, 255, 255, 0.5)';
      dot.style.cursor = 'pointer';
      dot.addEventListener('click', () => this.goTo(index));
      indicators.appendChild(dot);
    });

    this.container.appendChild(indicators);
  }

  // 次のスライドへ
  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.render();
  }

  // 前のスライドへ
  previous(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.render();
  }

  // 特定のスライドへ移動
  goTo(index: number): void {
    this.currentIndex = index;
    this.render();
  }

  // 自動再生開始
  startAutoPlay(): void {
    this.autoPlayTimer = window.setInterval(() => {
      this.next();
    }, this.autoPlayInterval);
  }

  // 自動再生停止
  stopAutoPlay(): void {
    if (this.autoPlayTimer !== null) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }
}

/* ============================================================================
 * プロジェクト 20: ショッピングカート
 * ============================================================================
 * ショッピングカート機能を実装してください。
 *
 * 要件:
 * - 商品の追加・削除
 * - 数量の変更
 * - 合計金額の計算
 * - ローカルストレージへの保存
 */

// 商品の型定義
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

// カートアイテムの型定義（商品に数量を追加）
interface CartItem extends Product {
  quantity: number;
}

// ショッピングカート
class ShoppingCart {
  private items: CartItem[] = [];

  constructor(private container: HTMLElement) {
    this.load();
    this.render();
  }

  // 商品の追加
  addItem(product: Product): void {
    const existingItem = this.items.find((item) => item.id === product.id);

    if (existingItem) {
      // 既存の商品の場合は数量を増やす
      existingItem.quantity++;
    } else {
      // 新規商品の場合は追加
      this.items.push({ ...product, quantity: 1 });
    }

    this.save();
    this.render();
  }

  // 商品の削除
  removeItem(productId: string): void {
    this.items = this.items.filter((item) => item.id !== productId);
    this.save();
    this.render();
  }

  // 数量の更新
  updateQuantity(productId: string, quantity: number): void {
    const item = this.items.find((item) => item.id === productId);

    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.save();
        this.render();
      }
    }
  }

  // 合計金額の計算
  getTotal(): number {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // カートの表示
  private render(): void {
    this.container.innerHTML = '';

    if (this.items.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.textContent = 'カートは空です';
      emptyMessage.style.padding = '20px';
      emptyMessage.style.textAlign = 'center';
      emptyMessage.style.color = '#999';
      this.container.appendChild(emptyMessage);
      return;
    }

    // カートアイテムのリスト
    const itemsList = document.createElement('div');

    this.items.forEach((item) => {
      const itemElement = document.createElement('div');
      itemElement.style.display = 'flex';
      itemElement.style.alignItems = 'center';
      itemElement.style.padding = '15px';
      itemElement.style.borderBottom = '1px solid #ddd';
      itemElement.style.gap = '15px';

      // 商品名
      const nameElement = document.createElement('div');
      nameElement.textContent = item.name;
      nameElement.style.flex = '1';
      nameElement.style.fontWeight = 'bold';

      // 価格
      const priceElement = document.createElement('div');
      priceElement.textContent = `¥${item.price.toLocaleString()}`;
      priceElement.style.width = '100px';

      // 数量コントロール
      const quantityControl = document.createElement('div');
      quantityControl.style.display = 'flex';
      quantityControl.style.alignItems = 'center';
      quantityControl.style.gap = '5px';

      const decreaseButton = document.createElement('button');
      decreaseButton.textContent = '−';
      decreaseButton.addEventListener('click', () =>
        this.updateQuantity(item.id, item.quantity - 1)
      );

      const quantityDisplay = document.createElement('span');
      quantityDisplay.textContent = String(item.quantity);
      quantityDisplay.style.minWidth = '30px';
      quantityDisplay.style.textAlign = 'center';

      const increaseButton = document.createElement('button');
      increaseButton.textContent = '+';
      increaseButton.addEventListener('click', () =>
        this.updateQuantity(item.id, item.quantity + 1)
      );

      quantityControl.appendChild(decreaseButton);
      quantityControl.appendChild(quantityDisplay);
      quantityControl.appendChild(increaseButton);

      // 小計
      const subtotalElement = document.createElement('div');
      subtotalElement.textContent = `¥${(item.price * item.quantity).toLocaleString()}`;
      subtotalElement.style.width = '100px';
      subtotalElement.style.textAlign = 'right';
      subtotalElement.style.fontWeight = 'bold';

      // 削除ボタン
      const removeButton = document.createElement('button');
      removeButton.textContent = '削除';
      removeButton.style.backgroundColor = '#dc3545';
      removeButton.style.color = 'white';
      removeButton.style.border = 'none';
      removeButton.style.padding = '5px 10px';
      removeButton.style.borderRadius = '4px';
      removeButton.style.cursor = 'pointer';
      removeButton.addEventListener('click', () => this.removeItem(item.id));

      itemElement.appendChild(nameElement);
      itemElement.appendChild(priceElement);
      itemElement.appendChild(quantityControl);
      itemElement.appendChild(subtotalElement);
      itemElement.appendChild(removeButton);

      itemsList.appendChild(itemElement);
    });

    this.container.appendChild(itemsList);

    // 合計金額
    const totalElement = document.createElement('div');
    totalElement.style.padding = '20px';
    totalElement.style.textAlign = 'right';
    totalElement.style.fontSize = '20px';
    totalElement.style.fontWeight = 'bold';
    totalElement.textContent = `合計: ¥${this.getTotal().toLocaleString()}`;
    this.container.appendChild(totalElement);

    // チェックアウトボタン
    const checkoutButton = document.createElement('button');
    checkoutButton.textContent = '購入手続きへ';
    checkoutButton.style.width = '100%';
    checkoutButton.style.padding = '15px';
    checkoutButton.style.backgroundColor = '#28a745';
    checkoutButton.style.color = 'white';
    checkoutButton.style.border = 'none';
    checkoutButton.style.fontSize = '16px';
    checkoutButton.style.fontWeight = 'bold';
    checkoutButton.style.borderRadius = '4px';
    checkoutButton.style.cursor = 'pointer';
    checkoutButton.addEventListener('click', () => {
      alert('購入手続きに進みます');
    });
    this.container.appendChild(checkoutButton);
  }

  // ローカルストレージへの保存
  private save(): void {
    localStorage.setItem('shopping-cart', JSON.stringify(this.items));
  }

  // ローカルストレージからの読み込み
  private load(): void {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        this.items = JSON.parse(savedCart);
      } catch (error) {
        console.error('カートの読み込みエラー:', error);
        this.items = [];
      }
    }
  }
}

// ============================================================================
// テストコード例
// ============================================================================

// プロジェクト 1 のテスト
// const todoList = document.querySelector<HTMLUListElement>('#todo-list')!;
// const todoInput = document.querySelector<HTMLInputElement>('#todo-input')!;
// const addButton = document.querySelector<HTMLButtonElement>('#add-button')!;
// const todoApp = new TodoApp(todoList, todoInput, addButton);
