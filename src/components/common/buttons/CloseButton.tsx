'use Client';

type CloseButtonProps = {
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
};

const sizeMap = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

export default function CloseButton({
  size = 'md',
  onClick,
  className = '',
}: CloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="닫기"
      className={`p-1 ${className}`}
    >
      <img
        src="/assets/icons/delete/ico-delete.svg"
        alt="닫기 아이콘"
        className={`${sizeMap[size]} object-contain`}
      />
    </button>
  );
}
