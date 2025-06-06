'use client';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { TextareaProps } from '../../../types/input.types';

export default function Textarea({
  value = '',
  error,
  className,
  register,
  ...rest
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ref 콜백 합성
  function setRefs(el: HTMLTextAreaElement) {
    textareaRef.current = el;
    if (register && typeof register.ref === 'function') {
      register.ref(el);
    }
  }

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
          {...rest}
          {...register}
          rows={5}
          ref={setRefs}
          maxLength={700}
          className='w-full bg-transparent border-none focus:outline-none resize-none text-sm font-regular text-gray-800 pt-6 scrollbar-hide'
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
