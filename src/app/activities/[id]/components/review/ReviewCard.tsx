import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import StarRating from '@/src/components/common/buttons/StarRating';

interface ReviewCardProps {
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  content: string;
  rating: number;
}

export default function ReviewCard({
  nickname,
  profileImageUrl,
  createdAt,
  content,
  rating,
}: ReviewCardProps) {
  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <div className='flex flex-col items-start gap-[12px] w-[288px] p-[12px] bg-white'>
      <div className='flex items-center gap-[8px]'>
        <StarRating value={rating} readOnly />
        <p className='text-[#A4A1AA] text-xs font-regular'>{formattedDate}</p>
      </div>
      <p className='text-sm font-regular text-gray-700 line-clamp-4 max-w-[240px]'>{content}</p>

      <div className='flex items-center gap-[8px]'>
        <Image
          src={profileImageUrl}
          alt={nickname}
          width={38}
          height={38}
          className='rounded-full object-cover'
        />
        <p className='text-xs font-medium text-[#121]'>{nickname}</p>
      </div>
    </div>
  );
}
