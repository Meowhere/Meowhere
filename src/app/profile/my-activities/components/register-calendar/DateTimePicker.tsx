import { useRef, useState } from 'react';

interface CustomDatePickerProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: string;
}

interface CustomTimePickerProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: string;
}

function formatDate(dateStr: string) {
  if (!dateStr) return '연도. 월. 일.';
  const d = new Date(dateStr);
  return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, '0')}. ${String(d.getDate()).padStart(2, '0')}.`;
}

function formatTime(timeStr: string) {
  if (!timeStr) return '--:--';
  const [hour, min] = timeStr.split(':');
  const h = Number(hour);
  return `${h < 12 ? '오전' : '오후'} ${(((h - 1) % 12) + 1).toString().padStart(2, '0')}:${min}`;
}

export function CustomDatePicker({
  value,
  onChange,
  placeholder = '연도. 월. 일',
  min,
}: CustomDatePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='relative select-none' onClick={() => inputRef.current?.showPicker()}>
      <span className='text-md font-regular text-gray-800 dark:text-gray-200 pointer-events-none'>
        {formatDate(value)}
      </span>
      <input
        ref={inputRef}
        type='date'
        value={value}
        onChange={onChange}
        min={min}
        className='absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer'
      />
    </div>
  );
}

export function CustomTimePicker({
  value,
  onChange,
  placeholder = '-- --:--',
  min,
}: CustomTimePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='relative select-none' onClick={() => inputRef.current?.showPicker()}>
      <span className='text-md font-regular text-gray-800 dark:text-gray-200 pointer-events-none whitespace-nowrap'>
        {formatTime(value)}
      </span>
      <input
        ref={inputRef}
        type='time'
        value={value}
        onChange={onChange}
        min={min}
        className='absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer'
      />
    </div>
  );
}
