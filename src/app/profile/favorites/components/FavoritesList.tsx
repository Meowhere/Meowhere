'use client';
import { useFavoritesStore } from '@/src/store/favoritesStore';
import FavoriteCard from './FavoriteCard';
import { useState } from 'react';
import { Activity } from '@/src/types/activity.types';
import NotFoundFavorites from './NotFoundActivities';

export default function FavoritesList() {
  const { favorites } = useFavoritesStore();
  const [myFavorites] = useState<Activity[]>(favorites);

  if (myFavorites.length === 0) return <NotFoundFavorites />;

  return (
    <div className='flex flex-col w-full lg:mt-[50px] gap-[24px]'>
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
