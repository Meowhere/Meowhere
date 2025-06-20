'use client';

import { motion } from 'framer-motion';
import CategorySection from '@/src/components/layout/navbar/components/CategorySection';
import { useGnbStore } from '@/src/store/gnbStore';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useSearchParams } from 'next/navigation';

export default function DesktopCategorySection() {
  const { isSearching } = useGnbStore();
  const { isDesktop } = useBreakpoint();
  const searchParams = useSearchParams();

  const paramsObj = Object.fromEntries(searchParams.entries());
  const { category, ...otherParams } = paramsObj;
  const hasParams = Object.values(otherParams).some(
    (value) => value !== null && value.trim() !== ''
  );

  return (
    <motion.div
      className={`hidden lg:sticky top-[95px] z-40 lg:flex lg:justify-center w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 ${
        hasParams ? 'mt-0' : 'mt-[88px]'
      }`}
      animate={{
        top: isSearching && isDesktop ? 95 + 84 : 95, // 검색 중일 때 카테고리 섹션 위치 조정 GNB 높이 + GNB 커졌을 때 높이 조정
      }}
      transition={{
        ease: [0, 1, 0, 1],
        duration: 0.5,
      }}
    >
      <CategorySection />
    </motion.div>
  );
}
