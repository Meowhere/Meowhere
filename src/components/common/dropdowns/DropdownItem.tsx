export default function DropdownItem({
  label,
  isMobile = false,
  isDanger = false,
  disabled = false,
  onClick,
  onClose,
}: DropdownItemProps) {
  const fontSizeClass = isMobile ? 'text-lg' : 'text-md';
  const textColor = isDanger ? 'text-red-300' : 'text-gray-700 dark:text-gray-300';
  const radiusClass = isMobile ? 'group-hover:rounded-[7px]' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const commonClassNames = `
    w-full
    ${isMobile ? 'h-full group-hover:h-[46px]' : 'h-[46px]'}
    py-[10px]
    hover:bg-gray-100 dark:hover:bg-gray-700
    ${radiusClass}
    ${fontSizeClass} ${textColor}
    transition-all duration-150
    flex items-center justify-center
    select-none
    ${disabledClass}
  `;

  const handleItemClick = () => {
    if (onClick) {
      // onClick이 존재할 때만 실행
      onClick();
    }
    if (onClose) {
      // onClose가 존재할 때만 실행
      onClose();
    }
  };

  return (
    <div
      className={
        isMobile
          ? 'w-full h-[54px] p-[4px] bg-white dark:bg-gray-800 group'
          : 'w-full h-[46px] bg-white dark:bg-gray-800 group'
      }
    >
      <button type='button' onClick={handleItemClick} className={commonClassNames}>
        {label}
      </button>
    </div>
  );
}

interface DropdownItemProps {
  label: string;
  isMobile?: boolean;
  isDanger?: boolean;
  disabled?: boolean;
  onClick: () => void;
  onClose: () => void;
}
