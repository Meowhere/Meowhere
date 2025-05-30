'use client';

import { useState } from 'react';
import DropdownMenu from '../../../components/common/dropdowns/dropdown-menu/DropdownMenu';
import {
  DROPDOWN_ITEM_TYPES,
  RESERVATION_STATUS_LABELS,
} from '../../../constants/dropdown';

export default function DropdownTestPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex flex-col gap-10 p-10 bg-gray-50 min-h-screen'>
      <h1 className='text-2xl font-bold'>DropdownAnimation Test</h1>

      {/* DrowndownTrigger Button */}
      <div className='relative'>
        <h2 className='font-semibold mb-2'>DrowndownTrigger Button</h2>
        <button
          className='inline-block mx-auto w-full border border-black'
          onClick={handleButtonClick}
        >
          드롭다운 버튼
        </button>
        <DropdownMenu
          isOpen={isOpen}
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
    </div>
  );
}
