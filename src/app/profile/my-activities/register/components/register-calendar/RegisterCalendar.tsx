import { useState } from 'react';
import RegisterCalendarItem from './RegisterCalendarItem';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import Sort from '../register-form/Sort';

const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
interface CalendarItem {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function RegisterCalendar() {
  const { isDesktop } = useBreakpoint();
  const [items, setItems] = useState<CalendarItem[]>([
    { id: generateId(), date: '', startTime: '', endTime: '' },
  ]);
  const [nextId, setNextId] = useState(1);
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

  // 정렬 로직
  let sortedItems = [...items];
  if (sortKey === 'latest') {
    sortedItems.sort((a, b) => compareDateTime(b, a));
  } else if (sortKey === 'oldest') {
    sortedItems.sort((a, b) => compareDateTime(a, b));
  }
  // 날짜/시간 비교 유틸
  function compareDateTime(a: CalendarItem, b: CalendarItem) {
    // "2024-06-14" + "T" + "14:00" 식으로 합쳐서 Date 비교
    const dateA = new Date(`${a.date}T${a.startTime}`);
    const dateB = new Date(`${b.date}T${b.startTime}`);
    return dateA.getTime() - dateB.getTime();
  }

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
