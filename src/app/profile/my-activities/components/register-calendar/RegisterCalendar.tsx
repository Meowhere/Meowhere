'use client';
import { useState, useEffect } from 'react';
import RegisterCalendarItem from './RegisterCalendarItem';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import Sort from '../register-form/Sort';
import { CalendarItem } from '@/src/utils/my-activities-schedule';
import {
  covertSchedulesToCalendarItems,
  generateId,
  sortCalendarItems,
  hasOverlappingSchedules,
} from '@/src/utils/my-activities-schedule';
import { Schedule } from '@/src/types/activity.types';
import { useToastStore } from '@/src/store/toastStore';

interface RegisterCalendarProps {
  defaultSchedules?: Omit<Schedule, 'id'>[];
}

export default function RegisterCalendar({ defaultSchedules }: RegisterCalendarProps) {
  const { isDesktop } = useBreakpoint();
  const { showToast } = useToastStore();
  const [hasShownToast, setHasShownToast] = useState(false);

  const [items, setItems] = useState<CalendarItem[]>(
    defaultSchedules?.length
      ? covertSchedulesToCalendarItems(defaultSchedules)
      : [{ id: generateId(), date: '', startTime: '', endTime: '' }]
  );

  const [sortKey, setSortKey] = useState<'registered' | 'latest' | 'oldest'>('registered');

  const handleAddItem = () => {
    setItems((prev) => [...prev, { id: generateId(), date: '', startTime: '', endTime: '' }]);
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  // 하위 아이템의 값이 바뀔 때 업데이트
  const handleItemChange = (id: string, field: 'date' | 'startTime' | 'endTime', value: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const sortedItems = sortCalendarItems(items, sortKey);

  useEffect(() => {
    if (hasOverlappingSchedules(items)) {
      if (!hasShownToast) {
        showToast('error', '동일한 날짜에 시간대가 겹치는 일정이 있습니다.');
        setHasShownToast(true);
      }
    } else {
      // 중복 없으면 토스트 다시 띄울 수 있도록 초기화
      setHasShownToast(false);
    }
  }, [items, hasShownToast, showToast]);

  return (
    <div className='flex flex-col gap-[20px]'>
      {/* 계속 반응형으로 하려고 노력해봤는데 시간만 끌 것 같아서 그냥 이런식으로 작성했습니다. ㅜㅜ */}
      {isDesktop ? (
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center gap-[18px]'>
            <p className='text-xl font-semibold text-gray-800'>체험 일정</p>
            <Sort onSortChange={setSortKey} />
          </div>
          <div className='w-[176px]'>
            <BaseButton
              variant='soft'
              color='blue'
              className='py-[10px] text-md font-semibold'
              onClick={handleAddItem}
            >
              일정 추가
            </BaseButton>
          </div>
        </div>
      ) : (
        <div className='flex flex-row items-center justify-between'>
          <p className='text-xl font-semibold text-gray-800'>체험 일정</p>
          <Sort onSortChange={setSortKey} />
        </div>
      )}
      <div className='flex flex-col gap-[20px]'>
        {sortedItems.map((item) => (
          <RegisterCalendarItem
            key={item.id}
            id={item.id}
            date={item.date}
            startTime={item.startTime}
            endTime={item.endTime}
            onDelete={() => handleDeleteItem(item.id)}
            onChange={handleItemChange}
          />
        ))}
      </div>
      {!isDesktop && (
        <div className='flex justify-center'>
          <BaseButton
            variant='soft'
            color='blue'
            className='md:w-[500px] sm:w-full md:px-[175px] py-[10px] text-md font-semibold'
            onClick={handleAddItem}
          >
            일정 추가
          </BaseButton>
        </div>
      )}
    </div>
  );
}
