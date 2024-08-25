'use client';

import React from 'react';
import { SnackbarProvider } from '@/contexts/Snackbar';
import { ConfigsProvider } from '@/contexts/Configs';
import { getQueryClient } from '@/services/reactQuery';
import { QueryClientProvider } from '@tanstack/react-query';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/styles/Theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ProviderProps } from './types';

const queryClient = getQueryClient();

export function Providers({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            <ConfigsProvider>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </ConfigsProvider>
          </ChakraProvider>
        </CacheProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
