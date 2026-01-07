// 練習問題 5: TaskList.js
// TaskList クラスを実装してデフォルトエクスポートしてください

// ここにコードを書く
import Task from './Task.js';

export default class TaskList {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  add(title) {
    const task = new Task(this.nextId++, title);
    this.tasks.push(task);
    return task;
  }

  remove(id) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }

  toggle(id) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.toggle();
      return true;
    }
    return false;
  }

  getAll() {
    return this.tasks;
  }

  getCompleted() {
    return this.tasks.filter((task) => task.completed);
  }

  getPending() {
    return this.tasks.filter((task) => !task.completed);
  }
}
