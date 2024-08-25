'use client';

import { Button } from '@/components/Button';
import { CustomForm } from '@/components/CustomForm';
import { Input } from '@/components/Input';
import { registerPersonSchema } from '@/schemas/registerPersonSchema';
import { formatInput } from '@/utils/functions/input';

export function RegisterPersonForm() {
  return (
    <CustomForm
      onSubmit={() => {}}
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
          <Input label="Identificação" id="identification" />
          <div className="flex justify-end mt-4">
            <Button onClick={() => {}}>Cadastrar</Button>
          </div>
        </>
      )}
    </CustomForm>
  );
}
