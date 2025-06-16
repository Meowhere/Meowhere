'use client';

export default function ExperienceDetailSkeleton() {
  return (
    <div className='animate-pulse max-w-[1200px] mx-auto px-4 py-8 space-y-12'>
      {/* 이미지 영역 */}
      <div className='w-full h-[320px] bg-gray-200 rounded-lg' />

      {/* 요약/정보 박스 */}
      <div className='w-full h-[120px] bg-gray-200 rounded-lg' />

      {/* 지도 영역 */}
      <div className='w-full h-[220px] bg-gray-200 rounded-lg' />

      {/* 설명 영역 */}
      <div className='w-full h-[200px] bg-gray-200 rounded-lg' />

      {/* 후기 영역 */}
      <div className='w-full h-[240px] bg-gray-200 rounded-lg' />

      {/* 예약 박스 */}
      <div className='w-full h-[160px] bg-gray-200 rounded-lg' />
    </div>
  );
}
