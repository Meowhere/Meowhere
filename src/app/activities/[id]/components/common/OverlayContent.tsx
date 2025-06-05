interface OverlayContentProps {
  placeName: string;
}

export default function OverlayContent({ placeName }: OverlayContentProps) {
  return (
    <div className='px-3 py-1.5 rounded-full border-2 border-[#007AFF] bg-white flex items-center shadow-md'>
      <div className='w-5 h-5 flex items-center justify-center bg-[#007AFF] text-white text-sm rounded-full mr-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-[12px] h-[12px]'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z' />
        </svg>
      </div>
      <span className='text-sm font-semibold text-gray-900'>{placeName}</span>
    </div>
  );
}
