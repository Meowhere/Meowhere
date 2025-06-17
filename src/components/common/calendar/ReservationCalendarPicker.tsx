'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import ArrowButton from '../buttons/ArrowButton';
import 'react-calendar/dist/Calendar.css';
import '@/src/styles/reservation-calendar-picker.css';
import { ko } from 'date-fns/locale';

interface ReservationCalendarProps {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
  availableDates: string[];
}

export default function ReservationCalendar({
  selectedDate,
  onChange,
  availableDates,
}: ReservationCalendarProps) {
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const isAvailable = (date: Date) => {
    const formatted = format(date, 'yyyy-MM-dd');
    return availableDates.includes(formatted);
  };

  const handlePrevMonth = () => {
    const newDate = new Date(activeStartDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setActiveStartDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(activeStartDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setActiveStartDate(newDate);
  };

  const handleDateChange = (value: any) => {
    // value가 Date 객체인지 확인하고 정규화
    if (value instanceof Date) {
      const normalizedDate = new Date(value.getFullYear(), value.getMonth(), value.getDate());
      onChange(normalizedDate);
    }
  };

  return (
    <div className='w-full reservation-calendar-picker'>
      <div className='relative flex items-center justify-center mb-4'>
        <div className='absolute left-0'>
          <ArrowButton onClick={handlePrevMonth} direction='left' size={24} />
        </div>
        <div className='text-xl font-semibold text-gray-900'>
          {format(activeStartDate, 'yyyy년 M월')}
        </div>
        <div className='absolute right-0'>
          <ArrowButton onClick={handleNextMonth} direction='right' size={24} />
        </div>
      </div>

      <Calendar
        locale='ko'
        calendarType='gregory'
        formatDay={(_, date) => String(date.getDate())}
        formatShortWeekday={(_, date) => format(date, 'eee', { locale: ko })}
        value={selectedDate}
        onChange={handleDateChange}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate!)}
        minDate={new Date()}
        showNavigation={false}
        tileDisabled={({ date }) => !isAvailable(date)}
      />
    </div>
  );
}
