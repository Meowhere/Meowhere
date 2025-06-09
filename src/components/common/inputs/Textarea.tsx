'use client';
import { useRef, useEffect, forwardRef } from 'react';
import clsx from 'clsx';
import { TextareaProps } from '../../../types/input.types';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    name,
    watchValue = '',
    error,
    placeholder = '내용을 입력해 주세요',
    className,
    disabled = false,
    required = false,
    maxLength = 700,
    rows = 5,
    autoResize = false,
    scrollable = true,
    maxHeight = '300px',
    ...rest
  },
  ref
) {
  const internalRef = useRef<HTMLTextAreaElement>(null);

  // ref 합성 함수
  const setRefs = (el: HTMLTextAreaElement | null) => {
    internalRef.current = el;
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  };

  // 에러 메시지 처리
  const errorMessage = typeof error === 'string' ? error : error?.message;

  // 스타일 통합
  const getTextareaStyles = () => {
    const styles: React.CSSProperties = {};

    // maxHeight 동적 설정
    if (!autoResize && !scrollable) {
      styles.maxHeight = maxHeight;
      styles.overflowY = 'hidden';
    }

    return styles;
  };

  // textarea 스타일 조건
  const getTextareaClasses = () => ({
    // resize 옵션
    'resize-none': autoResize || !scrollable,
    'resize-y': !autoResize && scrollable,
    // overflow 옵션
    'overflow-hidden': !scrollable && !autoResize,
    'overflow-y-auto': scrollable && !autoResize,
  });

  // 자동 높이 조절 함수
  const adjustHeight = () => {
    const el = internalRef.current;
    if (el && autoResize) {
      el.style.height = 'auto';
      const scrollHeight = el.scrollHeight;
      const maxHeightValue = parseInt(maxHeight);

      if (scrollHeight <= maxHeightValue) {
        el.style.height = `${scrollHeight}px`;
        el.style.overflowY = 'hidden';
      } else {
        el.style.height = maxHeight;
        el.style.overflowY = scrollable ? 'auto' : 'hidden';
      }
    }
  };

  // watchValue 변경시 높이 조절
  useEffect(() => {
    if (autoResize) {
      adjustHeight();
    }
  }, [watchValue, autoResize]);

  return (
    <div className={clsx('w-full mb-6 relative', className)}>
      <div
        className={clsx(
          'px-[20px] py-[12px] rounded-2xl border bg-white relative transition-colors duration-200',
          error ? 'border-red-300' : 'border-gray-200',
          disabled && 'bg-gray-50 cursor-not-allowed'
        )}
      >
        <textarea
          {...rest}
          ref={setRefs}
          name={name}
          rows={autoResize ? 1 : rows}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          onInput={adjustHeight}
          className={clsx(
            'w-full bg-transparent border-none focus:outline-none resize-none text-md font-regular placeholder:text-gray-500 scrollbar-hide',
            errorMessage ? 'text-red-300' : 'text-gray-800',
            getTextareaClasses(),
            disabled && 'cursor-not-allowed text-gray-400'
          )}
          style={getTextareaStyles()}
        />
        {/* 글자 수 카운터 */}
        {maxLength && (
          <div className='flex justify-end items-center mt-2'>
            <span
              className={clsx(
                'text-xs',
                (watchValue?.length || 0) > maxLength * 0.9 ? 'text-red-400' : 'text-gray-400'
              )}
            >
              {watchValue?.length || 0} / {maxLength}
            </span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {errorMessage && <div className='text-red-300 text-md mt-2 ml-2'>{errorMessage}</div>}
    </div>
  );
});

export default Textarea;
