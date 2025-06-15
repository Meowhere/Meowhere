'use client';

import { Activity } from '@/src/types/activity.types';
import { useKakaoShare } from '@/src/hooks/useKakaoShare';
import ShareIcon from '../icons/ShareIcon';

interface KebabButtonProps {
  activity: Activity;
  className?: string;
  size?: number;
}

export default function KakaoShareButton({
  activity,
  className,
  size = 16,
  ...rest
}: KebabButtonProps) {
  const { shareToKakao, isKakaoLoaded, isLoading } = useKakaoShare();

  const handleShare = () => {
    shareToKakao({ activity });
  };

  if (!isKakaoLoaded) return null;

  return (
    <button
      type='button'
      onClick={handleShare}
      aria-label='카카오 공유'
      disabled={isLoading}
      className={className}
      {...rest}
    >
      <ShareIcon size={size} />
    </button>
  );
}
