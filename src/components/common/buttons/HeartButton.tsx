'use client';

interface HeartButtonProps {
  isLiked: boolean;
  onToggle: () => void;
  variant?: 'white' | 'black';
  className?: string;
}

const getIconSrc = (isLiked: boolean, variant: 'white' | 'black') => {
  if (variant === 'black') {
    return isLiked
      ? '/assets/icons/heart/ico-heart-bw-fill.svg'
      : '/assets/icons/heart/ico-heart-bw.svg';
  }

  return isLiked ? '/assets/icons/heart/ico-heart-fill.svg' : '/assets/icons/heart/ico-heart.svg';
};

export default function HeartButton({
  isLiked,
  onToggle,
  variant = 'white',
  className = '',
}: HeartButtonProps) {
  return (
    <button
      type='button'
      onClick={onToggle}
      aria-label={isLiked ? '찜 취소' : '찜하기'}
      className={`bg-transparent p-0 ${className}`}
    >
      <img
        src={getIconSrc(isLiked, variant)}
        alt={isLiked ? '하트 채움' : '하트 비움'}
        className='w-6 h-6 object-contain'
      />
    </button>
  );
}
