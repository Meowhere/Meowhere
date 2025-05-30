export const DROPDOWN_ITEM_TYPES = {
  BUTTON: 'button',
  LINK: 'link',
} as const;

export const RESERVATION_STATUS_LABELS = {
  COMPLETED: '예약 완료',
  APPROVED: '예약 승인',
  CANCELED: '예약 취소',
  REJECTED: '예약 거절',
  EXPERIENCE_COMPLETED: '체험 완료',
} as const;

export const POST_ACTION_LABELS = {
  EDIT: '게시물 수정',
  DELETE: '게시물 삭제',
  CANCEL: '취소',
} as const;
