import React from 'react';

import { CustomFetchInfiniteQueryOptions, CustomFetchQueryOptions } from '@/@types/reactQuery';
import { requestAxios } from '@/services/middleware';
import { getNextPageParam, getQueryClient } from '@/services/reactQuery';
import { PaginationData } from '@/services/types';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { CallRouteParams } from './types';

type Props<ReturnData = unknown> = {
  children: ReactNode;
  calls: CallRouteParams<ReturnData>[];
};

export async function HydrationQueryWrapper<ReturnData = unknown>({
  children,
  calls,
}: Props<ReturnData>) {
  const queryClient = getQueryClient();
  async function makeCalls() {
    const orderedCalls: CallRouteParams<ReturnData>[][] = [];

    calls.forEach((call) => {
      orderedCalls[call.order ?? 0] = [...(orderedCalls[call.order ?? 0] ?? []), call];
    });

    async function handleQuery<T = unknown>(call: CallRouteParams<ReturnData>, pageParam?: number) {
      const data = await requestAxios<T, null>({
        selectedApi: call.selectedApi,
        routeName: call.routeName,
        params: call.params,
        query: {
          page: pageParam ?? '',
          ...call.query,
        },
        config: call.axiosConfig,
      });
      return data.data;
    }

    for (const orderedCall of orderedCalls) {
      await Promise.all(
        orderedCall.map((call) => {
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
        }),
      );
    }
  }

  await makeCalls();

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
