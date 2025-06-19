export interface ReservationAnalyticsByMonth {
  date: string; // 'YYYY-MM-DD'
  reservations: {
    pending: number;
    confirmed: number;
    completed: number;
  };
}
