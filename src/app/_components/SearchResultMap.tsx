'use client';

import { useEffect, useRef, useCallback } from 'react';
import { renderToString } from 'react-dom/server';
import { Activity } from '../../types/activity.types';
import { categories } from '@/src/components/layout/navbar/components/Category';

interface SearchResultMapProps {
  activities: Activity[];
  className?: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function SearchResultMap({ activities, className }: SearchResultMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const overlaysRef = useRef<any[]>([]);
  const geocoderRef = useRef<any>(null);

  // 기존 마커들과 오버레이 제거
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    overlaysRef.current.forEach((overlay) => {
      overlay.setMap(null);
    });
    markersRef.current = [];
    overlaysRef.current = [];
  }, []);

  // 마커 생성
  const createMarkers = useCallback((activities: Activity[], shouldFitBounds = true) => {
    if (!mapInstanceRef.current || !geocoderRef.current) return;

    const map = mapInstanceRef.current;
    const geocoder = geocoderRef.current;
    const bounds = new window.kakao.maps.LatLngBounds();
    let completedCount = 0;

    activities.forEach((activity) => {
      geocoder.addressSearch(activity.address, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          // 커스텀 마커 SVG
          const markerSvgElement = categories.find(
            (category) => category.value === activity.category
          )?.icon;

          if (markerSvgElement) {
            const originalSvg = renderToString(markerSvgElement);

            // 마커 SVG
            const markerSvg = `
              <svg width="56" height="56" viewBox="-8 -8 56 56" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.5)"/>
                  </filter>
                </defs>
                <circle cx="20" cy="20" r="18" fill="white" filter="url(#shadow)"/>
                <g transform="translate(8, 8)">
                  ${originalSvg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
                </g>
              </svg>
            `;

            // SVG -> data URL
            const svgBlob = new Blob([markerSvg], { type: 'image/svg+xml' });
            const svgUrl = URL.createObjectURL(svgBlob);

            // 마커 이미지
            const markerImage = new window.kakao.maps.MarkerImage(
              svgUrl,
              new window.kakao.maps.Size(56, 56),
              { offset: new window.kakao.maps.Point(28, 28) }
            );

            // 마커 생성
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
              image: markerImage,
              title: activity.title,
            });

            // 커스텀 오버레이
            const overlayContent = `
              <div class="bg-white rounded-xl p-3 shadow-lg min-w-[200px]">
                <div class="font-semibold text-sm text-gray-800 mb-1 text-center">
                  ${activity.title}
                </div>
                <div class="text-xs text-gray-500 mb-1.5 text-center">
                  ${activity.category}, ${activity.price.toLocaleString()}원
                </div>
                <div class="text-xs text-gray-400 text-center">
                  ${activity.address}
                </div>
              </div>
            `;

            // 커스텀 오버레이 생성
            const overlay = new window.kakao.maps.CustomOverlay({
              position: coords,
              content: overlayContent,
              yAnchor: 1.2,
              xAnchor: 0.5,
            });

            // 호버
            window.kakao.maps.event.addListener(marker, 'mouseover', () => {
              overlay.setMap(map);
            });

            window.kakao.maps.event.addListener(marker, 'mouseout', () => {
              overlay.setMap(null);
            });

            markersRef.current.push(marker);
            overlaysRef.current.push(overlay);
            bounds.extend(coords);

            completedCount++;
            // 모든 마커 생성 시 지도 범위 조정
            if (completedCount === activities.length && activities.length > 0) {
              if (shouldFitBounds) {
                // 첫 로드나 필터 변경 시 모든 마커 보이도록 범위 조정
                map.setBounds(bounds);
              } else {
                // 무한스크롤 시 기존 범위 유지하면서 새 마커들까지 포함하도록 확장
                const currentBounds = map.getBounds();
                const extendedBounds = new window.kakao.maps.LatLngBounds(
                  currentBounds.getSouthWest(),
                  currentBounds.getNorthEast()
                );

                // 새로 추가된 마커들 범위 기존 범위에 추가
                extendedBounds.extend(bounds.getSouthWest());
                extendedBounds.extend(bounds.getNorthEast());

                // 부드럽게 범위 조정 (애니메이션 효과)
                map.setBounds(extendedBounds);
              }
            }
          }
        }
      });
    });
  }, []);

  // 초기화
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 스크립트 로드 확인
    if (window.kakao && window.kakao.maps) {
      initializeMap();
      return;
    }

    // 스크립트 로드
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.addEventListener('load', () => {
      window.kakao.maps.load(() => {
        initializeMap();
      });
    });

    function initializeMap() {
      if (!mapRef.current) return;

      // 지도 생성
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 중심
        level: 8, // 넓은 범위로 시작
      };

      mapInstanceRef.current = new window.kakao.maps.Map(mapRef.current, mapOption);
      geocoderRef.current = new window.kakao.maps.services.Geocoder();

      // 기존 activities 있으면 즉시 처리
      if (activities.length > 0 && prevActivitiesRef.current.length === 0) {
        setTimeout(() => {
          if (mapInstanceRef.current && geocoderRef.current) {
            createMarkers(activities, true);
            prevActivitiesRef.current = [...activities];
          }
        }, 100);
      }
    }

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      if (script.parentNode) {
        script.remove();
      }
    };
  }, []); // 빈 dependency array - 최초 1회 실행

  // 화면 크기 변경 시 지도 relayout
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const handleResize = () => {
      // 지도 컨테이너 크기 변경 시 relayout 호출
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.relayout();
        }
      }, 100); // DOM 변경 완료 후 실행
    };

    // window resize 이벤트 리스너
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 이전 activities ref
  const prevActivitiesRef = useRef<Activity[]>([]);

  // 새로 추가된 activities만 필터링
  const getNewActivities = useCallback(
    (currentActivities: Activity[], prevActivities: Activity[]) => {
      const prevIds = new Set(prevActivities.map((activity) => activity.id));
      return currentActivities.filter((activity) => !prevIds.has(activity.id));
    },
    []
  );

  // activities 변경 시 마커 업데이트
  useEffect(() => {
    // 지도와 geocoder 준비 대기
    if (!mapInstanceRef.current || !geocoderRef.current) {
      return;
    }
    const prevActivities = prevActivitiesRef.current;

    // 첫 번째 로드이거나 완전히 다른 검색 결과인 경우
    const isCompleteRefresh =
      prevActivities.length === 0 || // 첫 로드
      activities.length < prevActivities.length || // 필터링으로 줄어듦
      (activities.length > 0 &&
        prevActivities.length > 0 &&
        !activities.some((activity) => prevActivities.some((prev) => prev.id === activity.id))); // 완전 다른 데이터

    if (isCompleteRefresh) {
      // 기존 마커들 모두 제거하고 새로 생성
      clearMarkers();
      if (activities.length > 0) {
        createMarkers(activities, true);
      }
    } else {
      // 무한스크롤 - 새로 추가된 마커들만 생성
      const newActivities = getNewActivities(activities, prevActivities);
      if (newActivities.length > 0) {
        createMarkers(newActivities, false);
      }
    }

    // 현재 activities 이전 값으로 저장
    prevActivitiesRef.current = [...activities];
  }, [activities, clearMarkers, createMarkers, getNewActivities]);

  return (
    <div
      className={`w-full h-[50vh] lg:h-[calc(100vh-149px)] lg:sticky top-[149px] right-0 mb-6 overflow-hidden ${className}`}
    >
      <div className='w-full h-[50vh] lg:h-full bg-white mix-blend-soft-light absolute top-0 left-0 z-10 pointer-events-none' />
      <div ref={mapRef} className='w-full h-full' />
    </div>
  );
}
