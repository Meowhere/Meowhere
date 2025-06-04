import { useEffect } from 'react';
import { useGnbStore } from '../store/gnbStore';

interface UseGnbProps {
  title: string;
  subtitle: string;
  backAction?: () => void;
  rightButtons?: React.ReactNode[];
  resetOnUnmount?: boolean;
}

export function useGnb({
  title,
  subtitle,
  backAction,
  rightButtons = [],
  resetOnUnmount = true,
}: UseGnbProps) {
  const { setTitle, setSubtitle, setBackAction, setRightButtons, resetGnb } = useGnbStore();

  useEffect(() => {
    setTitle(title);
    setSubtitle(subtitle);
    setBackAction(backAction ?? null);
    setRightButtons(rightButtons);

    return () => {
      if (resetOnUnmount) resetGnb();
    };
  }, []);
}
