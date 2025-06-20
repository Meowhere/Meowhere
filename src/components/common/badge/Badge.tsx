'use client';

import { useMyBadge } from '@/src/hooks/useMyBadge';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { badgeInfo } from '@/src/constants/badge.constans';

export default function Badge() {
  const { badge, completedCount } = useMyBadge();

  if (!badge) return null;

  return (
    <div className='flex items-center flex-col gap-[16px]'>
      {/* 애니메이션 */}
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        <Image src={badgeInfo[badge].image} alt={badgeInfo[badge].label} width={80} height={80} />
      </motion.div>
      <div>
        <p className='text-lg font-bold text-center text-primary-300'>{badgeInfo[badge].label}</p>
        <p className='text-sm text-gray-500'>벌써 완료한 체험 수가 {completedCount}회라냥</p>
      </div>
    </div>
  );
}
