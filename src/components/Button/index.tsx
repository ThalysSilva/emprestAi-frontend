'use client';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import { useButton } from './hooks/useButton';
import { Spinner } from '@chakra-ui/react';
import { cn } from '@/utils/tailwind/className';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: (ev?: React.MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  dataTestId?: string;
  className?: string;
  isDisabled?: boolean;
  isOutlined?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
};

export function Button({
  className = '',
  dataTestId,
  isDisabled,
  isOutlined,
  isLoading,
  children,
  onClick,
  type,
  ...rest
}: ButtonProps) {
  const { getAnimation } = useButton();

  return (
    <button
      {...rest}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      data-testid={dataTestId}
      type={type}
      className={cn(
        'flex items-center justify-center gap-2 px-3 h-10  rounded-md text-lg',
        {
          'border bg-transparent text-white border-borderColor-secondary font-normal ': isOutlined,
          'bg-brand-primary text-brand-white font-semibold ': !isOutlined,
        },
        getAnimation(isDisabled),
        className,
      )}
    >
      {isLoading ? (
        <>
          <span className="font-normal text-lg text-inherit leading-6">{`Carregando`}</span>
          <Spinner />
        </>
      ) : (
        children
      )}
    </button>
  );
}
