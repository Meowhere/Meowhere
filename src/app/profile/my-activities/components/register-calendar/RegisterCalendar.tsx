'use client';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import RegisterCalendarItem from './RegisterCalendarItem';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import Sort from '../register-form/Sort';
import {
  CalendarItem,
  convertSchedulesToCalendarItems,
  generateId,
  sortCalendarItems,
  hasOverlappingSchedules,
  isValidSchedule,
} from '@/src/utils/my-activities-schedule';
import { Schedule } from '@/src/types/activity.types';
import { useToastStore } from '@/src/store/toastStore';
import { useFormContext } from 'react-hook-form';
import { useDebouncedValue } from '@/src/hooks/useDebouncedValue';

interface RegisterCalendarProps {
  defaultSchedules?: Omit<Schedule, 'id'>[];
}

export default function RegisterCalendar({ defaultSchedules }: RegisterCalendarProps) {
  const { isDesktop } = useBreakpoint();
  const { showToast } = useToastStore();
  const { setValue, watch } = useFormContext();

  // 🔐 defaultSchedules는 최초 한 번만 반영되도록 useRef 사용
  const initialItemsRef = useRef<CalendarItem[] | null>(null);
  if (!initialItemsRef.current) {
    initialItemsRef.current = (defaultSchedules ?? []).map((s) => ({
      id: generateId(),
      date: s.date,
      startTime: s.startTime,
      endTime: s.endTime,
    }));
  }

  const [items, setItems] = useState<CalendarItem[]>(
    initialItemsRef.current.length > 0
      ? initialItemsRef.current
      : [{ id: generateId(), date: '', startTime: '', endTime: '' }]
  );

  const [sortKey, setSortKey] = useState<'registered' | 'latest' | 'oldest'>('registered');

  const handleAddItem = useCallback(() => {
    setItems((prev) => [...prev, { id: generateId(), date: '', startTime: '', endTime: '' }]);
  }, []);

  const handleDeleteItem = useCallback((id: string) => {
    setItems((prev) => {
      const newItems = prev.filter((item) => item.id !== id);
      // 최소 1개의 아이템은 유지
      return newItems.length > 0
        ? newItems
        : [{ id: generateId(), date: '', startTime: '', endTime: '' }];
    });
  }, []);

  // 하위 아이템의 값이 바뀔 때 업데이트
  const handleItemChange = useCallback(
    (id: string, field: 'date' | 'startTime' | 'endTime', value: string) => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;

          const updatedItem = { ...item, [field]: value };

          if (
            updatedItem.date &&
            updatedItem.startTime &&
            updatedItem.endTime &&
            !isValidSchedule(updatedItem)
          ) {
            showToast('error', '올바른 시간을 입력해주세요.');
            return item;
          }

          return updatedItem;
        })
      );
    },
    [showToast]
  );

  // 디바운스된 items 값
  const debouncedItems = useDebouncedValue(items, 300);

  useEffect(() => {
    const validSchedules = debouncedItems
      .filter((item) => isValidSchedule(item))
      .map(({ date, startTime, endTime }) => ({ date, startTime, endTime }));
    setValue('schedules', validSchedules, { shouldDirty: true });
  }, [debouncedItems, setValue]);

  // 중복 스케줄 알림
  useEffect(() => {
    if (hasOverlappingSchedules(debouncedItems)) {
      showToast('error', '동일한 날짜에 시간대가 겹치는 일정이 있습니다.');
    }
  }, [debouncedItems, showToast]);

  const sortedItems = useMemo(() => sortCalendarItems(items, sortKey), [items, sortKey]);

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
              type='button'
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
            type='button'
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
