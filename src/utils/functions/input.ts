import React from 'react';
import { createMask, FactoryArg } from 'imask';
import { UseFormReturn, FieldValues, Path, PathValue } from 'react-hook-form';
import { iterateObject } from './object';
import { ErrorHookForm, ErrorsHookForm } from '@/@types/hookForm';

export function formatInput<T extends FieldValues>(
  event: React.ChangeEvent<HTMLInputElement>,
  maskOptions: FactoryArg,
  hookFormMethods?: UseFormReturn<T>,
) {
  const elementId = event.target.id as Path<T>;
  const mask = createMask(maskOptions);
  mask.unmaskedValue = event.target.value;
  const masked = mask.value as PathValue<T, Path<T>>;

  if (hookFormMethods) {
    const {
      formState: { errors },
      setValue,
    } = hookFormMethods;
    const error = iterateObject<ErrorHookForm>(
      elementId.split('.'),
      errors as ErrorsHookForm,
    )?.message;
    const shouldValidate = !!error;

    setValue(elementId, masked, { shouldValidate });
  }

  return { masked, unmasked: mask.unmaskedValue };
}