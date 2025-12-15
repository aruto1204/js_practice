// 解答例 2: User.js

export default class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getInfo() {
    return `名前: ${this.name}, メール: ${this.email}`;
  }
}
