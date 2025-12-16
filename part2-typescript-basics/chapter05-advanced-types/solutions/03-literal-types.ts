/**
 * 解答例 3: リテラル型（Literal Types）
 */

// ==========================================
// 問題 1: 文字列リテラル型
// ==========================================
type Direction = 'north' | 'south' | 'east' | 'west';

function move(direction: Direction): string {
  return `Moving ${direction}`;
}

// ==========================================
// 問題 2: 数値リテラル型
// ==========================================
type HttpStatus = 200 | 201 | 400 | 401 | 404 | 500;

function getStatusMessage(status: HttpStatus): string {
  const messages: Record<HttpStatus, string> = {
    200: 'OK',
    201: 'Created',
    400: 'Bad Request',
    401: 'Unauthorized',
    404: 'Not Found',
    500: 'Internal Server Error'
  };
  return messages[status];
}

// ==========================================
// 問題 3: サイズの定義
// ==========================================
type Size = 'xs' | 's' | 'm' | 'l' | 'xl';

function getSizeInPixels(size: Size): number {
  const sizes: Record<Size, number> = {
    xs: 12,
    s: 14,
    m: 16,
    l: 18,
    xl: 20
  };
  return sizes[size];
}

// ==========================================
// 問題 4: boolean リテラル型
// ==========================================
type AlwaysTrue = true;

function confirmAction(): AlwaysTrue {
  return true;
}

// ==========================================
// 問題 5: オブジェクトの判別
// ==========================================
type Circle = {
  kind: 'circle';
  radius: number;
};

type Square = {
  kind: 'square';
  sideLength: number;
};

type Shape = Circle | Square;

function calculateArea(shape: Shape): number {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2;
  }
  return shape.sideLength ** 2;
}

// ==========================================
// 問題 6: イベントの型定義
// ==========================================
type ClickEvent = {
  type: 'click';
  x: number;
  y: number;
};

type KeyEvent = {
  type: 'keypress';
  key: string;
};

type Event = ClickEvent | KeyEvent;

function handleEvent(event: Event): void {
  if (event.type === 'click') {
    console.log(`Clicked at (${event.x}, ${event.y})`);
  } else {
    console.log(`Key pressed: ${event.key}`);
  }
}

// ==========================================
// 問題 7: 色のリテラル型
// ==========================================
type Color = 'red' | 'green' | 'blue';

function getColorCode(color: Color): string {
  const codes: Record<Color, string> = {
    red: '#FF0000',
    green: '#00FF00',
    blue: '#0000FF'
  };
  return codes[color];
}

// ==========================================
// 問題 8: 状態管理
// ==========================================
type LoadingState = {
  status: 'loading';
};

type SuccessState = {
  status: 'success';
  data: string;
};

type ErrorState = {
  status: 'error';
  error: Error;
};

type State = LoadingState | SuccessState | ErrorState;

function getStateText(state: State): string {
  switch (state.status) {
    case 'loading':
      return 'Loading...';
    case 'success':
      return `Success: ${state.data}`;
    case 'error':
      return `Error: ${state.error.message}`;
  }
}

// ==========================================
// 問題 9: リテラル型の配列
// ==========================================
type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri';

function isBusinessDay(day: string): boolean {
  const businessDays: Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri'];
  return businessDays.includes(day as Weekday);
}

// ==========================================
// 問題 10: ネストしたリテラル型
// ==========================================
type PaymentMethod =
  | { method: 'credit_card'; cardNumber: string }
  | { method: 'paypal'; email: string }
  | { method: 'bank_transfer'; accountNumber: string };

function displayPayment(payment: PaymentMethod): void {
  switch (payment.method) {
    case 'credit_card':
      console.log(`Credit Card: ${payment.cardNumber}`);
      break;
    case 'paypal':
      console.log(`PayPal: ${payment.email}`);
      break;
    case 'bank_transfer':
      console.log(`Bank Transfer: ${payment.accountNumber}`);
      break;
  }
}

// ==========================================
// 問題 11: リテラル型の絞り込み
// ==========================================
type TrafficLight = 'red' | 'yellow' | 'green';

function getNextLight(current: TrafficLight): TrafficLight {
  const transitions: Record<TrafficLight, TrafficLight> = {
    red: 'green',
    green: 'yellow',
    yellow: 'red'
  };
  return transitions[current];
}

// ==========================================
// 問題 12: const アサーション
// ==========================================
const COLORS = {
  RED: '#FF0000',
  GREEN: '#00FF00',
  BLUE: '#0000FF'
} as const;

type ColorName = keyof typeof COLORS;

// ==========================================
// 問題 13: タグ付きユニオンの応用
// ==========================================
type Request =
  | { type: 'get'; url: string }
  | { type: 'post'; url: string; body: any }
  | { type: 'delete'; url: string; id: string };

function describeRequest(request: Request): void {
  switch (request.type) {
    case 'get':
      console.log(`GET ${request.url}`);
      break;
    case 'post':
      console.log(`POST ${request.url} with body:`, request.body);
      break;
    case 'delete':
      console.log(`DELETE ${request.url}/${request.id}`);
      break;
  }
}

// ==========================================
// 問題 14: リテラル型と型ガード
// ==========================================
type Animal =
  | { species: 'dog'; breed: string }
  | { species: 'cat'; indoor: boolean }
  | { species: 'bird'; canFly: boolean };

function getAnimalInfo(animal: Animal): string {
  switch (animal.species) {
    case 'dog':
      return `Dog (${animal.breed})`;
    case 'cat':
      return `Cat (${animal.indoor ? 'Indoor' : 'Outdoor'})`;
    case 'bird':
      return `Bird (${animal.canFly ? 'Can fly' : 'Cannot fly'})`;
  }
}

// ==========================================
// 問題 15: 複雑な判別可能なユニオン
// ==========================================
type Message =
  | { kind: 'text'; content: string; sender: string }
  | { kind: 'image'; url: string; width: number; height: number }
  | { kind: 'video'; url: string; duration: number }
  | { kind: 'file'; filename: string; size: number };

function summarizeMessages(messages: Message[]): void {
  const summary = messages.reduce((acc, msg) => {
    acc[msg.kind] = (acc[msg.kind] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  console.log('Message Summary:');
  Object.entries(summary).forEach(([kind, count]) => {
    console.log(`  ${kind}: ${count}`);
  });
}

// ==========================================
// テストコード
// ==========================================
console.log(move('north'));                          // "Moving north"
console.log(getStatusMessage(200));                  // "OK"
console.log(getStatusMessage(404));                  // "Not Found"
console.log(getSizeInPixels('m'));                   // 16
console.log(confirmAction());                        // true
console.log(calculateArea({ kind: 'circle', radius: 5 }));
console.log(calculateArea({ kind: 'square', sideLength: 4 }));
handleEvent({ type: 'click', x: 100, y: 200 });
handleEvent({ type: 'keypress', key: 'Enter' });
console.log(getColorCode('red'));                    // "#FF0000"
console.log(getStateText({ status: 'loading' }));   // "Loading..."
console.log(getStateText({ status: 'success', data: 'OK' }));
console.log(isBusinessDay('mon'));                   // true
displayPayment({ method: 'credit_card', cardNumber: '1234-5678' });
displayPayment({ method: 'paypal', email: 'user@example.com' });
console.log(getNextLight('red'));                    // "green"
console.log(getNextLight('green'));                  // "yellow"
console.log(COLORS.RED);                             // "#FF0000"
describeRequest({ type: 'get', url: '/api/users' });
describeRequest({ type: 'post', url: '/api/users', body: { name: 'Alice' } });
console.log(getAnimalInfo({ species: 'dog', breed: 'Labrador' }));
console.log(getAnimalInfo({ species: 'cat', indoor: true }));
const messages: Message[] = [
  { kind: 'text', content: 'Hello', sender: 'Alice' },
  { kind: 'image', url: 'photo.jpg', width: 800, height: 600 },
  { kind: 'video', url: 'video.mp4', duration: 120 },
  { kind: 'text', content: 'Goodbye', sender: 'Bob' }
];
summarizeMessages(messages);
