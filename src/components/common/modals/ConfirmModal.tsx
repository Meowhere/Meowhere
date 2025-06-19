import BaseButton from '../buttons/BaseButton';
import clsx from 'clsx';
import { ConfirmModalProps } from '@/src/types/confirm.types';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { useUIStore } from '@/src/store/uiStore';

export default function ConfirmModal({
  isOpen,
  isClosing,
  onClose,
  onConfirm,
  message,
  confirmText = '확인',
  cancelText = '취소',
}: ConfirmModalProps) {
  const { setPreventBodyScroll } = useUIStore();

  if (!isOpen) return null;

  // 백그라운드 클릭시 모달 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    setPreventBodyScroll(isOpen);

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const modalContent = (
    <div
      className={clsx(
        'fixed inset-0 z-[102] flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm',
        'dark:bg-black/70',
        isClosing ? 'animate-out fade-out-0 duration-300' : 'animate-in fade-in-0 duration-300'
      )}
      onClick={handleBackdropClick}
      role='presentation'
    >
      <div
        className={clsx(
          'relative mx-[16px] w-[260px] rounded-[12px] bg-white dark:bg-gray-800 p-[12px] shadow-lg focus:outline-none',
          isClosing
            ? 'animate-out fade-out-0 zoom-out-95 duration-300'
            : 'animate-in fade-in-0 zoom-in-95 duration-300'
        )}
        onClick={(e) => e.stopPropagation()}
        data-modal
      >
        <div className='flex flex-col text-lg text-black dark:text-gray-200'>
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
