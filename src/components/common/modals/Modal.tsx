'use client';

import { useModalStore } from '@/src/store/modalStore';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@/public/icons/close-icon.svg';
import Image from 'next/image';

const Modal = () => {
  const { isOpen, modalProps, closeModal } = useModalStore();
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 모달 닫기
  const handleClose = () => {
    if (modalProps?.onClose) {
      modalProps.onClose();
    }
    closeModal();
  };

  // 백그라운드 클릭시 모달 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // 바텀 시트 높이 조절
  const getHeightClasses = (height: string = 'auto') => {
    const heightMap = {
      auto: 'max-h-[90vh]',
      half: 'h-[50vh]',
      full: 'h-[90vh]',
    };
    return heightMap[height as keyof typeof heightMap] || heightMap.auto;
  };

  // 바텀 시트 드래그 핸들러 (드래그 핸들 영역에서만)
  const handleDragHandleTouchStart = (e: React.TouchEvent) => {
    if (modalProps?.type !== 'bottomSheet') return;
    e.stopPropagation();
    setDragStart(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleDragHandleMouseDown = (e: React.MouseEvent) => {
    if (modalProps?.type !== 'bottomSheet') return;
    e.stopPropagation();
    setDragStart(e.clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (modalProps?.type !== 'bottomSheet' || !isDragging) return;
    const currentY = e.touches[0].clientY;
    const offset = Math.max(0, currentY - dragStart);
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    if (modalProps?.type !== 'bottomSheet' || !isDragging) return;

    const threshold = 100; // 100px 이상 드래그하면 닫기
    if (dragOffset > threshold) {
      handleClose();
    }

    setDragOffset(0);
    setIsDragging(false);
    setDragStart(0);
  };

  useEffect(() => {
    if (isDragging && modalProps?.type === 'bottomSheet') {
      const handleGlobalTouchMove = (e: TouchEvent) => {
        const offset = Math.max(0, e.touches[0].clientY - dragStart);
        setDragOffset(offset);
      };

      const handleGlobalTouchEnd = () => {
        const threshold = 100;
        if (dragOffset > threshold) {
          handleClose();
        }

        setDragOffset(0);
        setIsDragging(false);
        setDragStart(0);
      };

      const handleGlobalMouseMove = (e: MouseEvent) => {
        const offset = Math.max(0, e.clientY - dragStart);
        setDragOffset(offset);
      };

      const handleGlobalMouseUp = () => {
        const threshold = 100;
        if (dragOffset > threshold) {
          handleClose();
        }

        setDragOffset(0);
        setIsDragging(false);
        setDragStart(0);
      };

      document.addEventListener('touchmove', handleGlobalTouchMove);
      document.addEventListener('touchend', handleGlobalTouchEnd);
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        document.removeEventListener('touchmove', handleGlobalTouchMove);
        document.removeEventListener('touchend', handleGlobalTouchEnd);
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, dragStart, dragOffset, modalProps?.type]);

  if (!isOpen || !modalProps) return null;

  const isBottomSheet = modalProps.type === 'bottomSheet';
  const isAlert = modalProps.type === 'alert';

  // 일반 모달 렌더링 레이아웃
  if (!isBottomSheet && !isAlert) {
    return createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm pt-24 md:pt-0"
        onClick={handleBackdropClick}
      >
        <div
          className="relative w-full h-full flex flex-col md:max-w-md md:h-auto md:rounded-[1.5rem] animate-in fade-in-0 zoom-in-95 duration-200 rounded-t-[1.5rem] bg-white p-6 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {modalProps.title && (
            <div className="relative mb-4 flex items-center justify-center">
              <h2 className="font-medium text-gray-800">{modalProps.title}</h2>
              <button
                onClick={handleClose}
                className="absolute right-0 rounded-sm p-1"
              >
                <Image src={CloseIcon} alt="close" width={24} height={24} />
              </button>
            </div>
          )}

          {/* Content */}
          <div className="flex flex-col text-gray-700 flex-grow overflow-auto">
            {modalProps.children}
          </div>
        </div>
      </div>,
      document.body
    );
  }

  // 경고 모달 렌더링 레이아웃
  if (isAlert) {
    return createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div
          className={`
            relative mx-4 w-[28rem] animate-in fade-in-0 zoom-in-95 duration-200 rounded-[1.5rem] bg-white p-6 shadow-lg
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Content */}
          <div className="text-gray-700">{modalProps.children}</div>
        </div>
      </div>,
      document.body
    );
  }

  // 바텀 시트 렌더링 레이아웃
  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={bottomSheetRef}
        className={`
          fixed bottom-0 left-0 right-0 w-full
          animate-in slide-in-from-bottom duration-300
          rounded-t-xl bg-white shadow-lg
          ${getHeightClasses(modalProps.height)}
          ${isDragging ? 'transition-none' : 'transition-transform'}
        `}
        style={{
          transform: `translateY(${dragOffset}px)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle - 드래그 가능한 영역 */}
        <div
          className="flex justify-center py-3 cursor-grab active:cursor-grabbing"
          onTouchStart={handleDragHandleTouchStart}
          onMouseDown={handleDragHandleMouseDown}
        >
          <div className="h-1 w-12 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        {modalProps.title && (
          <div className="flex items-center justify-end px-6 pb-4">
            <button
              onClick={handleClose}
              className="rounded-sm p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Image src={CloseIcon} alt="close" width={24} height={24} />
            </button>
          </div>
        )}

        {/* Content */}
        <div
          className="px-6 pb-6 text-gray-700 overflow-y-auto"
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {modalProps.children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
