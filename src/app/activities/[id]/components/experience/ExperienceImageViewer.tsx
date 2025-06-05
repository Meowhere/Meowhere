'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { SubImage } from '@/src/types/activity.types';

interface ExperienceImageViewerProps {
  bannerImageUrl: string;
  subImages: SubImage[];
}

export default function ExperienceImageViewer({
  bannerImageUrl,
  subImages,
}: ExperienceImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageUrls = [bannerImageUrl, ...subImages.map((img) => img.imageUrl)];

  return (
    <>
      <div className='overflow-hidden'>
        <div className='grid grid-cols-2 gap-[5px] mt-4 mb-4 mx-auto'>
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className='w-full aspect-square relative overflow-hidden rounded-[8px] cursor-pointer'
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
      </div>

      {isOpen && (
        <div className='fixed inset-0 z-[9999] bg-white flex items-center justify-center scrollbar-hide'>
          <Swiper
            initialSlide={currentIndex}
            spaceBetween={10}
            slidesPerView={1}
            className='w-full h-full max-w-[90vw] max-h-[90vh]'
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          >
            {imageUrls.map((url, index) => (
              <SwiperSlide key={index} className='flex items-center justify-center'>
                <img
                  src={url}
                  alt={`확대 이미지 ${index + 1}`}
                  className='w-full max-h-[calc(100vh-64px)] object-contain'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
