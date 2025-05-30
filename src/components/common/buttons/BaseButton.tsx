'use client';

import React from 'react';
import clsx from 'clsx';

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'soft' | 'ghost';
  children: React.ReactNode;
}

const variantClasses = {
  primary: 'bg-primary-300 text-white',
  outline: 'border border-gray-200 text-gray-500 bg-white',
  soft: 'bg-primary-100 text-primary-300',
  ghost: 'text-gray-500',
};

const disabledClasses = 'bg-gray-200 text-gray-500 cursor-not-allowed';

export default function BaseButton({
  variant = 'primary',
  children,
  className = '',
  disabled = false,
  ...props
}: BaseButtonProps) {
  const buttonClasses = clsx(
    'w-full px-4 py-3 text-center rounded-[0.625rem] font-semibold',
    disabled ? disabledClasses : variantClasses[variant],
    className
  );

  return (
    <button disabled={disabled} className={buttonClasses} {...props}>
      {children}
    </button>
  );
}
