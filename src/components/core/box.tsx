// Components
import { Skeleton } from '@/components/ui/skeleton';

// Packages
import { ElementType, ReactNode } from 'react';

type BoxProps = {
  loading: boolean;
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function Box({
  loading,
  as: Component = 'span',
  children,
  className,
}: BoxProps) {
  if (loading) {
    return <Skeleton className={`h-4 w-full ${className}`} />;
  }

  return <Component className={className}>{children}</Component>;
}
