import { ObjectKey } from '@/utils/types';

export type Column<T = string> = {
  columnSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  render?: (value: any) => JSX.Element;
  className?: string;
  keyName: T;
  label: string;
  sortable?: boolean;
};

export type ColumnConfig<KeyName extends ObjectKey, Value> = {
  columnSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  render?: (value: Value) => JSX.Element;
  keyName: KeyName;
  label: string;
  sortable?: boolean;
};

export type DataTable<KeyName extends ObjectKey> = DataTableItem<KeyName>[];

export type DataTableItem<KeyName extends ObjectKey> = {
  [key in KeyName]: any;
};

type MappedColumnsConfig<DataObject> = {
  [Key in keyof DataObject]: ColumnConfig<Key, DataObject[Key]>;
}[keyof DataObject];

export type ColumnsConfig<DataObjectArray extends DataTable<ObjectKey>> = MappedColumnsConfig<
  DataObjectArray[number]
>[];

export type ColumnStyle<T = string> = {
  className: string;
  keyName: T;
};

export type ColumnHeadStyle<T = string> = {
  className: string;
  keyName: T;
};
