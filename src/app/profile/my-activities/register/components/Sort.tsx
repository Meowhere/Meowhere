import { useState, useRef, useEffect } from 'react';
import { SortIcon, SortedIcon } from '@/src/components/common/icons/SortIcon';
import DropdownMenu from '@/src/components/common/dropdowns/DropdownMenu';
import { DropdownItemButton } from '@/src/types/dropdown.types';

interface SortProps {
  onSortChange: (sort: 'registered' | 'latest' | 'oldest') => void;
}

const SORT_OPTIONS = [
  { key: 'registered', label: '등록순' },
  { key: 'latest', label: '최신순' },
  { key: 'oldest', label: '과거순' },
] as const;

export default function Sort({ onSortChange }: SortProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<'registered' | 'latest' | 'oldest'>('registered');
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleSelect = (key: 'registered' | 'latest' | 'oldest') => {
    setSelected(key);
    setOpen(false);
    onSortChange?.(key);
  };

  const filtered = selected !== 'registered';

  // 드롭다운 메뉴 데이터 만들기
  const dropdownItems: DropdownItemButton[] = [
    {
      label: '등록순',
      onClick: () => handleSelect('registered'),
    },
    {
      label: '최신순',
      onClick: () => handleSelect('latest'),
    },
    {
      label: '과거순',
      onClick: () => handleSelect('oldest'),
    },
  ];

  return (
    <div ref={containerRef} className='relative'>
      <button
        type='button'
        aria-label='정렬 드롭다운 열기'
        onClick={() => setOpen((v) => !v)}
        className='cursor-pointer'
      >
        {filtered ? <SortedIcon /> : <SortIcon />}
      </button>
      {open && (
        <div>
          <div className='absolute right-0 top-[32px] z-10'>
            <DropdownMenu
              items={dropdownItems}
              bottomSheetTitle='날짜 정렬'
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
