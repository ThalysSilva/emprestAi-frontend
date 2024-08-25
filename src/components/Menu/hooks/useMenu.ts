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
      label: 'Descubra',
      onClick: () => push(webRoutes.discover),
    },
    {
      label: 'Calendário',
      onClick: () => push(webRoutes.calendar),
    },
    {
      label: 'Crie um evento',
      onClick: () => push(webRoutes.createEvent),
    },
    {
      label: 'Meus eventos',
      onClick: () => push(webRoutes.myEvents),
    },
    {
      label: 'Minha conta',
      onClick: () => push(webRoutes.myAccount),
    },
  ] as MenuItem[];

  return {
    isWideVersion,
    menuItems,
  };
}
