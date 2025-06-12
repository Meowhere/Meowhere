export default function SkeletonActivities() {
  return (
    <div className='flex flex-row items-center gap-[10px] lg:gap-[14px] mb-4'>
      {/* 이미지 스켈레톤 */}
      <div className='animate-pulse bg-gray-200 rounded-[8px] aspect-square w-[84px] h-[84px] lg:rounded-[10px] lg:w-[98px] lg:h-[98px]' />
      {/* 오른쪽 텍스트 영역 */}
      <div className='flex flex-col gap-[12px] lg:gap-[18px] lg:h-[98px] flex-1'>
        {/* 별점 라벨 위치 */}
        <div className='w-[60px] h-[20px] bg-gray-200 rounded animate-pulse mb-2' />
        {/* 타이틀/가격 부분 */}
        <div className='flex flex-col justify-between gap-[12px]'>
          <div className='w-[120px] h-[20px] bg-gray-200 rounded animate-pulse mb-1' />
          <div className='w-[80px] h-[16px] bg-gray-200 rounded animate-pulse' />
        </div>
      </div>
    </div>
  );
}
