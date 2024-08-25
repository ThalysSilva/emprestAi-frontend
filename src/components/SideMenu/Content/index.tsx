import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentProps<'div'> & {
  children?: ReactNode;
};
export function SideMenuContent({ children, className, ...rest }: Props) {
  return (
    <div className={twMerge('flex flex-col flex-1 w-full gap-6 p-4 px-10', className)} {...rest}>
      {children}
    </div>
  );
}
