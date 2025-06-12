import { create } from 'zustand';
import { Activity } from '../types/activity.types';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoritesState {
  favorites: Activity[];
  isFavorite: (activityId: number) => boolean;
  removeFavorite: (activityId: number) => void;
  toggleFavorite: (activity: Activity) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      // 찜되어 있는지 확인
      isFavorite: (activityId) => {
        const state = get();
        return state.favorites.some((fav) => fav.id === activityId);
      },
      // 찜목록에 제거
      removeFavorite: (activityId) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== activityId),
        }));
      },
      // 찜목록 토글 기능
      toggleFavorite: (activity) => {
        set((state) => {
          const isAlreadyFavorite = get().isFavorite(activity.id);
          if (isAlreadyFavorite) {
            return { favorites: state.favorites.filter((fav) => fav.id !== activity.id) };
          } else {
            return { favorites: [...state.favorites, activity] };
          }
        });
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
