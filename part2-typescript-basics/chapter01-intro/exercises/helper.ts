export function formatCurrency(amount: number): string {
  return `¥${amount.toLocaleString()}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('ja-JP');
}
