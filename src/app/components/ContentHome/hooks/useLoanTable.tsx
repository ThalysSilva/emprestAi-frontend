import { mockLoanData } from '../const';
import { ColumnConfig } from '@/components/Table/types';
import { GetInnerKeysOfObjectsArray } from '@/utils/types';
import moment from 'moment';
import { Button } from '@/components/Button';
import { personIdentificationTypeLabel } from '@/constants/person';
import { toBrazilianCurrency } from '@/utils/formaters/masks';

export function useLoanTable() {
  const unNormalizedDataTable = mockLoanData;

  const dataTable = unNormalizedDataTable.map(
    ({ person, installments, updatedAt: _updatedAt, createdAt: _createdAt, ...loan }) => {
      const installmentsToPay = installments?.filter(
        (installment) => installment.status === 'pending',
      ).length;

      const installmentsPaid = (installments?.length ?? 1) - (installmentsToPay ?? 0);
      const installmentOrder = `${installmentsPaid}/${installments?.length}`;
      const nextPaymentDate = installments?.[installmentsPaid]?.dueDate;
      const nextPaymentDateString = nextPaymentDate
        ? moment(nextPaymentDate).format('DD/MM/YYYY')
        : '- -';
      const personBirthdate = moment(person.birthdate).format('DD/MM/YYYY');

      const paymentDate = loan.paymentDate ? moment(loan.paymentDate).format('DD/MM/YYYY') : '- -';

      const status = loan.status === 'pending' ? 'Pendente' : 'Pago';

      const personIdentificationType = personIdentificationTypeLabel[person.identificationType];

      return {
        ...loan,
        amount: toBrazilianCurrency(loan.amount),
        status,
        personIdentificationType,
        personMinimumMonthAmount: toBrazilianCurrency(person.minimumMonthAmount),
        personName: person.name,
        personIdentification: person.identification,
        personBirthdate,
        installmentOrder,
        paymentDate,
        nextPaymentDate: nextPaymentDateString,
        payInstallmentAction: loan.id,
      };
    },
  );

  const columnsConfig = [
    {
      keyName: 'personName',
      label: 'Nome do cliente',
      columnSize: 2,
    },
    {
      keyName: 'personIdentification',
      label: 'Identificação',
      columnSize: 2,
    },
    {
      keyName: 'personIdentificationType',
      label: 'Tipo identificação',
      columnSize: 2,
    },
    {
      keyName: 'amount',
      label: 'Valor total',
      columnSize: 2,
    },
    {
      keyName: 'personMinimumMonthAmount',
      label: 'Valor parcela',
      columnSize: 2,
    },
    {
      keyName: 'installmentOrder',
      label: 'Parcelas pagas',
      columnSize: 2,
    },
    {
      keyName: 'status',
      label: 'Status',
      columnSize: 2,
    },
    {
      keyName: 'nextPaymentDate',
      label: 'Próximo pagamento',
      columnSize: 2,
    },
    {
      keyName: 'payInstallmentAction',
      label: 'Ações',
      columnSize: 1,
      render: (value) => <Button onClick={() => console.log(value)}>Pagar</Button>,
    },
  ] as ColumnConfig<GetInnerKeysOfObjectsArray<typeof dataTable>>[];

  return { columnsConfig, dataTable };
}
