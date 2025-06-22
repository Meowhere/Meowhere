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
      labelColor: 'text-gray-700',
      text: 'text-gray-700',
    },
    {
      label: '예약 완료',
      value: totalPending,
      labelColor: 'text-[#359807]',
      text: 'text-[#359807]',
    },
    {
      label: '예약 승인',
      value: totalConfirmed,
      labelColor: 'text-[#286CC0]',
      text: 'text-[#286CC0]',
    },
    {
      label: '체험 완료',
      value: totalCompleted,
      labelColor: 'text-[#6D3CA8]',
      text: 'text-[#6D3CA8]',
    },
  ];

  return (
    <div className='grid grid-cols-2 gap-[12px] md:grid-cols-4 mt-[20px]'>
      {summaryItems.map((item) => (
        <Card
          key={item.label}
          className='rounded-2xl border border-gray-100 bg-white p-[20px] space-y-[12px]'
        >
          <CardHeader className={`text-sm font-medium ${item.labelColor}`}>{item.label}</CardHeader>
          <CardContent>
            <div
              className={`inline-block px-[12px] py-[6px] rounded-lg text-8xl font-bold ${item.text}`}
            >
              {item.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
