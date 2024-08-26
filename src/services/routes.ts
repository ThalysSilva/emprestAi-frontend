import { ApiRouter, ApiRouterObject, RouteName, RouterGroupName } from './types';

export const apiRoutesNested = {
  person: {
    registerPerson: { method: 'POST', uri: '/person' },
    getAllPersons: { method: 'GET', uri: '/person' },
  },
  loan: {
    registerLoan: { method: 'POST', uri: '/loan' },
    getAllLoans: { method: 'GET', uri: '/loan' },
    payInstallment: { method: 'POST', uri: '/loan/pay-installment/:loanId' },
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
