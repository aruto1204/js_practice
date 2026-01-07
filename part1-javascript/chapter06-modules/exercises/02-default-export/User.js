// 練習問題 2: User.js
// User クラスをデフォルトエクスポートしてください

// ここにコードを書く
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getInfo() {
    return `名前: ${this.name}, メール: ${this.email}`;
  }
}

export default User;
