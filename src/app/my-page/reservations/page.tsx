'use client';

import Image from 'next/image';
import ReservationsCard from '../reservations/components/ReservationsCard';

export default function ReservationsTestPage() {
  const testData: any[] = [];

  const hasData = testData.length > 0;

  return (
    <main className='bg-gray-50 min-h-screen flex flex-col items-center justify-center px-[2rem] py-[2.4rem]'>
      {hasData ? (
        <div className='w-full max-w-[600px] flex flex-col gap-[2rem]'>
          {testData.map((item, idx) => (
            <ReservationsCard
              key={idx}
              {...item}
              onCancel={() => alert('예약 취소 클릭')}
              onReview={() => alert('후기 쓰기 클릭')}
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center'>
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
