'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Activity } from '@/src/types/activity.types';
import { usePopularActivities } from '@/src/hooks/usePopularActivities';

export default function PopularActivitiesBanner() {
  const { isDesktop } = useBreakpoint();

  const { data, isLoading, isError } = usePopularActivities(5);

  if (isLoading) {
    return <div className='h-[200px] lg:h-[524px] bg-gray-200 animate-pulse rounded-[24px]' />;
  }

  if (isError || !data?.activities?.length) {
    return (
      <div className='h-[200px] lg:h-[524px] bg-gray-100 flex items-center justify-center'>
        <p className='text-gray-500'>인기 체험을 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <Swiper
      spaceBetween={isDesktop ? 32 : 10}
      slidesPerView={isDesktop ? 1.2 : 1}
      centeredSlides={true}
      modules={[Pagination, Autoplay]}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
      loop
    >
      {data.activities.map((item: Activity) => (
        <SwiperSlide key={item.id}>
          <div className='lg:rounded-[24px] lg:h-[524px] w-full h-[200px] bg-gray-200 cursor-pointer overflow-hidden relative'>
            <div className='absolute top-0 left-0 pl-[8vw] w-full h-full flex flex-col justify-center items-start z-10 bg-gradient-to-r from-black/50 to-transparent'>
              <h2 className=' lg:text-[4.8rem] lg:max-w-[calc(50%)] text-white text-2xl font-semibold max-w-[calc(100%-64px)] break-keep leading-[1.25]'>
                {item.title}
              </h2>
              <span className=' lg:text-[1.8rem] text-white text-sm font-medium mt-[0.4rem] opacity-80'>
                이달의 인기체험
              </span>
            </div>
            <Image
              priority
              src={item.bannerImageUrl}
              alt={item.title}
              fill
              className='object-cover'
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
