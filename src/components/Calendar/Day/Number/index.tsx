import { Text5 } from '@/components/Texts';
import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentProps<typeof Text5>;

export function CalendarDayNumber({ children, className, ...rest }: Props) {
  return (
    <Text5 className={twMerge('text-brand-primary w-fit font-bold p-2', className)} {...rest}>
      {children}
    </Text5>
  );
}
