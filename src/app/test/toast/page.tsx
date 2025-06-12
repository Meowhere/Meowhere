'use client';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import { useToastStore } from '@/src/store/toastStore';

export default function ToastTestPage() {
  const { showToast } = useToastStore();
  return (
    <div className='min-h-screen flex justify-center items-center text-lg'>
      <div className='flex gap-[16px]'>
        <div>
          <BaseButton onClick={() => showToast('success', '체험 등록이 완료되었습니다')}>
            성공
          </BaseButton>
        </div>
        <div>
          <BaseButton onClick={() => showToast('error', '체험 등록이 실패했습니다')}>
            실패
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
