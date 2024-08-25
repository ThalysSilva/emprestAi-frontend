'use client';

import { Button } from '@/components/Button';
import { CustomForm } from '@/components/CustomForm';
import { Input } from '@/components/Input';
import { registerPersonSchema } from '@/schemas/registerPersonSchema';
import { formatInput } from '@/utils/functions/input';
import { currencyBrazilianMask } from '@/utils/imask/masks';
import { InstallmentAmount } from './components/InstallmentAmount';
import { Select } from '@/components/Select';
import { InputAutocomplete } from '@/components/CustomInputs/InputAutocomplete';

export function RegisterLoanForm() {
  const personOptionsMock = [
    {
      label: 'Felipe',
      value: '123',
    },
    {
      label: 'João',
      value: '456',
    },
    {
      label: 'Maria',
      value: '789',
    },
  ];
  return (
    <CustomForm
      onSubmit={() => {}}
      className={' max-w-[350px] gap-4'}
      zodSchema={registerPersonSchema}
    >
      {({ formContext }) => {
        return (
          <>
            <InputAutocomplete label="Selecione uma pessoa" id="person" list={personOptionsMock} />
            <Input
              label="Valor do empréstimo"
              id="loanValue"
              onChange={(e) => formatInput(e, currencyBrazilianMask, formContext)}
            />
            <div className="flex gap-4">
              <Input
                label="Quantidade de parcelas"
                id="installmentsQty"
                onChange={(e) => formatInput(e, { mask: '000' }, formContext)}
              />
              <InstallmentAmount installmentQtyId="installmentsQty" loanValueId="loanValue" />
            </div>
            <div className="flex justify-end mt-4">
              <Button className="m-0" onClick={() => {}}>
                Cadastrar
              </Button>
            </div>
          </>
        );
      }}
    </CustomForm>
  );
}
