'use client';
import DropdownMenu from '@/src/components/common/dropdowns/dropdown-menu/DropdownMenu';
import Input from '@/src/components/common/inputs/Input';
import Textarea from '@/src/components/common/inputs/Textarea';
import UploadImg from './components/UploadImg';
import { useState } from 'react';

export default function RegisterPage() {
  const [title, setTitle] = useState('');

  return (
    <div className='flex flex-col gap-[48px] px-[24px] py-[96px]'>
      <div className='flex flex-col gap-[20px]'>
        <p className='text-xl font-semibold text-gray-800'>메인 이미지</p>
        <UploadImg />
      </div>
      <div className='flex flex-col gap-[20px]'>
        <p className='text-xl font-semibold text-gray-800'>소개 이미지</p>
      </div>
      <div className='flex flex-col gap-[20px]'>
        <p className='text-xl font-semibold text-gray-800'>체험 정보</p>
        <Input name='title' label='제목' type='text' value={title} />
        {/* <DropdownMenu /> */}
        {/* <Input /> */}
        {/* <Textarea value='' onChange={} error={}/> */}
      </div>
      <div>
        <p className='text-xl font-semibold text-gray-800'>체험 일정</p>
      </div>
    </div>
  );
}
