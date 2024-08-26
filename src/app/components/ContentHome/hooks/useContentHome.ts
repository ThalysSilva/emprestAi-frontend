import { useContentHomeServices } from './useContentHomeServices';
import { useLoanTable } from './useLoanTable';

export function useContentHome() {
  const { getLoansQuery, payInstallmentMutation } = useContentHomeServices();
  const loans = getLoansQuery.data ?? [];

  function onPayInstallment(loanId: string) {
    payInstallmentMutation.mutate({ params: { loanId } });
  }
  const { columnsConfig, dataTable } = useLoanTable({
    loans,
    onPayInstallment,
    disableActions: payInstallmentMutation.isPending,
  });

  return { columnsConfig, dataTable };
}
