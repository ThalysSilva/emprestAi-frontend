import { ApiRouter, ApiRouterObject, RouteName, RouterGroupName } from './types';

export const apiRoutesNested = {
  authentication: {
    login: { method: 'POST', uri: '/login' },
    register: { method: 'POST', uri: '/register' },
  },
  miscellaneous: {
    getCep: { method: 'GET', uri: '/:cep/json/' },
  },
} as const;

const ApiRoutesNestedEntries = Object.entries(apiRoutesNested) as [
  RouterGroupName,
  ApiRouterObject,
][];

export const apiRoutes = ApiRoutesNestedEntries.reduce(
  (acc, [_, routerObject]) => {
    return { ...acc, ...routerObject };
  },
  {} as Record<RouteName, ApiRouter>,
);
