import React from 'react';

import { BigText2 } from '@/components/Texts';
import { ContentHome } from './components/ContentHome';
import { HydrationQueryWrapper } from '@/components/HydrationQueryWrapper';


export default async function Home() {
  return (
    <HydrationQueryWrapper
      calls={[
        {
          routeName: 'getAllLoans',
          queryKey: ['loans'],
        },
      ]}
    >
      <div className="flex flex-col w-full items-center overflow-hidden">
        <div className="mb-8">
          <BigText2>Visualizar empréstimos</BigText2>
        </div>
        <ContentHome />
      </div>
    </HydrationQueryWrapper>
  );
}
