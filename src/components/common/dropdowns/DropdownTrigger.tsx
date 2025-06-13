export default function DropdownTrigger({ label, text, isOpen, onClick }: DropdownTriggerProps) {
  return (
    <button
      onClick={onClick}
      type='button'
      className='w-full h-[64px] rounded-[10px] border border-gray-200 bg-white'
    >
      <div className='w-full flex items-center justify-between px-[20px] py-[8px]'>
        <div className='flex flex-col items-start'>
          <span className='text-xs font-regular text-gray-500'>{label}</span>
          <div>
            <div className='text-md font-regular text-gray-800'>{text}</div>
          </div>
        </div>
        <span>
          <svg
            className={`w-[24px] h-[24px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            viewBox='0 0 24 24'
            fill='none'
            stroke='#A1A1A1'
            strokeWidth='2.25'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='6 15 12 9 18 15' />
          </svg>
        </span>
      </div>
    </button>
  );
}

interface DropdownTriggerProps {
  label: string;
  text: string;
  isOpen: boolean;
  onClick: () => void;
}
