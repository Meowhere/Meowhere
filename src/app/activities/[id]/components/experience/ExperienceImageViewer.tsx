'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { SubImage } from '@/src/types/activity.types';
import { useGnbStore } from '@/src/store/gnbStore';
import SubPageGNB from '@/src/components/layout/navbar/components/SubPageGNB';

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

  // 전체 이미지 목록 (대표 + 서브)
  const imageUrls = [bannerImageUrl, ...(subImages?.map((img) => img.imageUrl) ?? [])].filter(
    (url) => !!url
  );

  // 미리보기는 최대 4장까지만
  const previewUrls = imageUrls.slice(0, 4);

  const router = useRouter();
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
  }, [isOpen]);

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
                src={url || '/assets/placeholder.png'}
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
          <div className='pt-[56px] h-full'>
            <Swiper
              initialSlide={currentIndex}
              spaceBetween={10}
              slidesPerView={1}
              className='w-full h-full'
              onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            >
              {imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div className='w-full h-full flex items-center justify-center'>
                    <div className='relative w-full h-full max-h-[calc(100vh-56px)] flex items-center justify-center'>
                      <Image
                        src={url || '/assets/placeholder.png'}
                        alt={`확대 이미지 ${index + 1}`}
                        fill
                        className='object-contain'
                        priority={index === 0}
                        quality={100}
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
