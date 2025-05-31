'use client';

import DeleteIcon from '../icons/DeleteIcon';

interface CloseButtonProps {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 40,
};

export default function CloseButton({ size = 'md', onClick, className = '' }: CloseButtonProps) {
  return (
    <button type='button' onClick={onClick} aria-label='닫기' className={`p-1 ${className}`}>
      <DeleteIcon size={sizeMap[size]} className='object-contain text-white' />
    </button>
  );
}
