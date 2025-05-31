import { IconProps } from '@/src/types/icon.types';
import React, { useId } from 'react';

export default React.memo(function SearchIcon({
  size = 24,
  ariaLabel = '검색',
  ariaHidden = false,
  ...rest
}: IconProps) {
  const clipId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      {...rest}
    >
      <title>{ariaLabel}</title>
      <g clipPath={`url(#${clipId})`}>
        <path
          d='M15.2083 15.2077L17.8333 17.8327M16.6667 11.416C16.6667 10.0236 16.1135 8.68827 15.129 7.70371C14.1444 6.71914 12.8091 6.16602 11.4167 6.16602C10.0243 6.16602 8.68893 6.71914 7.70436 7.70371C6.7198 8.68827 6.16667 10.0236 6.16667 11.416C6.16667 12.8084 6.7198 14.1438 7.70436 15.1283C8.68893 16.1129 10.0243 16.666 11.4167 16.666C12.8091 16.666 14.1444 16.1129 15.129 15.1283C16.1135 14.1438 16.6667 12.8084 16.6667 11.416Z'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect
            width='14'
            height='14'
            fill='currentColor'
            transform='translate(5 5)'
          />
        </clipPath>
      </defs>
    </svg>
  );
});
