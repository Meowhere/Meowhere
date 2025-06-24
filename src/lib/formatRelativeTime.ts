export default function formatRelativeTime(date: string) {
  const now = new Date();
  const target = new Date(date);

  if (isNaN(target.getTime())) return '날짜 없음';

  // 날짜(연-월-일)만 비교
  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const diffDays = Math.floor((nowDate.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '오늘';
  if (diffDays === -1) return '내일';
  if (diffDays === 1) return '어제';
  if (diffDays === -2) return '모레';
  if (diffDays === 2) return '그저께';

  // 시간 단위 상대 표현 (오늘/내일/어제 등 외에는 기존 로직 유지)
  const diff = now.getTime() - target.getTime();
  const isFuture = diff < 0;

  const MILLISECONDS = {
    MINUTE: 1000 * 60,
    HOUR: 1000 * 60 * 60,
    DAY: 1000 * 60 * 60 * 24,
  } as const;

  const diffMinutes = Math.floor(diff / MILLISECONDS.MINUTE);
  const diffHours = Math.floor(diff / MILLISECONDS.HOUR);

  if (Math.abs(diffMinutes) < 1) {
    return isFuture ? '곧' : '방금 전';
  }

  if (Math.abs(diffHours) < 1) {
    return isFuture ? `${Math.abs(diffMinutes)}분 후` : `${Math.abs(diffMinutes)}분 전`;
  }

  if (Math.abs(diffDays) < 1) {
    return isFuture ? `${Math.abs(diffHours)}시간 후` : `${Math.abs(diffHours)}시간 전`;
  }

  return isFuture ? `${Math.abs(diffDays)}일 후` : `${Math.abs(diffDays)}일 전`;
}
