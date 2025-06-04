'use client';
import RatingLabel from './RatingLabel';
import { MyActivitiesProps } from '@/src/types/my-activities.types';
import KebabButton from '@/src/components/common/buttons/KebabButton';
import { useState } from 'react';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import ManagementDropdown from './ManagementDropdown';

export default function ManagementCard({ title, imageUrl, price, rating }: MyActivitiesProps) {
  const [open, setOpen] = useState(false);
  const { isDesktop } = useBreakpoint();

  // 수정하기 클릭 시 실행될 함수
  const handleEdit = () => {
    alert(`${title} 수정하기 클릭!`);
    setOpen(false);
  };

  // 삭제 클릭 시 실행될 함수
  const handleDelete = () => {
    if (confirm(`${title}을(를) 삭제하시겠습니까?`)) {
      alert('삭제되었습니다.');
    }
    setOpen(false);
  };

  return (
    <div className='flex justify-between border-b border-gray-200 py-[24px] w-full'>
      <div className='flex flex-row items-center gap-[10px]'>
        <img src={imageUrl} alt={title} className='w-[84px] h-[84px] rounded-[8px]' />
        {/* isDesktop일 땐 98px 에 round 10px  그리고 gap은 14px*/}
        <div className='flex flex-col justify-between gap-[12px]'>
          {/* isDestop일 때 gap 18 h 98px */}
          <RatingLabel rating={rating} />
          <div className='flex flex-col justify-between gap-[12px]'>
            <p className='text-lg font-semibold text-gray-800 leading-none'>{title}</p>
            <span className='text-sm font-regular text-gray-600 leading-none'>
              ₩{price.toLocaleString()} /인
            </span>
          </div>
        </div>
      </div>
      <div>
        <KebabButton onToggle={() => setOpen((prev) => !prev)} />
        <ManagementDropdown
          isOpen={open}
          onClose={() => setOpen(false)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDesktop={isDesktop}
        />
        {/* 등록하기랑 수정하기 할 Eo 이 코드는 다시 수정할 예정 */}
      </div>
    </div>
  );
}
