import Image from 'next/image';
import { useRef } from 'react';

export default function UploadImg() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className='flex flex-col items-center justify-center gap-[8px] border border-[2px] border-dashed border-gray-300 rounded-[12px] w-[168px] h-[168px] cursor-pointer'
      onClick={handleDivClick}
    >
      <Image src='/assets/icons/ico-plus.svg' alt='upload' width={48} height={48} />
      <p className='text-md font-medium text-gray-500'>이미지 업로드</p>
      <input ref={inputRef} type='file' accept='image/*' className='hidden' />
    </div>
  );
}
