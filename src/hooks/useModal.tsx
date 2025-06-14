import React from 'react';
import { useModalStore } from '../store/modalStore';
import { ModalProps, CreateReviewModalProps } from '../types/modal.types';
import CreateReviewModal from '../components/common/modals/CreateReviewModal';
import AuthModal from '../components/common/modals/AuthModal';
import ReservationModal from '../components/common/modals/ReservationModal';
import ReviewListModal from '../app/activities/[id]/components/review/ReviewListModal';
import { ReviewListModalProps } from '../app/activities/[id]/components/review/ReviewListModal';
import ScheduleModal from '../app/activities/[id]/components/reservation/ScheduleModal';
import { ScheduleModalProps } from '../app/activities/[id]/components/reservation/ScheduleModal';
import NotificationModal from '../app/_components/NotificationModal';

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

  const openReviewListModal = (props: ReviewListModalProps) => {
    openModal({
      header: '후기',
      children: <ReviewListModal {...props} />,
      height: 'full',
    });
  };

  const openScheduleModal = (props: ScheduleModalProps) => {
    openModal({
      header: '일정 선택',
      children: <ScheduleModal {...props} />,
      height: 'full',
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

  const openNotificationModal = (props: any) => {
    openModal({
      header: '알림',
      children: <NotificationModal {...props} />,
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
    openReviewListModal,
    openBottomSheetModal,
    openReservationModal,
    openNotificationModal,
  };
};
