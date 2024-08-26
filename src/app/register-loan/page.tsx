import React from 'react';

import { BigText2 } from '@/components/Texts';
import { RegisterLoanForm } from './components/RegisterLoanForm';
import { HydrationQueryWrapper } from '@/components/HydrationQueryWrapper';

export const fetchCache = 'force-no-store';

export default async function RegisterLoan() {
  return (
    <HydrationQueryWrapper
      calls={[
        {
          routeName: 'getAllPersons',
          queryKey: ['persons'],
        },
      ]}
    >
      <div className="flex flex-col w-fit items-center">
        <div className="mb-8">
          <BigText2>Cadastrar novo empréstimo</BigText2>
        </div>
        <RegisterLoanForm />
      </div>
    </HydrationQueryWrapper>
  );
}
