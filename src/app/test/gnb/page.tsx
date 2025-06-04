'use client';

import { useRouter } from 'next/navigation';
import HeartIcon from '@/src/components/common/icons/HeartIcon';
import KebobIcon from '@/src/components/common/icons/KebabIcon';
import { useGnb } from '@/src/hooks/useGnb';
import { useGnbStore } from '@/src/store/gnbStore';
import BaseButton from '@/src/components/common/buttons/BaseButton';

export default function gnbTest() {
  const router = useRouter();
  const { setTitle, setSubtitle } = useGnbStore();

  useGnb({
    title: '안녕',
    subtitle: '안녕하세요',
    backAction: () => router.back(),
    rightButtons: [
      <HeartIcon
        key='heart'
        aria-label='좋아요'
        isLiked={false}
        variant='black'
        className='w-[24px] h-[24px]'
      />,
      <KebobIcon key='kebab' aria-label='더보기' className='w-[24px] h-[24px]' />,
    ],
  });

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
      <BaseButton
        onClick={() => {
          setTitle('hi');
          setSubtitle('hello');
        }}
      >
        타이틀 변경
      </BaseButton>
    </div>
  );
}
