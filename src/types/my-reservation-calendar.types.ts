// 'pending' = 예약, 'confirmed' = 승인, 'declined' = 거절 (API 명세 기반)
export type ReservationStatusKey = 'pending' | 'confirmed' | 'declined';

// 해당 날짜에 발생한 예약, 승인, 거절의 건수
export interface StatusData {
  date: string;
  pendingCount: number;
  confirmedCount: number;
  declinedCount: number;
}

// 달력에 표시되는 예약 상태 데이터 배열
export interface ReservationCalendarProps {
  statusData: StatusData[];
}

// 날짜 셀 스타일 지정을 위한 react-calendar tileClassName 인자 타입
export interface TileClassNameArgs {
  date: Date;
  view: string;
  activeStartDate: Date;
}

// 예약 상태별 텍스트(label)와 Tailwind 색상 클래스(colorClass) 정의 타입
export interface StatusStyle {
  label: string;
  colorClass: string;
}
