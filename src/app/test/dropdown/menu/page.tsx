'use client';

import { useState } from 'react';
import DropdownMenu from '../../../../components/common/dropdowns/dropdown-menu/DropdownMenu';
import {
  DROPDOWN_ITEM_TYPES,
  RESERVATION_STATUS_LABELS,
  POST_ACTION_LABELS,
} from '../../../../constants/dropdown';

export default function DropdownMenuTestPage() {
  return (
    <div className="flex flex-col gap-10 p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">DropdownMenu Test Cases</h1>

      {/* 1. Desktop - 버튼만 */}
      <div>
        <h2 className="font-semibold mb-2">1. Desktop - 버튼만</h2>
        <DropdownMenu
          items={[
            {
              type: DROPDOWN_ITEM_TYPES.BUTTON,
              label: RESERVATION_STATUS_LABELS.COMPLETED,
              onClick: () => {},
            },
            {
              type: DROPDOWN_ITEM_TYPES.BUTTON,
              label: RESERVATION_STATUS_LABELS.APPROVED,
              onClick: () => {},
            },
            {
              type: DROPDOWN_ITEM_TYPES.BUTTON,
              label: RESERVATION_STATUS_LABELS.CANCELED,
              onClick: () => {},
            },
            {
              type: DROPDOWN_ITEM_TYPES.BUTTON,
              label: RESERVATION_STATUS_LABELS.REJECTED,
              onClick: () => {},
            },
            {
              type: DROPDOWN_ITEM_TYPES.BUTTON,
              label: RESERVATION_STATUS_LABELS.EXPERIENCE_COMPLETED,
              onClick: () => {},
            },
          ]}
        />
      </div>

      {/* 2. Desktop - 링크 + 버튼 */}
      <div>
        <h2 className="font-semibold mb-2">2. Desktop - 링크 + 버튼</h2>
        <DropdownMenu
          items={[
            {
              type: DROPDOWN_ITEM_TYPES.LINK,
              label: POST_ACTION_LABELS.EDIT,
              href: '/page',
            },
            {
              type: DROPDOWN_ITEM_TYPES.BUTTON,
              label: POST_ACTION_LABELS.DELETE,
              onClick: () => {},
              isDelete: true,
            },
          ]}
        />
      </div>

      {/* 3. Mobile - title + 버튼 리스트 + 하단 취소 버튼 */}
      <div>
        <h2 className="font-semibold mb-2">3. Mobile - 타이틀 + 취소 버튼</h2>
        <DropdownMenu
          isMobile
          title="체험 상태"
          items={[
            {
              type: DROPDOWN_ITEM_TYPES.BUTTON,
              label: RESERVATION_STATUS_LABELS.COMPLETED,
              onClick: () => {},
            },
            {
              type: DROPDOWN_ITEM_TYPES.BUTTON,
              label: RESERVATION_STATUS_LABELS.APPROVED,
              onClick: () => {},
            },
            {
              type: DROPDOWN_ITEM_TYPES.BUTTON,
              label: RESERVATION_STATUS_LABELS.CANCELED,
              onClick: () => {},
            },
            {
              type: DROPDOWN_ITEM_TYPES.BUTTON,
              label: RESERVATION_STATUS_LABELS.REJECTED,
              onClick: () => {},
            },
            {
              type: DROPDOWN_ITEM_TYPES.BUTTON,
              label: RESERVATION_STATUS_LABELS.EXPERIENCE_COMPLETED,
              onClick: () => {},
            },
          ]}
          bottomButton={{
            type: DROPDOWN_ITEM_TYPES.BUTTON,
            label: POST_ACTION_LABELS.CANCEL,
            onClick: () => alert('취소'),
          }}
        />
      </div>

      {/* 4. Mobile - 링크 포함 + 하단 삭제 버튼 */}
      <div>
        <h2 className="font-semibold mb-2">
          4. Mobile - 링크 포함 + 삭제 버튼
        </h2>
        <DropdownMenu
          isMobile
          title="함께 배우면 즐거운 스트릿 댄스"
          items={[
            {
              type: DROPDOWN_ITEM_TYPES.LINK,
              label: POST_ACTION_LABELS.EDIT,
              href: '/page',
            },
            {
              type: DROPDOWN_ITEM_TYPES.BUTTON,
              label: POST_ACTION_LABELS.DELETE,
              onClick: () => {},
              isDelete: true,
            },
          ]}
          bottomButton={{
            type: DROPDOWN_ITEM_TYPES.BUTTON,
            label: POST_ACTION_LABELS.CANCEL,
            onClick: () => {},
          }}
        />
      </div>

      {/* 5. Mobile - 게시글 dropdown */}
      <div>
        <h2 className="font-semibold mb-2">5. Mobile - 게시글 dropdown</h2>
        <DropdownMenu
          isMobile
          title="게시물 관리"
          items={[
            {
              type: DROPDOWN_ITEM_TYPES.LINK,
              label: POST_ACTION_LABELS.EDIT,
              href: '/page',
            },
            {
              type: DROPDOWN_ITEM_TYPES.BUTTON,
              label: POST_ACTION_LABELS.DELETE,
              onClick: () => {},
              isDelete: true,
            },
          ]}
          bottomButton={{
            type: DROPDOWN_ITEM_TYPES.BUTTON,
            label: POST_ACTION_LABELS.CANCEL,
            onClick: () => {},
          }}
        />
      </div>
    </div>
  );
}
