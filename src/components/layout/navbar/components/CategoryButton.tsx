import { useURLQuery } from '@/src/hooks/useURLQuery';
import { Category } from '@/src/types/activity.types';

interface NavbarCategoryProps {
  category: '모두' | '문화 · 예술' | '음식' | '스포츠' | '투어' | '관광' | '웰빙';
  icon: React.ReactNode;
  value: '' | Category;
  isSelected: boolean;
}

export default function CategoryButton({ category, icon, value, isSelected }: NavbarCategoryProps) {
  const { updateQuery } = useURLQuery();

  return (
    <button
      className={`${isSelected ? 'text-gray-800 dark:text-gray-200 border-b lg:border-b-2 border-gray-800 dark:border-gray-200' : 'text-gray-500 dark:text-gray-400'} flex flex-col items-center gap-[4px] min-w-[78px] lg:min-w-[120px] h-full lg:pt-[16px] cursor-pointer pb-[8px] rounded-t-[8px] hover:bg-gray-100 dark:hover:bg-gray-800 transition-soft`}
      onClick={() => {
        updateQuery('category', value);
      }}
      aria-label={category}
    >
      {icon}
      <span className='text-xs lg:text-md'>{category}</span>
    </button>
  );
}
