import { Text5 } from '@/components/Texts';
import React, { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children?: ReactNode;
} & ComponentProps<'div'>;

export function CalendarDayRoot({ children, className, ...rest }: Props) {
  return (
    <div
      className={twMerge(
        'flex flex-col rounded-md border  border-zinc-300 w-10 h-8 justify-center items-center ',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
