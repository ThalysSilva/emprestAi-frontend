import React, { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
} & ComponentProps<'div'>;

export function CalendarContentRoot({ children, className, ...rest }: Props) {
  return (
    <div className={twMerge('grid grid-cols-7 gap-2 p-4', className)} {...rest}>
      {children}
    </div>
  );
}
