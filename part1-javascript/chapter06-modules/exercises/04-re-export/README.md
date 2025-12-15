# 練習問題 4: 再エクスポート

## 問題

ユーティリティ関数をカテゴリ別に分けて、index.js で再エクスポートしてください。

### 仕様

1. `string.js` ファイルを作成
   - `capitalize(str)`: 先頭を大文字にする
   - `reverse(str)`: 文字列を反転する

2. `array.js` ファイルを作成
   - `shuffle(arr)`: 配列をシャッフルする
   - `unique(arr)`: 重複を除去する

3. `number.js` ファイルを作成
   - `isEven(n)`: 偶数か判定
   - `isOdd(n)`: 奇数か判定

4. `index.js` ファイルを作成
   - すべてのモジュールを再エクスポート

5. `main.js` ファイルを作成
   - index.js から一度にすべてインポート
   - 各関数をテスト

## ディレクトリ構造

```
04-re-export/
├── utils/
│   ├── string.js
│   ├── array.js
│   ├── number.js
│   └── index.js
└── main.js
```

## 実行方法

```bash
node main.js
```
