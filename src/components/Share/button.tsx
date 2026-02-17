import { cn } from '@/utils/utils';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'secondary';
  size?: 'sm' | 'md';
  isLoading?: boolean;
}

export const Button = ({
  className,
  variant = 'default',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const base =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none';
  const variants = {
    default: 'bg-pink-600 text-white hover:bg-pink-700',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300',
  };
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
  };

  return (
    <button
      className={cn(
        base,
        variants[variant],
        sizes[size],
        isLoading && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
