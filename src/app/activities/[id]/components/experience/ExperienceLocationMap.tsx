'use client';

import { useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import OverlayContent from '../common/OverlayContent';
import { KakaoPlace, KakaoStatus } from '@/src/types/kakao-map.types';
import { KAKAO_MAP_API_KEY } from '@/src/constants/api';

interface ExperienceLocationMapProps {
  address: string;
}

const FALLBACK_LAT = 37.5665; // 서울시청 위도
const FALLBACK_LNG = 126.978; // 서울시청 경도
const FALLBACK_PLACE_NAME = '위치를 찾을 수 없습니다';

export default function ExperienceLocationMap({ address }: ExperienceLocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!KAKAO_MAP_API_KEY) {
      console.error('지도 서비스를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    if (window.kakao?.maps) {
      createMap();
    } else {
      loadKakaoMapScript();
    }
  }, [address]);

  const loadKakaoMapScript = () => {
    if (document.querySelector(`script[src*="dapi.kakao.com"]`)) return;

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => window.kakao.maps.load(createMap);
    script.onerror = () =>
      console.error('지도 서비스를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.');
    document.head.appendChild(script);
  };

  const createMap = () => {
    const container = mapRef.current;
    if (!container || !window.kakao?.maps?.services) return;

    const places = new window.kakao.maps.services.Places();

    // 1차 주소 검색 시도
    places.keywordSearch(address, (data: KakaoPlace, status: KakaoStatus) => {
      if (status === 'OK' && data.length > 0) {
        renderMap(data[0].y, data[0].x, data[0].place_name);
      } else {
        // 2차 fallback: 지번 주소 or 키워드 일부로 재시도
        const fallbackKeyword = extractFallbackKeyword(address);
        places.keywordSearch(fallbackKeyword, (retryData: KakaoPlace, retryStatus: KakaoStatus) => {
          if (retryStatus === 'OK' && retryData.length > 0) {
            renderMap(retryData[0].y, retryData[0].x, retryData[0].place_name);
          } else {
            console.warn(`검색 실패. 기본 좌표로 대체: ${address}`);
            renderMap(FALLBACK_LAT, FALLBACK_LNG, FALLBACK_PLACE_NAME);
          }
        });
      }
    });
  };

  const renderMap = (lat: number, lng: number, placeName: string) => {
    const container = mapRef.current;
    if (!container || !window.kakao?.maps) return;

    const coords = new window.kakao.maps.LatLng(lat, lng);
    const map = new window.kakao.maps.Map(container, {
      center: coords,
      level: 3,
    });

    const overlayHTML = ReactDOMServer.renderToString(<OverlayContent placeName={placeName} />);

    const overlayContent = document.createElement('div');
    overlayContent.innerHTML = overlayHTML;

    const customOverlay = new window.kakao.maps.CustomOverlay({
      content: overlayContent,
      position: coords,
      yAnchor: 1.4,
    });

    customOverlay.setMap(map);
  };

  // 주소 중 일부 키워드를 fallback용으로 추출 (예: '최명희길 22-5' → '최명희길')
  const extractFallbackKeyword = (address: string): string => {
    // 숫자 주소 제거 → 키워드 추출
    return address.replace(/\d+[-]?\d*/g, '').trim();
  };

  return <div ref={mapRef} className='h-[328px] w-full rounded-[16px]' />;
}
