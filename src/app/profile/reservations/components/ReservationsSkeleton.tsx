export default function SkeletonReservationsCard() {
  return (
    <div className='flex flex-col gap-[18px] bg-white px-[20px] py-[24px] border-b border-gray-200 animate-pulse lg:flex-row lg:justify-between lg:items-end rounded-[12px]'>
      <div className='w-[86px] h-[86px] lg:w-[98px] lg:h-[98px] bg-gray-200 rounded-[10px]' />

      <div className='flex flex-col justify-between gap-[10px] flex-1'>
        <div className='w-[64px] h-[20px] bg-gray-200 rounded-full' />
        <div className='flex flex-col gap-[8px] pl-[4px]'>
          <div className='w-[70%] h-[20px] bg-gray-200 rounded-[6px]' />
          <div className='w-[50%] h-[18px] bg-gray-200 rounded-[6px]' />
          <div className='w-[40%] h-[18px] bg-gray-200 rounded-[6px]' />
        </div>
      </div>

      <div className='w-full lg:w-[128px]'>
        <div className='h-[42px] bg-gray-200 rounded-[10px]' />
      </div>
    </div>
  );
}
