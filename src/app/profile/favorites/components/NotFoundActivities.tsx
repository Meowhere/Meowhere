'use client';
import LinkButton from '@/src/components/common/buttons/LinkButton';
import Image from 'next/image';

export default function NotFoundFavorites() {
  return (
    <div className='flex flex-col items-center justify-center gap-[24px] lg:flex-row lg:gap-[128px] my-[112px]'>
      <div className='relative w-[82px] h-[123px] lg:w-[282px] lg:h-[423px]'>
        <Image
          src='/assets/icons/logo/ico-empty-view-logo.svg'
          alt='빈 상태 이미지'
          fill
          sizes='(min-width: 1024px) 282px, 82px'
        />
      </div>

      <div className='flex flex-col items-center lg:items-start'>
        <h1 className='text-2lg font-semibold text-gray-400 lg:text-left text-ellipsis'>
          좋아요한 체험이 없다냥
        </h1>
        <div className='flex flex-col items-center lg:items-start gap-[46px] py-[22px]'>
          <p className='text-md font-regular text-gray-400 text-ellipsis max-lg:hidden'>
            문화, 액티비티, 힐링 서비스를 둘러봐. <br /> 좋아요한 체험이 있으면 여기에 표시돼!
          </p>

          <LinkButton
            href='/'
            variant='soft'
            color='red'
            className='w-[180px] h-[40px] lg:h-[48px] bg-primary-100 text-primary-300 text-md font-semibold'
          >
            체험 보러가기
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
