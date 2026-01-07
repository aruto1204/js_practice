// 練習問題 5: Task.js
// Task クラスを実装してデフォルトエクスポートしてください

// ここにコードを書く
export default class Task {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.completed = false;
  }

  toggle() {
    this.completed = !this.completed;
  }
}
