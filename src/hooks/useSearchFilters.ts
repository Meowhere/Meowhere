import { useURLQuery } from '@/src/hooks/useURLQuery';
import { useDebouncedValue } from '@/src/hooks/useDebouncedValue';
import { useGnbStore } from '@/src/store/gnbStore';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { useEffect, useMemo, useState } from 'react';

export function useSearchFilters(keyword?: string) {
  const GAP_OF_PRICE = 30;

  const { setBackAction, setIsSearching } = useGnbStore();

  const [selectedMaxPrice, setSelectedMaxPrice] = useState(0);
  const [selectedMinPrice, setSelectedMinPrice] = useState(0);

  const [openedSearchSection, setOpenedSearchSection] = useState<
    'place' | 'price' | 'keyword' | ''
  >('');
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

  const handleSearch = () => {
    setIsSearching(false);
    setBackAction(null);
    updateMultipleQueries({
      'min-price':
        globalStats.priceRange.min === selectedMinPrice ? '' : selectedMinPrice.toString(),
      'max-price':
        globalStats.priceRange.max === selectedMaxPrice ? '' : selectedMaxPrice.toString(),
      address: placeKeyword || '',
      keyword: keyword || '',
    });
  };

  return {
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
  };
}
