/**
 * 날짜를 'yy. mm. dd' 형식으로 반환 (예: 24. 06. 12)
 */
export function formatDateDot(date: Date): string {
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}. ${month}. ${day}`;
}

/**
 * 날짜를 'yyyy-mm-dd' 형식으로 반환 (예: 2025-06-12)
 */
export function formatDateHyphen(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
