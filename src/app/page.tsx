'use client';
import { useState } from 'react';
import Input from '../components/common/inputs/Input';

export default function Page() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [nickname, setNickname] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwError, setPwError] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    setEmailError(
      e.target.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
        ? '이메일 형식으로 입력해 주세요'
        : '',
    );
  }

  function handlePwChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPw(e.target.value);
    setPwError(e.target.value.length > 0 && e.target.value.length < 6 ? '6자 이상 입력하세요' : '');
  }

  function handleNicknameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNickname(e.target.value);
    setNicknameError(
      e.target.value.length > 0 && e.target.value.length < 2 ? '2자 이상 입력하세요' : '',
    );
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <Input
        label="이메일"
        type="email"
        value={email}
        onChange={handleEmailChange}
        error={emailError}
      />
      <Input label="비밀번호" isPassword value={pw} onChange={handlePwChange} error={pwError} />
      <Input
        label="닉네임"
        type="text"
        value={nickname}
        onChange={handleNicknameChange}
        error={nicknameError}
      />
    </div>
  );
}
