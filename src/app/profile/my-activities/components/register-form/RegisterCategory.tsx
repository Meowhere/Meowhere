'use client';

import DropdownTrigger from '@/src/components/common/dropdowns/DropdownTrigger';
import DropdownMenu from '@/src/components/common/dropdowns/DropdownMenu';
import { useState } from 'react';
import { DropdownItemButton } from '@/src/types/dropdown.types';
import { Category } from '@/src/types/activity.types';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useFormContext } from 'react-hook-form';

export const CATEGORY_LIST: Category[] = [
  '문화 · 예술',
  '식음료',
  '스포츠',
  '투어',
  '관광',
  '웰빙',
];

export default function RegisterCategory() {
  const { isDesktop } = useBreakpoint();
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [open, setOpen] = useState(false);
  const selectedCategory = watch('category', CATEGORY_LIST[0]);

  // 카테고리 버튼 배열 생성
  const items: DropdownItemButton[] = CATEGORY_LIST.map((category) => ({
    label: category,
    onClick: () => {
      setValue('category', category, { shouldValidate: true });
      setOpen(false);
    },
  }));

  return (
    <div className='relative'>
      <DropdownTrigger
        label='카테고리'
        text={selectedCategory}
        isOpen={open}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className='absolute w-full top-[70px] z-10'>
          <DropdownMenu
            items={items}
            bottomSheetTitle='카테고리 선택'
            isMobile={!isDesktop}
            onClose={() => setOpen(false)}
            bottomButton={{
              label: '취소',
              onClick: () => setOpen(false),
            }}
          />
        </div>
      )}
    </div>
  );
}
