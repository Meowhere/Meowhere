import { ModalReservationStatus } from '../types/reservation-modal.types';

export const MODAL_RESERVATION_STATUS_MAP: Record<ModalReservationStatus, string> = {
  pending: '예약 신청',
  confirmed: '예약 승인',
  declined: '예약 거절',
};
