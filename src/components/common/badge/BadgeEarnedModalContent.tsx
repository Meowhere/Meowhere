// 'use client';

// import { useBadgeStore } from '@/src/store/useBadgeStore';
// import Badge from './Badge';

// export default function BadgeEarnedModalContent() {
//   const { clearEarnedBadge } = useBadgeStore();

//   return (
//     <div className='flex flex-col items-center justify-center py-6'>
//       <Badge />
//       <button
//         className='mt-6 px-6 py-2 rounded-lg bg-primary-300 text-white'
//         onClick={clearEarnedBadge}
//       >
//         확인
//       </button>
//     </div>
//   );
// }

'use client';

import Badge3DViewer from './Badge3DViewer';
import { useBadgeStore } from '@/src/store/useBadgeStore';

export default function BadgeEarnedModalContent() {
  const { clearEarnedBadge } = useBadgeStore();

  return (
    <div className='flex flex-col items-center justify-center py-6'>
      <Badge3DViewer /> {/* 기존 <Badge /> 대신 */}
      <button
        className='mt-6 px-6 py-2 rounded-lg bg-primary-300 text-white'
        onClick={clearEarnedBadge}
      >
        확인
      </button>
    </div>
  );
}
