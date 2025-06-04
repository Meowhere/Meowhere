import { useConfirmModal } from '@/src/hooks/useConfirmModal';
import BaseButton from '../buttons/BaseButton';

export default function ReservationModal() {
  const { openConfirmModal, ConfirmModal } = useConfirmModal();

  const handleDecline = (): void => {
    openConfirmModal({
      message: '예약을 거절할까요?',
      confirmText: '거절',
      cancelText: '아니요',
      onConfirm: () => {
        console.log('거절!');
      },
    });
  };

  const handleApprove = (): void => {
    openConfirmModal({
      message: '예약을 승인할까요?',
      confirmText: '승인',
      cancelText: '아니요',
      onConfirm: () => {
        console.log('승인!');
      },
    });
  };

  return (
    <div>
      <div className='flex gap-[8px]'>
        <BaseButton variant='soft' color='red' onClick={handleDecline}>
          거절
        </BaseButton>
        <BaseButton variant='soft' color='blue' onClick={handleApprove}>
          승인
        </BaseButton>
      </div>
      <ConfirmModal />
    </div>
  );
}
