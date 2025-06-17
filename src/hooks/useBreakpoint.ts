import { useLayoutEffect, useState } from 'react';

export function useBreakpoint() {
  const [width, setWidth] = useState(1920);
  const [hasMounted, setHasMounted] = useState(false);

  useLayoutEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      setHasMounted(true);
    }
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  return {
    isMobile,
    isTablet,
    isDesktop,
    width,
    hasMounted,
  };
}
