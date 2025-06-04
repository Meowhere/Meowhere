import { motion, useScroll, useTransform } from 'framer-motion';
import ArrowIcon from '../../common/icons/ArrowIcon';
import SearchIcon from '../../common/icons/SearchIcon';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import { useGnbStore } from '@/src/store/gnbStore';
import { useQueryUpdate } from '@/src/hooks/useQueryUpdate';
import { categories } from './Category';
import BaseButton from '../../common/buttons/BaseButton';
import Input from '../../common/inputs/Input';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { fetchFromServer } from '@/src/lib/fetch/fetchFromServer';

interface NavbarCategoryProps {
  category: string;
  icon: React.ReactNode;
  value: '' | '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙';
}

function NavbarCategory({ category, icon, value }: NavbarCategoryProps) {
  const searchParams = useSearchParams();
  const [isSelected, setIsSelected] = useState(false);
  const { updateQuery } = useQueryUpdate();

  useEffect(() => {
    const currentCategory = searchParams.get('category');
    setIsSelected(currentCategory === value);
  }, [searchParams, value]);

  return (
    <button
      className={`${isSelected ? 'text-gray-800 border-b border-gray-800' : 'text-gray-500'} flex flex-col items-center gap-[4px] min-w-[78px] cursor-pointer pb-[8px]`}
      onClick={() => {
        updateQuery('category', value);
      }}
      aria-label={category}
    >
      {icon}
      <span className='text-xs'>{category}</span>
    </button>
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const categoryHeight = useTransform(scrollY, [0, 100], [64, 39]);
  const searchParams = useSearchParams();
  const { backAction, title, subtitle, rightButtons, isSearching, setIsSearching } = useGnbStore();
  const pathname = usePathname();
  const [prices, setPrices] = useState<Map<number, number>>(new Map());
  const [places, setPlaces] = useState<Map<string, number>>(new Map());

  const params = {
    keyword: searchParams.get('keyword'),
    minPrice: searchParams.get('min-price'),
    maxPrice: searchParams.get('max-price'),
    address: searchParams.get('address'),
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchFromClient(
        `/activities?method=offset&page=1&size=100&sort=price_asc`
      );
      const data = await response.json();
      const activities = data.activities;
      const totalCount = data.totalCount;
      const maxPrice = activities[totalCount - 1].price + 1;
      const minPrice = activities[0].price;
      const gapOfPrice = (maxPrice - minPrice) / 30;

      let mapForPlaces = new Map();
      let mapForPrices = new Map();
      activities.forEach((v, i) => {
        const place = v.address.split(' ')[0];
        const sectionOfPrice = Math.floor((v.price - minPrice) / gapOfPrice);
        mapForPrices.set(sectionOfPrice, (mapForPrices.get(sectionOfPrice) || 0) + 1);
        mapForPlaces.set(place, (mapForPlaces.get(place) || 0) + 1);
      });

      setPrices(mapForPrices);
      setPlaces(mapForPlaces);

      console.log(mapForPrices);
      console.log(mapForPlaces);
    };
    fetchData();
  }, [searchParams]);

  const hasParams = Object.values(params).some((value) => value !== null && value.trim() !== '');

  if (pathname === '/') {
    return (
      <nav className='fixed top-0 left-0 w-full border-b border-gray-200 bg-white z-30'>
        <div className='flex justify-center gap-[24px] w-full h-[76px] p-[14px] px-[24px] items-center'>
          {hasParams || rightButtons.length ? (
            <div className='flex justify-start'>
              <ArrowIcon
                direction='left'
                size={24}
                onClick={backAction || undefined}
                aria-label='뒤로가기'
              />
            </div>
          ) : (
            ''
          )}

          <div className='flex justify-center flex-1 max-w-[500px] h-[48px]'>
            <button
              className='w-full h-full bg-white border border-gray-200 text-gray-800 rounded-full text-sm flex items-center justify-center gap-2 shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)]'
              onClick={() => setIsSearching(true)}
            >
              {hasParams ? (
                <div className='flex flex-col justify-center items-center leading-none gap-[4px]'>
                  <div className='flex'>
                    <span>{params.address}</span>
                    {params.address && params.keyword && <span>의&nbsp;</span>}
                    {!params.address && !params.keyword && <span>어디든지</span>}
                    <span>{params.keyword}</span>
                  </div>
                  {(params.minPrice || params.maxPrice) && (
                    <div className='flex gap-2 text-gray-400'>
                      {params.minPrice && <span>{Number(params.minPrice).toLocaleString()}원</span>}
                      <span> ~ </span>
                      {params.maxPrice && <span>{Number(params.maxPrice).toLocaleString()}원</span>}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <SearchIcon />
                  <span>새로운 체험 찾기</span>
                </>
              )}
            </button>
          </div>
          {hasParams || rightButtons.length ? (
            <div className='flex justify-end w-[24px]'></div>
          ) : (
            ''
          )}
        </div>
        {isSearching ? (
          <div className='w-full h-screen bg-gray-100 p-[24px] pb-[200px] fixed top-[76px] left-0 overflow-y-scroll'>
            <div className='flex flex-col justify-center items-center w-full gap-[14px]'>
              <section className='flex flex-col justify-center items-start w-full gap-[16px] bg-white rounded-[8px] pt-[18px] px[24px]'>
                <h2 className='text-[22px] font-semibold text-gray-800'>지역</h2>
                <Input
                  label='어디로 갈까요?'
                  className='w-full h-[42px] text-md font-medium rounded-[10px]'
                  type='text'
                />
                <ul className='flex flex-col justify-start items-start w-full gap-[8px]'>
                  {Array.from(places.entries()).map(([places, count]) => (
                    <li key={places} className='flex justify-between items-center w-full'>
                      <span>{places}</span>
                      <span>{count}개의 체험</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className='flex flex-col justify-center items-start w-full gap-[16px] bg-white rounded-[8px] pt-[18px] px-[24px]'>
                <h2 className='text-[22px] font-semibold text-gray-800'>가격</h2>
                <div className='flex justify-start items-end w-full h-[148px] gap-[2px]'>
                  {Array(30)
                    .fill(0)
                    .map((v, i) => (
                      <div
                        key={i}
                        className='w-full bg-primary-300 rounded-[2px]'
                        style={{ height: `${((prices.get(i) || 0) / prices.size) * 100}%` }}
                      />
                    ))}
                </div>
                <input
                  type='range'
                  min={0}
                  max={30}
                  value={0}
                  className='w-full h-[4px] bg-gray-200 rounded-[2px]'
                />
              </section>
              <BaseButton className='w-full h-[42px] text-md font-medium rounded-[10px]'>
                검색
              </BaseButton>
            </div>
          </div>
        ) : (
          <motion.div
            style={{ height: categoryHeight }}
            className='flex justify-start h-[60px] pt-[8px] px-[24px] overflow-x-auto overflow-y-hidden scrollbar-hide'
          >
            {categories.map((category) => (
              <NavbarCategory
                key={category.category}
                category={category.category}
                icon={category.icon}
                value={category.value}
              />
            ))}
          </motion.div>
        )}
      </nav>
    );
  } else {
    return (
      <nav className='fixed top-0 left-0 w-full border-b border-gray-200 bg-white text-xs z-30'>
        <div className='flex justify-center gap-[24px] w-full h-[48px] p-[14px] px-[24px] items-center'>
          {backAction || rightButtons.length ? (
            <div className='flex justify-start w-[60px]'>
              <ArrowIcon
                direction='left'
                className='w-[24px] h-[24px]'
                onClick={backAction || undefined}
                aria-label='뒤로가기'
              />
            </div>
          ) : (
            ''
          )}
          <div className='flex flex-col justify-center items-center flex-1 gap-[4px]'>
            <span className='text-md leading-none'>{title}</span>
            {subtitle && <span className='text-xs leading-none text-gray-500'>{subtitle}</span>}
          </div>
          {backAction || rightButtons.length ? (
            <div className='flex justify-end items-center gap-[12px] w-[60px]'>
              {rightButtons.map((button, index) =>
                React.cloneElement(button as ReactElement, {
                  key: `gnb-button-${index}`,
                })
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </nav>
    );
  }
}
