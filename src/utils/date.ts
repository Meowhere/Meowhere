import { format, parseISO, isToday, addDays, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale/ko';

/**
 * 날짜 문자열을 "YY. MM. DD (요일)" 또는 "YY. MM. DD (오늘/내일/모레)" 형식으로 포맷합니다.
 * @param dateStr - 포맷할 날짜 문자열 (ISO 8601 형식, 예: "2025-06-10")
 * @returns 포맷된 날짜 문자열 (예: "25. 06. 10 (오늘)")
 */

export const formatScheduleDate = (dateStr: string) => {
  const parsed = parseISO(dateStr);
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const dayAfterTomorrow = addDays(today, 2);

  let label = '';
  if (isToday(parsed)) {
    label = '(오늘)';
  } else if (isSameDay(parsed, tomorrow)) {
    label = '(내일)';
  } else if (isSameDay(parsed, dayAfterTomorrow)) {
    label = '(모레)';
  } else {
    const weekday = format(parsed, 'eeee', { locale: ko });
    label = `(${weekday})`;
  }
  return `${format(parsed, 'yy. MM. dd')} ${label}`;
};
