import { useEffect, useCallback, useState } from 'react';
import { Activity } from '../types/activity.types';
import { KakaoSDK } from '../types/kakao.types';

declare global {
  interface Window {
    Kakao: KakaoSDK | undefined;
  }
}

interface KakaoShareOptions {
  activity: Activity;
  currentUrl?: string;
  customMessage?: string;
}

// 카카오톡 공유 커스텀 훅
export const useKakaoShare = () => {
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Kakao SDK 초기화
  useEffect(() => {
    const initKakao = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        // 실제 카카오 앱 키로 교체 필요
        window.Kakao.init('YOUR_KAKAO_APP_KEY');
        setIsKakaoLoaded(true);
      } else if (window.Kakao && window.Kakao.isInitialized()) {
        setIsKakaoLoaded(true);
      }
    };

    // 이미 스크립트가 로드되어 있는지 확인
    if (window.Kakao) {
      initKakao();
      return;
    }

    // Kakao SDK 스크립트 동적 로드
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.onload = initKakao;
    script.onerror = () => {
      console.error('카카오 SDK 로드 실패');
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // cleanup 시 스크립트 제거
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // 카카오톡 공유 함수
  const shareToKakao = useCallback(
    ({ activity, currentUrl, customMessage }: KakaoShareOptions) => {
      if (!isKakaoLoaded || !window.Kakao) {
        alert('카카오 SDK가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
        return false;
      }

      setIsLoading(true);

      try {
        const shareUrl = currentUrl || window.location.href;
        const description = customMessage || `${activity.category} | ${activity.description}`;

        window.Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: activity.title,
            description: description,
            imageUrl: activity.bannerImageUrl,
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
          itemContent: {
            profileText: '액티비티 예약',
            profileImageUrl: activity.bannerImageUrl,
            titleImageUrl: activity.bannerImageUrl,
            titleImageText: activity.category,
            titleImageCategory: 'Activity',
            items: [
              {
                item: '가격',
                itemOp: `${activity.price.toLocaleString()}원`,
              },
              {
                item: '위치',
                itemOp: activity.address,
              },
            ],
          },
          buttons: [
            {
              title: '자세히 보기',
              link: {
                mobileWebUrl: shareUrl,
                webUrl: shareUrl,
              },
            },
          ],
        });

        setIsLoading(false);
        return true;
      } catch (error) {
        console.error('카카오톡 공유 실패:', error);
        alert('공유하기에 실패했습니다. 다시 시도해주세요.');
        setIsLoading(false);
        return false;
      }
    },
    [isKakaoLoaded]
  );

  return {
    shareToKakao,
    isKakaoLoaded,
    isLoading,
  };
};
