import { User } from '@/@types/entities';
import { Text3, Text6 } from '@/components/Texts';
import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentProps<'div'> & {
  userData?: User;
  children?: ReactNode;
};

export function SideMenuHeaderRoot({ className,children, userData, ...rest }: Props) {
  const { alias } = userData ?? {};

  return (
    <div
      className={twMerge(
        'flex w-full h-fit border-b-2 border-b-brand-secondaryLight p-4 gap-4',
        className,
      )}
      {...rest}
    >
      <div className="flex justify-center items-center w-fit h-fit">
        <span className="w-20 h-20 rounded-full bg-white" />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <Text3 className='text-white'>{`Olá, ${alias}`}</Text3>
        <div className="flex justify-end">{children}</div>
      </div>
    </div>
  );
}
