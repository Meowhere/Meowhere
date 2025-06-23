import { useMyReservations } from '../useMyReservations';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { useEffect, useState } from 'react';

export const useCompletedCategories = () => {
  const { reservations } = useMyReservations('completed' as const, 100);
  const [categories, setCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (reservations.length === 0) return;

    const fetchCategories = async () => {
      const now = new Date();
      const completed = reservations.filter((res) => {
        const endDateTime = new Date(`${res.date}T${res.endTime}`);
        return endDateTime < now;
      });

      const results = await Promise.allSettled(
        completed.map((res) =>
          fetchFromClient(`/activities/${res.activity.id}`).then((res) => res.json())
        )
      );

      const categorySet = new Set<string>();
      results.forEach((result) => {
        if (
          result.status === 'fulfilled' &&
          result.value &&
          typeof result.value.category === 'string'
        ) {
          categorySet.add(result.value.category);
        }
      });

      setCategories(categorySet);
    };

    fetchCategories();
  }, [reservations]);

  return categories;
};
