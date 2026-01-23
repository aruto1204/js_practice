# ジェネリクスの基本 解説

## 概要

ジェネリクス（Generics）は、型をパラメータとして受け取ることで、再利用可能で型安全なコードを書くための機能です。関数やクラス、インターフェースを定義する際に、具体的な型を指定せず、使用時に型を決定できます。

## 基本概念

### ジェネリクスの構文

```typescript
// ジェネリック関数
function identity<T>(value: T): T {
  return value;
}

// 使用時に型が決定される
identity<string>('hello'); // T = string
identity<number>(42);      // T = number
identity(true);            // T = boolean（型推論）
```

### 型パラメータの命名規則

- `T` - Type（一般的な型）
- `U`, `V` - 2番目、3番目の型
- `K` - Key（オブジェクトのキー）
- `V` - Value（値）
- `E` - Element（要素）
- `R` - Return（戻り値）

## 各問題の解説

### 問題1: 基本的なジェネリック関数

```typescript
function identity<T>(value: T): T {
  return value;
}
```

**ポイント:**
- `<T>` で型パラメータを宣言
- 引数の型と戻り値の型が同じであることを保証
- どんな型でも受け取れる柔軟性を持ちつつ、型安全性を維持

**`any` との違い:**
```typescript
// any を使った場合 - 型情報が失われる
function identityAny(value: any): any {
  return value;
}
const result1 = identityAny('hello'); // result1 の型: any

// ジェネリクスを使った場合 - 型情報が保持される
function identity<T>(value: T): T {
  return value;
}
const result2 = identity('hello'); // result2 の型: string
```

### 問題2-3: 配列の最初/最後の要素を取得

```typescript
function first<T>(array: T[]): T | undefined {
  return array[0];
}

function last<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}
```

**ポイント:**
- `T[]` は「T 型の配列」を表す
- 配列が空の場合を考慮し、戻り値に `undefined` を含める
- 配列の要素型が戻り値の型として推論される

**使用例:**
```typescript
const numbers = [1, 2, 3];
const firstNum = first(numbers);  // firstNum: number | undefined

const strings = ['a', 'b', 'c'];
const lastStr = last(strings);    // lastStr: string | undefined
```

### 問題4: ペアの作成（複数の型パラメータ）

```typescript
function makePair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}
```

**ポイント:**
- 複数の型パラメータ `<T, U>` を使用
- 異なる型の値をペアとして扱える
- 戻り値はタプル型 `[T, U]`

**使用例:**
```typescript
const pair1 = makePair('hello', 42);    // [string, number]
const pair2 = makePair(true, [1, 2]);   // [boolean, number[]]
```

### 問題5: 配列の反転

```typescript
function reverse<T>(array: T[]): T[] {
  return [...array].reverse();
}
```

**ポイント:**
- 元の配列を変更しないようスプレッド構文でコピー
- 入力と出力で同じ要素型を維持
- イミュータブルな操作の例

### 問題6: ラッパーオブジェクト

```typescript
function wrap<T>(value: T): { value: T } {
  return { value };
}
```

**ポイント:**
- オブジェクト型を戻り値として指定
- プロパティの型もジェネリクスで定義
- 値を包むパターンの基本形

**使用例:**
```typescript
const wrapped = wrap(42);
// wrapped の型: { value: number }
console.log(wrapped.value); // 42
```

### 問題7-8: 配列のフィルタリングとマッピング

```typescript
function filter<T>(array: T[], predicate: (item: T) => boolean): T[] {
  return array.filter(predicate);
}

function map<T, U>(array: T[], fn: (item: T) => U): U[] {
  return array.map(fn);
}
```

**ポイント:**
- **filter**: 入力と出力で同じ型 `T`
- **map**: 入力 `T` と出力 `U` が異なる可能性あり
- コールバック関数の型もジェネリクスで定義

**map の重要な概念:**
```typescript
// 型変換の例
const numbers = [1, 2, 3];
const strings = map(numbers, n => n.toString());
// numbers: number[] → strings: string[]

// 同じ型への変換
const doubled = map(numbers, n => n * 2);
// numbers: number[] → doubled: number[]
```

### 問題9: 2つの配列を結合

```typescript
function concat<T>(array1: T[], array2: T[]): T[] {
  return [...array1, ...array2];
}
```

**ポイント:**
- 両方の配列が同じ型 `T` である制約
- スプレッド構文で結合
- 新しい配列を返す（イミュータブル）

### 問題10: 配列の検索

```typescript
function find<T>(array: T[], predicate: (item: T) => boolean): T | undefined {
  return array.find(predicate);
}
```

**ポイント:**
- 見つからない場合は `undefined` を返す
- 述語関数（predicate）で検索条件を指定
- Array.prototype.find と同等の機能

### 問題11: ジェネリックインターフェース（Result 型）

```typescript
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```

**ポイント:**
- **判別可能なユニオン**（Discriminated Union）を使用
- `success` プロパティで成功/失敗を判別
- 成功時のみ `data` プロパティが存在

**使用例:**
```typescript
function fetchUser(id: number): Result<User> {
  if (id > 0) {
    return { success: true, data: { id, name: 'Alice' } };
  }
  return { success: false, error: 'Invalid ID' };
}

const result = fetchUser(1);
if (result.success) {
  console.log(result.data); // User 型として安全にアクセス
} else {
  console.log(result.error); // string 型
}
```

### 問題12: オプショナルな値（Maybe 型）

```typescript
type Maybe<T> = T | null;

function getOrDefault<T>(value: Maybe<T>, defaultValue: T): T {
  return value !== null ? value : defaultValue;
}
```

**ポイント:**
- `null` を明示的に扱う型
- デフォルト値を提供するヘルパー関数
- null 安全なプログラミングパターン

**使用例:**
```typescript
const name: Maybe<string> = getUserName();
const displayName = getOrDefault(name, 'Anonymous');
// displayName は必ず string 型
```

### 問題13: ジェネリックな比較関数

```typescript
function max<T>(a: T, b: T, comparator: (a: T, b: T) => number): T {
  return comparator(a, b) > 0 ? a : b;
}
```

**ポイント:**
- 比較ロジックを外部から注入（Strategy パターン）
- どんな型でも比較可能
- 比較関数の規則: `a > b` なら正、`a < b` なら負、等しければ 0

**使用例:**
```typescript
// 数値の比較
const maxNum = max(10, 20, (a, b) => a - b); // 20

// オブジェクトの比較
interface Person { age: number }
const older = max(
  { age: 25 },
  { age: 30 },
  (a, b) => a.age - b.age
); // { age: 30 }
```

### 問題14: 配列の重複削除

```typescript
function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}
```

**ポイント:**
- `Set` を使って重複を削除
- スプレッド構文で配列に戻す
- 参照型の場合は同一参照のみ重複として扱われる

**注意点:**
```typescript
// プリミティブ型は期待通りに動作
unique([1, 2, 2, 3]); // [1, 2, 3]

// オブジェクトは参照で比較される
unique([{ id: 1 }, { id: 1 }]); // 2つとも残る（異なる参照）
```

### 問題15: ジェネリックな型エイリアスと関数

```typescript
type Predicate<T> = (value: T) => boolean;

function all<T>(array: T[], predicate: Predicate<T>): boolean {
  return array.every(predicate);
}
```

**ポイント:**
- 型エイリアスでジェネリック型を定義
- 関数型もジェネリクスで表現可能
- 再利用可能な型定義

**使用例:**
```typescript
const isPositive: Predicate<number> = x => x > 0;
const isNotEmpty: Predicate<string> = s => s.length > 0;

all([1, 2, 3], isPositive);           // true
all(['a', '', 'c'], isNotEmpty);      // false
```

## ジェネリクスのベストプラクティス

### 1. 型パラメータは必要最小限に

```typescript
// ❌ 悪い例: 不要な型パラメータ
function getLength<T extends { length: number }>(arr: T): number {
  return arr.length;
}

// ✅ 良い例: 型パラメータが不要な場合は使わない
function getLength(arr: { length: number }): number {
  return arr.length;
}
```

### 2. 型推論を活用する

```typescript
// 明示的に指定する必要がない場合
const result = identity('hello'); // T は string と推論される

// 複雑な場合は明示的に指定
const pair = makePair<string, number>('key', 42);
```

### 3. 意味のある型パラメータ名を使う

```typescript
// ❌ 悪い例
function process<X, Y, Z>(a: X, b: Y): Z { ... }

// ✅ 良い例
function process<Input, Config, Output>(input: Input, config: Config): Output { ... }
```

### 4. デフォルト型パラメータを活用する

```typescript
// デフォルト型を指定
type Container<T = string> = {
  value: T;
};

const strContainer: Container = { value: 'hello' };        // T = string
const numContainer: Container<number> = { value: 42 };     // T = number
```

## よくある間違いと解決策

### 1. 型パラメータの過剰使用

```typescript
// ❌ 悪い例
function add<T extends number>(a: T, b: T): T {
  return (a + b) as T;
}

// ✅ 良い例（ジェネリクス不要）
function add(a: number, b: number): number {
  return a + b;
}
```

### 2. 型の不一致

```typescript
// ❌ 悪い例: 型が合わない
function combine<T>(a: T, b: T): T[] {
  return [a, b];
}
combine(1, 'hello'); // エラー: string は number に割り当てられない

// ✅ 良い例: 異なる型を許容
function combine<T, U>(a: T, b: U): (T | U)[] {
  return [a, b];
}
```

### 3. 戻り値の型推論の誤解

```typescript
// ❌ 悪い例: 戻り値の型が意図と異なる
function first<T>(arr: T[]): T {
  return arr[0]; // undefined の可能性がある
}

// ✅ 良い例: undefined を考慮
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
```

## 実践的なユースケース

### 1. API レスポンスの型定義

```typescript
type ApiResponse<T> = {
  data: T;
  status: number;
  timestamp: Date;
};

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  const data = await response.json();
  return {
    data,
    status: response.status,
    timestamp: new Date(),
  };
}

// 使用例
interface User { id: number; name: string; }
const response = await fetchData<User>('/api/user/1');
// response.data は User 型
```

### 2. 状態管理

```typescript
type State<T> = {
  value: T;
  previousValue: T | null;
  history: T[];
};

function createState<T>(initialValue: T): State<T> {
  return {
    value: initialValue,
    previousValue: null,
    history: [initialValue],
  };
}
```

### 3. イベントハンドラー

```typescript
type EventHandler<T> = (event: T) => void;

interface ClickEvent { x: number; y: number; }
interface KeyEvent { key: string; }

const handleClick: EventHandler<ClickEvent> = (e) => {
  console.log(e.x, e.y);
};

const handleKey: EventHandler<KeyEvent> = (e) => {
  console.log(e.key);
};
```

## まとめ

ジェネリクスを使うと：

- ✅ 型安全性を維持しながら再利用可能なコードを書ける
- ✅ `any` を使わずに柔軟な関数やクラスを作れる
- ✅ コンパイル時に型エラーを検出できる
- ✅ IDE の補完やリファクタリングのサポートを受けられる

**使用すべき場面:**
- 複数の型で使用される関数やクラス
- コレクション操作（配列、Map、Set など）
- API レスポンスの型定義
- 状態管理やイベントハンドリング

**避けるべき場面:**
- 単一の型でしか使用しない場合
- 型パラメータが実際に使用されない場合
- 単純な関数で型推論が十分な場合

ジェネリクスは TypeScript の最も強力な機能の一つです。適切に使用することで、保守性が高く、型安全なコードを書くことができます。
