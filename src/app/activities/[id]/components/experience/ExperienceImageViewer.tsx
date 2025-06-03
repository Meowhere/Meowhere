'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import CloseButton from '@/src/components/common/buttons/CloseButton';

const imageUrls = [
  '/assets/icons/img-main.png',
  '/assets/icons/img-sub1.png',
  '/assets/icons/img-sub2.png',
  '/assets/icons/img-sub3.png',
];

export default function ExperienceImageViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <div className='grid grid-cols-2 gap-0.5 p-4 max-w-[69.1rem] mx-auto'>
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className='w-full aspect-square relative overflow-hidden rounded-lg cursor-pointer'
            onClick={() => {
              setCurrentIndex(index);
              setIsOpen(true);
            }}
          >
            <Image
              src={url}
              alt={`체험 이미지 ${index + 1}`}
              width={161}
              height={161}
              priority
              className='object-cover w-full h-full'
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <div className='fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center'>
          <CloseButton
            size='sm'
            onClick={() => setIsOpen(false)}
            className='absolute top-4 right-4 z-[10000]'
          />

          <div className='w-full h-full flex items-end justify-center p-4 pb-16'>
            <Swiper
              initialSlide={currentIndex}
              spaceBetween={10}
              slidesPerView={1}
              modules={[Pagination]}
              pagination={{ clickable: true }}
              className='w-full h-full max-w-[90vw] max-h-[90vh]'
            >
              {imageUrls.map((url, index) => (
                <SwiperSlide key={index} className='w-full h-full flex items-center justify-center'>
                  <img
                    src={url}
                    alt={`확대 이미지 ${index + 1}`}
                    className='w-full h-auto max-h-full object-contain'
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
}
