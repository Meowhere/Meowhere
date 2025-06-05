import { useModal } from '@/src/hooks/useModal';
import CloseButton from '../buttons/CloseButton';
import Input from '../inputs/Input';
import BaseButton from '../buttons/BaseButton';
import KakaoLoginButton from '../buttons/KakaoLoginButton';
import { useState } from 'react';

const header = {
  login: '로그인',
  signup: '회원가입',
  default: '로그인 및 회원가입',
};

export default function AuthModal() {
  const { closeModal } = useModal();
  const [formType, setFormType] = useState();
  const [title, setTitle] = useState(header.default);

  const handleKakaoLogin = () => {
    console.log('카카오');
  };

  return (
    <div className='relative'>
      {/* Header */}
      <div className='flex items-center justify-center mb-[48px]'>
        {title}
        <div className='absolute right-0'>
          <CloseButton size='sm' onClick={closeModal} />
        </div>
      </div>
      {/* Form */}
      <form>
        <Input label='이메일' type='email' />
        <div className='flex flex-col gap-[16px] mt-[60px]'>
          <BaseButton>계속</BaseButton>
          <KakaoLoginButton onClick={handleKakaoLogin} className='h-[48px]'></KakaoLoginButton>
        </div>
      </form>
    </div>
  );
}
