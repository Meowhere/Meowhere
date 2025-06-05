import React from 'react';
import { useGnbStore } from '@/src/store/gnbStore';
import { useSearchParams } from 'next/navigation';
import ArrowIcon from '@/src/components/common/icons/ArrowIcon';

import SearchFilters from './SearchFilters';
import SearchButton from './SearchButton';
import CategorySection from './CategorySection';

export default function MainPageGNB() {
  const { backAction, rightButtons, isSearching, setIsSearching, setBackAction } = useGnbStore();

  const searchParams = useSearchParams();

  const params = {
    keyword: searchParams.get('keyword'),
    minPrice: searchParams.get('min-price'),
    maxPrice: searchParams.get('max-price'),
    address: searchParams.get('address'),
  };

  const hasParams = Object.values(params).some((value) => value !== null && value.trim() !== '');

  return (
    <nav className='fixed top-0 left-0 w-full border-b border-gray-200 bg-white z-30'>
      {/* GNB 상단 */}
      <div className='flex justify-center gap-[24px] w-full h-[76px] p-[14px] px-[24px] items-center'>
        {/* 왼쪽 (뒤로가기 버튼) */}
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

        {/* 중앙 (검색 버튼) */}
        <div className='flex justify-center flex-1 max-w-[500px] h-[48px]'>
          <SearchButton
            hasParams={hasParams}
            params={params}
            setIsSearching={setIsSearching}
            setBackAction={setBackAction}
          />
        </div>

        {/* 오른쪽 (버튼들) */}
        {hasParams || rightButtons.length || backAction ? (
          <div className='flex justify-end w-[24px]' />
        ) : (
          ''
        )}
      </div>

      {/* GNB 하단 */}
      {isSearching ? (
        <SearchFilters
          setIsSearching={setIsSearching}
          setBackAction={setBackAction}
          params={params}
        />
      ) : (
        <CategorySection />
      )}
    </nav>
  );
}
