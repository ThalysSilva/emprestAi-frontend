import { Person } from '@/@types/entities/person';
import { useCreateMutation } from '@/services/hooks/useCreateMutation';
import { useCreateQuery } from '@/services/hooks/useCreateQuery';
import { RegisterLoanPayload } from '@/services/types/loan/payload';
import { RegisterLoanData } from '@/services/types/loan/returnData';

export function useRegisterLoanFormServices() {
  const getAllPersonsQuery = useCreateQuery<Person[]>({
    routeName: 'getAllPersons',
    queriesKeys: ['getAllPersons'],
  });

  const registerLoanMutation = useCreateMutation<RegisterLoanData, RegisterLoanPayload>({
    routeName: 'registerLoan',
    invalidateQueriesKeys: ['getAllLoans'],
    successText: 'Empréstimo cadastrado com sucesso!',
  });
  return { registerLoanMutation, getAllPersonsQuery };
}
