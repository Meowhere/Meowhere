import { motion, useScroll, useTransform } from 'framer-motion';
import ArrowIcon from '../../common/icons/ArrowIcon';
import SearchIcon from '../../common/icons/SearchIcon';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import { useGnbStore } from '@/src/store/gnbStore';
import { useQueryUpdate } from '@/src/hooks/useQueryUpdate';
import { categories } from './Category';

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
  const { backAction, title, subtitle, rightButtons } = useGnbStore();
  const pathname = usePathname();

  const params = {
    keyword: searchParams.get('keyword'),
    minPrice: searchParams.get('min-price'),
    maxPrice: searchParams.get('max-price'),
    address: searchParams.get('address'),
  };

  const hasParams = Object.values(params).some((value) => value !== null && value.trim() !== '');

  if (pathname === '/') {
    return (
      <nav className='fixed top-0 left-0 w-full border-b border-gray-200 bg-white'>
        <div className='flex justify-center gap-[24px] w-full h-[76px] p-[14px] px-[24px] items-center'>
          {hasParams || rightButtons.length ? (
            <div className='flex justify-start'>
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

          <div className='flex justify-center flex-1 max-w-[500px] h-[48px]'>
            <button className='w-full h-full bg-white border border-gray-200 text-gray-800 rounded-full text-sm flex items-center justify-center gap-2 shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)]'>
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
      </nav>
    );
  } else {
    return (
      <nav className='fixed top-0 left-0 w-full border-b border-gray-200 bg-white text-xs'>
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
