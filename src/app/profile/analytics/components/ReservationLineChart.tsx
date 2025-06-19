'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { ReservationAnalyticsByMonth } from '@/src/types/analytics-by-month.types';

interface Props {
  data: ReservationAnalyticsByMonth[];
}

export default function ReservationLineChart({ data }: Props) {
  // 1. YYYY-MM 단위로 묶고 예약 수 합산
  const groupedData: Record<string, { pending: number; confirmed: number; completed: number }> = {};

  data.forEach((item) => {
    const month = item.date.slice(0, 7); // YYYY-MM

    if (!groupedData[month]) {
      groupedData[month] = { pending: 0, confirmed: 0, completed: 0 };
    }

    groupedData[month].pending += item.reservations.pending;
    groupedData[month].confirmed += item.reservations.confirmed;
    groupedData[month].completed += item.reservations.completed;
  });

  // 2. 배열로 변환 & 정렬
  const chartData = Object.entries(groupedData)
    .map(([date, values]) => ({ date, ...values }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // 3. Tooltip 한글 매핑
  const labelMap: Record<string, string> = {
    pending: '예약 완료',
    confirmed: '예약 승인',
    completed: '체험 완료',
  };

  return (
    <Card className='rounded-2xl shadow-sm mt-[24px]'>
      <CardHeader className='text-sm text-gray-500'>전체 예약 추이</CardHeader>
      <CardContent className='h-[280px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={chartData}>
            <XAxis dataKey='date' stroke='#B3A8A1' fontSize={12} />
            <YAxis stroke='#B3A8A1' fontSize={12} />
            <Tooltip
              formatter={(value, name) => [value, labelMap[name as string] || name]}
              labelFormatter={(label) => `${label}`}
            />
            <Line
              type='monotone'
              dataKey='pending'
              stroke='#27A00E'
              strokeWidth={2}
              dot={{ stroke: '#27A00E', fill: '#FFFFFF', r: 4 }}
            />
            <Line
              type='monotone'
              dataKey='confirmed'
              stroke='#0051FF'
              strokeWidth={2}
              dot={{ stroke: '#0051FF', fill: '#FFFFFF', r: 4 }}
            />
            <Line
              type='monotone'
              dataKey='completed'
              stroke='#8407C7'
              strokeWidth={2}
              dot={{ stroke: '#8407C7', fill: '#FFFFFF', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
