import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import type { DaumPostcodeData } from '@/src/types/my-activities.types';
import { useToastStore } from '@/src/store/toastStore';

interface PostAddressProps {
  label?: string;
  name?: string;
  value?: string;
  onChange?: (value: string, data?: DaumPostcodeData) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export default function PostAddress({
  label = '주소',
  name = 'address',
  value = '',
  onChange,
  error,
  required = true,
  disabled = false,
  placeholder = '',
  className = '',
}: PostAddressProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const shouldFloat = isFocused || !!value;
  const { showToast } = useToastStore();

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.daum) {
      const script = document.createElement('script');
      script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // 팝업 오픈 후 값 변경
  const handleSearch = () => {
    if (
      typeof window !== 'undefined' &&
      window.daum &&
      typeof window.daum.Postcode === 'function'
    ) {
      new window.daum.Postcode({
        oncomplete: function (data: DaumPostcodeData) {
          onChange?.(data.roadAddress);
        },
      }).open();
    } else {
      showToast('error', '카카오 주소 API가 준비되지 않았어요!');
    }
  };

  return (
    <div className={clsx('w-full mb-6 relative', className)}>
      <div
        className={clsx(
          'flex items-center px-[20px] py-[12px] rounded-2xl border bg-white relative transition-colors duration-200',
          error
            ? 'border-red-300 focus-within:border-red-400'
            : 'border-gray-200 focus-within:border-gray-200',
          disabled && 'bg-gray-50 cursor-not-allowed'
        )}
        onClick={handleSearch}
        role='button'
        aria-disabled={disabled}
      >
        {/* Floating Label */}
        <label
          htmlFor={name}
          className={clsx(
            'absolute pointer-events-none select-none transition-all duration-200',
            shouldFloat
              ? 'top-[14px] text-xs font-regular text-gray-500'
              : 'top-1/2 -translate-y-1/2 text-md font-regular text-gray-500',
            disabled && 'text-gray-400'
          )}
        >
          {label}
          {required && <span className='text-red-300 ml-1'>*</span>}
        </label>

        {/* Input Container */}
        <div className='flex-1 flex items-center'>
          <input
            ref={inputRef}
            id={name}
            name={name}
            // type='text'
            value={value}
            className={clsx(
              'w-full bg-transparent border-none focus:outline-none text-md font-regular pt-2',
              shouldFloat ? 'pt-[20px]' : '',
              'transition-[padding-top] duration-200',
              disabled && 'cursor-not-allowed text-gray-400'
            )}
            placeholder={placeholder}
            disabled={disabled}
            readOnly
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
        {error && <div className='text-xs text-red-400 mt-1 ml-2'>{error}</div>}
      </div>
    </div>
  );
}
