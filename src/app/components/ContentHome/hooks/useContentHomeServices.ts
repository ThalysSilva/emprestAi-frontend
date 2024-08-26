import { useCreateMutation } from '@/services/hooks/useCreateMutation';
import { useCreateQuery } from '@/services/hooks/useCreateQuery';
import { GetAllLoansData } from '@/services/types/loan/returnData';

export function useContentHomeServices() {
  const getLoansQuery = useCreateQuery<GetAllLoansData>({
    queriesKeys: ['loans'],
    routeName: 'getAllLoans',
  });

  const payInstallmentMutation = useCreateMutation({
    invalidateQueriesKeys: ['loans'], 
    routeName: 'payInstallment',
    successText: 'Parcela paga com sucesso!',
  });
  return { getLoansQuery, payInstallmentMutation };
}
