import { motion } from 'framer-motion';
import PlaceFilter from '../components/PlaceFilter';
import PriceFilter from '../components/PriceFilter';

export default function DesktopFilterSection({
  openedSearchSection,
  setOpenedSearchSection,
  placeKeyword,
  setPlaceKeyword,
  filteredPlaces,
  globalStats,
  GAP_OF_PRICE,
  selectedMinPrice,
  selectedMaxPrice,
  setSelectedMinPrice,
  setSelectedMaxPrice,
}: any) {
  // TODO: 수정하기

  return (
    <motion.div
      className='absolute w-[512px] origin-center overflow-hidden rounded-[40px] top-[72px] gnb-shadow bg-white dark:bg-gray-800'
      data-filter-section
      initial={{ x: '-50%', width: '0px', height: '0px' }}
      animate={{
        x:
          openedSearchSection == 'place'
            ? 0
            : openedSearchSection == 'price'
              ? 270 + 270 / 2 - 256
              : '',
        height:
          openedSearchSection == 'place' ? '' : openedSearchSection == 'price' ? '216px' : '0px',
        width: openedSearchSection == '' || openedSearchSection == 'keyword' ? '0px' : '',
      }}
      transition={{
        duration: 0.5,
        ease: [0, 1, 0, 1],
      }}
    >
      <motion.div
        className='flex p-[16px]'
        animate={{ x: openedSearchSection == 'place' ? 0 : -480 }}
        transition={{
          duration: 0.5,
          ease: [0, 1, 0, 1],
        }}
      >
        <div className='min-w-[480px]'>
          <PlaceFilter
            openedSearchSection={openedSearchSection}
            setOpenedSearchSection={setOpenedSearchSection}
            placeKeyword={placeKeyword}
            setPlaceKeyword={setPlaceKeyword}
            filteredPlaces={filteredPlaces}
          />
        </div>
        <div className='min-w-[480px] h-fit'>
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
        </div>
      </motion.div>
    </motion.div>
  );
}
