import React from 'react';

import { Text5, Text6 } from '@/components/Texts';
import { toBrazilianCurrency, unmaskBrazilianCurrency } from '@/utils/formaters/masks';
import { useFormContext } from 'react-hook-form';

type Props = {
  installmentQtyId: string;
  loanValueId: string;
};

export function InstallmentAmount({ installmentQtyId, loanValueId }: Props) {
  const { watch } = useFormContext();
  const installmentQty = watch(installmentQtyId);
  const loanValue = unmaskBrazilianCurrency(watch(loanValueId));
  const installmentAmount = installmentQty && loanValue ? loanValue / installmentQty : 0;

  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <Text6 className="text-nowrap">Valor das parcelas</Text6>
      <div className="flex justify-center items-center h-10 bg-divider-gray w-full rounded-md border border-divider-gray bg-opacity-75">
        <Text5>{toBrazilianCurrency(installmentAmount)}</Text5>
      </div>
    </div>
  );
}
