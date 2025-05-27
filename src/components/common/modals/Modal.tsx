'use client';

import { useModalStore } from '@/src/store/modalStore';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

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

  const handleClose = () => {
    if (modalProps?.onClose) {
      modalProps.onClose();
    }
    closeModal();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !modalProps?.preventBackdropClose) {
      handleClose();
    }
  };

  const getSizeClasses = (size: string = 'desktop') => {
    const sizeMap = {
      desktop: 'max-w-[28rem]',
      tablet: 'max-w-[28rem]',
      mobile: 'max-w-[24rem]',
    };
    return sizeMap[size as keyof typeof sizeMap] || sizeMap.desktop;
  };

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

  // 일반 모달 렌더링
  if (!isBottomSheet) {
    return createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div
          className={`
            relative mx-4 w-full ${getSizeClasses(modalProps.size)}
            animate-in fade-in-0 zoom-in-95 duration-200
            rounded-lg bg-white p-6 shadow-lg
            dark:bg-gray-900
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {modalProps.showCloseButton !== false && (
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={handleClose}
                className="rounded-sm p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-500 dark:hover:text-gray-300"
              >
                X
              </button>
            </div>
          )}

          {/* Content */}
          <div className="text-gray-700 dark:text-gray-300">
            {modalProps.children}
          </div>
        </div>
      </div>,
      document.body
    );
  }

  // 바텀 시트 렌더링
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
          dark:bg-gray-900
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
          <div className="h-1 w-12 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>

        {/* Header */}
        {(modalProps.title || modalProps.showCloseButton !== false) && (
          <div className="flex items-center justify-between px-6 pb-4">
            {modalProps.title && (
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {modalProps.title}
              </h2>
            )}
            {modalProps.showCloseButton !== false && (
              <button
                onClick={handleClose}
                className="rounded-sm p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-500 dark:hover:text-gray-300"
              >
                X
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div
          className="px-6 pb-6 text-gray-700 dark:text-gray-300 overflow-y-auto"
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
