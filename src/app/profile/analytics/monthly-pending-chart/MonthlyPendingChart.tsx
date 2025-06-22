'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface MonthlyPendingChartProps {
  data: {
    title: string;
    pending: number;
    confirmed: number;
    completed: number;
  }[];
}

export default function MonthlyPendingChart({ data }: MonthlyPendingChartProps) {
  const [labelLength, setLabelLength] = useState(6);

  useEffect(() => {
    const updateLabelLength = () => {
      setLabelLength(window.innerWidth < 640 ? 4 : 8);
    };
    updateLabelLength();
    window.addEventListener('resize', updateLabelLength);
    return () => window.removeEventListener('resize', updateLabelLength);
  }, []);

  return (
    <div className='w-full h-[300px]'>
      {data.length === 0 ? (
        <p className='text-sm text-gray-400'>예약 신청이 있는 체험이 아직 없어요.</p>
      ) : (
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data}>
            <XAxis
              dataKey='title'
              tickFormatter={(value: string) =>
                value.length > labelLength ? `${value.slice(0, labelLength)}...` : value
              }
              tick={{
                fontSize: 12,
                dy: 10, // 막대 하단으로 내리기
                textAnchor: 'middle',
              }}
              tickLine={false}
              interval={0}
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend
              wrapperStyle={{ bottom: '-24px' }} // x축과 간격 조정
            />
            <Bar dataKey='pending' stackId='a' fill='#74E11C' name='예약 완료' />
            <Bar dataKey='confirmed' stackId='a' fill='#45A4FE' name='예약 승인' />
            <Bar dataKey='completed' stackId='a' fill='#851FFF' name='체험 완료' />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
