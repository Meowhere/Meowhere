export type ToastType = 'success' | 'error';

export interface ToastState {
  isVisible: boolean;
  type: ToastType;
  message: string;
  timeoutId: NodeJS.Timeout | null;
  showToast: (type: ToastType, message: string) => void;
}
