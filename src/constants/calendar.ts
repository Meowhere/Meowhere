// 공통 스타일 적용을 위한 상태 매핑 객체
export const STATUS_STYLE_MAP = {
  pending: {
    label: '예약',
    colorClass: 'text-green-200 bg-green-100',
  },
  confirmed: {
    label: '승인',
    colorClass: 'text-blue-200 bg-blue-100',
  },
  declined: {
    label: '거절',
    colorClass: 'text-gray-600 bg-gray-100',
  },
};
