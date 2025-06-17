'use client';

import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import ReservationMobileFooter from './ReservationMobileFooter';

interface ReservationBoxProps {
  pricePerPerson: number;
  onClick?: () => void;
}

export default function ReservationBox({ pricePerPerson, onClick }: ReservationBoxProps) {
  const { isMobile, isTablet, isDesktop, hasMounted } = useBreakpoint();

  if (!hasMounted) return null;

  return (
    <>
      {(isMobile || isTablet) && (
        <ReservationMobileFooter pricePerPerson={pricePerPerson} onClickDateSelect={onClick} />
      )}

      {isDesktop && (
        <div className='w-full px-[8px] pt-[8px]'>
          <div className='flex justify-between items-center'>
            <p className='text-[18px] font-bold text-gray-900'>
              {typeof pricePerPerson === 'number'
                ? `₩${pricePerPerson.toLocaleString()}`
                : '가격 정보 없음'}
              <span className='font-normal text-[16px]'>/ 인</span>
            </p>

            <button
              onClick={onClick}
              className='bg-primary-300 text-white px-[20px] py-[10px] rounded-full text-md font-semibold'
            >
              일정 선택
            </button>
          </div>
        </div>
      )}
    </>
  );
}
