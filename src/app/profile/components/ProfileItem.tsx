'use client';
import { useRef, useState, useEffect } from 'react';
import UploadImg from '@/public/assets/icons/account/upload-btn.svg';
import defaultImg from '@/public/assets/icons/account/default-img.png';
import Image from 'next/image';
import { User } from '@/src/types/user.types';

export default function ProfileItem() {
  const [user, setUser] = useState<User | null>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users/me');

      if (!response.ok) {
        throw new Error('사용자 정보를 가져오는데 실패했습니다.');
      }

      const userData: User = await response.json();
      setUser(userData);

      // 프로필 이미지 설정 (서버에서 가져온 이미지 우선)
      if (userData.profileImageUrl) {
        setProfileImg(userData.profileImageUrl);
      }
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 사용자 정보 가져오기
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleUploadClick = () => {
    if (isUploading) return; // 업로드 중이면 클릭 무시
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // 1. 미리보기용 로컬 이미지 설정
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImg(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      // 2. 서버에 이미지 업로드
      const formData = new FormData();
      formData.append('image', file); // API에 맞는 필드명 사용

      const uploadResponse = await fetch('/api/users/me/image', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }

      const uploadResult = await uploadResponse.json();

      // 3. 업로드된 이미지 URL을 사용자 정보에 반영
      const updateResponse = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileImageUrl: uploadResult.profileImageUrl || uploadResult.imageUrl, // API 응답에 따라 조정
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('프로필 이미지 업데이트에 실패했습니다.');
      }

      const updatedUser: User = await updateResponse.json();
      setUser(updatedUser);
      setProfileImg(updatedUser.profileImageUrl || null);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert(error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.');

      // 실패 시 원래 이미지로 복원
      setProfileImg(user?.profileImageUrl || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageClick = () => {
    if (profileImg) setPreviewOpen(true);
  };

  const handlePreviewClose = () => setPreviewOpen(false);

  // 로딩 중 표시
  if (loading) {
    return (
      <div className='flex flex-col gap-[12px] items-center justify-center w-full px-8 py-6 rounded-[20px] bg-white shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)]'>
        <div className='w-[128px] h-[128px] bg-gray-200 rounded-full animate-pulse'></div>
        <div className='flex flex-col items-center justify-center gap-[8px]'>
          <div className='w-[120px] h-[24px] bg-gray-200 rounded animate-pulse'></div>
          <div className='w-[160px] h-[20px] bg-gray-200 rounded animate-pulse'></div>
        </div>
      </div>
    );
  }

  // 사용자 정보가 없는 경우
  if (!user) {
    return (
      <div className='flex flex-col gap-[12px] items-center justify-center w-full px-8 py-6 rounded-[20px] bg-white shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)]'>
        <p className='text-red-600'>사용자 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-[12px] items-center justify-center w-full px-8 py-[22px] rounded-[20px] bg-white shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)]'>
      <div className='relative w-fit'>
        <Image
          src={profileImg || defaultImg}
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
          {isUploading && (
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
          disabled={isUploading}
        />
      </div>
      <div className='flex flex-col items-center justify-center gap-[8px]'>
        <span className='text-xl font-semibold text-gray-800 leading-none'>{user.nickname}</span>
        <p className='text-lg font-regular text-gray-600 leading-none'>{user.email}</p>
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
