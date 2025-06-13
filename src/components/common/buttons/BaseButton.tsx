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
  outline: 'border border-gray-200 text-gray-500 bg-white',
  ghost: 'text-gray-500 bg-transparent',
};

const softColors = {
  blue: 'bg-blue-100 text-blue-200',
  red: 'bg-red-100 text-red-300',
};

const disabledClasses = 'bg-gray-200 text-gray-500 cursor-not-allowed';

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
    'w-full px-4 py-3 text-center rounded-[10px] font-semibold transition-colors duration-200',
    disabled ? disabledClasses : isSoft ? softColors[color] : variantClasses[variant],
    className
  );

  return (
    <button disabled={disabled} className={buttonClasses} {...props}>
      {children}
    </button>
  );
}
