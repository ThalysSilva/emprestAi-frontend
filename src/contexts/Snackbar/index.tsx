'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { SnackbarProps, SnackbarData, SnackbarContextData } from './types';
import { doNothing } from '../../utils/functions/general';
import { When } from '@/components/When';
import { SnackbarMessage } from '@/components/SnackbarMessage';

export const SnackbarContext = createContext({
  dispatchSnackbar: doNothing,
} as SnackbarContextData);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<SnackbarProps>({} as SnackbarProps);
  const [width, setWidth] = useState(0);
  const snackbarRef = React.useRef<HTMLDivElement | null>(null);
  const styleSnackbarContainer = {
    top: '24px',
    left: `calc(50% - ${width / 2}px)`,
    width: `${width}px`,
    zIndex: 9998,
  };

  const addSnackbar = ({ type = 'error', message }: SnackbarData) => {
    setSnackbar({
      type: type,
      message: message,
      timestamp: new Date(),
    });
  };

  const deleteSnackbar = () => {
    setTimeout(() => setSnackbar({} as SnackbarProps), 200);
  };

  function handleWidth() {
    if (!snackbarRef.current) return;
    const { width } = snackbarRef.current.getBoundingClientRect();
    setWidth(width);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWidth);
    handleWidth();
    return () => {
      window.removeEventListener('resize', handleWidth);
    };
  }, [snackbarRef.current]);

  useEffect(() => {
    handleWidth();
  }, [snackbar]);

  return (
    <SnackbarContext.Provider
      value={{
        dispatchSnackbar: addSnackbar,
      }}
    >
      <When value={snackbar.message}>
        <div style={{ ...styleSnackbarContainer, position: 'fixed' }}>
          <SnackbarMessage
            customRef={snackbarRef}
            snackbar={snackbar}
            deleteSnackbar={deleteSnackbar}
          />
        </div>
      </When>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = () => {
  return useContext(SnackbarContext);
};
