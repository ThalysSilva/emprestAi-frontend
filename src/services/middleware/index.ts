import axios, { AxiosRequestConfig } from 'axios';
import { HttpMethods, Params, RouteName } from '../types';
import { baseUrl } from '@/config/service';
import { withAuthInstance } from './auth';
import { mountUrl } from '@/utils/functions/url';
import { apiRoutes } from '../router';

type RequestAxiosProps<PayloadType> = {
  selectedApi?: keyof typeof baseUrl;
  config?: AxiosRequestConfig;
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
}: RequestAxiosProps<PayloadType>) {
  const { method, uri, listenHeaders } = apiRoutes[routeName] as {
    listenHeaders?: string[];
    method: HttpMethods;
    uri: string;
  };

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

  if (withAuth) await withAuthInstance(request);

  const urlWithParams = mountUrl(uri, baseUrl[selectedApi], params, query);

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
