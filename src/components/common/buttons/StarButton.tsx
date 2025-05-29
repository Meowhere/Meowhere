'use client';

type StarButtonProps = {
  filled: boolean;
  onClick: () => void;
  className?: string;
};

export default function StarButton({
  filled,
  onClick,
  className = '',
}: StarButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      aria-label={filled ? '별점 있음' : '별점 없음'}
      className={`w-6 h-6 ${className}`}
    >
      <img
        src={
          filled
            ? '/assets/icons/star/ico-star-bw-fill.svg'
            : '/assets/icons/star/ico-star-bw.svg'
        }
        alt={filled ? '채워진 별' : '빈 별'}
        className='w-full h-full object-contain cursor-pointer'
      />
    </button>
  );
}
