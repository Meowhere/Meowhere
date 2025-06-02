import { useSearchParams, useRouter } from 'next/navigation';

export function useQueryUpdate() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`/?${params.toString()}`);
  };
  const removeQuery = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(`/?${params.toString()}`);
  };
  const updateMultipleQueries = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.push(`/?${params.toString()}`);
  };

  return { updateQuery, removeQuery, updateMultipleQueries };
}
