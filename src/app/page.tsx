'use client';

import { useURLQuery } from '@/src/hooks/useURLQuery';
import { fetchFromClient } from '../lib/fetch/fetchFromClient';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LikeIcon from '../components/common/icons/LikeIcon';
import StarFillIcon from '../components/common/icons/StarFillIcon';
import { useGnbStore } from '../store/gnbStore';

export default function Home() {
  const { updateQuery } = useURLQuery();
  const [activities, setActivities] = useState([]);
  const searchParams = useSearchParams();
  const { setBackAction } = useGnbStore();

  useEffect(() => {
    setBackAction(null);
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

  return (
    <div className='text-primary-300'>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      ~~~어디가냥 메인 페이지~~~
      <br />
      <label>
        주소
        <input
          type='text'
          className='w-[200px] h-[24px] text-gray-800 bg-gray-100'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const inputValue = (e.target as HTMLInputElement).value;
              updateQuery('address', inputValue);
            }
          }}
        />
      </label>
      <br />
      <br />
      <label>
        검색
        <input
          type='text'
          className='w-[200px] h-[24px] text-gray-800 bg-gray-100'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const inputValue = (e.target as HTMLInputElement).value;
              updateQuery('keyword', inputValue);
            }
          }}
        />
      </label>
      <br />
      <br />
      <label>
        최소가격
        <input
          type='text'
          className='w-[200px] h-[24px] text-gray-800 bg-gray-100'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const inputValue = (e.target as HTMLInputElement).value;
              updateQuery('min-price', inputValue);
            }
          }}
        />
      </label>
      <br />
      <br />
      <label>
        최대가격
        <input
          type='text'
          className='w-[200px] h-[24px] text-gray-800 bg-gray-100'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const inputValue = (e.target as HTMLInputElement).value;
              updateQuery('max-price', inputValue);
            }
          }}
        />
      </label>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7 gap-[24px] mt-6 p-[24px]'>
        {activities.map((item: any) => (
          <article key={item.id}>
            <figure className='relative'>
              <img
                src={item.bannerImageUrl}
                alt={item.title}
                className='w-full aspect-square object-cover rounded-[20px]'
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
