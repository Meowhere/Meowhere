'use client';
import { useRef, useState } from 'react';
import UploadImg from '@/public/assets/icons/account/upload-btn.svg';
import defaultImg from '@/public/assets/icons/account/default-img.png';
import Image from 'next/image';

export default function ProfileItem() {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImg(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (profileImg) setPreviewOpen(true);
  };

  const handlePreviewClose = () => setPreviewOpen(false);
  return (
    <div className='flex flex-col gap-[12px] items-center justify-center w-full px-8 py-6 rounded-[20px] bg-white shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)]'>
      <div className='relative w-fit'>
        <Image
          src={profileImg || defaultImg}
          alt='프로필 사진'
          width={128}
          height={128}
          className='rounded-full cursor-pointer'
          onClick={handleImageClick}
        />
        <UploadImg
          className='w-[36px] h-[36px] absolute right-0 bottom-0 rounded-full cursor-pointer'
          aria-label='프로필 이미지 업로드'
          onClick={handleUploadClick}
        />
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleFileChange}
        />
      </div>
      <div className='flex flex-col items-center justify-center gap-[8px]'>
        <h2 className='text-xl font-semibold text-gray-800 leading-none'>사용자 이름</h2>
        <p className='text-lg font-regular text-gray-600 leading-none'>user@email.com</p>
      </div>
      {/* 미리보기 모달 */}
      {previewOpen && profileImg && (
        <div
          className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50'
          onClick={handlePreviewClose}
        >
          <div className='relative' onClick={(e) => e.stopPropagation()}>
            <Image
              src={profileImg}
              alt='프로필 미리보기'
              width={320}
              height={320}
              className='rounded-[20px]'
            />
            <Image
              src='/assets/icons/delete/ico-delete-image.svg'
              alt='닫기'
              width={24}
              height={24}
              className='absolute top-[8px] right-[8px] cursor-pointer'
              onClick={handlePreviewClose}
            />
          </div>
        </div>
      )}
    </div>
  );
}
