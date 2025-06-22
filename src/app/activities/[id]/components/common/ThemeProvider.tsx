'use client';

import { useThemeStore } from '@/src/store/themeStore';
import { useEffect } from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, isHydrated } = useThemeStore();

  useEffect(() => {
    if (!isHydrated) return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme, isHydrated]);

  if (!isHydrated) {
    return null;
  }

  return <>{children}</>;
}
