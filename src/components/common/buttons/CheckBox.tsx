import { CheckboxProps } from '@/src/types/input.types';
import CheckIcon from '../icons/CheckIcon';
import CheckedIcon from '../icons/CheckedIcon';

export default function Checkbox({ id, checked, onChange, label, error }: CheckboxProps) {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center gap-[4px]'>
        {/* 숨겨진 체크박스 */}
        <input
          type='checkbox'
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className='sr-only peer'
        />

        {/* 아이콘 클릭 영역 */}
        <label htmlFor={id} className='flex items-center cursor-pointer w-[20px] h-[20px] relative'>
          {checked ? <CheckedIcon /> : <CheckIcon />}
        </label>

        <label htmlFor={id} className='text-sm text-gray-700 cursor-pointer'>
          {label}
        </label>
      </div>

      {error && <span className='text-xs text-red-500 mt-1'>{error}</span>}
    </div>
  );
}
