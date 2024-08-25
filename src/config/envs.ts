/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { verifyIfIsClient } from '@/utils/functions/general';

type Env = {
  value?: string;
  isPrivate?: boolean;
};
function validateEnvs(envs: Record<string, Env>) {
  const isClientSide = verifyIfIsClient();

  const missingEnvs = Object.entries(envs)
    .filter(([, { isPrivate, value }]) => {
      if (isPrivate) {
        if (isClientSide) return false;
        return !value;
      }
      return !value;
    })
    .map(([key]) => key);

  if (missingEnvs.length) {
    throw new Error(`Missing environment variables: ${missingEnvs.join(', ')}`);
  }
}

function getEnvs() {
  const undefinedEnvs = {
    baseUrlApi: { value: process.env.NEXT_PUBLIC_URL_INCREDBULL_BFF },
  };
  validateEnvs(undefinedEnvs);

  const envs = Object.entries(undefinedEnvs).reduce(
    (acc, [key, envObject]) => {
      if (typeof envObject.value !== 'undefined') {
        return { ...acc, [key]: envObject.value };
      }
      return acc;
    },
    {} as Record<keyof typeof undefinedEnvs, string>,
  );

  return envs;
}

export const envs = getEnvs();
