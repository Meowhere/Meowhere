export interface ModalProps {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  preventBackdropClose?: boolean;
  type?: 'modal' | 'bottomSheet' | 'alert'; // 모달 타입
  height?: 'auto' | 'half' | 'full'; // 바텀 시트 높이 조절
}

export interface ModalState {
  isOpen: boolean;
  modalProps: ModalProps | null;
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
}

export interface ReviewModalProps {
  title?: string;
  content: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}
