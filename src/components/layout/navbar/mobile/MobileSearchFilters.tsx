'use client';

import { motion } from 'framer-motion';
import PlaceFilter from '../components/PlaceFilter';
import PriceFilter from '../components/PriceFilter';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useSearchFilters } from '@/src/hooks/useSearchFilters';

export default function MobileSearchFilters({ keyword }: { keyword: string }) {
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

  return (
    <motion.div
      className=' z-20 w-full h-[calc(100vh-76px)] bg-gray-100 dark:bg-gray-900 p-[24px] pb-[calc(76px+24px)] fixed top-[76px] left-0 overflow-y-scroll'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: '-100vh' }}
      key='mobile-search-filters'
      transition={{
        ease: [0, 1, 0, 1],
        duration: 0.5,
      }}
    >
      <div className='flex flex-col justify-between items-center w-full h-full gap-[14px]'>
        <PlaceFilter
          openedSearchSection={openedSearchSection}
          setOpenedSearchSection={setOpenedSearchSection}
          placeKeyword={placeKeyword}
          setPlaceKeyword={setPlaceKeyword}
          filteredPlaces={filteredPlaces}
        />
        <PriceFilter
          openedSearchSection={openedSearchSection}
          setOpenedSearchSection={setOpenedSearchSection}
          minPrice={globalStats.priceRange.min}
          maxPrice={globalStats.priceRange.max}
          GAP_OF_PRICE={GAP_OF_PRICE}
          prices={globalStats.prices}
          selectedMinPrice={selectedMinPrice}
          selectedMaxPrice={selectedMaxPrice}
          setSelectedMinPrice={setSelectedMinPrice}
          setSelectedMaxPrice={setSelectedMaxPrice}
        />
        <BaseButton
          className='w-full h-[42px] text-md font-medium rounded-[10px] mt-auto'
          onClick={handleSearch}
        >
          검색
        </BaseButton>
      </div>
    </motion.div>
  );
}
