import { useLoanTable } from './useLoanTable';

export function useContentHome() {
  const { columnsConfig, dataTable } = useLoanTable();
  return { columnsConfig, dataTable };
}
