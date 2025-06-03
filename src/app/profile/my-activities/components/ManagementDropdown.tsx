import React from 'react';

interface ManagementDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isDesktop?: boolean;
}

export default function ManagementDropdown({
  isOpen,
  onClose,
  onEdit,
  onDelete,
  isDesktop = true,
}: ManagementDropdownProps) {
  if (!isOpen) return null;

  // 데스크탑: 드롭다운, 모바일: 모달 등 분기
  if (isDesktop) {
    return (
      <div className='absolute top-full right-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-xl z-30 overflow-hidden'>
        <button
          className='w-full text-sm text-gray-800 px-4 py-3 text-center hover:bg-gray-100'
          onClick={onEdit}
        >
          수정하기
        </button>
        <button
          className='w-full text-sm text-red-500 px-4 py-3 text-center hover:bg-gray-100'
          onClick={onDelete}
        >
          삭제
        </button>
      </div>
    );
  }

  // 모바일: 모달(예시)
  return (
    <div className='fixed inset-0 z-50 flex items-end bg-black/30' onClick={onClose}>
      <div className='w-full bg-white rounded-t-xl p-4' onClick={(e) => e.stopPropagation()}>
        <button
          className='w-full text-sm text-gray-800 px-4 py-3 text-center hover:bg-gray-100'
          onClick={onEdit}
        >
          수정하기
        </button>
        <button
          className='w-full text-sm text-red-500 px-4 py-3 text-center hover:bg-gray-100'
          onClick={onDelete}
        >
          삭제
        </button>
        <button className='w-full text-sm text-gray-500 px-4 py-3 text-center' onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}
