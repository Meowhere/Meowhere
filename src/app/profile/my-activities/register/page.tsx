'use client';
import DropdownMenu from '@/src/components/common/dropdowns/dropdown-menu/DropdownMenu';
import Input from '@/src/components/common/inputs/Input';
import Textarea from '@/src/components/common/inputs/Textarea';
import UploadImg from './components/UploadImg';
import { useGnb } from '@/src/hooks/useGnb';
import { useGnbStore } from '@/src/store/gnbStore';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  useGnb({
    title: '안녕',
    subtitle: '',
    backAction: () => router.back(),
    rightButtons: [],
  });

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
        <Input name='title' label='제목' type='text' value='' />
        <Input name='price' label='가격' type='text' value='' />
        {/* <DropdownMenu /> */}
        {/* <Input name='location'/> */}
        {/* <Textarea value='' onChange={} error={}/> */}
      </div>
      <div>
        <p className='text-xl font-semibold text-gray-800'>체험 일정</p>
      </div>
    </div>
  );
}
