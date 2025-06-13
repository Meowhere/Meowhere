import Image from 'next/image';
import StarRating from '@/src/components/common/buttons/StarRating';
import formatRelativeTime from '@/src/lib/formatRelativeTime';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

interface ReviewCardProps {
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  content: string;
  rating: number;
  variant?: 'card' | 'list'; // 카드의 표시 형태 ('card': 일반적인 카드 형태, 'list': 목록 아이템 형태, 기본값: 'card')
}

export default function ReviewCard({
  nickname,
  profileImageUrl,
  createdAt,
  content,
  rating,
  variant = 'card',
}: ReviewCardProps) {
  const formattedDate = formatRelativeTime(createdAt);

  const isList = variant === 'list';

  const { isTablet } = useBreakpoint();

  const contentMaxWidth = isList ? '' : isTablet ? 'max-w-[400px]' : 'max-w-[232px]';

  return (
    <div
      className={`flex flex-col items-start gap-[12px] ${
        isList ? 'w-full p-0' : 'w-full p-[12px] bg-white'
      }`}
    >
      <div className='flex items-center gap-[8px]'>
        <StarRating value={rating} readOnly />
        <p className='text-[#A4A1AA] text-xs font-regular'>{formattedDate}</p>
      </div>

      <p className={`text-sm font-regular text-gray-700 ${contentMaxWidth} line-clamp-4`}>
        {content}
      </p>

      <div className='flex items-center gap-[8px]'>
        <Image
          src={profileImageUrl}
          alt={`${nickname}의 프로필 이미지`}
          width={38}
          height={38}
          className='w-[38px] h-[38px] rounded-full object-cover'
        />
        <p className='text-xs font-medium text-black'>{nickname}</p>
      </div>
    </div>
  );
}
