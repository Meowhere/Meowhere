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
}: {
  openedSearchSection: 'place' | 'price';
  setOpenedSearchSection: React.Dispatch<React.SetStateAction<'place' | 'price'>>;
  selectedMinPrice: number;
  selectedMaxPrice: number;
  minPrice: number;
  maxPrice: number;
  GAP_OF_PRICE: number;
  prices: Map<number, number>;
  setSelectedMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMaxPrice: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <FilterSection
      title='가격 범위'
      isOpen={openedSearchSection === 'price'}
      onClick={() => setOpenedSearchSection('price')}
      value={`${selectedMinPrice.toLocaleString()}원 ~ ${selectedMaxPrice.toLocaleString()}원`}
    >
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
      <div className='relative w-full h-[4px]'>
        <div className='relative w-[calc(100%-16px)] h-full m-auto bg-primary-100'>
          <div
            className='w-[24px] h-[24px] bg-primary-300 rounded-full absolute top-0 translate-x-[-50%] translate-y-[-50%]'
            style={{
              left: `${(((selectedMinPrice || minPrice) - minPrice) / (maxPrice - minPrice)) * 100}%`,
            }}
          />
          <div
            className='w-[24px] h-[24px] bg-primary-300 rounded-full absolute top-0 translate-x-[-50%] translate-y-[-50%]'
            style={{
              left: `${(((selectedMaxPrice || maxPrice) - minPrice) / (maxPrice - minPrice)) * 100}%`,
            }}
          />
          <div
            className='h-full absolute bg-primary-300'
            style={{
              width: `${(((selectedMaxPrice || maxPrice) - (selectedMinPrice || minPrice)) / (maxPrice - minPrice)) * 100}%`,
              left: `${(((selectedMinPrice || minPrice) - minPrice) / (maxPrice - minPrice)) * 100}%`,
            }}
          />
        </div>
        <input
          type='range'
          min={minPrice}
          max={maxPrice}
          value={selectedMinPrice || minPrice}
          className='w-full h-[4px] bg-gray-200 rounded-[2px] absolute top-0 left-0 slider-thumb'
          onChange={(e) => {
            setSelectedMinPrice(Number(e.target.value));
          }}
        />
        <input
          type='range'
          min={minPrice}
          max={maxPrice}
          value={selectedMaxPrice || maxPrice}
          className='w-full h-[4px] bg-gray-200 rounded-[2px] absolute top-0 left-0 slider-thumb'
          onChange={(e) => {
            setSelectedMaxPrice(Number(e.target.value));
          }}
        />
      </div>
      <div className='grid grid-cols-3 justify-between items-center w-full text-sm text-gray-500'>
        <span className='text-left'>{(selectedMinPrice || minPrice).toLocaleString()}원</span>
        <span className='text-center'>~</span>
        <span className='text-right'>{(selectedMaxPrice || maxPrice).toLocaleString()}원</span>
      </div>
    </FilterSection>
  );
}
