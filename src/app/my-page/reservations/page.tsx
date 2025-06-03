'use client';

import Image from 'next/image';
import ReservationsCard from '../../profile/reservations/components/ReservationsCard';

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

  const hasData = testData.length > 0;

  return (
    <main className='bg-gray-50 min-h-screen flex flex-col items-center pt-[4.4rem]'>
      {hasData ? (
        <div className='w-full max-w-[600px] flex flex-col h-[calc(100vh-13.6rem)]'>
          {testData.map((item, idx) => (
            <ReservationsCard key={idx} {...item} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center h-[calc(100vh-13.6rem)]'>
          <Image
            src='/assets/icons/logo/ico-empty-view-logo.svg'
            alt='빈 상태 이미지'
            width={82}
            height={123}
          />
          <p className='text-md text-gray-500 mt-[2.4rem]'>예약한 체험이 없다냥</p>
        </div>
      )}
    </main>
  );
}
