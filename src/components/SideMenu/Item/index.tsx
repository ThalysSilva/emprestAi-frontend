import React from 'react';

import { useButton } from '@/components/Button/hooks/useButton';
import { Text5 } from '@/components/Texts';
import { When } from '@/components/When';
import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentProps<'button'> & {
  text?: string;
  children?: ReactNode;
};

export function SideMenuItem({ text, children = null, className, ...rest }: Props) {
  const { getAnimation } = useButton();
  return (
    <button
      className={twMerge(
        'group flex flex-col w-full px-2 transition-all',
        getAnimation(),
        className,
      )}
      {...rest}
    >
      <When value={children} render={children} elseRender={<Text5 className='text-brand-white'>{text}</Text5>} />
      <div className='w-full max-w-0 h-[2px] bg-brand-secondaryLight transition-all duration-200 group-hover:max-w-[300px]'/>
    </button>
  );
}
