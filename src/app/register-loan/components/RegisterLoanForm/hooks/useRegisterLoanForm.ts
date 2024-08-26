import { RegisterPersonSchemaData } from '@/schemas/registerPersonSchema';
import { useRegisterLoanFormServices } from './useRegisterLoanFormServices';
import { RegisterLoanSchemaData } from '@/schemas/registerLoanSchema';

export function useRegisterLoanForm() {
  const { getAllPersonsQuery, registerLoanMutation } = useRegisterLoanFormServices();

  const personList = getAllPersonsQuery.data ?? [];
  const personOptions = personList.map((person) => ({
    value: person.identification,
    label: `${person.name} - id: ${person.identification}`,
  }));

  function handleSubmit(payload: RegisterLoanSchemaData) {
    registerLoanMutation.mutate({
      payload: {
        amount: payload.loanValue,
        personId: payload.identification,
        installmentsQty: payload.installmentsQty,
      },
    });
  }

  return { personOptions, registerLoanMutation, handleSubmit };
}
