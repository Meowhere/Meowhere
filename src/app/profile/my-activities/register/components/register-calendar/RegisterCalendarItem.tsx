import Image from 'next/image';
import { useState } from 'react';
import { CustomDatePicker, CustomTimePicker } from './DateTimePicker';

interface RegisterCalendarItemProps {
  onDelete: () => void;
}

export default function RegisterCalendarItem({ onDelete }: RegisterCalendarItemProps) {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  return (
    <div className='grid grid-cols-6 w-full items-center px-[18px] py-[12px] border border-gray-200 rounded-[10px]'>
      <div className='flex justify-end md:col-span-2'>
        <CustomDatePicker
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
        />
      </div>
      <div className='flex justify-center'>
        <p className='justify-center text-md font-regular text-gray-400'>|</p>
      </div>
      <div className='flex justify-start col-span-3 md:col-span-2 min-[128px] md:col-span-2 gap-[4px] sm:gap-[20px] lg:gap-[34px]'>
        <CustomTimePicker
          value={startTime}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value)}
        />
        <span className='text-md font-regular text-gray-400'>~</span>
        <CustomTimePicker
          value={endTime}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value)}
        />
      </div>
      <div className='flex justify-end'>
        <Image
          src='/assets/icons/delete/ico-delete-minus.svg'
          alt='delete-time'
          width={24}
          height={24}
          onClick={onDelete}
          className='cursor-pointer'
        />
      </div>
    </div>
  );
}
