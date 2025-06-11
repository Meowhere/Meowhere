'use client';

import { useState } from 'react';
import DropdownMenu from '@/src/components/common/dropdowns/DropdownMenu';
import { DropdownItemButton, DropdownItemData } from '@/src/types/dropdown-menu.types';

export default function DropdownMenuTestPage() {
  const [isOpen, setIsOpen] = useState(true);

  const handleAction = (label: string) => {
    console.log('선택된 값:', label);
  };

  const commonItems: DropdownItemData[] = [
    { type: 'button', label: '예약 완료', onClick: () => {} },
    { type: 'button', label: '예약 승인', onClick: () => {} },
    { type: 'button', label: '예약 취소', onClick: () => {} },
    { type: 'button', label: '예약 거절', onClick: () => {} },
    { type: 'button', label: '체험 완료', onClick: () => {} },
  ];

  return (
    <div className='flex flex-col gap-10 p-10 bg-gray-50 min-h-screen'>
      <h1 className='text-2xl font-bold'>DropdownMenu Test Page</h1>

      {/* 1. Desktop - 버튼만 */}
      <div>
        <h2 className='font-semibold mb-2'>1. Desktop - 버튼만</h2>
        <DropdownMenu items={commonItems} onItemClick={handleAction} onClose={() => {}} />
      </div>

      {/* 2. Desktop - 링크 + 버튼 */}
      <div>
        <h2 className='font-semibold mb-2'>2. Desktop - 링크 + 버튼</h2>
        <DropdownMenu
          items={[
            { type: 'link', label: '수정하기', href: '/edit' },
            { type: 'button', label: '삭제', onClick: () => {}, isDanger: true },
          ]}
          onItemClick={handleAction}
          onClose={() => {}}
        />
      </div>

      {/* 3. Mobile - 타이틀 + 버튼 + 하단 취소 */}
      <div>
        <h2 className='font-semibold mb-2'>3. Mobile - 타이틀 + 취소 버튼</h2>
        <DropdownMenu
          isMobile
          title='체험 상태'
          items={commonItems}
          bottomButton={{
            type: 'button',
            label: '취소',
            onClick: () => setIsOpen(false),
          }}
          onItemClick={(label) => {
            handleAction(label);
            setIsOpen(false);
          }}
          onClose={() => setIsOpen(false)}
        />
      </div>

      {/* 4. Mobile - 링크 포함 + 삭제 버튼 */}
      {/* <div>
        <h2 className='font-semibold mb-2'>4. Mobile - 링크 포함 + 삭제 버튼</h2>
        <DropdownMenu
          isMobile
          title='함께 배우면 즐거운 스트릿 댄스'
          items={[
            { type: 'link', label: '수정하기', href: '/edit' },
            { type: 'button', label: '삭제', onClick: () => {}, isDanger: true },
          ]}
          bottomButton={{
            type: 'button',
            label: '취소',
            onClick: () => alert('닫기'),
          }}
          onItemClick={handleItemClick}
          onClose={() => {}}
        />
      </div> */}

      {/* 5. Mobile - 게시글 dropdown */}
      {/* <div>
        <h2 className='font-semibold mb-2'>5. Mobile - 게시글 dropdown</h2>
        <DropdownMenu
          isMobile
          title='게시물 관리'
          items={[
            { type: 'link', label: '게시물 수정', href: '/edit' },
            { type: 'button', label: '게시물 삭제', onClick: () => {}, isDanger: true },
          ]}
          bottomButton={{
            type: 'button',
            label: '취소',
            onClick: () => alert('취소'),
          }}
          onItemClick={handleItemClick}
          onClose={() => {}}
        />
      </div> */}
    </div>
  );
}
