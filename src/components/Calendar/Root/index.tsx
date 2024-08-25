import React, { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
} & ComponentProps<'div'>;

export function CalendarRoot({ children, className, ...rest }: Props) {
  return (
    <div
      className={twMerge(
        'flex flex-col h-fit rounded-lg shadow-2xl  w-[350px] overflow-hidden',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
