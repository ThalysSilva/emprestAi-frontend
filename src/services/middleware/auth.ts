import { AxiosInstance } from 'axios';

export async function withAuthAxiosInstance(request: AxiosInstance) {
  const token = undefined; // não é necessário autenticação

  request.interceptors.request.use(async (requestConfig) => {
    const newRequestConfigHeaders = {
      ...requestConfig.headers,
      Authorization: `Bearer ${token ?? ''}`,
    };

    const newRequestConfig = {
      ...requestConfig,
      headers: { ...newRequestConfigHeaders },
    } as typeof requestConfig;

    return newRequestConfig;
  });
}

export async function getFetchRequestWithAuth(requestInit: RequestInit) {
  const token = undefined; // não é necessário autenticação

  const newRequestHeaders = {
    ...requestInit.headers,
    Authorization: `Bearer ${token ?? ''}`,
  };

  const newRequest = {
    ...requestInit,
    headers: { ...newRequestHeaders },
  } as RequestInit;

  return newRequest;
}
