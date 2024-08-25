import React, { ComponentProps } from 'react';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentProps<'p'> & {
  dataTestId?: string;
  children: ReactNode;
};

export function BigText1({ children, className = '', dataTestId }: Props) {
  return (
    <h1
      data-testid={dataTestId}
      className={twMerge(`text-4xl lg:text-5xl font-bold text-brand-primaryLight ${className}`)}
    >
      {children}
    </h1>
  );
}

export function BigText2({ children, className = '', dataTestId }: Props) {
  return (
    <h1
      data-testid={dataTestId}
      className={twMerge(`text-3xl lg:text-4xl text-brand-primaryLight font-bold ${className}`)}
    >
      {children}
    </h1>
  );
}

export function Text1({ children, className = '', dataTestId }: Props) {
  return (
    <h1
      data-testid={dataTestId}
      className={twMerge(`text-2xl lg:text-3xl font-bold text-brand-primary ${className}`)}
    >
      {children}
    </h1>
  );
}

export function Text2({ children, className = '', dataTestId }: Props) {
  return (
    <h2
      data-testid={dataTestId}
      className={twMerge(`text-2xl text-brand-primary ${className}`)}
    >
      {children}
    </h2>
  );
}

export function Text3({ children, className = '', dataTestId, style = {} }: Props) {
  return (
    <h3
      style={style}
      data-testid={dataTestId}
      className={twMerge(`text-xl  ${className}`)}
    >
      {children}
    </h3>
  );
}

export function Text4({ children, className = '', dataTestId }: Props) {
  return (
    <p data-testid={dataTestId} className={twMerge(`text-lg  ${className}`)}>
      {children}
    </p>
  );
}

export function Text5({ children, className = '', dataTestId }: Props) {
  return (
    <p data-testid={dataTestId} className={twMerge(`text-base ${className}`)}>
      {children}
    </p>
  );
}

export function Text6({ children, className = '', dataTestId }: Props) {
  return (
    <p data-testid={dataTestId} className={twMerge(`text-sm ${className}`)}>
      {children}
    </p>
  );
}
