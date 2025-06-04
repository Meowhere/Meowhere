interface ReviewSummaryProps {
  averageRating: number;
  totalCount: number;
  satisfactionLabel: string;
}

export default function ReviewSummary({
  averageRating,
  totalCount,
  satisfactionLabel,
}: ReviewSummaryProps) {
  return (
    <div className='mb-4'>
      <div className='flex items-center gap-[16px]'>
        <p className='text-[5rem] font-semibold text-gray-900'>{averageRating.toFixed(1)}</p>
        <div className='flex flex-col'>
          <span className='text-2lg font-regular text-gray-700'>{satisfactionLabel}</span>
          <span className='text-md font-regular text-gray-700'>
            후기 {totalCount.toLocaleString()}개
          </span>
        </div>
      </div>
    </div>
  );
}
