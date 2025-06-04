import BaseButton from '../buttons/BaseButton';
import clsx from 'clsx';
import { ConfirmModalProps } from '@/src/types/confirm.types';
import ReactDOM from 'react-dom';

export default function ConfirmModal({
  isOpen,
  isClosing,
  onClose,
  onConfirm,
  message,
  confirmText = '확인',
  cancelText = '취소',
}: ConfirmModalProps) {
  if (!isOpen) return null;

  // 백그라운드 클릭시 모달 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const modalContent = (
    <div
      className={clsx(
        'fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm',
        isClosing ? 'animate-out fade-out-0 duration-300' : 'animate-in fade-in-0 duration-300'
      )}
      onClick={handleBackdropClick}
      role='presentation'
    >
      <div
        className={clsx(
          'relative mx-[16px] w-[260px] rounded-[12px] bg-white p-[12px] shadow-lg focus:outline-none',
          isClosing
            ? 'animate-out fade-out-0 zoom-out-95 duration-300'
            : 'animate-in fade-in-0 zoom-in-95 duration-300'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex flex-col text-lg text-black'>
          <p className='text-center my-[28px]'>{message}</p>
          <div className='flex justify-center gap-[8px]'>
            <BaseButton variant='ghost' onClick={onClose} className='h-[48px]'>
              {cancelText}
            </BaseButton>
            <BaseButton onClick={handleConfirm} className='h-[48px]'>
              {confirmText}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
