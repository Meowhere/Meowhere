import { useModalStore } from '@/src/store/modalStore';
import { ReviewModalProps } from '@/src/types/modal.types';
import BaseButton from '../buttons/BaseButton';

export default function ReviewModal({
  title,
  schedule,
  headCount,
  price,
  rating,
  onConfirm,
}: ReviewModalProps) {
  const { closeModal } = useModalStore();
  // schedule 포맷 필요

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <div className='flex flex-col flex-grow gap-2 text-md'>
      {/*임시 데이터*/}
      <div className='flex-grow justify-center '>
        <p className=' text-center'>{title}</p>
        <p className='text-center'>{price}</p>
        <p className='text-center'>{rating}</p>
      </div>
      <BaseButton onClick={handleConfirm} className='h-[48px]'>
        작성하기
      </BaseButton>
      <BaseButton variant='outline' onClick={closeModal} className='h-[48px]'>
        아니요
      </BaseButton>
    </div>
  );
}
