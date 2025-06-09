import { motion, useScroll, useTransform } from 'framer-motion';
import { categories } from '@/src/components/layout/navbar/components/Category';
import CategoryButton from '@/src/components/layout/navbar/components/CategoryButton';
import { useSearchParams } from 'next/navigation';

export default function CategorySection() {
  const { scrollY } = useScroll();
  const categoryHeight = useTransform(scrollY, [0, 100], [64, 39]); // 아이콘 크기 0이 되는 시점이 39px
  const searchParams = useSearchParams();

  return (
    <motion.div
      style={{ height: categoryHeight }}
      className='flex justify-start h-[60px] pt-[8px] px-[24px] overflow-x-auto overflow-y-hidden scrollbar-hide'
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
