import { Text2 } from '@/components/Texts';
import React, { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children?: ReactNode;
  title: string;
} & ComponentProps<'div'>;

export function CalendarHeader({ children, className, title, ...rest }: Props) {
  return (
    <div className={twMerge('flex flex-col h-full rounded-t-lg justify-center items-center bg-brand-primaryLight', className)} {...rest}>
      <Text2 className='text-white font-semibold'>{title}</Text2>
      {children}
    </div>
  );
}
