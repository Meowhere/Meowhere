export type ToastType = 'success' | 'error';

export interface ToastState {
  isVisible: boolean;
  type: ToastType;
  message: string;
  showToast: (type: ToastType, message: string) => void;
  hideToast: () => void;
}
