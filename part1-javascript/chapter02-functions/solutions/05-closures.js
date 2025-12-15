// 解答例 5: クロージャ

/*
問題1: シンプルなカウンター
*/

function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counter1 = createCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3

const counter2 = createCounter();
console.log(counter2()); // 1



/*
問題2: 挨拶文を生成するクロージャ
*/

function createGreeter(greeting) {
  return function (name) {
    return `${greeting}、${name}さん`;
  };
}

const greetJapanese = createGreeter('こんにちは');
const greetEnglish = createGreeter('Hello');

console.log(greetJapanese('太郎')); // 'こんにちは、太郎さん'
console.log(greetEnglish('Taro')); // 'Hello、Taroさん'



/*
問題3: 銀行口座
*/

function createBankAccount(initialBalance) {
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
問題4: 乗算関数
*/

function createMultiplier(multiplier) {
  return function (n) {
    return n * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15



/*
問題5: カウントダウン
*/

function createCountdown(start) {
  let count = start;
  return function () {
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
問題6: ID生成器
*/

function createIdGenerator() {
  let id = 0;
  return function () {
    id++;
    return id;
  };
}

const generateId = createIdGenerator();
console.log(generateId()); // 1
console.log(generateId()); // 2
console.log(generateId()); // 3



/*
問題7: TODOリスト
*/

function createTodoList() {
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
todoList.remove(1);
console.log(todoList.getAll()); // ['買い物', '勉強']



/*
問題8: 履歴機能付きカウンター
*/

function createHistoryCounter() {
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
historyCounter.increment();
historyCounter.increment();
historyCounter.decrement();
historyCounter.increment();
console.log(historyCounter.getValue()); // 2
console.log(historyCounter.getHistory()); // [0, 1, 2, 1, 2]
