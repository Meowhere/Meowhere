import { useUploadActivityImageMutation } from '@/src/hooks/useUploadActivityImageMutation';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

interface UploadImgProps {
  file?: File | null;
  defaultImage?: string;
  isBanner?: boolean;
  onFileChange?: (file: File | null) => void;
}

export default function UploadImg({
  file: fileProp,
  defaultImage,
  isBanner = false,
  onFileChange,
}: UploadImgProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(fileProp ?? null);
  const [preview, setPreview] = useState<string | null>(defaultImage ?? null);
  const uploadActivityImage = useUploadActivityImageMutation();
  const { setValue } = useFormContext();

  useEffect(() => {
    if (fileProp !== undefined) setFile(fileProp);
  }, [fileProp]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(defaultImage ?? null);
    }
  }, [file, defaultImage]);

  const handleDivClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0] ?? null;
    setFile(newFile);
    onFileChange?.(newFile);

    if (newFile && isBanner) {
      uploadActivityImage.mutate(
        { file: newFile },
        {
          onSuccess: (url) => {
            setValue('bannerImageUrl', url);
            setPreview(url);
          },
        }
      );
    }
  };

  const handleDelete = () => {
    setFile(null);
    setPreview(null);
    onFileChange?.(null);
    if (isBanner) {
      setValue('bannerImageUrl', '');
    }
  };

  return (
    <div className='flex'>
      {preview ? (
        <div className='relative w-full aspect-square lg:w-[160px] lg:h-[160px]'>
          <Image
            src={preview}
            alt='preview'
            fill
            className='object-cover object-center rounded-[12px] transition-transform duration-300'
          />
          <Image
            src='/assets/icons/delete/ico-delete-image.svg'
            alt='delete'
            width={24}
            height={24}
            className='absolute top-[8px] right-[8px] cursor-pointer'
            onClick={handleDelete}
          />
        </div>
      ) : (
        <div
          onClick={handleDivClick}
          className='flex flex-col items-center justify-center w-full h-full aspect-square max-x-full lg:w-[160px] lg:h-[160px] gap-[8px] border border-[2px] border-dashed border-gray-300 rounded-[12px] cursor-pointer'
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
