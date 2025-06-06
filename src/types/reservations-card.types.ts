import { ReservationLabelType } from './reservations-label.types';

export interface ReservationsCardProps {
  imageUrl: string;
  label: ReservationLabelType;
  title: string;
  date: string;
  time: string;
  headCount: number;
  price: number;
  showCancel?: boolean;
  showReview?: boolean;
}
