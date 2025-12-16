# Chapter 4: 実践的なプロジェクト

このチャプターでは、これまで学んだ TypeScript の知識を活用して、実践的なプロジェクトに取り組みます。DOM 操作、イベントハンドリング、API 通信など、実際の開発で必要となるスキルを習得します。

## 学習内容

1. DOM 操作と型
2. イベントハンドリングの型
3. API 通信と型定義
4. 小規模アプリケーションの作成

## 1. DOM 操作と型

### DOM 要素の型定義

TypeScript では、DOM 要素に対して厳密な型定義が提供されています。

```typescript
// 基本的な要素の取得
const button = document.getElementById('submit'); // HTMLElement | null
const input = document.querySelector('input'); // HTMLInputElement | null
const div = document.querySelector<HTMLDivElement>('.container'); // HTMLDivElement | null

// 型アサーションを使った方法
const form = document.getElementById('login-form') as HTMLFormElement;
```

### 主要な DOM 要素の型

```typescript
// フォーム要素
const input: HTMLInputElement = document.querySelector('input')!;
const textarea: HTMLTextAreaElement = document.querySelector('textarea')!;
const select: HTMLSelectElement = document.querySelector('select')!;
const button: HTMLButtonElement = document.querySelector('button')!;
const form: HTMLFormElement = document.querySelector('form')!;

// コンテンツ要素
const div: HTMLDivElement = document.querySelector('div')!;
const span: HTMLSpanElement = document.querySelector('span')!;
const paragraph: HTMLParagraphElement = document.querySelector('p')!;
const anchor: HTMLAnchorElement = document.querySelector('a')!;
const image: HTMLImageElement = document.querySelector('img')!;

// リスト要素
const ul: HTMLUListElement = document.querySelector('ul')!;
const ol: HTMLOListElement = document.querySelector('ol')!;
const li: HTMLLIElement = document.querySelector('li')!;

// テーブル要素
const table: HTMLTableElement = document.querySelector('table')!;
const thead: HTMLTableSectionElement = document.querySelector('thead')!;
const tbody: HTMLTableSectionElement = document.querySelector('tbody')!;
const tr: HTMLTableRowElement = document.querySelector('tr')!;
const td: HTMLTableCellElement = document.querySelector('td')!;
```

### DOM 要素の操作

```typescript
// テキストコンテンツの操作
const heading = document.querySelector<HTMLHeadingElement>('h1')!;
heading.textContent = 'Hello, TypeScript!';
heading.innerText = 'Hello, TypeScript!';
heading.innerHTML = '<strong>Hello</strong>, TypeScript!';

// 属性の操作
const link = document.querySelector<HTMLAnchorElement>('a')!;
link.href = 'https://example.com';
link.target = '_blank';
link.setAttribute('data-id', '123');
const dataId = link.getAttribute('data-id'); // string | null

// クラスの操作
const element = document.querySelector<HTMLElement>('.box')!;
element.classList.add('active');
element.classList.remove('inactive');
element.classList.toggle('visible');
const hasActive = element.classList.contains('active'); // boolean

// スタイルの操作
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.fontSize = '16px';
```

### 要素の作成と追加

```typescript
// 要素の作成
const newDiv = document.createElement('div');
newDiv.textContent = 'New Element';
newDiv.className = 'new-item';

// 要素の追加
const container = document.querySelector<HTMLElement>('#container')!;
container.appendChild(newDiv);
container.insertBefore(newDiv, container.firstChild);

// 要素の削除
container.removeChild(newDiv);
newDiv.remove();
```

### NodeList と HTMLCollection

```typescript
// querySelectorAll の戻り値は NodeList
const items: NodeListOf<HTMLLIElement> = document.querySelectorAll('li');
items.forEach((item) => {
  item.style.color = 'blue';
});

// getElementsByClassName の戻り値は HTMLCollection
const buttons: HTMLCollectionOf<HTMLButtonElement> =
  document.getElementsByClassName('btn') as HTMLCollectionOf<HTMLButtonElement>;

// 配列に変換
const buttonArray = Array.from(buttons);
buttonArray.forEach((button) => {
  button.disabled = true;
});
```

## 2. イベントハンドリングの型

### イベントリスナーの基本

```typescript
const button = document.querySelector<HTMLButtonElement>('#submit')!;

// イベントリスナーの追加
button.addEventListener('click', (event: MouseEvent) => {
  console.log('Button clicked!');
  console.log(event.clientX, event.clientY); // マウス座標
});

// イベントの型を明示
button.addEventListener('click', (event: Event) => {
  const mouseEvent = event as MouseEvent;
  console.log(mouseEvent.button); // どのボタンがクリックされたか
});
```

### 主要なイベントの型

```typescript
// マウスイベント
element.addEventListener('click', (e: MouseEvent) => {
  console.log(e.clientX, e.clientY);
  console.log(e.button); // 0: 左, 1: 中, 2: 右
});

element.addEventListener('dblclick', (e: MouseEvent) => {});
element.addEventListener('mouseenter', (e: MouseEvent) => {});
element.addEventListener('mouseleave', (e: MouseEvent) => {});
element.addEventListener('mousemove', (e: MouseEvent) => {});

// キーボードイベント
input.addEventListener('keydown', (e: KeyboardEvent) => {
  console.log(e.key); // 押されたキー
  console.log(e.code); // キーコード
  console.log(e.ctrlKey, e.shiftKey, e.altKey); // 修飾キー
});

input.addEventListener('keyup', (e: KeyboardEvent) => {});
input.addEventListener('keypress', (e: KeyboardEvent) => {});

// フォームイベント
form.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault(); // デフォルト動作を防ぐ
  const formData = new FormData(e.target as HTMLFormElement);
});

input.addEventListener('input', (e: Event) => {
  const target = e.target as HTMLInputElement;
  console.log(target.value);
});

input.addEventListener('change', (e: Event) => {
  const target = e.target as HTMLInputElement;
  console.log(target.value);
});

// フォーカスイベント
input.addEventListener('focus', (e: FocusEvent) => {});
input.addEventListener('blur', (e: FocusEvent) => {});

// その他のイベント
window.addEventListener('load', (e: Event) => {});
window.addEventListener('resize', (e: UIEvent) => {});
window.addEventListener('scroll', (e: Event) => {});
```

### カスタムイベントハンドラー

```typescript
// イベントハンドラーの型定義
type EventHandler<T extends Event> = (event: T) => void;

const clickHandler: EventHandler<MouseEvent> = (event) => {
  console.log('Clicked at', event.clientX, event.clientY);
};

button.addEventListener('click', clickHandler);

// ジェネリックなイベントハンドラー
function addListener<K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  type: K,
  handler: (event: HTMLElementEventMap[K]) => void
): void {
  element.addEventListener(type, handler);
}

addListener(button, 'click', (e) => {
  // e は自動的に MouseEvent 型になる
  console.log(e.clientX);
});
```

### イベント委譲（Event Delegation）

```typescript
const list = document.querySelector<HTMLUListElement>('#list')!;

list.addEventListener('click', (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  if (target.tagName === 'LI') {
    console.log('List item clicked:', target.textContent);
  }
});
```

## 3. API 通信と型定義

### Fetch API の型定義

```typescript
// レスポンスの型を定義
interface User {
  id: number;
  name: string;
  email: string;
}

// 基本的な fetch
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const user: User = await response.json();
  return user;
}

// ジェネリックな fetch 関数
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// 使用例
const user = await fetchData<User>('/api/users/1');
```

### POST リクエスト

```typescript
interface CreateUserRequest {
  name: string;
  email: string;
}

interface CreateUserResponse {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

async function createUser(data: CreateUserRequest): Promise<CreateUserResponse> {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
```

### エラーハンドリング

```typescript
// カスタムエラー型
class APIError extends Error {
  constructor(
    public status: number,
    message: string,
    public response?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// 型安全な API クライアント
class APIClient {
  constructor(private baseURL: string) {}

  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`);

      if (!response.ok) {
        throw new APIError(
          response.status,
          `Request failed: ${response.statusText}`,
          await response.json()
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new Error('Network error');
    }
  }

  async post<T, U>(endpoint: string, data: T): Promise<U> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new APIError(response.status, 'POST request failed');
    }

    return response.json();
  }
}

// 使用例
const client = new APIClient('https://api.example.com');
const user = await client.get<User>('/users/1');
```

## 4. 小規模アプリケーションの作成

### Todo アプリケーションの例

```typescript
// 型定義
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

class TodoApp {
  private todos: Todo[] = [];
  private nextId = 1;

  constructor(
    private listElement: HTMLUListElement,
    private inputElement: HTMLInputElement,
    private addButton: HTMLButtonElement
  ) {
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.addButton.addEventListener('click', () => this.addTodo());
    this.inputElement.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        this.addTodo();
      }
    });
  }

  private addTodo(): void {
    const text = this.inputElement.value.trim();

    if (!text) return;

    const todo: Todo = {
      id: this.nextId++,
      text,
      completed: false,
    };

    this.todos.push(todo);
    this.render();
    this.inputElement.value = '';
  }

  private toggleTodo(id: number): void {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.render();
    }
  }

  private deleteTodo(id: number): void {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.render();
  }

  private render(): void {
    this.listElement.innerHTML = '';

    this.todos.forEach((todo) => {
      const li = document.createElement('li');
      li.className = todo.completed ? 'completed' : '';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', () => this.toggleTodo(todo.id));

      const span = document.createElement('span');
      span.textContent = todo.text;

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

// アプリケーションの初期化
const app = new TodoApp(
  document.querySelector<HTMLUListElement>('#todo-list')!,
  document.querySelector<HTMLInputElement>('#todo-input')!,
  document.querySelector<HTMLButtonElement>('#add-button')!
);
```

## 演習ファイル

1. **01-dom-types.ts** - DOM 操作と型（20問）
2. **02-event-handling.ts** - イベントハンドリング（20問）
3. **03-api-communication.ts** - API 通信と型定義（20問）
4. **04-mini-app.ts** - 小規模アプリケーション（20問）

## 次のステップ

このチャプターを完了すると、以下のスキルが身につきます：

1. **型安全な DOM 操作** - TypeScript で DOM を安全に操作できる
2. **イベント処理** - 各種イベントを型安全に処理できる
3. **API 統合** - 型定義を活用した API 通信ができる
4. **実践的なアプリケーション開発** - 学んだ知識を統合してアプリケーションを作成できる

これで TypeScript の学習教材は完了です。実際のプロジェクトで TypeScript を活用してください！
