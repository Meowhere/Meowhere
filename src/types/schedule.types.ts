export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface SelectedSchedule {
  id: number;
  date: string;
}

export interface ScheduleWithTimes {
  date: string;
  times: {
    id: number;
    startTime: string;
    endTime: string;
  }[];
}
