import { create } from 'zustand';
import { ModalState } from '../types/modal.types';

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalProps: null,
  openModal: (props) => set({ isOpen: true, modalProps: props }),
  closeModal: () => set({ isOpen: false, modalProps: null }),
}));
