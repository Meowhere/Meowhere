export interface ModalProps {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  preventBackdropClose?: boolean;
  type?: 'modal' | 'bottomSheet' | 'alert';
  height?: 'auto' | 'half' | 'full';
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
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onClose?: () => void;
}