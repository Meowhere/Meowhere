'use client';

import { motion } from 'framer-motion';
import { BADGE_LIST } from '@/src/constants/badge.constans';
import { BadgeLevel } from '@/src/constants/badge.constans';
import { useModal } from '@/src/hooks/useModal';
import BaseButton from '../buttons/BaseButton';
import BadgeGLBViewer from './BadgeGLBViewer';

interface Props {
  category: BadgeLevel;
  earnedAt?: string;
}

export default function BadgeDetailModalContent({ category, earnedAt }: Props) {
  const badge = BADGE_LIST.find((b) => b.category === category);
  const { closeModal } = useModal();

  if (!badge) return null;

  return (
    <div className='flex flex-col items-center justify-center gap-[24px] text-center'>
      <motion.div
        className='w-[180px] h-[180px] flex items-center justify-center'
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <BadgeGLBViewer glbPath={`/assets/badge/${badge.category}.glb`} />
      </motion.div>

      <div>
        <h2 className='text-[2.2rem] font-semibold text-gray-800'>{badge.title}</h2>
        <p className='text-md font-medium text-gray-600 pt-[6px]'>{badge.description}</p>
        <p className='text-xs text-gray-500 pt-[24px] gap-[8px]'>
          {earnedAt
            ? `${badge.category} 1회 이상 체험 완료 · ${new Date(earnedAt).toLocaleDateString('ko-KR')}`
            : '미획득'}
        </p>
      </div>

      <BaseButton className='rounded-[10px] font-regular mt-6' onClick={closeModal}>
        확인
      </BaseButton>
    </div>
  );
}
