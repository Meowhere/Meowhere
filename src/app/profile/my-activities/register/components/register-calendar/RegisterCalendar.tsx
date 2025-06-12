import { useState } from 'react';
import RegisterCalendarItem from './RegisterCalendarItem';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

export default function RegisterCalendar() {
  const { isDesktop } = useBreakpoint();
  const [items, setItems] = useState([{ id: 0 }]);
  const [nextId, setNextId] = useState(1);

  const handleAddItem = () => {
    setItems((prev) => [...prev, { id: nextId }]);
    setNextId((prev) => prev + 1);
  };

  const handleDeleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className='flex flex-col gap-[20px]'>
      <div className='flex flex-row items-center justify-between'>
        <p className='text-xl font-semibold text-gray-800'>체험 일정</p>
        {isDesktop && (
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
        )}
      </div>
      <div className='flex flex-col gap-[20px]'>
        {items.map((item) => (
          <RegisterCalendarItem key={item.id} onDelete={() => handleDeleteItem(item.id)} />
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
