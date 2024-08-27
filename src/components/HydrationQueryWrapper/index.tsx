import React from 'react';

import { CustomFetchInfiniteQueryOptions, CustomFetchQueryOptions } from '@/@types/reactQuery';
import { requestFetch } from '@/services/middleware';
import { getNextPageParam, getQueryClient } from '@/services/reactQuery';
import { PaginationData } from '@/services/types';
import { dehydrate, HydrationBoundary, QueryKey } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { CallRouteParams } from './types';

type DataSet = {
  queryKey: QueryKey;
  data: unknown;
};

type Props<ReturnData = unknown> = {
  children: ReactNode;
  calls: CallRouteParams<ReturnData>[];
  dataSets?: DataSet[];
};

export async function HydrationQueryWrapper<ReturnData = unknown>({
  children,
  calls,
  dataSets,
}: Props<ReturnData>) {
  const queryClient = getQueryClient();
  function hydrateDataSets() {
    if (!dataSets) return;
    dataSets.forEach(({ queryKey, data }) => {
      queryClient.setQueryData(queryKey, data);
    });
  }

  async function makeCalls() {
    async function handleQuery<T = unknown>(call: CallRouteParams<ReturnData>, pageParam?: number) {
      const data = await requestFetch<T, null>({
        selectedApi: call.selectedApi,
        routeName: call.routeName,
        params: call.params,
        query: {
          page: pageParam ?? '',
          ...call.query,
        },
        config: call.requestConfig,
        queryKeys: call.queryKey,
      });
      return data;
    }

    const callPromises = calls.map((call) => {
      if (call.isInfinity) {
        const { initialPageParam, ...fetchInfiniteQueryOptions } = (call.fetchQueryOptions ??
          {}) as CustomFetchInfiniteQueryOptions<PaginationData<ReturnData>>;

        const initialPageParamNormalized = (initialPageParam as number) ?? 0;
        return queryClient.prefetchInfiniteQuery({
          initialPageParam: initialPageParamNormalized,
          queryKey: call.queryKey,
          queryFn: ({ pageParam }) =>
            handleQuery<PaginationData<ReturnData>>(call, pageParam as number),
          getNextPageParam,
          ...fetchInfiniteQueryOptions,
        });
      }
      const fetchQueryOptions = call.fetchQueryOptions as CustomFetchQueryOptions<ReturnData>;

      return queryClient.prefetchQuery({
        queryKey: call.queryKey,
        queryFn: () => handleQuery<ReturnData>(call),
        ...fetchQueryOptions,
      });
    });

    await Promise.all(callPromises);
  }
  
  hydrateDataSets();
  await makeCalls();

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
