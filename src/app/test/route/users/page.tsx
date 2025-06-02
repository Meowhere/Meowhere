'use client';

import { BASE_URL } from '@/src/constants/api';
import { User } from '@/src/types/user.types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const UpdateFormData = {
  nickname: '너구리',
  profileImageUrl:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/14-1_1899_1748846978952.jpeg',
  newPassword: 'password123',
};

export default function UserTestPage() {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
  });
  const [error, setError] = useState();
  const [user, setUser] = useState<User>({
    id: 0,
    email: '',
    nickname: '',
    profileImageUrl: '',
    createdAt: '',
    updatedAt: '',
  });
  const [imageFile, setImageFile] = useState<File>();

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

  const getUserData = async () => {
    const res = await fetch(`${BASE_URL}/api/users/me`, {
      method: 'GET',
      credentials: 'include',
    });
    const data: User = await res.json();
    setUser(data);
  };

  const updateUser = async () => {
    const res = await fetch(`${BASE_URL}/api/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(UpdateFormData),
    });
    const data = await res.json();
    console.log(data);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      console.log('선택된 파일:', file.name);
      console.log('파일 크기:', file.size, '바이트');
      console.log('파일 타입:', file.type);
      setImageFile(file);
    } else {
      console.log('선택된 파일 없음');
    }
  };
  const uploadUserImage = async () => {
    if (!imageFile) {
      alert('업로드할 파일을 먼저 선택해주세요.');
      console.error('업로드할 파일이 없습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    const res = await fetch(`${BASE_URL}/api/users/me/image`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
          <button
            type='submit'
            className='p-2 bg-primary-300 rounded-md text-white'
          >
            회원가입
          </button>
        </div>
      </form>
      <div className='mt-10'>내 정보</div>
      {user.profileImageUrl && (
        <Image
          src={user.profileImageUrl}
          alt='profile'
          width={200}
          height={200}
        />
      )}
      <div>이메일: {user.email}</div>
      <div>닉네임: {user.nickname}</div>
      <button
        type='button'
        className='p-2 bg-primary-300 rounded-md text-white'
        onClick={updateUser}
      >
        정보 업데이트
      </button>
      <div className='flex flex-col max-w-[200px] mt-10'>
        유저 이미지 파일 업로드
        <input type='file' accept='image/*' onChange={handleFileChange} />
        <button
          type='button'
          className='p-2 bg-primary-300 rounded-md text-white'
          onClick={uploadUserImage}
        >
          이미지 업로드
        </button>
      </div>
    </div>
  );
}
