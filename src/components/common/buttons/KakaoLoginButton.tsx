'use Client';

type KakaoLoginButtonProps = {
  onClick: () => void;
  className?: string;
};

export default function KakaoLoginButton({
  onClick,
  className = '',
}: KakaoLoginButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`relative w-[400px] h-[48px] px-4 border rounded-[10px] text-gray-600 border-gray-400 font-medium ${className}`}
      aria-label='카카오 로그인'
    >
      <div className='absolute left-4 top-1/2 -translate-y-1/2'>
        <img
          src='/assets/icons/login-kakao.svg'
          alt='카카오 아이콘'
          className='w-5 h-5'
        />
      </div>
      <span className='block text-center w-full'>카카오로 로그인</span>
    </button>
  );
}
