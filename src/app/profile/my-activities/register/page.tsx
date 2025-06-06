'use client';
import UploadImg from './components/UploadImg';
import UploadImgList from './components/UploadImgList';
import { useGnb } from '@/src/hooks/useGnb';
// import { useGnbStore } from '@/src/store/gnbStore';
import { useRouter } from 'next/navigation';
import RegisterForm from './components/RegisterForm';

export default function RegisterPage() {
  const router = useRouter();

  useGnb({
    title: '내 체험 등록',
    subtitle: '',
    backAction: () => router.back(),
    rightButtons: [],
  });

  return (
    <div className='flex flex-col gap-[48px] px-[24px] py-[96px]'>
      <div className='flex flex-col gap-[20px]'>
        <p className='text-xl font-semibold text-gray-800'>메인 이미지</p>
        <UploadImg />
      </div>
      <div className='flex flex-col gap-[20px]'>
        <p className='text-xl font-semibold text-gray-800'>소개 이미지</p>
        <UploadImgList />
      </div>
      <div className='flex flex-col gap-[20px]'>
        <p className='text-xl font-semibold text-gray-800'>체험 정보</p>
        <RegisterForm />
      </div>
      <div>
        <p className='text-xl font-semibold text-gray-800'>체험 일정</p>
      </div>
    </div>
  );
}
