import { MyReservation } from './profile-reservation.types';

export interface ReservationsCardProps {
  reservation: MyReservation;
  showCancel?: boolean;
  showReview?: boolean;
}
