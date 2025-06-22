'use client';

import KakaoLoginIcon from '../icons/KakaoIcon';

interface KakaoLoginButtonProps {
  onClick: () => void;
  className?: string;
}

export default function KakaoLoginButton({
  onClick,
  className = '',
  ...rest
}: KakaoLoginButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`relative h-[3rem] px-4 border dark:border-gray-700 rounded-[0.625rem] text-gray-600 dark:text-gray-200 font-medium text-center w-full ${className}`}
      aria-label='카카오 로그인'
      {...rest}
    >
      <div className='absolute left-4 top-1/2 -translate-y-1/2'>
        <KakaoLoginIcon size={24} className='text-gray-600 dark:text-gray-200' />
      </div>
      카카오로 로그인
    </button>
  );
}
