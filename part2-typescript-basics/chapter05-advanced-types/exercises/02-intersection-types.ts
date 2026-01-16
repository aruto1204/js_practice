/**
 * 練習問題 2: 交差型（Intersection Types）
 *
 * このファイルでは、交差型を使った型の組み合わせを練習します。
 */

// ==========================================
// 問題 1: 基本的な交差型
// ==========================================
// Person 型（name: string, age: number）と
// Contact 型（email: string, phone: string）を定義し、
// これらの交差型 PersonWithContact を作成してください
// TODO: Person, Contact, PersonWithContact 型を実装
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
// 上記の PersonWithContact 型を受け取り、情報を表示する displayContact 関数を実装してください
// TODO: ここに displayContact 関数を実装
function displayContact(contact: PersonWithContact): void {
  console.log(`Name: ${contact.name}, Age: ${contact.age}`);
  console.log(`Email: ${contact.email}, Phone: ${contact.phone}`);
}

// ==========================================
// 問題 3: Mixin パターン
// ==========================================
// Timestamped 型（createdAt: Date, updatedAt: Date）と
// WithId 型（id: string）を定義し、
// これらを任意の型に追加できるようにしてください
// 例: User & WithId & Timestamped
// TODO: Timestamped, WithId 型を実装
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
// Product 型（name: string, price: number）を定義し、
// Product & WithId & Timestamped 型の商品データを作成してください
// TODO: Product 型とサンプルデータを実装

type Product = {
  name: string;
  price: number;
};

// ==========================================
// 問題 5: 交差型と関数
// ==========================================
// 2つのオブジェクトを受け取り、それらを結合した新しいオブジェクトを返す
// merge 関数を実装してください（交差型を返す）
// TODO: ここに merge 関数を実装

function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

// ==========================================
// 問題 6: 型の拡張
// ==========================================
// BaseUser 型（id: string, name: string）を定義し、
// これに role: string を追加した AdminUser 型を交差型で定義してください
// TODO: BaseUser, AdminUser 型を実装

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
// Drawable 型（draw: () => void）と
// Movable 型（move: (x: number, y: number) => void）を定義し、
// これらの交差型 GameObject を作成してください
// TODO: Drawable, Movable, GameObject 型を実装
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
// GameObject 型を実装したオブジェクトを作成してください
// TODO: ここに GameObject を実装したオブジェクトを作成
const gameObject: GameObject = {
  draw: () => console.log('Drawing...'),
  move: (x, y) => console.log(`Moving to (${x}, ${y})`),
};

// ==========================================
// 問題 9: ネストした交差型
// ==========================================
// Config 型（host: string, port: number）と
// Security 型（ssl: boolean, apiKey: string）と
// Logger 型（logLevel: 'info' | 'warn' | 'error'）を定義し、
// これらすべてを含む ServerConfig 型を作成してください
// TODO: Config, Security, Logger, ServerConfig 型を実装

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
// Animal インターフェース（name: string, age: number）と
// Pet インターフェース（owner: string）を定義し、
// これらの交差型 DomesticAnimal を作成してください
// TODO: Animal, Pet インターフェースと DomesticAnimal 型を実装

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
// Validator 型（validate: (value: any) => boolean）と
// Formatter 型（format: (value: any) => string）を定義し、
// これらの交差型 ValidatedFormatter を作成してください
// TODO: Validator, Formatter, ValidatedFormatter 型を実装

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
// Paginated<T> 型を定義してください
// - items: T[]
// - page: number
// - totalPages: number
// そして、User[] を Paginated と組み合わせた型を作成してください
// TODO: Paginated<T> 型を実装

type Paginated<T> = {
  items: T[];
  page: number;
  totalPages: number;
};
// ==========================================
// 問題 13: 交差型の条件分岐
// ==========================================
// ReadOnly 型（readonly: true）と
// Editable 型（editable: true）を定義し、
// Document & ReadOnly または Document & Editable を受け取る
// processDocument 関数を実装してください
// TODO: ReadOnly, Editable 型と processDocument 関数を実装

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
// API レスポンスの型を定義してください：
// - Response<T>: { data: T; status: number }
// - WithMetadata: { metadata: { timestamp: Date; requestId: string } }
// ApiResponse<T> = Response<T> & WithMetadata
// TODO: Response<T>, WithMetadata, ApiResponse<T> 型を実装

type Response<T> = {
  data: T;
  status: number;
};
type WithMetadata = {
  metadata: { timestamp: Date; requestId: string };
};
type ApiResponse<T> = Response<T> & WithMetadata;
// ==========================================
// 問題 15: Mixin 関数
// ==========================================
// 2つのクラスのプロトタイプを組み合わせる mixin 関数を実装してください
// （簡易版でOK：オブジェクトのマージでも可）
// TODO: ここに mixin 関数を実装
function mixin<T, U>(obj1: T, obj2: U): T & U {
  return Object.assign({}, obj1, obj2);
}

// ==========================================
// テストコード（実装後にコメントを外して実行）
// ==========================================

const contact: PersonWithContact = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com',
  phone: '090-1234-5678',
};

displayContact(contact);

const product: Product & WithId & Timestamped = {
  id: 'p001',
  name: 'Laptop',
  price: 1200,
  createdAt: new Date(),
  updatedAt: new Date(),
};
console.log(product);

const merged = merge({ a: 1 }, { b: 2 });
console.log(merged); // { a: 1, b: 2 }

const admin: AdminUser = {
  id: 'u001',
  name: 'Bob',
  role: 'admin',
};
console.log(admin);

// const gameObj: GameObject = {
//   draw: () => console.log('Drawing...'),
//   move: (x, y) => console.log(`Moving to (${x}, ${y})`),
// };
gameObject.draw();
gameObject.move(10, 20);

const serverConfig: ServerConfig = {
  host: 'localhost',
  port: 3000,
  ssl: true,
  apiKey: 'secret',
  logLevel: 'info',
};
console.log(serverConfig);

const pet: DomesticAnimal = {
  name: 'Max',
  age: 3,
  owner: 'Alice',
};
console.log(pet);

const validator: ValidatedFormatter = {
  validate: (value) => value !== null,
  format: (value) => String(value),
};
console.log(validator.validate(123));
console.log(validator.format(123));

type User = { name: string; email: string };
const paginatedUsers: Paginated<User> = {
  items: [{ name: 'Alice', email: 'alice@example.com' }],
  page: 1,
  totalPages: 5,
};
console.log(paginatedUsers);

const readonlyDoc: Document & ReadOnly = {
  title: 'Manual',
  content: 'Read this',
  readonly: true,
};
processDocument(readonlyDoc);

const apiResponse: ApiResponse<User> = {
  data: { name: 'Alice', email: 'alice@example.com' },
  status: 200,
  metadata: {
    timestamp: new Date(),
    requestId: 'req-123',
  },
};
console.log(apiResponse);

const mixed = mixin({ x: 1 }, { y: 2 });
console.log(mixed); // { x: 1, y: 2 }
