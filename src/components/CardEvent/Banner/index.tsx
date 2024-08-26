import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  imageUrl: string;
} & ComponentProps<'div'>;

export function CardEventBanner({ children, className, imageUrl, ...rest }: Props) {
  return (
    <div
      style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      className={twMerge('flex flex-col w-full h-16 shadow-md', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
