'use client';

import { useModalStore } from '@/src/store/modalStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface TimeSlot {
  startTime: string;
  endTime: string;
  price: number;
}

interface DateSlot {
  date: Date;
  label?: string;
  times: TimeSlot[];
}

interface Props {
  schedule: DateSlot[];
  onSelect: (date: Date, timeSlot: TimeSlot) => void;
}

export default function DateSelectModal({ schedule, onSelect }: Props) {
  const { closeModal } = useModalStore();

  return (
    <div className='flex flex-col gap-6'>
      <div>
        <p className='text=[1.375rem] text-semibold text-gray-800'>인원</p>
        <div className='flex items-center justify-between mt-1'>
          <span>1명</span>
          <div className='flex gap-2 items-center text-xl font-bold'>
            <button className='px-2 py-0.5 rounded border'>-</button>
            <span>1</span>
            <button className='px-2 py-0.5 rounded border'>+</button>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <p className='text=[1.375rem] text-semibold text-gray-800'>체험 날짜</p>
        {schedule.map((slot) => (
          <div key={slot.date.toISOString()} className='flex flex-col gap-2'>
            <p className='text-sm font-semibold'>
              {format(slot.date, 'yy. MM. dd (EEE)', { locale: ko })}
              {slot.label ? ` (${slot.label})` : ''}
            </p>

            {slot.times.map((time, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelect(slot.date, time);
                  closeModal();
                }}
                className='w-full text-left rounded-xl border p-3 shadow-sm bg-white hover:bg-gray-50'
              >
                <p className='text-sm font-semibold'>
                  {time.startTime} ~ {time.endTime}
                </p>
                <p className='text-xs text-gray-500 mt-1'>{time.price.toLocaleString()}원 / 인</p>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
