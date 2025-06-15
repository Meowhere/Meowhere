'use client';
import { useGnb } from '@/src/hooks/useGnb';
// import { useGnbStore } from '@/src/store/gnbStore';
import { useRouter } from 'next/navigation';
import RegisterExperienceForm from '../components/RegisterExperienceForm';

export default function RegisterPage() {
  const router = useRouter();

  useGnb({
    title: '내 체험 등록',
    subtitle: '',
    backAction: () => router.back(),
    rightButtons: [
      <button key='submit' className='text-md font-semibold text-primary-300'>
        등록
      </button>,
    ],
  });

  const handleSubmit = () => {
    console.log('폼 제출');
  };
  return <RegisterExperienceForm mode='create' onSubmit={handleSubmit} />;
}
