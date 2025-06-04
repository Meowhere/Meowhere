import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface QueryUpdater {
  updateQuery: (key: string, value: string) => void;
  removeQuery: (key: string) => void;
  updateMultipleQueries: (updates: Record<string, string>) => void;
}

export function useURLQuery(): QueryUpdater {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 공통 헬퍼
  const isValidKey = (key: string) => {
    return !!key?.trim();
  };

  // 현재 페이지의 쿼리 업데이트
  const updateQuery = (key: string, value: string) => {
    if (!isValidKey(key)) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  // 현재 페이지의 특정 쿼리 제거
  const removeQuery = (key: string) => {
    if (!isValidKey(key)) return;

    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  // 여러 쿼리 동시 업데이트
  const updateMultipleQueries = (updates: Record<string, string>) => {
    if (!updates || Object.keys(updates).length === 0) return;

    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (!isValidKey(key)) return;

      params.set(key, value);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  return { updateQuery, removeQuery, updateMultipleQueries };
}
