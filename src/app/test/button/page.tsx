'use client';

import { useState } from 'react';
import ArrowButton from '@/src/components/common/buttons/ArrowButton';
import BaseButton from '@/src/components/common/buttons/BaseButton';
import CloseButton from '@/src/components/common/buttons/CloseButton';
import HeartButton from '@/src/components/common/buttons/HeartButton';
import KakaoLoginButton from '@/src/components/common/buttons/KakaoLoginButton';
import KebabButton from '@/src/components/common/buttons/KebabButton';
import StarRating from '@/src/components/common/buttons/StarRating';
import VisibilityToggleButton from '@/src/components/common/buttons/VisibilityToggleButton';

export default function ArrowButtonTestPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedBlack, setLikedBlack] = useState(false);
  const [likedWhite, setLikedWhite] = useState(false);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');

  const handleClick = (direction: 'left' | 'right' | 'down') => {
    if (direction === 'down') {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-center mb-12 text-gray-800'>
          ArrowButton 컴포넌트 테스트
        </h1>

        {/* 기본 버튼들 */}
        <section className='mb-12'>
          <h2 className='text-xl font-semibold mb-6 text-gray-700'>기본 ArrowButton</h2>
          <div className='flex items-center justify-center gap-8 p-8 bg-white rounded-lg shadow-md'>
            <div className='text-center'>
              <ArrowButton direction='left' onClick={() => handleClick('left')} />
            </div>

            <div className='text-center'>
              <ArrowButton direction='right' onClick={() => handleClick('right')} />
            </div>

            <div className='text-center'>
              <ArrowButton direction='right' onClick={() => handleClick('right')} />
            </div>

            <div className='text-center'>
              <ArrowButton
                direction='down'
                isOpen={isDropdownOpen}
                onClick={() => handleClick('down')}
              />
            </div>
          </div>
        </section>

        {/* 드롭다운 예시 */}
        <section className='mb-12'>
          <h2 className='text-xl font-semibold mb-6 text-gray-700'>드롭다운 예시</h2>
          <div className='flex justify-center'>
            <div className='relative'>
              <div className='flex items-center gap-2 p-3 bg-white border border-gray-300 rounded-lg shadow-sm'>
                <span className='text-gray-700'>메뉴 선택</span>
                <ArrowButton
                  direction='down'
                  isOpen={isDropdownOpen}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
              </div>

              {isDropdownOpen && (
                <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10'>
                  <div className='p-2'>
                    <div className='p-2 hover:bg-gray-100 rounded cursor-pointer'>옵션 1</div>
                    <div className='p-2 hover:bg-gray-100 rounded cursor-pointer'>옵션 2</div>
                    <div className='p-2 hover:bg-gray-100 rounded cursor-pointer'>옵션 3</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Base 버튼들 */}
        <section className='mb-12'>
          <h2 className='text-xl font-semibold mb-6 text-gray-700'>BaseButton</h2>
          <div className='flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow-md'>
            <BaseButton>로그인</BaseButton>

            <BaseButton disabled>로그인</BaseButton>

            <BaseButton variant='outline'>후기 작성 취소</BaseButton>

            <BaseButton variant='soft'>후기 쓰기</BaseButton>

            <BaseButton variant='ghost'>취소</BaseButton>

            <BaseButton className='w-[16rem]'>작은 버튼</BaseButton>
          </div>
        </section>

        {/* CloseButton 테스트 */}
        <section className='mb-12'>
          <h2 className='text-xl font-semibold mb-6 text-gray-700'>
            CloseButton (닫기 버튼) 테스트
          </h2>
          <div className='flex justify-center'>
            <BaseButton onClick={() => setIsModalOpen(true)}>모달 열기</BaseButton>
          </div>

          {isModalOpen && (
            <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20'>
              <div className='relative bg-black rounded-lg p-6 shadow-lg w-[320px] text-center'>
                <CloseButton
                  onClick={() => setIsModalOpen(false)}
                  size='sm'
                  className='absolute top-3 right-3'
                />
                <p className='mt-8 text-gray-700'>닫기 버튼 테스트용 모달</p>
              </div>
            </div>
          )}
        </section>

        {/* HeartButton 테스트 */}
        <section className='mb-12'>
          <h2 className='text-xl font-semibold mb-6 text-gray-700'>HeartButton 테스트</h2>
          <div className='flex justify-center gap-6'>
            <HeartButton
              isLiked={likedBlack}
              onToggle={() => setLikedBlack((prev) => !prev)}
              variant='black'
            />
            <HeartButton
              isLiked={likedWhite}
              onToggle={() => setLikedWhite((prev) => !prev)}
              variant='white'
            />
          </div>
        </section>

        {/* KakaoLoginButton 테스트 */}
        <section className='mb-12'>
          <h2 className='text-xl font-semibold mb-6 text-gray-700'>KakaoLoginButton 테스트</h2>
          <div className='flex justify-center gap-6'>
            <KakaoLoginButton onClick={() => console.log('카카오 로그인 버튼 클릭됨')} />
          </div>
        </section>

        {/* KebabButton 테스트 */}
        <section className='mb-12'>
          <h2 className='text-xl font-semibold mb-6 text-gray-700'>KebabButton 테스트</h2>
          <div className='inline-flex justify-center relative'>
            {/* 케밥 버튼 */}
            <KebabButton onToggle={() => setOpen((prev) => !prev)} />

            {/* 드롭다운 */}
            {open && (
              <div className='absolute top-full right-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-xl z-30 overflow-hidden'>
                <div className='text-sm text-gray-800 px-4 py-3 text-center'>수정하기</div>
                <div className='text-sm text-red-500 px-4 py-3 text-center'>삭제</div>
              </div>
            )}
          </div>
        </section>

        {/* StarRating 테스트 */}
        <section className='mb-12'>
          <h2 className='text-xl font-semibold mb-6 text-gray-700'>StarRating 테스트</h2>
          <div className='flex justify-center gap-6'>
            <StarRating value={rating} onChange={setRating} />
          </div>
        </section>

        {/* VisibilityToggleButton 테스트 */}
        <section className='mb-12'>
          <h2 className='text-xl font-semibold mb-6 text-gray-700'>
            VisibilityToggleButton 테스트
          </h2>
          <div className='flex justify-center items-center gap-3 bg-white p-4 rounded-lg shadow-md'>
            <input
              type={isVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400'
              placeholder='비밀번호 입력'
            />
            <VisibilityToggleButton
              isVisible={isVisible}
              onToggle={() => setIsVisible((prev) => !prev)}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
