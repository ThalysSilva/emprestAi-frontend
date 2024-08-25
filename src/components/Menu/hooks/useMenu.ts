import { useBreakpointValue } from '@chakra-ui/react';
import { MenuItem } from '../types';
import config from '@/config';
import { useRouter } from 'next/navigation';

export function useMenu() {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  const { webRoutes } = config;

  const { push } = useRouter();

  const menuItems = [
    {
      label: 'Visualizar empréstimos',
      onClick: () => push(webRoutes.viewLoans),
    },
    {
      label: 'Cadastrar pessoas',
      onClick: () => push(webRoutes.registerPerson),
    },
  ] as MenuItem[];

  return {
    isWideVersion,
    menuItems,
  };
}
