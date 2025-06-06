import { useEffect } from 'react';
import { useGnbStore } from '../store/gnbStore';

interface UseGnbProps {
  title: string;
  subtitle?: string;
  isSearching?: boolean;
  backAction?: () => void;
  rightButtons?: React.ReactNode[];
  resetOnUnmount?: boolean;
}

export function useGnb({
  title,
  subtitle = '',
  isSearching = false,
  backAction,
  rightButtons = [],
  resetOnUnmount = true,
}: UseGnbProps) {
  const { setTitle, setSubtitle, setBackAction, setIsSearching, setRightButtons, resetGnb } =
    useGnbStore();

  useEffect(() => {
    setTitle(title);
    setSubtitle(subtitle);
    setIsSearching(isSearching);
    setBackAction(backAction ?? null);
    setRightButtons(rightButtons);

    return () => {
      if (resetOnUnmount) resetGnb();
    };
  }, []);
}
