'use client';
import { useFavoritesStore } from '@/src/store/favoritesStore';
import FavoriteCard from './FavoriteCard';
import { useState } from 'react';
import { Activity } from '@/src/types/activity.types';
import NoActivities from '../../components/NoActivities';

export default function FavoritesList() {
  const favorites = useFavoritesStore((state) => state.favorites);

  if (favorites.length === 0)
    return <NoActivities title='좋아요한' urlPath='/' buttonTitle='체험 보러가기' />;

  return (
    <div className='flex flex-col w-full gap-[24px]'>
      {favorites.map((fav, index) => (
        <div
          key={fav.id}
          className={
            index < favorites.length - 1 ? 'border-b border-gray-200 dark:border-gray-600' : ''
          }
        >
          <FavoriteCard activity={fav} />
        </div>
      ))}
    </div>
  );
}
