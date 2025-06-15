'use client';

import React from 'react';
import clsx from 'clsx';

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'soft' | 'ghost';
  color?: 'blue' | 'red'; // soft일 때
  children: React.ReactNode;
}

const variantClasses = {
  primary: 'bg-primary-300 text-white',
  outline:
    'border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800',
  ghost: 'text-gray-500 dark:text-gray-400 bg-transparent',
};

const softColors = {
  blue: 'bg-blue-100 dark:bg-dark-blue-200 text-dark-blue-100',
  red: 'bg-red-100 dark:bg-dark-red-200 text-dark-red-100',
};

const disabledClasses =
  'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed';

export default function BaseButton({
  variant = 'primary',
  color = 'blue', // soft의 default
  children,
  className = '',
  disabled = false,
  ...props
}: BaseButtonProps) {
  const isSoft = variant === 'soft';

  const buttonClasses = clsx(
    'px-4 py-3 text-center rounded-[10px] font-semibold transition-colors duration-200',
    disabled ? disabledClasses : isSoft ? softColors[color] : variantClasses[variant],
    className
  );

  return (
    <button disabled={disabled} className={buttonClasses} {...props}>
      {children}
    </button>
  );
}
