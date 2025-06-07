import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import PlaceFilter from './PlaceFilter';
import PriceFilter from './PriceFilter';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useURLQuery } from '@/src/hooks/useURLQuery';
import { useDebouncedValue } from '@/src/hooks/useDebouncedValue';

export default function SearchFilters({
  setIsSearching,
  setBackAction,
  params,
  keyword,
}: {
  setIsSearching: (isSearching: boolean) => void;
  setBackAction: (action: (() => void) | null) => void;
  keyword: string;
  params: {
    address: string | null;
    keyword: string | null;
    minPrice: string | null;
    maxPrice: string | null;
  };
}) {
  const GAP_OF_PRICE = 30;

  const [selectedMaxPrice, setSelectedMaxPrice] = useState(0);
  const [selectedMinPrice, setSelectedMinPrice] = useState(0);

  const [openedSearchSection, setOpenedSearchSection] = useState<'place' | 'price'>('place');
  const [placeKeyword, setPlaceKeyword] = useState('');

  const debouncedPlaceKeyword = useDebouncedValue(placeKeyword, 150);

  const { updateMultipleQueries } = useURLQuery();

  const [globalStats, setGlobalStats] = useState<{
    places: [string, number][];
    prices: number[];
    priceRange: { min: number; max: number };
    totalCount: number;
  }>({
    places: [],
    prices: [],
    priceRange: { min: 0, max: 0 },
    totalCount: 0,
  });

  const filteredPlaces = useMemo(() => {
    if (!debouncedPlaceKeyword.trim()) {
      return globalStats.places;
    }
    return globalStats.places.filter(([place, _]) => place.includes(debouncedPlaceKeyword));
  }, [debouncedPlaceKeyword, globalStats.places]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchFromClient('/activities/statistics');
      const data = await response.json();
      setGlobalStats(data);
    };
    fetchData();
  }, []);

  return (
    <motion.div
      className=' z-20 w-full h-screen bg-gray-100 p-[24px] pb-[200px] fixed top-[76px] left-0 overflow-y-scroll'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: '-100vh' }}
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
          address={params.address}
        />
        <PriceFilter
          openedSearchSection={openedSearchSection}
          setOpenedSearchSection={setOpenedSearchSection}
          selectedMinPrice={selectedMinPrice}
          selectedMaxPrice={selectedMaxPrice}
          minPrice={globalStats.priceRange.min}
          maxPrice={globalStats.priceRange.max}
          GAP_OF_PRICE={GAP_OF_PRICE}
          prices={globalStats.prices}
          setSelectedMinPrice={setSelectedMinPrice}
          setSelectedMaxPrice={setSelectedMaxPrice}
          paramsMinPrice={Number(params.minPrice)}
          paramsMaxPrice={Number(params.maxPrice)}
        />
        <BaseButton
          className='w-full h-[42px] text-md font-medium rounded-[10px] mt-auto'
          onClick={() => {
            setIsSearching(false);
            setBackAction(null);
            updateMultipleQueries({
              'min-price':
                globalStats.priceRange.min === selectedMinPrice ? '' : selectedMinPrice.toString(),
              'max-price':
                globalStats.priceRange.max === selectedMaxPrice ? '' : selectedMaxPrice.toString(),
              address: placeKeyword || params.address || '',
              keyword: keyword || params.keyword || '',
            });
          }}
        >
          검색
        </BaseButton>
      </div>
    </motion.div>
  );
}
