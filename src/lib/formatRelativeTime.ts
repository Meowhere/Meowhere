export default function formatRelativeTime(date: string) {
  const now = new Date();
  const target = new Date(date);

  if (isNaN(target.getTime())) return '날짜 없음';

  const diff = now.getTime() - target.getTime();
  const isFuture = diff < 0;

  const MILLISECONDS = {
    MINUTE: 1000 * 60,
    HOUR: 1000 * 60 * 60,
    DAY: 1000 * 60 * 60 * 24,
  } as const;

  const diffMinutes = Math.floor(diff / MILLISECONDS.MINUTE);
  const diffHours = Math.floor(diff / MILLISECONDS.HOUR);
  const diffDays = Math.floor(diff / MILLISECONDS.DAY);

  const DAY_TO_KR = {
    [-2]: '그저께',
    [-1]: '어제',
    [0]: '오늘',
    [1]: '내일',
    [2]: '모레',
  } as const;

  function isValidDayKey(day: number): day is keyof typeof DAY_TO_KR {
    return day in DAY_TO_KR;
  }

  if (Math.abs(diffDays) > 2)
    return target.toLocaleDateString('ko-KR').replace(/\//g, '.');

  if (isValidDayKey(diffDays)) return DAY_TO_KR[diffDays];

  if (Math.abs(diffHours) > 0)
    return `${Math.abs(diffHours)}시간 ${isFuture ? '후' : '전'}`;
  if (Math.abs(diffMinutes) > 0)
    return `${Math.abs(diffMinutes)}분 ${isFuture ? '후' : '전'}`;
  return isFuture ? '곧' : '방금 전';
}
