'use client';

import { useEffect } from 'react';
import { useGnbStore } from '../../../store/gnbStore';
import { useRouter } from 'next/navigation';
import HeartIcon from '@/src/components/common/icons/HeartIcon';
import KebobIcon from '@/src/components/common/icons/KebabIcon';

export default function gnbTest() {
  const { setBackAction, setTitle, setRightButtons } = useGnbStore();
  const router = useRouter();

  useEffect(() => {
    setBackAction(() => router.back());
    setTitle('안녕');
    setRightButtons([
      <HeartIcon
        isLiked={false}
        variant='black'
        className='w-[24px] h-[24px]'
        onClick={() => console.log('heart')}
      />,
      <KebobIcon className='w-[24px] h-[24px]' onClick={() => console.log('kebab')} />,
    ]);
  }, []);

  return (
    <div className='h-screen'>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      ~~~어디가냥 테스트 페이지~~~
      <br />
    </div>
  );
}
