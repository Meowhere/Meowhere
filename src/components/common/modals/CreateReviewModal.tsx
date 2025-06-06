import { useState } from 'react';
import { useModalStore } from '@/src/store/modalStore';
import { CreateReviewModalProps } from '@/src/types/modal.types';
import BaseButton from '../buttons/BaseButton';
import StarFillIcon from '@/src/components/common/icons/StarFillIcon';
import StarIcon from '@/src/components/common/icons/StarIcon';
// import Textarea from '../inputs/Textarea';

export default function CreateReviewModal({
  title,
  schedule,
  headCount,
  price,
  rating = 0,
  onConfirm,
}: CreateReviewModalProps) {
  const { closeModal } = useModalStore();
  // schedule 포맷 필요
  const [currentRating, setCurrentRating] = useState(rating);
  const [content, setContent] = useState('');

  const handleConfirm = () => {
    if (currentRating === 0 || content.trim() === '') {
      alert('별점과 후기를 모두 입력해주세요!');
      return;
    }

    onConfirm();
    closeModal();
  };

  const formatDate = (isoDate: string) => {
    const [year, month, day] = isoDate.split('-');
    return `${Number(year)}. ${Number(month)}. ${Number(day)}`;
  };

  return (
    <div className='flex flex-col flex-grow mt-[38px]'>
      <h3 className='text-lg font-bold text-gray-900 text-center mb-[6px]'>{title}</h3>

      <div className='w-[220px] mx-auto text-center text-[1.3rem] font-regular text-gray-500 mb-[32px] border-t border-t-[rgba(17,34,17,0.1)]'>
        <div className='flex justify-center mt-[6px] gap-[16px]'>
          <span>{`${formatDate(schedule.date)}`}</span>
          <span>{`${schedule.startTime} - ${schedule.endTime}`}</span>
        </div>
        <div className='flex justify-center mt-[6px] gap-[13px]'>
          <span>{`${headCount}명`}</span>
          <span>{`₩${price.toLocaleString()}`}</span>
        </div>
      </div>

      <div className='flex justify-center gap-[4px] mb-[32px]'>
        {[1, 2, 3, 4, 5].map((i) =>
          i <= currentRating ? (
            <StarFillIcon
              key={i}
              onClick={() => setCurrentRating(i)}
              className='w-[33px] h-[30px] cursor-pointer text-yellow-200'
            />
          ) : (
            <StarIcon
              key={i}
              onClick={() => setCurrentRating(i)}
              className='w-[33px] h-[30px] cursor-pointer text-gray-400'
            />
          )
        )}
      </div>

      {/* Textarea 수정 이후 반영 예정 */}
      <textarea
        placeholder='후기를 작성해주세요'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className='w-full h-[143px] px-[20px] py-[12px] text-md font-regular text-gray-900 bg-white border border-red-500 rounded-[10px] resize-none'
      />

      <div className='flex flex-col gap-[8px] pt-[32px]'>
        <BaseButton onClick={handleConfirm} className='h-[48px] text-md'>
          작성하기
        </BaseButton>
        <BaseButton variant='outline' onClick={closeModal} className='h-[48px] text-md'>
          취소하기
        </BaseButton>
      </div>
    </div>
  );
}
