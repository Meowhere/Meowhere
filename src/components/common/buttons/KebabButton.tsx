'use client';

import KebobIcon from '../icons/KebabIcon';

interface KebabButtonProps {
  onToggle: () => void;
  className?: string;
  size?: number;
}

export default function KebabButton({
  onToggle,
  className = 'text=[#79747E]',
  size = 16,
  ...rest
}: KebabButtonProps) {
  return (
    <button type='button' onClick={onToggle} aria-label='옵션 열기' className={className} {...rest}>
      <KebobIcon size={size} className='text-[#79747E]' />
    </button>
  );
}
