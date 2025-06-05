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
    <div className='fixed flex justify-center bottom-[24px] left-0 w-full px-4 pb-4 z-50 bg-transparent'>
      <div className='w-[327px] h-[64px] py-[16px] px-[8px] bg-white rounded-full border border-gray-200 shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)] backdrop-blur-md flex items-center'>
        <p className='text-lg font-semibold px-[24px] text-gray-800'>
          ₩ {pricePerPerson.toLocaleString()} <span>/ 인</span>
        </p>
        <div className='ml-auto'>
          <BaseButton
            onClick={onClickDateSelect}
            className='w-[106px] h-[48px] text-lg font-bold rounded-full transition'
          >
            일정 선택
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
