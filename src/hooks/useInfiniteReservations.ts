import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';

import { fetchFromClient } from '../lib/fetch/fetchFromClient';
import { MyReservation, MyReservationStatus } from '../types/profile-reservation.types';

const PAGE_SIZE = 10;

interface MyReservationsResponse {
  cursorId: number;
  reservations: MyReservation[];
  totalCount: number;
}

// 예약 목록을 무한 스크롤 방식으로 가져오는 훅
export const useInfiniteReservations = (
  status: MyReservationStatus,
  options?: UseInfiniteQueryOptions<MyReservationsResponse, Error>
) => {
  return useInfiniteQuery<MyReservationsResponse>({
    queryKey: ['myReservations', status],

    queryFn: async ({ pageParam = 0 }) => {
      const query = new URLSearchParams();

      query.set('size', PAGE_SIZE.toString());
      status !== 'all' && query.set('status', status);
      pageParam && query.set('cursorId', pageParam.toString());
      // 무한스크롤이 반영될 페이지는 예액 내역 페이지 (reservations)
      // 서버 api 경로는 my-reservations로 클라이언트 api 경로명과 일치하지 않음
      // 구현 상의 문제는 없으나, 추후 클라이언트 api 경로명을 전면수정할 필요가 있어보임
      const res = await fetchFromClient(`/my-reservations?${query.toString()}`);
      if (!res.ok) throw new Error('예약 목록 조회 실패');
      return res.json();
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });
};
