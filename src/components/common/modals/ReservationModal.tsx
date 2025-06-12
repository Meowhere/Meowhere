'use client';

import { useConfirmModal } from '@/src/hooks/useConfirmModal';
import { useReservationModal } from '@/src/hooks/useReservationModal';
import { formatDateDot } from '@/src/utils/date-format';
import { MODAL_RESERVATION_STATUS_MAP } from '@/src/constants/reservation-modal';
import { ModalReservationStatus, ReservationModalProps } from '@/src/types/reservation-modal.types';

import Dropdown from '../dropdowns/Dropdown';
import MyReservationsModalCard from '@/src/app/profile/my-reservations/components/MyReservationsModalCard';

// 모달 열림 -> activityId, date를 이용해 시간대별로 예약 내역 배열 형태로 조회 -> 받아온 데이터에서 scheduleId를 이용하여 해당 시간대에 어떤 사람들이 예약을 했는지 조회
export default function ReservationModal({ activityId, date }: ReservationModalProps) {
  const { openConfirmModal, ConfirmModal } = useConfirmModal();
  const {
    reservationStatus,
    selectedSchedule,
    dropdownItems,
    reservationsByTime,
    handleReservationStatus,
    handleReservationUpdate,
  } = useReservationModal(activityId, date);

  const getReservationStatusText = (status: ModalReservationStatus): string => {
    return MODAL_RESERVATION_STATUS_MAP[status];
  };

  const handleDecline = (reservationId: number, status: 'confirmed' | 'declined'): void => {
    openConfirmModal({
      message: '예약을 거절할까요?',
      confirmText: '거절',
      cancelText: '아니요',
      onConfirm: () => {
        handleReservationUpdate(reservationId, status);
      },
    });
  };

  const handleConfirm = (reservationId: number, status: 'confirmed' | 'declined'): void => {
    openConfirmModal({
      message: '예약을 승인할까요?',
      confirmText: '승인',
      cancelText: '아니요',
      onConfirm: () => {
        handleReservationUpdate(reservationId, status);
      },
    });
  };

  return (
    <div className='min-h-[400px]'>
      <section className='flex items-center gap-[6px] py-[12px]'>
        {(Object.keys(MODAL_RESERVATION_STATUS_MAP) as ModalReservationStatus[]).map((status) => (
          <button
            className={`py-[10px] px-[14px] font-semibold text-[1.3rem] leading-[1.2rem] rounded-[20px] ${
              status === reservationStatus
                ? 'bg-primary-300 text-white'
                : 'border border-gray-200 text-gray-600'
            }`}
            onClick={() => handleReservationStatus(status)}
            key={status}
          >
            {getReservationStatusText(status)}
          </button>
        ))}
      </section>
      <section className='mt-[24px]'>
        <div>
          <p className='text-[22px] font-semibold text-gray-800'>{formatDateDot(date)}</p>
        </div>
        <div className='mt-[20px]'>
          <Dropdown
            dropdownItems={dropdownItems}
            triggerLabel='체험 시간'
            selectedValue={
              selectedSchedule
                ? `${selectedSchedule.startTime} ~ ${selectedSchedule.endTime}`
                : '시간을 선택해주세요'
            }
          />
        </div>
      </section>
      <section className='mt-[20px]'>
        {reservationsByTime.map((reservation, index) => (
          <MyReservationsModalCard
            key={reservation.id}
            reservationInfo={reservation}
            isLast={index === reservationsByTime.length - 1}
            onDecline={() => handleDecline(reservation.id, 'declined')}
            onConfirm={() => handleConfirm(reservation.id, 'confirmed')}
          />
        ))}
      </section>
      <ConfirmModal />
    </div>
  );
}
