import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import PlaceFilter from './PlaceFilter';
import PriceFilter from './PriceFilter';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { Activity } from '@/src/types/activity.types';
import { useURLQuery } from '@/src/hooks/useURLQuery';
import { useDebouncedValue } from '@/src/hooks/useDebouncedValue';
import { useSearchParams } from 'next/navigation';

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

  const [places, setPlaces] = useState<Map<string, number>>(new Map());
  const [prices, setPrices] = useState<Map<number, number>>(new Map());

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(0);
  const [selectedMinPrice, setSelectedMinPrice] = useState(0);

  const [openedSearchSection, setOpenedSearchSection] = useState<'place' | 'price'>('place');
  const [placeKeyword, setPlaceKeyword] = useState('');

  const debouncedPlaceKeyword = useDebouncedValue(placeKeyword, 150);
  const searchParams = useSearchParams();

  const { updateMultipleQueries } = useURLQuery();

  const filteredPlaces = useMemo(() => {
    if (!debouncedPlaceKeyword.trim()) {
      return Array.from(places.entries());
    }
    return Array.from(places.entries()).filter(([place, _]) =>
      place.includes(debouncedPlaceKeyword)
    );
  }, [debouncedPlaceKeyword, places]);

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
          minPrice={minPrice}
          maxPrice={maxPrice}
          GAP_OF_PRICE={GAP_OF_PRICE}
          prices={prices}
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
              'min-price': minPrice === selectedMinPrice ? '' : selectedMinPrice.toString(),
              'max-price': maxPrice === selectedMaxPrice ? '' : selectedMaxPrice.toString(),
              address: placeKeyword || '',
              keyword: keyword || '',
            });
          }}
        >
          검색
        </BaseButton>
      </div>
    </motion.div>
  );
}
