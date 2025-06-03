'use client';
import { useId, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { InputProps } from '../../../types/input.types';
import VisibilityToggleButton from '@/src/components/common/buttons/VisibilityToggleButton';

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  error,
  isPassword = false,
  className,
}: InputProps) {
  const inputId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPasswordType = type === 'password';
  const inputType = isPasswordType && !isVisible ? 'password' : 'text';
  const shouldFloat = isFocused || !!value;

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
          htmlFor={inputId}
          className={clsx(
            'absolute left-6 pointer-events-none select-none transition-all duration-200',
            shouldFloat
              ? 'top-2 text-xs font-regular text-gray-400'
              : 'top-1/2 -translate-y-1/2 text-md font-regular text-gray-400'
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
            className='w-full bg-transparent border-none focus:outline-none text-md font-regular text-gray-800 pt-2'
            autoComplete='off'
          />
          {isPassword && (
            <VisibilityToggleButton
              isVisible={isVisible}
              onToggle={() => setIsVisible((prev) => !prev)}
            />
          )}
        </div>
      </div>
      {error && <div className='text-red-300 text-sm mt-2 ml-2'>{error}</div>}
    </div>
  );
}
