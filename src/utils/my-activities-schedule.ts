import { Schedule } from '@/src/types/activity.types';

export interface CalendarItem {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

export function covertSchedulesToCalendarItems(
  schedules: Omit<Schedule, 'id'>[] = []
): CalendarItem[] {
  return schedules.map((schedule) => ({
    id: generateId(),
    date: schedule.date,
    startTime: schedule.startTime,
    endTime: schedule.endTime,
  }));
}

// 날짜/시간 비교 유틸
export function compareDateTime(a: CalendarItem, b: CalendarItem) {
  // "2024-06-14" + "T" + "14:00" 식으로 합쳐서 Date 비교
  const dateA = new Date(`${a.date}T${a.startTime}`);
  const dateB = new Date(`${b.date}T${b.startTime}`);
  return dateA.getTime() - dateB.getTime();
}
// 정렬 로직
export function sortCalendarItems(
  items: CalendarItem[],
  sortKey: 'registered' | 'latest' | 'oldest'
): CalendarItem[] {
  const sorted = [...items];
  if (sortKey === 'latest') {
    sorted.sort((a, b) => compareDateTime(b, a));
  } else if (sortKey === 'oldest') {
    sorted.sort((a, b) => compareDateTime(a, b));
  }
  return sorted;
}

export function hasOverlappingSchedules(items: CalendarItem[]): boolean {
  const schedulesByDate: Record<string, CalendarItem[]> = {};

  // 날짜별로 묶기
  for (const item of items) {
    if (!schedulesByDate[item.date]) schedulesByDate[item.date] = [];
    schedulesByDate[item.date].push(item);
  }

  // 날짜별로 시간대 비교
  for (const date in schedulesByDate) {
    const daySchedules = schedulesByDate[date];

    // 시작/끝 시간을 밀리초로 바꿔서 비교
    const timeRanges = daySchedules.map((s) => ({
      start: new Date(`${s.date}T${s.startTime}`).getTime(),
      end: new Date(`${s.date}T${s.endTime}`).getTime(),
    }));

    // 모든 조합 비교
    for (let i = 0; i < timeRanges.length; i++) {
      for (let j = i + 1; j < timeRanges.length; j++) {
        const a = timeRanges[i];
        const b = timeRanges[j];

        const isOverlap = a.start < b.end && b.start < a.end; // 겹침 조건
        if (isOverlap) return true;
      }
    }
  }

  return false;
}
