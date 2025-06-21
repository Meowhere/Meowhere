'use client';
import AuthModal from '@/src/components/common/modals/AuthModal';
import { useGnb } from '@/src/hooks/useGnb';
import { useRouter } from 'next/navigation';

export default function Account() {
  const router = useRouter();
  useGnb({ title: '계정', backAction: () => router.push('/') });
  return (
    <div className='min-h-screen flex flex-col items-center mt-[100px] text-lg p-[16px]'>
      <div className='w-full md:max-w-[480px] border-2 dark:border-gray-700 p-[24px] rounded-[20px]'>
        <AuthModal />
      </div>
    </div>
  );
}
