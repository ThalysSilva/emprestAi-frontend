'use client';

import React from 'react';

import { useSnackbarMessage } from './hooks/useSnackbarMessage';
import { CloseIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';
import { SnackbarProps } from '@/contexts/Snackbar/types';
import { twMerge } from 'tailwind-merge';
type Props = {
  snackbar: SnackbarProps;
  deleteSnackbar: () => void;
  customRef?: React.RefObject<HTMLDivElement>;
};

export const SnackbarMessage = ({ deleteSnackbar, snackbar, customRef }: Props) => {
  const { handleDeleteSnackbar, show } = useSnackbarMessage({ deleteSnackbar, snackbar });
  const { message, type } = snackbar;

  const isHugeMessage = message?.length ?? 0 > 30;

  const colorSnackbar = {
    error: 'bg-alerts-red',
    success: 'bg-alerts-green',
    warn: 'bg-alerts-orange',
  };

  return (
    <div
      ref={customRef}
      className={twMerge(
        `${colorSnackbar[type]}
          transition-opacity duration-200 animate-fadeInAnimation ${
            show ? 'opacity-1' : 'opacity-0'
          }
          flex justify-between items-center absolute pointer-events-auto overflow-hidden
          px-5 gap-5 py-3  min-w-[300px] whitespace-normal rounded-xl bg-no-repeat z-[9999]`,
        isHugeMessage ? 'md:min-w-[600px]' : 'md:min-w-[450px]',
      )}
      style={{ boxShadow: '0 0 10px #08050584' }}
      data-testid={'snackbarMessage-' + type}
    >
      <div />
      <div className="flex-shrink w-auto mr-5 min-w-0">
        <Text className={'2xl:leading-5 text-center w-full text-white whitespace-normal'}>
          {message}
        </Text>
      </div>
      <button
        data-testid={'closeIcon'}
        className={
          'flex cursor-pointer rounded-xl w-fit h-fit transform hover:scale-125 active:scale-90'
        }
        onClick={handleDeleteSnackbar}
      >
        <CloseIcon color={'white'} height="10" width="10" />
      </button>
    </div>
  );
};
