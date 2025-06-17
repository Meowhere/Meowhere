import FilterSection from './FilterSection';
import { useURLQuery } from '@/src/hooks/useURLQuery';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

export default function PlaceFilter({
  openedSearchSection,
  setOpenedSearchSection,
  placeKeyword,
  setPlaceKeyword,
  filteredPlaces,
  className,
  ...rest
}: {
  openedSearchSection: 'place' | 'price' | 'keyword' | '';
  setOpenedSearchSection: React.Dispatch<React.SetStateAction<'place' | 'price' | 'keyword' | ''>>;
  placeKeyword: string;
  setPlaceKeyword: React.Dispatch<React.SetStateAction<string>>;
  filteredPlaces: [string, number][];
  className?: string;
}) {
  const { removeQuery } = useURLQuery();
  const searchParams = useSearchParams();
  const address = searchParams.get('address');
  const { isDesktop } = useBreakpoint();

  useEffect(() => {
    if (address) setPlaceKeyword(address);
  }, [address]);

  return (
    <FilterSection
      title='지역'
      isOpen={isDesktop ? true : openedSearchSection === 'place'}
      onClick={() => setOpenedSearchSection('place')}
      value={placeKeyword}
      handleReset={() => {
        removeQuery('address');
        setPlaceKeyword('');
        setOpenedSearchSection('price');
      }}
      className={`h-full ${className}`}
      {...rest}
    >
      <div className='flex w-full h-[72px] relative items-center px-[20px] py-[6px] rounded-2xl border bg-white dark:bg-gray-800'>
        <label
          htmlFor='place-keyword'
          className='top-[6px] absolute w-full text-xs font-regular text-gray-500 dark:text-gray-400'
        >
          어디로 갈까요?
          <input
            className='lg:hidden w-full h-[28px] text-md font-regular rounded-[10px] focus:outline-none text-gray-800 dark:text-gray-200'
            type='text'
            value={placeKeyword}
            onChange={(e) => setPlaceKeyword(e.target.value)}
          />
        </label>
      </div>
      <ul className='flex flex-col justify-start items-start w-full gap-[4px] h-full overflow-y-scroll'>
        {filteredPlaces.map(([place, count]) => (
          <li
            key={place}
            className='min-h-[48px] flex justify-between items-center w-full px-[4px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-[8px]'
            onClick={(e) => {
              e.stopPropagation();
              setPlaceKeyword(place);
              setOpenedSearchSection('price');
            }}
          >
            <span className='text-sm text-gray-700 dark:text-gray-300 font-medium'>{place}</span>
            <span className='text-xs text-gray-500 dark:text-gray-400'>{count}개의 체험</span>
          </li>
        ))}
      </ul>
    </FilterSection>
  );
}
