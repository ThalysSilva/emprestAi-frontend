import React, { ReactElement, forwardRef } from 'react';

import { doNothing } from '@/utils/functions/general';
import {
  InputProps as InputChakraProps,
  Input as InputChakra,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { twMerge } from 'tailwind-merge';
import { When } from '@/components/When';
import { Text5 } from '@/components/Texts';
import { ErrorLabel } from '@/components/ErrorLabel';

export type BaseInputProps = InputChakraProps & {
  handleRightIconClick?: () => void;
  hideMaxLengthLabel?: boolean;
  containerClassName?: string;
  onRightIcon?: ReactElement;
  inputClassName?: string;
  labelClassName?: string;
  hideError?: boolean;
  anotherFields?: any;
  error?: string;
  label?: string;
  charLen?: number;
};

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      containerClassName = '',
      handleRightIconClick,
      inputClassName = '',
      variant = 'outline',
      hideMaxLengthLabel,
      labelClassName,
      anotherFields,
      onRightIcon,
      onKeyDown,
      hideError,
      maxLength,
      charLen = 0,
      error,
      label,
      ...rest
    }: BaseInputProps,
    ref,
  ) => {
    return (
      <div
        className={twMerge(
          `${
            rest.type === 'hidden' || rest.type === 'file' ? 'hidden' : 'flex'
          } flex-col w-full min-w-fit ` + containerClassName,
        )}
      >
        <When value={label}>
          <Text5 className={twMerge('mb-1 w-fit text-text-primary ', labelClassName)}>
            {label}
          </Text5>
        </When>
        <InputGroup>
          <InputChakra
            onKeyDown={onKeyDown}
            className={twMerge(`${inputClassName}`)}
            variant={variant}
            maxLength={maxLength}
            ref={ref}
            {...anotherFields}
            {...rest}
          />
          <When value={onRightIcon}>
            <InputRightElement>
              <span
                onClick={handleRightIconClick ? handleRightIconClick : doNothing}
                className={`
                          flex w-4 h-4 justify-center items-center
                          ${handleRightIconClick ? 'cursor-pointer' : ''}
                        `}
              >
                {onRightIcon}
              </span>
            </InputRightElement>
          </When>
        </InputGroup>
        <div className="flex w-full flex-row justify-between">
          <When value={!hideError && error}>
            <ErrorLabel messageError={error} />
          </When>
          <When value={!hideMaxLengthLabel && maxLength}>
            <div className={'flex flex-row gap-2 items-center pr-4 h-max mt-2'}>
              <label className={'text-text-semiLight font-light text-xs leading-4'}>
                {charLen}/{maxLength}
              </label>
            </div>
          </When>
        </div>
      </div>
    );
  },
);
