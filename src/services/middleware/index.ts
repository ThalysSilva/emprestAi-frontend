import axios, { AxiosRequestConfig } from 'axios';
import { HttpMethods, Params, RouteName } from '../types';
import { baseUrl } from '@/config/service';
import { getFetchRequestWithAuth, withAuthAxiosInstance } from './auth';
import { mountUrl } from '@/utils/functions/url';
import { apiRoutes } from '../routes';
import { QueryKey } from '@tanstack/react-query';
import { revalidateTag } from 'next/cache';
import { ResponseError } from '@/utils/types';
import { verifyWindowIsAvailable } from '@/utils/functions/document';

type RequestProps<PayloadType, Config = Record<string, any>> = {
  selectedApi?: keyof typeof baseUrl;
  config?: Config;
  routeName: RouteName;
  payload?: PayloadType;
  params?: Params;
  query?: Params;
};

export async function requestAxios<ReturnDataType, PayloadType>({
  selectedApi = 'default',
  routeName,
  payload,
  config,
  params,
  query,
}: RequestProps<PayloadType, AxiosRequestConfig>) {
  const { method, uri, listenHeaders } = apiRoutes[routeName] as {
    listenHeaders?: string[];
    method: HttpMethods;
    uri: string;
  };
  const timestamp = Date.parse(new Date().toString());
  const request = axios.create({
    ...config,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(config?.headers ?? {}),
    },
  });
  const withAuth = listenHeaders?.includes('Authorization');

  if (withAuth) await withAuthAxiosInstance(request);

  const urlWithParams = mountUrl(uri, baseUrl[selectedApi], params, { tid: timestamp, ...query });

  switch (method) {
    case 'GET':
      return request.get<ReturnDataType>(urlWithParams, config);
    case 'POST':
      return request.post<ReturnDataType>(urlWithParams, payload, config);
    case 'PUT':
      return request.put<ReturnDataType>(urlWithParams, payload, config);
    case 'DELETE':
      return request.delete<ReturnDataType>(urlWithParams, config);
    case 'PATCH':
      return request.patch<ReturnDataType>(urlWithParams, payload, config);
    default:
      return request.get<ReturnDataType>(urlWithParams, config);
  }
}

export async function requestFetch<ReturnDataType, PayloadType>({
  selectedApi = 'default',
  routeName,
  payload,
  queryKeys,
  invalidateKeys,
  multiInvalidationKeys,
  config,
  params,
  query,
}: RequestProps<PayloadType, Omit<RequestInit, 'methods'>> & {
  queryKeys?: QueryKey;
  invalidateKeys?: QueryKey;
  multiInvalidationKeys?: QueryKey[];
}) {
  const { method, uri, listenHeaders } = apiRoutes[routeName] as {
    listenHeaders?: string[];
    method: HttpMethods;
    uri: string;
  };
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(config?.headers ?? {}),
  };
  const withAuth = listenHeaders?.includes('Authorization');

  const urlWithParams = mountUrl(uri, baseUrl[selectedApi], params, query);

  const queryKeysString = JSON.stringify(queryKeys);

  const _requestInit: RequestInit = {
    method,
    headers,
    next: {
      tags: [queryKeysString],
    },
    cache: 'no-cache',
    ...config,
  };

  const requestInit = withAuth ? await getFetchRequestWithAuth(_requestInit) : _requestInit;

  const isMutation = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method);

  if (isMutation) {
    requestInit.body = JSON.stringify(payload);
  }

  try {
    const response = await fetch(urlWithParams, requestInit);

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error('Erro na requisição');
      (error as any).data = errorData;
      throw error as ResponseError;
    }

    if (isMutation) {
      if (multiInvalidationKeys?.length) {
        multiInvalidationKeys.forEach((key) => {
          const keyString = JSON.stringify(key);
          if (!verifyWindowIsAvailable()) revalidateTag(keyString);
        });
      } else {
        const invalidateKeysString = JSON.stringify(invalidateKeys);

        if (!verifyWindowIsAvailable()) revalidateTag(invalidateKeysString);
      }
    }
    const data: ReturnDataType = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Fetch error: ${error.message}`);
      throw error;
    } else {
      console.error('Unknown error occurred');
      throw new Error('Unknown error occurred');
    }
  }
}
