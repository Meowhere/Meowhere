import { create } from 'zustand';
import { ToastState, ToastType } from '../types/toast.types';

export const useToastStore = create<ToastState>((set) => ({
  isVisible: false,
  type: 'success' as ToastType,
  message: '',
  showToast: (type, message) => {
    set({ isVisible: true, type: type, message: message });

    setTimeout(() => {
      set({ isVisible: false });
    }, 3000);
  },
  hideToast: () => set({ isVisible: false }),
}));
