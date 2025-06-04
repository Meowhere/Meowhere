import React from 'react';
import { useModalStore } from '../store/modalStore';
import { ConfirmModalProps, ModalProps, ReviewModalProps } from '../types/modal.types';
import ReviewModal from '../components/common/modals/ReviewModal';
import ConfirmModal from '../components/common/modals/ConfirmModal';

export const useModal = () => {
  const { openModal, closeModal, isOpen } = useModalStore();

  const openReviewModal = (props: ReviewModalProps) => {
    openModal({
      header: '후기 작성',
      children: <ReviewModal {...props} />, // 프롭, 모달 자유롭게 수정 가능
    });
  };

  const openConfirmModal = (props: ConfirmModalProps) => {
    openModal({
      type: 'alert',
      children: <ConfirmModal {...props} />,
    });
  };

  const openBottomSheetModal = (props: Omit<ModalProps, 'type'>) => {
    openModal({
      ...props,
      type: 'bottomSheet',
    });
  };

  return {
    closeModal,
    isOpen,
    openConfirmModal,
    openReviewModal,
    openBottomSheetModal,
  };
};
