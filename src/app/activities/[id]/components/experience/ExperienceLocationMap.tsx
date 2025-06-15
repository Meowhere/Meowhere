'use client';

import { useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import OverlayContent from '../common/OverlayContent';
import { KakaoPlace, KakaoStatus } from '@/src/types/kakao-map.types';
import { KAKAO_MAP_API_KEY } from '@/src/constants/api';

interface ExperienceLocationMapProps {
  address: string;
}

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

    places.keywordSearch(address, (data: KakaoPlace, status: KakaoStatus) => {
      let coords;
      let placeName;

      if (status === 'OK' && data.length > 0) {
        const place = data[0];
        coords = new window.kakao.maps.LatLng(place.y, place.x);
        placeName = place.place_name;
      } else {
        console.warn(`주소 검색 실패: "${address}". 기본 위치로 대체합니다.`);
        coords = new window.kakao.maps.LatLng(37.501274, 127.028104);
        placeName = '위워크 역삼점';
      }

      const map = new window.kakao.maps.Map(container, {
        center: coords,
        level: 3,
      });

      setTimeout(() => {
        map.relayout();
      }, 0);

      const overlayHTML = ReactDOMServer.renderToString(<OverlayContent placeName={placeName} />);

      const overlayContent = document.createElement('div');
      overlayContent.innerHTML = overlayHTML;

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
