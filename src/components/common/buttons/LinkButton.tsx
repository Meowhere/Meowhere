'use client';

import React from 'react';
import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';

interface LinkButtonProps extends LinkProps {
  variant?: 'primary' | 'outline' | 'soft' | 'ghost';
  color?: 'blue' | 'red'; // soft일 때
  children: React.ReactNode;
  className?: string;
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

export default function LinkButton({
  variant = 'primary',
  color = 'blue', // soft의 default
  children,
  className = '',
  ...props
}: LinkButtonProps) {
  const isSoft = variant === 'soft';

  const linkClasses = clsx(
    'flex items-center justify-center px-4 py-3 rounded-[10px] font-semibold transition-colors duration-200',
    isSoft ? softColors[color] : variantClasses[variant],
    className
  );

  return (
    <Link className={linkClasses} {...props}>
      {children}
    </Link>
  );
}
