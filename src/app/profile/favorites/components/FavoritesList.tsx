'use client';
import { useFavoritesStore } from '@/src/store/favoritesStore';
import FavoriteCard from './FavoriteCard';
import { useState } from 'react';
import { Activity } from '@/src/types/activity.types';
import NoActivities from '../../components/NoActivities';

export default function FavoritesList() {
  const { favorites } = useFavoritesStore();
  const [myFavorites] = useState<Activity[]>(favorites);

  if (myFavorites.length === 0)
    return <NoActivities title='좋아요한' urlPath='/' buttonTitle='체험 보러가기' />;

  return (
    <div className='flex flex-col w-full gap-[24px]'>
      {myFavorites.map((fav, index) => (
        <div
          key={fav.id}
          className={index < myFavorites.length - 1 ? 'border-b border-gray-200' : ''}
        >
          <FavoriteCard activity={fav} />
        </div>
      ))}
    </div>
  );
}
