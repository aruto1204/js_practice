// 解答例 5: app.js

import TaskList from './models/TaskList.js';
import { save, load } from './services/storage.js';
import { log, error, success } from './utils/logger.js';

// タスクリストの作成
const taskList = new TaskList();

log('タスク管理アプリを起動しました');

// タスクの追加
console.log('\n=== タスクを追加 ===');
taskList.add('TypeScriptを学ぶ');
taskList.add('モジュールシステムを理解する');
taskList.add('実践的なアプリを作る');
success('3つのタスクを追加しました');

// すべてのタスクを表示
console.log('\n=== すべてのタスク ===');
taskList.getAll().forEach((task) => {
  const status = task.completed ? '✓' : ' ';
  console.log(`[${status}] ${task.id}. ${task.title}`);
});

// タスクを完了にする
console.log('\n=== タスクを完了にする ===');
taskList.toggle(1);
success('タスク1を完了にしました');

// 完了タスクと未完了タスクを表示
console.log('\n=== 完了タスク ===');
taskList.getCompleted().forEach((task) => {
  console.log(`✓ ${task.id}. ${task.title}`);
});

console.log('\n=== 未完了タスク ===');
taskList.getPending().forEach((task) => {
  console.log(`  ${task.id}. ${task.title}`);
});

// タスクを削除
console.log('\n=== タスクを削除 ===');
taskList.remove(2);
success('タスク2を削除しました');

// 最終的なタスク一覧
console.log('\n=== 最終的なタスク一覧 ===');
taskList.getAll().forEach((task) => {
  const status = task.completed ? '✓' : ' ';
  console.log(`[${status}] ${task.id}. ${task.title}`);
});

// データの保存
console.log('\n=== データを保存 ===');
save('tasks', taskList.getAll());

// データの読み込み（デモ）
console.log('\n=== データを読み込み ===');
const loadedTasks = load('tasks');
if (loadedTasks) {
  log(`${loadedTasks.length}件のタスクを読み込みました`);
}
