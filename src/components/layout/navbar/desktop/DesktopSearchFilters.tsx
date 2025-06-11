'use client';

import { motion } from 'framer-motion';

import SearchIcon from '@/src/components/common/icons/SearchIcon';
import DesktopFilterSection from './DesktopFilterSection';
import { useSearchFilters } from '@/src/hooks/useSearchFilters';
import { useGnbStore } from '@/src/store/gnbStore';

export default function DesktopSearchFilters({ isForPage = false }: { isForPage?: boolean }) {
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
  } = useSearchFilters();
  const { setIsSearching, isSearching } = useGnbStore();

  return isForPage ? (
    <motion.div
      className='hidden left-1/2 -translate-x-1/2 -translate-y-1/2 w-[814px] h-[64px] absolute z-50 lg:grid grid-cols-3 bg-white rounded-full border border-gray-200 gnb-shadow'
      initial={{
        width: '814px',
        height: '64px',
      }}
      key='desktop-search-filters'
    >
      <SearchInput
        isSearching={isSearching}
        setOpenedSearchSection={setOpenedSearchSection}
        placeKeyword={placeKeyword}
        setPlaceKeyword={setPlaceKeyword}
        globalStats={globalStats}
        selectedMinPrice={selectedMinPrice}
        selectedMaxPrice={selectedMaxPrice}
        handleSearch={handleSearch}
        openedSearchSection={openedSearchSection}
        filteredPlaces={filteredPlaces}
        GAP_OF_PRICE={GAP_OF_PRICE}
        setSelectedMinPrice={setSelectedMinPrice}
        setSelectedMaxPrice={setSelectedMaxPrice}
        isForPage={isForPage}
        setIsSearching={setIsSearching}
      />
    </motion.div>
  ) : (
    <motion.div
      className='hidden left-1/2 -translate-x-1/2 -translate-y-1/2 w-[814px] h-[64px] absolute z-50 lg:grid grid-cols-3 bg-white rounded-full border border-gray-200 gnb-shadow'
      initial={{
        width: '814px',
        height: '64px',
      }}
      key='desktop-search-filters'
      animate={{
        width: isSearching ? '814px' : '512px',
        height: isSearching ? '64px' : '48px',
        x: '-50%',
        y: isSearching ? '80px' : '0',
      }}
      onClick={() => {
        setIsSearching(!isSearching);
        !isSearching ? setOpenedSearchSection('place') : setOpenedSearchSection('');
        console.log(isSearching);
      }}
      transition={{
        ease: [0, 1, 0, 1],
        duration: 0.5,
      }}
    >
      <SearchInput
        isSearching={isSearching}
        setOpenedSearchSection={setOpenedSearchSection}
        placeKeyword={placeKeyword}
        setPlaceKeyword={setPlaceKeyword}
        globalStats={globalStats}
        selectedMinPrice={selectedMinPrice}
        selectedMaxPrice={selectedMaxPrice}
        handleSearch={handleSearch}
        openedSearchSection={openedSearchSection}
        filteredPlaces={filteredPlaces}
        GAP_OF_PRICE={GAP_OF_PRICE}
        setSelectedMinPrice={setSelectedMinPrice}
        setSelectedMaxPrice={setSelectedMaxPrice}
        isForPage={isForPage}
        setIsSearching={setIsSearching}
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
}: {
  isSearching: boolean;
  setOpenedSearchSection: React.Dispatch<React.SetStateAction<'place' | 'price' | ''>>;
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
  openedSearchSection: 'place' | 'price' | '';
  filteredPlaces: [string, number][];
  GAP_OF_PRICE: number;
  setSelectedMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  isForPage: boolean;
  setIsSearching: (isSearching: boolean) => void;
}) {
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
      <div
        className={`${isSearching || isForPage ? 'px-[64px]' : ''} relative cursor-pointer flex flex-col items-start justify-center rounded-full bg-gray-100`}
        onClick={(e) => {
          if (!isSearching && !isForPage) return;
          e.stopPropagation();

          if (openedSearchSection === 'place') {
            setOpenedSearchSection('');
            setIsSearching(false);
          } else {
            setOpenedSearchSection('place');
          }
        }}
      >
        {(isSearching || isForPage) && <span>지역</span>}
        <input
          type='text'
          id='search-input'
          className=''
          placeholder='체험할 지역 검색'
          value={placeKeyword}
          onChange={(e) => setPlaceKeyword(e.target.value)}
        />
        <div className='absolute bottom-[-8px] left-0 z-[60]'></div>
      </div>
      <div
        className={`${isSearching || isForPage ? 'px-[64px]' : ''} relative cursor-pointer flex flex-col items-start justify-center rounded-full bg-gray-100`}
        onClick={(e) => {
          if (!isSearching && !isForPage) return;
          e.stopPropagation();

          if (openedSearchSection === 'price') {
            setOpenedSearchSection('');
            setIsSearching(false);
          } else {
            setOpenedSearchSection('price');
          }
        }}
      >
        {(isSearching || isForPage) && <span>가격</span>}
        <span>
          {globalStats.priceRange.min === selectedMinPrice &&
          globalStats.priceRange.max === selectedMaxPrice
            ? '모든 가격'
            : `${selectedMinPrice.toLocaleString()}원 ~ ${selectedMaxPrice.toLocaleString()}원`}
        </span>
        <div className='absolute bottom-[-8px] left-0 z-[60]'></div>
      </div>
      <div
        className={`${isSearching || isForPage ? 'px-[64px]' : ''} cursor-pointer flex flex-col items-start justify-center rounded-full bg-gray-100`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {(isSearching || isForPage) && <span>검색어</span>}
        <input
          type='text'
          id='search-input'
          className=''
          placeholder='원하는 체험 검색'
          // value={keyword}
          // onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <button
        className='absolute right-[8px] flex items-center justify-center aspect-square top-[8px] h-[calc(100%-16px)] bg-primary-300 rounded-full'
        onClick={handleSearch}
      >
        <SearchIcon className='h-full aspect-square  text-white' />
      </button>
    </>
  );
}
