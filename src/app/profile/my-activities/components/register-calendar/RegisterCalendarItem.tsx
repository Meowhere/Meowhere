import Image from 'next/image';
import { CustomDatePicker, CustomTimePicker } from './DateTimePicker';
import {
  getTodayDateStr,
  getMinEndTimeStr,
  getMinStartTime,
  normalizeEndTime,
} from '@/src/utils/my-activities-time';

interface RegisterCalendarItemProps {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  onDelete: () => void;
  onChange: (id: string, field: 'date' | 'startTime' | 'endTime', value: string) => void;
}

export default function RegisterCalendarItem({
  id,
  date,
  startTime,
  endTime,
  onDelete,
  onChange,
}: RegisterCalendarItemProps) {
  return (
    <div className='grid grid-cols-[2fr_auto_2fr_1fr] md:grid-cols-6 w-full items-center px-[18px] py-[12px] border border-gray-200 dark:border-gray-600 rounded-[10px]'>
      <div className='flex justify-center md:justify-end md:col-span-2'>
        <CustomDatePicker
          value={date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(id, 'date', e.target.value)
          }
          min={getTodayDateStr()}
        />
      </div>
      <div className='flex justify-center'>
        <p className='justify-center text-md font-regular text-gray-400 dark:text-gray-400'>|</p>
      </div>
      <div className='flex justify-center md:justify-start md:col-span-2 gap-[4px] sm:gap-[20px] lg:gap-[34px] min-w-[128px]'>
        <CustomTimePicker
          value={startTime}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(id, 'startTime', e.target.value)
          }
          min={getMinStartTime(date)}
        />
        <span className='text-md font-regular text-gray-400 dark:text-gray-400'>~</span>
        <CustomTimePicker
          value={endTime}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const rawEndTime = e.target.value;
            const normalized = normalizeEndTime(startTime, rawEndTime);
            onChange(id, 'endTime', normalized);
          }}
          min={getMinEndTimeStr(startTime)}
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
