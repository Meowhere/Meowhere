'use client';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import AuthModal from '@/src/components/common/modals/AuthModal';
import { useModal } from '@/src/hooks/useModal';

export default function Account() {
  const { openAuthModal } = useModal();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-lg p-[16px]'>
      <div className='w-full md:max-w-[480px] border-2 p-[24px] rounded-[20px]'>
        <AuthModal />
      </div>
      <div className='absolute top-40'>
        <BaseButton onClick={openAuthModal}>테스트 로그인 모달</BaseButton>
      </div>
    </div>
  );
}
