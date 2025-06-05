'use client';
import { useConfirmModal } from '@/src/hooks/useConfirmModal';
import { useModal } from '@/src/hooks/useModal';

export default function ModalTest() {
  const { openAuthModal, openCreateReviewModal, openBottomSheetModal, openReservationModal } =
    useModal();
  const { openConfirmModal, ConfirmModal } = useConfirmModal();

  // 후기 모달 예시
  const handleCreateReview = () => {
    openCreateReviewModal({
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

  // 예약 정보 모달 예시
  const handleReservation = () => {
    openReservationModal({
      // 필요한 프롭들...
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
      message: '예약을 승인할까요?',
      onConfirm: () => {
        console.log('승인!');
      },
    });
  };

  // 인증 모달 예시
  const handleAuthModal = () => {
    openAuthModal();
  };

  return (
    <div className='min-h-screen flex items-center justify-center gap-10 bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 text-lg'>
      <button className='p-[1rem] border-2' onClick={handleCreateReview}>
        후기 모달
      </button>
      <button className='p-[1rem] border-2' onClick={handleReservation}>
        예약 정보 모달
      </button>
      <button className='p-[1rem] border-2' onClick={handleBottomSheet}>
        바텀 시트
      </button>
      <button className='p-[1rem] border-2' onClick={handleConfirm}>
        확인 모달
      </button>
      <button className='p-[1rem] border-2' onClick={handleAuthModal}>
        인증 모달
      </button>
      <ConfirmModal />
    </div>
  );
}
