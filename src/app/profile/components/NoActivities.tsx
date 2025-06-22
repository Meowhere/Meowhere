'use client';
import LinkButton from '@/src/components/common/buttons/LinkButton';
import { useThemeStore } from '@/src/store/themeStore';
import Image from 'next/image';

interface NoActivitiesProps {
  title: string;
  urlPath: string;
  buttonTitle: string;
}

export default function NoActivities({ title, urlPath, buttonTitle }: NoActivitiesProps) {
  const theme = useThemeStore((state) => state.theme); // zustand에서 현재 테마 가져오기

  const imageSrc =
    theme === 'dark'
      ? '/assets/icons/logo/ico-empty-view-logo-dark.svg'
      : '/assets/icons/logo/ico-empty-view-logo.svg';

  return (
    <div className='flex flex-col items-center justify-center gap-[24px] lg:flex-row lg:gap-[128px] my-[112px]'>
      <div className='relative w-[82px] h-[123px] lg:w-[282px] lg:h-[423px]'>
        <Image src={imageSrc} alt='빈 상태 이미지' fill sizes='(min-width: 1024px) 282px, 82px' />
      </div>

      <div className='flex flex-col items-center lg:items-start'>
        <h1 className='text-2lg font-semibold text-gray-400 lg:text-left'>{title} 체험이 없다냥</h1>
        <div className='flex flex-col items-center lg:items-start gap-[46px] py-[22px]'>
          <p className='text-md font-regular text-gray-400 break-keep max-lg:hidden'>
            문화, 액티비티, 힐링 서비스를 둘러봐. <br /> 체험이 있으면 여기에 표시돼!
          </p>

          <LinkButton
            href={urlPath}
            variant='soft'
            color='red'
            className='w-[180px] h-[40px] lg:h-[48px] bg-primary-100 text-primary-300 dark:bg-primary-300 dark:text-gray-100 text-md font-semibold'
          >
            {buttonTitle}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
