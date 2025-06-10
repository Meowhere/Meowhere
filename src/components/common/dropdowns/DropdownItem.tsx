export default function DropdownItem({
  label,
  isMobile = false,
  isDanger = false,
  disabled = false,
  onClick,
  onClose,
}: DropdownItemProps) {
  const fontSizeClass = isMobile ? 'text-lg' : 'text-md';
  const textColor = isDanger ? 'text-red-300' : 'text-gray-700';
  const radiusClass = isMobile ? 'group-hover:rounded-[0.7rem]' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const commonClassNames = `
    w-full
    ${isMobile ? 'h-full group-hover:h-[4.6rem]' : 'h-[4.6rem]'}
    py-[1rem]
    hover:bg-gray-100
    ${radiusClass}
    ${fontSizeClass} ${textColor}
    transition-all duration-150
    flex items-center justify-center
    select-none
    ${disabledClass}
  `;

  const handleItemClick = () => {
    onClick();
    onClose();
  };

  return (
    <div
      className={
        isMobile
          ? 'w-full h-[5.4rem] p-[0.4rem] bg-white group'
          : 'w-full h-[4.6rem] bg-white group'
      }
    >
      <button type='button' onClick={handleItemClick} className={commonClassNames}>
        {label}
      </button>
    </div>
  );
}

export interface DropdownItemProps {
  label: string;
  isMobile?: boolean;
  isDanger?: boolean;
  disabled?: boolean;
  onClick: () => void;
  onClose: () => void;
}
