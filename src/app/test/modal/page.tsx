'use client';
import { useModal } from '@/src/hooks/useModal';

export default function ModalTest() {
  const { openReviewModal, openConfirmModal, openBottomSheetModal } = useModal();

  // 후기 모달 예시
  const handleReview = () => {
    openReviewModal({
      title: '함께 배우면 즐거운 스트릿 댄스',
      schedule: { id: 1, date: '', startTime: '', endTime: '' },
      headCount: 12,
      price: 100000,
      rating: 3,
      onConfirm: () => {
        console.log('작성하기 함수 코드');
      },
    });
  };

  // 바텀 시트 예시
  const handleBottomSheet = () => {
    openBottomSheetModal({
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
    openConfirmModal({
      message: '예약을 취소하시겠어요? ', // 모달 창 메세지
      confirmText: '예약 취소', // 확인 버튼 이름
      cancelText: '아니요', // 취소 버튼 이름
      onConfirm: () => {
        // 필요 함수
        console.log('예약 취소됨');
      },
    });
  };

  return (
    <div className='min-h-screen flex items-center justify-center gap-10 bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 text-lg'>
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
