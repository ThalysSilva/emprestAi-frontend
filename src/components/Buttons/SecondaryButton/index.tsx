import React from 'react';

import { Button } from '@/components/Button';

type Props = {
  isDisabled?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  label: string;
  className?: string;
};

export function SecondaryButton({
  className,
  isDisabled,
  isLoading,
  label,
  onClick,
}: Props) {
  return (
    <Button className={className} disabled={isDisabled} isLoading={isLoading} onClick={onClick}>
      {label}
    </Button>
  );
}
