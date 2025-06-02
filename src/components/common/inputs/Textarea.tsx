'use client';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { TextareaProps } from '../../../types/input.types';

// 반응형 기본 rows 계산 함수
function getResponsiveRows() {
  if (typeof window === 'undefined') return 5; // SSR-safe
  const width = window.innerWidth;
  if (width < 640) return 5; // 모바일(sm 이하)
  if (width < 1024) return 7; // 태블릿(md/lg)
  return 10; // 데스크탑(xl 이상)
}

export default function Textarea({ value, onChange, error, className }: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [rows, setRows] = useState<number>(getResponsiveRows());

  // 반응형 rows: 화면 크기 변경 시 rows 값 업데이트
  useEffect(() => {
    const updateRows = () => setRows(getResponsiveRows());
    window.addEventListener('resize', updateRows);
    updateRows();
    return () => window.removeEventListener('resize', updateRows);
  }, []);

  // 자동 높이 조절 (줄 수 증가)
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className={clsx('w-full mb-6 relative', className)}>
      <div
        className={clsx(
          'px-6 py-4 rounded-2xl border bg-white relative',
          error ? 'border-red-300' : 'border-gray-200 focus-within:border-gray-200'
        )}
      >
        <textarea
          value={value}
          onChange={onChange}
          rows={rows}
          ref={textareaRef}
          maxLength={700}
          className='w-full bg-transparent border-none focus:outline-none resize-none text-sm font-regular text-gray-800 pt-6'
          // style={{ minHeight: '10rem' }}
        />
        <div className='flex justify-between items-center mt-2'>
          <span className='text-gray-400 text-xs'>{value.length} / 700</span>
        </div>
      </div>
      {error && <div className='text-red-300 text-[15px] mt-2 ml-2'>{error}</div>}
    </div>
  );
}
