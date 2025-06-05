'use client';

import { useEffect, useRef } from 'react';

interface KakaoMapProps {
  address: string;
  label?: string;
}

// Kakao Map API 타입 정의
interface KakaoMapResult {
  x: string;
  y: string;
}

export default function KakaoMap({ address, label }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      console.error('Kakao API 키가 없습니다. .env 설정을 확인하세요.');
      return;
    }

    if (window.kakao?.maps) {
      console.log('Kakao Maps 객체가 이미 로드되어 있습니다.');
      createMap();
    } else {
      console.log('Kakao Maps 스크립트를 로드합니다.');
      console.log(apiKey);
      loadKakaoMapScript();
    }
  }, [address, label, apiKey]);

  // Kakao Map API 스크립트를 동적으로 로드하는 함수
  const loadKakaoMapScript = () => {
    const existingScript = document.querySelector(`script[src*="dapi.kakao.com"]`);
    if (existingScript) {
      console.log('이미 Kakao Map 스크립트가 추가되어 있습니다.');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        createMap();
      });
    };

    script.onerror = () => {
      console.error('Kakao Map 스크립트 로드 실패 - API 키 또는 네트워크 문제');
    };

    document.head.appendChild(script);
  };

  // 실제 지도를 생성하는 함수
  const createMap = () => {
    if (!window.kakao?.maps?.services) {
      console.error('Kakao 지도 서비스가 초기화되지 않음');
      return;
    }
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result: KakaoMapResult[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
        renderMap(result[0]);
      } else {
        console.error('주소 검색 실패:', address);
      }
    });
  };

  // 지도를 실제로 렌더링하는 함수
  const renderMap = (location: KakaoMapResult) => {
    const coords = new window.kakao.maps.LatLng(location.y, location.x);
    // 지도 컨테이너 찾기
    const mapContainer = mapRef.current;

    if (!mapContainer) {
      console.error('지도를 렌더링할 DOM 요소가 없습니다.');
      return;
    }

    const mapOptions = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: coords, // 지도의 중심좌표
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    // 지도 생성
    const map = new window.kakao.maps.Map(mapContainer, mapOptions);

    // 마커 생성 및 표시
    const marker = new window.kakao.maps.Marker({
      map: map,
      position: coords,
    });

    // 라벨이 있으면 정보창 표시
    if (label) {
      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `
            <div style="padding: 8px 12px; font-size: 14px; font-weight: 500; color: #333;">
              ${label}
            </div>
          `,
      });
      infoWindow.open(map, marker);
    }
  };
  return <div ref={mapRef} className='h-[24rem] w-full rounded-[1.2rem] border border-gray-200' />;
}
