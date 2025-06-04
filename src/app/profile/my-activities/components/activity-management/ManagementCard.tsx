'use client';
import RatingLabel from './RatingLabel';
import { MyActivitiesProps } from '@/src/types/my-activities.types';
import KebabButton from '@/src/components/common/buttons/KebabButton';
import { useState } from 'react';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import ManagementDropdown from './ManagementDropdown';
import Image from 'next/image';

export default function ManagementCard({
  title,
  bannerImageUrl,
  price,
  rating,
}: MyActivitiesProps) {
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
      <div className='flex flex-row items-center justify-center gap-[10px] lg:gap-[14px]'>
        <Image
          src={bannerImageUrl}
          alt={title}
          width={isDesktop ? 98 : 84}
          height={isDesktop ? 98 : 84}
          className='rounded-[8px] lg:rounded-[10px] object-cover object-center aspect-[1/1]'
        />
        <div className='flex flex-col gap-[12px] lg:gap-[18px] lg:h-[98px]'>
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
        <KebabButton size={24} onToggle={() => setOpen((prev) => !prev)} />
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
