'use client';

import { useEffect, useState } from 'react';

export function useFollowScrollPosition(baseTop: number = 180, offset: number = 80) {
  const [top, setTop] = useState(baseTop);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newTop = Math.max(baseTop, scrollY + offset);
      setTop(newTop);
    };

    handleScroll(); // 초기 위치도 설정
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [baseTop, offset]);

  return top;
}
