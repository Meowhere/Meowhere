'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DropdownMenu from '@/src/components/common/dropdowns/DropdownMenu';
import { DropdownItemButton } from '@/src/types/dropdown.types';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

interface Props {
  dropdownItems: DropdownItemButton[];
  bottomSheetTitle: string;
  trigger: React.ReactNode;
}

export default function ActivityDropdown({ dropdownItems, bottomSheetTitle, trigger }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    const close = () => setIsOpen(false);
    if (isOpen) document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [isOpen]);

  return (
    <div className='relative z-50' onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className='flex items-center justify-center p-0 leading-none'
      >
        {trigger}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className='absolute top-[36px] right-0 min-w-[160px]'
          >
            <DropdownMenu
              items={dropdownItems}
              bottomSheetTitle={bottomSheetTitle}
              isMobile={isMobile}
              onClose={() => setIsOpen(false)}
              bottomButton={{
                label: '취소',
                onClick: () => setIsOpen(false),
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
