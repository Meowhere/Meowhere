'use client';

import { useConfirmModal } from '@/src/hooks/useConfirmModal';
import BaseButton from '../buttons/BaseButton';
import { useEffect, useState } from 'react';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import MyReservationsModalCard from '@/src/app/profile/my-reservations/components/MyReservationsModalCard';

interface ReservationModalProps {
  activityId: number;
  date: Date;
}

interface ReservedScheduleByDay {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

// 모달 열림 -> activityId, date를 이용해 시간대별로 예약 내역 배열 형태로 조회 -> 받아온 데이터에서 scheduleId를 이용하여 해당 시간대에 어떤 사람들이 예약을 했는지 조회
export default function ReservationModal({ activityId, date }: ReservationModalProps) {
  const { openConfirmModal, ConfirmModal } = useConfirmModal();
  const [reservedSchedules, setReservedSchedules] = useState<ReservedSchedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<ReservedSchedule>({
    scheduleId: 17489,
    startTime: '13:00',
    endTime: '17:00',
    count: {
      confirmed: 0,
      declined: 0,
      pending: 1,
    },
  });
  const [reservationsByTime, setReservationsByTime] = useState<Reservation[]>([]);
  const reservationStatusCategory = ['예약 신청', '예약 승인', '예약 거절'];

  const getReservedSchedule = async () => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-based month
    const day = String(date.getDate()).padStart(2, '0');
    const parsedDate = `${year}-${month}-${day}`;
    const res = await fetchFromClient(
      `/my-activities/${activityId}/reserved-schedule?date=${parsedDate}`
    );
    const json = await res.json();
    setReservedSchedules(json);
  };

  const getReservationsByTime = async (reservationStatus: 'pending' | 'declined' | 'confirmed') => {
    const res = await fetchFromClient(
      `/my-activities/${activityId}/reservations?scheduleId=${selectedSchedule.scheduleId}&status=${reservationStatus}`
    );
    const json = await res.json();
    setReservationsByTime(json.reservations);
    console.log(json.reservations);
  };

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

  const handleConfirm = (): void => {
    openConfirmModal({
      message: '예약을 승인할까요?',
      confirmText: '승인',
      cancelText: '아니요',
      onConfirm: () => {
        console.log('승인!');
      },
    });
  };

  useEffect(() => {
    getReservedSchedule();
    getReservationsByTime('pending');
  }, []);

  return (
    <div>
      <section className='flex items-center gap-[6px]'>
        {reservationStatusCategory.map((status) => (
          <div
            className='py-[10px] px-[14px] border border-gray-200 rounded-[20px] text-gray-600 font-semibold text-[1.3rem] leading-[1.2rem]'
            key={status}
          >
            {status}
          </div>
        ))}
      </section>
      <section>
        <div>
          <p className='text-[22px] font-semibold text-gray-800'>{date.toLocaleDateString()}</p>
        </div>
        <div>
          <div>드롭다운</div>
        </div>
      </section>
      <section>
        {reservationsByTime.map((reservation) => (
          <MyReservationsModalCard
            key={reservation.id}
            reservationInfo={reservation}
            onDecline={handleDecline}
            onConfirm={handleConfirm}
          />
        ))}
      </section>
      <ConfirmModal />
    </div>
  );
}

interface ReservedSchedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

interface Reservation {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}
