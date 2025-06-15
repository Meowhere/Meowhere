import { useBreakpoint } from '@/src/hooks/useBreakpoint';
import { motion } from 'framer-motion';

export default function FilterSection({
  children,
  title,
  isOpen,
  onClick,
  value = '',
  handleReset,
  className,
  onKeyDown,
  ...rest
}: {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  value?: string;
  onClick?: () => void;
  handleReset: () => void;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
  const { isDesktop } = useBreakpoint();

  return (
    <motion.section
      className={`${className} ${isOpen ? '' : 'cursor-pointer'} bg-white lg:bg-none rounded-[8px] w-full h-fit px-[24px] overflow-hidden gnb-shadow lg:shadow-none`}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
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
      <div
        className={`${isOpen ? 'h-full' : ''} w-full flex flex-col justify-center items-start gap-[16px]`}
      >
        {!isDesktop && (
          <motion.div
            className='flex justify-between items-center w-full text-[13px] text-gray-800'
            animate={{ marginBottom: isOpen ? 0 : 16 }}
            transition={{
              ease: [0, 1, 0, 1],
              duration: 0.5,
            }}
          >
            <motion.span
              className={`leading-none font-semibold`}
              initial={{ fontSize: '1.3rem' }}
              animate={{
                fontSize: isOpen ? '2.2rem' : '1.3rem',
              }}
              transition={{
                ease: [0, 1, 0, 1],
                duration: 0.5,
              }}
            >
              {title}
            </motion.span>
            <span className='text-gray-600'>
              {isOpen ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReset();
                  }}
                  className='text-primary-300'
                >
                  초기화
                </button>
              ) : (
                <span className='text-gray-600'>{value}</span>
              )}
            </span>
          </motion.div>
        )}
        {children}
      </div>
    </motion.section>
  );
}
