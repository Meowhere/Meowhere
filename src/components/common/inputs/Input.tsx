'use client';
import { useId, useState, forwardRef } from 'react';
import clsx from 'clsx';
import VisibilityToggleButton from '@/src/components/common/buttons/VisibilityToggleButton';
import { InputProps } from '@/src/types/input.types';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    name,
    type = 'text',
    watchValue = '',
    error,
    isPassword = false,
    className,
    placeholder,
    disabled = false,
    required = false,
    ...rest
  },
  ref
) {
  const inputId = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPasswordType = type === 'password' || isPassword;
  const inputType = isPasswordType ? (isVisible ? 'text' : 'password') : type;

  // floating label 조건: 포커스 중이거나 값이 있을 때
  const shouldFloat = isFocused || !!watchValue;

  // 에러 메시지 처리
  const errorMessage = typeof error === 'string' ? error : error?.message;

  return (
    <div className={clsx('w-full mb-6 relative', className)}>
      <div
        className={clsx(
          'flex items-center px-[20px] py-[12px] rounded-2xl border bg-white dark:bg-gray-800 relative transition-colors duration-200',
          errorMessage
            ? 'border-red-300 focus-within:border-red-400'
            : 'border-gray-200 dark:border-gray-600 focus-within:border-gray-200 dark:focus-within:border-gray-500',
          disabled && 'bg-gray-50 dark:bg-gray-700 cursor-not-allowed'
        )}
      >
        {/* Floating Label */}
        <label
          htmlFor={inputId}
          className={clsx(
            'absolute pointer-events-none select-none transition-all duration-200',
            shouldFloat
              ? 'top-[14px] text-xs font-regular text-gray-500 dark:text-gray-400'
              : 'top-1/2 -translate-y-1/2 text-md font-regular text-gray-500 dark:text-gray-400',
            disabled && 'text-gray-400 dark:text-gray-500'
          )}
        >
          {label}
          {required && <span className='text-red-300 ml-1'>*</span>}
        </label>

        {/* Input Container */}
        <div className='flex-1 flex items-center'>
          <input
            {...rest}
            ref={ref}
            id={inputId}
            name={name}
            type={inputType}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={clsx(
              'w-full bg-transparent border-none focus:outline-none text-md font-regular pt-2',
              errorMessage ? 'text-red-600' : 'text-gray-800 dark:text-gray-200',
              shouldFloat ? 'pt-[20px]' : '',
              'transition-[padding-top] duration-200',
              disabled && 'cursor-not-allowed text-gray-400 dark:text-gray-500'
            )}
            autoComplete={isPasswordType ? 'current-password' : 'off'}
          />

          {/* Password Toggle Button */}
          {isPasswordType && !disabled && (
            <VisibilityToggleButton
              isVisible={isVisible}
              onToggle={() => setIsVisible((prev) => !prev)}
            />
          )}
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && <div className='text-red-300 text-sm mt-2 ml-2'>{errorMessage}</div>}
    </div>
  );
});

export default Input;
