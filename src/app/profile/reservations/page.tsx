'use client';

import Image from 'next/image';
import ReservationsCard from './components/ReservationsCard';

export default function ReservationsTestPage() {
  // const testData: any[] = [];

  const testData = [
    {
      label: '예약 완료',
      imageUrl: '/assets/icons/test_img.png',
      title: '함께 배우면 즐거운 스트릿 댄스',
      date: '2023. 2. 14',
      time: '11:00 - 12:30',
      headCount: 10,
      price: 148000,
      showCancel: true,
    },
    {
      label: '예약 승인',
      imageUrl: '/assets/icons/test_img.png',
      title: '함께 배우면 즐거운 스트릿 댄스',
      date: '2023. 2. 14',
      time: '11:00 - 12:30',
      headCount: 10,
      price: 148000,
    },
    {
      label: '예약 취소',
      imageUrl: '/assets/icons/test_img.png',
      title: '함께 배우면 즐거운 스트릿 댄스',
      date: '2023. 2. 14',
      time: '11:00 - 12:30',
      headCount: 10,
      price: 148000,
    },
    {
      label: '예약 거절',
      imageUrl: '/assets/icons/test_img.png',
      title: '함께 배우면 즐거운 스트릿 댄스',
      date: '2023. 2. 14',
      time: '11:00 - 12:30',
      headCount: 10,
      price: 148000,
    },
    {
      label: '체험 완료',
      imageUrl: '/assets/icons/test_img.png',
      title: '함께 배우면 즐거운 스트릿 댄스',
      date: '2023. 2. 14',
      time: '11:00 - 12:30',
      headCount: 10,
      price: 148000,
      showReview: true,
    },
  ] as const;

  return (
    <main className='bg-gray-50 min-h-screen flex flex-col items-center pt-[4.4rem] lg:pt-[9.6rem]'>
      {/* 사이드바 추가 및 에러사항 없을 시에, 배경색 white로 */}
      <div className='w-full flex flex-col h-[calc(100vh-13.6rem)] lg:max-w-[72rem] lg:mx-auto lg:h-[113rem] lg:pt-[9.6rem]'>
        {testData.map((item, idx) => (
          <ReservationsCard key={idx} {...item} />
        ))}
      </div>
    </main>
  );
}
