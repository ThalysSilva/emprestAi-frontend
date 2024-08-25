import { ComponentType } from 'react';

export type ProviderProps = {
  children: ReactNode;
};

export type ProviderComponent = ComponentType<ProviderProps>;
