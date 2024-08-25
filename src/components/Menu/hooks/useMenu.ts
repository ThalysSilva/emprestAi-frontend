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
      label: 'Cadastrar nova pessoa',
      onClick: () => push(webRoutes.registerPerson),
    },
    {
      label: 'Cadastrar novo empréstimo',
      onClick: () => push(webRoutes.registerLoan),
    },
  ] as MenuItem[];

  return {
    isWideVersion,
    menuItems,
  };
}
