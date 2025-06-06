import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

interface UploadImgProps {
  file?: File | null;
  onFileChange?: (file: File | null) => void;
}

export default function UploadImg({ file: fileProp, onFileChange }: UploadImgProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(fileProp ?? null);
  const [preview, setPreview] = useState<string | null>(null);
  const { isTablet } = useBreakpoint();

  useEffect(() => {
    if (fileProp !== undefined) setFile(fileProp);
  }, [fileProp]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  const handleDivClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const NewFile = e.target.files?.[0] ?? null;
    if (onFileChange) onFileChange(NewFile);
    else setFile(NewFile);
  };

  return (
    <div className='flex'>
      {preview ? (
        <div className='relative w-[160px] h-[160px] md:w-[346px] md:h-[346px] lg:w-[160px] lg:h-[160px]'>
          <Image
            src={preview}
            alt='preview'
            width={isTablet ? 346 : 160}
            height={isTablet ? 346 : 160}
            className='object-cover object-center aspect-[1/1] rounded-[12px] transition-transform duration-300'
          />
          <Image
            src='/assets/icons/delete/ico-delete-image.svg'
            alt='delete'
            width={24}
            height={24}
            className='absolute top-[8px] right-[8px] cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              if (onFileChange) onFileChange(null);
              else setFile(null);
            }}
          />
        </div>
      ) : (
        <div
          onClick={handleDivClick}
          className='flex flex-col items-center justify-center w-[160px] h-[160px] md:w-[346px] md:h-[346px] lg:w-[160px] lg:h-[160px] gap-[8px] border border-[2px] border-dashed border-gray-300 rounded-[12px] cursor-pointer'
        >
          <Image src='/assets/icons/ico-plus.svg' alt='upload' width={48} height={48} />
          <p className='text-md font-medium text-gray-500'>이미지 업로드</p>
        </div>
      )}
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleChange}
      />
    </div>
  );
}
