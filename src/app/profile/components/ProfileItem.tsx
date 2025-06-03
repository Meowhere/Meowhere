'use client';
import UploadImg from '@/public/assets/icons/account/upload-btn.svg';
import defaultImg from '@/public/assets/icons/account/default-img.png';
import Image from 'next/image';

export default function ProfileItem() {
  return (
    <div className='flex flex-col gap-[12px] items-center justify-center w-full px-8 py-6 rounded-[20px] bg-white shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)]'>
      <div className='relative w-fit'>
        <Image src={defaultImg} alt='프로필 사진' className='w-[128px] h-[128px] rounded-full' />
        <button className='absolute right-0 bottom-0 rounded-full'>
          <UploadImg className='w-[36px] h-[36px]' alt='프로필 이미지 업로드' />
        </button>
      </div>
      <div className='flex flex-col items-center justify-center gap-[8px]'>
        <h2 className='text-xl font-semibold text-gray-800'>사용자 이름</h2>
        <p className='text-lg font-regular text-gray-600'>사용자 이메일</p>
      </div>
    </div>
  );
}
