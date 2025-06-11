'use client';
import RatingLabel from './RatingLabel';
import { MyActivitiesProps } from '@/src/types/my-activities.types';
import KebabButton from '@/src/components/common/buttons/KebabButton';
import DropdownMenu from '@/src/components/common/dropdowns/DropdownMenu';
import { useState } from 'react';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import Image from 'next/image';
import { DROPDOWN_ITEM_TYPES, POST_ACTION_LABELS } from '@/src/constants/dropdown';

export default function ManagementCard({
  title,
  bannerImageUrl,
  price,
  rating,
  ...rest
}: MyActivitiesProps) {
  const [open, setOpen] = useState(false);
  const { isDesktop } = useBreakpoint();

  return (
    <div className='flex justify-between border-b border-gray-200 last:border-b-0 py-[24px] w-full'>
      <div className='flex flex-row items-center justify-center gap-[10px] lg:gap-[14px]'>
        <Image
          src={bannerImageUrl}
          alt={title}
          width={isDesktop ? 98 : 84}
          height={isDesktop ? 98 : 84}
          className='rounded-[8px] lg:rounded-[10px] object-cover object-center aspect-[1/1]'
        />
        <div className='flex flex-col gap-[12px] lg:gap-[18px] lg:h-[98px]'>
          <RatingLabel rating={rating} />
          <div className='flex flex-col justify-between gap-[12px]'>
            <p className='text-lg font-semibold text-gray-800 leading-none'>{title}</p>
            <span className='text-sm font-regular text-gray-600 leading-none'>
              ₩{price.toLocaleString()} /인
            </span>
          </div>
        </div>
      </div>
      <div className='relative'>
        <KebabButton size={24} onToggle={() => setOpen((prev) => !prev)} />
        {open && (
          <div className='absolute left-[-140px] top-[-20px] z-10'>
            <DropdownMenu
              isOpen={open}
              isMobile={!isDesktop}
              title={title}
              items={[
                {
                  type: DROPDOWN_ITEM_TYPES.LINK,
                  label: POST_ACTION_LABELS.EDIT,
                  href: '/',
                },
                {
                  type: DROPDOWN_ITEM_TYPES.BUTTON,
                  label: POST_ACTION_LABELS.DELETE,
                  onClick: () => {},
                  isDanger: true,
                },
              ]}
              bottomButton={{
                type: DROPDOWN_ITEM_TYPES.BUTTON,
                label: POST_ACTION_LABELS.CANCEL,
                onClick: () => setOpen(false),
              }}
              onClose={() => setOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
