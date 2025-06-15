'use client';

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { categories } from '@/src/components/layout/navbar/components/Category';
import CategoryButton from '@/src/components/layout/navbar/components/CategoryButton';
import { useSearchParams } from 'next/navigation';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { useState } from 'react';

export default function CategorySection() {
  const { scrollY } = useScroll();
  const { isDesktop } = useBreakpoint();
  const [isHovering, setIsHovering] = useState(false);
  const [currentHeight, setCurrentHeight] = useState('86px');
  const [currentMobileHeight, setCurrentMobileHeight] = useState('64px');

  const categoryHeight = useTransform(scrollY, [0, 100], ['64px', '39px']); // 아이콘 크기 0이 되는 시점이 39px
  const categoryHeightDesktop = useTransform(scrollY, [540 + 80, 540 + 80 + 200], ['86px', '52px']); // 카테고리 y축 좌표 + GNB 높이 + 스크롤 감도
  const searchParams = useSearchParams();

  useMotionValueEvent(categoryHeightDesktop, 'change', (latest) => {
    if (!isHovering) {
      setCurrentHeight(latest);
    }
  });

  useMotionValueEvent(categoryHeight, 'change', (latest) => {
    setCurrentMobileHeight(latest);
  });

  return (
    <motion.div
      className={`lg:sticky lg:top-[200px] flex justify-start lg:p-0 pt-[8px] px-[24px] overflow-x-auto overflow-y-hidden scrollbar-hide`}
      animate={{
        height: isDesktop ? (isHovering ? '86px' : currentHeight) : currentMobileHeight,
      }}
      onHoverStart={() => {
        if (!isDesktop) return;
        setIsHovering(true);
        console.log('onHoverStart');
      }}
      onHoverEnd={() => {
        if (!isDesktop) return;
        setIsHovering(false);
        setCurrentHeight(categoryHeightDesktop.get()); // 호버 종료 시 현재 스크롤 기반 높이로 복구
        console.log('onHoverEnd');
      }}
      transition={{
        ease: [0, 0.9, 0.1, 1],
        duration: 0.5,
      }}
    >
      {categories.map((category) => (
        <CategoryButton
          key={category.category}
          category={category.category}
          icon={category.icon}
          value={category.value}
          isSelected={category.value === (searchParams.get('category') || '')}
        />
      ))}
    </motion.div>
  );
}
