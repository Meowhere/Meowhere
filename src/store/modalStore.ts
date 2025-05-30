import { create } from 'zustand';
import { ModalProps, ModalState } from '../types/modal.types';

export const useModalStore = create<ModalState>((set, get) => ({
  isOpen: false,
  modalProps: null,
  isClosing: false,
  closeHandler: null,

  openModal: (props: ModalProps) => {
    set({
      isOpen: true,
      modalProps: props,
      isClosing: false,
    });
  },

  resetModal: () => {
    set({
      isOpen: false,
      modalProps: null,
      isClosing: false,
    });
  },

  closeModal: () => {
    const { closeHandler } = get();
    if (closeHandler) {
      closeHandler();
    } else {
      // fallback: 애니메이션 핸들러가 없으면 바로 닫기
      get().resetModal();
    }
  },

  setCloseHandler: (handler: () => void) => {
    set({ closeHandler: handler });
  },

  setIsClosing: (closing: boolean) => {
    set({ isClosing: closing });
  },
}));
