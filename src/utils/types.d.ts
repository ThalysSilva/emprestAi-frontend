export type CustomIconProps = {
  hoverAnimate?: boolean;
  height?: string;
  width?: string;
  fill?: string;
};

export type Option<T = string> = {
  label: string;
  value: T;
};

export type ButtonProps = {
  label?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

export type SortDirection = 'asc' | 'desc';

export type GetInnerKeysOfObjectsArray<T> = keyof T[0];

export type DataItem = { [key: string]: string | number };

export type DataKeys<T> = keyof T;
export type OmitUnion<T, U> = T extends U ? never : T;
export type OptionList = Option[];

export type ObjectRecursiveOf<T> = { [key: string]: ObjectRecursiveOf<T> | T };

export type ExtractInnerKeys<T> = {
  [K in keyof T]: keyof T[K];
}[keyof T];

export type SelectorReturnType<Selector, Type> = Selector extends (state: any) => infer R
  ? R
  : Type;

export type ResponseError = Error & {
  data: {
    message: string;
    error: string;
    statusCode: number;
  };
};
