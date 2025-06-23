'use client';

import Image from 'next/image';

interface BadgeViewerProps {
  imageUrl: string;
  alt?: string;
  size?: number; // 기본값: 96
  animated?: boolean;
}

export default function BadgeViewer({
  imageUrl,
  alt = '뱃지',
  size = 96,
  animated = false,
}: BadgeViewerProps) {
  return (
    <div className={animated ? 'animate-coin-spin' : ''}>
      <Image
        src={imageUrl}
        alt={alt}
        width={size}
        height={size}
        className='object-contain max-w-[96px] max-h-[96px] w-full h-full drop-shadow-lg'
        unoptimized
        priority
      />
    </div>
  );
}
