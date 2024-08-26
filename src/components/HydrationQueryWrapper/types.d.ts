import { CustomFetchInfiniteQueryOptions, CustomFetchQueryOptions } from '@/@types/reactQuery';
import { baseUrl } from '@/config/service';
import { PaginationData, Params, RouteName } from '@/services/types';
import { QueryKey } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

export type CallRouteParams<T = any> = {
  routeName: RouteName;
  params?: Params;
  query?: Params;
  axiosConfig?: AxiosRequestConfig<T>;
  fetchQueryOptions?:
    | CustomFetchQueryOptions<T>
    | CustomFetchInfiniteQueryOptions<PaginationData<T>>;
  selectedApi?: keyof typeof baseUrl;
  queryKey: QueryKey;
  isInfinity?: boolean;
  order?: number;
};
