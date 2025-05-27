import React from 'react';
import { useModalStore } from '../store/modalStore';
import { ModalProps } from '../types/modal.types';

export const useModal = () => {
  const { openModal, closeModal, isOpen } = useModalStore();

  const confirm = (options: {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => {
    openModal({
      size: 'desktop',
      preventBackdropClose: true,
      children: (
        <div className="space-y-4">
          <p className="text-sm">{options.message}</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                options.onCancel?.();
                closeModal();
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              {options.cancelText || '취소'}
            </button>
            <button
              onClick={() => {
                options.onConfirm?.();
                closeModal();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {options.confirmText || '확인'}
            </button>
          </div>
        </div>
      ),
    });
  };

  const alert = (options: {
    title?: string;
    message: string;
    confirmText?: string;
    onConfirm?: () => void;
  }) => {
    openModal({
      size: 'desktop',
      preventBackdropClose: true,
      children: (
        <div className="space-y-4">
          <p className="text-sm">{options.message}</p>
          <div className="flex justify-end">
            <button
              onClick={() => {
                options.onConfirm?.();
                closeModal();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {options.confirmText || '확인'}
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
    alert,
    openBottomSheet,
  };
};
