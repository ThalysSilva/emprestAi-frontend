import { AxiosInstance } from 'axios';


export async function withAuthInstance(request: AxiosInstance) {
  const token = undefined // não é necessário autenticação

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
