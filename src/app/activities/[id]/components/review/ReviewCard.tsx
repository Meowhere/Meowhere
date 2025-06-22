import Image from 'next/image';
import StarRating from '@/src/components/common/buttons/StarRating';
import formatRelativeTime from '@/src/lib/formatRelativeTime';
import clsx from 'clsx';

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

  return (
    <div
      className={`flex flex-col items-start gap-[12px] ${
        isList ? 'w-full p-0' : 'w-[256px] p-[12px] bg-white dark:bg-black'
      }`}
    >
      <div className='flex items-center gap-[8px]'>
        <StarRating value={rating} readOnly />
        <p className='text-gray-500 dark:text-gray-400 text-xs font-regular'>{formattedDate}</p>
      </div>

      <p
        className={clsx(
          'text-sm font-regular text-gray-700 dark:text-gray-300 flex-grow',
          variant === 'card' && 'line-clamp-4'
        )}
      >
        {content}
      </p>

      <div className='flex items-center gap-[8px] mt-auto'>
        <Image
          src={profileImageUrl || '/assets/icons/default-profile.svg'}
          alt={`${nickname}의 프로필 이미지`}
          width={38}
          height={38}
          className='w-[38px] h-[38px] rounded-full object-cover'
        />
        <p className='text-xs font-medium text-black dark:text-gray-200'>{nickname}</p>
      </div>
    </div>
  );
}
