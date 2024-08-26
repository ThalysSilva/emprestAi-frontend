import {
  QueryKey,
  UseQueryOptions,
  UseMutationOptions,
  InfiniteQueryObserverOptions,
  FetchInfiniteQueryOptions,
  FetchQueryOptions,
} from '@tanstack/react-query';

export type QueryOptions<ReturnData> = Omit<
  UseQueryOptions<ReturnData, unknown, ReturnData, QueryKey>,
  'queryKey' | 'queryFn' | 'initialData' | 'onSuccess' | 'onError' | 'enabled'
> & {
  initialData?: () => undefined;
};

export type InfiniteQueryOptions<ReturnData> = Omit<
  InfiniteQueryObserverOptions<ReturnData>,
  'queryKey' | 'queryFn' | 'initialData' | 'onSuccess' | 'onError' | 'enabled' | 'select'
> & {
  initialData?: () => undefined;
};

export type CustomFetchInfiniteQueryOptions<ReturnData> = Omit<
  FetchInfiniteQueryOptions<ReturnData, unknown, ReturnData, QueryKey>,
  'queryKey' | 'queryFn' | 'onSuccess' | 'onError' | 'enabled'
>;

export type CustomFetchQueryOptions<ReturnData> = Omit<
  FetchQueryOptions<ReturnData, unknown, ReturnData, QueryKey>,
  'queryKey' | 'queryFn' | 'onSuccess' | 'onError' | 'enabled'
>;

export type MutateOptions<TData, TError, TVariables, TContext> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'mutationFn' | 'onSuccess' | 'onError'
>;
