'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ReservationAnalyticsByMonth } from '@/src/types/analytics-by-month.types';

interface SummaryCardsProps {
  data: ReservationAnalyticsByMonth[];
}

export default function SummaryCards({ data }: SummaryCardsProps) {
  const totalPending = data.reduce((sum, item) => sum + item.reservations.pending, 0);
  const totalConfirmed = data.reduce((sum, item) => sum + item.reservations.confirmed, 0);
  const totalCompleted = data.reduce((sum, item) => sum + item.reservations.completed, 0);
  const totalAll = totalPending + totalConfirmed + totalCompleted;

  const summaryItems = [
    {
      label: '총 예약 수',
      value: totalAll,
      labelColor: 'text-black',
      text: 'text-black',
    },
    {
      label: '예약 완료',
      value: totalPending,
      labelColor: 'text-green-200',
      text: 'text-green-200',
    },
    {
      label: '예약 승인',
      value: totalConfirmed,
      labelColor: 'text-blue-200',
      text: 'text-blue-200',
    },
    {
      label: '체험 완료',
      value: totalCompleted,
      labelColor: 'text-purple-200',
      text: 'text-purple-200',
    },
  ];

  return (
    <div className='grid grid-cols-2 gap-[12px] md:grid-cols-4 mt-[20px]'>
      {summaryItems.map((item) => (
        <Card
          key={item.label}
          className='rounded-2xl border border-gray-100 bg-white p-[20px] shadow-sm space-y-[12px]'
        >
          <CardHeader className={`text-sm font-medium ${item.labelColor}`}>{item.label}</CardHeader>
          <CardContent>
            <div
              className={`inline-block px-[12px] py-[6px] rounded-lg text-2xl font-bold text-black ${item.text}`}
            >
              {item.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
