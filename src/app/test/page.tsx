'use client';
import { useModal } from '@/src/hooks/useModal';

export default function ModalTest() {
  const { openModal, confirm, alert, openBottomSheet } = useModal();

  const handleCustomModal = () => {
    openModal({
      title: '사용자 정보',
      size: 'desktop',
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
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
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
  return <button onClick={handleCustomModal}>modal</button>;
}
