'use client';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { TextareaProps } from '../../../types/input.types';

export default function Textarea({
  value = '',
  error,
  placeholder = '내용을 입력해 주세요',
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
          'px-[20px] py-[12px] rounded-2xl border bg-white relative',
          error ? 'border-red-300' : 'border-gray-200 focus-within:border-gray-200'
        )}
      >
        <textarea
          {...rest}
          {...register}
          rows={5}
          ref={setRefs}
          maxLength={700}
          placeholder={placeholder}
          className='w-full bg-transparent border-none focus:outline-none resize-none text-md font-regular text-gray-800 placeholder:text-gray-500 scrollbar-hide'
        />
        <div className='flex justify-between items-center mt-2'>
          <span className='text-gray-400 text-xs'>{value.length} / 700</span>
        </div>
      </div>
      {error && <div className='text-red-300 text-[15px] mt-2 ml-2'>{error}</div>}
    </div>
  );
}
