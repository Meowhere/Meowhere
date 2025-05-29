'use client';

import StarButton from './StarButton';

type StarRatingProps = {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  className?: string;
};

export default function StarRating({
  value,
  onChange,
  readOnly = false,
  className = '',
}: StarRatingProps) {
  const handleClick = (index: number) => {
    if (readOnly || !onChange) return;

    if (value === index + 1) {
      onChange(index);
    } else {
      onChange(index + 1);
    }
  };

  return (
    <div className='flex gap-1 ${className}'>
      {Array.from({ length: 5 }).map((_, index) => (
        <StarButton
          key={index}
          filled={index < value}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}
