'use client';

import { Button } from '@/components/Button';
import { CustomForm } from '@/components/CustomForm';
import { Input } from '@/components/Input';
import { formatInput } from '@/utils/functions/input';
import { currencyBrazilianMask } from '@/utils/imask/masks';
import { InstallmentAmount } from './components/InstallmentAmount';
import { InputAutocomplete } from '@/components/CustomInputs/InputAutocomplete';
import { registerLoanSchema } from '@/schemas/registerLoanSchema';
import { useRegisterLoanForm } from './hooks/useRegisterLoanForm';

export function RegisterLoanForm() {
  const { personOptions, registerLoanMutation, handleSubmit } = useRegisterLoanForm();
  return (
    <CustomForm
      onSubmit={handleSubmit}
      className={' max-w-[350px] gap-4'}
      zodSchema={registerLoanSchema}
    >
      {({ formContext }) => {
        return (
          <>
            <InputAutocomplete
              label="Escolha uma pessoa"
              id="identification"
              list={personOptions}
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
              <Button isLoading={registerLoanMutation.isPending} className="m-0">
                Cadastrar
              </Button>
            </div>
          </>
        );
      }}
    </CustomForm>
  );
}
