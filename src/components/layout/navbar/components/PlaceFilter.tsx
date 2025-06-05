import Input from '@/src/components/common/inputs/Input';
import FilterSection from './FilterSection';

export default function PlaceFilter({
  openedSearchSection,
  setOpenedSearchSection,
  placeKeyword,
  setPlaceKeyword,
  filteredPlaces,
}: {
  openedSearchSection: 'place' | 'price';
  setOpenedSearchSection: React.Dispatch<React.SetStateAction<'place' | 'price'>>;
  placeKeyword: string;
  setPlaceKeyword: React.Dispatch<React.SetStateAction<string>>;
  filteredPlaces: [string, number][];
}) {
  return (
    <FilterSection
      title='지역'
      isOpen={openedSearchSection === 'place'}
      onClick={() => setOpenedSearchSection('place')}
      value={placeKeyword}
    >
      <Input
        label='어디로 갈까요?'
        className='w-full h-[42px] text-md font-medium rounded-[10px]'
        type='text'
        value={placeKeyword}
        onChange={(e) => setPlaceKeyword(e.target.value)}
      />
      <ul className='flex flex-col justify-start items-start w-full gap-[4px] h-[320px] overflow-y-scroll'>
        {filteredPlaces.map(([place, count]) => (
          <li
            key={place}
            className='min-h-[48px] flex justify-between items-center w-full px-[4px] cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              setPlaceKeyword(place);
              setOpenedSearchSection('price');
            }}
          >
            <span className='text-sm text-gray-700 font-medium'>{place}</span>
            <span className='text-xs text-gray-500'>{count}개의 체험</span>
          </li>
        ))}
      </ul>
    </FilterSection>
  );
}
