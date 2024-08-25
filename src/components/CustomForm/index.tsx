'use client';

import React, { ReactNode } from 'react';

import { SubmitErrorHandler, UseFormReturn } from 'react-hook-form';
import { UseFormProps } from 'react-hook-form';
import { useCustomForm } from './hooks/useForm';
import { FormProvider } from 'react-hook-form';
import { type ClassValue } from 'clsx';

import { z } from 'zod';
import { cn } from '@/utils/tailwind/className';

type Props<T extends Record<string, any>> = {
  children:
    | ReactNode
    | ((props: { currentError?: string; formContext: UseFormReturn }) => ReactNode);
  useFormProps?: Omit<UseFormProps, 'resolver'>;
  onSubmit: (data: T) => void | Promise<void>;
  onError?: SubmitErrorHandler<T>;
  zodSchema?: z.ZodSchema<T>;
  resetOnSubmit?: boolean;
  className?: ClassValue | ClassValue[];
};

export function CustomForm<T extends Record<string, any>>({
  onSubmit: onSubmitProp,
  resetOnSubmit = false,
  className = [],
  useFormProps,
  zodSchema,
  children,
  onError,
}: Props<T>) {
  const { methods } = useCustomForm({ useFormProps, zodSchema });

  async function onSubmit(data: T) {
    await onSubmitProp(data);
    if (resetOnSubmit) methods.reset(undefined, { keepIsSubmitted: false });
  }

  const currentError = Object.values(methods.formState.errors)[0]?.message as string;

  const normalizedClassName = Array.isArray(className) ? className : [className];

  return (
    <FormProvider {...methods}>
      <form
        className={cn('flex w-full flex-col ', ...normalizedClassName)}
        onSubmit={methods.handleSubmit(onSubmit, onError)}
      >
        {typeof children === 'function'
          ? children({ formContext: methods, currentError })
          : children}
      </form>
    </FormProvider>
  );
}
