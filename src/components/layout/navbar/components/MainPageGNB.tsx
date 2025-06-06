import React, { useEffect, useState } from 'react';
import { useGnbStore } from '@/src/store/gnbStore';
import { useSearchParams } from 'next/navigation';
import ArrowIcon from '@/src/components/common/icons/ArrowIcon';
import { motion } from 'framer-motion';

import SearchFilters from './SearchFilters';
import SearchButton from './SearchButton';
import CategorySection from './CategorySection';
import { AnimatePresence } from 'framer-motion';
import { useURLQuery } from '@/src/hooks/useURLQuery';
import { useUIStore } from '@/src/store/uiStore';

export default function MainPageGNB() {
  const { backAction, rightButtons, isSearching, setIsSearching, setBackAction } = useGnbStore();
  const [keyword, setKeyword] = useState('');

  const { resetQueries } = useURLQuery();

  const searchParams = useSearchParams();
  const { setPreventBodyScroll } = useUIStore();

  const params = {
    keyword: searchParams.get('keyword'),
    minPrice: searchParams.get('min-price'),
    maxPrice: searchParams.get('max-price'),
    address: searchParams.get('address'),
  };

  const hasParams = Object.values(params).some((value) => value !== null && value.trim() !== '');

  useEffect(() => {
    if (isSearching) setPreventBodyScroll(true);
    else setPreventBodyScroll(false);
  }, [isSearching]);

  return (
    <nav className='fixed top-0 left-0 w-full border-b border-gray-200 bg-white z-30'>
      {/* GNB 상단 */}
      <div className='relative bg-white flex justify-center gap-[24px] w-full h-[76px] p-[14px] px-[24px] items-center z-40'>
        {/* 왼쪽 (뒤로가기 버튼) */}
        {hasParams || rightButtons.length || backAction ? (
          <div className='flex justify-start'>
            <ArrowIcon
              direction='left'
              size={24}
              onClick={backAction || resetQueries}
              aria-label='뒤로가기'
              className='cursor-pointer'
            />
          </div>
        ) : (
          ''
        )}

        {/* 중앙 (검색 버튼) */}
        <AnimatePresence>
          <motion.div
            className='flex justify-center flex-1 max-w-[500px] h-[48px]'
            layout
            transition={{ duration: 0.5, ease: [0, 1, 0, 1] }}
          >
            <SearchButton
              hasParams={hasParams}
              params={params}
              setIsSearching={setIsSearching}
              setBackAction={setBackAction}
              isSearching={isSearching}
              setKeyword={setKeyword}
              keyword={keyword}
            />
          </motion.div>
        </AnimatePresence>

        {/* 오른쪽 (버튼들) */}
        {hasParams || rightButtons.length || backAction ? (
          <div className='flex justify-end w-[24px]' />
        ) : (
          ''
        )}
      </div>

      {/* GNB 하단 */}
      <div className='relative z-10'>
        <AnimatePresence>
          {isSearching ? (
            <SearchFilters
              setIsSearching={setIsSearching}
              setBackAction={setBackAction}
              params={params}
              keyword={keyword}
              key='search'
            />
          ) : (
            <CategorySection key='category' />
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
