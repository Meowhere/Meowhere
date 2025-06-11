'use client';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFoundActivities() {
  const { isDesktop } = useBreakpoint();
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-[128px]'>
      <Image
        src='/assets/icons/logo/ico-empty-view-logo.svg'
        alt='빈 상태 이미지'
        width={isDesktop ? 282 : 82}
        height={isDesktop ? 423 : 123}
      />
      <div className='flex flex-col lg:items-start'>
        <h1 className='text-2lg font-semibold text-gray-400 lg:text-left'>등록된 체험이 없다냥</h1>
        {isDesktop && (
          <div className='flex flex-col items-start gap-[46px] py-[22px]'>
            <p className='text-md font-regular text-gray-400'>
              문화, 액티비티, 힐링 서비스를 둘러봐. <br /> 예약이 있으면 여기에 표시돼!
            </p>
            <BaseButton
              variant='soft'
              color='red'
              children='체험 등록하러 가기'
              className='w-[180px] bg-primary-100 text-primary-300 text-md font-semibold'
              onClick={() => {
                router.push('/profile/my-activities/register');
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
