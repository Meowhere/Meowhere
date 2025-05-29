'use client';

import { useModalStore } from '@/src/store/modalStore';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@/public/assets/icons/delete/ico-delete.svg';
import Image from 'next/image';

const Modal = () => {
  const { isOpen, modalProps, closeModal } = useModalStore();
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  // 접근성을 위한 고유 ID 생성
  const modalId = `modal-${Math.random().toString(36).substr(2, 9)}`;
  const modalTitleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // 포커스 트랩을 위해 모달에 포커스 설정
      const modalElement = modalRef.current || bottomSheetRef.current;
      if (modalElement) {
        modalElement.focus();
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
    if (modalProps?.type === 'alert') return;
    if (modalProps?.type !== 'bottomSheet' && window.innerWidth >= 768) return;
    e.stopPropagation();
    setDragStart(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleDragHandleMouseDown = (e: React.MouseEvent) => {
    if (modalProps?.type === 'alert') return;
    if (modalProps?.type !== 'bottomSheet' && window.innerWidth >= 768) return;
    e.stopPropagation();
    setDragStart(e.clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (modalProps?.type === 'alert' || !isDragging) return;
    if (modalProps?.type !== 'bottomSheet' && window.innerWidth >= 768) return;
    const currentY = e.touches[0].clientY;
    const offset = Math.max(0, currentY - dragStart);
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    if (modalProps?.type === 'alert' || !isDragging) return;
    if (modalProps?.type !== 'bottomSheet' && window.innerWidth >= 768) return;
    const threshold = 100; // 100px 이상 드래그하면 닫기
    if (dragOffset > threshold) {
      handleClose();
    }

    setDragOffset(0);
    setIsDragging(false);
    setDragStart(0);
  };

  useEffect(() => {
    if (isDragging && modalProps?.type !== 'alert') {
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
  }, [isDragging, dragStart, handleClose, modalProps?.type]);

  if (!isOpen || !modalProps) return null;

  const isBottomSheet = modalProps.type === 'bottomSheet';
  const isAlert = modalProps.type === 'alert';

  // 일반 모달 렌더링 레이아웃
  if (!isBottomSheet && !isAlert) {
    return createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm pt-24 md:pt-0"
        onClick={handleBackdropClick}
        role="presentation"
      >
        <div
          className={`relative w-full h-full flex flex-col md:max-w-md md:h-auto md:rounded-[1.5rem] animate-in max-md:slide-in-from-bottom duration-300 md:fade-in-0 md:zoom-in-95 rounded-t-[1.5rem] bg-white p-6 shadow-lg ${isDragging ? 'transition-none' : 'transition-transform'}`}
          onClick={(e) => e.stopPropagation()}
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalProps.header ? modalTitleId : undefined}
          aria-describedby={modalId}
          tabIndex={-1}
          style={{
            transform: `translateY(${dragOffset}px)`,
          }}
        >
          {/* Header */}
          {modalProps.header && (
            <div
              className="relative mb-4 flex items-center justify-center max-md:cursor-grab max-md:active:cursor-grabbing"
              onTouchStart={handleDragHandleTouchStart}
              onMouseDown={handleDragHandleMouseDown}
            >
              <h2 id={modalTitleId} className="font-medium text-gray-800">
                {modalProps.header}
              </h2>
              <button
                onClick={handleClose}
                className="absolute right-0 rounded-sm p-1"
                aria-label="모달 닫기"
                type="button"
              >
                <Image src={CloseIcon} alt="" width={24} height={24} />
              </button>
            </div>
          )}

          {/* Content */}
          <div
            id={modalId}
            className="flex flex-col text-gray-700 flex-grow overflow-auto"
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
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
        role="presentation"
      >
        <div
          className={`
            relative mx-4 w-[28rem] animate-in fade-in-0 zoom-in-95 duration-200 rounded-[1.5rem] bg-white p-6 shadow-lg
          `}
          onClick={(e) => e.stopPropagation()}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={modalProps.header ? modalTitleId : undefined}
          aria-describedby={modalId}
          tabIndex={-1}
        >
          {/* Header (Alert의 경우 숨겨진 제목) */}
          {modalProps.header && (
            <h2 id={modalTitleId} className="sr-only">
              {modalProps.header}
            </h2>
          )}

          {/* Content */}
          <div id={modalId} className="text-gray-700">
            {modalProps.children}
          </div>
        </div>
      </div>,
      document.body
    );
  }

  // 바텀 시트 렌더링 레이아웃
  return createPortal(
    <div
      className="fixed inset-0 z-50"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={bottomSheetRef}
        className={`
          fixed bottom-0 left-0 right-0 w-full
          animate-in slide-in-from-bottom duration-300
          rounded-t-xl bg-white/70 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl
          ${getHeightClasses(modalProps.height)}
          ${isDragging ? 'transition-none' : 'transition-transform'}
        `}
        style={{
          transform: `translateY(${dragOffset}px)`,
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalProps.header ? modalTitleId : undefined}
        aria-describedby={modalId}
        tabIndex={-1}
      >
        {/* Drag Handle - 드래그 가능한 영역 */}
        <div
          className="flex justify-center py-3 cursor-grab active:cursor-grabbing"
          onTouchStart={handleDragHandleTouchStart}
          onMouseDown={handleDragHandleMouseDown}
          aria-label="드래그하여 시트 이동"
          role="button"
          tabIndex={0}
        >
          <div className="h-1 w-24 rounded-full bg-white" />
        </div>

        {/* Header */}
        {modalProps.header && (
          <div className="flex items-center justify-end px-6 pb-4">
            <h2 id={modalTitleId} className="sr-only">
              {modalProps.header}
            </h2>
            <button
              onClick={handleClose}
              className="rounded-sm p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="시트 닫기"
              type="button"
            >
              <Image src={CloseIcon} alt="" width={24} height={24} />
            </button>
          </div>
        )}

        {/* Content */}
        <div
          id={modalId}
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
