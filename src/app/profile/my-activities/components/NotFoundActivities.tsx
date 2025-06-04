'use client';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import Image from 'next/image';

export default function NotFoundActivities() {
  const { isDesktop } = useBreakpoint();
  return (
    <div className='flex flex-col items-center justify-center '>
      <Image
        src='/assets/icons/logo/ico-empty-view-logo.svg'
        alt='빈 상태 이미지'
        width={82}
        height={123}
      />
      <h1 className='text-2lg font-semibold text-gray-400'>등록된 체험이 없다냥</h1>
      {isDesktop && (
        <div className='flex flex-col items-center gap-[46px] py-[22px]'>
          <p className='text-md font-regular text-gray-400'>
            문화, 액티비티, 힐링 서비스를 둘러봐. <br /> 예약이 있으면 여기에 표시돼!
          </p>
          <BaseButton
            variant='soft'
            color='red'
            children='체험 등록하러 가기'
            className='w-[180px]'
          />
        </div>
      )}
    </div>
  );
}
