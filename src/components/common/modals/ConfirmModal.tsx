import { useModalStore } from '@/src/store/modalStore';
import { ConfirmModalProps } from '@/src/types/modal.types';
import BaseButton from '../buttons/BaseButton';

export default function ConfirmModal({
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
}: ConfirmModalProps) {
  const { closeModal } = useModalStore();

  const handleConfirm = () => {
    // 확인 함수
    onConfirm();
    closeModal();
  };

  return (
    <div className='flex flex-col text-lg text-black'>
      <p className='text-center my-[28px]'>{message}</p>
      <div className='flex justify-center gap-[8px]'>
        <BaseButton variant='ghost' onClick={closeModal} className='h-[48px]'>
          {cancelText}
        </BaseButton>
        <BaseButton onClick={handleConfirm} className='h-[48px]'>
          {confirmText}
        </BaseButton>
      </div>
    </div>
  );
}
