'use client';

import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import BaseButton from '@/src/components/common/buttons/BaseButton';

interface ReservationMobileFooterProps {
  pricePerPerson: number;
  onClickDateSelect: () => void;
}

export default function ReservationMobileFooter({
  pricePerPerson,
  onClickDateSelect,
}: ReservationMobileFooterProps) {
  const { isTablet } = useBreakpoint();

  const bottomSpacing = isTablet ? 'bottom-[40px]' : 'bottom-[24px]';

  return (
    <div
      className={`fixed ${bottomSpacing} left-0 w-full z-[50] flex justify-center px-4 pb-4 pointer-events-none`}
    >
      <div
        className={`
          pointer-events-auto
          w-[327px] md:w-[640px]
          h-[64px] py-[16px] px-[8px]
          bg-white rounded-full border border-gray-200
          shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)]
          backdrop-blur-md flex items-center
        `}
      >
        <p className='text-lg font-semibold px-[24px] text-gray-800'>
          ₩ {pricePerPerson.toLocaleString()} <span>/ 인</span>
        </p>
        <div className='ml-auto'>
          <BaseButton
            onClick={onClickDateSelect}
            className='min-w-[108px] w-[108px] h-[48px] text-lg font-bold rounded-full transition flex items-center justify-center'
          >
            일정 선택
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
