interface OverlayContentProps {
  placeName: string;
}

export default function OverlayContent({ placeName }: OverlayContentProps) {
  return (
    <div className='px-[12px] py-[6px] rounded-full border-2 border-blue-300 bg-white flex items-center shadow-md'>
      <div className='w-[20px] h-[20px] flex items-center justify-center bg-blue-300 text-white text-sm rounded-full mr-[8px]'>
        <svg
          className='w-[12px] h-[12px]'
          viewBox='0 0 24 24'
          fill='currentColor'
          aria-label='위치 아이콘'
          role='img'
        >
          <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z' />
        </svg>
      </div>
      <span className='text-sm font-semibold text-gray-900'>{placeName}</span>
    </div>
  );
}
