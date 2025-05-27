import React from 'react';
import { useModalStore } from '../store/modalStore';
import { ModalProps } from '../types/modal.types';

export const useModal = () => {
  const { openModal, closeModal, isOpen } = useModalStore();

  const review = (options: {
    title?: string;
    content: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => {
    openModal({
      title: '후기 작성',
      preventBackdropClose: true,
      children: (
        <div className="flex flex-col space-y-4">
          <p className="text-sm text-center">{options.content}</p>
          <p className="text-sm text-center">{options.content}</p>
          <p className="text-sm text-center">{options.content}</p>
          <p className="text-sm text-center">{options.content}</p>
          <p className="text-sm text-center">{options.content}</p>
          <p className="text-sm text-center">{options.content}</p>
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => {
                options.onCancel?.();
                closeModal();
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {options.cancelText || '아니요'}
            </button>
            <button
              onClick={() => {
                options.onConfirm?.();
                closeModal();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-300 rounded-md hover:bg-primary-200"
            >
              {options.confirmText || '취소하기'}
            </button>
          </div>
        </div>
      ),
    });
  };

  const confirm = (options: {
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => {
    openModal({
      type: 'alert',
      preventBackdropClose: true,
      children: (
        <div className="flex flex-col space-y-4 gap-8">
          <p className="text-sm text-center">{options.message}</p>
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => {
                options.onCancel?.();
                closeModal();
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {options.cancelText || '아니요'}
            </button>
            <button
              onClick={() => {
                options.onConfirm?.();
                closeModal();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-300 rounded-md hover:bg-primary-200 focus:outline-none focus:ring-2"
            >
              {options.confirmText || '취소하기'}
            </button>
          </div>
        </div>
      ),
    });
  };

  const openBottomSheet = (props: Omit<ModalProps, 'type'>) => {
    openModal({
      ...props,
      type: 'bottomSheet',
    });
  };

  return {
    openModal,
    closeModal,
    isOpen,
    confirm,
    review,
    openBottomSheet,
  };
};
