'use client';

import { BASE_URL } from '@/src/constants/api';
import { useState } from 'react';

export default function UserTestPage() {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
  });
  const [error, setError] = useState();

  const handleSignUp = async () => {
    const res = await fetch(`${BASE_URL}/api/users`, {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    setError(data.message);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignUp();
  };
  return (
    <div>
      User Test Page
      <div>회원가입</div>
      {error && <div className='text-red-300'>{error}</div>}
      <form
        onSubmit={handleSubmit}
        className='flex flex-col max-w-[200px] gap-2'
      >
        <input
          className='border-2'
          name='email'
          value={formData.email}
          type='email'
          placeholder='이메일'
          onChange={handleInputChange}
        />
        <input
          className='border-2'
          name='nickname'
          value={formData.nickname}
          type='nickname'
          placeholder='닉네임'
          onChange={handleInputChange}
        />
        <input
          className='border-2'
          name='password'
          value={formData.password}
          type='password'
          placeholder='비밀번호'
          onChange={handleInputChange}
        />
        <div>
          {' '}
          <button
            type='submit'
            className='p-2 bg-primary-300 rounded-xl text-white'
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
