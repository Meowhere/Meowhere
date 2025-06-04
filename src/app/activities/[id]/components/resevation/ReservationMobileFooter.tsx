'use client';

import BaseButton from '@/src/components/common/buttons/BaseButton';

interface ReservationMobileFooterProps {
  pricePerPerson: number;
  onClickDateSelect: () => void;
}

export default function ReservationMobileFooter({
  pricePerPerson,
  onClickDateSelect,
}: ReservationMobileFooterProps) {
  return (
    <div className='fixed bottom-0 left-0 w-full px-4 pb-4 z-50 bg-transparent'>
      <div className='w-full h-[64px] flex items-center justify-between gap-10 left-[24px] bg-white rounded-full border border-gray-200 shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)] backdrop-blur-md px-6 py-4'>
        <p className='text-lg font-semibold text-gray-800'>
          ₩ {pricePerPerson.toLocaleString()} <span>/ 인</span>
        </p>
        <BaseButton
          onClick={onClickDateSelect}
          className='w-[106px] h-[48px] text-lg font-bold rounded-full transition'
        >
          일정 선택
        </BaseButton>
      </div>
    </div>
  );
}
