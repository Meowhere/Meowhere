import { reservationStatusMap } from '@/src/constants/reservations-status';

export type ReservationStatus = keyof typeof reservationStatusMap;
