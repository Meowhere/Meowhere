'use client';

import { fetchFromClient } from '../lib/fetch/fetchFromClient';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LikeIcon from '../components/common/icons/LikeIcon';
import StarFillIcon from '../components/common/icons/StarFillIcon';
import { useGnbStore } from '../store/gnbStore';
import { useURLQuery } from '../hooks/useURLQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Image from 'next/image';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function Home() {
  const [activities, setActivities] = useState([]);
  const [popularActivities, setPopularActivities] = useState([]);
  const searchParams = useSearchParams();
  const { updateQuery } = useURLQuery();
  const { setBackAction } = useGnbStore();
  const router = useRouter();
  const { isDesktop } = useBreakpoint();

  useEffect(() => {
    setBackAction(null);
    if (!searchParams.get('category')) {
      updateQuery('category', '');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchFromClient(
        `/activities?method=offset&page=1&size=100&${
          searchParams.get('category') ? 'category=' + searchParams.get('category') : ''
        }&${searchParams.get('keyword') ? 'keyword=' + searchParams.get('keyword') : ''}`
      );
      const data = await response.json();
      setActivities(
        data.activities.filter(
          (item: any) =>
            item.price >= Number(searchParams.get('min-price') || 0) &&
            item.price <= Number(searchParams.get('max-price') || Infinity) &&
            item.address.includes(searchParams.get('address') || '')
        )
      );
    };
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchFromClient(
        `/activities?method=offset&page=1&size=5&sort=most_reviewed`
      );
      const data = await response.json();
      setPopularActivities(data.activities);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Swiper
        spaceBetween={10}
        slidesPerView={isDesktop ? 1.2 : 1}
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 1000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        loop
      >
        {popularActivities.map((item: any) => (
          <SwiperSlide key={item.id}>
            <div className='lg:rounded-[24px] w-full h-[200px] bg-gray-200 cursor-pointer overflow-hidden relative'>
              <div className='absolute top-0 left-0 pl-[8vw] w-full h-full flex flex-col justify-center items-start z-10 bg-gradient-to-r from-black/50 to-transparent'>
                <h2 className=' text-white text-2xl font-semibold max-w-[calc(100%-64px)] break-keep leading-[1.25]'>
                  {item.title}
                </h2>
                <span className=' text-white text-sm font-medium mt-[0.4rem] opacity-80'>
                  이달의 인기체험
                </span>
              </div>
              <Image src={item.bannerImageUrl} alt={item.title} fill className='object-cover' />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7 gap-[24px] mt-6 p-[24px]'>
        {activities.map((item: any) => (
          <article key={item.id}>
            <figure className='relative'>
              <img
                src={item.bannerImageUrl}
                alt={item.title}
                className='w-full aspect-square object-cover rounded-[20px] cursor-pointer'
                onClick={() => router.push(`/activities/${item.id}`)}
              />
              <div className='absolute top-[16px] left-[16px] flex items-center text-sm text-gray-500'>
                <div className='flex items-center justify-center gap-[4px] bg-white rounded-full w-[58px] h-[24px] font-medium'>
                  <StarFillIcon size={14} className='text-yellow-200' /> {item.rating.toFixed(1)}
                </div>
              </div>
              <LikeIcon
                showOverlay
                className='absolute top-[16px] right-[16px] w-[32px] h-[32px] text-white'
              />
            </figure>

            <div className='p-[8px] gap-[6px] flex flex-col'>
              <header>
                <h2 className='leading-[1.4] text-sm font-semibold text-gray-800 line-clamp-2'>
                  {item.title}
                </h2>
              </header>

              <section>
                <address className='text-xs leading-none text-gray-500 not-italic'>
                  {item.address}
                </address>
              </section>

              <footer className='leading-none flex justify-between items-center w-full text-[1.1rem] font-normal text-gray-500'>
                <span>{item.price.toLocaleString()}원 / 인</span>
                <span>{item.reviewCount}개의 후기</span>
              </footer>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// {
//   "id": 4256,
//   "userId": 1899,
//   "title": "테스트 데이터",
//   "description": "둠칫 둠칫 두둠칫",
//   "category": "투어",
//   "price": 10000,
//   "address": "서울특별시 강남구 테헤란로 427",
//   "bannerImageUrl": "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png",
//   "rating": 0,
//   "reviewCount": 0,
//   "createdAt": "2025-06-02T23:28:17.145Z",
//   "updatedAt": "2025-06-02T23:28:17.145Z"
// },
