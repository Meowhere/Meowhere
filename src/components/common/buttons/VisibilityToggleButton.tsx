'use client';

import VisibilityOffIcon from '../icons/VisibilityOffIcon';
import VisibilityOnIcon from '../icons/VisibiltiyOnIcon';

interface VisibilityToggleButtonProps {
  isVisible: boolean;
  onToggle: () => void;
  className?: string;
}

export default function VisibilityToggleButton({
  isVisible,
  onToggle,
  className = '',
  ...rest
}: VisibilityToggleButtonProps) {
  return (
    <button
      type='button'
      onClick={onToggle}
      aria-label={isVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
      className={`p-1 ${className}`}
      {...rest}
    >
      <div className='w-full h-full cursor-pointer'>
        {isVisible ? (
          <VisibilityOnIcon className='w-full h-full text-gray-400' />
        ) : (
          <VisibilityOffIcon className='w-full h-full text-gray-400' />
        )}
      </div>
    </button>
  );
}
