'use client';
import { useEffect, useRef, useState } from 'react';
// import UploadImg from '@/public/assets/icons/account/upload-btn.svg';
import defaultImg from '@/public/assets/icons/account/default-img.png';
import Image from 'next/image';
import { useMyInfoQuery } from '@/src/hooks/user/useMyInfoQuery';
import { useUploadProfileImageMutation } from '@/src/hooks/user';
import { useUpdateMyInfoMutation } from '@/src/hooks/user';
import { createPortal } from 'react-dom';
import { useUIStore } from '@/src/store/uiStore';

const UploadImg = ({
  className,
  onClick,
  ...rest
}: {
  className?: string;
  onClick?: () => void;
  rest?: React.SVGProps<SVGSVGElement>;
}) => {
  return (
    <svg
      width='44'
      height='44'
      viewBox='0 0 44 44'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className} fill-gray-800 dark:fill-white`}
      onClick={onClick}
      {...rest}
    >
      <rect
        className='stroke-white dark:stroke-gray-800'
        x='2.0249'
        y='2'
        width='39.2'
        height='39.2'
        rx='19.6'
        strokeWidth='4'
      />
      <path
        d='M20.6252 17.4245L15.7252 22.3245C15.5252 22.5245 15.2919 22.6205 15.0252 22.6125C14.7585 22.6045 14.5252 22.5001 14.3252 22.2995C14.1419 22.0995 14.0459 21.8661 14.0372 21.5995C14.0285 21.3328 14.1245 21.0995 14.3252 20.8995L20.9252 14.2995C21.0252 14.1995 21.1335 14.1285 21.2502 14.0865C21.3669 14.0445 21.4919 14.0241 21.6252 14.0255C21.7585 14.0268 21.8835 14.0478 22.0002 14.0885C22.1169 14.1291 22.2252 14.1998 22.3252 14.3005L28.9252 20.9005C29.1085 21.0838 29.2002 21.3131 29.2002 21.5885C29.2002 21.8638 29.1085 22.1011 28.9252 22.3005C28.7252 22.5005 28.4875 22.6005 28.2122 22.6005C27.9369 22.6005 27.6995 22.5005 27.5002 22.3005L22.6252 17.4245L22.6252 28.5995C22.6252 28.8828 22.5292 29.1205 22.3372 29.3125C22.1452 29.5045 21.9079 29.6001 21.6252 29.5995C21.3425 29.5988 21.1049 29.5028 20.9122 29.3115C20.7195 29.1201 20.6239 28.8828 20.6252 28.5995L20.6252 17.4245Z'
        className='fill-white dark:fill-gray-900'
      />
    </svg>
  );
};

export default function ProfileItem() {
  const { setPreventBodyScroll } = useUIStore();
  const { data: user, isLoading } = useMyInfoQuery();
  const { mutateAsync: uploadProfileImg, isPending: isUploading } = useUploadProfileImageMutation();
  const { mutateAsync: updateMyInfo, isPending: isPatching } = useUpdateMyInfoMutation();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 업로드 버튼 클릭
  const handleUploadClick = () => {
    if (isUploading || isPatching) return;
    fileInputRef.current?.click();
  };

  // 파일 업로드 처리
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      // 미리보기(로컬) 먼저 세팅
      const reader = new FileReader();
      reader.onload = (event) => {
        setLocalPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      // 1. 이미지 업로드 (POST)
      const uploadResult = await uploadProfileImg(file);

      // 2. PATCH profileImageUrl 업데이트
      await updateMyInfo({ profileImageUrl: uploadResult.profileImageUrl });

      // 3. react-query가 알아서 useMyInfoQuery 쿼리 invalidate 함!
      setTimeout(() => setLocalPreview(null), 500); // 잠깐 프리뷰 보여주고 동기화
    } catch (error: unknown) {
      let msg = '이미지 업로드에 실패했습니다.';
      if (error instanceof Error) msg = error.message;
      alert(msg);
      setLocalPreview(null);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // 이미지 클릭: 프리뷰 오픈
  const handleImageClick = () => {
    if (user?.profileImageUrl || localPreview) setPreviewOpen(true);
  };

  // 프리뷰 닫기
  const handlePreviewClose = () => setPreviewOpen(false);

  // 프리뷰 스크롤 방지
  useEffect(() => {
    setPreventBodyScroll(previewOpen);
    return () => setPreventBodyScroll(false);
  }, [previewOpen]);

  // 로딩/에러 처리
  if (isLoading) {
    return (
      <div className='flex flex-col gap-[12px] items-center justify-center w-full px-8 py-6 rounded-[20px] bg-white dark:bg-gray-800 shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)] dark:shadow-[0px_4px_40px_0px_rgba(0,0,0,0.30)]'>
        <div className='w-[128px] h-[128px] bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse'></div>
        <div className='flex flex-col items-center justify-center gap-[8px]'>
          <div className='w-[120px] h-[24px] bg-gray-200 dark:bg-gray-600 rounded animate-pulse'></div>
          <div className='w-[160px] h-[20px] bg-gray-200 dark:bg-gray-600 rounded animate-pulse'></div>
        </div>
      </div>
    );
  }
  if (!user) {
    return (
      <div className='flex flex-col gap-[12px] items-center justify-center w-full px-8 py-6 rounded-[20px] bg-white dark:bg-gray-800 shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)] dark:shadow-[0px_4px_40px_0px_rgba(0,0,0,0.30)]'>
        <p className='text-red-600 dark:text-red-400'>사용자 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  // 프로필 이미지 보여줄 우선순위: 업로드 프리뷰 > 서버에서 받은 이미지 > 디폴트
  const imgSrc = localPreview || user.profileImageUrl || defaultImg;

  return (
    <div className='flex flex-col gap-[12px] items-center justify-center w-full px-8 py-[22px] rounded-[20px] bg-white dark:bg-gray-800 shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)] dark:shadow-[0px_4px_40px_0px_rgba(0,0,0,0.30)]'>
      <div className='relative w-fit'>
        <Image
          src={imgSrc}
          alt='프로필 사진'
          width={128}
          height={128}
          className='rounded-full object-cover object-center aspect-[1/1] cursor-pointer'
          onClick={handleImageClick}
        />
        <div className='relative'>
          <UploadImg
            className={`w-[36px] h-[36px] absolute right-0 bottom-0 rounded-full cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label='프로필 이미지 업로드'
            onClick={handleUploadClick}
          />
          {(isUploading || isPatching) && (
            <div className='absolute right-0 bottom-0 w-[36px] h-[36px] rounded-full bg-black bg-opacity-20 flex items-center justify-center'>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleFileChange}
          disabled={isUploading || isPatching}
        />
      </div>
      <div className='flex flex-col items-center justify-center gap-[8px]'>
        <span className='text-xl font-semibold text-gray-800 dark:text-gray-200 leading-none'>
          {user.nickname}
        </span>
        <p className='text-lg font-regular text-gray-600 dark:text-gray-400 leading-none'>
          {user.email}
        </p>
      </div>

      {/* 미리보기 모달 */}
      {previewOpen &&
        imgSrc &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className='fixed inset-0 bg-black bg-opacity-60 dark:bg-black dark:bg-opacity-80 flex items-center justify-center z-[999]'
            onClick={handlePreviewClose}
          >
            <div className='relative' onClick={(e) => e.stopPropagation()}>
              <Image
                src={imgSrc}
                alt='프로필 미리보기'
                width={320}
                height={320}
                className='rounded-[20px]'
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
