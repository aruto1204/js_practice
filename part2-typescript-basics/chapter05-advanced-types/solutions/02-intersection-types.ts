/**
 * 解答例 2: 交差型（Intersection Types）
 */

// ==========================================
// 問題 1: 基本的な交差型
// ==========================================
type Person = {
  name: string;
  age: number;
};

type Contact = {
  email: string;
  phone: string;
};

type PersonWithContact = Person & Contact;

// ==========================================
// 問題 2: 交差型を使った関数
// ==========================================
function displayContact(contact: PersonWithContact): void {
  console.log(`Name: ${contact.name}, Age: ${contact.age}`);
  console.log(`Email: ${contact.email}, Phone: ${contact.phone}`);
}

// ==========================================
// 問題 3: Mixin パターン
// ==========================================
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type WithId = {
  id: string;
};

// ==========================================
// 問題 4: 複数の型の組み合わせ
// ==========================================
type Product = {
  name: string;
  price: number;
};

const sampleProduct: Product & WithId & Timestamped = {
  id: 'p001',
  name: 'Laptop',
  price: 1200,
  createdAt: new Date(),
  updatedAt: new Date()
};

// ==========================================
// 問題 5: 交差型と関数
// ==========================================
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

// ==========================================
// 問題 6: 型の拡張
// ==========================================
type BaseUser = {
  id: string;
  name: string;
};

type AdminUser = BaseUser & {
  role: string;
};

// ==========================================
// 問題 7: メソッドを持つ交差型
// ==========================================
type Drawable = {
  draw: () => void;
};

type Movable = {
  move: (x: number, y: number) => void;
};

type GameObject = Drawable & Movable;

// ==========================================
// 問題 8: 交差型のオブジェクト作成
// ==========================================
const gameObject: GameObject = {
  draw: () => console.log('Drawing...'),
  move: (x, y) => console.log(`Moving to (${x}, ${y})`)
};

// ==========================================
// 問題 9: ネストした交差型
// ==========================================
type Config = {
  host: string;
  port: number;
};

type Security = {
  ssl: boolean;
  apiKey: string;
};

type Logger = {
  logLevel: 'info' | 'warn' | 'error';
};

type ServerConfig = Config & Security & Logger;

// ==========================================
// 問題 10: 交差型とインターフェース
// ==========================================
interface Animal {
  name: string;
  age: number;
}

interface Pet {
  owner: string;
}

type DomesticAnimal = Animal & Pet;

// ==========================================
// 問題 11: 関数型の交差
// ==========================================
type Validator = {
  validate: (value: any) => boolean;
};

type Formatter = {
  format: (value: any) => string;
};

type ValidatedFormatter = Validator & Formatter;

// ==========================================
// 問題 12: 交差型とジェネリクス
// ==========================================
type Paginated<T> = {
  items: T[];
  page: number;
  totalPages: number;
};

// ==========================================
// 問題 13: 交差型の条件分岐
// ==========================================
type ReadOnly = {
  readonly: true;
};

type Editable = {
  editable: true;
};

type Document = {
  title: string;
  content: string;
};

function processDocument(doc: (Document & ReadOnly) | (Document & Editable)): void {
  if ('readonly' in doc && doc.readonly) {
    console.log(`Read-only document: ${doc.title}`);
  } else if ('editable' in doc && doc.editable) {
    console.log(`Editable document: ${doc.title}`);
  }
}

// ==========================================
// 問題 14: 複雑な交差型
// ==========================================
type Response<T> = {
  data: T;
  status: number;
};

type WithMetadata = {
  metadata: {
    timestamp: Date;
    requestId: string;
  };
};

type ApiResponse<T> = Response<T> & WithMetadata;

// ==========================================
// 問題 15: Mixin 関数
// ==========================================
function mixin<T, U>(obj1: T, obj2: U): T & U {
  return Object.assign({}, obj1, obj2);
}

// ==========================================
// テストコード
// ==========================================
const contact: PersonWithContact = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com',
  phone: '090-1234-5678'
};

displayContact(contact);

const product: Product & WithId & Timestamped = {
  id: 'p001',
  name: 'Laptop',
  price: 1200,
  createdAt: new Date(),
  updatedAt: new Date()
};
console.log(product);

const merged = merge({ a: 1 }, { b: 2 });
console.log(merged);  // { a: 1, b: 2 }

const admin: AdminUser = {
  id: 'u001',
  name: 'Bob',
  role: 'admin'
};
console.log(admin);

const gameObj: GameObject = {
  draw: () => console.log('Drawing...'),
  move: (x, y) => console.log(`Moving to (${x}, ${y})`)
};
gameObj.draw();
gameObj.move(10, 20);

const serverConfig: ServerConfig = {
  host: 'localhost',
  port: 3000,
  ssl: true,
  apiKey: 'secret',
  logLevel: 'info'
};
console.log(serverConfig);

const pet: DomesticAnimal = {
  name: 'Max',
  age: 3,
  owner: 'Alice'
};
console.log(pet);

const validator: ValidatedFormatter = {
  validate: (value) => value !== null,
  format: (value) => String(value)
};
console.log(validator.validate(123));
console.log(validator.format(123));

type User = { name: string; email: string };
const paginatedUsers: Paginated<User> = {
  items: [{ name: 'Alice', email: 'alice@example.com' }],
  page: 1,
  totalPages: 5
};
console.log(paginatedUsers);

const readonlyDoc: Document & ReadOnly = {
  title: 'Manual',
  content: 'Read this',
  readonly: true
};
processDocument(readonlyDoc);

const apiResponse: ApiResponse<User> = {
  data: { name: 'Alice', email: 'alice@example.com' },
  status: 200,
  metadata: {
    timestamp: new Date(),
    requestId: 'req-123'
  }
};
console.log(apiResponse);

const mixed = mixin({ x: 1 }, { y: 2 });
console.log(mixed);  // { x: 1, y: 2 }
