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
        <p className='text-5xl font-semibold text-gray-900'>{rating.toFixed(1)}</p>
        <div className='flex flex-col'>
          <span className='text-2lg font-regular text-gray-700'>{satisfactionLabel}</span>
          <span className='text-md font-regular text-gray-700'>
            후기 {reviewCount.toLocaleString()}개
          </span>
        </div>
      </div>
    </div>
  );
}
