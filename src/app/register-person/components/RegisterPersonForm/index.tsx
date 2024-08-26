'use client';
import React from 'react';

import { Button } from '@/components/Button';
import { CustomForm } from '@/components/CustomForm';
import { Input } from '@/components/Input';
import { registerPersonSchema } from '@/schemas/registerPersonSchema';
import { formatInput } from '@/utils/functions/input';
import { useRegisterPersonForm } from './hooks/useRegisterPersonForm';

export function RegisterPersonForm() {
  const { handleSubmit, registerPersonMutation } = useRegisterPersonForm();
  return (
    <CustomForm
      onSubmit={handleSubmit}
      className={' max-w-[350px] gap-4'}
      zodSchema={registerPersonSchema}
    >
      {({ formContext }) => (
        <>
          <Input label="Nome" id="name" />
          <Input
            label="Data de nascimento"
            id="birthdate"
            onChange={(e) => formatInput(e, { mask: '00/00/0000' }, formContext)}
          />
          <Input
            label="Identificação"
            id="identification"
            onChange={(e) => formatInput(e, { mask: '00000000000000' }, formContext)}
          />
          <div className="flex justify-end mt-4">
            <Button isLoading={registerPersonMutation.isPending}>Cadastrar</Button>
          </div>
        </>
      )}
    </CustomForm>
  );
}
