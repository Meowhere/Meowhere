import { create } from 'zustand';
import { ToastState, ToastType } from '../types/toast.types';

export const useToastStore = create<ToastState>((set, get) => ({
  isVisible: false,
  type: 'success' as ToastType,
  message: '',
  timeoutId: null,
  showToast: (type, message) => {
    const { timeoutId } = get();

    // 기존 타이머가 있으면 취소
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    set({ isVisible: true, type: type, message: message });

    // 새로운 타이머 설정
    const newTimeoutId = setTimeout(() => {
      set({ isVisible: false, timeoutId: null });
    }, 3000);

    set({ timeoutId: newTimeoutId });
  },
}));
