'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className='text-primary-300 h-screen'>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      ~~~어디가냥 메인 페이지~~~
      <br />
      <label>
        주소
        <input
          type='text'
          className='w-[200px] h-[24px] text-gray-800 bg-gray-100'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const inputValue = (e.target as HTMLInputElement).value;
              updateQuery('address', inputValue);
            }
          }}
        />
      </label>
      <br />
      <br />
      <label>
        검색
        <input
          type='text'
          className='w-[200px] h-[24px] text-gray-800 bg-gray-100'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const inputValue = (e.target as HTMLInputElement).value;
              updateQuery('keyword', inputValue);
            }
          }}
        />
      </label>
      <br />
      <br />
      <label>
        최소가격
        <input
          type='text'
          className='w-[200px] h-[24px] text-gray-800 bg-gray-100'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const inputValue = (e.target as HTMLInputElement).value;
              updateQuery('min-price', inputValue);
            }
          }}
        />
      </label>
      <br />
      <br />
      <label>
        최대가격
        <input
          type='text'
          className='w-[200px] h-[24px] text-gray-800 bg-gray-100'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const inputValue = (e.target as HTMLInputElement).value;
              updateQuery('max-price', inputValue);
            }
          }}
        />
      </label>
    </div>
  );
}
