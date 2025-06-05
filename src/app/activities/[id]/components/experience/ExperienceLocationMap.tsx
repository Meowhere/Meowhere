'use client';

import { useEffect, useRef } from 'react';

interface KakaoMapProps {
  address: string;
}

// Kakao Map API 타입 정의
interface KakaoMapResult {
  x: string;
  y: string;
}

export default function KakaoMap({ address }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      console.error('Kakao API 키가 없습니다. .env 설정을 확인하세요.');
      return;
    }

    if (window.kakao?.maps) {
      createMap();
    } else {
      loadKakaoMapScript();
    }
  }, [address]);

  // Kakao Map API 스크립트를 동적으로 로드하는 함수
  const loadKakaoMapScript = () => {
    if (document.querySelector(`script[src*="dapi.kakao.com"]`)) return;

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => window.kakao.maps.load(createMap);
    script.onerror = () => console.error('Kakao Map 스크립트 로드 실패');
    document.head.appendChild(script);
  };

  // 실제 지도를 생성하는 함수
  const createMap = () => {
    const container = mapRef.current;
    if (!container || !window.kakao?.maps?.services) return;

    const places = new window.kakao.maps.services.Places();

    places.keywordSearch(address, (data: any[], status: string) => {
      if (status !== window.kakao.maps.services.Status.OK || data.length === 0) {
        console.error('검색 실패:', address);
        return;
      }

      const place = data[0];
      const coords = new window.kakao.maps.LatLng(place.y, place.x);

      const map = new window.kakao.maps.Map(container, {
        center: coords,
        level: 3,
      });

      const overlayContent = document.createElement('div');
      overlayContent.className =
        'px-3 py-1.5 rounded-full border-2 border-[#007AFF] bg-white flex items-center shadow-md';
      overlayContent.innerHTML = `
        <div class="w-5 h-5 flex items-center justify-center bg-[#007AFF] text-white text-sm rounded-full mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
          </svg>
        </div>
        <span class="text-sm font-semibold text-gray-900">${place.place_name}</span>
      `;

      const customOverlay = new window.kakao.maps.CustomOverlay({
        content: overlayContent,
        position: coords,
        yAnchor: 1.4,
      });

      customOverlay.setMap(map);
    });
  };

  return <div ref={mapRef} className='h-[328px] w-full rounded-[16px]' />;
}
