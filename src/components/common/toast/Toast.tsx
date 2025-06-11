import { useToastStore } from '@/src/store/toastStore';
import CheckCircleIcon from '../icons/CheckCircle';
import AlertCircleIcon from '../icons/AlertCircle';
import { AnimatePresence, motion } from 'framer-motion';

export default function Toast() {
  const { isVisible, type, message } = useToastStore();

  const icon = type === 'success' ? <CheckCircleIcon /> : <AlertCircleIcon />;
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed top-4 z-50 w-[320px] border px-4 py-3 rounded-[12px] shadow flex items-center gap-[20px]`}
        >
          {icon}
          <span className='text-gray-800 text-2xl font-bold'>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
