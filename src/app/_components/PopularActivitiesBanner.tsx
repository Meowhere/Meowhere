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

export default function PopularActivitiesBanner({
  popularActivities,
}: {
  popularActivities: Activity[];
}) {
  const { isDesktop } = useBreakpoint();
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
      {popularActivities.map((item: Activity) => (
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
