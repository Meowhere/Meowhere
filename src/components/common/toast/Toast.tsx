'use client';
import { useToastStore } from '@/src/store/toastStore';
import CheckCircleIcon from '../icons/CheckCircle';
import AlertCircleIcon from '../icons/AlertCircle';
import { AnimatePresence, motion } from 'framer-motion';

export default function Toast() {
  const { isVisible, type, message } = useToastStore();

  const icon = type === 'success' ? <CheckCircleIcon size={40} /> : <AlertCircleIcon size={40} />;
  return (
    <AnimatePresence>
      {isVisible && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-start pt-4 z-50 pointer-events-none'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className='border px-[32px] py-[18px] rounded-[40px] shadow flex items-center gap-[20px] bg-white'
          >
            {icon}
            <span className='text-gray-800 text-xl font-bold'>{message}</span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
