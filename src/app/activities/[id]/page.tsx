'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import ExperienceImageViewer from '../../activities/[id]/components/experience/ExperienceImageViewer';
import ExperienceSummarySection from '../../activities/[id]/components/experience/ExperienceSummarySection';
import Divider from './components/common/Divider';
import SectionTitle from './components/common/SectionTitle';
import ExperienceLocationMap from './components/experience/ExperienceLocationMap';
import ReservationBox from './components/resevation/ReservationBox';

export default function ExperienceDetailPage() {
  const { id } = useParams();

  // 예약 상태 정의
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [count, setCount] = useState(1);

  // 더미 데이터
  const pricePerPerson = 23000;
  const availableTimes = ['오후 2:00 ~ 오후 3:30', '오후 4:00 ~ 오후 5:30'];

  // 예약 시 실행될 함수 (임시 콘솔)
  const handleReserve = () => {
    console.log('예약 정보:', { date, time, count });
  };

  return (
    <main className='min-h-screen'>
      <div className='max-w-4xl mx-auto px-4'>
        <ExperienceImageViewer />
        <ExperienceSummarySection />
        <Divider />
      </div>
      <div className='max-w-4xl mx-auto px-4'>
        <SectionTitle title='만나는 곳' subtitle='서울 중구 청계천로 100 10F' />
        {/* <ExperienceLocationMap address={'서울 중구 청계천로 100 10F'} /> */}
        <Divider />
      </div>
      <div className='max-w-4xl mx-auto px-4'>
        <SectionTitle title='체험 설명' />
        <Divider />
      </div>
      <div className='max-w-4xl mx-auto px-4'>
        <SectionTitle title='후기' />
      </div>

      <ReservationBox
        state={{ date, time, count }}
        onDateChange={setDate}
        onTimeChange={setTime}
        onCountChange={setCount}
        onReserve={handleReserve}
        availableTimes={availableTimes}
        pricePerPerson={pricePerPerson}
      />
    </main>
  );
}
