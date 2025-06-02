'use client';
import Input from '@/src/components/common/inputs/Input';
import { useState, useCallback } from 'react';

export default function MyInfoPage() {
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [pwConfirmError, setPwConfirmError] = useState('');
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  // 비밀번호 유효성 검사
  const handlePwChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPw(val);
    setPwError(val.length > 0 && val.length < 6 ? '6자 이상 입력하세요' : '');
  }, []);

  // 비밀번호 확인 유효성 검사
  const handlePwConfirmChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setPwConfirm(val);
      setPwConfirmError(val !== pw ? '비밀번호가 일치하지 않습니다' : '');
    },
    [pw]
  );

  // 닉네임 유효성 검사
  const handleNicknameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNickname(val);
    setNicknameError(val.length > 0 && val.length < 2 ? '2자 이상 입력하세요' : '');
  }, []);

  return (
    <div>
      <div className='gap-2'>
        <p className='text-xl font-semibold text-gray-800 '>닉네임 변경</p>
        <Input
          label='닉네임'
          type='text'
          value={nickname}
          onChange={handleNicknameChange}
          error={nicknameError}
        />
      </div>
      <div className='gap-2'>
        <p className='text-xl font-semibold text-gray-800'>비밀번호 변경</p>
        <Input
          label='비밀번호'
          type='password'
          value={pw}
          onChange={handlePwChange}
          error={pwError}
        />
        <Input
          label='비밀번호 확인'
          type='password'
          value={pwConfirm}
          onChange={handlePwConfirmChange}
          error={pwConfirmError}
        />
      </div>
    </div>
  );
}
