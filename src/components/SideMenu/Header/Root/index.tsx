import { Text3 } from '@/components/Texts';
import Image from 'next/image';
import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentProps<'div'> & {
  children?: ReactNode;
};

export function SideMenuHeaderRoot({ className, children, ...rest }: Props) {
  return (
    <div
      className={twMerge(
        'flex w-full h-fit border-b-2 border-b-brand-secondaryLight p-4 gap-4',
        className,
      )}
      {...rest}
    >
      <div className="relative w-20 h-20 flex justify-center items-center">
        <Image alt="Avatar" className="rounded-full" fill src={'/cute-dog.jpg'} />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <Text3 className="text-white">{`Olá!!`}</Text3>
        <div className="flex justify-end">{children}</div>
      </div>
    </div>
  );
}
