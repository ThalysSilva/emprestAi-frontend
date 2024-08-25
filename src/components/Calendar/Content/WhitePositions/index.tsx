import React, { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  qty: number;
} & Omit<ComponentProps<'div'>, 'children'>;

export function CalendarContentWhitePositions({ qty, className, ...rest }: Props) {
  return Array.from({ length: qty }, (_, i) => i + 1).map(() => (
    <div className={twMerge('w-10 h-8', className)} {...rest} />
  ));
}
