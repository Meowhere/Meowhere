'use client';

import { useEffect, useState } from 'react';
import Modal from '../common/modals/Modal';

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <Modal />;
}
