# 練習問題 5: 実践的なモジュール構成

## 問題

簡易的なタスク管理アプリケーションのモジュール構造を作成してください。

### 仕様

1. `models/Task.js`
   - `Task` クラスをデフォルトエクスポート
   - プロパティ: `id`, `title`, `completed`
   - メソッド: `toggle()` - 完了状態を切り替え

2. `models/TaskList.js`
   - `TaskList` クラスをデフォルトエクスポート
   - メソッド:
     - `add(title)` - タスクを追加
     - `remove(id)` - タスクを削除
     - `toggle(id)` - タスクの完了状態を切り替え
     - `getAll()` - すべてのタスクを取得
     - `getCompleted()` - 完了したタスクを取得
     - `getPending()` - 未完了のタスクを取得

3. `services/storage.js`
   - `save(key, data)` - データを保存（シミュレーション）
   - `load(key)` - データを読み込み（シミュレーション）
   - 名前付きエクスポート

4. `utils/logger.js`
   - `log(message)` - ログ出力
   - `error(message)` - エラー出力
   - `success(message)` - 成功メッセージ出力
   - 名前付きエクスポート

5. `app.js`
   - すべてのモジュールを組み合わせて使用
   - タスクの追加、完了、削除をテスト

## ディレクトリ構造

```
05-practical/
├── models/
│   ├── Task.js
│   └── TaskList.js
├── services/
│   └── storage.js
├── utils/
│   └── logger.js
└── app.js
```

## 実行方法

```bash
node app.js
```

## 期待される動作

1. タスクを3つ追加
2. 1つのタスクを完了にする
3. 完了タスクと未完了タスクを表示
4. 1つのタスクを削除
5. 最終的なタスク一覧を表示
