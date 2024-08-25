'use client';
import { useButton } from '@/components/Button/hooks/useButton';
import { Text6 } from '@/components/Texts';
import { signOut } from 'next-auth/react';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentProps<'button'> & {
  className?: string;
};

export function SideMenuHeaderLogoutButton({ className, ...rest }: Props) {
  const { getAnimation } = useButton();

  return (
    <button
      onClick={() => {
        signOut();
      }}
      className={twMerge('w-fit px-2', className, getAnimation())}
      {...rest}
    >
      <Text6 className='text-white'>Sair</Text6>
    </button>
  );
}
