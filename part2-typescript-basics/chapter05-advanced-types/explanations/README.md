# Chapter 5: 高度な型 - 解説ドキュメント

このフォルダには、Chapter 5 の exercises（練習問題）に対する詳細な解説ドキュメントが含まれています。

## ドキュメント一覧

### [01-union-types.md](./01-union-types.md)
**ユニオン型（Union Types）**

複数の型のいずれかを表現する型システムについて解説しています。

**主なトピック:**
- 基本的なユニオン型の宣言と使用方法
- 型ガードによる型の絞り込み
- 判別可能なユニオン（Discriminated Union）
- null を含むユニオン型の扱い方
- 型述語（Type Predicate）を使った配列のフィルタリング
- 実践的なユースケース（APIレスポンス、状態管理など）

### [02-intersection-types.md](./02-intersection-types.md)
**交差型（Intersection Types）**

複数の型を組み合わせて新しい型を作成する方法について解説しています。

**主なトピック:**
- 交差型の基本的な宣言と使用方法
- Mixin パターンの実装
- 型の拡張と継承的な使用
- ジェネリクスと交差型の組み合わせ
- メソッドを持つ交差型
- 実践的なユースケース（データベースモデル、APIレスポンスなど）

### [03-literal-types.md](./03-literal-types.md)
**リテラル型（Literal Types）**

特定の具体的な値のみを許容する型システムについて解説しています。

**主なトピック:**
- 文字列・数値・真偽値リテラル型
- タグ付きユニオン（Tagged Union）
- const アサーション（as const）
- Record 型を使ったマッピング
- switch 文による型の絞り込み
- 実践的なユースケース（状態管理、イベント処理など）

### [04-type-guards.md](./04-type-guards.md)
**型ガード（Type Guards）**

実行時に変数の型を絞り込むための機能について解説しています。

**主なトピック:**
- typeof 型ガード（プリミティブ型の判定）
- instanceof 型ガード（クラスインスタンスの判定）
- in 型ガード（プロパティの存在確認）
- ユーザー定義型ガード（カスタム型判定関数）
- 型述語（Type Predicate）の使用方法
- 実践的なユースケース（APIレスポンスの検証、イベント処理など）

### [05-type-assertions.md](./05-type-assertions.md)
**型アサーション（Type Assertion）**

TypeScript コンパイラに明示的に型を伝える機能について解説しています。

**主なトピック:**
- 基本的な型アサーション（as 構文）
- DOM要素の型アサーション
- const アサーション（as const）
- 非 null アサーション（! 演算子）
- satisfies 演算子（TypeScript 4.9+）
- 安全な型アサーションのパターン
- 実践的なユースケースと注意点

## 学習の進め方

### 推奨される学習順序

1. **ユニオン型** - 複数の型を扱う基礎を学ぶ
2. **交差型** - 型を組み合わせる方法を学ぶ
3. **リテラル型** - より厳密な型定義を学ぶ
4. **型ガード** - 型を安全に絞り込む方法を学ぶ
5. **型アサーション** - 型を明示的に指定する方法を学ぶ

### 各ドキュメントの構成

各解説ドキュメントは以下の構成になっています：

1. **概要** - その機能の全体像
2. **基本概念** - 基礎的な知識と構文
3. **各問題の解説** - exercises ファイルの各問題の詳細な説明
4. **ベストプラクティス** - 実践的な使い方と推奨パターン
5. **まとめ** - 重要なポイントの復習

## 活用方法

### 1. exercises と並行して学習

```bash
# exercises ファイルを開く
code part2-typescript-basics/chapter05-advanced-types/exercises/01-union-types.ts

# 対応する解説を開く
code part2-typescript-basics/chapter05-advanced-types/explanations/01-union-types.md
```

### 2. 問題を解いてから解説を読む

1. exercises ファイルの問題を自分で解いてみる
2. 実装が完了したら解説を読んで理解を深める
3. ベストプラクティスを確認し、コードを改善する

### 3. リファレンスとして使用

- 特定の機能の使い方を忘れた時
- より良い実装方法を探している時
- コードレビューの参考資料として

## 各トピックの関連性

```
ユニオン型 ←→ 型ガード
    ↓           ↓
リテラル型 → 判別可能なユニオン
    ↓
交差型 ←→ 型アサーション
```

### 重要な組み合わせ

1. **ユニオン型 + 型ガード**
   - ユニオン型を使って柔軟な型を定義
   - 型ガードで安全に型を絞り込む

2. **リテラル型 + 判別可能なユニオン**
   - リテラル型を判別子として使用
   - 複雑な状態を型安全に管理

3. **交差型 + Mixin パターン**
   - 小さな型を定義
   - 交差型で組み合わせて再利用

4. **型ガード + 型アサーション**
   - 型ガードで検証
   - 検証後に型アサーションで型を指定

## よくある質問

### Q: ユニオン型と交差型の違いは？

- **ユニオン型（`|`）**: いずれかの型（OR）
- **交差型（`&`）**: すべての型（AND）

```typescript
// ユニオン型: string または number
type Union = string | number;

// 交差型: Person と Contact の両方のプロパティを持つ
type Intersection = Person & Contact;
```

### Q: 型ガードと型アサーションはどちらを使うべき？

**型ガード**を優先的に使用してください。

- 型ガード: ランタイムで型を検証し、安全
- 型アサーション: コンパイル時のみ、実行時の保証なし

型アサーションは、型ガードで対応できない場合の最後の手段として使用します。

### Q: as const はいつ使う？

定数オブジェクトや配列を定義する際に使用します：

```typescript
const COLORS = {
  RED: '#FF0000',
  GREEN: '#00FF00',
} as const;

// リテラル型を保持
// COLORS.RED の型: '#FF0000'（string ではない）
```

### Q: satisfies と as の違いは？

- **as**: 型チェックをスキップし、型を上書き
- **satisfies**: 型チェックを行い、リテラル型を保持

`satisfies` の方が安全で、TypeScript 4.9+ では推奨されます。

## 実践への応用

これらの型の機能は、以下のような実践的な場面で活用できます：

### 1. API クライアントの実装

```typescript
// ユニオン型 + リテラル型 + 型ガード
type ApiResponse<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };
```

### 2. 状態管理（Redux, Zustand など）

```typescript
// 判別可能なユニオン + リテラル型
type Action =
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> };
```

### 3. フォーム処理

```typescript
// 交差型 + Mixin パターン
type FormField = {
  name: string;
  value: unknown;
};

type Validatable = {
  validate: () => boolean;
};

type ValidatedFormField = FormField & Validatable;
```

### 4. イベント処理

```typescript
// リテラル型 + タグ付きユニオン
type DomEvent =
  | { type: 'click'; x: number; y: number }
  | { type: 'keypress'; key: string }
  | { type: 'scroll'; scrollTop: number };
```

## まとめ

Chapter 5 の高度な型システムをマスターすることで、以下のことができるようになります：

- ✅ 柔軟で型安全な API を設計できる
- ✅ 複雑な状態を明示的に表現できる
- ✅ 実行時エラーをコンパイル時に検出できる
- ✅ より保守しやすいコードを書ける
- ✅ TypeScript の型システムを最大限に活用できる

これらの機能を組み合わせて使用することで、より強力で表現力豊かなコードを書くことができます。
