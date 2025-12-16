/**
 * Part 3: TypeScript 実践編
 * Chapter 4: 実践的なプロジェクト
 * 演習 4: 小規模アプリケーション
 *
 * このファイルでは、これまで学んだ知識を統合して小規模アプリケーションを作成します。
 */

/* ============================================================================
 * プロジェクト 1: Todo アプリケーション（基本）
 * ============================================================================
 * シンプルな Todo アプリケーションを実装してください。
 *
 * 要件:
 * - Todo の追加・削除・完了状態の切り替え
 * - Todo インターフェース（id, text, completed）
 * - TodoApp クラス
 */

// TODO: Todo インターフェースと TodoApp クラスを実装
// interface Todo {
//   id: number;
//   text: string;
//   completed: boolean;
// }
//
// class TodoApp {
//   private todos: Todo[] = [];
//   private nextId = 1;
//
//   constructor(
//     private listElement: HTMLUListElement,
//     private inputElement: HTMLInputElement,
//     private addButton: HTMLButtonElement
//   ) {
//     ...
//   }
//
//   private setupEventListeners(): void {
//     ...
//   }
//
//   private addTodo(): void {
//     ...
//   }
//
//   private toggleTodo(id: number): void {
//     ...
//   }
//
//   private deleteTodo(id: number): void {
//     ...
//   }
//
//   private render(): void {
//     ...
//   }
// }

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

// TODO: フィルター機能付き TodoApp を実装
// type FilterType = 'all' | 'active' | 'completed';
//
// class FilteredTodoApp extends TodoApp {
//   private filter: FilterType = 'all';
//
//   constructor(
//     listElement: HTMLUListElement,
//     inputElement: HTMLInputElement,
//     addButton: HTMLButtonElement,
//     private filterButtons: {
//       all: HTMLButtonElement;
//       active: HTMLButtonElement;
//       completed: HTMLButtonElement;
//     }
//   ) {
//     ...
//   }
//
//   private setFilter(filter: FilterType): void {
//     ...
//   }
//
//   private getFilteredTodos(): Todo[] {
//     ...
//   }
// }

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

// TODO: ユーザー検索アプリを実装
// interface User {
//   id: number;
//   name: string;
//   email: string;
//   avatar?: string;
// }
//
// class UserSearchApp {
//   private users: User[] = [];
//   private isLoading = false;
//
//   constructor(
//     private searchInput: HTMLInputElement,
//     private userList: HTMLUListElement,
//     private loadingIndicator: HTMLElement
//   ) {
//     ...
//   }
//
//   private setupEventListeners(): void {
//     ...
//   }
//
//   private async searchUsers(query: string): Promise<void> {
//     ...
//   }
//
//   private render(): void {
//     ...
//   }
//
//   private showLoading(): void {
//     ...
//   }
//
//   private hideLoading(): void {
//     ...
//   }
// }

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

// TODO: カウンターアプリを実装
// class CounterApp {
//   private count = 0;
//   private history: number[] = [];
//   private historyIndex = -1;
//
//   constructor(
//     private countElement: HTMLElement,
//     private incrementButton: HTMLButtonElement,
//     private decrementButton: HTMLButtonElement,
//     private resetButton: HTMLButtonElement,
//     private undoButton: HTMLButtonElement,
//     private redoButton: HTMLButtonElement
//   ) {
//     ...
//   }
//
//   private setupEventListeners(): void {
//     ...
//   }
//
//   private increment(): void {
//     ...
//   }
//
//   private decrement(): void {
//     ...
//   }
//
//   private reset(): void {
//     ...
//   }
//
//   private undo(): void {
//     ...
//   }
//
//   private redo(): void {
//     ...
//   }
//
//   private saveToHistory(): void {
//     ...
//   }
//
//   private render(): void {
//     ...
//   }
// }

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

// TODO: Modal クラスを実装
// interface ModalOptions {
//   title?: string;
//   content?: string;
//   onConfirm?: () => void;
//   onCancel?: () => void;
// }
//
// class Modal {
//   private element: HTMLDivElement;
//   private overlay: HTMLDivElement;
//
//   constructor(private options: ModalOptions) {
//     ...
//   }
//
//   show(): void {
//     ...
//   }
//
//   hide(): void {
//     ...
//   }
//
//   private createModalElement(): HTMLDivElement {
//     ...
//   }
//
//   private setupEventListeners(): void {
//     ...
//   }
// }

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

// TODO: Tabs クラスを実装
// interface Tab {
//   id: string;
//   title: string;
//   content: HTMLElement;
// }
//
// class Tabs {
//   private tabs: Tab[] = [];
//   private activeTabId: string | null = null;
//
//   constructor(
//     private tabsContainer: HTMLElement,
//     private panelsContainer: HTMLElement
//   ) {
//     ...
//   }
//
//   addTab(tab: Tab): void {
//     ...
//   }
//
//   removeTab(id: string): void {
//     ...
//   }
//
//   setActive(id: string): void {
//     ...
//   }
//
//   private render(): void {
//     ...
//   }
// }

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

// TODO: Pagination クラスを実装
// interface PaginationOptions {
//   totalItems: number;
//   itemsPerPage: number;
//   currentPage: number;
//   onPageChange: (page: number) => void;
// }
//
// class Pagination {
//   private currentPage: number;
//   private totalPages: number;
//
//   constructor(
//     private container: HTMLElement,
//     private options: PaginationOptions
//   ) {
//     ...
//   }
//
//   setPage(page: number): void {
//     ...
//   }
//
//   private render(): void {
//     ...
//   }
//
//   private goToPage(page: number): void {
//     ...
//   }
// }

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

// TODO: FormValidator クラスを実装
// type ValidationRule = (value: string) => string | null;
//
// interface FieldConfig {
//   name: string;
//   rules: ValidationRule[];
// }
//
// class FormValidator {
//   private errors: Map<string, string> = new Map();
//
//   constructor(
//     private form: HTMLFormElement,
//     private fields: FieldConfig[]
//   ) {
//     ...
//   }
//
//   private setupEventListeners(): void {
//     ...
//   }
//
//   private validateField(name: string, value: string): void {
//     ...
//   }
//
//   validate(): boolean {
//     ...
//   }
//
//   private showError(name: string, message: string): void {
//     ...
//   }
//
//   private clearError(name: string): void {
//     ...
//   }
// }
//
// // バリデーションルールの例
// const required: ValidationRule = (value) =>
//   value.trim() === '' ? 'この項目は必須です' : null;
//
// const email: ValidationRule = (value) =>
//   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'メールアドレスの形式が正しくありません';
//
// const minLength = (min: number): ValidationRule => (value) =>
//   value.length >= min ? null : `${min}文字以上入力してください`;

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

// TODO: DraggableList クラスを実装
// interface ListItem {
//   id: string;
//   content: string;
//   order: number;
// }
//
// class DraggableList {
//   private items: ListItem[] = [];
//   private draggedItem: ListItem | null = null;
//
//   constructor(private container: HTMLUListElement) {
//     ...
//   }
//
//   addItem(content: string): void {
//     ...
//   }
//
//   private render(): void {
//     ...
//   }
//
//   private setupDragHandlers(element: HTMLLIElement, item: ListItem): void {
//     ...
//   }
//
//   private reorder(fromIndex: number, toIndex: number): void {
//     ...
//   }
// }

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

// TODO: SearchHighlighter クラスを実装
// class SearchHighlighter {
//   private searchTerm = '';
//
//   constructor(
//     private searchInput: HTMLInputElement,
//     private targetElements: HTMLElement[]
//   ) {
//     ...
//   }
//
//   private setupEventListeners(): void {
//     ...
//   }
//
//   private highlight(term: string): void {
//     ...
//   }
//
//   private clearHighlight(): void {
//     ...
//   }
//
//   private escapeRegex(str: string): string {
//     ...
//   }
// }

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

// TODO: DataTable クラスを実装
// interface Column<T> {
//   key: keyof T;
//   header: string;
//   sortable?: boolean;
// }
//
// interface SortConfig<T> {
//   key: keyof T;
//   direction: 'asc' | 'desc';
// }
//
// class DataTable<T extends Record<string, any>> {
//   private data: T[] = [];
//   private filteredData: T[] = [];
//   private sortConfig: SortConfig<T> | null = null;
//
//   constructor(
//     private container: HTMLElement,
//     private columns: Column<T>[]
//   ) {
//     ...
//   }
//
//   setData(data: T[]): void {
//     ...
//   }
//
//   private sort(key: keyof T): void {
//     ...
//   }
//
//   private filter(term: string): void {
//     ...
//   }
//
//   private render(): void {
//     ...
//   }
// }

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

// TODO: ImageGallery クラスを実装
// interface GalleryImage {
//   id: string;
//   thumbnailUrl: string;
//   fullUrl: string;
//   alt: string;
// }
//
// class ImageGallery {
//   private images: GalleryImage[] = [];
//   private currentIndex = 0;
//
//   constructor(private container: HTMLElement) {
//     ...
//   }
//
//   setImages(images: GalleryImage[]): void {
//     ...
//   }
//
//   private render(): void {
//     ...
//   }
//
//   private showFullImage(index: number): void {
//     ...
//   }
//
//   private next(): void {
//     ...
//   }
//
//   private previous(): void {
//     ...
//   }
// }

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

// TODO: BarChart クラスを実装
// interface ChartData {
//   label: string;
//   value: number;
//   color?: string;
// }
//
// interface ChartOptions {
//   width?: number;
//   height?: number;
//   barGap?: number;
// }
//
// class BarChart {
//   constructor(
//     private container: HTMLElement,
//     private data: ChartData[],
//     private options: ChartOptions = {}
//   ) {
//     ...
//   }
//
//   render(): void {
//     ...
//   }
//
//   updateData(data: ChartData[]): void {
//     ...
//   }
// }

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

// TODO: Notification クラスを実装
// type NotificationType = 'success' | 'error' | 'warning' | 'info';
//
// interface NotificationOptions {
//   message: string;
//   type: NotificationType;
//   duration?: number;
// }
//
// class NotificationManager {
//   private container: HTMLElement;
//   private notifications: Set<HTMLElement> = new Set();
//
//   constructor() {
//     ...
//   }
//
//   show(options: NotificationOptions): void {
//     ...
//   }
//
//   private createNotification(options: NotificationOptions): HTMLElement {
//     ...
//   }
//
//   private remove(element: HTMLElement): void {
//     ...
//   }
// }

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

// TODO: AutoSaveEditor クラスを実装
// class AutoSaveEditor {
//   private saveTimer: number | null = null;
//   private isSaved = true;
//
//   constructor(
//     private textarea: HTMLTextAreaElement,
//     private statusElement: HTMLElement,
//     private saveDelay: number = 1000
//   ) {
//     ...
//   }
//
//   private setupEventListeners(): void {
//     ...
//   }
//
//   private scheduleSave(): void {
//     ...
//   }
//
//   private save(): void {
//     ...
//   }
//
//   private load(): void {
//     ...
//   }
//
//   private updateStatus(saved: boolean): void {
//     ...
//   }
// }

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

// TODO: Stepper クラスを実装
// interface Step {
//   id: string;
//   title: string;
//   content: HTMLElement;
//   isValid?: () => boolean;
// }
//
// class Stepper {
//   private currentStepIndex = 0;
//
//   constructor(
//     private container: HTMLElement,
//     private steps: Step[]
//   ) {
//     ...
//   }
//
//   next(): void {
//     ...
//   }
//
//   previous(): void {
//     ...
//   }
//
//   goToStep(index: number): void {
//     ...
//   }
//
//   private render(): void {
//     ...
//   }
// }

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

// TODO: ColorPicker クラスを実装
// interface ColorPickerOptions {
//   presetColors?: string[];
//   onColorSelect?: (color: string) => void;
// }
//
// class ColorPicker {
//   private selectedColor = '#000000';
//
//   constructor(
//     private container: HTMLElement,
//     private options: ColorPickerOptions = {}
//   ) {
//     ...
//   }
//
//   private render(): void {
//     ...
//   }
//
//   setColor(color: string): void {
//     ...
//   }
//
//   getColor(): string {
//     ...
//   }
// }

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

// TODO: Accordion クラスを実装
// interface AccordionItem {
//   id: string;
//   title: string;
//   content: string;
//   isOpen?: boolean;
// }
//
// class Accordion {
//   private items: AccordionItem[] = [];
//
//   constructor(
//     private container: HTMLElement,
//     private allowMultiple = false
//   ) {
//     ...
//   }
//
//   addItem(item: AccordionItem): void {
//     ...
//   }
//
//   toggle(id: string): void {
//     ...
//   }
//
//   private render(): void {
//     ...
//   }
// }

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

// TODO: Slider クラスを実装
// interface Slide {
//   id: string;
//   imageUrl: string;
//   caption?: string;
// }
//
// class Slider {
//   private currentIndex = 0;
//   private autoPlayTimer: number | null = null;
//
//   constructor(
//     private container: HTMLElement,
//     private slides: Slide[],
//     private autoPlayInterval = 3000
//   ) {
//     ...
//   }
//
//   private render(): void {
//     ...
//   }
//
//   next(): void {
//     ...
//   }
//
//   previous(): void {
//     ...
//   }
//
//   goTo(index: number): void {
//     ...
//   }
//
//   startAutoPlay(): void {
//     ...
//   }
//
//   stopAutoPlay(): void {
//     ...
//   }
// }

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

// TODO: ShoppingCart クラスを実装
// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   imageUrl?: string;
// }
//
// interface CartItem extends Product {
//   quantity: number;
// }
//
// class ShoppingCart {
//   private items: CartItem[] = [];
//
//   constructor(private container: HTMLElement) {
//     ...
//   }
//
//   addItem(product: Product): void {
//     ...
//   }
//
//   removeItem(productId: string): void {
//     ...
//   }
//
//   updateQuantity(productId: string, quantity: number): void {
//     ...
//   }
//
//   getTotal(): number {
//     ...
//   }
//
//   private render(): void {
//     ...
//   }
//
//   private save(): void {
//     ...
//   }
//
//   private load(): void {
//     ...
//   }
// }

// ============================================================================
// テストコード例
// ============================================================================

// プロジェクト 1 のテスト
// const todoList = document.querySelector<HTMLUListElement>('#todo-list')!;
// const todoInput = document.querySelector<HTMLInputElement>('#todo-input')!;
// const addButton = document.querySelector<HTMLButtonElement>('#add-button')!;
// const todoApp = new TodoApp(todoList, todoInput, addButton);
