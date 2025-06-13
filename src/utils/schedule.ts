import { Schedule } from '@/src/types/schedule.types';

export const groupSchedulesByDate = (schedules: Schedule[]) => {
  return schedules.reduce(
    (acc, schedule) => {
      (acc[schedule.date] = acc[schedule.date] || []).push(schedule);
      return acc;
    },
    {} as Record<string, Schedule[]>
  );
};
