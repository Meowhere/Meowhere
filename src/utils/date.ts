import { format, parseISO, isToday, addDays, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale/ko';

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
