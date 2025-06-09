import Image from 'next/image';
import StarRating from '@/src/components/common/buttons/StarRating';
import formatRelativeTime from '@/src/lib/formatRelativeTime';

interface ReviewCardProps {
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  content: string;
  rating: number;
  variant?: 'card' | 'list';
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
        isList ? 'w-full p-0' : 'w-[256px] p-[12px] bg-white'
      }`}
    >
      <div className='flex items-center gap-[8px]'>
        <StarRating value={rating} readOnly />
        <p className='text-[#A4A1AA] text-xs font-regular'>{formattedDate}</p>
      </div>

      <p
        className={`text-sm font-regular text-gray-700 ${
          isList ? '' : 'line-clamp-4 max-w-[232px]'
        }`}
      >
        {content}
      </p>

      <div className='flex items-center gap-[8px]'>
        <Image
          src={profileImageUrl}
          alt={nickname}
          width={38}
          height={38}
          className='rounded-full object-cover'
        />
        <p className='text-xs font-medium text-black'>{nickname}</p>
      </div>
    </div>
  );
}
