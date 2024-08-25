import { When } from '@/components/When';
import React, { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: ReactNode;
  lateralColorBar?: string;
} & ComponentProps<'div'>;

export function CardEventRoot({ children, className, lateralColorBar, ...rest }: Props) {
  return (
    <div
      className={twMerge(
        'flex w-[280px] h-[180px] bg-background-primaryLight rounded-lg overflow-hidden shadow-2xl lg:w-[400px] lg:h-[200px]',
        className,
      )}
      {...rest}
    >
      <When value={lateralColorBar}>
        <div style={{ backgroundColor: lateralColorBar }} className={twMerge('flex h-full w-3')} />
      </When>
      {children}
    </div>
  );
}
