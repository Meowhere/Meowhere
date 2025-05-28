'use client';
import { useModal } from '@/src/hooks/useModal';

export default function ModalTest() {
  const { openModal, review, confirm, openBottomSheet, closeModal } =
    useModal();

  const handleCustomModal = () => {
    openModal({
      onClose: () => {
        closeModal;
      },
      children: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">이름</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="이름을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">이메일</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              취소
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              저장
            </button>
          </div>
        </div>
      ),
    });
  };

  const handleBottomSheet = () => {
    openBottomSheet({
      height: 'auto',
      children: (
        <div className="space-y-2">
          <button className="w-full text-left p-3 hover:bg-gray-100 rounded-md transition-colors">
            📷 사진 촬영
          </button>
          <button className="w-full text-left p-3 hover:bg-gray-100 rounded-md transition-colors">
            🖼️ 갤러리에서 선택
          </button>
          <button className="w-full text-left p-3 hover:bg-gray-100 rounded-md transition-colors">
            📁 파일에서 선택
          </button>
          <hr className="my-2" />
          <button className="w-full text-left p-3 hover:bg-gray-100 rounded-md transition-colors text-red-600">
            🗑️ 삭제
          </button>
        </div>
      ),
    });
  };

  const handleConfirm = () => {
    confirm({
      message: '예약을 취소하시겠어요?',
      onConfirm: () => {
        console.log('취소됨');
      },
    });
  };

  const handleReview = () => {
    review({
      title: '후기 작성',
      content: '함께 배우면 즐거운 스트릿 댄스',
      onConfirm: () => {
        console.log('취소됨');
      },
      onClose: () => closeModal,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center gap-10">
      <button className="p-[1rem] border-2" onClick={handleCustomModal}>
        일반 모달
      </button>
      <button className="p-[1rem] border-2" onClick={handleReview}>
        후기 모달
      </button>
      <button className="p-[1rem] border-2" onClick={handleBottomSheet}>
        바텀 시트
      </button>
      <button className="p-[1rem] border-2" onClick={handleConfirm}>
        확인 모달
      </button>
    </div>
  );
}
