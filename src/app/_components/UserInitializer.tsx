import { useUser } from '@/src/hooks/auth/useAuth';
import { useFavoritesStore } from '@/src/store/favoritesStore';
import { useEffect } from 'react';

const UserInitializer = () => {
  // useUser 훅을 사용하여 사용자 정보 가져오기
  const { data: user, isSuccess } = useUser();
  // useFavoritesStore에서 유저 동기화
  const { initializeUser, clearFavorites } = useFavoritesStore();

  useEffect(() => {
    // 쿼리 성공 시 사용자 정보 확인
    if (isSuccess) {
      if (user && user.id) {
        // 사용자 ID가 있으면 찜 목록 스토어 초기화
        initializeUser(user.id);
      } else {
        // 사용자 정보가 없으면 찜 목록 비우기
        clearFavorites();
      }
    }
  }, [isSuccess, user, initializeUser, clearFavorites]);

  return null;
};

export default UserInitializer;
