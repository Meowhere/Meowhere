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
import PrivacyPolicyModal from '../components/layout/navbar/components/PrivacyPolicyModal';
import BadgeDetailModalContent from '../components/common/badge/BadgeDetailModalContent';
import { BadgeLevel } from '../constants/badge.constans';
import { BADGE_LIST } from '../constants/badge.constans';

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

  const openPrivacyPolicyModal = (props: any) => {
    openModal({
      header: '개인정보 처리방침',
      children: <PrivacyPolicyModal {...props} />,
    });
  };

  const openBadgeDetailModal = (category: BadgeLevel, earnedAt?: string) => {
    const badge = BADGE_LIST.find((b) => b.category === category);
    if (!badge) return;

    openModal({
      header: badge.title,
      children: <BadgeDetailModalContent category={category} earnedAt={earnedAt} />,
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
    openPrivacyPolicyModal,
    openBadgeDetailModal,
  };
};
