'use client';

import { motion } from 'framer-motion';

import SearchIcon from '@/src/components/common/icons/SearchIcon';
import DesktopFilterSection from './DesktopFilterSection';
import { useSearchFilters } from '@/src/hooks/useSearchFilters';
import { useGnbStore } from '@/src/store/gnbStore';
import { useEffect, useRef, useState, useId } from 'react';
import { useSearchParams } from 'next/navigation';
import CloseIcon from '@/src/components/common/icons/DeleteIcon';
import { createPortal } from 'react-dom';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

export default function DesktopSearchFilters({ isForPage = false }: { isForPage?: boolean }) {
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [isGNBOnPage, setIsGNBOnPage] = useState(true);
  const componentId = useId();
  const { setIsSearching, isSearching } = useGnbStore();
  const { isDesktop } = useBreakpoint();
  const [isPageSearching, setIsPageSearching] = useState(true);
  const [pageOpenedSearchSection, setPageOpenedSearchSection] = useState<
    'place' | 'price' | 'keyword' | ''
  >('');

  const {
    selectedMaxPrice,
    setSelectedMaxPrice,
    selectedMinPrice,
    setSelectedMinPrice,
    openedSearchSection,
    setOpenedSearchSection,
    placeKeyword,
    setPlaceKeyword,
    filteredPlaces,
    globalStats,
    handleSearch,
    GAP_OF_PRICE,
  } = useSearchFilters(keyword);

  useEffect(() => {
    if (!isDesktop) return;
    setKeyword(searchParams.get('keyword') || '');
  }, [searchParams, isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;
    const handleScroll = () => {
      const scrollThreshold = 600; //페이지 내 SearchFilter 컴포넌트 y축 위치
      setIsGNBOnPage(window.scrollY < scrollThreshold);

      if (window.scrollY < scrollThreshold) {
        setIsSearching(false);
        setOpenedSearchSection('');
        setIsPageSearching(true);
      } else {
        setIsPageSearching(false);
        setPageOpenedSearchSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDesktop]);
  const inputRef = useRef({
    place: useRef<HTMLInputElement>(null),
    price: useRef<HTMLInputElement>(null),
    keyword: useRef<HTMLInputElement>(null),
  });

  useEffect(() => {
    if (!isDesktop) return;
    //페이지 스크롤 고려해서 해야함;
    if (isSearching && openedSearchSection) {
      if (openedSearchSection === 'price') return;

      const targetRef = inputRef.current[openedSearchSection];
      if (targetRef?.current) {
        // 약간의 딜레이 후 포커스 (애니메이션 고려)
        setTimeout(() => {
          targetRef.current?.focus({ preventScroll: true });
        }, 100);
      }
    }
    if (isPageSearching && pageOpenedSearchSection) {
      if (pageOpenedSearchSection === 'price') return;

      const targetRef = inputRef.current[pageOpenedSearchSection];
      if (targetRef?.current) {
        // 약간의 딜레이 후 포커스 (애니메이션 고려)
        setTimeout(() => {
          targetRef.current?.focus({ preventScroll: true });
        }, 100);
      }
    }
  }, [isSearching, openedSearchSection, isPageSearching, pageOpenedSearchSection, isDesktop]);

  return isForPage ? (
    <motion.div
      className='hidden left-1/2 -translate-x-1/2 -translate-y-1/2 w-[814px] h-[64px] absolute z-50 lg:grid grid-cols-3 bg-gray-200 rounded-full border border-gray-200 gnb-shadow'
      initial={{
        width: '814px',
        height: '64px',
      }}
      key='desktop-search-filters'
    >
      <SearchInput
        setIsSearching={setIsPageSearching}
        isSearching={isPageSearching}
        setOpenedSearchSection={setPageOpenedSearchSection}
        openedSearchSection={pageOpenedSearchSection}
        placeKeyword={placeKeyword}
        setPlaceKeyword={setPlaceKeyword}
        globalStats={globalStats}
        selectedMinPrice={selectedMinPrice}
        selectedMaxPrice={selectedMaxPrice}
        handleSearch={handleSearch}
        filteredPlaces={filteredPlaces}
        GAP_OF_PRICE={GAP_OF_PRICE}
        setSelectedMinPrice={setSelectedMinPrice}
        setSelectedMaxPrice={setSelectedMaxPrice}
        isForPage={isForPage}
        inputRef={isGNBOnPage ? inputRef.current : null}
        keyword={keyword}
        setKeyword={setKeyword}
        componentId={componentId}
      />
    </motion.div>
  ) : (
    <motion.div
      className='hidden left-1/2 -translate-x-1/2 w-[814px] h-[64px] absolute z-50 lg:grid grid-cols-3 bg-gray-200 rounded-full border border-gray-200 gnb-shadow'
      initial={{
        width: '814px',
        height: '64px',
        y: '-50%',
      }}
      key='desktop-search-filters'
      animate={{
        width: isSearching ? '814px' : '512px',
        height: isSearching ? '64px' : '48px',
        x: '-50%',
        y: isSearching ? '80%' : '-50%',
      }}
      transition={{
        ease: [0, 1, 0, 1],
        duration: 0.5,
      }}
    >
      <SearchInput
        isSearching={isSearching}
        setOpenedSearchSection={setOpenedSearchSection}
        openedSearchSection={openedSearchSection}
        placeKeyword={placeKeyword}
        setPlaceKeyword={setPlaceKeyword}
        globalStats={globalStats}
        selectedMinPrice={selectedMinPrice}
        selectedMaxPrice={selectedMaxPrice}
        handleSearch={handleSearch}
        filteredPlaces={filteredPlaces}
        GAP_OF_PRICE={GAP_OF_PRICE}
        setSelectedMinPrice={setSelectedMinPrice}
        setSelectedMaxPrice={setSelectedMaxPrice}
        isForPage={isForPage}
        setIsSearching={setIsSearching}
        inputRef={isGNBOnPage ? null : inputRef.current}
        keyword={keyword}
        setKeyword={setKeyword}
        componentId={componentId}
      />
    </motion.div>
  );
}

function SearchInput({
  isSearching,
  setOpenedSearchSection,
  placeKeyword,
  setPlaceKeyword,
  globalStats,
  selectedMinPrice,
  selectedMaxPrice,
  handleSearch,
  openedSearchSection,
  filteredPlaces,
  GAP_OF_PRICE,
  setSelectedMinPrice,
  setSelectedMaxPrice,
  isForPage,
  setIsSearching,
  inputRef,
  keyword,
  setKeyword,
  componentId,
}: {
  isSearching: boolean;
  setOpenedSearchSection: React.Dispatch<React.SetStateAction<'place' | 'price' | 'keyword' | ''>>;
  placeKeyword: string;
  setPlaceKeyword: React.Dispatch<React.SetStateAction<string>>;
  globalStats: {
    places: [string, number][];
    prices: number[];
    priceRange: { min: number; max: number };
    totalCount: number;
  };
  selectedMinPrice: number;
  selectedMaxPrice: number;
  handleSearch: () => void;
  openedSearchSection: 'place' | 'price' | 'keyword' | '';
  filteredPlaces: [string, number][];
  GAP_OF_PRICE: number;
  setSelectedMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  isForPage: boolean;
  setIsSearching: (isSearching: boolean) => void;
  inputRef: {
    place: React.RefObject<HTMLInputElement | null>;
    price: React.RefObject<HTMLInputElement | null>;
    keyword: React.RefObject<HTMLInputElement | null>;
  } | null;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  componentId: string;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearching(false);
        setOpenedSearchSection('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <DesktopFilterSection
        openedSearchSection={openedSearchSection}
        setOpenedSearchSection={setOpenedSearchSection}
        placeKeyword={placeKeyword}
        setPlaceKeyword={setPlaceKeyword}
        filteredPlaces={filteredPlaces}
        globalStats={globalStats}
        GAP_OF_PRICE={GAP_OF_PRICE}
        selectedMinPrice={selectedMinPrice}
        selectedMaxPrice={selectedMaxPrice}
        setSelectedMinPrice={setSelectedMinPrice}
        setSelectedMaxPrice={setSelectedMaxPrice}
      />
      {(isSearching || openedSearchSection) &&
        typeof window !== 'undefined' &&
        createPortal(
          <div
            className={`${!isForPage ? 'opacity-20' : 'opacity-0'} fixed top-0 left-0 w-screen h-screen z-[10] bg-black`}
            onClick={() => {
              setIsSearching(false);
              setOpenedSearchSection('');
            }}
          />,
          document.body
        )}
      <div className='absolute w-full h-full top-0 left-0 rounded-full overflow-hidden pointer-events-none'>
        <motion.div
          className='absolute z-[-1] top-0 w-1/3 h-full bg-white gnb-shadow rounded-full'
          initial={{ left: '0%', width: '100%' }}
          animate={{
            left:
              (openedSearchSection === 'place' && '0%') ||
              (openedSearchSection === 'price' && '33.33%') ||
              (openedSearchSection === 'keyword' && '66.66%') ||
              '0%',
            width: (openedSearchSection === '' && '100%') || '33.33%',
          }}
          transition={{
            ease: [0, 1, 0, 1],
            duration: 0.5,
          }}
        />
      </div>
      <div
        className={`${isSearching || isForPage ? 'px-[64px]' : 'px-[24px]'} relative cursor-pointer flex flex-col items-start justify-center rounded-full`}
        onClick={(e) => {
          if (!isSearching) {
            setOpenedSearchSection('place');
            if (!isForPage) {
              setIsSearching(true);
            }
            return;
          }
          e.stopPropagation();

          if (openedSearchSection === 'place') {
            setOpenedSearchSection('');
            if (!isForPage) {
              setIsSearching(false);
            }
          } else {
            setOpenedSearchSection('place');
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
            setIsSearching(false);
            setOpenedSearchSection('');
          }
        }}
      >
        {(isSearching || isForPage) && (
          <span className='text-gray-800 text-xs font-medium'>지역</span>
        )}
        <input
          type='text'
          id={`place-${componentId}`}
          className='text-gray-600 text-xs'
          placeholder='체험할 지역 검색'
          readOnly={!isSearching && !isForPage}
          value={placeKeyword}
          onChange={(e) => setPlaceKeyword(e.target.value)}
          autoComplete='off'
          ref={inputRef?.place}
        />
        {/* <div className='absolute bottom-[-8px] left-0 z-[60]'></div> */}
        {openedSearchSection === 'place' && (
          <CloseIcon
            size={18}
            className='absolute text-gray-500 right-[20px] top-1/2 -translate-y-1/2 cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              setPlaceKeyword('');
              setOpenedSearchSection('price');
            }}
          />
        )}
      </div>
      <div
        className={`${isSearching || isForPage ? 'px-[64px]' : 'px-[24px]'} relative cursor-pointer flex flex-col items-start justify-center rounded-full`}
        onClick={(e) => {
          if (!isSearching) {
            setOpenedSearchSection('price');
            if (!isForPage) {
              setIsSearching(true);
            }
            return;
          }
          e.stopPropagation();

          if (openedSearchSection === 'price') {
            setOpenedSearchSection('');
            if (!isForPage) {
              setIsSearching(false);
            }
          } else {
            setOpenedSearchSection('price');
          }
        }}
      >
        {(isSearching || isForPage) && (
          <span className='text-gray-800 text-xs font-medium'>가격</span>
        )}
        <span className='text-gray-600 text-xs'>
          {globalStats.priceRange.min === selectedMinPrice &&
          globalStats.priceRange.max === selectedMaxPrice
            ? '모든 가격'
            : `${selectedMinPrice.toLocaleString()}원 ~ ${selectedMaxPrice.toLocaleString()}원`}
        </span>
        <div className='absolute bottom-[-8px] left-0 z-[60]'></div>
        {openedSearchSection === 'price' && (
          <CloseIcon
            size={18}
            className='absolute right-[20px] text-gray-500 top-1/2 -translate-y-1/2 cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              setSelectedMinPrice(globalStats.priceRange.min);
              setSelectedMaxPrice(globalStats.priceRange.max);
              setOpenedSearchSection('keyword');
            }}
          />
        )}
      </div>
      <div
        className={`${isSearching || isForPage ? 'px-[64px]' : 'px-[24px]'} cursor-pointer flex flex-col items-start justify-center rounded-full`}
        onClick={(e) => {
          if (!isSearching) {
            setOpenedSearchSection('keyword');
            if (!isForPage) {
              setIsSearching(true);
            }
            return;
          }
          e.stopPropagation();

          if (openedSearchSection === 'keyword') {
            setOpenedSearchSection('');
            if (!isForPage) {
              setIsSearching(false);
            }
            return;
          } else {
            setOpenedSearchSection('keyword');
            if (!isForPage) {
              setIsSearching(true);
            }
          }
        }}
      >
        {(isSearching || isForPage) && (
          <span className='text-gray-800 text-xs font-medium'>검색어</span>
        )}
        <input
          type='text'
          id={`keyword-${componentId}`}
          className='text-gray-600 text-xs'
          placeholder='원하는 체험 검색'
          readOnly={!isSearching && !isForPage}
          ref={inputRef?.keyword}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
              setIsSearching(false);
              setOpenedSearchSection('');
            }
          }}
        />
        {keyword && openedSearchSection === 'keyword' && (
          <CloseIcon
            size={18}
            className='absolute right-[64px] text-gray-500 top-1/2 -translate-y-1/2 cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              setKeyword('');
            }}
          />
        )}
      </div>
      <button
        className='absolute right-[8px] flex items-center justify-center aspect-square top-[8px] h-[calc(100%-16px)] bg-primary-300 rounded-full'
        onClick={() => {
          handleSearch();
          setIsSearching(false);
          setOpenedSearchSection('');
        }}
      >
        <SearchIcon className='h-full aspect-square  text-white' />
      </button>
    </>
  );
}
