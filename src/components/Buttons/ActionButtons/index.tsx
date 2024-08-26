import React from 'react';

import { cn } from '@/utils/tailwind/className';
import { ActionButtonProps } from '../types';
import { SecondaryButton } from '../SecondaryButton';
import { PrimaryButton } from '../PrimaryButton';

type Props = {
  withBorderTop?: boolean;
  withPadding?: boolean;
  primaryButton: ActionButtonProps;
  secondaryButton: ActionButtonProps;
};

export function ActionButtons({
  primaryButton,
  secondaryButton,
  withBorderTop = false,
  withPadding = true,
}: Props) {
  return (
    <div
      className={cn(
        ` bg-transparent border-t-divider-gray flex flex-row w-full gap-2 justify-between items-center`,
        {
          'border-t-2': withBorderTop,
          'border-t-0': !withBorderTop,
          'p-4 px-8': withPadding,
          'p-0': !withPadding,
        },
      )}
    >
      <SecondaryButton {...secondaryButton} />
      <PrimaryButton {...primaryButton} />
    </div>
  );
}
