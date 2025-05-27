export interface ModalProps {
  children: React.ReactNode;
  size?: 'desktop' | 'tablet' | 'mobile';
  showCloseButton?: boolean;
  onClose?: () => void;
  preventBackdropClose?: boolean;
  type?: 'modal' | 'bottomSheet';
  height?: 'auto' | 'half' | 'full';
}

export interface ModalState {
  isOpen: boolean;
  modalProps: ModalProps | null;
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
}
