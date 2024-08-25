import { PaginationData, Params, RouteName } from '../types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { baseUrl } from '@/config/service';
import { useEffect } from 'react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { InfiniteQueryOptions } from '@/@types/reactQuery';
import { requestAxios } from '../middleware';
import { useSnackbarContext } from '@/contexts/Snackbar';
import { getNextPageParam, getQueryClient, selectDataInfinityQuery } from '../reactQuery';

export type CreateQueryProps<ReturnDataItem = unknown> = {
  infiniteQueryOptions?: Partial<InfiniteQueryOptions<PaginationData<ReturnDataItem>>>;
  queriesKeys: readonly (string | number | object)[];
  onError?: (error: AxiosError) => boolean | void;
  onSuccess?: (data?: PaginationData<ReturnDataItem>) => void;
  selectedApi?: keyof typeof baseUrl;
  axiosConfig?: AxiosRequestConfig<PaginationData<ReturnDataItem>>;
  showToastOnError?: boolean;
  routeName: RouteName;
  enabled?: boolean;
  params?: Params;
  query?: Params;
  canAbort?: boolean;
};

export function useCreateInfiniteQuery<ReturnDataItem = any>({
  infiniteQueryOptions: infinityQueryOptionsProps,
  showToastOnError = true,
  selectedApi = 'default',
  enabled = true,
  queriesKeys,
  onSuccess,
  routeName,
  axiosConfig,
  onError,
  params,
  query,
  canAbort = false,
}: CreateQueryProps<ReturnDataItem>) {
  const { dispatchSnackbar } = useSnackbarContext();
  const queryClient = getQueryClient();
  const defaultOptions = queryClient.getDefaultOptions()
    .queries as typeof infinityQueryOptionsProps;

  function handleQuery(page: number, signal: AbortSignal) {
    return requestAxios<PaginationData<ReturnDataItem>, null>({
      selectedApi,
      routeName,
      params,
      config: {
        signal: canAbort ? signal : undefined,
        ...axiosConfig,
      },
      query: {
        page,
        ...query,
      },
    }).then((res) => {
      return res.data;
    });
  }

  const { initialPageParam, ...infiniteQueryOptions } = infinityQueryOptionsProps ?? {};

  const initialPageParamNormalized = (initialPageParam as number) ?? 0;

  const returnQuery = useInfiniteQuery({
    queryFn: ({ pageParam, signal }) => handleQuery(pageParam as number, signal),
    initialPageParam: initialPageParamNormalized,
    queryKey: queriesKeys,
    getNextPageParam,
    ...defaultOptions,
    ...infiniteQueryOptions,
    select: selectDataInfinityQuery,
    enabled,
  });

  useEffect(() => {
    if (!returnQuery.isError) return;

    const typedError = returnQuery.error as AxiosError;
    const { message } = typedError;

    if (showToastOnError) {
      dispatchSnackbar({
        message: message,
        type: 'error',
      });
    }
    onError?.(typedError);
  }, [returnQuery.isError]);

  useEffect(() => {
    if (!returnQuery.isSuccess) return;
    if (!enabled) return;
    const data = returnQuery.data;
    onSuccess?.(data.pages[data.pages.length - 1]);
  }, [returnQuery.data, enabled]);

  return returnQuery;
}
