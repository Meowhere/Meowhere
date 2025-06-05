'use client';

import { useEffect, useState } from 'react';
import Modal from '../common/modals/Modal';
import ConfirmModal from '../common/modals/ConfirmModal';
import { useConfirmModal } from '@/src/hooks/useConfirmModal';

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  const { ConfirmModal } = useConfirmModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Modal />
      <ConfirmModal />
    </>
  );
}
