# Visitor パターン — accept メソッドの仕組み

`05-advanced-patterns.ts` の問題13（Visitor パターン）で使われる `accept` メソッドについての解説です。

---

## よくある誤解

```typescript
circle.accept(calculator);
rectangle.accept(calculator);
```

これは `visitCircle` や `visitRectangle` を各クラスに**追加しているのではありません**。  
すでに定義済みのメソッドを**呼び出している**だけです。

---

## 実行の流れ

### circle.accept(calculator)

```typescript
// Circle クラスに実装された accept
accept(visitor: Visitor): void {
  visitor.visitCircle(this); // ← calculator.visitCircle(circle) を呼ぶ
}
```

```
circle.accept(calculator)
  └→ calculator.visitCircle(circle) が呼ばれる
       └→ Math.PI × 5 × 5 = 78.54...
            └→ calculator.totalArea += 78.54...
```

### rectangle.accept(calculator)

```typescript
// Rectangle クラスに実装された accept
accept(visitor: Visitor): void {
  visitor.visitRectangle(this); // ← calculator.visitRectangle(rectangle) を呼ぶ
}
```

```
rectangle.accept(calculator)
  └→ calculator.visitRectangle(rectangle) が呼ばれる
       └→ 4 × 6 = 24
            └→ calculator.totalArea += 24
```

---

## 呼び出し対応表

| コード | 実際に呼ばれるメソッド | 処理内容 |
|--------|----------------------|---------|
| `circle.accept(calculator)` | `calculator.visitCircle(circle)` | 円の面積を totalArea に加算 |
| `rectangle.accept(calculator)` | `calculator.visitRectangle(rectangle)` | 長方形の面積を totalArea に加算 |

---

## accept の役割

`accept` は「どの visit メソッドを呼ぶか」を形ごとに振り分けるディスパッチャーです。

```typescript
// Circle は visitCircle を呼ぶと決めている
class Circle implements Shape {
  accept(visitor: Visitor): void {
    visitor.visitCircle(this);    // Circle → visitCircle
  }
}

// Rectangle は visitRectangle を呼ぶと決めている
class Rectangle implements Shape {
  accept(visitor: Visitor): void {
    visitor.visitRectangle(this); // Rectangle → visitRectangle
  }
}
```

`accept` がなければ、呼び出し側で型判定が必要になってしまいます。

```typescript
// accept がない場合（悪い例）
if (shape instanceof Circle) {
  calculator.visitCircle(shape);
} else if (shape instanceof Rectangle) {
  calculator.visitRectangle(shape);
}
// 図形の種類が増えるたびに if-else を追加しなければならない
```

`accept` を使えば、呼び出し側は形の種類を知らなくてよくなります。

```typescript
// accept がある場合（良い例）
shapes.forEach((shape) => shape.accept(calculator));
// Circle でも Rectangle でも同じ書き方でよい
```

---

## 新しい処理を追加するときの利点

`Circle` や `Rectangle` のコードを一切変えずに、新しい Visitor を作るだけで処理を追加できます。

```typescript
// 面積計算（既存）
class AreaCalculator implements Visitor {
  visitCircle(circle: Circle): void { ... }
  visitRectangle(rectangle: Rectangle): void { ... }
}

// 周長計算（新規追加 — Circle/Rectangle は変更不要）
class PerimeterCalculator implements Visitor {
  visitCircle(circle: Circle): void {
    console.log(2 * Math.PI * circle.radius);
  }
  visitRectangle(rectangle: Rectangle): void {
    console.log(2 * (rectangle.width + rectangle.height));
  }
}

// 使い方は同じ
const perimeter = new PerimeterCalculator();
circle.accept(perimeter);
rectangle.accept(perimeter);
```

---

## まとめ

- `accept` はメソッドを追加するものではなく、既存の `visit〇〇` メソッドを呼び出すディスパッチャー
- 各図形クラスが「自分に対してどの visit を呼ぶか」を知っている
- Visitor（`calculator` など）に新しい処理を追加しても、図形クラスは変更不要
- これを **ダブルディスパッチ** と呼ぶ（オブジェクトの型と Visitor の型、両方によって呼ぶメソッドが決まる）
