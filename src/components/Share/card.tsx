import { cn } from '@/utils/utils';
import { HTMLAttributes } from 'react';

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('rounded-lg shadow bg-white', className)} {...props} />
  );
};

export const CardContent = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('p-4', className)} {...props} />
  );
};
