'use client';
import { useToastStore } from '@/src/store/toastStore';
import CheckCircleIcon from '../icons/CheckCircle';
import AlertCircleIcon from '../icons/AlertCircle';
import { AnimatePresence, motion } from 'framer-motion';
import { useBreakpoint } from '@/src/hooks/useBreakpoint';

export default function Toast() {
  const { isVisible, type, message } = useToastStore();
  const { isDesktop } = useBreakpoint();

  const icon = type === 'success' ? <CheckCircleIcon size={40} /> : <AlertCircleIcon size={40} />;

  return (
    <AnimatePresence>
      {isVisible &&
        (isDesktop ? (
          <div className='fixed top-[48px] left-0 w-full h-full flex justify-center items-start mt-[10px] z-[999] pointer-events-none'>
            <motion.div
              initial={{ opacity: 0.5, y: 0 }}
              animate={{ opacity: 1, y: 48 }}
              exit={{ opacity: 0, y: -48 }}
              transition={{ duration: 0.2, ease: [0, 0.8, 0.2, 1] }}
              className='border border-gray-200 dark:border-gray-800 pl-[24px] pr-[32px] py-[12px] rounded-full gnb-shadow flex items-center gap-[20px] bg-white dark:bg-black'
            >
              {icon}
              <span className='text-gray-700 dark:text-gray-300 text-lg font-medium'>
                {message}
              </span>
            </motion.div>
          </div>
        ) : (
          <div className='fixed top-[0px] left-0 w-full h-full flex justify-center items-start mt-[10px] z-[999] pointer-events-none'>
            <motion.div
              initial={{ opacity: 0.5, y: 0 }}
              animate={{ opacity: 1, y: 48 }}
              exit={{ opacity: 0, y: -48 }}
              transition={{ duration: 0.2, ease: [0, 0.8, 0.2, 1] }}
              className='border border-gray-200 dark:border-gray-800 pl-[24px] pr-[32px] py-[12px] rounded-full gnb-shadow flex items-center gap-[20px] bg-white dark:bg-black'
            >
              {icon}
              <span className='text-gray-700 dark:text-gray-300 text-lg font-medium'>
                {message}
              </span>
            </motion.div>
          </div>
        ))}
    </AnimatePresence>
  );
}
