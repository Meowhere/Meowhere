'use Client';

type VisibilityToggleButtonProps = {
  isVisible: boolean;
  onToggle: () => void;
  className?: string;
};

const getIconSrc = (isVisible: boolean) => {
  return isVisible ? '/assets/icons/ico-visibility-on.svg' : '/assets/icons/ico-visibility-off.svg';
};

export default function VisibilityToggleButton({
  isVisible,
  onToggle,
  className = '',
}: VisibilityToggleButtonProps) {
  return (
    <button
      type='button'
      onClick={onToggle}
      aria-label={isVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
      className={`p-1 ${className}`}
    >
      <img
        src={getIconSrc(isVisible)}
        alt={isVisible ? '눈 아이콘' : '가려진 눈 아이콘'}
        className='w-6 h-6 object-contain'
      />
    </button>
  );
}
