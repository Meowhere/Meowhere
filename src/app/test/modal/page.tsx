'use client';
import { useModal } from '@/src/hooks/useModal';

export default function ModalTest() {
  const { review, confirm, openBottomSheet, closeModal } = useModal();

  // 후기 모달 예시
  const handleReview = () => {
    review({
      title: '함께 배우면 즐거운 스트릿 댄스',
      schedules: null,
      headCount: 12,
      price: 100000,
      onConfirm: () => {
        console.log('취소됨');
        closeModal();
      },
    });
  };

  // 바텀 시트 예시
  const handleBottomSheet = () => {
    openBottomSheet({
      height: 'auto',
      children: (
        <div className='space-y-2'>
          <button className='w-full text-left p-3 hover:bg-gray-100 rounded-md transition-colors'>
            📷 사진 촬영
          </button>
          <button className='w-full text-left p-3 hover:bg-gray-100 rounded-md transition-colors'>
            🖼️ 갤러리에서 선택
          </button>
          <button className='w-full text-left p-3 hover:bg-gray-100 rounded-md transition-colors'>
            📁 파일에서 선택
          </button>
          <hr className='my-2' />
          <button className='w-full text-left p-3 hover:bg-gray-100 rounded-md transition-colors text-red-600'>
            🗑️ 삭제
          </button>
        </div>
      ),
    });
  };

  // 확인 모달 예시
  const handleConfirm = () => {
    confirm({
      message: '예약을 취소하시겠어요?',
      onConfirm: () => {
        console.log('취소됨');
      },
    });
  };

  return (
    <div className='min-h-screen flex items-center justify-center gap-10 bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300'>
      <button className='p-[1rem] border-2' onClick={handleReview}>
        후기 모달
      </button>
      <button className='p-[1rem] border-2' onClick={handleBottomSheet}>
        바텀 시트
      </button>
      <button className='p-[1rem] border-2' onClick={handleConfirm}>
        확인 모달
      </button>
    </div>
  );
}
