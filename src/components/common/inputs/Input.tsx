'use client';
import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { InputProps } from '../../../types/input.types';

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  error,
  isPassword = false,
  className,
}: InputProps) {
  const [visible, setVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = isPassword ? (visible ? 'text' : 'password') : type;
  const shouldFloat = isFocused || value.length > 0;

  return (
    <div className={clsx('w-full mb-6 relative', className)}>
      <div
        className={clsx(
          'flex items-center px-6 py-4 rounded-2xl border bg-white relative',
          error ? 'border-red-300' : 'border-gray-200 focus-within:border-gray-200'
        )}
      >
        {/* Floating label */}
        <label
          className={clsx(
            'absolute left-6 pointer-events-none select-none transition-all duration-200',
            shouldFloat
              ? 'top-2 text-[1.0rem] font-regular text-gray-400'
              : 'top-1/2 -translate-y-1/2 text-xs font-regular text-gray-400'
          )}
        >
          {label}
        </label>
        {/* input & icon */}
        <div className='flex-1 flex items-center'>
          <input
            type={inputType}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className='w-full bg-transparent border-none focus:outline-none text-xs font-regular text-gray-800 pt-2'
            autoComplete='off'
          />
          {isPassword && (
            <button
              type='button'
              tabIndex={-1}
              className='ml-2'
              onClick={() => setVisible((v) => !v)}
            >
              <Image
                src={
                  visible
                    ? '/assets/icons/ico-visibility-on.svg'
                    : '/assets/icons/ico-visibility-off.svg'
                }
                alt={visible ? '숨기기' : '보이기'}
                width={24}
                height={24}
                style={{ display: 'block' }}
              />
            </button>
          )}
        </div>
      </div>
      {error && <div className='text-red-300 text-[15px] mt-2 ml-2'>{error}</div>}
    </div>
  );
}
