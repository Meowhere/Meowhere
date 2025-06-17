'use client';

import StarButton from './StarButton';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  className?: string;
  maxStars?: number;
}

export default function StarRating({
  value,
  onChange,
  readOnly = false,
  className = '',
  maxStars = 5,
}: StarRatingProps) {
  const handleClick = (index: number) => {
    if (readOnly || !onChange) return;

    const newValue = value === index + 1 ? index : index + 1;
    onChange(newValue);
  };

  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: maxStars }).map((_, index) => (
        <StarButton
          key={index}
          filled={index < value}
          onClick={() => handleClick(index)}
          className='hover:scale-110'
          style={{
            transition: 'all 0.1s cubic-bezier(0, 0.5, 0.5, 1)',
          }}
        />
      ))}
    </div>
  );
}
