/**
 * ActivityDetailLayout
 *
 * 체험 상세 페이지의 레이아웃을 정의하는 컴포넌트입니다.
 *
 * 1. 목적
 *    - 체험 상세 페이지의 공통 레이아웃 구조를 정의
 *    - GNB(Global Navigation Bar) 설정을 위한 레이아웃 컨텍스트 제공
 *    - 페이지 전환 시 레이아웃 유지
 *
 * 2. 구조
 *    - 'use client' 지시문으로 클라이언트 컴포넌트로 동작
 *    - children을 통해 페이지 컨텐츠를 렌더링
 *    - 추후 필요한 경우 공통 레이아웃 요소 추가 가능
 *
 * 3. 사용 예시
 *    - /activities/[id] 경로의 모든 페이지에 적용
 *    - 체험 상세, 예약, 리뷰 등 하위 페이지에서 공통 레이아웃 유지
 *
 * 4. 이 파일이 필요한 이유
 *    - Next.js 13+에서는 layout.tsx가 없으면 페이지들이 서버 컴포넌트로 동작
 *    - GNB 설정(useGnb 훅)은 클라이언트 컴포넌트에서만 동작
 *    - 페이지 전환 시 레이아웃 유지를 위해 필요
 *    - 클라이언트 사이드 기능(스크롤, 모달, 라우팅 등)을 위해 필요
 */

'use client';

export default function ActivityDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
