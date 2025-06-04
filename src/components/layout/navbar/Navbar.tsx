import { motion, useScroll, useTransform } from 'framer-motion';
import ArrowIcon from '../../common/icons/ArrowIcon';
import SearchIcon from '../../common/icons/SearchIcon';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useGnbStore } from '@/src/store/gnbStore';
import { useURLQuery } from '@/src/hooks/useURLQuery';
import { categories } from './Category';
import BaseButton from '../../common/buttons/BaseButton';
import Input from '../../common/inputs/Input';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { Activity, Category } from '@/src/types/activity.types';
import { useDebouncedValue } from '@/src/hooks/useDebouncedValue';

interface NavbarCategoryProps {
  category: '모두' | '문화 · 예술' | '음식' | '스포츠' | '투어' | '관광' | '웰빙';
  icon: React.ReactNode;
  value: '' | Category;
}

function NavbarCategory({ category, icon, value }: NavbarCategoryProps) {
  const searchParams = useSearchParams();
  const [isSelected, setIsSelected] = useState(false);
  const { updateQuery } = useURLQuery();

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

function SearchSection({
  children,
  title,
  isOpen,
  onClick,
  value = '',
  ...rest
}: {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  value?: string;
  onClick?: () => void;
}) {
  return (
    <section
      className={`${isOpen ? 'h-auto pt-[18px] pb-[24px]' : 'h-[52px]'} flex flex-col justify-center items-start w-full gap-[16px] bg-white rounded-[8px] px-[24px]`}
      {...rest}
      onClick={onClick}
    >
      <div className='flex justify-between items-center w-full'>
        <h2
          className={`${isOpen ? 'text-[22px]' : 'text-[13px]'} leading-none font-semibold text-gray-800`}
        >
          {title}
        </h2>
        <span>{value}</span>
      </div>
      {isOpen && children}
    </section>
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const categoryHeight = useTransform(scrollY, [0, 100], [64, 39]); // 아이콘 크기 0이 되는 시점이 39px
  const searchParams = useSearchParams();
  const { backAction, title, subtitle, rightButtons, isSearching, setIsSearching, setBackAction } =
    useGnbStore();
  const pathname = usePathname();
  const [prices, setPrices] = useState<Map<number, number>>(new Map());
  const [places, setPlaces] = useState<Map<string, number>>(new Map());
  const GAP_OF_PRICE = 30;
  const [placeKeyword, setPlaceKeyword] = useState('');
  const debouncedPlaceKeyword = useDebouncedValue(placeKeyword, 150);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [openedSearchSection, setOpenedSearchSection] = useState<'place' | 'price'>('place');

  const [selectedMaxPrice, setSelectedMaxPrice] = useState(0);
  const [selectedMinPrice, setSelectedMinPrice] = useState(0);

  const { updateQuery, updateMultipleQueries } = useURLQuery();

  const filteredPlaces = useMemo(() => {
    if (!debouncedPlaceKeyword.trim()) {
      return Array.from(places.entries());
    }
    return Array.from(places.entries()).filter(([place, _]) =>
      place.includes(debouncedPlaceKeyword)
    );
  }, [debouncedPlaceKeyword, places]);

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
      const fetchedMaxPrice = activities[totalCount - 1].price + 1;
      const fetchedMinPrice = activities[0].price;
      const gapOfPrice = (fetchedMaxPrice - fetchedMinPrice) / GAP_OF_PRICE;

      let mapForPlaces = new Map();
      let mapForPrices = new Map();
      activities.forEach((v: Activity) => {
        const place = v.address.split(' ')[0];
        const sectionOfPrice = Math.floor((v.price - fetchedMinPrice) / gapOfPrice);
        mapForPrices.set(sectionOfPrice, (mapForPrices.get(sectionOfPrice) || 0) + 1);
        mapForPlaces.set(place, (mapForPlaces.get(place) || 0) + 1);
      });

      setPrices(mapForPrices);
      setPlaces(mapForPlaces);
      setMaxPrice(fetchedMaxPrice);
      setMinPrice(fetchedMinPrice);
    };
    fetchData();
  }, [searchParams]);

  const hasParams = Object.values(params).some((value) => value !== null && value.trim() !== '');

  if (pathname === '/') {
    return (
      <nav className='fixed top-0 left-0 w-full border-b border-gray-200 bg-white z-30'>
        <div className='flex justify-center gap-[24px] w-full h-[76px] p-[14px] px-[24px] items-center'>
          {hasParams || rightButtons.length || backAction ? (
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
              onClick={() => {
                setIsSearching(true);
                setBackAction(() => {
                  setIsSearching(false);
                  setBackAction(null);
                });
              }}
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
          {hasParams || rightButtons.length || backAction ? (
            <div className='flex justify-end w-[24px]'></div>
          ) : (
            ''
          )}
        </div>
        {isSearching ? (
          <div className='w-full h-screen bg-gray-100 p-[24px] pb-[200px] fixed top-[76px] left-0 overflow-y-scroll'>
            <div className='flex flex-col justify-center items-center w-full gap-[14px]'>
              <SearchSection
                title='지역'
                isOpen={openedSearchSection === 'place'}
                onClick={() => setOpenedSearchSection('place')}
                value={placeKeyword}
              >
                <Input
                  label='어디로 갈까요?'
                  className='w-full h-[42px] text-md font-medium rounded-[10px]'
                  type='text'
                  value={placeKeyword}
                  onChange={(e) => setPlaceKeyword(e.target.value)}
                />
                <ul className='flex flex-col justify-start items-start w-full gap-[4px] h-[320px] overflow-y-scroll'>
                  {filteredPlaces.map(([place, count]) => (
                    <li
                      key={place}
                      className='min-h-[48px] flex justify-between items-center w-full px-[4px] cursor-pointer'
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlaceKeyword(place);
                        setOpenedSearchSection('price');
                      }}
                    >
                      <span className='text-sm text-gray-700 font-medium'>{place}</span>
                      <span className='text-xs text-gray-500'>{count}개의 체험</span>
                    </li>
                  ))}
                </ul>
              </SearchSection>
              <SearchSection
                title='가격 범위'
                isOpen={openedSearchSection === 'price'}
                onClick={() => setOpenedSearchSection('price')}
                value={`${selectedMinPrice.toLocaleString()}원 ~ ${selectedMaxPrice.toLocaleString()}원`}
              >
                <div className='flex justify-start items-end w-full h-[80px] gap-[2px] translate-y-[14px] px-[8px]'>
                  {Array(GAP_OF_PRICE)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className='w-full bg-primary-300 rounded-[2px]'
                        style={{
                          height: `${((prices.get(i) || 0) / Math.max(...Array.from(prices.values()), 1)) * 100}%`,
                        }}
                      />
                    ))}
                </div>
                <div className='relative w-full h-[4px]'>
                  <div className='relative w-[calc(100%-16px)] h-full m-auto bg-primary-100'>
                    <div
                      className='w-[24px] h-[24px] bg-primary-300 rounded-full absolute top-0 translate-x-[-50%] translate-y-[-50%]'
                      style={{
                        left: `${(((selectedMinPrice || minPrice) - minPrice) / (maxPrice - minPrice)) * 100}%`,
                      }}
                    />
                    <div
                      className='w-[24px] h-[24px] bg-primary-300 rounded-full absolute top-0 translate-x-[-50%] translate-y-[-50%]'
                      style={{
                        left: `${(((selectedMaxPrice || maxPrice) - minPrice) / (maxPrice - minPrice)) * 100}%`,
                      }}
                    />
                    <div
                      className='h-full absolute bg-primary-300'
                      style={{
                        width: `${(((selectedMaxPrice || maxPrice) - (selectedMinPrice || minPrice)) / (maxPrice - minPrice)) * 100}%`,
                        left: `${(((selectedMinPrice || minPrice) - minPrice) / (maxPrice - minPrice)) * 100}%`,
                      }}
                    />
                  </div>
                  <input
                    type='range'
                    min={minPrice}
                    max={maxPrice}
                    value={selectedMinPrice || minPrice}
                    className='w-full h-[4px] bg-gray-200 rounded-[2px] absolute top-0 left-0 slider-thumb'
                    onChange={(e) => {
                      setSelectedMinPrice(Number(e.target.value));
                    }}
                  />
                  <input
                    type='range'
                    min={minPrice}
                    max={maxPrice}
                    value={selectedMaxPrice || maxPrice}
                    className='w-full h-[4px] bg-gray-200 rounded-[2px] absolute top-0 left-0 slider-thumb'
                    onChange={(e) => {
                      setSelectedMaxPrice(Number(e.target.value));
                    }}
                  />
                </div>
                <div className='grid grid-cols-3 justify-between items-center w-full text-sm text-gray-500'>
                  <span className='text-left'>
                    {(selectedMinPrice || minPrice).toLocaleString()}원
                  </span>
                  <span className='text-center'>~</span>
                  <span className='text-right'>
                    {(selectedMaxPrice || maxPrice).toLocaleString()}원
                  </span>
                </div>
              </SearchSection>
              <BaseButton
                className='w-full h-[42px] text-md font-medium rounded-[10px]'
                onClick={() => {
                  setIsSearching(false);
                  setBackAction(null);
                  updateMultipleQueries({
                    'min-price': selectedMinPrice.toString() || params.minPrice || '',
                    'max-price': selectedMaxPrice.toString() || params.maxPrice || '',
                    address: placeKeyword || params.address || '',
                  });
                }}
              >
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
