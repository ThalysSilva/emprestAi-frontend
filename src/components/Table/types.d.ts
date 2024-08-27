export type Column<T = string> = {
  columnSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  render?: (value: any) => JSX.Element;
  className?: string;
  keyName: T;
  label: string;
  sortable?: boolean;
};

export type ColumnConfig<KeyName extends string, Value> = {
  columnSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  render?: (value: Value) => JSX.Element;
  keyName: KeyName;
  label: string;
  sortable?: boolean;
};

// Ajuste na definição do tipo DataTable

export type DataTableItem<KeyName> = Record<KeyName, any>;
export type DataTable<KeyName> = DataTableItem<KeyName>[];

// Ajuste na definição do tipo ColumnsConfig
export type ColumnsConfig<T extends DataTable> = {
  [K in keyof T[number]]: ColumnConfig<K, T[number][K]>;
}[keyof T[number]][];

export type ColumnStyle<T = string> = {
  className: string;
  keyName: T;
};

export type ColumnHeadStyle<T = string> = {
  className: string;
  keyName: T;
};
