import config from '@/config';

export const BASE_TOKEN_NAME = 'ca-lendario.';

export const selectedTokenName = {
  base: BASE_TOKEN_NAME,
};

export const baseUrl = {
  default: config.envs.baseUrlApi,
  cep: 'https://viacep.com.br/ws',
};
