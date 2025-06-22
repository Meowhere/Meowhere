export const MY_RESERVATION_STATUS_MAP = {
  all: { label: '모든 예약', bg: '', text: '' },
  pending: {
    label: '예약 완료',
    bg: 'bg-green-100 dark:bg-dark-green-200',
    text: 'text-green-200 dark:text-dark-green-100',
  },
  confirmed: {
    label: '예약 승인',
    bg: 'bg-blue-100 dark:bg-dark-blue-200',
    text: 'text-blue-200 dark:text-dark-blue-100',
  },
  declined: {
    label: '예약 거절',
    bg: 'bg-red-100 dark:bg-dark-red-200',
    text: 'text-red-300 dark:text-dark-red-100',
  },
  canceled: {
    label: '예약 취소',
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-600 dark:text-gray-400',
  },
  completed: {
    label: '체험 완료',
    bg: 'bg-purple-100 dark:bg-dark-purple-200',
    text: 'text-purple-200 dark:text-dark-purple-100',
  },
};
