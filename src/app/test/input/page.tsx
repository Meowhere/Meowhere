'use client';
import { useState, useCallback } from 'react';
import Input from '../../../components/common/inputs/Input';
import Textarea from '../../../components/common/inputs/Textarea';

export default function Page() {
  // 모든 상태를 이 페이지에서 관리
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [textarea, setTextarea] = useState('');
  const [textareaError, setTextareaError] = useState('');

  // 이메일 유효성 검사
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    setEmailError(
      val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? '이메일 형식으로 입력해 주세요' : ''
    );
  }, []);

  // 비밀번호 유효성 검사
  const handlePwChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPw(val);
    setPwError(val.length > 0 && val.length < 6 ? '6자 이상 입력하세요' : '');
  }, []);

  // 닉네임 유효성 검사
  const handleNicknameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNickname(val);
    setNicknameError(val.length > 0 && val.length < 2 ? '2자 이상 입력하세요' : '');
  }, []);

  // textarea 유효성 검사 (10자 이상, 700자 이하)
  const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setTextarea(val);
    if (val.length > 700) {
      setTextareaError('700자 이내로 입력해 주세요');
    } else if (val.length > 0 && val.length < 10) {
      setTextareaError('10자 이상 입력하세요');
    } else {
      setTextareaError('');
    }
  }, []);

  return (
    <div className='max-w-lg mx-auto py-10'>
      <Input
        label='이메일'
        type='email'
        value={email}
        onChange={handleEmailChange}
        error={emailError}
      />
      <Input
        label='비밀번호'
        type='password'
        isPassword
        value={pw}
        onChange={handlePwChange}
        error={pwError}
      />
      <Input
        label='닉네임'
        type='text'
        value={nickname}
        onChange={handleNicknameChange}
        error={nicknameError}
      />
      <Textarea value={textarea} onChange={handleTextareaChange} error={textareaError} />
    </div>
  );
}
