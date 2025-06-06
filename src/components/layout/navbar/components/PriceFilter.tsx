import { useEffect } from 'react';
import FilterSection from './FilterSection';

export default function PriceFilter({
  openedSearchSection,
  setOpenedSearchSection,
  selectedMinPrice,
  selectedMaxPrice,
  minPrice,
  maxPrice,
  GAP_OF_PRICE,
  prices,
  setSelectedMinPrice,
  setSelectedMaxPrice,
  paramsMinPrice,
  paramsMaxPrice,
}: {
  openedSearchSection: 'place' | 'price';
  setOpenedSearchSection: React.Dispatch<React.SetStateAction<'place' | 'price'>>;
  selectedMinPrice: number;
  selectedMaxPrice: number;
  setSelectedMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  minPrice: number;
  maxPrice: number;
  GAP_OF_PRICE: number;
  prices: Map<number, number>;
  paramsMinPrice: number;
  paramsMaxPrice: number;
}) {
  useEffect(() => {
    if (selectedMinPrice === 0) setSelectedMinPrice(paramsMinPrice || minPrice);
    if (selectedMaxPrice === 0) setSelectedMaxPrice(paramsMaxPrice || maxPrice);
  }, [paramsMinPrice, paramsMaxPrice, selectedMinPrice, selectedMaxPrice, minPrice, maxPrice]);

  return (
    <FilterSection
      title='가격 범위'
      isOpen={openedSearchSection === 'price'}
      onClick={() => setOpenedSearchSection('price')}
      value={
        minPrice === selectedMinPrice && maxPrice === selectedMaxPrice
          ? '모든 가격'
          : `${selectedMinPrice.toLocaleString()}원 ~ ${selectedMaxPrice.toLocaleString()}원`
      }
      handleReset={() => {
        setSelectedMinPrice(minPrice);
        setSelectedMaxPrice(maxPrice);
        setOpenedSearchSection('place');
      }}
    >
      {/* 그래프 */}
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

      {/* 슬라이더 */}
      <div className='relative w-full h-[4px]'>
        <div className='relative w-[calc(100%-16px)] h-full m-auto bg-primary-100'>
          <div
            className='w-[24px] h-[24px] bg-white shadow-xl z-10 border border-gray-200 rounded-full absolute top-0 translate-x-[-50%] translate-y-[-50%]'
            style={{
              left: `${((selectedMinPrice - minPrice) / (maxPrice - minPrice)) * 100}%`,
            }}
          />
          <div
            className='w-[24px] h-[24px] bg-white shadow-xl z-10 border border-gray-200 rounded-full absolute top-0 translate-x-[-50%] translate-y-[-50%]'
            style={{
              left: `${((selectedMaxPrice - minPrice) / (maxPrice - minPrice)) * 100}%`,
            }}
          />
          <div
            className='h-full absolute bg-primary-300'
            style={{
              width: `${((selectedMaxPrice - selectedMinPrice) / (maxPrice - minPrice)) * 100}%`,
              left: `${((selectedMinPrice - minPrice) / (maxPrice - minPrice)) * 100}%`,
            }}
          />
        </div>
        <input
          type='range'
          min={minPrice}
          max={maxPrice}
          value={selectedMinPrice}
          className='w-full h-[4px] bg-gray-200 rounded-[2px] absolute top-0 left-0 slider-thumb z-20'
          onChange={(e) => {
            Number(e.target.value) < selectedMaxPrice &&
              setSelectedMinPrice(Number(e.target.value));
          }}
        />
        <input
          type='range'
          min={minPrice}
          max={maxPrice}
          value={selectedMaxPrice}
          className='w-full h-[4px] bg-gray-200 rounded-[2px] absolute top-0 left-0 slider-thumb z-20'
          onChange={(e) => {
            Number(e.target.value) > selectedMinPrice &&
              setSelectedMaxPrice(Number(e.target.value));
          }}
        />
      </div>

      {/* 가격 범위 */}
      <div className='grid grid-cols-3 justify-between items-center w-full text-sm text-gray-500'>
        <span className='text-left'>{selectedMinPrice.toLocaleString()}원</span>
        <span className='text-center'>~</span>
        <span className='text-right'>{selectedMaxPrice.toLocaleString()}원</span>
      </div>
    </FilterSection>
  );
}
