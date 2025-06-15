interface ReviewSummaryProps {
  rating: number;
  reviewCount: number;
  satisfactionLabel: string;
}

export default function ReviewSummary({
  rating,
  reviewCount,
  satisfactionLabel,
}: ReviewSummaryProps) {
  return (
    <div className='mb-4'>
      <div className='flex items-center gap-[16px]'>
        <span className='text-[2.4rem] font-bold text-gray-800'>{(rating ?? 0).toFixed(1)}</span>
        <div className='flex flex-col'>
          <span className='text-2lg font-regular text-gray-700'>{satisfactionLabel}</span>
          <span className='text-md font-regular text-gray-700'>
            후기 {(reviewCount ?? 0).toLocaleString()}개
          </span>
        </div>
      </div>
    </div>
  );
}
