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
    [-2]: '모레',
    [-1]: '내일',
    [0]: '오늘',
    [1]: '어제',
    [2]: '그저께',
  } as const;

  function isValidDayKey(day: number): day is keyof typeof DAY_TO_KR {
    return day in DAY_TO_KR;
  }

  // 1. 명확한 키값에 해당하는 경우
  if (isValidDayKey(diffDays)) return DAY_TO_KR[diffDays];

  // 2. 3일 이상 차이나는 경우 상대시간 표현
  if (Math.abs(diffDays) >= 1) {
    return isFuture ? `${Math.abs(diffDays)}일 후` : `${Math.abs(diffDays)}일 전`;
  }

  // 3. 하루 이내: 시간 또는 분
  if (Math.abs(diffHours) >= 1) {
    return isFuture ? `${Math.abs(diffHours)}시간 후` : `${Math.abs(diffHours)}시간 전`;
  }

  if (Math.abs(diffMinutes) >= 1) {
    return isFuture ? `${Math.abs(diffMinutes)}분 후` : `${Math.abs(diffMinutes)}분 전`;
  }

  return isFuture ? '곧' : '방금 전';
}
