import { create } from 'zustand';
import { Activity } from '../types/activity.types';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FavoritesState {
  favorites: Activity[];
  currentUserId: number | null;
  initializeUser: (userId: number) => void;
  isFavorite: (activityId: number) => boolean;
  removeFavorite: (activityId: number) => void;
  toggleFavorite: (activity: Activity) => void;
  clearFavorites: () => void;
}

// 사용자별 로컬 키 생성
const getUserStorageKey = (userId: number) => `favorites-${userId}`;

// 사용자별 찜 목록 불러오기
const loadUserFavorites = (userId: number): Activity[] => {
  try {
    const key = getUserStorageKey(userId);
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('찜 목록 불러오기 실패:', error);
    return [];
  }
};

// 사용자별 찜 목록 저장
const saveUserFavorites = (userId: number, favorites: Activity[]) => {
  try {
    const key = getUserStorageKey(userId);
    localStorage.setItem(key, JSON.stringify(favorites));
  } catch (error) {
    console.error('찜 목록 저장 실패:', error);
  }
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      currentUserId: null,
      // 사용자 판별
      initializeUser: (userId) => {
        const currentUserId = get().currentUserId;
        // 이미 같은 사용자면 리턴
        if (currentUserId === userId) return;
        // 새 사용자의 찜 목록 로드
        const userFavorites = loadUserFavorites(userId);
        set({
          currentUserId: userId,
          favorites: userFavorites,
        });
      },
      // 찜되어 있는지 확인
      isFavorite: (activityId) => {
        const state = get();
        return state.favorites.some((fav) => fav.id === activityId);
      },
      // 찜목록에 제거
      removeFavorite: (activityId) => {
        const { currentUserId } = get();

        if (!currentUserId) {
          console.warn('사용자가 로그인되지 않았습니다.');
          return;
        }

        set((state) => {
          const newFavorites = state.favorites.filter((fav) => fav.id !== activityId);
          saveUserFavorites(currentUserId, newFavorites);
          return { favorites: newFavorites };
        });
      },
      // 찜목록 토글 기능
      toggleFavorite: (activity) => {
        const { currentUserId } = get();

        if (!currentUserId) {
          console.warn('사용자가 로그인되지 않았습니다.');
          return;
        }

        let newFavorites;
        set((state) => {
          const isAlreadyFavorite = get().isFavorite(activity.id);
          if (isAlreadyFavorite) {
            newFavorites = state.favorites.filter((fav) => fav.id !== activity.id);
          } else {
            newFavorites = [...state.favorites, activity];
          }
          saveUserFavorites(currentUserId, newFavorites);
          return { favorites: newFavorites };
        });
      },
      clearFavorites: () => {
        set({
          favorites: [],
          currentUserId: null,
        });
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
