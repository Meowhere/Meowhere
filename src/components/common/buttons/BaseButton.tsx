'use client';

type BaseButtonProps = {
  variant?: 'primary' | 'disabled' | 'outline' | 'soft' | 'ghost';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

const variantClasses = {
  primary: 'bg-primary-300 text-white',
  disabled: 'bg-gray-200 text-gray-500 cursor-not-allowed',
  outline: 'border border-gray-200 text-gray-500 bg-white',
  soft: 'bg-primary-100 text-primary-300',
  ghost: 'text-gray-500',
};

export default function BaseButton({
  variant = 'primary',
  children,
  onClick,
  className = '',
  type = 'button',
}: BaseButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={variant === 'disabled'}
      className={`w-full px-4 py-3 text-center rounded-[0.625rem] font-semibold ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
