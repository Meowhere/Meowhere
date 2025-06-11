import { ReservationStatus } from './reservations-status.types';

export interface ReservationsCardProps {
  imageUrl: string;
  label: ReservationStatus;
  title: string;
  date: string;
  time: string;
  headCount: number;
  price: number;
  showCancel?: boolean;
  showReview?: boolean;
}
