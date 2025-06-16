import StarFillIcon from '@/src/components/common/icons/StarFillIcon';
import { RatingLabelProps } from '@/src/types/my-activities.types';

export default function RatingLabel({ rating }: RatingLabelProps) {
  return (
    <div className='flex items-center justify-center w-fit h-fit gap-[2px] px-[10px] rounded-full bg-yellow-100 dark:bg-yellow-900'>
      <StarFillIcon className='text-yellow-200' size={16} />
      <span className='text-md font-medium text-gray-800 dark:text-gray-200'>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
