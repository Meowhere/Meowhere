'use client';
import AuthModal from '@/src/components/common/modals/AuthModal';

export default function Account() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-lg p-[16px]'>
      <div className='w-full md:max-w-[480px] border-2 p-[24px] rounded-[20px]'>
        <AuthModal />
      </div>
    </div>
  );
}
