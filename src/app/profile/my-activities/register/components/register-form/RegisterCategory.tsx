'use client';

import DropdownTrigger from '@/src/components/common/dropdowns/DropdownTrigger';
import DropdownMenu from '@/src/components/common/dropdowns/DropdownMenu';
import { useState } from 'react';
import { DropdownItemButton } from '@/src/types/dropdown.types';
import { Category } from '@/src/types/activity.types';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

const CATEGORY_LIST: Category[] = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

export default function RegisterCategory() {
  const { isDesktop } = useBreakpoint();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Category>('문화 · 예술');
  // 카테고리 버튼 배열 생성
  const items: DropdownItemButton[] = CATEGORY_LIST.map((category) => ({
    label: category,
    onClick: () => {
      setSelected(category);
      setOpen(false);
    },
  }));

  return (
    <div>
      <DropdownTrigger
        label='카테고리'
        text={selected}
        isOpen={open}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <DropdownMenu
          items={items}
          bottomSheetTitle='카테고리 선택'
          isMobile={!isDesktop}
          bottomButton={{
            label: '취소',
            onClick: () => setOpen(false),
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
