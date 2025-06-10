interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export const groupSchedulesByDate = (schedules: Schedule[]) => {
  return schedules.reduce(
    (acc, schedule) => {
      (acc[schedule.date] = acc[schedule.date] || []).push(schedule);
      return acc;
    },
    {} as Record<string, Schedule[]>
  );
};
