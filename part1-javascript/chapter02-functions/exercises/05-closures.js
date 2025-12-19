// 練習問題 5: クロージャ
// 難易度: ⭐⭐⭐

/*
問題1: シンプルなクロージャを作成
*/

// カウンターを作成する関数 createCounter を実装してください
// 呼び出すたびに1ずつ増える数を返す関数を返す

function createCounter() {
  // ここにコードを書く
  let count = 0;
  return () => {
    count++;
    return count;
  };
}

const counter1 = createCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3

const counter2 = createCounter();
console.log(counter2()); // 1（独立したカウンター）

/*
問題2: 挨拶文を生成するクロージャ
*/

// 挨拶文を保持するクロージャ createGreeter を作成
// 例: const greetJapanese = createGreeter('こんにちは');
//     greetJapanese('太郎') → 'こんにちは、太郎さん'

function createGreeter(greeting) {
  // ここにコードを書く
  return (name) => {
    return `${greeting}、${name}さん`;
  };
}

const greetJapanese = createGreeter('こんにちは');
const greetEnglish = createGreeter('Hello');

console.log(greetJapanese('太郎')); // 'こんにちは、太郎さん'
console.log(greetEnglish('Taro')); // 'Hello、Taroさん'

/*
問題3: プライベート変数を持つオブジェクト
*/

// 銀行口座を作成する関数 createBankAccount を実装
// 初期残高を受け取り、以下のメソッドを持つオブジェクトを返す
// - deposit(amount): 入金
// - withdraw(amount): 出金（残高不足の場合は '残高不足' を返す）
// - getBalance(): 残高を取得

function createBankAccount(initialBalance) {
  // ここにコードを書く
  let balance = initialBalance;
  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (balance >= amount) {
        balance -= amount;
        return balance;
      } else {
        return '残高不足';
      }
    },
    getBalance() {
      return balance;
    },
  };
}

const account = createBankAccount(1000);
console.log(account.deposit(500)); // 1500
console.log(account.withdraw(300)); // 1200
console.log(account.withdraw(2000)); // '残高不足'
console.log(account.getBalance()); // 1200

/*
問題4: 乗算関数を生成するクロージャ
*/

// 数値を受け取り、その数値を掛ける関数を返す createMultiplier を作成
// 例: const double = createMultiplier(2);
//     double(5) → 10

function createMultiplier(multiplier) {
  // ここにコードを書く
  return (n) => {
    return n * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

/*
問題5: カウントダウンタイマー
*/

// カウントダウンを作成する関数 createCountdown を実装
// 初期値を受け取り、呼び出すたびに1ずつ減る関数を返す
// 0になったら 'カウント終了' を返す

function createCountdown(start) {
  // ここにコードを書く
  let count = start;
  return () => {
    if (count > 0) {
      count--;
      return count;
    } else {
      return 'カウント終了';
    }
  };
}

const countdown = createCountdown(3);
console.log(countdown()); // 2
console.log(countdown()); // 1
console.log(countdown()); // 0
console.log(countdown()); // 'カウント終了'

/*
問題6: プライベートなID生成器
*/

// ユニークなIDを生成する関数 createIdGenerator を実装
// 呼び出すたびに連番のIDを返す

function createIdGenerator() {
  // ここにコードを書く
  let id = 0;
  return () => {
    id++;
    return id;
  };
}

const generateId = createIdGenerator();
console.log(generateId()); // 1
console.log(generateId()); // 2
console.log(generateId()); // 3

/*
問題7: 実践問題 - TODOリスト
*/

// TODOリストを作成する関数 createTodoList を実装
// 以下のメソッドを持つオブジェクトを返す
// - add(task): タスクを追加
// - remove(index): タスクを削除
// - getAll(): すべてのタスクを取得
// - getCount(): タスクの数を取得

function createTodoList() {
  // ここにコードを書く
  let todos = [];
  return {
    add(task) {
      todos.push(task);
    },
    remove(index) {
      todos.splice(index, 1);
    },
    getAll() {
      return [...todos];
    },
    getCount() {
      return todos.length;
    },
  };
}

const todoList = createTodoList();
todoList.add('買い物');
todoList.add('掃除');
todoList.add('勉強');
console.log(todoList.getAll()); // ['買い物', '掃除', '勉強']
console.log(todoList.getCount()); // 3
todoList.remove(1); // '掃除' を削除
console.log(todoList.getAll()); // ['買い物', '勉強']

/*
問題8: 実践問題 - 履歴機能付きカウンター
*/

// 履歴機能付きカウンターを作成する関数 createHistoryCounter を実装
// 以下のメソッドを持つオブジェクトを返す
// - increment(): カウントを1増やす
// - decrement(): カウントを1減らす
// - getValue(): 現在の値を取得
// - getHistory(): すべての履歴を配列で取得

function createHistoryCounter() {
  // ここにコードを書く
  let value = 0;
  let history = [0];
  return {
    increment() {
      value++;
      history.push(value);
      return value;
    },
    decrement() {
      value--;
      history.push(value);
      return value;
    },
    getValue() {
      return value;
    },
    getHistory() {
      return [...history];
    },
  };
}

const historyCounter = createHistoryCounter();
historyCounter.increment(); // 1
historyCounter.increment(); // 2
historyCounter.decrement(); // 1
historyCounter.increment(); // 2
console.log(historyCounter.getValue()); // 2
console.log(historyCounter.getHistory()); // [0, 1, 2, 1, 2]
