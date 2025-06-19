'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { SubImage } from '@/src/types/activity.types';
import { useGnbStore } from '@/src/store/gnbStore';
import SubPageGNB from '@/src/components/layout/navbar/components/SubPageGNB';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import ArrowButton from '@/src/components/common/buttons/ArrowButton';

interface ExperienceImageViewerProps {
  bannerImageUrl: string;
  subImages: SubImage[];
  pageTitle?: string;
}

export default function ExperienceImageViewer({
  bannerImageUrl,
  subImages,
  pageTitle = '체험 상세',
}: ExperienceImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isDesktop } = useBreakpoint();

  // 전체 이미지 목록 (대표 + 서브)
  const imageUrls = [bannerImageUrl, ...(subImages?.map((img) => img.imageUrl) ?? [])].filter(
    (url) => !!url
  );

  // 미리보기는 최대 4장까지만
  const previewUrls = imageUrls.slice(0, 4);

  const { setTitle, setBackAction, resetGnb } = useGnbStore();

  const openImageViewer = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    setTitle(`${index + 1} / ${imageUrls.length}`);
    setBackAction(() => closeImageViewer());
  };

  const closeImageViewer = () => {
    setIsOpen(false);
    setTitle(pageTitle);
    setBackAction(null);
  };

  useEffect(() => {
    if (isOpen) {
      setTitle(`${currentIndex + 1} / ${imageUrls.length}`);
    }
  }, [currentIndex, isOpen]);

  useEffect(() => {
    return () => {
      if (isOpen) resetGnb();
    };
  }, []);

  return (
    <>
      <div className='overflow-hidden'>
        <div className='grid grid-cols-2 gap-[5px] mt-4 mb-4 mx-auto rounded-[30px] overflow-hidden'>
          {previewUrls.map((url, index) => (
            <div
              key={index}
              className='w-full aspect-square relative overflow-hidden rounded-[8px] cursor-pointer'
              onClick={() => openImageViewer(index)}
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
        <div className='fixed inset-0 z-[9999] bg-white scrollbar-hide'>
          <SubPageGNB />
          <div className='pt-[56px] h-full relative'>
            {isDesktop && (
              <>
                <ArrowButton
                  direction='left'
                  className='swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10'
                  size={24}
                />
                <ArrowButton
                  direction='right'
                  className='swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10'
                  size={24}
                />
              </>
            )}
            <Swiper
              modules={[Navigation]}
              initialSlide={currentIndex}
              spaceBetween={10}
              slidesPerView={1}
              onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
              navigation={
                isDesktop && {
                  prevEl: '.swiper-button-prev',
                  nextEl: '.swiper-button-next',
                }
              }
              className='w-full h-full'
            >
              {imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div className='flex justify-center items-center w-full h-full'>
                    <div className='relative w-full max-w-[1200px] h-full flex items-center justify-center'>
                      <Image
                        src={url}
                        alt={`확대 이미지 ${index + 1}`}
                        fill
                        className='object-contain'
                        sizes='100vw'
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
}
