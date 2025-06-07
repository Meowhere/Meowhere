import Image from 'next/image';

interface RegisterCalendarItemProps {
  onDelete: () => void;
}

export default function RegisterCalendarItem({ onDelete }: RegisterCalendarItemProps) {
  return (
    <div className='grid grid-cols-5 w-full items-center px-[18px] py-[12px] border border-gray-200 rounded-[10px]'>
      <div className='flex justify-center col-span-2'>
        <p className='text-md font-regular text-gray-800'>2025/05/27</p>
      </div>
      <div className='flex justify-center'>
        <p className='justify-center text-md font-regular text-gray-400'>|</p>
      </div>
      <div className='flex justify-center gap-[20px] lg:gap-[34px]'>
        <p className='text-md font-regular text-gray-800'>10:24</p>
        <span className='text-md font-regular text-gray-400'>~</span>
        <p className='text-md font-regular text-gray-800'>10:24</p>
      </div>
      <div className='flex justify-end'>
        <Image
          src='/assets/icons/delete/ico-delete-minus.svg'
          alt='delete-time'
          width={24}
          height={24}
          onClick={onDelete}
          className='cursor-pointer'
        />
      </div>
    </div>
  );
}
