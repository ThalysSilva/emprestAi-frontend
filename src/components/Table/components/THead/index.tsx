import React from 'react';

import { Column } from '../../types';
import ArrowDownUpIcon from '@/assets/icons/ArrowDownUp';

type Props<T> = {
  className?: string;
  columns: Column<T>[];
  handleSortingChange?: (keyName: T) => void;
};

export function THead<T = string>({ columns, className = '', handleSortingChange }: Props<T>) {
  const length = columns.reduce((acc, { columnSize }) => acc + (columnSize ?? 1), 0);
  return (
    <div
      className={`grid gap-3 w-full py-2 px-3 xl:px-8  bg-brand-primary ${className}`}
      style={{
        gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))`,
      }}
    >
      {columns.map(
        ({ label, keyName, className: classNameColumn = '', columnSize, sortable }, index) => (
          <div
            key={index}
            className={`col-span-${columnSize} text-brand-white font-bold uppercase ${classNameColumn} flex flex-row gap-1 items-center`}
          >
            <p>{label}</p>

            {sortable ? (
              <button
                className={'flex items-center bg-transparent'}
                onClick={() => handleSortingChange?.(keyName)}
                type={'button'}
              >
                {<ArrowDownUpIcon />}
              </button>
            ) : (
              ''
            )}
          </div>
        ),
      )}
    </div>
  );
}
