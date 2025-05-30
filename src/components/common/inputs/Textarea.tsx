'use client';
import { useState } from 'react';
import clsx from 'clsx';
import { TextareaProps } from '../../../types/input.types';

export default function Textarea({ value, onChange, error, className }: TextareaProps) {
  return (
    <div className={clsx('w-full mb-6 relative', className)}>
      <div
        className={clsx(
          'px-6 py-4 rounded-2xl border bg-white relative',
          error ? 'border-red-300' : 'border-gray-200 focus-within:border-gray-200'
        )}
      >
        <textarea
          value={value}
          onChange={onChange}
          rows={36}
          maxLength={700}
          className='w-full bg-transparent border-none focus:outline-none resize-none text-sm font-regular text-gray-800 pt-6'
          style={{ minHeight: '10rem' }}
        />
        <div className='flex justify-between items-center mt-2'>
          <span className='text-gray-400 text-xs'>{value.length} / 700</span>
        </div>
      </div>
      {error && <div className='text-red-300 text-[15px] mt-2 ml-2'>{error}</div>}
    </div>
  );
}
