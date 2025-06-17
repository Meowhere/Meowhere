'use client';
import { useRef, useState } from 'react';
import UploadImg from '@/public/assets/icons/account/upload-btn.svg';
import defaultImg from '@/public/assets/icons/account/default-img.png';
import Image from 'next/image';
import { useMyInfoQuery } from '@/src/hooks/user/useMyInfoQuery';
import { useUploadProfileImageMutation } from '@/src/hooks/user';
import { useUpdateMyInfoMutation } from '@/src/hooks/user';

export default function ProfileItem() {
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
      {previewOpen && imgSrc && (
        <div
          className='fixed inset-0 bg-black bg-opacity-60 dark:bg-black dark:bg-opacity-80 flex items-center justify-center z-50'
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
        </div>
      )}
    </div>
  );
}
