export type ReservationLabelType =
  | '예약 완료'
  | '예약 취소'
  | '예약 거절'
  | '예약 승인'
  | '체험 완료';

export interface ReservationsLabelProps {
  label: ReservationLabelType;
}

export type LabelStyle = {
  bg: string;
  text: string;
};

export type LabelStyleMap = Record<ReservationLabelType, LabelStyle>;
