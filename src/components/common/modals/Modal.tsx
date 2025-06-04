'use client';

import { useModalStore } from '@/src/store/modalStore';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import CloseButton from '../buttons/CloseButton';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

const Modal = () => {
  const { isOpen, modalProps, resetModal, setCloseHandler, isClosing, setIsClosing } =
    useModalStore();
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false); // 드래그 애니메이션
  const modalRef = useRef<HTMLDivElement>(null);
  const bottomSheetRef = useRef<HTMLDivElement>(null);
  const { isDesktop } = useBreakpoint();

  // 접근성을 위한 고유 ID 생성
  const modalId = `modal-${Math.random().toString(36).substr(2, 9)}`;
  const modalTitleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      // document.body.style.overflow = 'hidden';
      // 포커스 트랩을 위해 모달에 포커스 설정
      const modalElement = modalRef.current || bottomSheetRef.current;
      if (modalElement) {
        modalElement.focus();
      }
      setCloseHandler(handleClose);
    } else {
      document.body.style.overflow = 'unset';
      setIsClosing(false);
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
    if (isClosing) return;

    if (modalProps?.onClose) {
      modalProps.onClose();
    }

    // 닫기 애니메이션 시작
    setIsClosing(true);

    // 애니메이션 완료 후 실제 모달 닫기
    setTimeout(() => {
      resetModal();
    }, 300);
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

  // 드래그 핸들러 (드래그 핸들 영역에서만)
  const handleDragHandleTouchStart = (e: React.TouchEvent) => {
    if (modalProps?.type === 'alert') return;
    if (modalProps?.type !== 'bottomSheet' && isDesktop) return;
    e.stopPropagation();
    setDragStart(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleDragHandleMouseDown = (e: React.MouseEvent) => {
    if (modalProps?.type === 'alert') return;
    if (modalProps?.type !== 'bottomSheet' && isDesktop) return;
    e.stopPropagation();
    setDragStart(e.clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (modalProps?.type === 'alert' || !isDragging) return;
    if (modalProps?.type !== 'bottomSheet' && isDesktop) return;
    const currentY = e.touches[0].clientY;
    const offset = Math.max(0, currentY - dragStart);
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    if (modalProps?.type === 'alert' || !isDragging) return;
    if (modalProps?.type !== 'bottomSheet' && isDesktop) return;
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

  if ((!isOpen && !isClosing) || !modalProps) return null;

  const isBottomSheet = modalProps.type === 'bottomSheet';
  const isAlert = modalProps.type === 'alert';

  // 일반 모달 렌더링 레이아웃
  if (!isBottomSheet && !isAlert) {
    return createPortal(
      <div
        className={clsx(
          'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm pt-[96px] lg:pt-0',
          isClosing ? 'animate-out fade-out-0 duration-300' : 'animate-in fade-in-0 duration-300'
        )}
        onClick={handleBackdropClick}
        role='presentation'
      >
        <div
          className={clsx(
            'relative w-full h-full flex flex-col lg:max-w-[480px] lg:h-auto lg:rounded-[20px] focus:outline-none',
            'rounded-t-[20px] bg-white p-[24px] shadow-lg text-lg',
            isDragging ? 'transition-none' : 'transition-transform',
            isClosing
              ? 'animate-out max-lg:slide-out-to-bottom duration-300 lg:fade-out-0 lg:zoom-out-95'
              : 'animate-in max-lg:slide-in-from-bottom duration-300 lg:fade-in-0 lg:zoom-in-95'
          )}
          onClick={(e) => e.stopPropagation()}
          ref={modalRef}
          role='dialog'
          aria-modal='true'
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
              className='relative mb-4 flex items-center justify-center max-lg:cursor-grab max-lg:active:cursor-grabbing'
              onTouchStart={handleDragHandleTouchStart}
              onMouseDown={handleDragHandleMouseDown}
            >
              <h2 id={modalTitleId} className='font-medium text-lg text-gray-800'>
                {modalProps.header}
              </h2>
              <CloseButton onClick={handleClose} className='absolute right-0' size='sm' />
            </div>
          )}

          {/* Content */}
          <div
            id={modalId}
            className='flex flex-col text-gray-700 flex-grow overflow-auto'
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
        className={clsx(
          'fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm',
          isClosing ? 'animate-out fade-out-0 duration-300' : 'animate-in fade-in-0 duration-300'
        )}
        onClick={handleBackdropClick}
        role='presentation'
      >
        <div
          className={clsx(
            'relative mx-[16px] w-[260px] rounded-[12px] bg-white p-[12px] shadow-lg focus:outline-none',
            isClosing
              ? 'animate-out fade-out-0 zoom-out-95 duration-300'
              : 'animate-in fade-in-0 zoom-in-95 duration-300'
          )}
          onClick={(e) => e.stopPropagation()}
          role='alertdialog'
          aria-modal='true'
          aria-labelledby={modalProps.header ? modalTitleId : undefined}
          aria-describedby={modalId}
          tabIndex={-1}
        >
          {/* Header (Alert의 경우 숨겨진 제목) */}
          {modalProps.header && (
            <h2 id={modalTitleId} className='sr-only'>
              {modalProps.header}
            </h2>
          )}

          {/* Content */}
          <div id={modalId} className='text-gray-700'>
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
      className={clsx(
        'fixed inset-0 z-50',
        isClosing
          ? 'animate-out slide-out-to-bottom duration-300'
          : 'animate-in slide-in-from-bottom duration-300'
      )}
      onClick={handleBackdropClick}
      role='presentation'
    >
      <div
        ref={bottomSheetRef}
        className={clsx(
          'fixed bottom-0 left-0 right-0 w-full focus:outline-none text-lg',
          'animate-in slide-in-from-bottom duration-300',
          'rounded-t-[12px] bg-white/70 backdrop-blur-xl rounded-[12px] border border-white/20 shadow-2xl',
          getHeightClasses(modalProps.height),
          isDragging ? 'transition-none' : 'transition-transform'
        )}
        style={{
          transform: `translateY(${dragOffset}px)`,
        }}
        onClick={(e) => e.stopPropagation()}
        role='dialog'
        aria-modal='true'
        aria-labelledby={modalProps.header ? modalTitleId : undefined}
        aria-describedby={modalId}
        tabIndex={-1}
      >
        {/* Drag Handle - 드래그 가능한 영역 */}
        <div
          className='flex justify-center py-[12px] cursor-grab active:cursor-grabbing'
          onTouchStart={handleDragHandleTouchStart}
          onMouseDown={handleDragHandleMouseDown}
          aria-label='드래그하여 시트 이동'
          role='button'
          tabIndex={0}
        >
          <div className='h-1 w-[90px] rounded-full bg-white' />
        </div>

        {/* Header */}
        {modalProps.header && (
          <div className='flex items-center justify-end px-[24px] pb-[16px]'>
            <h2 id={modalTitleId} className='sr-only'>
              {modalProps.header}
            </h2>
            <button
              onClick={handleClose}
              className='rounded-sm p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
              aria-label='시트 닫기'
              type='button'
            >
              <CloseButton />
            </button>
          </div>
        )}

        {/* Content */}
        <div
          id={modalId}
          className='px-[24px] pb-[24px] text-gray-700 overflow-y-auto'
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
