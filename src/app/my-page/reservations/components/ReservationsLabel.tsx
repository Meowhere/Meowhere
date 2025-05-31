'use client';

interface ReservationsLabelProps {
  label: string;
}

const LABEL_STYLE_MAP: Record<string, { bg: string; text: string }> = {
  '예약 완료': { bg: 'bg-green-100', text: 'text-green-200' },
  '예약 취소': { bg: 'bg-gray-100', text: 'text-gray-600' },
  '예약 거절': { bg: 'bg-red-100', text: 'text-red-300' },
  '예약 승인': { bg: 'bg-blue-100', text: 'text-blue-200' },
  '체험 완료': { bg: 'bg-purple-100', text: 'text-purple-200' },
};

export default function ReservationsLabel({ label }: ReservationsLabelProps) {
  const style = LABEL_STYLE_MAP[label];

  return (
    <span
      // className={`inline-block w-[6.5rem] h-[2.4rem] px-[1rem] py-[0.6rem] rounded-[2rem] font-semibold text-[1.2rem] leading-[1.2rem] font-medium ${style.bg} ${style.text}`}
      className={`inline-block w-[65px] h-[24px] px-[10px] py-[6px] rounded-[20px] font-semibold text-[12px] leading-[12px] font-medium ${style.bg} ${style.text}`}
    >
      {label}
    </span>
  );
}
