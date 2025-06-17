export type MyReservationStatus =
  | 'all'
  | 'pending'
  | 'confirmed'
  | 'declined'
  | 'canceled'
  | 'completed';

export interface MyReservation {
  id: number;
  teamId: string;
  userId: number;
  activity: {
    bannerImageUrl: string;
    title: string;
    id: number;
  };
  scheduleId: 0;
  status: MyReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyReservationResponse {
  cursorId: number;
  reservations: MyReservation[];
  totalCount: number;
}
