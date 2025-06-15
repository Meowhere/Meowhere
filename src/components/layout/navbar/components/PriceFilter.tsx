import { useEffect } from 'react';
import FilterSection from './FilterSection';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

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
}: {
  openedSearchSection: 'place' | 'price' | 'keyword' | '';
  setOpenedSearchSection: React.Dispatch<React.SetStateAction<'place' | 'price' | 'keyword' | ''>>;
  selectedMinPrice: number;
  selectedMaxPrice: number;
  setSelectedMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  minPrice: number;
  maxPrice: number;
  GAP_OF_PRICE: number;
  prices: number[];
}) {
  const sliderThumbMin = ((selectedMinPrice - minPrice) / (maxPrice - minPrice)) * 100;
  const sliderThumbMax = ((selectedMaxPrice - minPrice) / (maxPrice - minPrice)) * 100;

  const searchParams = useSearchParams();
  const paramsMinPrice = Number(searchParams.get('min-price'));
  const paramsMaxPrice = Number(searchParams.get('max-price'));
  const { isDesktop } = useBreakpoint();

  useEffect(() => {
    if (selectedMinPrice === 0) setSelectedMinPrice(paramsMinPrice || minPrice); //최소 가격 슬라이더로 선택된 가격이 0이면 -> 파라미터의 가격으로 설정 || 없으면 최소 가격으로 설정
    if (selectedMaxPrice === 0) setSelectedMaxPrice(paramsMaxPrice || maxPrice); //최대 가격 슬라이더로 선택된 가격이 0이면 -> 파라미터의 가격으로 설정 || 없으면 최대 가격으로 설정
  }, [paramsMinPrice, paramsMaxPrice, selectedMinPrice, selectedMaxPrice, minPrice, maxPrice]);

  useEffect(() => {
    setSelectedMinPrice(paramsMinPrice || minPrice);
    setSelectedMaxPrice(paramsMaxPrice || maxPrice);
  }, [paramsMinPrice, paramsMaxPrice]);

  const maxCount = Math.max(...prices, 1);
  return (
    <FilterSection
      title='가격 범위'
      isOpen={isDesktop ? true : openedSearchSection === 'price'}
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
      className=' flex flex-col justify-start items-center gap-[16px]'
    >
      {/* 그래프 */}
      <div className='flex justify-start items-end w-full h-[80px] gap-[2px] translate-y-[14px] px-[8px]'>
        {Array(GAP_OF_PRICE)
          .fill(0)
          .map((_, i) => (
            <motion.div
              key={i}
              className={`w-full rounded-[2px] ${
                (selectedMinPrice <= (i + 1) * (maxPrice / GAP_OF_PRICE) ||
                  selectedMinPrice === minPrice) &&
                (selectedMaxPrice >= (i + 1) * (maxPrice / GAP_OF_PRICE) ||
                  selectedMaxPrice === maxPrice)
                  ? 'bg-primary-300'
                  : 'bg-gray-200'
              }`}
              initial={{ height: 0 }}
              animate={{
                height: `${openedSearchSection === 'price' ? (prices[i] / maxCount) * 100 : 0}%`,
              }}
              transition={{
                duration: 0.5 * (prices[i] / maxCount),
                ease: [0, 0.5, 0.5, 1],
              }}
            />
          ))}
      </div>

      {/* 슬라이더 */}
      <div className='relative w-full h-[4px]'>
        <div className='relative w-[calc(100%-16px)] h-full m-auto bg-gray-200'>
          <div
            className='w-[24px] h-[24px] bg-white shadow-xl z-10 border border-gray-200 rounded-full absolute top-0 translate-x-[-50%] translate-y-[-50%]'
            style={{
              left: `${sliderThumbMin}%`,
            }}
          />
          <div
            className='w-[24px] h-[24px] bg-white shadow-xl z-10 border border-gray-200 rounded-full absolute top-0 translate-x-[-50%] translate-y-[-50%]'
            style={{
              left: `${sliderThumbMax}%`,
            }}
          />
          <div
            className='h-full absolute bg-primary-300'
            style={{
              width: `${sliderThumbMax - sliderThumbMin}%`,
              left: `${sliderThumbMin}%`,
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
