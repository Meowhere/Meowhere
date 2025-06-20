'use client';
import { useGnb } from '@/src/hooks/useGnb';
import FavoritesList from './components/FavoritesList';
import { useRouter } from 'next/navigation';

export default function FavoritesPage() {
  const router = useRouter();
  useGnb({ title: '찜목록', backAction: () => router.push('/profile') });
  return (
    <div className='relative flex flex-col mx-[24px]'>
      <FavoritesList />
    </div>
  );
}
