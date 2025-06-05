import React from 'react';
import { useModalStore } from '../store/modalStore';
import { ModalProps, CreateReviewModalProps } from '../types/modal.types';
import CreateReviewModal from '../components/common/modals/CreateReviewModal';
import AuthModal from '../components/common/modals/AuthModal';
import ReservationModal from '../components/common/modals/ReservationModal';

export const useModal = () => {
  const { openModal, closeModal } = useModalStore();

  const openAuthModal = () => {
    openModal({
      children: <AuthModal />,
    });
  };

  const openCreateReviewModal = (props: CreateReviewModalProps) => {
    openModal({
      header: '후기 작성',
      children: <CreateReviewModal {...props} />, // 프롭, 모달 자유롭게 수정 가능
    });
  };

  const openReviewModal = (props: any) => {
    // 임시 프롭
    openModal({
      header: '후기',
      children: <></>,
    });
  };

  const openScheduleModal = (props: any) => {
    // 임시 프롭
    openModal({
      header: '일정 선택',
      children: <></>,
    });
  };

  const openFavoritesModal = (props: any) => {
    // 임시 프롭
    openModal({
      header: '찜목록',
      children: <></>,
    });
  };

  const openAlarmModal = (props: any) => {
    // 임시 프롭
    openModal({
      header: '일정 선택',
      children: <></>,
    });
  };

  const openReservationModal = (props: any) => {
    // 임시 프롭
    openModal({
      header: '예약 정보',
      children: <ReservationModal {...props} />,
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
    openAuthModal,
    openCreateReviewModal,
    openScheduleModal,
    openAlarmModal,
    openReviewModal,
    openBottomSheetModal,
    openReservationModal,
  };
};
