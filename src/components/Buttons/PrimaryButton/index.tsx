import React from 'react';

import { Button } from '@/components/Button';
import { ActionButtonProps } from '../types';

type Props = ActionButtonProps;

export function PrimaryButton({ isDisabled, className, isLoading, label, onClick }: Props) {
  return (
    <Button className={className} disabled={isDisabled} isLoading={isLoading} onClick={onClick}>
      {label}
    </Button>
  );
}
