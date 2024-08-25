import {
  defaultShouldDehydrateQuery,
  InfiniteData,
  isServer,
  QueryClient,
} from '@tanstack/react-query';
import { PaginationData } from './types';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

export function getNextPageParam<ReturnDataItem = unknown>(
  lastPage: PaginationData<ReturnDataItem>,
  allPages: PaginationData<ReturnDataItem>[],
) {
  const currentPage = allPages.length - 1;
  const totalPages = lastPage?.totalPages;
  const nextPage = currentPage + 1;
  const notIsLastPage = currentPage + 1 < totalPages;
  return notIsLastPage ? nextPage : null;
}

export function selectDataInfinityQuery<ReturnDataItem = unknown>(
  data: InfiniteData<PaginationData<ReturnDataItem>>,
) {
  const allItems = data?.pages.flatMap((page) => page?.items).filter(Boolean) ?? [];

  return {
    pages: data?.pages,
    pageParams: data?.pageParams,
    allItems,
  };
}
