import { QueryOptions } from '@/@types/reactQuery';
import { useQuery } from '@tanstack/react-query';
import { Params, RouteName } from '../types';
import { baseUrl } from '@/config/service';
import { useEffect } from 'react';
import { requestFetch } from '../middleware';
import { getQueryClient } from '../reactQuery';
import { useSnackbarContext } from '@/contexts/Snackbar';
import { ResponseError } from '@/utils/types';
// import { queryClient as queryClientMain } from '../reactQuery';

export type CreateQueryProps<ReturnData = unknown> = {
  queriesKeys: readonly (string | number | object)[];
  onError?: (error: unknown) => boolean | void;
  queryOptions?: QueryOptions<ReturnData>;
  onSuccess?: (data?: ReturnData) => void;
  selectedApi?: keyof typeof baseUrl;
  showToastOnError?: boolean;
  routeName: RouteName;
  enabled?: boolean;
  params?: Params;
  query?: Params;
  config?: RequestInit;
  canAbort?: boolean;
};

export function useCreateQuery<ReturnData = any>({
  showToastOnError = true,
  selectedApi = 'default',
  enabled = true,
  queryOptions,
  queriesKeys,
  routeName,
  onSuccess,
  onError,
  params,
  query,
  config,
  canAbort = false,
}: CreateQueryProps<ReturnData>) {
  const { dispatchSnackbar } = useSnackbarContext();
  const queryClient = getQueryClient();
  const defaultOptions = queryClient.getDefaultOptions().queries as typeof queryOptions;
  async function handleQuery(signal: AbortSignal) {
    const res = await requestFetch<ReturnData, null>({
      selectedApi,
      routeName,
      params,
      query,
      config: {
        ...config,
        signal: canAbort ? signal : config?.signal,
      },
      queryKeys: queriesKeys,
    });
    return res;
  }

  const returnQuery = useQuery({
    queryKey: queriesKeys,
    queryFn: ({ signal }) => handleQuery(signal),
    ...defaultOptions,
    ...queryOptions,
    enabled,
  });

  useEffect(() => {
    if (returnQuery.isError) {
      const typedError = returnQuery.error as ResponseError;
      const { data } = typedError;
      const message = data?.message || 'Ocorreu um erro inesperado';

      if (showToastOnError) {
        dispatchSnackbar({
          message,
          type: 'error',
        });
      }
      onError?.(typedError);
    }
  }, [returnQuery.isError]);

  useEffect(() => {
    if (!returnQuery.isSuccess) return;
    if (!enabled) return;
    const data = returnQuery.data;
    onSuccess?.(data);
  }, [returnQuery.data, enabled]);

  return returnQuery;
}
