import Image from 'next/image';

interface RegisterCalendarItemProps {
  onDelete: () => void;
}

export default function RegisterCalendarItem({ onDelete }: RegisterCalendarItemProps) {
  return (
    <div className='flex flex-row w-full items-center justify-between px-[18px] py-[12px] border border-gray-200 rounded-[10px]'>
      <p className='text-md font-regular text-gray-800'>2025/05/27</p>
      <p className='text-md font-regular text-gray-400'>|</p>
      <p className='text-md font-regular text-gray-800'>
        10:24<span className='text-md font-regular text-gray-400'>~</span>10:24
      </p>
      <Image
        src='/assets/icons/delete/ico-delete-minus.svg'
        alt='delete-time'
        width={24}
        height={24}
        onClick={onDelete}
        className='cursor-pointer'
      />
    </div>
  );
}
