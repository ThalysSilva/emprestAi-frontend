'use client';
import React from 'react';

import { Table } from '@/components/Table';
import { useContentHome } from './hooks/useContentHome';

export function ContentHome() {
  const { columnsConfig, dataTable } = useContentHome();
  return (
    <div className="flex w-full max-w-full overflow-auto">
      <div className="flex min-w-[1500px]">
        <Table data={dataTable} columnsConfig={columnsConfig} />
      </div>
    </div>
  );
}
