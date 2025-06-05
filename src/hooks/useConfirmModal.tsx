import { useState } from 'react';
import ConfirmModal from '../components/common/modals/ConfirmModal';
import { ConfirmModalState, OpenConfirmModalOptions } from '../types/confirm.types';

export const useConfirmModal = () => {
  const [modalState, setModalState] = useState<ConfirmModalState>({
    isOpen: false,
    isClosing: false,
    title: '확인',
    message: '',
    confirmText: '확인',
    cancelText: '취소',
    onConfirm: null,
  });

  const openConfirmModal = ({
    title = '확인',
    message,
    confirmText = '확인',
    cancelText = '취소',
    onConfirm,
  }: OpenConfirmModalOptions) => {
    setModalState({
      isOpen: true,
      isClosing: false,
      title,
      message,
      confirmText,
      cancelText,
      onConfirm,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isClosing: true }));
    setTimeout(() => {
      setModalState((prev) => ({ ...prev, isOpen: false, isClosing: false }));
    }, 300);
  };

  const handleConfirm = () => {
    if (modalState.onConfirm) {
      modalState.onConfirm();
    }
    closeModal();
  };

  const ConfirmModalComponent = () => (
    <ConfirmModal
      isOpen={modalState.isOpen}
      isClosing={modalState.isClosing}
      onClose={closeModal}
      onConfirm={handleConfirm}
      title={modalState.title}
      message={modalState.message}
      confirmText={modalState.confirmText}
      cancelText={modalState.cancelText}
    />
  );

  return {
    openConfirmModal,
    ConfirmModal: ConfirmModalComponent,
  };
};
