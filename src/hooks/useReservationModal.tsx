import { useEffect, useState } from 'react';
import { DropdownItemButton } from '../types/dropdown-menu.types';
import { fetchFromClient } from '../lib/fetch/fetchFromClient';

export type ModalReservationStatus = 'pending' | 'declined' | 'confirmed';

export const MODAL_RESERVATION_STATUS_MAP: Record<ModalReservationStatus, string> = {
  pending: '예약 신청',
  confirmed: '예약 승인',
  declined: '예약 거절',
};

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

export function useReservationModal(activityId: number, date: Date) {
  const [reservationStatus, setReservationStatus] = useState<ModalReservationStatus>('pending');
  const [selectedSchedule, setSelectedSchedule] = useState<ReservedSchedule | null>(null);
  const [reservationsByTime, setReservationsByTime] = useState<Reservation[]>([]);
  const [dropdownItems, setDropdownItems] = useState<DropdownItemButton[]>([]);

  // 특정 체험에 대한 해당 날짜의 스케쥴 불러오는 함수(첫 번째 스케쥴을 기본 값으로 설정)
  const getReservedSchedules = async (
    activityId: number,
    reservationStatus: ModalReservationStatus
  ) => {
    // 날짜 파싱
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-based month
    const day = String(date.getDate()).padStart(2, '0');
    const parsedDate = `${year}-${month}-${day}`;

    // 요청
    const res = await fetchFromClient(
      `/my-activities/${activityId}/reserved-schedule?date=${parsedDate}`
    );
    const json: ReservedSchedule[] = await res.json();

    if (!json.length) return; // 스케쥴 배열의 길이가 0이면 더이상 동작할 필요 없음

    setSelectedSchedule(json[0]); // 첫 스케쥴을 기본으로 설정
    getReservationsByTime(json[0].scheduleId, reservationStatus); // 첫 스케쥴에 대한 예약 목록 데이터 페칭

    // 드롭다운 형식에 맞도록 설정
    const dropdownItemsResult: DropdownItemButton[] = json.map((schedule: ReservedSchedule) => ({
      label: `${schedule.startTime} ~ ${schedule.endTime}`,
      onClick: () => {
        setSelectedSchedule(schedule);
        getReservationsByTime(schedule.scheduleId, reservationStatus);
      },
    }));
    setDropdownItems(dropdownItemsResult);
  };

  // 특정 스케쥴에 대해 선택한 예약 상태에 대한 예약 목록을 불러오는 함수
  const getReservationsByTime = async (
    scheduleId: number,
    reservationStatus: ModalReservationStatus
  ) => {
    const res = await fetchFromClient(
      `/my-activities/${activityId}/reservations?scheduleId=${scheduleId}&status=${reservationStatus}`
    );
    const json = await res.json();
    setReservationsByTime(json.reservations);
  };

  // 예약 상태 종류 버튼을 클릭했을 때 실행되는 함수
  const handleReservationStatus = (activityId: number, status: ModalReservationStatus) => {
    setReservationStatus(status);
    getReservedSchedules(activityId, status);
  };

  const handleReservationUpdate = async (
    activityId: number,
    reservationId: number,
    status: 'confirmed' | 'declined'
  ) => {
    await fetchFromClient(`/my-activities/${activityId}/reservations/${reservationId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  };

  useEffect(() => {
    getReservedSchedules(activityId, reservationStatus);
  }, []);

  return {
    reservationStatus,
    selectedSchedule,
    dropdownItems,
    reservationsByTime,
    handleReservationStatus,
    handleReservationUpdate,
    getReservationsByTime,
  };
}
