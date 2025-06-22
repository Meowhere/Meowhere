import { useUploadActivityImageMutation } from '@/src/hooks/useUploadActivityImageMutation';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useToastStore } from '@/src/store/toastStore';

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
  const { showToast } = useToastStore();

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

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0] ?? null;
    if (!newFile) {
      return;
    }

    // 파일 크기 체크 (예: 5MB)
    if (newFile.size > 5 * 1024 * 1024) {
      showToast('error', '파일 크기는 5MB를 초과할 수 없습니다.');
      return;
    }

    // 파일 타입 체크
    if (!newFile.type.startsWith('image/')) {
      showToast('error', '이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    setFile(newFile);
    onFileChange?.(newFile);

    if (newFile && isBanner) {
      try {
        const url = await uploadActivityImage.mutateAsync({ file: newFile });
        setValue('bannerImageUrl', url);
        setPreview(url);
      } catch (error) {
        showToast('error', '이미지 업로드에 실패했습니다.');
        console.error('이미지 업로드 에러:', error);
        setFile(null);
        setPreview(defaultImage ?? null);
      }
    }
  };

  const handleDelete = () => {
    setFile(null);
    setPreview(null);
    onFileChange?.(null);
    if (isBanner) {
      setValue('bannerImageUrl', '');
    }
    if (inputRef.current) {
      inputRef.current.value = '';
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
