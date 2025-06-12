import { DropdownMenuProps } from '@/src/types/dropdown-menu.types';
import DropdownItem from './DropdownItem';

export default function DropdownMenu({
  items,
  isMobile = false,
  onClose,
  title,
  bottomButton,
}: DropdownMenuProps) {
  const mobileShadow = 'shadow-[0_4px_40px_rgba(0,0,0,0.1)] backdrop-blur-[40px]';
  const desktopShadow = 'shadow-[0_0_20px_rgba(0,0,0,0.05)]';

  const wrapperClass = `
        w-full rounded-[12px] overflow-hidden bg-white border border-gray-100
        ${mobileShadow}
      `;

  if (isMobile) {
    return (
      <>
        <div className='fixed inset-0 z-40 bg-black/40' onClick={onClose} />
        <div className='fixed inset-x-0 bottom-0 z-50 px-[16px] pb-[20px]'>
          <div className='w-full flex flex-col gap-[8px]' onClick={(e) => e.stopPropagation()}>
            <div className={wrapperClass}>
              {title && (
                <div className='text-center text-xs text-gray-600 leading-[1.2rem] h-[36px] flex items-center justify-center border-b border-gray-100'>
                  {title}
                </div>
              )}
              <div className='divide-y divide-gray-100'>
                {items.map((item, idx) => (
                  <DropdownItem
                    key={idx}
                    label={item.label}
                    isMobile={isMobile}
                    isDanger={item.isDanger}
                    onClick={item.onClick}
                    onClose={onClose}
                  />
                ))}
              </div>
            </div>
            {bottomButton && (
              <div className={wrapperClass}>
                <DropdownItem
                  {...bottomButton}
                  isMobile
                  isDanger={bottomButton.isDanger}
                  onClose={onClose}
                />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // PC 버전
  return (
    <div
      className={`
            rounded-[12px] border border-gray-100 bg-white overflow-hidden min-w-[160px] animate-fade-down animate-duration-900 animate-ease-in-out
            ${desktopShadow}
              `}
    >
      {items.map((item, idx) => (
        <DropdownItem
          key={idx}
          label={item.label}
          isMobile={isMobile}
          isDanger={item.isDanger}
          onClick={item.onClick}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
