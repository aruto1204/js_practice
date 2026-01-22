# リテラル型（Literal Types）解説

## 概要

リテラル型は、特定の具体的な値のみを許容する TypeScript の型です。文字列、数値、真偽値のリテラルを型として使用することで、より厳密な型定義が可能になります。

## 基本概念

### リテラル型の種類

```typescript
// 文字列リテラル型
type Direction = 'north' | 'south' | 'east' | 'west';

// 数値リテラル型
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

// 真偽値リテラル型
type AlwaysTrue = true;
```

## 各問題の解説

### 問題1: 文字列リテラル型

```typescript
type Direction = 'north' | 'south' | 'east' | 'west';

function move(direction: Direction): string {
  return `Moving ${direction}`;
}
```

**ポイント:**
- 4つの特定の文字列のみを受け入れる
- タイプミスを防ぐ
- IDE の自動補完が効く
- 実行時エラーをコンパイル時に検出

```typescript
move('north');  // OK
move('North');  // エラー: 型が一致しない
move('left');   // エラー: 定義されていない方向
```

### 問題2: 数値リテラル型とRecord型

```typescript
type HttpStatus = 200 | 201 | 400 | 401 | 404 | 500;

function getStatusMessage(status: HttpStatus): string {
  const messages: Record<HttpStatus, string> = {
    200: 'OK',
    201: 'Created',
    400: 'Bad Request',
    401: 'Unauthorized',
    404: 'Not Found',
    500: 'Internal Server Error',
  };
  return messages[status];
}
```

**ポイント:**
- `Record<K, V>` は `{ [key in K]: V }` のショートハンド
- すべてのステータスコードに対応するメッセージを定義する必要がある
- 1つでも欠けているとコンパイルエラー
- **網羅性チェック** が自動的に行われる

### 問題3: サイズの定義とマッピング

```typescript
type Size = 'xs' | 's' | 'm' | 'l' | 'xl';

function getSizeInPixels(size: Size): number {
  const sizes: Record<Size, number> = {
    xs: 12,
    s: 14,
    m: 16,
    l: 18,
    xl: 20,
  };
  return sizes[size];
}
```

**ポイント:**
- デザインシステムでよく使用されるパターン
- サイズの定義を一元管理
- 型安全にマッピングを実装
- マジックナンバーを避けられる

### 問題4: boolean リテラル型

```typescript
type AlwaysTrue = true;

function confirmAction(): AlwaysTrue {
  return true;
}
```

**ポイント:**
- `false` を返すことはできない
- 型レベルでの制約
- フラグが常に特定の値であることを保証
- あまり実用的ではないが、型システムの柔軟性を示す例

### 問題5: 判別可能なユニオンの基本

```typescript
type Circle = {
  kind: 'circle';
  radius: number;
};

type Square = {
  kind: 'square';
  sideLength: number;
};

type Shape = Circle | Square;

function calculateArea(shape: Shape): number {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2;
  }
  return shape.sideLength ** 2;
}
```

**ポイント:**
- **タグ付きユニオン（Tagged Union）** のパターン
- `kind` プロパティが**判別子（discriminant）**
- 判別子はリテラル型であることが重要
- TypeScript が型を自動的に絞り込む

### 問題6: イベントの型定義

```typescript
type ClickEvent = {
  type: 'click';
  x: number;
  y: number;
};

type KeyEvent = {
  type: 'keypress';
  key: string;
};

type Event = ClickEvent | KeyEvent;

function handleEvent(event: Event): void {
  if (event.type === 'click') {
    console.log(`Clicked at (${event.x}, ${event.y})`);
  } else {
    console.log(`Key pressed: ${event.key}`);
  }
}
```

**ポイント:**
- イベントシステムの実装に便利
- DOM イベントのような複雑なイベントシステムをモデル化
- 各イベントタイプが異なるプロパティを持つ
- 型安全にイベントを処理

### 問題8: 状態管理（switch文による型の絞り込み）

```typescript
type LoadingState = {
  status: 'loading';
};

type SuccessState = {
  status: 'success';
  data: string;
};

type ErrorState = {
  status: 'error';
  error: Error;
};

type State = LoadingState | SuccessState | ErrorState;

function getStateText(state: State): string {
  switch (state.status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return `Success: ${state.data}`;
    case 'error':
      return `Error: ${state.error.message}`;
  }
}
```

**ポイント:**
- 非同期処理の状態管理でよく使用されるパターン
- React の状態管理、Redux などで活用
- `switch` 文で網羅性チェック
- **default** ケースを省略することで、すべてのケースを処理することを強制

### 問題11: トランジション（状態遷移）

```typescript
type TrafficLight = 'red' | 'yellow' | 'green';

function getNextLight(current: TrafficLight): TrafficLight {
  const transitions: Record<TrafficLight, TrafficLight> = {
    red: 'green',
    green: 'yellow',
    yellow: 'red',
  };
  return transitions[current];
}
```

**ポイント:**
- 状態遷移のモデル化
- **有限状態機械（Finite State Machine）** の実装
- すべての状態からの遷移を定義する必要がある
- 型安全に状態遷移を管理

### 問題12: const アサーション

```typescript
const COLORS = {
  RED: '#FF0000',
  GREEN: '#00FF00',
  BLUE: '#0000FF',
} as const;

type ColorName = keyof typeof COLORS; // 'RED' | 'GREEN' | 'BLUE'
```

**ポイント:**
- `as const` は**定数アサーション（const assertion）**
- オブジェクトを deeply readonly にする
- 値がリテラル型として推論される
- `typeof` で値から型を抽出
- `keyof` でキーのユニオン型を作成

**as const の効果:**
```typescript
// as const なし
const colors = { RED: '#FF0000' };
// colors の型: { RED: string }

// as const あり
const colors = { RED: '#FF0000' } as const;
// colors の型: { readonly RED: '#FF0000' }
```

### 問題13: 複雑なタグ付きユニオン（HTTPリクエスト）

```typescript
type Request =
  | { type: 'get'; url: string }
  | { type: 'post'; url: string; body: any }
  | { type: 'delete'; url: string; id: string };

function describeRequest(request: Request): void {
  switch (request.type) {
    case 'get':
      console.log(`GET ${request.url}`);
      break;
    case 'post':
      console.log(`POST ${request.url} with body:`, request.body);
      break;
    case 'delete':
      console.log(`DELETE ${request.url}/${request.id}`);
      break;
  }
}
```

**ポイント:**
- HTTPリクエストの型定義
- 各リクエストタイプが異なるプロパティを持つ
- API クライアントの実装に便利
- REST API のモデル化

### 問題15: 複雑な判別可能なユニオン（メッセージシステム）

```typescript
type Message =
  | { kind: 'text'; content: string; sender: string }
  | { kind: 'image'; url: string; width: number; height: number }
  | { kind: 'video'; url: string; duration: number }
  | { kind: 'file'; filename: string; size: number };

function summarizeMessages(messages: Message[]): void {
  const summary = messages.reduce(
    (acc, msg) => {
      acc[msg.kind] = (acc[msg.kind] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  console.log('Message Summary:');
  Object.entries(summary).forEach(([kind, count]) => {
    console.log(`  ${kind}: ${count}`);
  });
}
```

**ポイント:**
- 複数のメッセージタイプを処理
- チャットアプリケーションなどで使用されるパターン
- `reduce()` で集計処理
- 型安全にメッセージを分類

## リテラル型の高度な使用法

### 1. Template Literal Types（TypeScript 4.1+）

```typescript
type Color = 'red' | 'green' | 'blue';
type Shade = 'light' | 'dark';

type ColorShade = `${Shade}-${Color}`;
// 'light-red' | 'light-green' | 'light-blue' | 'dark-red' | 'dark-green' | 'dark-blue'
```

### 2. リテラル型と型の絞り込み

```typescript
function processValue(value: string | number, type: 'string' | 'number') {
  if (type === 'string') {
    // TypeScript は value を string として扱う？
    // 実際には value は依然として string | number
    // type パラメータだけでは型の絞り込みは起こらない
  }
}
```

### 3. satisfies 演算子（TypeScript 4.9+）

```typescript
type Color = 'red' | 'green' | 'blue';

// 型チェックしつつ、リテラル型を保持
const color = 'red' satisfies Color;
// color の型: 'red'（Color ではない）

const color2: Color = 'red';
// color2 の型: Color
```

## 実践的なユースケース

### 1. React の Props

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant: ButtonVariant;
  size: ButtonSize;
  label: string;
  onClick: () => void;
}
```

### 2. APIエンドポイントの定義

```typescript
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = '/users' | '/posts' | '/comments';

interface ApiRequest {
  method: Method;
  endpoint: Endpoint;
  body?: unknown;
}
```

### 3. 設定オブジェクト

```typescript
type Environment = 'development' | 'staging' | 'production';
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface Config {
  env: Environment;
  logLevel: LogLevel;
  apiUrl: string;
}
```

## ベストプラクティス

### 1. 意味のある名前を使う

```typescript
// 推奨
type UserRole = 'admin' | 'user' | 'guest';

// 非推奨
type Role = 'a' | 'u' | 'g';
```

### 2. 判別可能なユニオンを使う

オブジェクトのユニオン型には判別子プロパティを含めましょう。

```typescript
// 推奨
type Result =
  | { success: true; data: string }
  | { success: false; error: string };

// 非推奨（判別が困難）
type Result = {
  data?: string;
  error?: string;
};
```

### 3. const アサーションを活用

定数オブジェクトには `as const` を使用しましょう。

```typescript
const CONFIG = {
  MAX_RETRY: 3,
  TIMEOUT: 5000,
} as const;

// CONFIG.MAX_RETRY = 5; // エラー: readonly
```

### 4. 型定義を一元管理

リテラル型の定義は一箇所にまとめましょう。

```typescript
// types.ts
export type UserRole = 'admin' | 'user' | 'guest';
export type Status = 'active' | 'inactive' | 'pending';
```

## まとめ

リテラル型は TypeScript の強力な機能で、以下のような利点があります：

- **厳密な型定義**: 具体的な値のみを許容
- **自動補完**: IDE の補完機能が効果的に働く
- **タイプミス防止**: コンパイル時にエラーを検出
- **自己文書化**: コードが何を受け入れるか明確
- **状態管理**: 複雑な状態を型安全に管理

判別可能なユニオンと組み合わせることで、複雑なドメインロジックを型安全に実装できます。
