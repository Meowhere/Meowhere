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
      className={`${isSelected ? 'text-gray-800 border-b border-gray-800' : 'text-gray-500'} flex flex-col items-center gap-[4px] min-w-[78px] cursor-pointer pb-[8px]`}
      onClick={() => {
        updateQuery('category', value);
      }}
      aria-label={category}
    >
      {icon}
      <span className='text-xs'>{category}</span>
    </button>
  );
}
