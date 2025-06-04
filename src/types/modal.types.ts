import { Schedule } from './activity.types';

export interface ModalProps {
  header?: string;
  children: React.ReactNode;
  onClose?: () => void;
  type?: 'modal' | 'bottomSheet' | 'alert'; // 모달 타입
  height?: 'auto' | 'half' | 'full'; // 바텀 시트 높이 조절
}

export interface ModalState {
  isOpen: boolean;
  modalProps: ModalProps | null;
  isClosing: boolean;
  closeHandler: (() => void) | null;
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
  resetModal: () => void;
  setCloseHandler: (handler: () => void) => void;
  setIsClosing: (closing: boolean) => void;
}

export interface CreateReviewModalProps {
  header?: string;
  title: string;
  schedule: Schedule;
  headCount: number;
  price: number;
  rating: number;
  onConfirm: () => void;
}
