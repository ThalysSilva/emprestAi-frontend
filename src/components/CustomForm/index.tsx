'use client';

import React, { ReactNode } from 'react';
import { SubmitErrorHandler, UseFormReturn, UseFormProps } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { ZodType, ZodTypeDef } from 'zod';
import { cn } from '@/utils/tailwind/className';
import { type ClassValue } from 'clsx';
import { useCustomForm } from './hooks/useForm';

type Props<Input extends Record<string, any>, Output extends Record<string, any>> = {
  children:
    | ReactNode
    | ((props: { currentError?: string; formContext: UseFormReturn<Output> }) => ReactNode);
  useFormProps?: Omit<UseFormProps<Output>, 'resolver'>;
  onSubmit: (data: Output) => void | Promise<void>;
  onError?: SubmitErrorHandler<Output>;
  zodSchema?: ZodType<Output, ZodTypeDef, Input>;
  resetOnSubmit?: boolean;
  className?: ClassValue | ClassValue[];
};

export function CustomForm<Input extends Record<string, any>, Output extends Record<string, any>>({
  onSubmit: onSubmitProp,
  resetOnSubmit = false,
  className = [],
  useFormProps,
  zodSchema,
  children,
  onError,
}: Props<Input, Output>) {
  const { methods } = useCustomForm<Input, Output>({ useFormProps, zodSchema });

  async function onSubmit(data: Output) {
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
