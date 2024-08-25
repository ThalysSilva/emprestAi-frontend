import React from 'react';

import { When } from '../When';
import { twMerge } from 'tailwind-merge';

export type Props = {
  messageError?: string;
  white?: boolean;
};

export function ErrorLabel({ messageError, white }: Props) {
  return (
    <When value={messageError}>
      <div
        data-testid={'messageValidation'}
        className={'flex flex-row gap-2 items-center pl-4 h-max mt-2'}
      >
        <label
          className={twMerge(
            'font-light text-xs leading-4',
            white ? 'text-white' : 'text-alerts-red',
          )}
        >
          {messageError}
        </label>
      </div>
    </When>
  );
}
