'use client';

import { useConfirmModal } from '@/src/hooks/useConfirmModal';
import BaseButton from '../buttons/BaseButton';
import { useEffect, useState } from 'react';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import MyReservationsModalCard from '@/src/app/profile/my-reservations/components/MyReservationsModalCard';
import Dropdown from '../dropdowns/Dropdown';
import { DropdownItemButton } from '@/src/types/dropdown-menu.types';

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
  const [reservationStatus, setReservationStatus] = useState<'pending' | 'declined' | 'confirmed'>(
    'pending'
  );
  const [reservedSchedules, setReservedSchedules] = useState<ReservedSchedule[]>([]);
  const [dropdownItems, setDropdownItems] = useState<DropdownItemButton[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<ReservedSchedule | null>(null);
  const [reservationsByTime, setReservationsByTime] = useState<Reservation[]>([]);
  const reservationStatusCategory = ['예약 신청', '예약 승인', '예약 거절'];

  const getReservedSchedule = async (reservationStatus: 'pending' | 'declined' | 'confirmed') => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-based month
    const day = String(date.getDate()).padStart(2, '0');
    const parsedDate = `${year}-${month}-${day}`;

    const res = await fetchFromClient(
      `/my-activities/${activityId}/reserved-schedule?date=${parsedDate}`
    );
    const json = await res.json();

    setReservedSchedules(json);

    if (!json.length) setSelectedSchedule(json[0]); // 첫 스케쥴을 기본으로 설정

    const dropdownItemsResult: DropdownItemButton[] = json.map((schedule: ReservedSchedule) => ({
      label: `${schedule.startTime} ~ ${schedule.endTime}`,
      onClick: () => {
        setSelectedSchedule(schedule);
        getReservationsByTime(schedule.scheduleId, reservationStatus);
      },
    }));
    setDropdownItems(dropdownItemsResult);
  };

  const getReservationsByTime = async (
    scheduleId: number,
    reservationStatus: 'pending' | 'declined' | 'confirmed'
  ) => {
    const res = await fetchFromClient(
      `/my-activities/${activityId}/reservations?scheduleId=${scheduleId}&status=${reservationStatus}`
    );
    const json = await res.json();
    setReservationsByTime(json.reservations);
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
    getReservedSchedule(reservationStatus);
  }, []);

  return (
    <div className='min-h-[400px]'>
      <section className='flex items-center gap-[6px] py-[12px]'>
        {reservationStatusCategory.map((status) => (
          <div
            className='py-[10px] px-[14px] border border-gray-200 rounded-[20px] text-gray-600 font-semibold text-[1.3rem] leading-[1.2rem]'
            key={status}
          >
            {status}
          </div>
        ))}
      </section>
      <section className='mt-[24px]'>
        <div>
          <p className='text-[22px] font-semibold text-gray-800'>{dateParsing(date)}</p>
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
            onDecline={handleDecline}
            onConfirm={handleConfirm}
          />
        ))}
      </section>
      <ConfirmModal />
    </div>
  );
}

function dateParsing(date: Date): string {
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}. ${month}. ${day}`;
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
