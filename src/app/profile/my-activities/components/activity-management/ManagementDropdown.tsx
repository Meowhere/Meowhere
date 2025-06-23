import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import KebabButton from '@/src/components/common/buttons/KebabButton';
import DropdownMenu from '@/src/components/common/dropdowns/DropdownMenu';
import { DropdownItemButton } from '@/src/types/dropdown.types';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useConfirmModal } from '@/src/hooks/useConfirmModal';
import { useDeleteActivity } from '@/src/hooks/useDeleteActivity';
interface ManagementDropdownProps {
  title: string; // 체험 이름
  activityId: number | string; // 체험 항목 id
}

export default function ManagementDropdown({ title, activityId }: ManagementDropdownProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { isDesktop } = useBreakpoint();

  const { openConfirmModal, ConfirmModal } = useConfirmModal();
  const { mutate } = useDeleteActivity();

  const items: DropdownItemButton[] = [
    {
      label: '수정하기',
      onClick: () => {
        router.push(`/profile/my-activities/${activityId}/edit`);
        setOpen(false);
      },
    },
    {
      label: '삭제',
      isDanger: true,
      onClick: () => {
        openConfirmModal({
          message: '삭제할까요?',
          confirmText: '삭제',
          onConfirm: () => {
            mutate(activityId);
          },
        });
        setOpen(false);
      },
    },
  ];

  return (
    <div className='relative'>
      <KebabButton size={24} onToggle={() => setOpen((prev) => !prev)} />
      {open && (
        <div className='absolute right-0 top-[24px] z-50'>
          <DropdownMenu
            items={items}
            bottomSheetTitle={title}
            isMobile={!isDesktop}
            onClose={() => setOpen(false)}
            bottomButton={{
              label: '취소',
              onClick: () => {
                setOpen(false);
              },
            }}
          />
        </div>
      )}
      <ConfirmModal />
    </div>
  );
}
