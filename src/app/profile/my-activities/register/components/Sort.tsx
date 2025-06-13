import { useState, useRef, useEffect } from 'react';
import DropdownItem from '@/src/components/common/dropdowns/DropdownItem';
import { SortIcon } from '@/src/components/common/icons/SortIcon';
import { SortedIcon } from '@/src/components/common/icons/SortIcon';

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

  return (
    <div ref={containerRef} className=''>
      <button type='button' aria-label='필터 열기' onClick={() => setOpen((v) => !v)} className=''>
        {filtered ? <SortedIcon /> : <SortIcon />}
      </button>
      {open && (
        <div>
          {SORT_OPTIONS.map((option) => (
            <DropdownItem
              key={option.key}
              label={option.label}
              onClick={() => handleSelect(option.key)}
              onClose={() => setOpen(false)}
              isDanger={false}
              disabled={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
