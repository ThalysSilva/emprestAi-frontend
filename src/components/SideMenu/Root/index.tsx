import React from 'react';

import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentProps<'div'> & {
  children?: ReactNode;
};

export function SideMenuRoot({ children, className, ...rest }: Props) {
  return (
    <div
      className={twMerge(
        'flex flex-col h-full bg-brand-primary w-[400px] min-w-[400px] shadow-solid gap-2 place-self-start text-brand-secondaryLight',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
