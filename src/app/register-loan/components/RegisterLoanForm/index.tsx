'use client';

import { Button } from '@/components/Button';
import { CustomForm } from '@/components/CustomForm';
import { Input } from '@/components/Input';
import { formatInput } from '@/utils/functions/input';
import { currencyBrazilianMask } from '@/utils/imask/masks';
import { InstallmentAmount } from './components/InstallmentAmount';
import { InputAutocomplete } from '@/components/CustomInputs/InputAutocomplete';
import { registerLoanSchema } from '@/schemas/registerLoanSchema';

export function RegisterLoanForm() {
  const personOptionsMock = [
    {
      label: 'Felipe - id: 12345678',
      value: '12345678',
    },
    {
      label: 'João  - id: 45678901',
      value: '45678901',
    },
    {
      label: 'Maria - id: 789012345',
      value: '789012345',
    },
  ];
  return (
    <CustomForm
      onSubmit={() => {}}
      className={' max-w-[350px] gap-4'}
      zodSchema={registerLoanSchema}
    >
      {({ formContext }) => {
        return (
          <>
            <InputAutocomplete
              label="Escolha uma pessoa"
              id="identification"
              list={personOptionsMock}
            />
            <Input
              label="Valor do empréstimo"
              id="loanValue"
              onChange={(e) => formatInput(e, currencyBrazilianMask, formContext)}
            />
            <div className="flex gap-4">
              <Input
                label="Quantidade de parcelas"
                id="installmentsQty"
                onChange={(e) => formatInput(e, { mask: '00' }, formContext)}
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
