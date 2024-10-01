import { useQueryClient, useMutation } from '@tanstack/react-query';
import { requestFetch } from '../middleware';
import { MutateOptions } from '@/@types/reactQuery';
import { Params, RouteName, ResponseError } from '../types';
import { useSnackbarContext } from '@/contexts/Snackbar';

export type CreateMutationProps<T = any> = {
  mutateOptions?: MutateOptions<T, any, any, any>;
  multiInvalidateQueriesKeys?: unknown[][];
  onError?: (error: unknown) => void;
  config?: RequestInit;
  invalidateQueriesKeys?: unknown[];
  onSuccess?: (data?: T) => void;
  showToastOnError?: boolean;
  setQueriesKeys?: unknown[];
  routeName: RouteName;
  canAbort?: boolean;
  successText?: string;
};

export function useCreateMutation<ReturnData = any, Payload = any>({
  multiInvalidateQueriesKeys,
  showToastOnError = true,
  invalidateQueriesKeys,
  config = {},
  setQueriesKeys,
  mutateOptions,
  routeName,
  canAbort = false,
  successText,
  ...statusFunctions
}: CreateMutationProps<ReturnData>) {
  const queryClient = useQueryClient();
  const { dispatchSnackbar } = useSnackbarContext();

  function onError(error: ResponseError) {
    const { data } = error;
    const message = data?.message ?? error.message;

    if (showToastOnError) {
      dispatchSnackbar({
        message,
        type: 'error',
      });
    }

    statusFunctions.onError?.(data);
  }

  async function onSuccess(data: ReturnData) {
    if (multiInvalidateQueriesKeys?.length) {
      for (const key of multiInvalidateQueriesKeys ?? []) {
        await queryClient.invalidateQueries({
          queryKey: key,
          refetchType: 'all',
        });
      }
    } else if (invalidateQueriesKeys?.length) {
      await queryClient.invalidateQueries({
        queryKey: invalidateQueriesKeys,
        refetchType: 'all',
      });

      if (!successText) return;

      dispatchSnackbar({
        message: successText,
        type: 'success',
      });
    }

    if (setQueriesKeys) queryClient.setQueryData(setQueriesKeys, data);
    statusFunctions.onSuccess?.(data);
  }

  async function handleMutate({
    payload,
    params,
    signal,
    query,
  }: {
    payload?: Payload;
    params?: Params;
    signal?: AbortSignal;
    query?: Params;
  }) {
    const data = await requestFetch<ReturnData, typeof payload>({
      config: {
        ...config,
        signal: canAbort ? signal : config.signal,
      },
      invalidateKeys: invalidateQueriesKeys,
      multiInvalidationKeys: multiInvalidateQueriesKeys,
      queryKeys: setQueriesKeys,
      routeName,
      payload,
      params,
      query,
    });
    return data;
  }

  return useMutation({
    mutationFn: handleMutate,
    ...mutateOptions,
    onSuccess,
    onError,
  });
}
