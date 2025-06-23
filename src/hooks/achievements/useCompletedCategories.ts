import { useMyReservations } from '../useMyReservations';
import { fetchFromClient } from '@/src/lib/fetch/fetchFromClient';
import { useEffect, useState } from 'react';

// export const useCompletedCategories = () => {
//   const { reservations } = useMyReservations('completed' as any, 100);
//   const [categories, setCategories] = useState<Set<string>>(new Set());

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const completed = reservations.filter((res) => new Date(res.endTime) < new Date());

//       const results = await Promise.allSettled(
//         completed.map((res) =>
//           fetchFromClient(`/activities/${res.activity.id}`).then((res) => res.json())
//         )
//       );

//       const categorySet = new Set<string>();
//       results.forEach((result) => {
//         if (result.status === 'fulfilled' && result.value.category) {
//           categorySet.add(result.value.category);
//         }
//       });

//       setCategories(categorySet);
//     };

//     if (reservations.length > 0) fetchCategories();
//   }, [reservations]);

//   return categories;
// };

export function useCompletedCategories(): Set<string> {
  // 테스트용 - 문화 · 예술 카테고리 강제 완료 상태
  return new Set(['문화 · 예술']);
}
