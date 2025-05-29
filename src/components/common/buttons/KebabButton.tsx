'use client';

type KebabButtonProps = {
  onToggle: () => void;
  className?: string;
};

export default function KebabButton({
  onToggle,
  className = '',
}: KebabButtonProps) {
  return (
    <button
      type='button'
      onClick={onToggle}
      aria-label='옵션 열기'
      className={className}
    >
      <img
        src='/assets/icons/ico-kebab-menu.svg'
        alt='더보기 아이콘'
        className='w-10 h-10 object-contain'
      />
    </button>
  );
}
