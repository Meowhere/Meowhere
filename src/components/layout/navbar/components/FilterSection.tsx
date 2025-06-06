import { motion } from 'framer-motion';

export default function FilterSection({
  children,
  title,
  isOpen,
  onClick,
  value = '',
  handleReset,
  ...rest
}: {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  value?: string;
  onClick?: () => void;
  handleReset: () => void;
}) {
  return (
    <motion.section
      className={`${isOpen ? '' : 'cursor-pointer'} bg-white rounded-[8px] w-full px-[24px] overflow-hidden`}
      onClick={onClick}
      animate={{
        maxHeight: isOpen ? 480 : 52,
        paddingTop: isOpen ? 22 : 18,
        paddingBottom: isOpen ? 24 : 18,
      }}
      transition={{
        ease: [0, 1, 0, 1],
        duration: 0.5,
      }}
      {...rest}
    >
      <div className='w-full flex flex-col justify-center items-start gap-[16px]'>
        <motion.div
          className='flex justify-between items-center w-full text-[13px] text-gray-800'
          animate={{ marginBottom: isOpen ? 0 : 16 }}
          transition={{
            ease: [0, 1, 0, 1],
            duration: 0.5,
          }}
        >
          <motion.h2
            className={`leading-none font-semibold`}
            animate={{
              fontSize: isOpen ? '22px' : '13px',
            }}
            transition={{
              ease: [0, 1, 0, 1],
              duration: 0.5,
            }}
          >
            {title}
          </motion.h2>
          <span className='text-gray-600'>
            {isOpen ? (
              <button onClick={handleReset} className='text-primary-300'>
                초기화
              </button>
            ) : (
              <span className='text-gray-600'>{value}</span>
            )}
          </span>
        </motion.div>
        {children}
      </div>
    </motion.section>
  );
}
