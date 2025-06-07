import { CheckboxProps } from '@/src/types/form.types';

export default function Checkbox({ id, checked, onChange, label, error }: CheckboxProps) {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className='w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500'
        />
        <label htmlFor={id} className='text-sm text-gray-700 cursor-pointer'>
          {label}
        </label>
      </div>
      {error && <span className='text-xs text-red-500 mt-1'>{error}</span>}
    </div>
  );
}
