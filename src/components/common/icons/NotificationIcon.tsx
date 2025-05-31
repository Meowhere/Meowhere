import { NotificationIconProps } from '@/src/types/icon.types';
import React from 'react';

export default React.memo(function NotificationIcon({
  size = 24,
  ariaLabel = '알림',
  ariaHidden = false,
  hasBadge = false,
  backgroundColor = 'white',
  ...rest
}: NotificationIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      {...rest}
    >
      <title>{ariaLabel}</title>
      <path
        d='M14.4375 17.6875C14.4375 18.334 14.1807 18.9539 13.7236 19.4111C13.2665 19.8682 12.6465 20.125 12 20.125C11.3536 20.125 10.7336 19.8682 10.2765 19.4111C9.81934 18.9539 9.56254 18.334 9.56254 17.6875M12.5858 6.31495L11.3947 6.31251C8.67773 6.30601 6.31904 8.51357 6.30036 11.1875V14.2669C6.30036 14.9088 6.21911 15.5352 5.86892 16.069L5.63573 16.4249C5.28067 16.9644 5.66254 17.6875 6.30036 17.6875H17.6997C18.3375 17.6875 18.7186 16.9644 18.3643 16.4249L18.1311 16.069C17.7818 15.5352 17.6997 14.9079 17.6997 14.2661V11.1883C17.6672 8.51357 15.3028 6.32145 12.5858 6.31495Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 3.875C12.431 3.875 12.8443 4.0462 13.149 4.35095C13.4538 4.6557 13.625 5.06902 13.625 5.5V6.3125H10.375V5.5C10.375 5.06902 10.5462 4.6557 10.851 4.35095C11.1557 4.0462 11.569 3.875 12 3.875Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      {hasBadge && (
        <circle
          cx='18.5'
          cy='7'
          r='4'
          stroke={backgroundColor}
          strokeWidth='1.5'
          className='fill-primary-300'
        />
      )}
    </svg>
  );
});
